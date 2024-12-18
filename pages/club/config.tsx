export interface ClubData {
  clubId: number;
  clubName: string;
  clubCountyId: number;
  clubIsActive: boolean;
  county: string;
  clubHallId: number;
  hallName: string;
  clubIsPlayBowl: boolean;
  clubLogoUrl: string | null;
  agreementClubId: number;
  clubAgreementRequestFlag: number;
  clubAgreementDetail: string | null;
  requestedClubNames: string | null;
}

export interface ClubData {
  total: number;
  data: ClubData[];
}

export interface Club {
  id: number;
  name: string;
  county: string;
  hallId: number;
  hallName: string;
}

export interface Props {
  clubs: Club[];
  totalClubs: number;
}
