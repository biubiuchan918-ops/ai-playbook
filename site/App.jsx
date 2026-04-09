import { useState, useEffect, useRef } from "react";

const articles = [
  {
    id: "00",
    title: "我為什麼不讀 AI 書，直接用 AI 學 AI",
    hook: "大多數人想學 AI 的第一反應是買書、上課。但 AI 工具本身就是最好的老師。",
    tags: ["觀念"],
    content: `大多數人想學 AI 的第一反應是買書、上課。但 AI 工具本身就是最好的老師——而且它不會過期。

**原本：** 買了幾本 AI 相關的書，翻了兩章就放著。不是書不好，是書裡的截圖、操作介面、甚至功能名稱，三個月後就過時了。AI 工具的迭代速度比任何出版流程都快。

**現在：** 遇到新功能，直接問 Claude「這個功能適合什麼場景」，邊問邊試。遇到不懂的概念，讓 AI 用我能理解的方式解釋，而不是去翻一本寫給工程師看的書。

差別不在「努力程度」，在「學習路徑」。傳統路徑是：讀書 → 理解 → 應用。我現在的路徑是：帶著問題直接用 → 卡住了再查 → 查完馬上試。後者更快，而且你學到的每一樣東西都是馬上能用的。

我第一次想認真用 AI，是拿來做文學賞析。那時候 ChatGPT 3.5 才剛出來，我以為它是萬能的，隨便輸入幾個文學問題，結果發現它在亂答。那次經驗讓我學到第一課：AI 不是神諭，它是一個需要你引導的工具。你問得不好，它就答得不好。但反過來，如果你知道怎麼問、怎麼判斷它的回答，它就會變成一個非常強的搭檔。

**起手式 Prompt：**

\`\`\`
你是一位 AI 應用教練。我的背景是 [你的職業/領域]，
我想用 AI 解決 [具體問題]。

請用我能理解的方式：
1. 告訴我這件事用 AI 做的基本思路
2. 給我一個最簡單的起手式，讓我 5 分鐘內看到結果
3. 列出我可能會卡住的地方，以及怎麼繞過去
\`\`\`

**常見卡關：**「我連問什麼都不知道」——從抱怨開始。把你工作中最煩、最重複、最花時間的事，直接用白話貼給 AI。這就是一個完美的起手式。`,
    threads: `我用 AI 學 AI 的方法改了。

之前：買書自學，翻了兩章就過時了。
現在：帶著問題直接用，卡住再查，查完馬上試。

差別在一件事：學習是副產品，解決問題才是目標。

完整流程 + 可以直接複製的 prompt 放在 Patreon ↓`
  },
  {
    id: "01",
    title: "怎麼判斷一件事該不該交給 AI 做",
    hook: "不是「AI 能不能做」，而是「AI 做了之後，我還需要花多少力氣修」。",
    tags: ["觀念"],
    content: `很多人要嘛把所有事都丟給 AI（然後對品質失望），要嘛什麼都不敢交（覺得 AI 不可靠）。

**原本：** 什麼都想讓 AI 做。寫文章讓它寫、分析讓它做、連回覆讀者留言都想交出去。結果花在修改 AI 產出的時間，比自己寫還多。

**現在：** 用一個 2×2 矩陣，10 秒判斷。

**AI 任務分類矩陣：**

              你很懂這件事      你不太懂這件事
結構化任務     ✅ 最適合交       ⚠️ 先學再交
              給 AI            （否則無法驗收）

創意/判斷      🔄 AI 當助手     ❌ 先自己搞懂
型任務         你做最終決策      再考慮用 AI

✅ 左上角是 AI 的甜蜜點——翻譯、摘要、格式轉換。你懂這個領域，所以能一眼看出 AI 對不對。

❌ 右下角最危險——你不懂又讓 AI 替你做判斷，結果拿著漏洞百出的東西做決策。

**關鍵洞察：** 把「AI 寫得很快」誤認為「AI 做得很好」是最常見的陷阱。速度和品質是兩回事。驗收的能力，才是你在 AI 時代的真正門檻。`,
    threads: `我決定什麼事交給 AI 的方法改了。

之前：什麼都丟給它，然後花更多時間修。
現在：用一個 2×2 矩陣，10 秒判斷該不該交。

關鍵不是「AI 能不能做」，而是「做完我能不能驗收」。

完整矩陣 + 分類 prompt 放在 Patreon ↓`
  },
  {
    id: "02",
    title: "Prompt 不是「下指令」，是「給脈絡」",
    hook: "AI 不是搜尋引擎的升級版，它更像一個很聰明但什麼都不知道的新同事。",
    tags: ["方法"],
    content: `大多數人寫 prompt 像在命令機器。但 90% 的情況，你把脈絡講清楚就已經夠好了。

**脈絡三層法：**

**第一層：你是誰（角色脈絡）**
我是 [角色]，在 [公司/領域] 工作，主要負責 [職責]。

**第二層：你要什麼（任務脈絡）**
我需要 [具體產出]，用途是 [拿來做什麼]，讀者/受眾是 [誰會看到]。

**第三層：你的標準（品質脈絡）**
好的版本應該 [理想狀態]，要避免 [不想看到的]，參考風格像 [舉例]。

**差的 prompt：**「幫我寫一篇 Threads 貼文。」

**好的 prompt：**「我是一個經營 Patreon 的內容創作者，主要寫 AI 工具的實戰應用。我需要一篇 Threads 貼文，介紹我用 Claude 整理筆記的方法。好的版本應該用第一人稱、像在跟朋友聊天、控制在 300 字以內、結尾有清楚的 CTA。要避免列點式和空話。」

兩個 prompt 的差距不是格式，是脈絡。

**如果你不知道自己要什麼？** 用否定法。先讓 AI 出一版，然後跟它說「哪裡不對」。很多時候你說不清楚「要什麼」，但看到不要的東西會馬上知道。`,
    threads: `我寫 prompt 的方法改了。

之前：研究各種技巧和格式。
現在：只做一件事——把脈絡講清楚。

AI 不是搜尋引擎，是一個什麼都不知道的聰明新同事。你不是在下指令，是在交代背景。

「脈絡三層法」+ 完整範例放在 Patreon ↓`
  },
  {
    id: "03",
    title: "我的 AI 工具鏈：不同工具各司其職",
    hook: "AI 工具太多，很多人不是在「用工具」，是在「選工具」上浪費時間。",
    tags: ["工具"],
    content: `**原本：** 每出一個新 AI 工具就試。結果筆記散落五個地方，每個工具都用了一點點，沒有一個用到深處。

**現在：** 固定三個工具，各有明確分工。

**Claude → 深度思考的搭檔**
寫長文、投資分析、系統設計、處理模糊問題。中文能力和語感目前最好。而且 Claude 生態系內部也有分工：claude.ai 做對話式思考，Claude Code 做文件整理和系統建設，Cowork 做操作教練。

**Gemini → 即時資訊的觸角**
每日資訊流整理、Google 生態整合、即時查詢。Gemini 和 ChatGPT 都有任務排程和自動推送功能，設定好關注主題就會定時推摘要給你。

**Obsidian → 知識沉澱的終點**
本地儲存、Markdown 格式、雙向連結。萬一哪天雲端服務倒了，你的筆記還在。

同一個模型家族裡也有分工——Opus 做深度思考，Sonnet 做日常工作，Haiku 做批次瑣事。七成任務用 Sonnet 就夠，真正需要 Opus 的只有三成。

**判斷邏輯：** 不要問「哪個 AI 最好」，問「哪個 AI 最適合這件事」。`,
    threads: `我選 AI 工具的方法改了。

之前：每個都試，筆記散落五個地方。
現在：三個工具各司其職，新的不試。

Claude 做深度思考、Gemini 做資訊整理、Obsidian 做知識沉澱。工具之間的分工比工具本身更重要。

工具鏈完整拆解 + 選工具判斷 prompt 放在 Patreon ↓`
  },
  {
    id: "04",
    title: "用 AI 寫一篇不像 AI 寫的 Threads 貼文",
    hook: "秘密不在 prompt 技巧，在於你有沒有教 AI「你是誰」。",
    tags: ["實戰"],
    content: `用 AI 寫社群貼文，最大的問題不是「寫不出來」，而是「一看就知道是 AI 寫的」。

**原本：** 直接叫 AI 寫，出來像新聞稿。改了兩輪還是不對，最後自己重寫大半，花了 40 分鐘。

**現在：** 先讓 AI 分析我過去表現最好的貼文，建立一份「風格檔案」。之後每次帶著風格檔案寫。AI 第一版就八成像我，微調 15 分鐘完成。

**三步流程：**

1. **建立風格檔案（一次性，30 分鐘）** — 貼上你 10 篇最好的貼文，讓 AI 分析你的開頭習慣、句子節奏、語氣詞、結尾方式、整體人格感。

2. **用風格檔案生成** — 帶著風格指南 + 主題 + 核心觀點 + 目標，讓 AI 寫。要求它自評跟你風格的相似度。

3. **人工微調（不能省）** — 把 AI 產出**唸出來**。不順的就改。加入只有你知道的細節，刪掉你平常不會用的詞，確認結尾有可以被反駁的主張。

效果：以前寫一篇反覆改半小時以上，現在風格檔案建好後幾分鐘就能發。`,
    threads: `我用 AI 寫 Threads 的方法改了。

之前：直接叫它寫，出來像新聞稿。
現在：先讓它學我的風格，第一版就八成像。

秘密不在 prompt 技巧，在於你有沒有教 AI「你是誰」。

風格檔案建立流程 + prompt 放在 Patreon ↓`
  },
  {
    id: "05",
    title: "用 AI 做投資研究：從財報到決策的完整流程",
    hook: "AI 負責收集和整理資訊，你負責做判斷。兩件事分開做，清楚得多。",
    tags: ["實戰"],
    content: `投資研究需要大量閱讀和整理，但大多數散戶沒有時間——一打開財報就淹沒在數字裡。

**原本：** 花一整天讀財報、看分析師報告、刷投資討論區。讀完腦子一團漿糊，最後不敢做決定。

**現在：** 三步驟 prompt 流程——10 分鐘快速掃描、30 分鐘深入分析、20 分鐘整理成投資備忘錄。

以 RKLB（Rocket Lab）為例，一小時內就有了一份結構化的備忘錄，看多看空理由都列清楚，還附了決策觸發點。

**關鍵原則：永遠要求 AI 同時給你看多和看空的理由。** 如果你只問「這公司好不好」，AI 會傾向給正面答案。強制雙面論述，你才能看到完整圖景。

**最重要的部分是「決策觸發點」** — 在研究階段就設好條件：「如果下季營收成長超過 X%，我就加碼」。條件到了就執行，不再猶豫。

**注意：** AI 不是彭博終端。數字永遠要用官方財報交叉驗證。AI 的價值在快速整理和結構化資訊，不是給你準確的即時數據。`,
    threads: `我做投資研究的方法改了。

之前：花一整天讀財報，讀完還是不敢決定。
現在：三步驟 prompt 流程，1 小時出一份投資備忘錄。

關鍵：AI 負責整理資訊，你負責做判斷。兩件事分開做。

完整流程 + 三個 prompt 放在 Patreon ↓`
  },
  {
    id: "06",
    title: "用 AI 準備一場演講：從大綱到逐字稿",
    hook: "演講準備最花時間的不是「想內容」，是「排結構」——這恰好是 AI 最擅長的。",
    tags: ["實戰"],
    content: `**原本：** 打開空白簡報，邊想邊做。改五次才定稿，每次至少花兩天。

**現在：** 先花 10 分鐘跟 AI 對話釐清核心訊息，15 分鐘讓 AI 排結構，30 分鐘轉成口語化逐字稿。我只需要加個人故事和臨場感。

以前準備演講方式很亂——用好幾個 AI 工具拼湊，素材散落一地。現在有了整套 AI OS，讀書筆記、過去文章、校準過的觀點全部整理好，隨時可以調動。

**三步流程：**

1. **釐清核心訊息（10 分鐘）** — 場合、聽眾、時間、你最想傳達的一件事。讓 AI 定義核心訊息 + 建議開場方式。

2. **建立結構（15 分鐘）** — 限定時長、個人故事數量、結尾 call to action。每段之間加過渡句。

3. **口語化逐字稿（30 分鐘）** — 像跟朋友聊天、短句、每 2-3 分鐘有互動點。標記 [停頓]、[看觀眾]、[換投影片]。

**一定要大聲唸出來。** 眼睛看覺得通順的，嘴巴說可能很卡。唸不順就改。`,
    threads: `我準備演講的方法改了。

之前：打開空白簡報，改五次才定稿。
現在：先跟 AI 聊 10 分鐘，讓它排結構，我只負責加故事。

演講準備最花時間的不是「想內容」，而是「排結構」——這恰好是 AI 最擅長的事。

完整三步驟 + prompt 放在 Patreon ↓`
  },
  {
    id: "07",
    title: "用 AI 整理知識：Obsidian + Claude 的筆記工作流",
    hook: "AI 產出太多卻沒有沉澱——這是最大的知識浪費。",
    tags: ["系統"],
    content: `**原本：** 跟 AI 對話完就關掉，覺得「有需要再問就好」。結果同樣的問題問了三次，每次答案還不太一樣。

**現在：** 每次有價值的對話結束，花 2 分鐘萃取重點存進 Obsidian。每週花 15 分鐘建立連結。每月花 30 分鐘回顧。

**三個動作：**

1. **對話後萃取（每次 2 分鐘）** — 用固定 prompt 萃取標題、摘要、關鍵要點、可複製的 Prompt、標籤。複製到 Obsidian。

2. **每週整理連結（15 分鐘）** — 讓 AI 判斷新筆記之間的關聯、跟舊主題的歸類、本週學習趨勢。

3. **每月知識回顧（30 分鐘）** — 這個月學了什麼、有什麼沒注意到的跨域連結、知識缺口在哪。

真正的價值不在單則筆記，在「連結」。我自己在整理時，發現了大量跨域連結——多到還沒時間全部處理。你讀了幾百本書以為它們各自獨立，直到放進同一個系統才發現之間有共通結構。這些連結一直都在，只是過去沒有工具讓你看見。`,
    threads: `我整理筆記的方法改了。

之前：AI 對話完就關掉，下次遇到同樣問題再問一次。
現在：每次花 2 分鐘萃取重點到 Obsidian，知識庫自己會長大。

秘密不在筆記本身，在「連結」——當不同主題的知識串起來，你會看到一個人看不到的東西。

萃取 prompt + 每週整理流程放在 Patreon ↓`
  },
  {
    id: "08",
    title: "用 Gemini 自動化你的每日資訊流",
    hook: "資訊焦慮的根源不是資訊太多，是你沒有篩選機制。",
    tags: ["系統"],
    content: `**原本：** 每天花 1.5 小時刷新聞、看文章、追社群。真正有用的不到 10%。

**現在：** Gemini 每天幫我整理一份資訊摘要。30 分鐘搞定，真正讀到的東西反而更多。

為什麼用 Gemini？這個任務的核心是「快速處理大量即時資訊」，Gemini 在 Google 生態裡的整合讓它特別適合。

Gemini 和 ChatGPT 都有任務排程和自動推送功能——跟手機 app 通知一樣，你設定好關注的主題，它會定時把篩選過的新聞、摘要、通知推給你。不用每次手動貼資訊進去，它主動來找你。這是目前 Claude 做不到的事，也是我把「資訊篩選」這個角色分給 Gemini 的主要原因。

**每日早晨 prompt：** 貼上資訊來源 → 列出關注主題 → AI 篩出最多 5 則 → 標出「今天一定要讀」的 2 則。

**每週大掃除：** 把「有空再看」但沒看的清單交給 AI，刪掉過時的、排序剩下的、補漏重要趨勢。

**關鍵：** 加上「什麼算重要」的判斷標準。越具體越準。「跟我的投資持倉相關的」比「投資相關的」好十倍。`,
    threads: `每天吸收資訊的時間從 1.5 小時壓到 30 分鐘。

方法不是「少看」，是讓 AI 先篩。Gemini 和 ChatGPT 都有排程推送——設定好主題，它主動推摘要給你，跟手機通知一樣。

資訊焦慮的根源不是資訊太多，是你沒有篩選機制。

篩選 prompt + 每週大掃除流程放在 Patreon ↓`
  },
  {
    id: "09",
    title: "用 AI 寫 code：非工程師的 SvelteKit 實戰",
    hook: "我現在還是不會寫 code。但我會用 AI 寫 code，然後判斷結果對不對。這是兩件完全不同的事。",
    tags: ["實戰"],
    content: `**原本：** 想做個人知識管理系統。先學 HTML → CSS → JavaScript → 框架 → 資料庫。預計半年。學了一個月就放棄。

**現在：** 用 Claude 寫 SvelteKit。第一天就有可以跑的頁面。三個月後，BIU_AI_OS 已經是一個可用的系統。

我最早用 ChatGPT 寫 code，做出來很多垃圾。後來試 Gemini，也是做了很多無謂的東西。問題不在工具——是我不知道怎麼跟 AI 協作寫 code。轉折點是開始用 Claude Code，學會了「一步一步來、每步都驗收」的節奏。

**流程：**

1. **定義你要做什麼** — 告訴 AI 你想做的東西、功能需求，讓它判斷技術方案和 MVP 範圍。

2. **一步一步建** — 讓 AI 從最基礎開始帶，每一步等你確認再進下一步。有錯誤就貼完整訊息給它。

3. **維護心態** — 每完成一個功能就用 Git 備份。錯誤訊息是你最好的朋友——複製貼給 AI，不要自己猜。

**環境設定是最容易放棄的關卡。** 但只要照 AI 指令一步步來，通常半小時內搞定。撐過這關，後面順很多。`,
    threads: `我做網站的方法改了。

之前：想學 code，一個月就放棄了。
現在：用 Claude 寫 SvelteKit，第一天就有東西能跑。

我現在還是不會寫 code。但我會用 AI 寫 code，然後判斷結果對不對。這是兩件完全不同的事。

非工程師的完整實戰流程放在 Patreon ↓`
  },
  {
    id: "10",
    title: "打造你自己的 AI 工作系統",
    hook: "不是在「用 AI」，而是在一個有 AI 支撐的系統裡工作。",
    tags: ["系統"],
    content: `**原本：** 需要 AI 才打開，每次從零開始。寫文章開新對話，做研究開新對話，彼此之間沒有串聯。

**現在：** 有一套固定的日常流程。AI 知道我是誰（記憶系統），知道不同任務用不同模型（分流），知道輸出標準（校準規則）。

**三層架構：**

**輸入層** — 每日資訊流（Gemini 自動篩選）、工作任務（AI 分類優先級）、靈感記錄（語音 → AI 轉文字 → Obsidian）

**處理層** — 內容產出（風格檔案 + 模板）、研究分析（固定框架）、學習筆記（對話萃取）、程式開發（AI pair programming）

**輸出層** — Threads 貼文、Patreon 完整版、知識庫沉澱、專案交付

這個架構不是一天建好的。我花了半年，從一個流程開始慢慢擴展。

三層裡最花時間的是整理文件——但做完後效果立竿見影。我之前讀了七百多本書、寫了大量筆記，滿腦子都是素材，問題只是它們散落各處沒有結構。AI OS 做的事就是把這些整理好。整理完的那一刻，我突然覺得自己的知識庫活了起來。`,
    threads: `我用 AI 的方式改了。

之前：需要才打開，每次從零開始。
現在：AI 已經嵌入我每天的流程——資訊篩選、內容產出、知識整理全部有固定做法。

不是在「用 AI」，是在一個有 AI 支撐的系統裡工作。

三層架構完整拆解放在 Patreon ↓`
  },
  {
    id: "11",
    title: "AI 輸出品質不穩？建立你的 prompt 模板庫",
    hook: "把你最好的一次 prompt 固定下來，以後每次都至少 80 分起跳。",
    tags: ["方法"],
    content: `第 02 篇教你怎麼寫好的 prompt——把脈絡講清楚，AI 產出就會好。但有一個問題那篇沒解決：你上次寫了一個很好的 prompt，這次又要從頭想。同樣的任務，有時候產出很好，有時候很差——不是 AI 不穩定，是你每次給的品質不一致。模板庫解決這個問題：把你最好的一次 prompt 固定下來，以後每次都至少 80 分起跳。

**三步流程：**

1. **盤點高頻場景** — 列出你最常用 AI 做的事，按「頻率 × 品質波動度」排序，前 5 個優先做模板。

2. **把好的 prompt 轉成模板** — 把特定內容換成填空欄位，加使用說明，標出必填和選填，附填寫範例。

3. **持續迭代** — 每次用完不滿意就分析：問題出在模板還是你填的內容？改完存回去。

模板庫放 Obsidian 最適合——可以搜尋、分類、跟知識庫連結。

**關鍵：** 不要超過 20 個常用模板。模板不是牢籠，是地板——讓你的起點更高。剩下 20% 自由發揮。`,
    threads: `AI 輸出品質像抽獎？問題不在 AI，在你。

同一個任務，你每次給的 prompt 品質不一樣，結果當然不一樣。

解法：把你最好的一次 prompt 存成模板，以後每次都從那個水準開始。

模板建立流程 + 迭代 prompt 放在 Patreon ↓`
  },
  {
    id: "12",
    title: "什麼時候該換工具、什麼時候該優化流程",
    hook: "90% 的情況下結論是「優化現有 prompt」，不是換工具。",
    tags: ["觀念"],
    content: `每週都有新 AI 工具出來，FOMO 是真實的。但大多數時候，你的問題不是「工具不夠好」，而是「流程不夠好」。

**原本：** 看到新工具就想試。一年下來試了十幾個，真正留下的只有三個。

**現在：** 用一個決策流程判斷。90% 的結論是優化 prompt，不是換工具。

**決策樹：**
你不滿意 → 問題是輸出品質？→ 先優化 prompt（改 3 次還不行再說）
         → 問題是速度效率？→ 先檢查流程是不是太多步驟
         → 問題是功能缺失？→ 確認是「必須」還是「想要」
         → 新工具看起來很酷？→ 等一個月，如果還在想就再評估

老實說，我目前沒有認真考慮過換掉 Claude。不是沒試過其他工具——ChatGPT、Gemini 我都在用。但它們各有分工，不是互相取代。Claude 的位置是「深度思考搭檔」，而在這個位置上它目前最強：有問題可以問 claude.ai，要做事可以用 Claude Code，不懂操作可以用 Cowork 看它示範一次。一個生態系能覆蓋從思考到執行到學習的完整鏈路，我沒有理由換。

但這不代表永遠不會換。這個決策樹不是寫給現在的我的——是寫給未來某天「新工具真的很誘人」的時候用的。`,
    threads: `每週都有新 AI 工具出來，FOMO 怎麼辦？

我的方法：先問一個問題——「是工具的問題，還是流程的問題？」

答案 90% 是後者。穩定的流程 > 最新的工具。

決策樹 + 判斷 prompt 放在 Patreon ↓`
  },
  {
    id: "13",
    title: "從「會用 AI」到「用 AI 建立不可取代性」",
    hook: "當所有人都會用 AI，你的競爭力是：你的經驗 × 你的品味 × 你的系統。",
    tags: ["觀念"],
    content: `「會用 AI」很快會變成跟「會用 Word」一樣的基本技能。當所有人都會用 AI，你的競爭力在哪裡？

**不可取代性的三個支柱：**

**支柱一：獨特的輸入（你的經驗）** — AI 能處理所有公開資訊，但處理不了你獨有的經歷。你在課堂上踩過的坑、投資中犯的錯、凌晨三點想通的事——這些是 AI 生成不了的。把這些輸入餵給 AI，產出就是別人複製不了的。

**支柱二：獨特的判斷（你的品味）** — AI 可以生成 100 個選項，但挑出最好的那個需要品味。品味不是天生的，是累積的。

**支柱三：獨特的組合（你的系統）** — 同樣的工具，不同人組合出的系統不一樣。你的工作系統是根據你的工作方式、價值觀、判斷標準量身定做的，別人拿走也用不了。

AI 是工具，是搭檔，是一面很好的鏡子。但鏡子不會告訴你要往哪裡走。

在你急著學更多 AI 技巧之前，試一件事：打開一個空白文件，寫下你確定自己知道的十件事。不是 AI 告訴你的，不是書上讀的，而是你真的、經過驗證、有信心的十件事。

如果你寫得出來，那就是你的地圖的起點。
如果你寫不出來——那也許，在學更多 AI 之前，你先欠自己一段安靜的思考。`,
    threads: `學再多 AI 技巧也不會讓你不可取代。

當所有人都會用 AI，你的競爭力是三樣東西：你的經驗 × 你的品味 × 你的系統。

這三樣，別人拿走也用不了。

完整拆解放在 Patreon ↓`
  }
];

