"use client";

import { Input, Textarea, Select } from "@/components/ui/Input";
import type { DocumentField } from "@/types";

function isFieldVisible(field: DocumentField, values: Record<string, string>): boolean {
  if (!field.showWhen) return true;
  const triggerValue = values[field.showWhen.fieldId] ?? "";
  return field.showWhen.values.includes(triggerValue);
}

interface DocumentFormProps {
  fields: DocumentField[];
  values: Record<string, string>;
  onChange: (id: string, value: string) => void;
}

export function DocumentForm({ fields, values, onChange }: DocumentFormProps) {
  const visibleFields = fields.filter((f) => isFieldVisible(f, values));
  return (
    <div className="space-y-4">
      {visibleFields.map((field) => {
        if (field.type === "textarea") {
          return (
            <Textarea
              key={field.id}
              label={field.label}
              placeholder={field.placeholder}
              required={field.required}
              value={values[field.id] ?? ""}
              onChange={(e) => onChange(field.id, e.target.value)}
            />
          );
        }
        if (field.type === "select") {
          return (
            <Select
              key={field.id}
              label={field.label}
              required={field.required}
              value={values[field.id] ?? ""}
              onChange={(e) => onChange(field.id, e.target.value)}
              options={(field.options ?? []).map((o) => ({ value: o, label: o }))}
              placeholder="Seçiniz..."
            />
          );
        }
        return (
          <Input
            key={field.id}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            required={field.required}
            value={values[field.id] ?? ""}
            onChange={(e) => onChange(field.id, e.target.value)}
          />
        );
      })}
    </div>
  );
}
