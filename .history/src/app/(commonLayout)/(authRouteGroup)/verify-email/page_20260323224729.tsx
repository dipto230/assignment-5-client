interface VerifyEmailPageProps {
  searchParams: {
    email?: string;
  };
}

import VerifyEmailForm from "@/components/modules/Auth/VerifyEmailForm";

const VerifyEmailPage = ({ searchParams }: VerifyEmailPageProps) => {
  const email = searchParams.email;

  return <VerifyEmailForm email={email} />;
};

export default VerifyEmailPage;
