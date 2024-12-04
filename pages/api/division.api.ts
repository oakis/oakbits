import { fetchFromBits } from "@/utils/swebowl";
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

  const data: DivisionData[] = await fetchFromBits(
    "Division",
    `&teamId=${team}&seasonId=${year}`
  );

  const division: IDivision[] = data.map((div) => ({
    id: div.divisionId,
    name: div.divisionName,
  }));

  res.status(200).json(division);
}
