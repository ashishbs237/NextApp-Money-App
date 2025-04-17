import fetchWrapper from "@/utils/fetchWrapper";

const incomeSettingsUrl = "/api/settings/income";
const expenseSettingsUrl = "/api/settings/expense";

// Income Label APIs
export const getIncomeLabels = () => {
  return fetchWrapper.get(incomeSettingsUrl);
};

export const createIncomeLabel = (payload) => {
  return fetchWrapper.post(incomeSettingsUrl, payload);
};

export const updateIncomeLabel = (id, payload: object) => {
  return fetchWrapper.put(`${incomeSettingsUrl}/${id}`, payload);
};

export const deleteIncomeLabel = (id) => {
  return fetchWrapper.delete(`${incomeSettingsUrl}/${id}`);
};

// Expense Source APIs
export const getExpenseLabels = () => {
  return fetchWrapper.get(expenseSettingsUrl);
};

export const createExpenseLabel = (payload) => {
  return fetchWrapper.post(expenseSettingsUrl, payload);
};

export const updateExpenseLabel = (id, payload: object) => {
  return fetchWrapper.put(`${expenseSettingsUrl}/${id}`, payload);
};

export const deleteExpenseLabel = (id) => {
  return fetchWrapper.delete(`${expenseSettingsUrl}/${id}`);
};
