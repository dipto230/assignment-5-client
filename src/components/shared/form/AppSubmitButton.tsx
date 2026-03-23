"use client";

import { Button } from "@/components/ui/button";

interface AppSubmitButtonProps {
  children: React.ReactNode;
  isPending?: boolean;
  disabled?: boolean;
  pendingLabel?: string;
}

const AppSubmitButton = ({
  children,
  isPending,
  disabled,
  pendingLabel = "Submitting...",
}: AppSubmitButtonProps) => {
  return (
    <Button type="submit" disabled={disabled || isPending} className="w-full">
      {isPending ? pendingLabel : children}
    </Button>
  );
};

export default AppSubmitButton;