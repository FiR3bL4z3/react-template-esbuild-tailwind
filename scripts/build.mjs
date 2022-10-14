import esbuild from "esbuild";
import postCssPlugin from "esbuild-style-plugin";
import * as dotenv from "dotenv";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import fs from "fs";
import {argv} from "process";

dotenv.config();
const result = await esbuild.build({
	logLevel: "info",
	entryPoints: ["src/index.tsx"],
	bundle: true,
	outfile: "public/assets/index.js",
	define: {
		"process.env.NODE_ENV": '"production"',
	},
	minify: true,
	metafile: true,
	plugins: [
		postCssPlugin({
			postcss: {
				plugins: [autoprefixer, tailwindcss],
			},
		}),
	],
});

if (argv.includes("--meta")) {
	fs.writeFileSync("meta.json", JSON.stringify(result.metafile));
}
