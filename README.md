# BEAUTIA(뷰티아) 프리미엄 글로벌 사전 예약 페이지

- **Stack**: Vite + React + TypeScript + Tailwind CSS + Framer Motion
- **핵심 기능**: Full-page Scroll Snap, 우측 도트 네비게이션, Moving Aurora Glow, Magnetic Effect(Desktop), Number Ticker Countdown, 다국어(KO/EN/JP/CN/TH)

## 실행

```bash
npm install
npm run dev
```

## Waitlist 전송 설정

- `.env` 또는 `.env.local`에 아래 중 하나를 설정하세요.
  - `VITE_WAITLIST_ENDPOINT` : 직접 수집 API(예: Supabase Edge Function, 서버리스 함수) URL
  - 또는 `VITE_FORMSPREE_ID` : Formspree 폼 ID (`https://formspree.io/f/<ID>`)
- 두 값 모두 없으면 데모 모드로 동작하며, 폼 하단에 안내가 노출됩니다.

## 빌드/프리뷰

```bash
npm run build
npm run preview
```

## 배포 가이드 (Vercel / Netlify)

- Node 20+, `npm install` → `npm run build` → `dist` 출력
- Vercel: Framework = Vite/React, Build Command `npm run build`, Output `dist`
- Netlify: Build Command `npm run build`, Publish `dist`
- 환경변수는 대시보드에 `VITE_WAITLIST_ENDPOINT` 또는 `VITE_FORMSPREE_ID`로 입력

## 대기자 실전 연동 옵션

1) Formspree (제로 백엔드)
- 폼 생성 후 ID를 `VITE_FORMSPREE_ID`에 설정 → 자동 알림/스팸 필터

2) Supabase Webhook / Edge Function
- 테이블 예시  
  `waitlist(id uuid primary key default gen_random_uuid(), email text, source text, lang text, created_at timestamptz default now())`
- RLS 예시  
  `create policy "allow insert from service role" on waitlist for insert with check (auth.role() = 'service_role');`
- Edge Function(`/waitlist`)에서 `{ email, source, lang, ts }` 수신 후 insert
- 프런트 `.env` → `VITE_WAITLIST_ENDPOINT=https://<project>.supabase.co/functions/v1/waitlist`

3) Sendgrid 알림
- 서버리스 함수에서 Sendgrid API로 운영팀 알림 메일 발송
- 함수 URL을 `VITE_WAITLIST_ENDPOINT`로 지정

## 추가 제품화 아이디어

- Hero CTA 후속: 성공 시 축하 모달 또는 상단 토스트
- 파트너 섹션: 데모 캘린더(슬롯 선택) + 가격표(메뉴/옵션/총액) 카드
- 접근성: aria-label/aria-pressed, 포커스 트랩(모달), 키보드 내비게이션
- 모바일: 768px 이하 자석 효과 비활성, 터치 시 scale 0.95 유지

## SEO / 퍼포먼스 체크리스트

- `<title>` / `<meta name="description">` / OG 태그 (필요 시 OG 이미지)
- Lighthouse로 Performance/Accessibility/Best Practices/SEO 확인
- 이미지: 가능하면 webp/svgo, 배경은 CSS 그라디언트 유지


