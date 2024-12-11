import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Main from "@/components/Main";
import { fetchFromBits } from "@/utils/swebowl";
import { Props, PlayerData } from "./config";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "@/components/Table";
import clsx from "clsx";
import { useEffect, useState } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import { useRouter } from "next/router";

const twoDecimals = (num: number): string | number =>
  num === 0 ? "-" : num.toFixed(2);

export const getServerSideProps = (async (context) => {
  const { query } = context;

  const search = query.search ?? "";
  const size = query.size ?? "10";
  const active = query.active === "false" ? false : true;

  const players: PlayerData = await fetchFromBits("player/GetAll", undefined, {
    search,
    TakeOnlyActive: active,
    take: size,
    skip: 0,
    page: 1,
    pageSize: size,
    sort: [
      { field: "clubName", dir: "asc" },
      { field: "firstName", dir: "asc" },
    ],
  });

  return {
    props: {
      players: players.data,
    },
  };
}) satisfies GetServerSideProps<Props>;

export default function Page({
  players,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { query, push } = useRouter();
  const isMobile = useIsMobile();

  const [filter, setFilter] = useState(query.search ?? "");
  const [active, setActive] = useState(query.active === "false" ? false : true);
  const [dirty, setDirty] = useState(false);

  const toggleCheckbox = () => {
    setDirty(true);
    setActive(!active);
  };

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDirty(true);
    setFilter(event.target.value);
  };

  useEffect(() => {
    if (dirty) {
      const timeoutId = setTimeout(() => {
        const newQuery = {
          ...query,
          search: filter || undefined,
          active: active ? "true" : "false",
        };

        push({
          pathname: window.location.pathname,
          query: newQuery,
        });
      }, 300);

      return () => clearTimeout(timeoutId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, active]);

  return (
    <Main classes="px-4">
      <div className="flex flex-row gap-4 items-center">
        <input
          value={filter}
          onChange={onSearch}
          className={clsx(
            "px-2 py-1 pr-8 rounded-md bg-slate-100 relative",
            isMobile && "w-full"
          )}
          placeholder="Sök efter namn eller förening.."
        />
        <div className="flex flex-row gap-2">
          <label htmlFor="active">Aktiv</label>
          <input
            id="active"
            checked={active}
            type="checkbox"
            onChange={toggleCheckbox}
          />
        </div>
      </div>
      {players.length === 0 ? (
        <span className="text-lg text-center">
          Hittade inga licenser. Prova att söka på något annat.
        </span>
      ) : (
        <Table>
          <TableHead>
            <TableRow index={0} classes="bg-slate-600 text-slate-100">
              <TableHeadCell>Licensnr.</TableHeadCell>
              <TableHeadCell>Förnamn</TableHeadCell>
              <TableHeadCell>Efternamn</TableHeadCell>
              <TableHeadCell>Födelsedatum</TableHeadCell>
              <TableHeadCell>Distrikt</TableHeadCell>
              <TableHeadCell>Förening</TableHeadCell>
              <TableHeadCell>Licenstyp</TableHeadCell>
              <TableHeadCell>Spelstyrka</TableHeadCell>
              <TableHeadCell>Snitt</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((player, i) => (
              <TableRow key={player.licNbr} index={i + 1}>
                <TableCell>
                  <a href={`/player/${player.licNbr}`}>{player.licNbr}</a>
                </TableCell>
                <TableCell>{player.firstName}</TableCell>
                <TableCell>{player.surName}</TableCell>
                <TableCell>{player.age}</TableCell>
                <TableCell>{player.county}</TableCell>
                <TableCell>{player.clubName}</TableCell>
                <TableCell>{player.licTypeName}</TableCell>
                <TableCell>{twoDecimals(player.licenceSkillLevel)}</TableCell>
                <TableCell>{twoDecimals(player.licenceAverage)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Main>
  );
}
