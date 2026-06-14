CREATE TABLE leaderboard (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    difficulty TEXT NOT NULL,       -- 'easy', 'medium', 'hard'
    elapsed_time REAL NOT NULL,     -- 通關時間（秒），保留到小數點後三位
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);