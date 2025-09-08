type NumberInputFieldProps = {
  id: string;
  name: string;
  label: string;
  min?: number;
  step?: number;
  helpText?: string;
};

export function NumberInputField({
  id,
  name,
  label,
  min = 0,
  step = 1,
  helpText,
}: NumberInputFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="number"
        min={min}
        step={step}
        className="border rounded-lg p-2 w-48"
        aria-describedby={helpText ? `${id}-help` : undefined}
      />
      {helpText && (
        <span id={`${id}-help`} className="text-xs text-gray-500">
          {helpText}
        </span>
      )}
    </div>
  );
}
