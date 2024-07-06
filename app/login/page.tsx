"use client";

import configuration from "../config/configuration";

export default function LoginPage() {
  const google = () => {
    window.open(`${configuration.APP.BACKEND_URL}/auth/google`, "_self");
  };

  const logout = () => {
    window.open(`${configuration.APP.BACKEND_URL}/auth/logout`, "_self");
  };

  return (
    <>
      <div className="loginButton google" onClick={google}>
        Google
      </div>
      <div className="logout" onClick={logout}>
        Logout
      </div>
    </>
  );
}
