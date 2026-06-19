# NY Studio Portfolio

정적 HTML/CSS/JavaScript 기반 포트폴리오 사이트입니다.

## 배포

Vercel에서는 별도 빌드 없이 루트의 정적 파일을 배포합니다.

주요 파일:

- `index.html`
- `portfolio-detail.html`
- `contact.html`
- `login.html`
- `signup.html`
- `assets/`
- `supabase/profiles.sql` (로그인/회원가입 페이지를 사용할 때만 필요)

## 보안 메모

- `.env`, `.env.production`, `.env.*`는 Git에 포함하지 않습니다.
- 현재 배포에는 환경 파일이 필요하지 않습니다.
- Supabase `service_role` 또는 secret key는 브라우저 코드에 넣지 않습니다.
- 방명록 기능은 제거되었습니다.
