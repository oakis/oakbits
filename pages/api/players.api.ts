import { fetchFromBits } from "@/utils/swebowl";
import type { NextApiRequest, NextApiResponse } from "next";
import { PlayerData } from "../player/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PlayerData>
) {
  const { search, active, size, page, sort } = JSON.parse(req.body);

  const players: PlayerData = await fetchFromBits("player/getall", undefined, {
    search,
    TakeOnlyActive: active,
    take: size,
    skip: (parseInt(page) - 1) * parseInt(size),
    page,
    pageSize: size,
    sort,
  });

  console.log("HELLO FROM API");
  console.log("req.body", { search, active, size, page, sort });
  console.log({ players });

  if (!players || players.total === 0) {
    return res.status(404).end({ message: "No players found" });
  }

  res.status(200).json(players);
}
