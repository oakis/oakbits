import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Main from "@/components/Main";
import { fetchFromBits } from "@/utils/swebowl";
import { Props, ClubData } from "./config";
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
import Pagination from "@/components/Table/Pagination";

const twoDecimals = (num: number): string | number =>
  num === 0 ? "-" : num.toFixed(2);

interface Query {
  [key: string]: string;
}

export const getServerSideProps = (async (context) => {
  const query = context.query as Query;

  const search = query.search ?? "";
  const size = query.size ?? "10";
  const page = query.page ?? "1";

  const clubs: ClubData = await fetchFromBits("club/searchClubs", undefined, {
    search,
    take: size,
    skip: (parseInt(page) - 1) * parseInt(size),
    page,
    pageSize: size,
    sort: [{ field: "clubName", dir: "asc" }],
  });

  return {
    props: {
      clubs: clubs.data.map((club) => ({
        county: club.county,
        hallId: club.clubHallId,
        hallName: club.hallName,
        id: club.clubId,
        name: club.clubName,
      })),
      totalClubs: clubs.total,
    },
  };
}) satisfies GetServerSideProps<Props>;

export default function Page({
  clubs,
  totalClubs,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { query, push, pathname } = useRouter();
  const isMobile = useIsMobile();

  const [filter, setFilter] = useState(query.search ?? "");
  const [dirty, setDirty] = useState(false);

  const toggleCheckbox = () => {
    setDirty(true);
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
        };

        push({
          pathname,
          query: newQuery,
        });
      }, 300);

      return () => clearTimeout(timeoutId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

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
          placeholder="Sök efter förening.."
        />
      </div>
      {clubs.length === 0 ? (
        <span className="text-lg text-center">
          Hittade inga klubbar. Prova att söka på något annat.
        </span>
      ) : (
        <Table>
          <TableHead>
            <TableRow index={0} classes="bg-slate-600 text-slate-100">
              <TableHeadCell classes="!text-left">Förening</TableHeadCell>
              <TableHeadCell classes="!text-left">Distrikt</TableHeadCell>
              <TableHeadCell classes="!text-left">Hall</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clubs.map((club, i) => (
              <TableRow key={club.id} index={i + 1}>
                <TableCell classes="!text-left">
                  <a href={`/club/${club.id}`}>{club.name}</a>
                </TableCell>
                <TableCell classes="!text-left">{club.county}</TableCell>
                <TableCell classes="!text-left">{club.hallName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <tfoot>
            <TableRow index={0} classes="bg-slate-600 text-slate-100">
              <TableCell colSpan={3}>
                <Pagination total={totalClubs} />
              </TableCell>
            </TableRow>
          </tfoot>
        </Table>
      )}
    </Main>
  );
}
