# 1. 이미지 생성 : docker build -t react .
# 2. 컨테이너 생성 : docker run -d -p 3000:3000 -v $PWD:/app --name react react
# 3. 컨테이너 종료 : docker stop react
# 4. 컨테이너 다시 실행 : docker start react
# 5. 컨테이너 삭제 : docker rm react

# 가져올 이미지를 정의
FROM node:14
# 경로 설정하기
WORKDIR /app
# package.json 워킹 디렉토리에 복사 (.은 설정한 워킹 디렉토리를 뜻함)
# COPY package.json .
# 명령어 실행 (의존성 설치)
# RUN npm install
# 현재 디렉토리의 모든 파일을 도커 컨테이너의 워킹 디렉토리에 복사한다.
COPY . .

# 각각의 명령어들은 한줄 한줄씩 캐싱되어 실행된다.
# package.json의 내용은 자주 바뀌진 않을 거지만
# 소스 코드는 자주 바뀌는데
# npm install과 COPY . . 를 동시에 수행하면
# 소스 코드가 조금 달라질때도 항상 npm install을 수행해서 리소스가 낭비된다.

# 3000번 포트 노출 => webpack이 열어놓은 포트
EXPOSE 3000

# npm run dev 스크립트 실행
# ENTRYPOINT ["npm", "install"]
# CMD ["sleep", "100000"]
# CMD ["npm", "run", "dev"]
CMD ["bash", "setup.sh"]

# 문제
# 1. npm install이 되지 않음
# 2. CMD 2개를 차례로 실행할 수 없음
# 3. exec를 붙이면 hot reload가 안 되고, 붙이지 않으면 gracefully shut down이 불가
