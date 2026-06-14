from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import sqlite3
from typing import List

app = FastAPI(title="Minesweeper Leaderboard API")

# 允許前端跨網域請求 (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # 生產環境應限制為前端網址
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_NAME = "minesweeper.db"

# 初始化資料庫
def init_db():
    with sqlite3.connect(DB_NAME) as conn:
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS leaderboard (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL,
                difficulty TEXT NOT NULL,
                elapsed_time REAL NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        """)
        conn.commit()

init_db()

# 定義 Pydantic 資料模型
class ScoreSubmit(BaseModel):
    username: str = Field(..., min_length=1, max_length=20)
    difficulty: str = Field(..., pattern="^(easy|medium|hard)$")
    elapsed_time: float = Field(..., gt=0)

class LeaderboardEntry(BaseModel):
    username: str
    elapsed_time: float
    created_at: str

# API 1: 提交成績
@app.post("/api/leaderboard", status_code=201)
async def submit_score(score: ScoreSubmit):
    try:
        with sqlite3.connect(DB_NAME) as conn:
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO leaderboard (username, difficulty, elapsed_time) VALUES (?, ?, ?)",
                (score.username, score.difficulty, round(score.elapsed_time, 3))
            )
            conn.commit()
        return {"status": "success", "message": "成績已成功提交！"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# API 2: 取得排行榜 (依時間由短到長排序，取前 10 名)
@app.get("/api/leaderboard/{difficulty}", response_model=List[LeaderboardEntry])
async def get_leaderboard(difficulty: str, limit: int = 10):
    if difficulty not in ["easy", "medium", "hard"]:
        raise HTTPException(status_code=400, detail="無效的難度參數")
        
    with sqlite3.connect(DB_NAME) as conn:
        cursor = conn.cursor()
        cursor.execute(
            """SELECT username, elapsed_time, datetime(created_at, 'localtime') 
               FROM leaderboard 
               WHERE difficulty = ? 
               ORDER BY elapsed_time ASC 
               LIMIT ?""",
            (difficulty, limit)
        )
        rows = cursor.fetchall()
        
    return [
        {"username": row[0], "elapsed_time": row[1], "created_at": row[2]} 
        for row in rows
    ]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main.py:app", host="127.0.0.1", port=8000, reload=True)