# 踩地雷全端遊戲系統 (Minesweeper Full-Stack Game)

一個基於現代 Web 技術開發的踩地雷遊戲，具備完整的網頁前端介面、後端 API 伺服器，以及線上排行榜資料庫。

## 🚀 系統架構

本專案採用前後端分離架構開發：
- **前端 (Frontend)**: Next.js 14+ (App Router) / TypeScript / Tailwind CSS
- **後端 (Backend)**: Python 3+ / FastAPI / Uvicorn
- **資料庫 (Database)**: SQLite / SQL

---

## 🛠️ 專案目錄結構

```text
project/
├── minesweeper-frontend/     # Next.js 前端網頁專案
│   ├── app/                  # 網頁路由與主要畫面 (page.tsx)
│   └── types/                # TypeScript 型態定義 (game.ts)
├── minesweeper-backend/      # FastAPI 後端專案
│   ├── main.py               # 後端主程式與 API 路由
│   └── minesweeper.db        # SQLite 資料庫檔案
└── leaderboard/              # 資料庫初始化相關配置
    └── init.sql              # 資料庫結構腳本