import VerifyEmailForm from "@/components/modules/Auth/VerifyEmailForm";

interface VerifyEmailPageProps {
  searchParams: {
    email?: string;
  };
}

const VerifyEmailPage = ({ searchParams }: VerifyEmailPageProps) => {
  return <VerifyEmailForm email={searchParams.email} />;
};

export default VerifyEmailPage;