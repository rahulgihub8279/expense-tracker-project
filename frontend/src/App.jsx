import HomePage from "../src/components/Home/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import BadRequest from "./components/PageNotFound/BadRequest";
import Userlayout from "./components/User/Userlayout";
import Dashboard from "./components/User/Dashboard";
import Report from "./components/User/Report";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/app/user" element={<Userlayout></Userlayout>}></Route>
        <Route path="/app/user" element={<Userlayout></Userlayout>}>
          <Route path="dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="report" element={<Report></Report>}></Route>
        </Route>

        <Route path="/*" element={<BadRequest></BadRequest>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
