const load = async ({ fetch }) => {
  async function fetchFeedbacks() {
    const response = await fetch("/api/feedbacks", { method: "GET" });
    const data = await response.json();
    return data.feedbacks;
  }
  return {
    feedbacks: fetchFeedbacks()
  };
};
export {
  load
};
