import { ParsedUrlQuery } from "querystring";

export interface Params extends ParsedUrlQuery {
  id: string;
}

export interface PlayerInfoData {
  firstName: string;
  surName: string;
  licenseNumber: string;
  clubName: string;
  sex: string;
  playerStrength: number;
  playerHcp: number;
  playerRankPoints: number;
  playerRankPlace: string;
  playerAverage: number;
  agreementFirstClubName: string | null;
  agreementFirstClubId: number;
  agreementSecondClubName: string | null;
  agreementSecondClubId: number;
  overrideStrength: number;
  overrideAverage: number;
}

export interface PlayerInfo {
  firstName: string;
  surName: string;
  licenseNumber: string;
  clubName: string;
  sex: string;
  playerStrength: number;
  playerHcp: number;
  playerRankPoints: number;
  playerRankPlace: string;
  playerAverage: number;
  agreementFirstClubName: string | null;
  agreementFirstClubId: number;
  agreementSecondClubName: string | null;
  agreementSecondClubId: number;
  overrideStrength: number;
  overrideAverage: number;
  bestMatchResult: number | null;
  bestMatchAvg: number | null;
  bestMatchPlacement: number | null;
  bestTournamentResult: number | null;
  bestTournamentAvg: number | null;
  bestTournamentPlacement: number | null;
}

export interface CompetitionTypeData {
  rankTypeId: string;
  rankTypeName: string;
}

export interface CompetitionType {
  id: string;
  name: string;
}

export interface CompetitionGameData {
  placeTotal: number;
  rpPoints: number;
  laneRankPoints: number;
  divisionName: string | null;
  levelName: string | null;
  rankTypeDescriptionMatch: string | null;
  rankTypeDescription: string | null;
  teamAlias: string | null;
  eventStartDate: string;
  eventEndDate: string;
  totalResult: number;
  hcp: number;
  licenceEventResult: number;
  numberOfSeries: number;
  maxPoints: number;
  club: string | null;
  hallName: string;
  className: string | null;
  competitionName: string | null;
  type: number;
  matchId: number | null;
  compId: number;
  classId: number;
  compSeason: number;
}

export interface CompetitionGame {
  id: number;
  name: string;
  placement: number;
  category: string;
  location: string;
  team: string | null;
  result: number;
  hcp?: number;
  numSeries: number;
  avg: number;
  startDate: string;
  type: "match" | "tournament";
}

export interface PlayerCompetitionData {
  total: number;
  data: CompetitionGameData[];
  footer: {
    totalPlace: number;
    totalRPPoints: number;
    totalLaneRankPoints: number;
    totalLicenceEventResult: number;
    totalHcp: number;
    totalMaxPoints: number;
    totalNumberOfSeries: number;
    totalAverage: number;
    totalResult: number;
  };
}

export interface PlayerGraphData {
  date: string;
  strength: number;
  rankPoints: number;
  average: number;
  yearAverage: number;
  yearRankPoints: number;
  xAxisText: string;
  monthAverage?: number;
}

export interface PlayerCompetition {
  series: CompetitionGame[];
  tournaments: CompetitionGame[];
}

export interface Props {
  playerInfo: PlayerInfo;
  competitionTypes: CompetitionType[];
  playerCompetitions: PlayerCompetition;
  playerGraph: PlayerGraphData[];
}

interface MonthlyAverage {
  month: string;
  avg: number;
}

export const calculateMonthlyAverages = (
  games: CompetitionGame[]
): MonthlyAverage[] => {
  const monthlyData: Record<string, number[]> = {};

  games.forEach((game) => {
    const month = game.startDate.slice(0, 7);
    if (!monthlyData[month]) {
      monthlyData[month] = [];
    }
    monthlyData[month].push(game.avg);
  });

  const monthlyAverages: MonthlyAverage[] = Object.entries(monthlyData).map(
    ([month, averages]) => ({
      month,
      avg: averages.reduce((sum, val) => sum + val, 0) / averages.length,
    })
  );

  return monthlyAverages;
};

export const mapMatch = (match: CompetitionGameData): CompetitionGame => ({
  id: match.matchId ?? match.compId,
  type: match.type === 1 ? "match" : "tournament",
  avg: Math.round(match.licenceEventResult / match.numberOfSeries),
  category: `${match.rankTypeDescriptionMatch ?? match.rankTypeDescription} - ${
    match.maxPoints
  }`,
  team: match.teamAlias,
  location: match.hallName,
  name:
    match.type === 1
      ? `${match.divisionName}`
      : `${match.competitionName} - ${match.className}`,
  numSeries: match.numberOfSeries,
  placement: match.placeTotal,
  result: match.licenceEventResult,
  startDate: match.eventStartDate,
  ...(match.type === 2 && {
    hcp: match.hcp,
  }),
});
