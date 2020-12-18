import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BiLogOut } from "react-icons/bi";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <button
      className="btn btn-danger btn-block"
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
      Log Out
    </button>
  );
};

export const CustomLogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <a className="sidebar-btn" onClick={() =>
      logout({
        returnTo: window.location.origin,
      })
    }
    >
      <BiLogOut />
      <span>ログアウト</span>
    </a>
  )
}
export default LogoutButton;