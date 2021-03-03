import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./Routes";

function App() {
  return (
    <Router>
      <div className="whrapper">
        <Routes />
      </div>
    </Router>
  );
}

export default App;
