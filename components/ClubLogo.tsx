import Image from "next/image";
import { useState } from "react";

interface IClubThumbnail {
  id: string | number;
  name: string;
  width?: number;
  height?: number;
}

const ClubLogo = ({
  id,
  name,
  width = 32,
  height = 32,
}: IClubThumbnail) => {
  const [error, setError] = useState(false);
  const url = `https://bits.swebowl.se/images/ClubLogo/${id}.png`;
  return error ? (
    <span className="w-8 h-8" />
  ) : (
    <Image
      src={url}
      alt={`Klubbmärke ${name}`}
      width={width}
      height={height}
      onError={() => setError(true)}
    />
  );
};

export default ClubLogo;
