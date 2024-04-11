import React from "react";
import useLogout from "../../hooks/useLogout";
import { BiLogOut } from "react-icons/bi";

const LogoutBtn = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="mt-auto ">
      {!loading ? (
        <BiLogOut
          className="w-6 h-6 text-white cursor-pointer"
          onClick={logout}
        />
      ) : (
        <span className="loading loading-spinner"> </span>
      )}
    </div>
  );
};

export default LogoutBtn;
