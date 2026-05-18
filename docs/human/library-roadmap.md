# 功能模組與共用元件規劃

這份文件說明如何把目前專案整理成可長期維護、也能在其他專案重用的模組。

## 目標

- 將專案拆成較小的可迭代區塊。
- 抽出可重用能力，形成自己的 library。
- 先求能在本專案穩定使用，再考慮對外發布。

## 建議順序

### A. 基線整理

- 統一套件管理器，目前使用 `pnpm`。
- 補齊文件與變更紀錄。
- 確認 Node 版本、Lint 規則與命名規範。

### B. 建立 library 骨架

目前規劃：

- `packages/ui`：共用 Vue 元件。
- `packages/core`：工具函式、狀態、主題能力。
- `packages/http`：HTTP client 與攔截器封裝。

### C. 抽出共用能力

優先抽出穩定且容易重用的功能：

- 自適應字級與裝置判斷。
- 深色與淺色主題切換。
- HTTP 請求封裝。
- 基礎 UI 元件，例如 Button、Theme Switch、Hamburger Menu。

### D. 回接到目前專案

將目前頁面改成使用 `packages/*`，但不改變既有使用體驗。

驗證重點：

- 首頁 API。
- 主題切換。
- 手機與桌機畫面。
- 導覽流程。

### E. 對外重用準備

未來可補上：

- SemVer 版本策略。
- 私有 npm registry。
- GitHub Packages。
- 或以 git tag 安裝。

## 每階段交付物

- 對應的程式碼。
- package README。
- 使用範例。
- 變更紀錄。
- 若有破壞性改動，補 migration note。
