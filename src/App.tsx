import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./components/Home/Home";
import { UpdateAlarmProvider } from "./context/UpdateAlarmContext";
import { Banner } from "./components/Banner/Banner";

function App() {
  return (
    <BrowserRouter>
      <UpdateAlarmProvider>
        <Navbar />
        <Banner />
      </UpdateAlarmProvider>
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
