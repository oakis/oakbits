import ClubLogo from "./ClubLogo";

interface IMatchTeam {
  teamName: string;
  clubId: number;
}

const MatchTeam = ({ teamName, clubId }: IMatchTeam) => {
  return (
    <div className="sm:flex flex-col items-center gap-3 hidden w-48 h-48 relative">
      <h2 className="text-2xl">{teamName}</h2>
      <div className="relative w-36 h-36">
        <ClubLogo
          type="layout"
          id={clubId}
          name={teamName}
          layout="fill"
          objectFit="contain"
        />
      </div>
    </div>
  );
};

export default MatchTeam;
