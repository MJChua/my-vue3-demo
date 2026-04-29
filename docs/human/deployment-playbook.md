# 部署與上線指南

這份文件說明如何把專案打包、預覽、上線，以及發生問題時如何回復。

## 上線前準備

- 使用 `pnpm` 安裝與執行指令。
- 建議 Node.js 使用 18 以上版本。
- 每次正式上線前都要先跑完整檢查。

```bash
pnpm install
pnpm pre:pr
```

`pnpm pre:pr` 會檢查：

- 程式碼格式與規則。
- 單元測試。
- E2E 測試。
- 正式環境打包。

## 打包

正式網站檔案會產生在 `dist/`。

```bash
pnpm build
```

本機預覽：

```bash
pnpm preview
```

## 建議部署方式

### 靜態網站平台

可部署到 Cloudflare Pages、Netlify、Vercel、S3 + CDN、Nginx 等靜態網站服務。

流程：

1. 執行 `pnpm build`。
2. 將 `dist/` 內容上傳到網站根目錄。
3. 設定 SPA fallback，讓所有前端路由都回到 `index.html`。

### 臨時展示網址

若只是要快速分享 Demo，可使用：

- Netlify Drop：將 `dist/` 拖曳上傳。
- Cloudflare Pages Direct Upload：建立專案後直接上傳 `dist/`。

## API 說明

目前寵物資料使用公開 API：

- `https://dog.ceo/api`
- `https://api.thecatapi.com/v1`
- `https://randomfox.ca`

目前不需要自建後端。未來若需要 API key，應放在部署平台的環境變數，不要寫死在程式碼中。

## 正式上線檢查

1. 從 `master` 建立 release 分支，例如 `release_0.1.0`。
2. 合併本次 sprint 完成的功能與修復。
3. 執行 `pnpm pre:pr`。
4. 執行 `pnpm build`。
5. 將 release 分支合併回 `master`。
6. 部署 `dist/`。
7. 確認首頁、語系切換、主題切換、寵物牆載入與頁面刷新都正常。

## 緊急修復

1. 從目前 release 分支建立 `hotfix_X.Y.Z`。
2. 只修必要問題。
3. 先跑相關測試，再跑 `pnpm pre:pr`。
4. 打包並確認網站可正常運作。
5. 合併回 release 分支與 `master`。

## 回復方案

若正式環境發生重大問題：

1. 重新部署前一版可正常運作的 `dist/`。
2. 或將平台指回前一個 release/tag。
3. 在 [問題修復紀錄](./bug-tickets.md) 補上問題與修復進度。
