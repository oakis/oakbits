import { ParsedUrlQuery } from "querystring";

export interface Params extends ParsedUrlQuery {
  id: string;
}

export interface GameInfo {
  dayOfWeek: string;
  divisionIsCup: boolean;
  matchId: number;
  standingsURL: string;
  matchFactURL: string;
  hallSchemeURL: string;
  matchTeamHomeVsAway: string;
  matchDateTime: string;
  matchEndDateTime: string;
  matchIdPrevious: number;
  matchLotTemplateRowRoundNbr: number;
  matchStatus: number;
  matchHomeTeamId: number;
  matchHomeClubId: number;
  matchAwayClubId: number;
  matchHomeTeamTypeType: string;
  matchAwayTeamTypeType: string;
  matchHomeTeamName: string;
  matchHomeTeamAlias: string;
  matchAwayTeamId: number;
  matchAwayTeamName: string;
  matchAwayTeamAlias: string;
  matchAlleyGroup: number;
  alleyGroupName: string;
  alleyGroupStartLane: number;
  alleyGroupNbrOfLanes: number;
  rankCompetition: number;
  matchDate: string;
  matchDivisionId: number;
  divisionRegion: number;
  matchLeagueId: number;
  matchLevelId: number;
  matchDivisionHcp: number;
  matchDivisionName: string;
  matchDivisionShortName: string;
  matchHallId: number;
  matchHallName: string;
  matchRoundId: number;
  matchNbrOfLanes: number;
  matchNbrOfPlayers: number;
  matchSchemeId: string;
  matchFinished: boolean;
  matchTime: number;
  matchEndTime: number;
  levelPlayTime: number;
  matchTimeOld: number;
  matchDateOld: string;
  matchHcp: number;
  matchBossGroup: number;
  matchLanePoints: boolean;
  matchHomeTeamScore: number;
  matchAwayTeamScore: number;
  matchHomeTeamResult: number;
  matchAwayTeamResult: number;
  matchSeason: number;
  licenceAgreementSeason: number;
  clubAgreementSeason: number;
  teamLevel: number;
  matchOmit: boolean;
  hallIdSbhf: number;
  matchAllot: boolean;
  matchLotExtraMatch: boolean;
  matchStrikeOut: boolean;
  matchStrikeOutNbrOfRounds: number;
  matchCompetitionLevel: number;
  matchStrikeOutBool: boolean;
  matchDateTimeChanged: boolean;
  matchHomeTeamVsAwayTeam: string;
  matchResult: string;
  matchTeams: string;
  homeTeamStartLane: number;
  homeTeamNbrOfLanes: number;
  homeTeamLaneGroup: string;
  matchHour: number;
  matchMinute: number;
  matchDayFormatted: string;
  matchDayFormattedWithRound: string;
  matchDayFormattedReportDates: string;
  regionName: string;
  matchTimeFormatted: string;
  matchTimeOldFormatted: string;
  matchRoundFormatted: string;
  matchAwayTeamHallAndTime: string;
  matchRowNbr: number;
  matchOilPatternId: number;
  oilPatterns: string[];
  matchOilPatternName: string;
  matchFinishedHomeTeam: boolean;
  matchFinishedAwayTeam: boolean;
  matchReportStartDate: string;
  matchReportEndDate: string;
  cupId: number;
  cupRoundId: number;
  cupCellNbr: number;
  cupNbrOfMatches: number;
  lotTemplateIncludeMatchFromPreviousRound: boolean;
  divisionSeasonStartMatchDayNo: number;
}

export interface BoardScore {
  playerName: string;
  score: string;
  laneScore: string;
  scoreId: string;
}

export interface Board {
  scores: BoardScore[];
  boardId: string;
  boardName: string;
}

export interface Series {
  boards: Board[];
  serieId: string;
  serieName: string;
}

