import LoginForm from "@/components/modules/Auth/LoginForm";

interface LoginParams {
  searchParams: Promise<{ redirect?: string }>;
}

const LoginPage = async ({ searchParams }: LoginParams) => {
  const params = await searchParams;
  const redirectPath = params.redirect;
  return (
    <div className="min-h-screen flex justify-start items-center bg-gray-50 pt-24">
    <LoginForm redirectPath={redirectPath}/>
  )
}

export default LoginPage