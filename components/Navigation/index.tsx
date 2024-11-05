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
      className={`fixed top-0 left-0 right-0 transition-transform duration-300 h-10 z-10 ${
        show ? "translate-y-0" : "-translate-y-full"
      } bg-white shadow`}
    >
      <div className="mx-auto px-4 py-2">
        <ul className="flex space-x-4">
          <li>
            <a href="/">
              Hem
            </a>
          </li>
          <li>
            <a href="/division">
              Seriespel
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
