# 開發分支流程

這份文件說明專案分支如何使用，避免功能、修復與正式上線流程混在一起。

## 主要分支

### `master`

正式可上線分支，只接收已完成並驗證過的 release 內容。

### `devlop`

日常整合分支。所有功能與修復都應先合併到這裡。

### `release_*`

準備上線時，從 `master` 建立 release 分支。

命名範例：

- `release_0.1.0`
- `release_0.2.0`

### `hotfix_*`

正式上線後若有緊急問題，從目前 release 分支建立 hotfix 分支。

命名範例：

- `hotfix_0.1.1`
- `hotfix_0.2.1`

### 工作分支

- 功能：`feature_XX_short-name`
- 修復：`bugfix_short-name`

範例：

- `feature_01_workspace-library`
- `bugfix_api-timeout`

## 日常開發流程

1. 更新 `devlop`。
2. 從 `devlop` 建立工作分支。
3. 實作、測試、提交、推送。
4. 開 PR 合併回 `devlop`。
5. sprint 完成後，再把完成範圍整理到 release 分支。

## 上線流程

1. 從 `master` 建立 `release_X.Y.Z`。
2. 將本次完成的功能與修復合併到 release 分支。
3. 在 release 分支執行完整檢查。
4. 合併 release 分支回 `master`。
5. 從 `master` 部署。

## 清理規則

- 若替換圖片或檔案，移除不再使用的舊檔。
- PR 前確認沒有殘留未使用的資源。

## UI 對比規則

任何影響畫面的改動，都要確認深色與淺色主題都可閱讀：

- 文字不能和背景混在一起。
- 按鈕、標籤、圖示要有足夠對比。
- 手機抽屜、頁尾操作與主要表單是必要檢查點。
