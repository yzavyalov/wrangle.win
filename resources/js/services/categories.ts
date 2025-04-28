import { http } from "@/api/http";
import { CATEGORIES } from "@/api/enpoints";

export const getAllCtegories = async () => {

  return await http.get(CATEGORIES.URL_CATEGORIES)
  .then(res => {
    console.log(res, "res - getAllCtegories");

    return res.data.data;
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

    return res.data;
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
