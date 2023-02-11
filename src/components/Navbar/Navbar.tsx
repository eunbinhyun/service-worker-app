import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Navbar.css";

export const Navbar = ({ onShow }: { onShow: (show: boolean) => void }) => {
  const history = useHistory();

  useEffect(() => {
    if (!history) return;
    const unlisten = history.listen((location, action) => {
      if (!navigator.serviceWorker) {
        return;
      }

      navigator.serviceWorker.getRegistrations().then((regs) =>
        regs.forEach((reg) => {
          reg
            .update()
            .then(() => {
              if (reg.waiting) {
                onShow(true);
              }
            })
            .catch((e) => {
              // Fetching SW failed.
            });
        })
      );
    });
    return () => {
      unlisten();
    };
  }, [history, onShow]);

  return (
    <nav className="navbar">
      <ul className="menu">
        <Link to="/">
          <li className="menuItem">Home</li>
        </Link>
        <Link to="/menu1">
          <li className="menuItem">Menu1</li>
        </Link>
      </ul>
    </nav>
  );
};
