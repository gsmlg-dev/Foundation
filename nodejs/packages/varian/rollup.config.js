import replace from "rollup-plugin-replace";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";

const config = {
  input: "modules/index.js",
  output: {
    name: "Varian",
    globals: {
    }
  },
  external: [
  ],
  plugins: [
    resolve(),
    commonjs({
      include: /node_modules/
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ]
};

export default config;
