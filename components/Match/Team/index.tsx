import ClubLogo from "@/components/ClubLogo";

interface Props {
  teamName: string;
  clubId: number;
}

const MatchTeam = ({ teamName, clubId }: Props) => {
  return (
    <div className="flex flex-col flex-1 items-center justify-start gap-4 w-56 mt-6">
      <h2 className="text-4xl font-bold text-center h-16">{teamName}</h2>
      <div className="relative w-56 h-56 flex items-center">
        <ClubLogo
          id={clubId}
          name={teamName}
          imageProps={{
            priority: true,
            fill: true,
            sizes: "224px",
            style: { objectFit: "contain", objectPosition: "top center" },
          }}
        />
      </div>
    </div>
  );
};

export default MatchTeam;
