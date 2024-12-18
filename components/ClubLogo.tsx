import clsx from "clsx";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface Props {
  id: string | number;
  name: string;
  imageProps?: Partial<ImageProps>;
  errorComponent?: React.ReactNode;
  wrapperClasses?: string;
}

const ClubLogo = (props: Props) => {
  const [error, setError] = useState(false);
  const url = `https://bits.swebowl.se/images/ClubLogo/${props.id}.png`;

  const renderOnError = () => {
    if (props.errorComponent) {
      return props.errorComponent;
    }
    return (
      <div
        style={{
          height: props.imageProps?.sizes,
          width: props.imageProps?.sizes,
        }}
      />
    );
  };

  return error ? (
    renderOnError()
  ) : (
    <div className={clsx(props.wrapperClasses)}>
      <Image
        {...props.imageProps}
        src={url}
        alt={`Klubbmärke ${props.name}`}
        onError={() => setError(true)}
      />
    </div>
  );
};

export default ClubLogo;
