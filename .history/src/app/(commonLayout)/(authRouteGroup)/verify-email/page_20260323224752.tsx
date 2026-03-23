import VerifyEmailForm from "@/components/modules/Auth/VerifyEmailForm";

interface VerifyEmailPageProps {
  searchParams: {
    email?: string;
  };
}


const VerifyEmailPage = ({ searchParams }: VerifyEmailPageProps) => {
  const email = searchParams.email;

  return <VerifyEmailForm email={email} />;
};

export default VerifyEmailPage;
