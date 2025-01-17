import React from "react";
import CodeSnippet from "../common/code-snippet";
import { FaArrowDown } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="flex-1 p-4">
      <div className="flex flex-col gap-2 items-center justify-center h-screen">
        <h1 className="text-4xl font-semibold">Welcome to revly.</h1>
        <p className="text-xl text-center">
          Store all{" "}
          <span className="underline underline-offset-4">feedbacks</span> on
          your buisness or product{" "}
          <span className="italic font-bold">seamlessly</span>
        </p>
        <div className="flex items-center gap-2 mt-5">
          <p className="text-2xl">Check out how to below</p>
          <FaArrowDown className="size-8" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-5 md:gap=3">
        <CodeSnippet />
        <ul className="decoration text-preset-2 space-y-2">
          <li>Create an account</li>
          <li>Generate an API key</li>
          <li>Set up a POST request in your code</li>
          <li>Recieve new feedbacks immediately </li>
        </ul>
      </div>
    </section>
  );
};

export default Hero;
