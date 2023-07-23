import { c as create_ssr_component, e as each, f as escape, d as add_attribute, b as subscribe, v as validate_component } from "../../chunks/ssr.js";
import { t as toast } from "../../chunks/SvelteToast.svelte_svelte_type_style_lang.js";
import { w as writable } from "../../chunks/index2.js";
function client_method(key) {
  {
    if (key === "before_navigate" || key === "after_navigate") {
      return () => {
      };
    } else {
      const name_lookup = {
        disable_scroll_handling: "disableScrollHandling",
        preload_data: "preloadData",
        preload_code: "preloadCode",
        invalidate_all: "invalidateAll"
      };
      return () => {
        throw new Error(`Cannot call ${name_lookup[key] ?? key}(...) on the server`);
      };
    }
  }
}
const invalidate = /* @__PURE__ */ client_method("invalidate");
const SERVER_ENDPOINT = "http://localhost:3000";
async function handleResponse(response) {
  const contentType = response.headers.get("Content-Type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json() : await response.text();
  if (!response.ok) {
    const message = isJson ? data.message || response.statusText : response.statusText;
    throw new Error(message);
  }
  return data;
}
const useFeedbackStore = () => {
  const { subscribe: subscribe2, set, update } = writable({
    page_loading: false,
    feedbacks: [],
    setPageLoading: (loading) => update((state) => ({ ...state, page_loading: loading })),
    addFeedback: async (feedback) => {
      update((state) => ({
        ...state,
        page_loading: true
      }));
      try {
        const response = await fetch(`${SERVER_ENDPOINT}/api/feedbacks/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: feedback
        });
        await handleResponse(response).then((data) => data.data.feedback);
        await invalidate("/api/feedbacks");
        update((state) => ({
          ...state,
          page_loading: false
        }));
        toast.push("Added Feedback Successfully", { classes: ["success"] });
      } catch (error) {
        update((state) => ({
          ...state,
          page_loading: false
        }));
        console.error(error);
        toast.push(error.toString(), { classes: ["danger"] });
      }
    },
    editFeedback: async (id, data) => {
      update((state) => ({
        ...state,
        page_loading: true
      }));
      try {
        const response = await fetch(`${SERVER_ENDPOINT}/api/feedbacks/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: data
        });
        await handleResponse(response).then((data2) => data2.data.feedback);
        await invalidate("/api/feedbacks");
        update((state) => ({
          ...state,
          page_loading: false
        }));
        toast.push("Edited Feedback Successfully", { classes: ["success"] });
      } catch (error) {
        update((state) => ({
          ...state,
          page_loading: false
        }));
        console.error(error);
        toast.push(error.toString(), { classes: ["danger"] });
      }
    },
    deleteFeedback: async (id) => {
      update((state) => ({
        ...state,
        page_loading: true
      }));
      try {
        const response = await fetch(`${SERVER_ENDPOINT}/api/feedbacks/${id}`, {
          method: "DELETE"
        });
        if (!response.ok) {
          const errorResponse = await response.json();
          if (errorResponse) {
            throw new Error(errorResponse.message);
          } else {
            throw new Error(`API error: ${response.status}`);
          }
        }
        await invalidate("/api/feedbacks");
        update((state) => ({
          ...state,
          page_loading: false
        }));
        toast.push("Feedback deleted successfully", { classes: ["success"] });
      } catch (error) {
        update((state) => ({
          ...state,
          page_loading: false
        }));
        console.error(error);
        toast.push(error.toString(), { classes: ["danger"] });
      }
    }
  });
  return { subscribe: subscribe2, set, update };
};
const feedbackStore = useFeedbackStore();
const Rating = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { selected = 0 } = $$props;
  let { onchange = () => {
  } } = $$props;
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.onchange === void 0 && $$bindings.onchange && onchange !== void 0)
    $$bindings.onchange(onchange);
  return `<ul class="list-none flex items-center justify-around my-7">${each(Array.from({ length: 10 }, (_, i) => i + 1), (i) => {
    return `<li class="${"relative w-14 h-14 p-3 text-center rounded-full border-gray-300 border-2 transition duration-300 " + escape(
      selected === i ? "bg-pink-500 text-white" : "bg-gray-200",
      true
    )}"><input type="radio" class="opacity-0"${add_attribute("id", `feedback-rating-radio-button-${i}`, 0)} name="rating"${add_attribute("value", i, 0)}${i === selected ? add_attribute("checked", true, 1) : ""}> <label${add_attribute("for", `feedback-rating-radio-button-${i}`, 0)} class="absolute w-full h-full flex items-center justify-center rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:bg-pink-500 hover:text-white transition duration-300">${escape(i)}</label> </li>`;
  })}</ul>`;
});
const Feedback_form = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isDisabled;
  let $$unsubscribe_feedbackStore;
  $$unsubscribe_feedbackStore = subscribe(feedbackStore, (value) => value);
  let message = null;
  let rating = 10;
  let feedbackText = "";
  isDisabled = feedbackText.trim().length === 0;
  {
    {
      if (feedbackText.trim().length > 10) {
        message = null;
      }
    }
  }
  $$unsubscribe_feedbackStore();
  return `<div class="bg-white text-gray-700 rounded-lg p-8 my-5 relative"><form><div class="max-w-md mx-auto" data-svelte-h="svelte-p5cola"><label for="feedback-input" class="inline-block text-center text-2xl font-bold">How would you rate your service with us?</label></div> ${validate_component(Rating, "Rating").$$render(
    $$result,
    {
      selected: rating,
      onchange: (val) => rating = val
    },
    {},
    {}
  )} <div class="flex border rounded-lg my-4 px-2 py-3"><input type="text" id="feedback-input" class="flex-grow border-none text-lg focus:outline-none" placeholder="Tell us something that keeps you coming back"${add_attribute("value", feedbackText, 0)}> <button type="submit" ${isDisabled ? "disabled" : ""} class="border-0 rounded-md w-28 h-10 cursor-pointer bg-indigo-600 text-white hover:bg-indigo-500 disabled:bg-gray-400 disabled:text-gray-800 disabled:cursor-not-allowed">Send</button></div> ${message ? `<div class="pt-3 text-center text-purple-600">${escape(message)}</div>` : ``}</form></div>`;
});
const Feedback_stats = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let count;
  let sum;
  let average;
  let { feedbacks } = $$props;
  if ($$props.feedbacks === void 0 && $$bindings.feedbacks && feedbacks !== void 0)
    $$bindings.feedbacks(feedbacks);
  count = feedbacks.length;
  sum = feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0);
  average = count > 0 ? (sum / count).toFixed(2) : "0.00";
  return `<div class="flex justify-between items-center mb-11 text-white"><h4>${escape(count)} Reviews</h4> <h4>Ratings Average: ${escape(average)}</h4></div>`;
});
const Loading_skeleton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="bg-gray-200 animate-pulse rounded-lg p-8 my-5 relative" data-svelte-h="svelte-12osx9h"><div class="bg-gray-300 text-gray-200 rounded-full border-2 border-gray-200 w-12 h-12 flex items-center justify-center text-2xl font-bold absolute top-0 left-0 -mt-4 -ml-4">...</div> <button type="button" class="absolute font-bold top-2 right-4 cursor-pointer bg-transparent border-none">...</button> <p class="bg-gray-300 h-4 w-3/4 mt-5 rounded"></p></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let feedbacks;
  let $feedbackStore, $$unsubscribe_feedbackStore;
  $$unsubscribe_feedbackStore = subscribe(feedbackStore, (value) => $feedbackStore = value);
  let { data } = $$props;
  let pageLoading = false;
  let isFirstLoad = true;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  ({ feedbacks } = data);
  pageLoading = $feedbackStore.page_loading || isFirstLoad;
  $$unsubscribe_feedbackStore();
  return `<main class="md:container mt-24 px-5">${validate_component(Feedback_form, "FeedbackForm").$$render($$result, {}, {}, {})} ${validate_component(Feedback_stats, "FeedbackStats").$$render($$result, { feedbacks }, {}, {})} ${`${each(Array.from({ length: 4 }, (_, i) => i + 1), (i) => {
    return `${validate_component(Loading_skeleton, "LoadingSkeleton").$$render($$result, {}, {}, {})}`;
  })}`}</main> ${pageLoading ? `<div class="fixed top-5 left-5 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-yellow-400 border-r-transparent align-[-0.125em] text-warning motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status" data-svelte-h="svelte-vw8e6m"><span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span></div>` : ``}`;
});
export {
  Page as default
};
