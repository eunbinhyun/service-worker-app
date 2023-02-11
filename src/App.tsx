import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./components/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
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
