export function Image({
  value,
  metadata,
  placeholder,
  className,
}: {
  value: string;
  metadata?: Record<string, any>;
  placeholder?: string;
  className?: string;
}) {
  if (!value) {
    if (placeholder) {
      return <div className={className}>{placeholder}</div>;
    }

    return null;
  }

  return (
    <img
      src={value}
      alt={value}
      className={`h-10 w-10 shrink-0 rounded-full object-cover ${className}`}
    />
  );
}
