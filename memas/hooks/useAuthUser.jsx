import { useState, useEffect } from "react";
import MiddleMan from "../database/MiddleMan";

const useAuthUser = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    MiddleMan.authUser().then((user) => {
      setAuthUser(JSON.parse(user));
    });
  }, []);

  return [authUser];
};

export default useAuthUser;
