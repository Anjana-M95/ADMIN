import "./App.css";
import Sidebar from "./components/SidePanel/Sidebar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BasicTable from "./components/Services/Services";
import FormPropsTextFields from "./Edit/Edit";
import ExploreTable from "./components/Explore/Explore";
import EditExplore from "./components/EditExplore/EditExplore";
import AddExplore from "./components/AddExplore/AddExplore";
import { Provider } from "react-redux";
import { Store } from "./Store";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Provider store={Store}>
        <Router>
          <Switch>
            <Route path="/services">
              <BasicTable />
            </Route>
            <Route path="/explore">
              <ExploreTable />
            </Route>
            <Route path="/edit/:id">
              <FormPropsTextFields />
            </Route>
            <Route path="/editexplore/:id">
              <EditExplore />
            </Route>
            <Route path="/addexplore">
              <AddExplore />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
