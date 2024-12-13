export const fetchFromBits = async (
  endpoint: string,
  params?: string,
  body?: object
) => {
  const startTime = performance.now();
  try {
    return await fetch(
      `https://api.swebowl.se/api/v1/${endpoint}?APIKey=${process.env.APIKEY}${
        params ? params : ""
      }`,
      {
        referrer: "https://bits.swebowl.se",
        headers: {
          Cookie: process.env.COOKIE as string,
          "Content-Type": "application/json",
        },
        ...(body && { method: "post", body: JSON.stringify(body) }),
      }
    )
      .then((data) => {
        if (data.status === 200) {
          return data;
        }
        throw data;
      })
      .then((data) => data.json());
  } catch (error) {
    console.error(error);
  } finally {
    console.log(
      `Request ${endpoint} took ${Math.round(performance.now() - startTime)}ms`
    );
  }
};

export const isSelectedTeam = (teamId: number, selectedTeam: string) =>
  teamId.toString() === selectedTeam;

export const getTeamUrl = (
  season: number | string,
  clubId: number | string,
  teamId: number | string,
  divisionId: number | string
) =>
  `https://bits.swebowl.se/team-detail?seasonId=${season}&clubId=${clubId}&teamId=${teamId}&divisionId=${divisionId}`;

const defaultPercentage = 70;
export const defaultMaxHCP = 40;

export const getHCP = (
  baseline: number,
  strength: number,
  percentage?: number,
  maxHCP?: number
): number =>
  Math.max(
    0,
    Math.min(
      maxHCP ?? defaultMaxHCP,
      Math.round(
        (baseline - strength) * ((percentage ?? defaultPercentage) / 100)
      )
    )
  );
