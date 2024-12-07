import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Main from "@/components/Main";
import { fetchFromBits, getHCP } from "@/utils/swebowl";
import {
  CompetitionGame,
  CompetitionGameData,
  CompetitionTypeData,
  Params,
  PlayerCompetitionData,
  PlayerInfoData,
  Props,
} from "./config";
import ProfilePicture from "@/components/ProfilePicture";
import Card from "./Card";
import Matches from "./Matches";
import { getHighestNumber, getLowestNumber } from "@/utils/array";

const mapMatch = (match: CompetitionGameData): CompetitionGame => ({
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

export const getServerSideProps = (async (context) => {
  const { id } = context.params!;

  const today = new Date();
  const fromDate = new Date(Date.UTC(today.getFullYear(), 6, 1, 0, 0, 0, 0));
  const toDate = new Date(Date.UTC(today.getFullYear() + 1, 5, 30, 0, 0, 0, 0));

  const [playerInfo, competitionTypes, playerCompetitions] = await Promise.all([
    (await fetchFromBits(
      "player/PlayerProfileDetail",
      `&licenseNumber=${id}&seasonId=2024`
    )) as PlayerInfoData,
    (await fetchFromBits(
      "Player/PlayerDetailRankTypeList",
      `&licenseNumber=${id}`
    )) as CompetitionTypeData[],
    (await fetchFromBits("Player/PlayerDetail", undefined, {
      search: id,
      QueryTypeId: 4,
      RankTypeId: "",
      MatchTypeId: "",
      FromDate: fromDate,
      ToDate: toDate,
      take: "500",
      skip: 0,
      page: 1,
      pageSize: "500",
    })) as PlayerCompetitionData,
  ]);

  const [series, tournaments] = playerCompetitions.data.reduce<
    [CompetitionGame[], CompetitionGame[]]
  >(
    ([type1Arr, type2Arr], item) => {
      if (item.type === 1) {
        type1Arr.push(mapMatch(item));
      } else if (item.type === 2) {
        type2Arr.push(mapMatch(item));
      }
      return [type1Arr, type2Arr];
    },
    [[], []]
  );

  const bestMatchAvg = series.length ? getHighestNumber(series, "avg") : null;
  const bestMatchPlacement = series.length
    ? getLowestNumber(series, "placement")
    : null;
  const bestMatchResult = series.length
    ? getHighestNumber(
        series.filter((x) => x.numSeries === 4),
        "result"
      )
    : null;
  const bestTournamentAvg = tournaments.length
    ? getHighestNumber(tournaments, "avg")
    : null;
  const bestTournamentPlacement = tournaments.length
    ? getLowestNumber(tournaments, "placement")
    : null;
  const bestTournamentResult = tournaments.length
    ? getHighestNumber(
        tournaments.filter((x) => x.numSeries === 6),
        "result"
      )
    : null;

  return {
    props: {
      playerInfo: {
        ...playerInfo,
        bestMatchAvg,
        bestMatchPlacement,
        bestMatchResult,
        bestTournamentAvg,
        bestTournamentPlacement,
        bestTournamentResult,
      },
      competitionTypes: competitionTypes.map((x) => ({
        id: x.rankTypeId,
        name: x.rankTypeName,
      })),
      playerCompetitions: {
        series,
        tournaments,
      },
    },
  };
}) satisfies GetServerSideProps<Props, Params>;

export default function Page({
  playerInfo,
  competitionTypes,
  playerCompetitions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Main classes="px-4">
      <div className="flex flex-row gap-4 items-center">
        <div className="relative" style={{ height: 150, width: 150 }}>
          <ProfilePicture
            id={playerInfo.licenseNumber}
            name={playerInfo.firstName}
            imageProps={{
              fill: true,
              sizes: "150px",
              priority: true,
              style: {
                objectFit: "cover",
                objectPosition: "center top",
                borderRadius: "50%",
              },
            }}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-semibold">
            {playerInfo.firstName} {playerInfo.surName}
          </span>
          <span className="text-sm">({playerInfo.licenseNumber})</span>
          <span className="text-md font-semibold">{playerInfo.clubName}</span>
        </div>
      </div>
      <div className="flex flex-row gap-4 flex-wrap">
        <Card title="Spelstyrka" value={playerInfo.playerStrength} />
        <Card title="Rankingpoäng" value={playerInfo.playerRankPoints} />
        <Card title="Rankingplacering" value={playerInfo.playerRankPlace} />
        <Card title="Snitt" value={playerInfo.playerAverage} />
      </div>
      {playerCompetitions.series.length !== 0 ? (
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-semibold">Match</span>
          <div className="flex flex-row gap-4 flex-wrap">
            {playerInfo.bestMatchAvg && (
              <Card title="Bästa snitt" value={playerInfo.bestMatchAvg} />
            )}
            {playerInfo.bestMatchResult && (
              <Card
                title="Bästa resultat (4 serier)"
                value={playerInfo.bestMatchResult}
              />
            )}
            {playerInfo.bestMatchPlacement && (
              <Card
                title="Bästa placering"
                value={playerInfo.bestMatchPlacement}
              />
            )}
          </div>
        </div>
      ) : null}
      <div className="flex flex-col gap-4">
        <span className="text-2xl font-semibold">Turnering</span>
        <div className="flex flex-row gap-4 flex-wrap">
          {playerInfo.bestTournamentAvg && (
            <Card title="Bästa snitt" value={playerInfo.bestTournamentAvg} />
          )}
          {playerInfo.bestTournamentResult && (
            <Card
              title="Bästa resultat (6 serier)"
              value={playerInfo.bestTournamentResult}
            />
          )}
          {playerInfo.bestTournamentPlacement && (
            <Card
              title="Bästa placering"
              value={playerInfo.bestTournamentPlacement}
            />
          )}
          <Card
            title="GBG-Tour HCP"
            value={getHCP(228, playerInfo.playerStrength)}
          />
        </div>
      </div>
      <Matches
        gameType="match"
        games={playerCompetitions.series}
        title="Matcher"
      />
      <Matches
        gameType="tournament"
        games={playerCompetitions.tournaments}
        title="Turneringar"
      />
    </Main>
  );
}
