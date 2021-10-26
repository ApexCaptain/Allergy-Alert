# Allergy Alert

## Docker

- DockerHub : https://hub.docker.com/repository/docker/ayteneve93/allergy-alert
- 실행법 :
  ```bash
    docker pull ayteneve93/allergy-alert:1.0.0
    docker create -p 3000:3000 --name allergy -it ayteneve93/allergy-alert:1.0.0
    docker start allergy
  ```

## 사전 설치 (Mac OS 기준)

- Node.js

  [Node.js 메인 페이지](https://nodejs.org/ko/download/)에 접속해 OS에 맞는 버전을 다운로드 후 설치.

- Git

  [Git 메인 페이지](https://git-scm.com/)에 접속해 다운로드 후 설치.

## 소스코드 받기

- Finder에서 혹은 바탕화면에 애플리케이션의 소스코드를 클론 할 디렉토리 생성 (Control + 우 클릭)
  ![SC1](ReadMeRes/screenshot_1.png)

- 디렉토리 명은 원하는 대로 지정

  ![SC2](ReadMeRes/screenshot_2.png)

- 디렉토리에서 Terminal 실행 (Control + 우 클릭)

  ![SC3](ReadMeRes/screenshot_3.png)

- 터미널 창에서 다음의 명령어를 순서대로 입력 `注) Node.js와 Git이 반드시 설치되어 있어야 합니다!`

  ```sh

  git clone https://github.com/ApexCaptain/Allergy-Alert

  cd Allergy-Alert

  sudo npm install

  npm start

  ```

  3번째 명령어(`sudo npm install`) 실행 시 Password를 요청 할 수 있습니다.

  실행하면 Chrome 혹은 Safari 등 사용하는 OS에 등록된 기본 브라우져가 자동 실행됩니다. 만일 같은 네트워크(같은 공유기 혹은 테더링 등)에 연결되어 있다면 다른 PC나 스마트폰에서도 접속할 수 있습니다. 접속 IP주소는 React 서버를 실행한 PC와 같으면 포트 번호는 `3000`번입니다. 가령 애플리케이션을 실행한 PC의 IP주소가 `123.456.789.1` 이라면 같은 WiFi를 사용하는 다른 PC나 태블릿, 스마트폰에서 접속할 땐 브라우져 검색 창에 `123.456.789.1:3000`이라고 치시면 됩니다.

## 실행 화면

- 최초 실행 화면은 다음과 같습니다.
- 1/2 학생회관으로 어느 건물의 정보인지 확인 할 수 있습니다
- 메뉴 종류들을 매트릭스 목록으로 보여줍니다.
- 선택한 회관의 선택한 메뉴 종류에 맞는 메뉴들을 리스트로 보여줍니다.

![SC4](ReadMeRes/example_1.png)

- 현재 선택한 건물과 메뉴 종류를 표시합니다.
- 알러지 유발 식품이 포함된 음식의 경우 이름 옆에 그림으로 표시합니다. 가령 하단 사진에 있는 치즈 돈까스의 경우 계란과 유제품을 포함하는 식품입니다.
- 각 메뉴의 가격을 표시합니다.

![SC5](ReadMeRes/example_2.png)
