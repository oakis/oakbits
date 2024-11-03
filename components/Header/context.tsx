import { IClub } from "@/pages/api/clubs.api";
import { IDivision } from "@/pages/api/division.api";
import { ISeason } from "@/pages/api/seasons.api";
import { ITeam } from "@/pages/api/team.api";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

interface HeaderContextType {
  season: string;
  seasons: ISeason[];
  setSeason: (str: string) => void;
  club: string;
  clubs: IClub[];
  setClub: (str: string) => void;
  team: string;
  teams: ITeam[];
  setTeam: (str: string) => void;
  division: string;
  divisions: IDivision[];
  setDivision: (str: string) => void;
}

const HeaderContext = createContext({} as HeaderContextType);

export const HeaderContextProvider = ({ children }: PropsWithChildren) => {
  const params = useParams();
  const router = useRouter();

  const yearParam = (params?.year as string) ?? "";
  const divisionParam = (params?.division as string) ?? "";
  const clubParam = (params?.club as string) ?? "";
  const teamParam = (params?.team as string) ?? "";

  const [seasons, setSeasons] = useState<ISeason[]>([]);
  const [season, setSeason] = useState(yearParam);
  const [clubs, setClubs] = useState<IClub[]>([]);
  const [club, setClub] = useState(clubParam);
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [team, setTeam] = useState(teamParam);
  const [divisions, setDivisions] = useState<IDivision[]>([]);
  const [division, setDivision] = useState(divisionParam);

  useEffect(() => {
    fetch(`/api/seasons`)
      .then((data) => data.json())
      .then((result: ISeason[]) => {
        setSeasons(result);
        if (yearParam === "") {
          setSeason(result[0].id.toString());
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetch(`/api/clubs`)
      .then((data) => data.json())
      .then((result: IClub[]) => {
        setClubs(result);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/team?club=${club}&year=${season}`)
      .then((data) => data.json())
      .then((incomingTeams: ITeam[]) => {
        setTeams(incomingTeams);
        if (club !== "" && club !== clubParam && incomingTeams.length > 0) {
          setTeam(incomingTeams[0].id.toString());
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [club, season]);

  useEffect(() => {
    fetch(`/api/division?team=${team}&year=${season}`)
      .then((data) => data.json())
      .then((incomingDivs: IDivision[]) => {
        setDivisions(incomingDivs);
        if (incomingDivs.length > 0 && season && club && team) {
          router.push(
            `/division/${season}/${club}/${team}/${incomingDivs[0].id}`
          );
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team, season]);

  return (
    <HeaderContext.Provider
      value={{
        season,
        seasons,
        setSeason,
        club,
        clubs,
        setClub,
        team,
        teams,
        setTeam,
        division,
        divisions,
        setDivision,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeaderContext = () => {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error("useHeaderContext must be used within a HeaderContext");
  }
  return context;
};
