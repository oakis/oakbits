import type { InferGetServerSidePropsType } from "next";
import puppeteer from "puppeteer";

interface Match {
  className: string;
  innerHTML: string;
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

  const rows = await page.evaluate(() =>
    Array.from(
      Array.from(document.getElementsByTagName("tbody"))
        .filter((el) => el.role === "rowgroup")
        .toSpliced(0, 3)[0].children
    ).map((row) => ({
      className: row.className,
      innerHTML: row.innerHTML,
      textContent: row.textContent,
      ...(row.className !== "k-grouping-row" && {
        columns: Array.from(row.children).map(
          (child) => child.textContent ?? "-"
        ),
      }),
    }))
  );

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
  return (
    <main>
      <table>
        {result.map((res) => (
          <tbody key={res.header}>
            <th>{res.header}</th>
            {res.matches.map((match) => (
              <tr
                key={match.textContent}
                dangerouslySetInnerHTML={{ __html: match.innerHTML }}
              ></tr>
            ))}
          </tbody>
        ))}
      </table>
    </main>
  );
}
