import esbuild from "esbuild";
import serve from "create-serve";
import postCssPlugin from "esbuild-style-plugin";
import * as dotenv from "dotenv";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

dotenv.config();
esbuild.build({
	logLevel: "info",
	entryPoints: ["src/index.tsx"],
	bundle: true,
	outfile: "public/assets/index.js",
	define: {
		"process.env.NODE_ENV":
			process.env.NODE_ENV === undefined
				? '"production"'
				: `"${process.env.NODE_ENV}"`,
	},
	plugins: [
		postCssPlugin({
			postcss: {
				plugins: [autoprefixer, tailwindcss],
			},
		}),
	],
	watch: true && {
		onRebuild(_err) {
			serve.update();
		},
	},
});
serve.start({
	port: 3000,
	root: ".",
});
