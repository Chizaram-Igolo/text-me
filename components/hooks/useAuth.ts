import { useEffect, useState } from "react";

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authenticated = localStorage.getItem("token");
    setIsAuthenticated(!!authenticated);
    setLoading(false);
  }, []);

  return { loading, isAuthenticated };
}
