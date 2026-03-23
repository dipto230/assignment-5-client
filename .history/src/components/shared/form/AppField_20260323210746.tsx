"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AppFieldProps {
  field: unknown;
  label: string;
  type?: string;
  placeholder?: string;
  append?: React.ReactNode;
}

const AppField = ({
  field,
  label,
  type = "text",
  placeholder,
  append,
}: AppFieldProps) => {
  const f = field as any; // ✅ safe cast (TanStack compatible)

  return (
    <div className="space-y-1">
      <Label>{label}</Label>

      <div className="flex items-center gap-2">
        <Input
          type={type}
          placeholder={placeholder}
          value={f.state.value}
          onChange={(e) => f.handleChange(e.target.value)}
        />
        {append}
      </div>

      {f.state.meta.errors?.length ? (
        <p className="text-sm text-red-500">
          {String(f.state.meta.errors[0])}
        </p>
      ) : null}
    </div>
  );
};

export default AppField;