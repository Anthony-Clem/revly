import { cn } from "@/lib/utils";
import { Kumbh_Sans } from "next/font/google";

const kumbhSans = Kumbh_Sans({ subsets: ["latin"] });

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <div
      className={cn(
        `${kumbhSans.className} font-semibold text-2xl text-gray-600`,
        className
      )}
    >
      revly
    </div>
  );
};

export default Logo;
