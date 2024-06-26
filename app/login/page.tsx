"use client";

export default function LoginPage() {
  const google = () => {
    window.open("http://localhost:8080/auth/google", "_self");
  };

  return (
    <div className="loginButton google" onClick={google}>
      Google
    </div>
  );
}
