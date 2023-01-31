// 이 파일 하나로 webpack은 동작함

// node.js에서 경로를 조작하도록 제공
const path = require('path');

module.exports = {
    name: 'wordrelay-setting', // 사실 불필요
    mode: 'development', // 실서비스에선 production
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    // 가장 중요
    // 목표 : client.jsx/WordRelay.jsx를 합쳐 ./dist/app.js라는 파일을 만드는 것
    entry: {
        // 이미 client.jsx에서 WordRelay.jsx를 불러오고 있기 때문에 굳이 불러올 필요는 없음 => 웹팩이 알아서 load
        // 확장자도 포함할 필요 없음 => resolve.extensions에서 찾음
        app: ["./client"],
    }, // 입력
    output: {
        path: path.join(__dirname, 'dist'), // __dirname(현재 폴더) => ./dist 절대 경로로 지정
        filename: 'app.js',
    }, // 출력
};