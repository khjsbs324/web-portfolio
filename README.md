# 김혜지 프로필 포트폴리오

Figma의 `강사 프로필 > 프로필 all` 프레임을 HTML, CSS, jQuery, GSAP으로 구현했습니다.

## 실행

`index.html`을 브라우저로 열면 됩니다. 로컬 서버를 사용하려면 저장소에서 다음 명령을 실행하세요.

```powershell
python -m http.server 5173 --bind 127.0.0.1
```

접속: http://127.0.0.1:5173

## 파일

- `index.html`: 프로필 콘텐츠와 이미지 주소
- `css/style.css`: 원본 레이아웃, 글꼴, 태블릿·모바일 반응형 스타일
- `js/main.js`: jQuery 초기화, GSAP 페이드 업과 ScrollTrigger 좌우 슬라이드
- `vendor/`: jQuery 3.7.1, GSAP 3.13.0, ScrollTrigger 3.13.0
- `assets/fonts/`: 현재 프로필 문구에 사용하는 Noto Sans KR 글꼴 서브셋

이미지는 `이미지주소.md`에 있는 꽃 이미지 CDN 주소와 프로필 사진 원본 주소를 사용합니다. 이미지를 표시하려면 인터넷 연결이 필요합니다. 글꼴과 JS 라이브러리는 로컬에서 불러옵니다. 문구에 없는 글자는 시스템 글꼴로 표시될 수 있습니다.

## 애니메이션

- 접속: 꽃 이미지가 56px 아래에서 1.4초 동안 페이드 업
- 스크롤: 프로필 사진·연락처는 왼쪽, 소개·상세 정보는 오른쪽에서 1.15초 동안 등장
- 각 영역이 화면 높이의 85% 지점에 들어오면 한 번 재생
- 동작 줄이기(`prefers-reduced-motion`) 설정 시 애니메이션 생략

속도·거리는 Figma에 수치가 없어 설정한 값이며 `js/main.js`에서 수정할 수 있습니다. 예시 학력·연락처·활동·자격증은 원본 문구를 유지했습니다.

라이브러리 참고: [jQuery](https://jquery.com/download/), [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia%28%29/).
