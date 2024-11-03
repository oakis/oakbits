import { Divider } from "@/types";
import { ParsedUrlQuery } from "querystring";

export interface Match {
  matchRoundId: number;
  matchHasBeenPlayed: boolean;
  matchDivisionName: string;
  matchHomeTeamId: number;
  matchSeason: number;
  homeTeamClubId: number;
  matchDivisionId: number;
  matchHomeTeamName: string;
  matchAwayTeamId: number;
  awayTeamClubId: number;
  matchAwayTeamName: string;
  matchId: number;
  matchDateTime: string;
  matchVsResult: string;
  matchHomeTeamScore: number;
  matchAwayTeamScore: number;
  matchOilPatternId: number;
  matchOilPatternName: string;
  matchHallId: number;
  matchHallName: string;
  matchHallOnlineScoringUrl: string;
}

export interface Standing {
  standingsTeamId: number;
  standingsIsLastPositionBeforeDivider: boolean;
  standingsDividerType: Divider;
  clubTeamClubId: number;
  standingsTeamName: string;
  divisionLeagueId: number;
  standingsMatches: number;
  standingsWin: number;
  standingsDraw: number;
  standingsLoss: number;
  standingsTotal: string;
  standingsDiff: number;
  standingsPoints: number;
}

export interface Params extends ParsedUrlQuery {
  year: string;
  club: string;
  team: string;
  division: string;
}

export interface Props {
  matches: Match[][];
  played: Match[];
  upcoming: Match[];
  standings: Standing[];
}
