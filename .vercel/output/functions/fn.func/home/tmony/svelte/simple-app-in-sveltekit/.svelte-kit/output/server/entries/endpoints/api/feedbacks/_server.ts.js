import { j as json } from "../../../../chunks/index.js";
import { p as prisma } from "../../../../chunks/prisma.js";
async function GET({ url }) {
  try {
    const pageQueryParam = url.searchParams.get("page");
    const limitQueryParam = url.searchParams.get("limit");
    const orderBy = url.searchParams.get("orderBy") === "asc" ? "asc" : "desc";
    const page = pageQueryParam ? parseInt(pageQueryParam, 10) : 1;
    const limit = limitQueryParam ? parseInt(limitQueryParam, 10) : 10;
    const skip = (page - 1) * limit;
    const [totalFeedbacks, feedbacks] = await Promise.all([
      prisma.feedback.count(),
      prisma.feedback.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: orderBy
        }
      })
    ]);
    const totalPages = Math.ceil(totalFeedbacks / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;
    const json_response = {
      status: "success",
      pagination: {
        totalPages,
        currentPage: page,
        totalResults: totalFeedbacks,
        hasNextPage,
        hasPreviousPage
      },
      feedbacks
    };
    return json(json_response);
  } catch (error) {
    const error_response = {
      status: "error",
      message: error.message
    };
    return json(error_response, {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
async function POST({ request }) {
  try {
    const requestData = await request.json();
    const feedback = await prisma.feedback.create({
      data: requestData
    });
    const json_response = {
      status: "success",
      data: {
        feedback
      }
    };
    return json(json_response, {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    if (error.code === "P2002") {
      const error_response2 = {
        status: "fail",
        message: "Feedback with that title already exists"
      };
      return json(error_response2, {
        status: 409,
        headers: { "Content-Type": "application/json" }
      });
    }
    const error_response = {
      status: "error",
      message: error.message
    };
    return json(error_response, {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
export {
  GET,
  POST
};
