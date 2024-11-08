import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface Props {
  id: string | number;
  name: string;
  imageProps?: Partial<ImageProps>;
}

const ClubLogo = (props: Props) => {
  const [error, setError] = useState(false);
  const url = `https://bits.swebowl.se/images/ClubLogo/${props.id}.png`;

  return error ? (
    <span className="w-8 h-8" />
  ) : (
    <Image
      {...props.imageProps}
      src={url}
      alt={`Klubbmärke ${props.name}`}
      onError={() => setError(true)}
    />
  );
};

export default ClubLogo;