const tagColors = {
  "觀念": { bg: "rgba(99,102,241,0.12)", text: "#6366f1" },
  "方法": { bg: "rgba(16,185,129,0.12)", text: "#10b981" },
  "工具": { bg: "rgba(245,158,11,0.12)", text: "#f59e0b" },
  "實戰": { bg: "rgba(239,68,68,0.12)", text: "#ef4444" },
  "系統": { bg: "rgba(139,92,246,0.12)", text: "#8b5cf6" },
};

function MarkdownLite({ text }) {
  if (!text) return null;
  const lines = text.split("\n");
  const elements = [];
  let inCode = false;
  let codeBlock = [];

  lines.forEach((line, i) => {
    if (line.trim().startsWith("```")) {
      if (inCode) {
        elements.push(
          <pre key={`code-${i}`} style={{
            background: "var(--code-bg)",
            borderRadius: 8,
            padding: "16px 20px",
            fontSize: 13,
            lineHeight: 1.6,
            overflowX: "auto",
            margin: "16px 0",
            fontFamily: "'SF Mono', 'Fira Code', monospace",
            color: "var(--text-secondary)",
            border: "1px solid var(--border)"
          }}>
            {codeBlock.join("\n")}
          </pre>
        );
        codeBlock = [];
      }
      inCode = !inCode;
      return;
    }
    if (inCode) {
      codeBlock.push(line);
      return;
    }
    if (line.trim() === "") {
      elements.push(<div key={`br-${i}`} style={{ height: 12 }} />);
      return;
    }

    let processed = line;
    const parts = [];
    const regex = /\*\*(.+?)\*\*/g;
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(processed)) !== null) {
      if (match.index > lastIndex) {
        parts.push(processed.slice(lastIndex, match.index));
      }
      parts.push(<strong key={`b-${i}-${match.index}`} style={{ color: "var(--text-primary)", fontWeight: 650 }}>{match[1]}</strong>);
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < processed.length) {
      parts.push(processed.slice(lastIndex));
    }

    elements.push(
      <p key={`p-${i}`} style={{
        margin: "0 0 6px 0",
        lineHeight: 1.85,
        color: "var(--text-secondary)"
      }}>
        {parts.length > 0 ? parts : processed}
      </p>
    );
  });

  return <>{elements}</>;
}

