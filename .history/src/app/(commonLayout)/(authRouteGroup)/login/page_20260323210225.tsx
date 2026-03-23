import LoginForm from "@/components/modules/Auth/LoginForm";

interface Props {
  searchParams: Promise<{ redirect?: string }>;
}

const LoginPage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  return (
    <LoginForm redirectPath={params?.redirect} />
  );
};

export default LoginPage;