# 可重用能力清單

這份文件整理目前專案中適合抽成共用 library 的能力。

## 1. 裝置與版面工具

來源：

- `src/utils/resizeScreen.js`

目標 package：

- `@my-vue3/core`

用途：

- 自動調整字級。
- 判斷手機或桌機。

目前狀態：

- 已抽到 `packages/core`。
- App 端仍保留相容包裝。

## 2. 主題與外觀

來源：

- `src/store/main.js`
- `src/App.vue`

目標 package：

- `@my-vue3/core`

用途：

- 深色與淺色主題切換。
- 將使用者選擇保存到 localStorage。

目前狀態：

- 規劃中。

## 3. HTTP client

來源：

- `src/utils/http/request.js`
- `src/utils/http/index.js`

目標 package：

- `@my-vue3/http`

用途：

- 建立 axios client。
- 統一 request、response、error handling。
- 管理 timeout 與 baseURL。

目前狀態：

- 已抽到 `packages/http`。
- App 請求層已接入。

## 4. 通用 UI 元件

來源：

- `src/components/Button`
- `src/components/HamburgerMenu`

目標 package：

- `@my-vue3/ui`

用途：

- Button。
- ThemeSwitch。
- HamburgerMenu。
- Vue plugin 安裝 helper。

目前狀態：

- 規劃中。

## 5. 唯讀寵物資料 repository

來源：

- `src/data/laceDb/readOnlyPetRepository.js`
- `src/api/petFeedApi.js`

目標 package：

- `@my-vue3/core`，未來也可能拆成 `@my-vue3/data`。

用途：

- 取得寵物資料。
- 統一寵物資料 schema。
- 提供分類篩選資料給 UI。

目前狀態：

- App 內已完成。
- package 抽離規劃中。

## 原則

- App 專屬文案、商業頁面、品牌樣式留在 app。
- 只抽穩定、可重用、介面清楚的邏輯或元件。
- 每個 package 都要補 README、API 與使用範例。
