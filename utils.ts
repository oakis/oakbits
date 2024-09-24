export const isSelectedTeam = (teamId: number, selectedTeam: string) =>
  teamId.toString() === selectedTeam;

export const getTeamUrl = (
  season: number,
  clubId: number,
  teamId: number,
  divisionId: number
) =>
  `https://bits.swebowl.se/team-detail?seasonId=${season}&clubId=${clubId}&teamId=${teamId}&divisionId=${divisionId}`;