export default function AIPlaybook() {
  const [activeId, setActiveId] = useState(null);
  const [showThreads, setShowThreads] = useState(null);
  const [copied, setCopied] = useState(false);
  const contentRef = useRef(null);

  const activeArticle = articles.find(a => a.id === activeId);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [activeId]);

  const copyThreads = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      "--bg": "#0a0a0b",
      "--bg-card": "#141416",
      "--bg-hover": "#1a1a1e",
      "--bg-active": "#1e1e24",
      "--text-primary": "#f0f0f2",
      "--text-secondary": "#a0a0a8",
      "--text-muted": "#606068",
      "--accent": "#c8a2ff",
      "--accent-dim": "rgba(200,162,255,0.1)",
      "--border": "#222228",
      "--code-bg": "#111114",
      fontFamily: "'Noto Sans TC', 'SF Pro Display', -apple-system, sans-serif",
      background: "var(--bg)",
      color: "var(--text-secondary)",
      minHeight: "100vh",
      fontSize: 15,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;600;700&family=Noto+Serif+TC:wght@400;600;700&display=swap" rel="stylesheet" />

      {!activeArticle ? (
        /* INDEX VIEW */
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "60px 24px 80px" }}>
          <header style={{ marginBottom: 64 }}>
            <div style={{
              fontSize: 12,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: 16,
              fontWeight: 500
            }}>
              Bookie
            </div>
            <h1 style={{
              fontFamily: "'Noto Serif TC', serif",
              fontSize: "clamp(32px, 6vw, 52px)",
              fontWeight: 700,
              color: "var(--text-primary)",
              lineHeight: 1.25,
              margin: "0 0 20px 0",
              letterSpacing: -1,
            }}>
              AI 實戰手冊
            </h1>
            <p style={{
              fontSize: 18,
              lineHeight: 1.7,
              color: "var(--text-secondary)",
              maxWidth: 580,
              margin: 0
            }}>
              14 篇從零開始的 AI 協作指南。不講理論，只講我實際在用的流程、工具和思維方式。每篇附可直接複製的 Prompt。
            </p>
            <div style={{
              display: "flex",
              gap: 12,
              marginTop: 28,
              flexWrap: "wrap"
            }}>
              {["觀念", "方法", "工具", "實戰", "系統"].map(tag => (
                <span key={tag} style={{
                  fontSize: 12,
                  padding: "5px 14px",
                  borderRadius: 20,
                  background: tagColors[tag].bg,
                  color: tagColors[tag].text,
                  fontWeight: 500
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {articles.map((article, idx) => (
              <button
                key={article.id}
                onClick={() => setActiveId(article.id)}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 20,
                  padding: "24px 20px",
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid var(--border)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background 0.15s",
                  borderRadius: 0,
                  width: "100%",
                  color: "inherit",
                  fontFamily: "inherit",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--bg-hover)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <span style={{
                  fontFamily: "'SF Mono', 'Fira Code', monospace",
                  fontSize: 13,
                  color: "var(--text-muted)",
                  minWidth: 28,
                  paddingTop: 3,
                  fontWeight: 500
                }}>
                  {article.id}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <h2 style={{
                      margin: 0,
                      fontSize: 17,
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      lineHeight: 1.4,
                    }}>
                      {article.title}
                    </h2>
                    {article.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: 11,
                        padding: "2px 10px",
                        borderRadius: 12,
                        background: tagColors[tag].bg,
                        color: tagColors[tag].text,
                        fontWeight: 500,
                        flexShrink: 0
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p style={{
                    margin: 0,
                    fontSize: 14,
                    color: "var(--text-muted)",
                    lineHeight: 1.6
                  }}>
                    {article.hook}
                  </p>
                </div>
                <span style={{
                  color: "var(--text-muted)",
                  fontSize: 18,
                  paddingTop: 2,
                  flexShrink: 0,
                }}>→</span>
              </button>
            ))}
          </div>

          <footer style={{
            marginTop: 64,
            paddingTop: 32,
            borderTop: "1px solid var(--border)",
            textAlign: "center"
          }}>
            <a
              href="https://patreon.com/Bookie918"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "14px 36px",
                background: "var(--accent)",
                color: "#0a0a0b",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 15,
                textDecoration: "none",
                transition: "opacity 0.15s"
              }}
            >
              在 Patreon 閱讀完整版（含所有 Prompt）
            </a>
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 16 }}>
              © 2026 Bookie
            </p>
          </footer>
        </div>
      ) : (
        /* ARTICLE VIEW */
        <div style={{ display: "flex", minHeight: "100vh" }}>
          {/* Sidebar */}
          <nav style={{
            width: 280,
            flexShrink: 0,
            borderRight: "1px solid var(--border)",
            padding: "20px 0",
            overflowY: "auto",
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}>
            <button
              onClick={() => setActiveId(null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 20px",
                background: "none",
                border: "none",
                color: "var(--accent)",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 500,
                fontFamily: "inherit",
                marginBottom: 12,
              }}
            >
              ← 回到目錄
            </button>
            <div style={{ flex: 1, overflowY: "auto" }}>
              {articles.map(a => (
                <button
                  key={a.id}
                  onClick={() => setActiveId(a.id)}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "10px 20px",
                    background: a.id === activeId ? "var(--accent-dim)" : "transparent",
                    border: "none",
                    borderLeft: a.id === activeId ? "2px solid var(--accent)" : "2px solid transparent",
                    cursor: "pointer",
                    textAlign: "left",
                    color: a.id === activeId ? "var(--text-primary)" : "var(--text-muted)",
                    fontSize: 13,
                    lineHeight: 1.5,
                    fontFamily: "inherit",
                    transition: "all 0.1s"
                  }}
                >
                  <span style={{ opacity: 0.5, marginRight: 8 }}>{a.id}</span>
                  {a.title}
                </button>
              ))}
            </div>
          </nav>

          {/* Content */}
          <main ref={contentRef} style={{
            flex: 1,
            overflowY: "auto",
            height: "100vh",
            padding: "48px 48px 80px",
          }}>
            <div style={{ maxWidth: 640 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{
                  fontFamily: "'SF Mono', monospace",
                  fontSize: 13,
                  color: "var(--text-muted)",
                }}>#{activeArticle.id}</span>
                {activeArticle.tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: 11,
                    padding: "2px 10px",
                    borderRadius: 12,
                    background: tagColors[tag].bg,
                    color: tagColors[tag].text,
                    fontWeight: 500
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              <h1 style={{
                fontFamily: "'Noto Serif TC', serif",
                fontSize: 32,
                fontWeight: 700,
                color: "var(--text-primary)",
                lineHeight: 1.35,
                margin: "0 0 32px 0",
              }}>
                {activeArticle.title}
              </h1>

              <div style={{ fontSize: 16, lineHeight: 1.85 }}>
                <MarkdownLite text={activeArticle.content} />
              </div>

              {/* Threads section */}
              <div style={{
                marginTop: 48,
                padding: 24,
                background: "var(--bg-card)",
                borderRadius: 12,
                border: "1px solid var(--border)"
              }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16
                }}>
                  <span style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--accent)",
                    letterSpacing: 1,
                    textTransform: "uppercase"
                  }}>
                    Threads 貼文
                  </span>
                  <button
                    onClick={() => copyThreads(activeArticle.threads)}
                    style={{
                      padding: "6px 16px",
                      background: copied ? "rgba(16,185,129,0.15)" : "var(--bg-hover)",
                      border: "1px solid var(--border)",
                      borderRadius: 6,
                      color: copied ? "#10b981" : "var(--text-secondary)",
                      cursor: "pointer",
                      fontSize: 12,
                      fontWeight: 500,
                      fontFamily: "inherit",
                      transition: "all 0.15s"
                    }}
                  >
                    {copied ? "已複製 ✓" : "複製"}
                  </button>
                </div>
                <p style={{
                  margin: 0,
                  fontSize: 14,
                  lineHeight: 1.8,
                  color: "var(--text-secondary)",
                  whiteSpace: "pre-line"
                }}>
                  {activeArticle.threads}
                </p>
              </div>

              {/* Patreon CTA */}
              <div style={{
                marginTop: 32,
                textAlign: "center",
                padding: "32px 24px",
                borderRadius: 12,
                background: "var(--accent-dim)",
                border: "1px solid rgba(200,162,255,0.15)"
              }}>
                <p style={{ margin: "0 0 16px", color: "var(--text-primary)", fontWeight: 500 }}>
                  完整版含所有可複製的 Prompt 模板
                </p>
                <a
                  href="https://patreon.com/Bookie918"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    padding: "12px 32px",
                    background: "var(--accent)",
                    color: "#0a0a0b",
                    borderRadius: 8,
                    fontWeight: 600,
                    fontSize: 14,
                    textDecoration: "none",
                  }}
                >
                  在 Patreon 閱讀完整版
                </a>
              </div>

              {/* Nav buttons */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 48,
                paddingTop: 24,
                borderTop: "1px solid var(--border)"
              }}>
                {parseInt(activeArticle.id) > 0 ? (
                  <button
                    onClick={() => setActiveId(String(parseInt(activeArticle.id) - 1).padStart(2, "0"))}
                    style={{
                      padding: "10px 20px",
                      background: "var(--bg-card)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      color: "var(--text-secondary)",
                      cursor: "pointer",
                      fontSize: 13,
                      fontFamily: "inherit"
                    }}
                  >
                    ← 上一篇
                  </button>
                ) : <div />}
                {parseInt(activeArticle.id) < 13 ? (
                  <button
                    onClick={() => setActiveId(String(parseInt(activeArticle.id) + 1).padStart(2, "0"))}
                    style={{
                      padding: "10px 20px",
                      background: "var(--bg-card)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      color: "var(--text-secondary)",
                      cursor: "pointer",
                      fontSize: 13,
                      fontFamily: "inherit"
                    }}
                  >
                    下一篇 →
                  </button>
                ) : <div />}
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
