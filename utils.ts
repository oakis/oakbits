export const isSelectedTeam = (teamId: number, selectedTeam: string) =>
  teamId.toString() === selectedTeam;

export const getTeamUrl = (
  season: number | string,
  clubId: number | string,
  teamId: number | string,
  divisionId: number | string
) =>
  `https://bits.swebowl.se/team-detail?seasonId=${season}&clubId=${clubId}&teamId=${teamId}&divisionId=${divisionId}`;
