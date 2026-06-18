export type ShortenURLRequest = {
  originalUrl: string;
};

export type ShortURLData = {
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type ShortenURLResponse = {
  status: string;
  message: string;
  data: ShortURLData;
  options: null;
};
