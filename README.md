# Portfolio Guestbook

React, Next.js, TypeScript, Tailwind CSS, Supabase로 만든 포트폴리오 방명록입니다.

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

테이블명은 요청한 대로 `guestbook`입니다.

컬럼:

- `id`: uuid primary key
- `name`: text, not null
- `message`: text, not null
- `avatar_url`: text, nullable
- `created_at`: timestamptz, default now()

## 4. 환경변수

`.env.local`에 아래처럼 저장합니다.

```env
NEXT_PUBLIC_SUPABASE_URL=https://qzekurrfmswtfavispiw.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_jA0sfF_RlCSoRBr5n1ndEg_1N9byiDW
```

`sb_secret_...`로 시작하는 secret key는 서버 전용입니다. 이 방명록은 브라우저에서 Supabase에 접근하므로 secret key를 코드나 `.env.local`에 넣지 않습니다.

## 5. 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속합니다.

## 6. 구현된 기능

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
