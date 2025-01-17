import Logo from "../common/logo";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

const LandingHeader = () => {
  return (
    <header className="p-4 flex justify-between">
      <Logo />

      <Link
        href="/dashboard/folders"
        className={buttonVariants({ variant: "outline" })}
      >
        Get started
      </Link>
    </header>
  );
};

export default LandingHeader;
