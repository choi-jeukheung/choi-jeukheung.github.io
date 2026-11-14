# 운영 정보 및 개인정보처리방침 점검

점검일: 2026-11-14. 애드센스 준비 계획의 4번 중 저장소 수정 및 빌드 검증 기록.

## 반영 사항

- 소개 페이지와 사이트 설정에서 쓰던 `cyd5538@gmail.com`으로 작성자 연락처 통일. 실제 메일 수신 여부는 별도 확인 필요.
- 사이트 설정 및 사용자가 제공했던 채널 핸들 `최즉흥-e9k`로 작성자·유튜브 버튼 통일. 설정 URL의 끝 공백 제거.
- 소개 페이지 문의 버튼과 두 SNS 컴포넌트는 공통 사이트 설정을 참조하도록 변경.
- 작성자 파일의 확인되지 않은 Studio/팀/한영 자막 소개를 제거하고, 기존 소개 및 사용자가 알려준 조리기능사 정보에 맞춰 수정.
- 개인정보처리방침 수정일을 2026-11-14로 변경. 이메일 문의, GA, GTM, GitHub Pages, 카카오 애드핏, YouTube, 쿠팡파트너스 및 외부 이미지, 쿠키 설정과 문의 방법 안내.
- 승인 준비 중인 AdSense를 이미 게재하고 있다는 기존 문구 삭제. 모든 데이터가 익명이라는 단정도 삭제.
- Umami ID가 없는 경우 스크립트를 불러오지 않도록 조정. ID가 설정된 빌드에서는 방침에도 Umami 안내를 함께 출력.
- 푸터에서 개인정보처리방침으로 연결되는 링크 확인.

## 확인 범위와 남은 운영 확인

- GA4와 GTM 삽입 코드, AdFit 광고 코드, YouTube 삽입 플레이어를 저장소에서 확인.
- GTM 원격 컨테이너에 추가된 태그, 분석 서비스의 보존 기간, 사업자 계정 설정은 접근하지 못했음. 추가 서비스를 활성화했다면 방침도 갱신해야 함.
- 이메일 문의 처리 후 삭제 원칙을 방침에 명시했으므로 운영 시에도 지켜야 함. 정확한 보존 기간이나 동의 수집이 구현됐다고 주장하지 않음.
- 이 수정은 운영 안내 정합성 보완이며 법률 검토 또는 애드센스 승인 보장이 아님.
- 이번 작업에서 원격 배포 및 애드센스 재검토 신청은 실행하지 않음. 변경분 배포 후 실제 페이지와 연락처를 확인하고 재검토 신청할 것.

## 검증

- `npm run build`: 성공.
- 수정 TSX 4개 ESLint: 통과.
- `git diff --check`: 통과.
- 생성된 `out/privacy/index.html`에서 이메일, AdFit, Coupang Partners, YouTube 및 수정일 확인. 기존 AdSense 게재 문구 제거 확인.

## 참고한 공식 안내

- https://policies.google.com/technologies/partner-sites?hl=ko
- https://www.kakao.com/policy/privacy?lang=ko
- https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement
- https://privacy.coupang.com/ko/center/coupang/
