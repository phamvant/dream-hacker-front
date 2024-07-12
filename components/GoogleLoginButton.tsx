"use client";

import configuration from "@/app/config/configuration";
import { Button } from "@/components/ui/button";

export default function GoogleLoginButton() {
  const google = () => {
    window.open(`${configuration.APP.BACKEND_URL}/auth/google`, "_self");
  };

  return (
    <Button variant="outline" className="w-full" onClick={google}>
      Login with Google
    </Button>
  );
}
