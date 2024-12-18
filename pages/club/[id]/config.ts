import { Player } from "@/pages/player/config";

export interface ClubData {
  clubId: number;
  clubName: string;
  clubCountyId: number;
  county: string;
  clubHallId: number;
  hallName: string;
  agreementFirstClubName: string | null;
  agreementFirstClubId: number;
  agreementSecondClubName: string | null;
  agreementSecondClubId: number;
  totalTeams: number;
  totalPlayers: number;
  clubLogoUrl: string | null;
}

interface Club {
  name: string;
  county: string;
  hallId: number;
  hallName: string;
  agreementClubName: string | null;
  agreementClubId: number;
}

interface TeamData {
  teamId: number;
  teamName: string;
  teamBossGroup: number;
  teamNbrOfLanes: number;
  teamHallId: number;
  teamType: number;
  teamAlleyGroup: number;
  clubName: string;
  hallName: string;
  teamTypeDescription: string;
  alleyGroupName: string;
  teamAlias: string;
  teamContactEmail: string | null;
  teamContactPhone: string | null;
}

export interface TeamsData {
  total: number;
  data: TeamData[];
}

export interface Team {
  id: number;
  name: string;
  type: string;
}

export interface Props {
  players: Player[];
  totalPlayers: number;
  info: Club;
  teams: Team[];
}
