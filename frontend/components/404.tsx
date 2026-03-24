import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="relative z-20 min-h-[80vh] flex items-center justify-center">
      <div className="relative px-8 md:px-0 py-[4rem] sm:py-[5rem] md:py-[6.25rem] mx-auto sm:max-w-[37.5rem] md:max-w-[40.625rem] lg:max-w-[53.125rem] xl:max-w-[70rem]">
        <h1 className="font-bold text-[9.9vw] md:text-[4.5rem] sm:text-[3.4375rem] lg:text-[6rem] xl:text-[8rem] leading-[1.12]">
          Page not found
        </h1>
        <div className="mt-5 text-center">
          <Button size="lg" asChild>
            <Link href="/">Back to Home page</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
