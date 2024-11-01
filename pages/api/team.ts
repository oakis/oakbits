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

  const data: TeamData[] = await fetch(
    `https://api.swebowl.se/api/v1/Team?&APIKey=${process.env.APIKEY}&clubId=${club}&seasonId=${year}`,
    {
      referrer: "https://bits.swebowl.se",
    }
  ).then((data) => data.json());

  const teams: ITeam[] = data.map((team) => ({
    id: team.teamId,
    name: team.teamAlias,
  }));

  res.status(200).json(teams);
}
