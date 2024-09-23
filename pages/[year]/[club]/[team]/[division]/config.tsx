import { ParsedUrlQuery } from "querystring";

export interface Match {
  matchRoundId: number;
  matchDate: string;
  matchTime: number;
  matchDateTime: string;
  matchId: number;
  matchHomeTeamId: number;
  matchHomeTeamName: string;
  matchHomeTeamAlias: string;
  matchAwayTeamId: number;
  matchAwayTeamName: string;
  matchAwayTeamAlias: string;
  matchHomeTeamScore: number;
  matchAwayTeamScore: number;
  matchHomeTeamResult: number;
  matchAwayTeamResult: number;
  matchOilPatternId: number;
  matchOilPatternName: string;
  matchHallId: number;
  matchHallName: string;
  matchHallCity: string;
  matchDivisionId: number;
  matchSeason: number;
  matchDateOld: string;
  matchTimeOld: number;
  matchStatus: number;
  matchVsTeams: string;
  matchVsResult: string;
  matchHasBeenPlayed: boolean;
  matchAlleyGroupName: string;
  matchDivisionName: string;
  matchLeagueName: string;
  matchLeagueId: number;
  matchNbrOfLanes: number;
  matchNbrOfPlayers: number;
  matchAllot: boolean;
  matchFinished: boolean;
  matchSchemeId: string;
  matchSchemeNbrOfLanes: number;
  matchSchemeNbrOfPlayers: number;
  matchDivisionSeasonHcpNettoOrBrutto: boolean;
  matchIsInNationalLeague: boolean;
  matchLeagueSeasonLevelRankType: string;
  matchStrikeOut: boolean;
  matchStrikeOutNbrOfRounds: number;
  matchDivisionSeasonNbrOfLanePoints: number;
  matchDivisionSeasonNbrOfBonusPoints: number;
  matchIsUsingLanePoints: boolean;
  matchHcp: number;
  matchLevelId: number;
  matchDivisionSeasonRankType: string;
  matchDivisionSeasonLanePoints: boolean;
  matchCupId: null;
  matchFinishedHomeTeam: boolean;
  matchFinishedAwayTeam: boolean;
  matchHcpTypeId: null;
  matchHcpTypeDescription: null;
  matchDivisionSeasonAverageFrom: number;
  matchDivisionSeasonAverageTo: number;
  matchDivisionSeasonMaxHcp: number;
  matchDivisionSeasonPercent: number;
  homeTeamClubId: number;
  awayTeamClubId: number;
  allowOilProfileUpdationTillDate: string;
  matchOilProfile: {
    oilPatternId: number;
    oilPatternName: string;
  };
  matchHallOnlineScoringUrl: string;
  currentDate: string;
  matchDivisionSeasonProtocolShared: boolean;
  matchDivisionSeasonConfirmed: boolean;
}

export interface Standing {
  standingsTeamId: number;
  standingsTeamName: string;
  standingsMatches: number;
  standingsWin: number;
  standingsDraw: number;
  standingsLoss: number;
  standingsHomePoints: number;
  standingsAwayPoints: number;
  standingsDiff: number;
  standingsPoints: number;
  standingsTotal: string;
  standingsIsLastPositionBeforeDivider: boolean;
  standingsDividerType: string;
  standingsBoss: number;
  cupId: number;
  divisionLeagueId: number;
  cupNbrOfRounds: number;
  standingsDivisionId: number;
  clubTeamClubId: number;
}

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
