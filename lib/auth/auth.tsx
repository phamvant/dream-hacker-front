import configuration from "@/app/config/configuration";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const getServerSession = async (cookie: ReadonlyRequestCookies) => {
  try {
    const res = await fetch(`${configuration.APP.BACKEND_URL}/auth`, {
      method: "GET",
      credentials: "include",
      cache: "no-cache",
      headers: { Cookie: cookie.toString() },
    });

    if (!res.ok) {
      return false;
    }

    return res;
  } catch (err) {
    return false;
  }
};

export const getSession = async () => {
  try {
    const res = await fetch(`${configuration.APP.BACKEND_URL}/auth`, {
      method: "GET",
      credentials: "include",
      cache: "no-cache",
    });

    if (!res.ok) {
      return false;
    }

    return res;
  } catch (err) {
    return false;
  }
};
