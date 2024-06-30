"use client";

export default function LoginPage() {
  const google = () => {
    window.open("http://localhost:8080/auth/google", "_self");
  };

  const logout = () => {
    window.open("http://localhost:8080/auth/logout", "_self");
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
