import axiosInstance from "@/services/axiosInstance";

export async function postSingleDrug(payload: any) {
  const response = await axiosInstance.post(
    "/prescriptions/single-drug",
    payload
  );
  return response;
}

//get list drug

export async function getListDrug(page: number, keyword: string) {
  const response = await axiosInstance.get("/drugs", {
    params: {
      page,
    },
  });
  return response;
}

//get list prescriptions

export async function getListPrescriptions(date: string) {
  const response = await axiosInstance.get("/prescriptions/schedules", {
    params: {
      date,
    },
  });
  return response;
}
