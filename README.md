# Portfolio Guestbook

GitHub Pages에 배포되는 정적 HTML 포트폴리오와 Supabase Auth 방명록입니다.

현재 실제 배포 기준 파일은 `index.html`, `guestbook.html`, `portfolio-detail.html`입니다.
`app/`, `components/`, `lib/` 폴더에는 Next.js 버전의 실험/참고 코드가 남아 있지만,
GitHub Pages 정적 배포에는 루트 HTML 파일들이 직접 사용됩니다.

## 1. 생성된 파일 구조

```txt
app/
  globals.css
  layout.tsx
  page.tsx
components/
  Guestbook.tsx
  GuestbookForm.tsx
  GuestbookList.tsx
lib/
  avatar.ts
  supabase.ts
types/
  guestbook.ts
supabase/
  guestbook.sql
.env.example
.env.local
package.json
tailwind.config.ts
tsconfig.json
```

## 2. 생성 순서

1. `package.json`, `tsconfig.json`, `tailwind.config.ts` 등 Next.js 기본 설정 파일을 만듭니다.
2. `.env.local`에 Supabase URL과 publishable key를 넣습니다.
3. `supabase/guestbook.sql`을 Supabase SQL Editor에서 실행해 테이블과 정책을 만듭니다.
4. `lib/supabase.ts`에서 Supabase 클라이언트를 생성합니다.
5. `types/guestbook.ts`에 방명록 데이터 타입을 정의합니다.
6. `components/GuestbookForm.tsx`에서 작성 폼과 등록 기능을 만듭니다.
7. `components/GuestbookList.tsx`에서 최신순 목록 UI를 만듭니다.
8. `components/Guestbook.tsx`에서 폼과 목록 상태를 연결합니다.
9. `app/page.tsx`에 방명록 화면을 배치합니다.

## 3. Supabase 테이블 만들기

Supabase Dashboard에서 `SQL Editor`를 열고 아래 파일 내용을 실행하세요.

```txt
supabase/guestbook.sql
```

테이블명은 `guestbook`과 `profiles`입니다.

`profiles` 컬럼:

- `id`: uuid primary key, Supabase Auth의 `auth.users.id`와 연결
- `username`: text, unique, 영문 소문자와 숫자 4~20자
- `email`: text, unique
- `phone`: text, unique, 010으로 시작하는 숫자 11자리
- `created_at`: timestamptz, default now()

`guestbook` 컬럼:

- `id`: uuid primary key
- `user_id`: uuid, Supabase Auth 사용자와 연결
- `name`: text, not null
- `message`: text, not null
- `avatar_url`: text, nullable
- `created_at`: timestamptz, default now()

RLS 정책:

- 누구나 방명록 목록은 읽을 수 있습니다.
- 로그인한 사용자만 방명록을 작성할 수 있습니다.
- 방명록 작성 시 `user_id`는 현재 로그인한 사용자와 일치해야 합니다.
- `profiles.username`은 중복 검사를 위해 조회됩니다.

## 4. Supabase Auth 설정

Supabase Dashboard에서 `Authentication > Providers > Email`을 켭니다.

과제용으로 회원가입 후 바로 자동 로그인되게 하려면 이메일 확인을 끄는 설정이 필요합니다.
이메일 확인이 켜져 있으면 가입은 되지만, 이메일 확인 전까지 자동 로그인이 막힐 수 있습니다.

`guestbook.html`의 `Supabase 설정` 버튼을 눌러 anon public key를 저장하세요.
프로젝트 URL은 코드에 이미 들어 있고, secret key는 절대 브라우저에 넣지 않습니다.

## 5. Next.js 참고용 환경변수

`.env.local`에 아래처럼 저장합니다.

```env
NEXT_PUBLIC_SUPABASE_URL=https://qzekurrfmswtfavispiw.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_jA0sfF_RlCSoRBr5n1ndEg_1N9byiDW
```

`sb_secret_...`로 시작하는 secret key는 서버 전용입니다. 이 방명록은 브라우저에서 Supabase에 접근하므로 secret key를 코드나 `.env.local`에 넣지 않습니다.

## 6. 정적 HTML 실행 방법

GitHub Pages에서는 루트의 `index.html`이 바로 열립니다.
로컬에서는 `index.html`이나 `guestbook.html`을 브라우저로 열어 확인할 수 있습니다.

## 7. Next.js 참고용 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속합니다.

## 8. 구현된 기능

- 이름, 메시지 입력
- 공백 입력 방지
- 등록 중 로딩 상태
- Supabase `guestbook` 테이블에 저장
- 저장 후 입력값 초기화
- 새로고침 없이 목록 갱신
- `created_at` 기준 최신순 목록
- DiceBear 랜덤 아바타
- 오류 메시지 표시
- 반응형 카드 UI
- Supabase Auth 회원가입/로그인
- username 실시간 검증과 중복 검사
- 이메일/전화번호/비밀번호 실시간 검증
- 비밀번호 보기/숨기기
- 회원가입 후 `환영합니다!` 알림
- 로그인 상태 유지
- 로그아웃
- 로그인 사용자만 방명록 작성
