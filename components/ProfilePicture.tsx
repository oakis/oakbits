import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface Props {
  id: string | number;
  name: string;
  imageProps?: Partial<ImageProps>;
}

const ProfilePicture = (props: Props) => {
  const [error, setError] = useState(false);
  const url = `https://bits.swebowl.se/MiscPicture/PlayerPicture?licenseNumber=${props.id}`;

  return error ? (
    <span className="w-8 h-8" />
  ) : (
    <Image
      {...props.imageProps}
      src={url}
      alt={`Profilbild ${props.name}`}
      onError={() => setError(true)}
    />
  );
};

export default ProfilePicture;
