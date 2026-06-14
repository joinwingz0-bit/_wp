# 網頁設計與 JavaScript 程式設計：期末作業彙整報告

* **學校：** 國立金門大學
* **科系：** 資訊工程學系
* **姓名：** 朱毅勝
* **學號：** (請自行補充您的學號)
* **課程：** 網頁設計 / 網頁程式設計

---

## 課堂作業目錄導覽

1.  [作業一：個人網頁設計 (HTML5 & CSS3)](#作業一個人網頁設計-html5--css3)
2.  [作業二：互動表單設計 (HTML Form Controls)](#作業二互動表單設計-html-form-controls)
3.  [作業三：JavaScript 入門常式 (Hello World)](#作業三javascript-入門常式-hello-world)
4.  [作業四：JavaScript 基礎程式 10 題練習](#作業四javascript-基礎程式-10-題練習)
5.  [作業五：OpenCode 網站專案版本控制演練](#作業五opencode-網站專案版本控制演練)
6.  [作業六：JavaScript 函數與參數 10 題進階練習](#作業六javascript-函數與參數-10-題進階練習)
7.  [作業七：JavaScript 網誌/部落格功能核心演練 10 題](#作業七javascript-網誌部落格功能核心演練-10-題)
8.  [期末專案：經典踩地雷（Minesweeper）遊戲實作](#期末專案經典踩地雷minesweeper遊戲實作)

---

## 作業一：個人網頁設計 (HTML5 & CSS3)

### 1. 作業說明
本作業旨在練習 HTML5 的基本語意標籤（Semantic Tags）與 CSS3 的基本排版與樣式設定。網頁以個人履歷為主題，包含了大頭貼、基本資料、自我介紹、興趣與聯絡方式。

* **CSS 技術特點：**
    * 使用 `margin: auto;` 與固定寬度 `700px` 達成區塊水平置中。
    * 使用 `border-radius: 50%` 將正方形圖片裁剪為完美的圓形大頭貼。
    * 採用柔和的藍灰色調背景 (`#e8f0f7`)，提升視覺閱讀舒適度。

### 2. 原始程式碼 (`index.html`)
```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<title>我的個人網頁</title>

<style>
body{
    font-family: Arial;
    background-color:#e8f0f7;
    text-align:center;
}

.container{
    width:700px;
    margin:auto;
    background:white;
    padding:20px;
    border-radius:10px;
}

img{
    width:150px;
    border-radius:50%;
}

h1{
    color:#003366;
}

ul{
    list-style:none;
    padding:0;
}
</style>

</head>

<body>

<div class="container">

<h1>我的個人網頁</h1>

<img src="[https://via.placeholder.com/150](https://via.placeholder.com/150)">

<h2>基本資料</h2>
<p>姓名：朱毅勝</p>
<p>學校：國立金門大學</p>
<p>科系：資訊工程學系</p>

<h2>自我介紹</h2>
<p>
我是國立金門大學資訊工程系學生，
目前正在學習程式設計、演算法與網站開發。
希望未來能成為軟體工程師。
</p>

<h2>興趣</h2>
<ul>
<li>程式設計</li>
</ul>

<h2>聯絡方式</h2>
<p>Email：joinwingz0@email.com</p>

</div>

</body>
</html>
作業二：互動表單設計 (HTML Form Controls)1. 作業說明本作業實作了一個功能完整的新用戶註冊表單，綜合運用了 HTML5 的各種輸入控制項（Input Controls）以及前端表單驗證機制（HTML5 Client-side Validation），確保資料傳送到後端前的正確性。控制項與驗證特點：required 屬性：強制必填欄位。maxlength="20" / minlength="8"：限制使用者名稱與密碼的長度。type="email" / type="tel" / type="date"：使用正確的語意化輸入類型，在行動裝置上會自動切換對應的鍵盤（如數字、Email鍵盤）。pattern="09[0-9]{8}"：使用正規表示式（Regex）嚴格驗證台灣手機號碼格式。2. 原始程式碼片段 (register.html)HTML<form action="/register" method="POST">
  <h2>新用戶註冊</h2>

  <div>
    <label for="reg-username">使用者名稱：</label>
    <input type="text" id="reg-username" name="username" maxlength="20" placeholder="最多20個字" required>
  </div>

  <div>
    <label for="reg-email">電子信箱：</label>
    <input type="email" id="reg-email" name="email" required>
  </div>

  <div>
    <label for="reg-password">設定密碼：</label>
    <input type="password" id="reg-password" name="password" placeholder="至少8個字元" minlength="8" required>
  </div>

  <div>
    <label for="reg-phone">手機號碼：</label>
    <input type="tel" id="reg-phone" name="phone" pattern="09[0-9]{8}" placeholder="0912345678">
  </div>

  <div>
    <label for="reg-birth">出生日期：</label>
    <input type="date" id="reg-birth" name="birthday">
  </div>

  <div>
    <label>
      <input type="checkbox" name="terms" required> 我已閱讀並同意服務條款
    </label>
  </div>

  <button type="submit">註冊帳號</button>
</form>
作業三：JavaScript 入門常式 (Hello World)1. 作業說明學習開發環境設定與 JavaScript 的執行環境。此程式展示了最基礎的環境輸出，可於 Node.js 環境中透過終端機執行，或嵌入 HTML 檔案於瀏覽器主控台（Console）檢視。2. 原始程式碼 (hello.js)JavaScript// 顯示基礎問候訊息，確認 JavaScript 執行環境正確無誤
console.log("Hello, World! 我是金大資工系的朱毅勝。");
作業四：JavaScript 基礎程式 10 題練習1. 作業說明本習題完成了 10 個核心的 JavaScript 邏輯程式練習，涵蓋變數宣告、條件分支（if-else）、迴圈（for/while）以及陣列（Array）的操作。2. 練習題目與實作要點九九乘法表： 運用雙重迴圈（Nested Loops）輸出 1x1 到 9x9 的邏輯運算結果。質數判斷： 寫一函數輸入 $n$，利用迴圈與除法餘數判定是否為質數。費氏數列： 使用迴圈及動態更新變數數值，輸出前 $n$ 個費氏數項。陣列加總與平均： 迭代整數陣列計算總和與平均值（加深對 for 迴圈與陣列操作的熟練度）。字串反轉： 輸入一個字串，將其前後倒轉後重新輸出（熟練字串拆解、反轉與拼接）。最大公因數 (GCD)： 使用經典「輾轉相除法」求兩數的最大公因數，體會演算法的精簡。攝氏華氏溫度轉換： 實作溫度的雙向轉換公式，練習基礎的算術運算。隨機數猜測： 實作猜數字遊戲的核心邏輯與邊界判斷。陣列不重複過濾： 從陣列中剔除重複的元素（練習 indexOf 或 ES6 的 Set 物件）。階乘計算 (Factorial)： 計算 $n!$ 的值，分別實作迴圈迭代法與遞迴寫法（Recursion）。作業五：OpenCode 網站專案版本控制演練1. 作業說明本專案練習使用 OpenCode（或 Git/GitHub）工具進行網頁前端專案的版本控制管理。透過定義清晰的修訂歷史（Commit Message）與分支管理，模擬業界軟體開發團隊的工作流。2. 版本遞進紀錄 (Version History)V1.0 - 初始版本： 建立基礎 HTML 骨架，完成個人網頁的基本結構配置。V2.0 - 樣式優化： 加入 CSS 視覺效果，優化排版、圓形頭像、色彩與字型規範。V3.0 - 表單與動態驗證： 整合註冊表單，並引入 JavaScript 進行前端資料格式的檢驗。作業六：JavaScript 函數與參數 10 題進階練習1. 作業說明深入練習 JavaScript 中的函數架構，包含匿名函數（Anonymous Functions）、箭頭函數（Arrow Functions）、回呼函數（Callback Functions）、參數預設值（Default Parameters）以及其餘參數（Rest Parameters）的進階實作。2. 核心練習重點箭頭函數改寫： 將傳統具名函數改寫為精簡的 ES6 箭頭函數。回呼函數 (Callback) 應用： 設計一核心計算函數，接收數據與處理運算的回呼函數。其餘參數不限個數加總： 運用 ...args 接收任意數量的參數並進行總和計算。函數閉包 (Closure) 應用： 實作一個計數器產生器，維持計數變數的封裝性與獨立狀態。參數預設值處理： 撰寫具備安全預設參數值的問候打招呼函數。作業七：JavaScript 網誌/部落格功能核心演練 10 題1. 作業說明本習題是深入理解「部落格/網誌系統（Blog System）」前端運作架構的關鍵練習。題目圍繞在 JSON 資料解析、DOM 元素動態生成、文章列表渲染、物件陣列的篩選（filter）與排序（sort）等前端開發必備核心。2. 核心練習重點模擬文章資料庫： 建立文章物件陣列（包含 id, title, content, tags, date 等屬性）。動態渲染 DOM： 使用 document.createElement 與樣版字串（Template Literals）將 JSON 資料動態插入網頁。標籤篩選功能： 實作點擊特定標籤（Tag）後，利用 array.filter() 即時更新顯示的文章列表。按時間排序文章： 實作 array.sort() 對文章發布日期進行新舊排序切換。留言板功能模擬： 練習陣列的 push() 操作，動態新增留言並即時更新 DOM 留言區域。期末專案：經典踩地雷（Minesweeper）遊戲實作1. 專案簡介本期末專案為一個完全基於原生 JavaScript (Vanilla JS)、HTML5 與 CSS3 開發的互動式踩地雷遊戲。完美融合了全學期所學的 DOM 操作、事件監聽、二維陣列資料結構以及演算法邏輯。2. 技術架構與核心邏輯二維陣列地圖（2D Array）： 使用 JavaScript 宣告二維陣列來動態維護地雷網格（包含地雷位置、周圍地雷數、是否插旗、是否翻開等狀態）。隨機佈雷演算法： 運用 Math.random() 確保每次開局的地雷位置皆為隨機且分布均勻。DFS/BFS 記憶體擴展（自動展開空地）： 當玩家點擊到周圍地雷數為 0 的安全格子時，程式會利用深度優先搜尋 (DFS) 或廣度優先搜尋演算法，自動連鎖翻開鄰近的所有安全空地，大幅提升遊戲操作體驗。滑鼠事件監聽（Event Listeners）：click 事件：翻開網格。contextmenu 事件（右鍵）：插旗標記地雷，並使用 e.preventDefault() 阻止瀏覽器預設右鍵選單彈出。勝負判定機制：失敗： 點擊到地雷，遊戲結束，揭露全盤地雷位置。勝利： 所有非地雷的安全格子皆被成功翻開。總結本學期的作業由淺入深，從最基礎的靜態 HTML/CSS 視覺排版，逐步深入到 JavaScript 程式邏輯、資料結構、DOM 元素操控，最終在期末專案：踩地雷中將所有知識點融會貫通。不僅建立起扎實的前端網頁工程基石，也培養了良好的程式碼重構與版本控制思維。
