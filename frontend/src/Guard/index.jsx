import { useEffect, useState } from "react";
import Loader from "../components/shared/Loader";
import http from "../Utils/axiosBaseUrl";
import { Navigate } from "react-router-dom";

export default function Guard({ endpoint, role, children }) {
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState(null);
  const [authorised, setAuthorised] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const { data } = await http.get(endpoint);
        sessionStorage.setItem("userInfo", JSON.stringify(data));
        setUser(data?.role);
        setAuthorised(true);
      } catch (error) {
        setUser(null);
        setAuthorised(false);
      } finally {
        setLoader(false);
      }
    };

    verifyToken();
  }, [endpoint]);

  if (loader) {
    return <Loader></Loader>;
  }
  if (authorised && role === user) {
    return children;
  }
  else{
    return <Navigate to={"/"}></Navigate>
  }
}
