import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";

const Navigation = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = useCallback(() => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    }
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [controlNavbar, lastScrollY]);

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 transition-transform duration-300 h-10 z-10 bg-white shadow flex items-center border-0",
        show ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <ul className="flex space-x-4 container mx-auto px-4">
        <li>
          <a href="/">Hem</a>
        </li>
        <li>
          <a href="/player">Licenser</a>
        </li>
        <li>
          <a href="/division">Seriespel</a>
        </li>
        <li>
          <a href="/club">Föreningar</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
