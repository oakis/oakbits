import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Main from "@/components/Main";
import { fetchFromBits } from "@/utils/swebowl";
import { Props, PlayerData } from "./config";
import clsx from "clsx";
import { useEffect, useState } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import { useRouter } from "next/router";
import PlayerTable from "@/components/PlayerTable";

interface Query {
  [key: string]: string;
}

export const getServerSideProps = (async (context) => {
  const query = context.query as Query;

  const search = query.search ?? "";
  const size = query.size ?? "10";
  const active = query.active === "false" ? false : true;
  const page = query.page ?? "1";

  const players: PlayerData = await fetchFromBits("player/GetAll", undefined, {
    search,
    TakeOnlyActive: active,
    take: size,
    skip: (parseInt(page) - 1) * parseInt(size),
    page,
    pageSize: size,
    sort: [{ field: "firstName", dir: "asc" }],
  });

  return {
    props: {
      players: players.data,
      totalPlayers: players.total,
    },
  };
}) satisfies GetServerSideProps<Props>;

export default function Page({
  players,
  totalPlayers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { query, push, pathname } = useRouter();
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
          pathname,
          query: newQuery,
        });
      }, 300);

      return () => clearTimeout(timeoutId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, active]);

  return (
    <Main classes="px-4 gap-4">
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
        <PlayerTable players={players} totalPlayers={totalPlayers} />
      )}
    </Main>
  );
}
