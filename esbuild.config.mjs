import esbuildServe from "esbuild-serve";
import * as dotenv from "dotenv";
dotenv.config();

esbuildServe(
  {
    logLevel: "info",
    entryPoints: ["src/index.tsx"],
    bundle: true,
    outfile: "public/js/index.js",
    define: {
      "process.env.NODE_ENV":
        process.env.NODE_ENV === undefined
          ? '"production"'
          : `"${process.env.NODE_ENV}"`,
    },
  },
  {
    // serve options (optional)
    port: 3000,
    root: ".",
  }
);
