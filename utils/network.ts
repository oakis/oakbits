export const fetchFromAPI = async (url: string, init: RequestInit) =>
  await fetch(`${process.env.NEXT_PUBLIC_URL}${url}`, init);