export interface IScores {
  series: Series[];
  serieNames: string[];
  boardNames: string[];
  scoreKvpList: {
    lblSerie1Table1Order1: BoardScore;
    lblSerie1Table2Order1: BoardScore;
    lblSerie1Table3Order1: BoardScore;
    lblSerie1Table4Order1: BoardScore;
    lblSerie1Table1Order2: BoardScore;
    lblSerie1Table2Order2: BoardScore;
    lblSerie1Table3Order2: BoardScore;
    lblSerie1Table4Order2: BoardScore;
    lblSerie1Table1Order3: BoardScore;
    lblSerie1Table2Order3: BoardScore;
    lblSerie1Table3Order3: BoardScore;
    lblSerie1Table4Order3: BoardScore;
    lblSerie1Table1Order4: BoardScore;
    lblSerie1Table2Order4: BoardScore;
    lblSerie1Table3Order4: BoardScore;
    lblSerie1Table4Order4: BoardScore;
    lblSerie2Table1Order1: BoardScore;
    lblSerie2Table2Order1: BoardScore;
    lblSerie2Table3Order1: BoardScore;
    lblSerie2Table4Order1: BoardScore;
    lblSerie2Table1Order2: BoardScore;
    lblSerie2Table2Order2: BoardScore;
    lblSerie2Table3Order2: BoardScore;
    lblSerie2Table4Order2: BoardScore;
    lblSerie2Table1Order3: BoardScore;
    lblSerie2Table2Order3: BoardScore;
    lblSerie2Table3Order3: BoardScore;
    lblSerie2Table4Order3: BoardScore;
    lblSerie2Table1Order4: BoardScore;
    lblSerie2Table2Order4: BoardScore;
    lblSerie2Table3Order4: BoardScore;
    lblSerie2Table4Order4: BoardScore;
    lblSerie3Table1Order1: BoardScore;
    lblSerie3Table2Order1: BoardScore;
    lblSerie3Table3Order1: BoardScore;
    lblSerie3Table4Order1: BoardScore;
    lblSerie3Table1Order2: BoardScore;
    lblSerie3Table2Order2: BoardScore;
    lblSerie3Table3Order2: BoardScore;
    lblSerie3Table4Order2: BoardScore;
    lblSerie3Table1Order3: BoardScore;
    lblSerie3Table2Order3: BoardScore;
    lblSerie3Table3Order3: BoardScore;
    lblSerie3Table4Order3: BoardScore;
    lblSerie3Table1Order4: BoardScore;
    lblSerie3Table2Order4: BoardScore;
    lblSerie3Table3Order4: BoardScore;
    lblSerie3Table4Order4: BoardScore;
    lblSerie4Table1Order1: BoardScore;
    lblSerie4Table2Order1: BoardScore;
    lblSerie4Table3Order1: BoardScore;
    lblSerie4Table4Order1: BoardScore;
    lblSerie4Table1Order2: BoardScore;
    lblSerie4Table2Order2: BoardScore;
    lblSerie4Table3Order2: BoardScore;
    lblSerie4Table4Order2: BoardScore;
    lblSerie4Table1Order3: BoardScore;
    lblSerie4Table2Order3: BoardScore;
    lblSerie4Table3Order3: BoardScore;
    lblSerie4Table4Order3: BoardScore;
    lblSerie4Table1Order4: BoardScore;
    lblSerie4Table2Order4: BoardScore;
    lblSerie4Table3Order4: BoardScore;
    lblSerie4Table4Order4: BoardScore;
  };
  boardColSpan: number;
}

export interface Player {
  player: string;
  licNbr: string;
  homeOrAwayTeam: string;
  result1: number;
  result2: number;
  result3: number;
  result4: number;
  hcp: number;
  totalResultWithoutHcp: number;
  totalSeries: number;
  lanePoint: number;
  laneRankPoints: number;
  place: number;
  totalResult: number;
  rankPoints: number;
  totalPoints: number;
}

export interface PlayerStats {
  playerListHome: Player[];
  playerListAway: Player[];
}

export interface GameStatDetail {
  squadId: number;
  teamScore: number;
  teamRP: number;
}

export interface GameStatsData {
  matchHeadHomeTeamResult: number;
  matchHeadAwayTeamResult: number;
  matchHeadHomeTotalScore: number;
  matchHeadAwayTotalScore: number;
  matchHeadHomeTotalRp: number;
  matchHeadAwayTotalRp: number;
  homeHeadDetails: GameStatDetail[];
  awayHeadDetails: GameStatDetail[];
  matchHeadHomeTeamScoreRound1: number;
  matchHeadHomeTeamScoreRound2: number;
  matchHeadHomeTeamScoreRound3: number;
  matchHeadHomeTeamScoreRound4: number;
  matchHeadHomeTeamRankPointRound1: number;
  matchHeadHomeTeamRankPointRound2: number;
  matchHeadHomeTeamRankPointRound3: number;
  matchHeadHomeTeamRankPointRound4: number;
  matchHeadAwayTeamScoreRound1: number;
  matchHeadAwayTeamScoreRound2: number;
  matchHeadAwayTeamScoreRound3: number;
  matchHeadAwayTeamScoreRound4: number;
  matchHeadAwayTeamRankPointRound1: number;
  matchHeadAwayTeamRankPointRound2: number;
  matchHeadAwayTeamRankPointRound3: number;
  matchHeadAwayTeamRankPointRound4: number;
  matchHeadHomeTeamScore: number;
  matchHeadAwayTeamScore: number;
  matchHeadHomeTeamRankPoints: number;
  matchHeadAwayTeamRankPoints: number;
}

export interface GameStatsRow {
  series: number;
  homeScore: number;
  homeRp: number;
  awayScore: number;
  awayRp: number;
}

export type GameStats = GameStatsRow[];

export interface Props {
  playerStats: PlayerStats;
  scores: IScores;
  gameInfo: GameInfo;
  gameStats: GameStats;
  scoringUrl: string | null;
}
