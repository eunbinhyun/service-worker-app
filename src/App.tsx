import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./components/Home/Home";
import { UpdateAlarmContext } from "./context/UpdateAlarmContext";
import { Banner } from "./components/Banner/Banner";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { useContext, useEffect } from "react";

function App() {
  const context = useContext(UpdateAlarmContext);

  useEffect(() => {
    console.log(context, "useEffect");
    serviceWorkerRegistration.register({
      onUpdate: () => {
        console.log("onUpdate");
        context?.handleShowUpdate(true);
      },
      onSuccess: () => {
        console.log("onSuccess");
      },
    });
    
    navigator.serviceWorker.getRegistrations().then((regs) =>
      regs.forEach((reg) => {
        if (reg.waiting) {
          context?.handleShowUpdate(true);
        }
      })
    );
  }, [context]);

  return (
    <BrowserRouter>
      <Navbar />
      <Banner />
      <Switch>
        <Route path={"/"} exact>
          <Home />
        </Route>
        <Route path={"/menu1"}>
          <div className="content">This is Menu1</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
