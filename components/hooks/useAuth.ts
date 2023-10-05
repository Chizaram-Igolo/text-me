import { useEffect, useState } from "react";

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authenticated = localStorage.getItem("token");
    setIsAuthenticated(!!authenticated);
  }, []);

  return isAuthenticated;
}
