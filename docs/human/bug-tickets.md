# 問題修復紀錄

這份文件整理目前已修復或正在合併中的問題，方便使用者了解專案改善內容。

## BUG-001 首頁圖片來源失效

### 狀態
已修復，等待合併到 `devlop`。

### 使用者看到的狀況
- 首頁無法取得遠端寵物圖片。
- 圖片區塊無法正常顯示。

### 修復內容
- 改用穩定的公開圖片 API：`https://dog.ceo/api/breeds/image/random/{count}`。
- 調整首頁資料處理流程，讓圖片清單可以正確渲染成卡片。
- 修正 HTTP 請求包裝，避免 URL 組合錯誤。
- 將 API 模組名稱改為更清楚的 `dogApi.js`。

### 驗證
- `pnpm lint` 通過。
- `pnpm build` 通過，僅有警告。

## BUG-002 桌機版頁尾出現 i18n 編譯錯誤

### 狀態
已修復，等待合併到 `devlop`。

### 使用者看到的狀況
- 桌機頁面在開發工具中出現 `Message compilation error: Invalid linked format`。
- 錯誤來源是頁尾文字 `@2026 Demo`。

### 修復內容
- 因為 `vue-i18n` 會把 `@` 當成連結語法，所以改成 `© 2026 Demo`。
- 同步更新英文與繁體中文語系文字。

### 驗證
- `pnpm pre:pr:quick` 通過。
