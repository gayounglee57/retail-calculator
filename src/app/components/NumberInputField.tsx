type NumberInputFieldProps = {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  helpText?: string;
};

export function NumberInputField({
  id,
  label,
  value,
  onChange,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
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
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
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
