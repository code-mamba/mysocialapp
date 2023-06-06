
import { BrowserRouter as Router} from "react-router-dom";
import io from 'socket.io-client'

import RoutePage from "./Routes/routes";

const socket = io.connect("http://localhost:5000")

function App() {
  return (
    <Router>
    <RoutePage></RoutePage>
    </Router>

  );
}

export default App;
