interface Mode {
  development: ConfigArgs;
  production: ConfigArgs;
}

interface ConfigArgs {
  NAME: string;
  APP: {
    BACKEND_URL: string;
  };
}

const development: ConfigArgs = {
  NAME: "development",
  APP: {
    BACKEND_URL:
      process.env.NEXT_PUBLIC_BACKEND_URL_DEV || "http://localhost:8080",
  },
};

const production: ConfigArgs = {
  NAME: "production",
  APP: {
    BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || "",
  },
};

const configuration: Mode = {
  development,
  production,
};

const env = process.env.NODE_ENV as keyof Mode;

if (!env) {
  console.error("No env");
}

export default configuration[env];
