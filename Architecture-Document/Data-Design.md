# Data Design

## 1. 데이터 저장 방식

이 프로젝트에서는 데이터베이스 대신 JSON 파일을 활용하여 서버와 통신합니다. 각 데이터는 별도의 JSON 파일에 저장됩니다.

## 2. 데이터 구조

### 2.1 미디어 목록 데이터 구조

미디어 목록은 `playlist.json` 파일에 저장됩니다. 각 미디어 항목은 다음과 같은 구조를 가지며, 배열로 구성됩니다:

```json
[
  {
    
    "title": "영상 제목",
    "thumbnail": "https://i.postimg.cc/HLkr8LBK/img1.png",
    "url": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
  },
  ...
]

```
