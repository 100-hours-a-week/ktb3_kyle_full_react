# PUPPYNESS
PUPPYNESS는 반려견 커뮤니티 서비스로 자신의 반려견 사진을 업로드 하거나, 채팅을 통해 다른 사용자와 반련견에 관한 정보를 공유할 수 있는 서비스입니다.

백엔드 API와 연동해 회원가입, 로그인, 게시글/댓글 작성, 이미지 업로드까지 제공하는 게시판으로 바닐라 JS로 구현했습니다.
모든 페이지는 정적 HTML + ES 모듈로 구성되며, Input/Modal/Toast 같은 UI 컴포넌트와 API/Formatter 유틸을 모듈화해 페이지 간 재사용성을 높였습니다.

## 기술 스택
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)

## 주요 기능
- 인증: 회원가입(이메일/닉네임 중복 검사, 비밀번호 검증), 로그인/로그아웃, 세션 쿠키 포함 요청, CSRF 방어
- 게시판: 무한 스크롤 목록, 상세 조회(이미지 슬라이더, 좋아요 토글, 댓글 카운트/조회수 표시)
- 작성/수정: 게시글 작성 시 이미지 다중 업로드(FormData), 게시글 수정, 삭제 확인 모달
- 댓글: 상세 화면에서 댓글 작성/수정/삭제, 무한 스크롤 로딩
- 프로필: 닉네임 중복 검사 및 수정, 프로필 이미지 교체(미리보기), 회원 탈퇴
- 계정 보안: 비밀번호 형식 검증 후 변경(성공/실패 토스트 피드백)

## 폴더 구조
```
src/
├─ pages/
│  ├─ login.html            # 로그인
│  ├─ signup.html           # 회원가입
│  ├─ password-update.html  # 비밀번호 변경
│  ├─ post-list.html        # 게시글 목록 조회
│  ├─ post-detail.html      # 게시글 상세 조회 
│  ├─ post-create.html      # 게시글 작성
│  ├─ post-update.html      # 게시글 수정
│  ├─ profile-update.html   # 회원 정보 수정
│  └─ styles/               # 페이지 전용 CSS
├─ components/
│  ├─ PostCard.js           # 게시글 목록 
│  ├─ PostDetail.js         # 게시글 상세 정보
│  ├─ Comment.js            # 댓글 정보
│  ├─ Image.js              # 이미지(취소 버튼)
│  ├─ ImageContainer.js     # 선택한 전체 이미지 로드
│  ├─ Input.js              # 입력창
│  ├─ Modal.js              # 모달
│  ├─ Toast.js              # 토스트 
│  ├─ header.html           # 공통 헤더    
│  └─ styles/               # 컴포넌트 전용 CSS
├─ utils/
│  ├─ Api.js                # fetch 모듈
│  ├─ config.js             # GCS, API URL
│  ├─ Dropdown.js           # 프로필 드롭다운
│  ├─ DateFomatter.js       # 날짜 변환
│  ├─ NumberFormatter.js    # 좋아요/조회/댓글 수 변환(1000 -> 1k)
└─ assets/                  # 아이콘, SVG, 기본 프로필
```

## 기능 시연 영상
### 회원가입/로그인

https://github.com/user-attachments/assets/6af348c8-88ef-463f-9466-05db61f28d67

### 회원 정보 수정/비밀번호 수정/로그아웃

https://github.com/user-attachments/assets/605ed585-3fdb-4582-b07d-973a4f55deac


### 게시글 목록 및 상세 정보 조회

https://github.com/user-attachments/assets/e411d17e-0057-444f-ab67-b162b1d43791

### 게시글 생성/수정

https://github.com/user-attachments/assets/d289b105-83f0-4765-8645-44c1cef75cd8

### 게시글 댓글 생성/수정/삭제

https://github.com/user-attachments/assets/1e0c7140-9e3f-4db0-b16d-a6eb5cc0bb00