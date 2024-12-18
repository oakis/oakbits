import { PaginationSizes } from "@/components/Table/Pagination";

export interface Player {
  licNbr: string;
  firstName: string;
  surName: string;
  age: string;
  clubName: string;
  county: string;
  licTypeName: string;
  licenceSkillLevel: number;
  licenceAverage: number;
}

export interface PlayerData {
  data: Player[];
  total: number;
}

export interface Props {
  players: Player[];
  totalPlayers: number;
  defaultPageSize?: PaginationSizes;
}
