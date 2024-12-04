import { fetchFromBits } from "@/utils/swebowl";
import type { NextApiRequest, NextApiResponse } from "next";

interface TeamData {
  teamId: number;
  teamName: string;
  teamAlias: string;
}

export interface ITeam {
  id: number;
  name: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ITeam[]>
) {
  const { club, year } = req.query;

  const data: TeamData[] = await fetchFromBits(
    "Team",
    `&clubId=${club}&seasonId=${year}`
  );

  const teams: ITeam[] = data.map((team) => ({
    id: team.teamId,
    name: team.teamAlias,
  }));

  res.status(200).json(teams);
}
