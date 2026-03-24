import { cn } from "@/lib/utils";

export default function TagLine({
  title,
  element = "div",
  className,
}: {
  title: string;
  element?: "div" | "h1" | "h2" | "h3";
  className?: string;
  large?: boolean;
}) {
  const TagElement = element;

  return (
    <TagElement
      className={cn(
        "inline-block leading-[0] text-base font-semibold",
        className
      )}
    >
      {title}
    </TagElement>
  );
}
