import { http } from "@/api/http";
import { CATEGORIES } from "@/api/enpoints";

export const fetchCategories = async (payload: FetchCategoriesPayload) => {
  console.log(payload, 'payload - fetchCategories');

  const stringRequestBody = Object.entries(payload).reduce((acc, [key, value]) => {
    acc[key] = String(value);
    return acc;
  }, {} as Record<string, string>);

  const requestUrl = CATEGORIES.URL_CATEGORIES + "?" + new URLSearchParams(stringRequestBody).toString();


  return await http.get(requestUrl)
  .then(res => {
    console.log(res, "res - fetchCategories");

    return res?.data?.data;
  })
  .catch(e => console.error(e.message));
};

export const getCtegoryById = async (categoryId: number) => {
  if (!categoryId) { return console.error("Payload has no Id - getCtegoryById"); }

  return await http.get(`${CATEGORIES.URL_CATEGORIES}/${categoryId}`)
  .then(res => {
    console.log(res, "res - getCtegoryById");

    return res.data.data;
  })
  .catch(e => console.error(e.message));
};

export const createCategory = async (payload: CreateCategoryPayload) => {

  return await http.post(CATEGORIES.URL_CATEGORIES, payload)
  .then(res => {
    console.log(res, "res - createCategory");

    const { category, user } = res.data.data;
    console.log(category, "category");
    console.log(user, "user");

    return category;
  })
  .catch(e => console.error(e.message));
};

export const searchCategory = async (payload: SearchCategoryPayload) => {

  return await http.post(CATEGORIES.SEARCH_CATEGORY, payload)
  .then(res => {
    console.log(res, "res - searchCategory");

    return res.data;
  })
  .catch(e => console.error(e.message));
};
