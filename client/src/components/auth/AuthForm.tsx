import { Button } from '@/components/button';
 
export interface FieldConfig {
  key: string;
  label: string;
  type: 'text' | 'email' | 'password';
  placeholder: string;
}
 
interface AuthFormProps {
  fields: FieldConfig[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onSubmit: () => void;
  submitText: string;
  loading: boolean;
  error: string | null;
  secondaryLink: {
    label: string;
    href: string;
  };
}
 
export function AuthForm({
  fields,
  values,
  onChange,
  onSubmit,
  submitText,
  loading,
  error,
  secondaryLink,
}: AuthFormProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onSubmit();
  };
 
  return (
    <>
      {error && (
        <div className="bg-red-50 dark:bg-red-950 border border-red-300 dark:border-red-800 rounded-lg px-3 py-2.5 text-[13px] text-red-700 dark:text-red-400 mb-4">
          {error}
        </div>
      )}
 
      {fields.map((field) => (
        <div key={field.key}>
          <label className="block text-[11px] font-semibold tracking-widest uppercase text-gray-500 dark:text-gray-400 mb-1.5">
            {field.label}
          </label>
          <input
            type={field.type}
            value={values[field.key] ?? ''}
            onChange={(e) => onChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            disabled={loading}
            onKeyDown={handleKeyDown}
            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-[15px] text-gray-900 dark:text-white outline-none mb-4 transition-colors focus:border-violet-500 focus:bg-white dark:focus:bg-gray-700 placeholder:text-gray-300 dark:placeholder:text-gray-600"
          />
        </div>
      ))}
 
      <div className="mt-1 mb-3.5">
        <Button
          text={loading ? '...' : submitText}
          onClick={onSubmit}
          disabled={loading}
        />
      </div>
 
      <div className="flex items-center gap-2.5 mb-3.5">
        <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800 select-none" />
        <span className="text-[12px] text-gray-300 dark:text-gray-600 select-none">o</span>
        <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800 select-none" />
      </div>
 
      <Button text={secondaryLink.label} href={secondaryLink.href} />
    </>
  );
}