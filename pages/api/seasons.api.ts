import { fetchFromBits } from "@/utils/swebowl";
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
  const data: SeasonData[] = await fetchFromBits("Season");

  const seasons: ISeason[] = data.map((season) => ({
    id: season.seasonId,
    name: season.seasonName,
  }));

  res.status(200).json(seasons);
}
