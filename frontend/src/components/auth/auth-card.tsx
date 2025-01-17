import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Logo from "../common/logo";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  description: string;
  redirectLink?: Url;
  redirectQuestion?: string;
  redirectText?: string;
}
// optional incase of future additions of forgot and reset password pages

const AuthCard = ({
  children,
  title,
  description,
  redirectLink,
  redirectQuestion,
  redirectText,
}: AuthCardProps) => {
  const redirectProperties = redirectLink && redirectQuestion && redirectText;
  return (
    <Card className="sm:max-w-[450px] w-full max-sm:h-full">
      <CardHeader className="flex flex-col items-center gap-4">
        <Logo className="block sm:hidden" />
        <div className="text-center">
          <h1 className="text-preset-1 capitalize">{title}</h1>
          <p className="text-preset-5 text-neutral-600">{description}</p>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        {redirectProperties && (
          <div className="text-preset-5">
            {redirectQuestion}{" "}
            <Link
              href={redirectLink}
              className="hover:text-gray-800 hover:underline transition-colors"
            >
              {redirectText}
            </Link>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default AuthCard;
