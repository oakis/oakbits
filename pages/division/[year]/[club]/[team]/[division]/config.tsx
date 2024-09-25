import { Match, Standing } from "@/types";
import { ParsedUrlQuery } from "querystring";

export interface Params extends ParsedUrlQuery {
  year: string;
  club: string;
  team: string;
  division: string;
}

export interface Props {
  matches: Match[][];
  standings: Standing[];
  params: Params;
}
