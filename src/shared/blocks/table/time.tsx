import moment from "moment";

export function Time({
  value,
  placeholder,
  metadata,
  className,
}: {
  value: string | Date;
  placeholder?: string;
  metadata?: Record<string, any>;
  className?: string;
}) {
  if (!value) {
    if (placeholder) {
      return <div className={className}>{placeholder}</div>;
    }

    return null;
  }

  return (
    <div className={className}>
      {metadata?.format
        ? moment(value).format(metadata?.format)
        : moment(value).fromNow()}
    </div>
  );
}
