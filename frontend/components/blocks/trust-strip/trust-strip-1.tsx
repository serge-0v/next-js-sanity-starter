import SectionContainer from "@/components/ui/section-container";
import { RotateCcw, Shield, Star, Truck } from "lucide-react";

type TrustStrip1Props = {
  padding?: any;
  colorVariant?: any;
  items?:
    | Array<{
        _key?: string;
        icon?: string | null;
        title?: string | null;
        description?: string | null;
      }>
    | null;
};

const iconMap = {
  truck: Truck,
  "rotate-ccw": RotateCcw,
  shield: Shield,
  star: Star,
} as const;

export default function TrustStrip1({
  padding,
  colorVariant,
  items,
}: TrustStrip1Props) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <SectionContainer color={colorVariant} padding={padding}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const Icon =
            item.icon && item.icon in iconMap
              ? iconMap[item.icon as keyof typeof iconMap]
              : Shield;

          return (
            <div key={item._key} className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="size-5" />
              </div>
              <div>
                <p className="leading-tight font-medium">{item.title}</p>
                {item.description && (
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </SectionContainer>
  );
}
