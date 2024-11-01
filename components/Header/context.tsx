import { IClub } from "@/pages/api/clubs";
import { IDivision } from "@/pages/api/division";
import { ISeason } from "@/pages/api/seasons";
import { ITeam } from "@/pages/api/team";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface HeaderContextType {
  season: string;
  seasons: ISeason[];
  setSeason: Dispatch<SetStateAction<string>>;
  club: string;
  clubs: IClub[];
  setClub: Dispatch<SetStateAction<string>>;
  team: string;
  teams: ITeam[];
  setTeam: Dispatch<SetStateAction<string>>;
  division: string;
  divisions: IDivision[];
  setDivision: Dispatch<SetStateAction<string>>;
}

const HeaderContext = createContext({} as HeaderContextType);

export const HeaderContextProvider = ({ children }: PropsWithChildren) => {
  const {
    year: yearParam,
    division: divisionParam,
    club: clubParam,
    team: teamParam,
  } = useParams();
  const router = useRouter();

  const [seasons, setSeasons] = useState<ISeason[]>([]);
  const [season, setSeason] = useState(yearParam as string);
  const [clubs, setClubs] = useState<IClub[]>([]);
  const [club, setClub] = useState(clubParam as string);
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [team, setTeam] = useState(teamParam as string);
  const [divisions, setDivisions] = useState<IDivision[]>([]);
  const [division, setDivision] = useState(divisionParam as string);

  useEffect(() => {
    fetch(`/api/seasons`)
      .then((data) => data.json())
      .then((result: ISeason[]) => {
        setSeasons(result);
      });
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
        if (club !== clubParam && incomingTeams.length > 0) {
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
        if (incomingDivs.length > 0) {
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
