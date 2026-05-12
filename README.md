# Melodic Soulmate

輸入生日，尋找與你同天誕生的歌手與靈魂聲音。

這是一個以 React、Vite 和原生 CSS 製作的單頁互動小工具。資料來源為公開 Google Sheet CSV，前端會在載入時預抓資料，並在使用者選擇月份與日期後比對同天出生的歌手。

## 功能

- 依月份動態顯示可選日期，避免 4/31、6/31 等無效選項。
- 從 Google Sheet CSV 解析歌手生日、介紹與音樂平台連結。
- 找到同日歌手時隨機顯示一位結果。
- 找不到同日資料時，改以推薦狀態顯示另一位歌手。
- 提供 Spotify、Apple Music 與 Google 搜尋連結。

## 技術棧

- React 19
- Vite 7
- CSS
- PapaParse
- Node.js built-in test runner

## 開發指令

```bash
npm install
npm run dev
```

## 驗證指令

```bash
npm test
npm run lint
npm run build
```

## 專案結構

```text
src/
  components/
    Background.jsx
    Icons.jsx
    ResultCard.jsx
    SearchForm.jsx
  utils/
    api.js
    date.js
  App.jsx
  index.css
tests/
  api.test.js
```
