import type { NextApiRequest, NextApiResponse } from "next";

interface ClubData {
  clubId: string;
  clubName: string;
  clubLogoUrl: string;
}

export interface IClub {
  id: string;
  name: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IClub[]>
) {
  const data: ClubData[] = await fetch(
    `https://api.swebowl.se/api/v1/Club?&APIKey=${process.env.APIKEY}`,
    {
      referrer: "https://bits.swebowl.se",
    }
  ).then((data) => data.json());

  const clubs: IClub[] = data.map((club) => ({
    id: club.clubId,
    name: club.clubName,
  }));

  res.status(200).json(clubs);
}
