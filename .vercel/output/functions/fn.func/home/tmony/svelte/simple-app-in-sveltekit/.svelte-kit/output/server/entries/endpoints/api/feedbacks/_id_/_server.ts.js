import { p as prisma } from "../../../../../chunks/prisma.js";
import { j as json } from "../../../../../chunks/index.js";
async function GET({ params }) {
  try {
    const feedbackId = params.id;
    const feedback = await prisma.feedback.findUnique({
      where: {
        id: feedbackId
      }
    });
    if (!feedback) {
      const message = "No Feedback with the Provided ID Found";
      return generateErrorResponse({ message, status: 404 });
    }
    const json_response = {
      status: "success",
      data: {
        feedback
      }
    };
    return json(json_response);
  } catch (error) {
    return generateErrorResponse({ message: error.message, status: 500 });
  }
}
async function PATCH({ request, params }) {
  try {
    const feedbackId = params.id;
    const feedbackData = await request.json();
    const updated_feedback = await prisma.feedback.update({
      where: { id: feedbackId },
      data: feedbackData
    });
    const json_response = {
      status: "success",
      data: {
        feedback: updated_feedback
      }
    };
    return json(json_response);
  } catch (error) {
    if (error.code === "P2025") {
      const message = "No Feedback with the Provided ID Found";
      return generateErrorResponse({ message, status: 404 });
    }
    return generateErrorResponse({ message: error.message, status: 500 });
  }
}
async function DELETE({ params }) {
  try {
    const feedbackId = params.id;
    await prisma.feedback.delete({
      where: { id: feedbackId }
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    if (error.code === "P2025") {
      const message = "No Feedback with the Provided ID Found";
      return generateErrorResponse({ message, status: 404 });
    }
    return generateErrorResponse({ message: error.message, status: 500 });
  }
}
const generateErrorResponse = ({ message, status }) => {
  return json(
    { status: status >= 500 ? "error" : "fail", message },
    {
      status,
      headers: { "Content-Type": "application/json" }
    }
  );
};
export {
  DELETE,
  GET,
  PATCH
};
