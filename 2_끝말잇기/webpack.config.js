// 이 파일 하나로 webpack은 동작함

// node.js에서 경로를 조작하도록 제공
const path = require("path");
const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  name: "wordrelay-setting", // 사실 불필요
  mode: "development", // 실서비스에선 production
  devtool: "eval",
  resolve: {
    extensions: [".js", ".jsx"],
  },
  // **가장 중요**
  // 목표 : client.jsx/WordRelay.jsx를 합쳐 ./dist/app.js라는 파일을 만드는 것
  entry: {
    // 이미 client.jsx에서 WordRelay.jsx를 불러오고 있기 때문에 굳이 불러올 필요는 없음 => 웹팩이 알아서 load
    // 확장자도 포함할 필요 없음 => resolve.extensions에서 찾음
    app: ["./client"],
  }, // 입력

  // entry에 있는 파일을 읽고 => module의 rules 적용해 => output 파일로 만든다
  module: {
    rules: [
      {
        // regex : js + jsx 파일을 rule을 적용
        test: /\.jsx?/,
        // babel-loader rules을 적용 : 최신 문법을 예전 브라우저에서도 호환되는 문법으로 변환
        loader: "babel-loader",
        // babel의 옵션 : 환경 변수 및 JSX 적용
        options: {
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
          plugins: [
            // 핫 리로딩
            "react-refresh/babel",
          ],
        },
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({ debug: true }),
    // 핫 리로딩 : 기존 데이터 유지하면서 화면을 바꿔줌
    // vs. 리로딩 : 새로고침, 기존 데이터가 초기화됨
    new ReactRefreshWebpackPlugin(),
  ],
  output: {
    // 실제 경로
    path: path.join(__dirname, "dist"), // __dirname(현재 폴더) => ./dist 절대 경로로 지정
    filename: "app.js",
    // 가상 경로 : node.js express.static과 비슷함
    publicPath: "/dist/",
  }, // 출력
  devServer: {
    devMiddleware: { publicPath: "/dist" },
    static: { directory: path.resolve(__dirname) },
    hot: true,
  },
};
