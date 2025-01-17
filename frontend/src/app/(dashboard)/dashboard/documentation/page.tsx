import CodeSnippet from "@/components/common/code-snippet";

const DocumentationPage = () => {
  return (
    <div className="flex flex-col-reverse xl:flex-row justify-between gap-10">
      <div>
        <h2 className="text-preset-2">How to get started?</h2>
        <p className="mt-4 text-preset-4">
          The Feedback Submission API allows you to send user feedback to a
          specific folder. Use the endpoint below to submit feedback. At least
          one of <code>feedbackContent</code> or <code>rating</code> is
          required.
        </p>
        <h3 className="mt-6 text-preset-3">Endpoint</h3>
        <p className="mt-2 text-gray-400 text-preset-3">
          <strong>POST</strong> <code>/api/feedbacks</code>
        </p>
        <h3 className="mt-6 text-preset-3">Headers</h3>
        <ul className="mt-2 text-gray-400 list-disc pl-5 text-preset-3">
          <li>
            <strong>Authorization:</strong> Bearer{" "}
            <code>&lt;YOUR_API_KEY&gt;</code>
          </li>
        </ul>
        <h3 className="mt-6 text-lg text-preset-3">Request Body</h3>
        <p className="mt-2 text-preset-4 ">
          The request body must be in JSON format
        </p>
        <p className="mt-2 text-preset-4">
          Must include either feedbackContent or rating:
        </p>
        <ul className="mt-4 text-preset-5 space-y-2 list-disc pl-5">
          <li>
            <strong>folderName</strong> (String): Name of the folder to
            associate the feedback with.
          </li>
          <li>
            <strong>feedbackContent</strong> (String, Required): The content of
            the feedback message.
          </li>
          <li>
            <strong>feedbackTitle</strong> (String, Optional): A short title
            summarizing the feedback.
          </li>
          <li>
            <strong>authorName</strong> (String, Optional): Name of the feedback
            author.
          </li>
          <li>
            <strong>rating</strong> (Number, Required): Numeric rating for the
            feedback (e.g., 1-5).
          </li>
        </ul>
        <h3 className="mt-6 text-lg text-white">Example Request</h3>
      </div>
      <CodeSnippet />
    </div>
  );
};

export default DocumentationPage;
