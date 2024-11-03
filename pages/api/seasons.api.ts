import type { NextApiRequest, NextApiResponse } from "next";

interface SeasonData {
  seasonId: number;
  seasonName: string;
  seasonShortName: string;
  seasonDateFrom: string;
  seasonDateTo: string;
  seasonShowInQuery: boolean;
  boLeagueSeason: unknown[];
}

export interface ISeason {
  id: number;
  name: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ISeason[]>
) {
  console.log("APIKEY:", process.env.APIKEY);

  const data: SeasonData[] = await fetch(
    `https://api.swebowl.se/api/v1/Season?&APIKey=${process.env.APIKEY}`,
    {
      referrer: "https://bits.swebowl.se",
    }
  )
    .then((data) => data.json())
    .catch((error) => console.log({ error }));

  const seasons: ISeason[] = data.map((season) => ({
    id: season.seasonId,
    name: season.seasonName,
  }));

  res.status(200).json(seasons);
}
