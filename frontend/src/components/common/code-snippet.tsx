import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodeSnippet = () => {
  const codeSnippet = `await fetch("${process.env.NEXT_PUBLIC_SERVER_URL}/feedbacks", {
    method: "POST",
    body: JSON.stringify({
      folderName: "<YOUR_EXISTING_FOLDER_NAME>",
      feedbackContent: "Add subscription to monetize.",
      feedbackTitle: "Subscription",
      authorName: "John Doe",
      rating: 5,
    }),
    headers: {
      Authorization: "Bearer <YOUR_API_KEY>"
    }
  })`;
  return (
    <div className="text-sm">
      <SyntaxHighlighter language="typescript" style={nightOwl}>
        {codeSnippet}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeSnippet;
