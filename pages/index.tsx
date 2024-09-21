import type { InferGetServerSidePropsType } from "next";
import puppeteer from "puppeteer";

interface Match {
  className: string;
  textContent: string | null;
  columns?: string[];
}

interface Round {
  header: string;
  matches: Match[];
}

export const getServerSideProps = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(
    "https://bits.swebowl.se/seriespel?seasonId=2024&clubId=6629&teamId=171320&divisionId=18&showTeamDivisionTable=true&showAllDivisionMatches=true&showTeamDetails=true",
    { waitUntil: "networkidle2" }
  );

  const rows = await page.evaluate(() => {
    const filterCols = (str: string) =>
      str.length > 0 &&
      !str.includes("Omgång") &&
      !str.includes("Matchfakta") &&
      str !== " ";

    return Array.from(
      Array.from(document.getElementsByTagName("tbody"))
        .filter((el) => el.role === "rowgroup")
        .toSpliced(0, 3)[0].children
    ).map((row) => ({
      className: row.className,
      textContent: row.textContent,
      ...(row.className !== "k-grouping-row" && {
        columns: Array.from(row.children)
          .map((child) => child.textContent ?? "")
          .filter((str) => filterCols(str.replace(/\u00A0/g, ""))),
      }),
    }));
  });

  await browser.close();

  const numberOfRounds = rows.filter(
    (row) => row.className === "k-grouping-row"
  ).length;

  const result: Round[] = Array.from({ length: numberOfRounds }, () => ({
    header: "",
    matches: [],
  }));

  let count = 0;

  rows.forEach((row, index) => {
    if (row.className !== "k-grouping-row") {
      result[count].matches.push(row);
    }

    if (row.className === "k-grouping-row") {
      if (index !== 0) {
        count++;
      }
      result[count].header = row.textContent ?? "No header found";
    }
  });

  return { props: { result } };
};

export default function Page({
  result,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(result);

  const selectedTeam = "BF Solängen F";

  return (
    <main>
      <table className="border-collapse border border-slate-500">
        {result.map((res) => (
          <tbody key={res.header}>
            <tr className="border border-slate-600">
              <th>{res.header}</th>
            </tr>
            {res.matches.map((match) => (
              <tr className="border border-slate-600" key={match.textContent}>
                {match.columns?.map((col, i) => (
                  <td
                    className={
                      col.includes(selectedTeam) ? "p-5 font-bold" : "p-5"
                    }
                    key={`${match.textContent}-${i}`}
                  >
                    {col}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </main>
  );
}
