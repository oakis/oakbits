import Image from "next/image";
import { useState } from "react";

interface IClubThumbnail {
  id: string | number;
  name: string;
}

const ClubThumbnail = ({ id, name }: IClubThumbnail) => {
  const [error, setError] = useState(false);
  const url = `https://bits.swebowl.se/images/ClubLogo/${id}.png`;
  return error ? (
    <span className="w-8 h-8" />
  ) : (
    <Image
      src={url}
      alt={`Klubbmärke ${name}`}
      width={32}
      height={32}
      onError={() => setError(true)}
    />
  );
};

export default ClubThumbnail;
