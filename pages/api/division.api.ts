import type { NextApiRequest, NextApiResponse } from "next";

interface DivisionData {
  divisionId: string;
  divisionName: string;
}

export interface IDivision {
  id: string;
  name: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IDivision[]>
) {
  const { team, year } = req.query;

  const data: DivisionData[] = await fetch(
    `https://api.swebowl.se/api/v1/Division?&APIKey=${process.env.APIKEY}&teamId=${team}&seasonId=${year}`,
    {
      referrer: "https://bits.swebowl.se",
    }
  ).then((data) => data.json());

  const division: IDivision[] = data.map((div) => ({
    id: div.divisionId,
    name: div.divisionName,
  }));

  res.status(200).json(division);
}
