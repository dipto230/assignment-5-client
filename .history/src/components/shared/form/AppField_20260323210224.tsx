"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AppFieldProps {
  field: {
    state: {
      value: string;
      meta: {
        errors?: string[];
      };
    };
    handleChange: (value: string) => void;
  };
  label: string;
  type?: string;
  append?: React.ReactNode;
}

const AppField = ({ field, label, type = "text", append }: AppFieldProps) => {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>

      <div className="flex items-center gap-2">
        <Input
          type={type}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
        />

        {append}
      </div>

      {field.state.meta.errors?.length ? (
        <p className="text-sm text-red-500">
          {field.state.meta.errors[0]}
        </p>
      ) : null}
    </div>
  );
};

export default AppField;