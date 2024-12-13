import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Main from "@/components/Main";
import { fetchFromBits, getHCP } from "@/utils/swebowl";
import {
  calculateMonthlyAverages,
  CompetitionGame,
  CompetitionTypeData,
  mapMatch,
  Params,
  PlayerCompetitionData,
  PlayerGraphData,
  PlayerInfoData,
  Props,
} from "./config";
import ProfilePicture from "@/components/ProfilePicture";
import Card from "./Card";
import Matches from "./Matches";
import { getHighestNumber, getLowestNumber } from "@/utils/array";
import LineGraph from "./LineGraph";

export const getServerSideProps = (async (context) => {
  const { id } = context.params!;

  const today = new Date();
  const fromDate = new Date(Date.UTC(today.getFullYear(), 6, 1, 0, 0, 0, 0));
  const toDate = new Date(Date.UTC(today.getFullYear() + 1, 5, 30, 0, 0, 0, 0));

  const [playerInfo, competitionTypes, playerCompetitions, playerGraphData] =
    await Promise.all([
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
      (await fetchFromBits(
        "Player/PlayerDetailGraphData",
        `&licenseNumber=${id}&type=2`
      )) as PlayerGraphData[],
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

  const sixSeriesTournaments = tournaments.filter((x) => x.numSeries === 6);

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
  const bestTournamentResult = sixSeriesTournaments.length
    ? getHighestNumber(sixSeriesTournaments, "result")
    : null;

  const monthlyAvg = calculateMonthlyAverages(
    [...series, ...tournaments].sort((a, b) => {
      if (a.startDate > b.startDate) return 1;
      if (b.startDate > a.startDate) return -1;
      return 0;
    })
  );

  const playerGraph = playerGraphData.map((graph) => {
    const graphMonth = graph.date.slice(0, 7);
    const monthlyAvgMonth = monthlyAvg.find((avg) => avg.month === graphMonth);
    if (monthlyAvgMonth) {
      return { ...graph, monthAverage: monthlyAvgMonth.avg };
    }
    return graph;
  });

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
      playerGraph,
    },
  };
}) satisfies GetServerSideProps<Props, Params>;

export default function Page({
  playerInfo,
  playerCompetitions,
  playerGraph,
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
            value={`~${getHCP(228, playerInfo.playerStrength)}`}
          />
        </div>
      </div>
      <LineGraph data={playerGraph} />
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
