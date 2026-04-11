import Guard from "./Guard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/shared/Loader";

const BadRequest = lazy(() => import("./components/PageNotFound/BadRequest"));
const Signup = lazy(() => import("./components/Signup/Signup"));
const Userlayout = lazy(() => import("./components/User/Userlayout"));
const AdminLayout = lazy(() => import("./components/Admin/AdminLayout"));
const HomePage = lazy(() => import("../src/components/Home/HomePage"));

const Dashboard = lazy(() => import("./components/shared/Dashboard"));
const Report = lazy(() => import("./components/shared/Report"));
const Transactions = lazy(() => import("./components/shared/Transactions"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader></Loader>}>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          {/* user related routes*/}
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
            <Route
              path="transaction"
              element={<Transactions></Transactions>}
            ></Route>
          </Route>
          {/* admin related routes*/}

          <Route
            path="/app/admin"
            element={
              <Guard endpoint={"/api/user/session"} role={"admin"}>
                <AdminLayout></AdminLayout>
              </Guard>
            }
          >
            <Route path="dashboard" element={<Dashboard></Dashboard>}></Route>
            <Route index element={<Dashboard></Dashboard>}></Route>
            <Route path="report" element={<Report></Report>}></Route>
            <Route
              path="transaction"
              element={<Transactions></Transactions>}
            ></Route>
          </Route>
          <Route path="/*" element={<BadRequest></BadRequest>}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
