"use server";

import { NextRequest, NextResponse } from "next/server";
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute, UserRole } from "./lib/authUtils";
import { jwtUtils } from "./lib/jwtUtils";
import { isTokenExpiringSoon } from "./lib/tokenUtils";
import { getNewTokensWithRefreshToken, getUserInfo } from "./services/auth.server";


// middleware function to refresh tokens
async function refreshTokenMiddleware(): Promise<boolean> {
    try {
        const refreshed = await getNewTokensWithRefreshToken(); 
        return refreshed;
    } catch (error) {
        console.error("Error refreshing token in middleware:", error);
        return false;
    }
}

export async function proxy(request: NextRequest) {
    try {
        const { pathname } = request.nextUrl;

        const accessToken = request.cookies.get("accessToken")?.value;
        const refreshToken = request.cookies.get("refreshToken")?.value;

        let userRole: UserRole | null = null;

        // decode token if exists
        const decodedAccessToken = accessToken
            ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string).data
            : null;

        const isValidAccessToken = accessToken
            ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string).success
            : false;

        if (decodedAccessToken) {
            userRole = decodedAccessToken.role as UserRole;
        }

        // unify SUPER_ADMIN as ADMIN
        userRole = userRole === "SUPER_ADMIN" ? "ADMIN" : userRole;

        const routerOwner = getRouteOwner(pathname);
        const isAuth = isAuthRoute(pathname);

        // ✅ proactively refresh token if access token is expiring
        if (refreshToken && accessToken && (await isTokenExpiringSoon(accessToken))) {
            const refreshed = await refreshTokenMiddleware();
            const response = NextResponse.next();
            if (refreshed) {
                response.headers.set("x-token-refreshed", "1");
            }
            return response;
        }

        // Rule 1: logged in user trying to access auth route
        if (isAuth && isValidAccessToken) {
            return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url));
        }

        // Rule 2: reset-password page
        if (pathname === "/reset-password") {
            const email = request.nextUrl.searchParams.get("email");

            if (accessToken && email) {
                const userInfo = await getUserInfo();
                if (userInfo.needPasswordChange) return NextResponse.next();
                return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url));
            }

            if (email) return NextResponse.next();

            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("redirect", pathname);
            return NextResponse.redirect(loginUrl);
        }

        // Rule 3: public routes
        if (routerOwner === null) return NextResponse.next();

        // Rule 4: protected route but not logged in
        if (!accessToken || !isValidAccessToken) {
            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("redirect", pathname);
            return NextResponse.redirect(loginUrl);
        }

        // Rule: enforce emailVerified / needPasswordChange
        if (accessToken) {
            const userInfo = await getUserInfo();
            if (userInfo) {
                if (!userInfo.emailVerified && pathname !== "/verify-email") {
                    const verifyEmailUrl = new URL("/verify-email", request.url);
                    verifyEmailUrl.searchParams.set("email", userInfo.email);
                    return NextResponse.redirect(verifyEmailUrl);
                }

                if (userInfo.emailVerified && pathname === "/verify-email") {
                    return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url));
                }

                if (userInfo.needPasswordChange && pathname !== "/reset-password") {
                    const resetPasswordUrl = new URL("/reset-password", request.url);
                    resetPasswordUrl.searchParams.set("email", userInfo.email);
                    return NextResponse.redirect(resetPasswordUrl);
                }

                if (!userInfo.needPasswordChange && pathname === "/reset-password") {
                    return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url));
                }
            }
        }

        // Rule 5: COMMON protected route
        if (routerOwner === "COMMON") return NextResponse.next();

        // Rule 6: role-based access
        if (["ADMIN", "LAWYER", "USER"].includes(routerOwner || "")) {
            if (routerOwner !== userRole) {
                return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url));
            }
        }

        return NextResponse.next();
    } catch (error) {
        console.error("Error in proxy middleware:", error);
        return NextResponse.next();
    }
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
    ],
};