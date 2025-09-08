type SelectFieldProps = {
  id: string;
  name: string;
  label: string;
  options: { value: string; label: string }[];
  helpText?: string;
};

export function SelectField({ id, name, label, options, helpText }: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <select
        id={id}
        name={name}
        className="border rounded-lg p-2 w-48"
        aria-describedby={helpText ? `${id}-help` : undefined}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {helpText && (
        <span id={`${id}-help`} className="text-xs text-gray-500">
          {helpText}
        </span>
      )}
    </div>
  );
}
