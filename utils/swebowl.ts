export const fetchFromBits = async (endpoint: string, params?: string) => {
  try {
    return await fetch(
      `https://api.swebowl.se/api/v1/${endpoint}?APIKey=${process.env.APIKEY}${
        params ? params : ""
      }`,
      {
        referrer: "https://bits.swebowl.se",
        headers: {
          Cookie: process.env.COOKIE as string,
        },
      }
    ).then((data) => data.json());
  } catch (error) {
    console.error(error);
  }
};
