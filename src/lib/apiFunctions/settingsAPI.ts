import fetchWrapper from "@/utils/fetchWrapper"

const url = '/api/settings/income-source';

// Income Source APIs
export const getIncomeSource = async () => {
    const res = await fetchWrapper.get(url);
    return await res;
}

export const createIncomeSource = async (payload) => {
    const res = await fetchWrapper.post(url, payload)
    return await res;
}

export const updateIncomeSource = async (id, payload: object) => {
    const res = await fetchWrapper.put(`${url}/${id}`, payload);
    return await res;
}