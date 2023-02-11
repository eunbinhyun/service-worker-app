import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import './Navbar.css';

export const Navbar = ({onShow}: {onShow: (show: boolean) => void}) => {
  const history = useHistory();
 
  useEffect(() => {
    console.log(history, 'history')
    if (!history) return;
    const unlisten = history.listen((location, action) => {
      console.log(navigator.serviceWorker)
      if (!navigator.serviceWorker) {
        return;
      }
      navigator.serviceWorker.getRegistrations().then((regs) =>
        regs.forEach((reg) => {
          console.log(reg.update, reg.waiting, 'reg')
          if (reg.waiting) {
            onShow(true);
          }
      
          reg.update().then(() => {
            console.log(reg, 'reg2')
          }).catch((e) => {
            // Fetching SW failed.
          });
          console.log(reg.update, reg.waiting, 'reg')
          if (reg.waiting) {
            onShow(true);
          }
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
