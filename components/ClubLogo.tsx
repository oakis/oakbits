import Image from "next/image";
import { useState } from "react";

type IClubLogo =
  | {
      type: "fixed";
      id: string | number;
      name: string;
      width: number;
      height: number;
    }
  | {
      type: "layout";
      id: string | number;
      name: string;
      layout: string;
      objectFit: string;
    };

const ClubLogo = (props: IClubLogo) => {
  const [error, setError] = useState(false);
  const url = `https://bits.swebowl.se/images/ClubLogo/${props.id}.png`;

  const getImageByType = () => {
    switch (props.type) {
      case "fixed":
        return (
          <Image
            src={url}
            alt={`Klubbmärke ${props.name}`}
            width={props.width}
            height={props.height}
            onError={() => setError(true)}
          />
        );
      case "layout":
        return (
          <Image
            src={url}
            alt={`Klubbmärke ${props.name}`}
            layout={props.layout}
            objectFit={props.objectFit}
            onError={() => setError(true)}
          />
        );

      default:
        return <span className="w-8 h-8" />;
    }
  };

  return error ? <span className="w-8 h-8" /> : getImageByType();
};

export default ClubLogo;
