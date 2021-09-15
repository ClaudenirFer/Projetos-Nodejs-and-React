import "./App.scss";
import { Header } from "./components/shared/Header/Header";
import { Footer } from "./components/shared/Footer/Footer";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import TaskAdd from "./pages/TaskAdd/TaskAdd";
import TaskView from "./pages/TaskView/TaskView";
import TaskEdit from "./pages/TaskEdit/TaskEdit";


function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/add" component={TaskAdd} />
        <Route path="/view/:id" component={TaskView} />
        <Route path="/edit/:id" component={TaskEdit} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
