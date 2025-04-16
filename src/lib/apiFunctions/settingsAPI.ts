import fetchWrapper from "@/utils/fetchWrapper";

const url = "/api/settings/income-source";

// Income Source APIs
export const getIncomeSource = () => {
  return fetchWrapper.get(url);
};

export const createIncomeSource = (payload) => {
  return fetchWrapper.post(url, payload);
};

export const updateIncomeSource = (id, payload: object) => {
  return fetchWrapper.put(`${url}/${id}`, payload);
};

export const deleteIncomeSource = (id) => {
  return fetchWrapper.delete(`${url}/${id}`);
};
