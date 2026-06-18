import api from "@/app/api/api";
import type { ShortenURLRequest, ShortenURLResponse } from "./url.types";

export const shortenURL = async (
  payload: ShortenURLRequest,
): Promise<ShortenURLResponse> => {
  const { data } = await api.post<ShortenURLResponse>("/url/create", payload);
  return data;
};
