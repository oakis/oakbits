import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Main from "@/components/Main";
import { fetchFromBits } from "@/utils/swebowl";
import PlayerTable from "@/components/PlayerTable";
import { PlayerData } from "@/pages/player/config";
import { ClubData, Props, TeamsData } from "./config";
import ClubLogo from "@/components/ClubLogo";
import { useRouter } from "next/router";
import Card from "@/pages/player/[id]/Card";
import { PaginationSizes } from "@/components/Table/Pagination";
import TeamsTable from "@/src/components/TeamsTable";

interface Query {
  [key: string]: string;
}

export const getServerSideProps = (async (context) => {
  const { id } = context.params!;
  const query = context.query as Query;

  const size = query.size ?? "50";
  const page = query.page ?? "1";

  const [players, infoData, teams] = await Promise.all([
    (await fetchFromBits("player/GetAll", undefined, {
      ClubId: id,
      TakeOnlyActive: true,
      take: size,
      skip: (parseInt(page) - 1) * parseInt(size),
      page,
      pageSize: size,
      sort: [{ field: "firstName", dir: "asc" }],
    })) as PlayerData,
    (await fetchFromBits(
      "club/GetClubById",
      `&clubId=${id}&seasonId=2024`
    )) as ClubData,
    (await fetchFromBits("team/GetAllActiveTeams", undefined, {
      ClubId: id,
      take: "50",
      skip: 0,
      page: 1,
      pageSize: "50",
      sort: [{ field: "teamName", dir: "asc" }],
    })) as TeamsData,
  ]);

  const info = {
    agreementClubId: infoData.agreementSecondClubId,
    agreementClubName: infoData.agreementSecondClubName,
    county: infoData.county,
    hallId: infoData.clubHallId,
    hallName: infoData.hallName,
    name: infoData.clubName,
  };

  return {
    props: {
      players: players.data,
      totalPlayers: players.total,
      info,
      teams: teams.data.map((team) => ({
        id: team.teamId,
        name: team.teamName,
        type: team.teamTypeDescription,
      })),
    },
  };
}) satisfies GetServerSideProps<Props>;

export default function Page({
  players,
  totalPlayers,
  info,
  teams,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { query } = useRouter();
  return (
    <Main classes="px-4 gap-4">
      <div className="flex items-center justify-center">
        <ClubLogo
          wrapperClasses="relative w-36 h-36"
          errorComponent={
            <h1 className="text-3xl font-semibold text-center">{info.name}</h1>
          }
          id={query.id as string}
          name={info.name}
          imageProps={{
            priority: true,
            fill: true,
            sizes: "144px",
            style: { objectFit: "contain", objectPosition: "center center" },
          }}
        />
      </div>
      <div className="flex flex-row gap-4 flex-wrap">
        <Card
          title="Hall"
          value={info.hallName}
          href={`https://bits.swebowl.se/hall-detail?seasonId=2024&hallId=${info.hallId}&activeTabId=1`}
        />
        <Card title="Distrikt" value={info.county} />
        {info.agreementClubId && info.agreementClubName ? (
          <Card
            title="Avtal"
            value={info.agreementClubName}
            href={`/club/${info.agreementClubId}`}
          />
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Lag</h2>
        {teams.length === 0 ? (
          <span className="text-lg text-center">Hittade inga lag.</span>
        ) : (
          <TeamsTable teams={teams} />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Spelare</h2>
        {players.length === 0 ? (
          <span className="text-lg text-center">Hittade inga licenser.</span>
        ) : (
          <PlayerTable
            players={players}
            totalPlayers={totalPlayers}
            defaultPageSize={PaginationSizes.Fifty}
          />
        )}
      </div>
    </Main>
  );
}
