import Guard from "./Guard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/shared/Loader";

const BadRequest = lazy(() => import("./components/PageNotFound/BadRequest"));
const Signup = lazy(() => import("./components/Signup/Signup"));
const Userlayout = lazy(() => import("./components/User/Userlayout"));
const Dashboard = lazy(() => import("./components/User/Dashboard"));
const Report = lazy(() => import("./components/User/Report"));
const HomePage = lazy(() => import("../src/components/Home/HomePage"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader></Loader>}>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/app/user" element={<Userlayout></Userlayout>}></Route>
          <Route
            path="/app/user"
            element={
              <Guard endpoint={"/api/user/session"} role={"user"}>
                <Userlayout></Userlayout>
              </Guard>
            }
          >
            <Route path="dashboard" element={<Dashboard></Dashboard>}></Route>
            <Route index element={<Dashboard></Dashboard>}></Route>
            <Route path="report" element={<Report></Report>}></Route>
          </Route>
          <Route path="/*" element={<BadRequest></BadRequest>}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>  
  );
}

export default App;
