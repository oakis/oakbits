import ClubLogo from "@/components/ClubLogo";

interface Props {
  teamName: string;
  clubId: number;
}

const MatchTeam = ({ teamName, clubId }: Props) => {
  return (
    <div className="sm:flex hidden flex-col">
      <div className="sm:flex flex-col items-center justify-center gap-3 w-48 relative flex-1">
        <h2 className="text-2xl text-center h-16">{teamName}</h2>
        <div className="relative w-36 h-36 flex items-center">
          <ClubLogo
            id={clubId}
            name={teamName}
            imageProps={{
              priority: true,
              fill: true,
              sizes: "144px",
              style: { objectFit: "contain", objectPosition: "top center" },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MatchTeam;
