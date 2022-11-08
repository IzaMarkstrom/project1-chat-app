import { Button } from "@chakra-ui/react";
import React from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    console.log("user logged out");
    navigate("/");
  };

  return (
    <div className="logout">
      <Button onClick={logout} colorScheme="purple">
        Logout
      </Button>
    </div>
  );
}
