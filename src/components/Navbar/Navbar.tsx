import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import './Navbar.css';

export const Navbar = ({onShow}: {onShow: (show: boolean) => void}) => {
  const history = useHistory();
 
  useEffect(() => {
    if (!history) return;
    const unlisten = history.listen((location, action) => {
      if (!navigator.serviceWorker) {
        return;
      }
      navigator.serviceWorker.getRegistrations().then((regs) =>
        regs.forEach((reg) => {  
          reg.update().then(() => {
            if (reg.waiting) {
              onShow(true);
            }
          }).catch((e) => {
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
        <li className="menuItem">
          <Link to="/">Home</Link>
        </li>
        <li className="menuItem">
          <Link to="/menu1">Menu1</Link>
        </li>
      </ul>
    </nav>
  );
};
