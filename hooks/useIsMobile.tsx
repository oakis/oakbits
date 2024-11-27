import { useState, useEffect } from "react";

const useIsMobile = (breakpoint = 1024) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWindowSize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkWindowSize();

    window.addEventListener("resize", checkWindowSize);
    return () => window.removeEventListener("resize", checkWindowSize);
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
