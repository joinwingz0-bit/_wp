'use client';

import { useState, useEffect, useRef } from 'react';
import { Cell, GameStatus, Difficulty, DIFFICULTY_PRESETS } from '../types/game';

const BACKEND_URL = 'http://127.0.0.1:8000/api';

export default function Minesweeper() {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [board, setBoard] = useState<Cell[][]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>('IDLE');
  const [time, setTime] = useState<number>(0);
  const [username, setUsername] = useState<string>('');
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [showRankModal, setShowRankModal] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const config = DIFFICULTY_PRESETS[difficulty];

  // 初始化空白棋盤
  const createEmptyBoard = (rows: number, cols: number): Cell[][] => {
    return Array(rows).fill(null).map((_, x) =>
      Array(cols).fill(null).map((_, y) => ({
        x, y, isMine: false, isRevealed: false, isFlagged: false, neighborMines: 0
      }))
    );
  };

  useEffect(() => {
    resetGame();
    fetchLeaderboard();
  }, [difficulty]);

  // 計時器邏輯
  useEffect(() => {
    if (gameStatus === 'PLAYING') {
      startTimeRef.current = performance.now() - time * 1000;
      timerRef.current = setInterval(() => {
        setTime((performance.now() - startTimeRef.current) / 1000);
      }, 50);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [gameStatus]);

  const resetGame = () => {
    setBoard(createEmptyBoard(config.rows, config.cols));
    setGameStatus('IDLE');
    setTime(0);
    setShowRankModal(false);
  };

  // 佈置地雷（避開玩家第一次點擊的座標）
  const generateMines = (currentBoard: Cell[][], firstX: number, firstY: number) => {
    let minesPlaced = 0;
    while (minesPlaced < config.mines) {
      const rx = Math.floor(Math.random() * config.rows);
      const ry = Math.floor(Math.random() * config.cols);
      // 不能擺在已經是雷的地方，且避開第一次點擊的格子
      if (!currentBoard[rx][ry].isMine && (rx !== firstX || ry !== firstY)) {
        currentBoard[rx][ry].isMine = true;
        minesPlaced++;
      }
    }

    // 計算周圍雷數
    for (let x = 0; x < config.rows; x++) {
      for (let y = 0; y < config.cols; y++) {
        if (currentBoard[x][y].isMine) continue;
        let count = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (currentBoard[x + i]?.[y + j]?.isMine) count++;
          }
        }
        currentBoard[x][y].neighborMines = count;
      }
    }
  };

  // Flood Fill 演算法：自動展開周圍沒有雷的空格
  const revealCell = (newBoard: Cell[][], x: number, y: number) => {
    const queue = [[x, y]];
    while (queue.length > 0) {
      const [cx, cy] = queue.shift()!;
      if (!newBoard[cx]?.[cy] || newBoard[cx][cy].isRevealed || newBoard[cx][cy].isFlagged) continue;

      newBoard[cx][cy].isRevealed = true;

      if (newBoard[cx][cy].neighborMines === 0 && !newBoard[cx][cy].isMine) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i !== 0 || j !== 0) queue.push([cx + i, cy + j]);
          }
        }
      }
    }
  };

  // 檢查是否獲利
  const checkWinCondition = (currentBoard: Cell[][]): boolean => {
    return currentBoard.every(row =>
      row.every(cell => cell.isMine ? !cell.isRevealed : cell.isRevealed)
    );
  };

  // 點擊格子事件 (左鍵)
  const handleLeftClick = (x: number, y: number) => {
    if (gameStatus === 'WIN' || gameStatus === 'LOSS' || board[x][y].isFlagged) return;

    let currentStatus = gameStatus;
    let newBoard = JSON.parse(JSON.stringify(board));

    if (currentStatus === 'IDLE') {
      generateMines(newBoard, x, y);
      currentStatus = 'PLAYING';
      setGameStatus('PLAYING');
    }

    if (newBoard[x][y].isMine) {
      setGameStatus('LOSS');
      revealAllMines(newBoard);
      return;
    }

    revealCell(newBoard, x, y);

    if (checkWinCondition(newBoard)) {
      setGameStatus('WIN');
      setShowRankModal(true);
    }
    setBoard(newBoard);
  };

  // 右鍵插旗事件
  const handleRightClick = (e: React.MouseEvent, x: number, y: number) => {
    e.preventDefault();
    if (gameStatus !== 'PLAYING' && gameStatus !== 'IDLE') return;

    const newBoard = [...board];
    if (!newBoard[x][y].isRevealed) {
      newBoard[x][y].isFlagged = !newBoard[x][y].isFlagged;
      setBoard(newBoard);
    }
  };

  const revealAllMines = (newBoard: Cell[][]) => {
    newBoard.forEach(row => row.forEach(c => { if (c.isMine) c.isRevealed = true; }));
    setBoard(newBoard);
  };

  // 獲取排行榜
  const fetchLeaderboard = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/leaderboard/${difficulty}`);
      const data = await res.json();
      setLeaderboard(data);
    } catch (err) {
      console.error('無法取得排行榜', err);
    }
  };

  // 提交分數
  const submitScore = async () => {
    if (!username.trim()) return alert('請輸入暱稱！');
    try {
      const res = await fetch(`${BACKEND_URL}/leaderboard`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, difficulty, elapsed_time: time }),
      });
      if (res.ok) {
        setShowRankModal(false);
        fetchLeaderboard();
      }
    } catch (err) {
      alert('上傳失敗');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-8 px-4">
      <h1 className="text-4xl font-extrabold mb-6 tracking-wider text-teal-400">MineSweeper Online</h1>

      {/* 難度切換與計時器 */}
      <div className="flex justify-between items-center w-full max-w-4xl mb-6 bg-gray-800 p-4 rounded-xl shadow-lg">
        <div className="space-x-2">
          {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`px-4 py-2 rounded-md font-bold uppercase transition ${
                difficulty === d ? 'bg-teal-500 text-gray-950' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
        <div className="text-2xl font-mono bg-gray-950 px-4 py-2 rounded-lg border border-gray-700 text-yellow-400">
          ⏱️ {time.toFixed(2)}s
        </div>
        <button onClick={resetGame} className="px-5 py-2 bg-rose-600 hover:bg-rose-500 rounded-md font-bold">
          重新開始
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl justify-center items-start">
        {/* 遊戲棋盤區 */}
        <div className="bg-gray-800 p-4 rounded-xl shadow-2xl overflow-auto max-w-full mx-auto">
          <div
            className="grid gap-1 bg-gray-950 p-2 rounded-lg"
            style={{ gridTemplateColumns: `repeat(${config.cols}, minmax(0, 1fr))` }}
          >
            {board.map((row, x) =>
              row.map((cell, y) => {
                let cellBg = 'bg-gray-700 hover:bg-gray-600';
                if (cell.isRevealed) cellBg = cell.isMine ? 'bg-red-600' : 'bg-gray-800';

                return (
                  <button
                    key={`${x}-${y}`}
                    onClick={() => handleLeftClick(x, y)}
                    onContextMenu={(e) => handleRightClick(e, x, y)}
                    className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center font-extrabold rounded text-sm transition select-none ${cellBg}`}
                  >
                    {cell.isRevealed ? (
                      cell.isMine ? '💣' : cell.neighborMines > 0 ? cell.neighborMines : ''
                    ) : (
                      cell.isFlagged ? '🚩' : ''
                    )}
                  </button>
                );
              })
            )}
          </div>
          {gameStatus === 'LOSS' && <p className="text-red-400 font-bold text-center mt-4 text-xl">💥 踩到雷了，遊戲結束！</p>}
          {gameStatus === 'WIN' && <p className="text-green-400 font-bold text-center mt-4 text-xl">🎉 恭喜通關！</p>}
        </div>

        {/* 即時公開排行榜區 */}
        <div className="w-full lg:w-80 bg-gray-800 p-5 rounded-xl shadow-2xl">
          <h2 className="text-xl font-bold mb-4 text-teal-400 border-b border-gray-700 pb-2 flex items-center gap-2">
            🏆 世界排行榜 ({difficulty.toUpperCase()})
          </h2>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {leaderboard.length === 0 ? (
              <p className="text-gray-400 text-sm italic">暫無排名，快來搶佔第一！</p>
            ) : (
              leaderboard.map((player, idx) => (
                <div key={idx} className="flex justify-between items-center bg-gray-900 p-2 rounded border border-gray-700">
                  <span className="text-sm">
                    <span className="font-bold text-amber-400 mr-2">#{idx + 1}</span>
                    {player.username}
                  </span>
                  <span className="font-mono text-sm text-teal-300 font-bold">{player.elapsed_time.toFixed(3)}s</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 贏球提交成績彈窗 */}
      {showRankModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 p-6 rounded-2xl max-w-sm w-full border border-gray-700 shadow-2xl">
            <h3 className="text-2xl font-bold text-green-400 mb-2">榮登排行榜！</h3>
            <p className="text-gray-300 text-sm mb-4">通關時間為 <span className="text-yellow-400 font-bold font-mono">{time.toFixed(3)} 秒</span>，請輸入您的暱稱以登錄排行：</p>
            <input
              type="text"
              maxLength={20}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="輸入玩家名稱..."
              className="w-full p-2 rounded bg-gray-950 border border-gray-700 text-white focus:outline-none focus:border-teal-500 mb-4"
            />
            <div className="flex gap-2">
              <button onClick={submitScore} className="flex-1 bg-teal-500 hover:bg-teal-400 text-gray-950 font-bold py-2 rounded">
                提交成績
              </button>
              <button onClick={() => setShowRankModal(false)} className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded">
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}