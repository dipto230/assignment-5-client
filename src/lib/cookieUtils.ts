"use server";

import { cookies } from "next/headers";

export const setCookie = async (
    name : string,
    value : string,
    maxAgeInSeconds : number,
) => {
    const cookieStore = await cookies();

    cookieStore.set(name, value, {
        httpOnly : true,
        secure : true,
        sameSite : "lax",
        path : "/",
        maxAge : maxAgeInSeconds,
    });
    
    console.log(`🍪 Set cookie: ${name} (expires in ${maxAgeInSeconds}s)`);
}

export const getCookie = async (name : string) => {
    const cookieStore = await cookies();
    const value = cookieStore.get(name)?.value;
    console.log(`🍪 Get cookie: ${name} = ${value ? '✅' : '❌'}`);
    return value;
}

export const deleteCookie = async (name : string) => {
    const cookieStore = await cookies();
    cookieStore.delete(name);
    console.log(`🗑️  Delete cookie: ${name}`);
}