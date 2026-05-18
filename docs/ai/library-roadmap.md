# 專案分區塊實作與可重用 Library 規劃（簡要版）

## 1) 目標
- 先把目前專案拆成可持續迭代的區塊任務，避免一次改太大。
- 抽出泛用能力，做成你自己的 library，之後可在不同專案重用。
- 先以「可在本專案落地 + 可對外發布」為設計原則。

## 2) 分區塊執行（建議順序）
### Block A. 基線整理（1 次）
- 統一套件管理器（建議只留 `pnpm` 或只留 `npm`，避免雙 lockfile）。
- 補 `docs/` 與 `CHANGELOG` 基礎文件。
- 確認 Node 版本、Lint 規則、命名規範。

### Block B. 建立 Library 骨架
- 在專案內建立 `packages/`（workspace 模式）：
  - `packages/ui`：可重用 Vue 元件
  - `packages/core`：工具函式、狀態與主題管理
  - `packages/http`：Axios client 與攔截器封裝
- 在 root 設定 workspace（`pnpm-workspace.yaml`）與 package exports。

### Block C. 抽離泛用能力（先抽穩定、高重用）
- 從現有程式抽出：
  - `attachAutoResize`（RWD 字級/裝置偵測）
  - `theme/appearance`（深淺色切換與 localStorage 持久化）
  - `http request`（timeout、request/response interceptors）
  - 基礎 UI 元件（`Button`, `Switch`, `HamburgerMenu`）
- 每個抽離項目都加最小可用文件（用途、參數、範例）。

### Block D. 專案回接與驗證
- 現有頁面改為使用 `packages/*` 來源，不改變既有 UI 行為。
- 驗證重點：首頁 API、主題切換、手機/桌機樣式、導覽流程。

### Block E. 對外重用準備
- 補版本策略（SemVer）。
- 補發佈方式：
  - 私有 npm registry（公司內部）
  - 或 GitHub Packages
  - 或先以 git tag + install from git URL

## 3) 技術方式（推薦）
- 開發模式：`pnpm workspace` + 本地 packages 同步開發。
- 匯出模式：每個 package 提供 `exports`（`import { ... } from '@michael/ui'`）。
- 元件文件：先用 `README + examples`，後續可升級 Storybook。
- 品質保證：每個 package 至少有 smoke test（可先用 Vitest）。

## 4) 目前可先收錄的「泛用功能清單」
- Layout/Device
  - 自適應字級與 device 判定
  - 手機/桌機 UI 行為切換 helper
- Theme
  - light/dark 切換
  - appearance persistence（localStorage key 管理）
- Network
  - axios 實例化
  - 統一 request/response/error handling
  - timeout 與 baseURL 管理
- UI Components
  - 通用 Button（size/type/shape）
  - Switcher（可掛主題切換）
  - Header/Footer 可拆成「導覽容器 + 資料配置」

## 5) 交付物（每區塊完成時）
- 程式：對應 `packages/*` 與 app 端接入。
- 文件：每個 package 一份 README（API + 使用範例 + 注意事項）。
- 變更記錄：`CHANGELOG` + migration note（有 breaking change 才需要）。

## 6) 本次確認點
- 你若同意此方向，我會先執行 Block A + Block B（先建骨架，不大量改功能）。
- 然後再進 Block C，逐項抽離並保持可回退。
