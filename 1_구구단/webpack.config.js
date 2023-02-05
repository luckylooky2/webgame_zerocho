// npm install react react-dom
// npm install -D @babel/core @babel/preset-env @babel/preset-react babel-loader webpack webpack-cli
const path = require("path");
// ReferenceError: webpack is not defined
const webpack = require("webpack");

module.exports = {
  name: "gugudan-setting",
  mode: "development", // 배포 땐 : production
  devtool: "eval", // 배포 땐 : hidden-source-map
  resolve: {
    extensions: [".js", ".jsx"],
  },
  entry: {
    app: ["./client"],
  },
  // entry에 들어간 파일에 babel-loader를 적용하기 위해 사용
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        // babel-loader에 대한 옵션
        options: {
          // 기본적으로는 presets를 설정하고, 오류 발생시 plugins: [] 추가
          // presets : 여러 개의 plugin의 모음
          // presets의 개별 plugin에 대한 설정을 적용하기 문법 => 배열화 : ["@babel/preset-env", {targets: {browses: []}}]
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  // 모든 브라우저를 지원하기에는 babel의 작업량(즉, 성능)에 부담
                  // 적용시킬 브라우저에 최적화하는 노력이 필요 => browserslist의 옵션
                  // Using targets: { "chrome": "108", "ios": "16", "samsung": "19" }
                  browsers: ["last 2 chrome versions", "> 5% in KR"],
                },
                debug: true,
              },
            ],
            "@babel/preset-react",
          ],
        },
      },
    ],
  },
  // 여기에도 plugin(확장 프로그램)이 존재 => 추가적으로 하고 싶은 작업
  // 여기에 존재하는 plugin 및 module.rules를 주석 처리해가면서 어디에 사용하는 것인지 익히자!
  plugins: [new webpack.LoaderOptionsPlugin({ debug: true })],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js",
  },
};
