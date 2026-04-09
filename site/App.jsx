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
    threads: `我用 AI 學 AI 的方法改了。\n\n之前：買書自學，翻了兩章就過時了。\n現在：帶著問題直接用，卡住再查，查完馬上試。\n\n差別在一件事：學習是副產品，解決問題才是目標。\n\n完整流程 + 可以直接複製的 prompt 放在 Patreon ↓`
  },
  { id: "01", title: "怎麼判斷一件事該不該交給 AI 做", hook: "不是「AI 能不能做」，而是「AI 做了之後，我還需要花多少力氣修」。", tags: ["觀念"], content: `很多人要嘛把所有事都丟給 AI（然後對品質失望），要嘛什麼都不敢交（覺得 AI 不可靠）。\n\n**原本：** 什麼都想讓 AI 做。寫文章讓它寫、分析讓它做、連回覆讀者留言都想交出去。結果花在修改 AI 產出的時間，比自己寫還多。\n\n**現在：** 用一個 2×2 矩陣，10 秒判斷。\n\n**AI 任務分類矩陣：**\n\n              你很懂這件事      你不太懂這件事\n結構化任務     ✅ 最適合交       ⚠️ 先學再交\n              給 AI            （否則無法驗收）\n\n創意/判斷      🔄 AI 當助手     ❌ 先自己搞懂\n型任務         你做最終決策      再考慮用 AI\n\n✅ 左上角是 AI 的甜蜜點——翻譯、摘要、格式轉換。你懂這個領域，所以能一眼看出 AI 對不對。\n\n❌ 右下角最危險——你不懂又讓 AI 替你做判斷，結果拿著漏洞百出的東西做決策。\n\n**關鍵洞察：** 把「AI 寫得很快」誤認為「AI 做得很好」是最常見的陷阱。速度和品質是兩回事。驗收的能力，才是你在 AI 時代的真正門檻。`, threads: `我決定什麼事交給 AI 的方法改了。\n\n之前：什麼都丟給它，然後花更多時間修。\n現在：用一個 2×2 矩陣，10 秒判斷該不該交。\n\n關鍵不是「AI 能不能做」，而是「做完我能不能驗收」。\n\n完整矩陣 + 分類 prompt 放在 Patreon ↓` },
  { id: "02", title: "Prompt 不是「下指令」，是「給脈絡」", hook: "AI 不是搜尋引擎的升級版，它更像一個很聰明但什麼都不知道的新同事。", tags: ["方法"], content: `大多數人寫 prompt 像在命令機器。但 90% 的情況，你把脈絡講清楚就已經夠好了。\n\n**脈絡三層法：**\n\n**第一層：你是誰（角色脈絡）**\n我是 [角色]，在 [公司/領域] 工作，主要負責 [職責]。\n\n**第二層：你要什麼（任務脈絡）**\n我需要 [具體產出]，用途是 [拿來做什麼]，讀者/受眾是 [誰會看到]。\n\n**第三層：你的標準（品質脈絡）**\n好的版本應該 [理想狀態]，要避免 [不想看到的]，參考風格像 [舉例]。\n\n**差的 prompt：**「幫我寫一篇 Threads 貼文。」\n\n**好的 prompt：**「我是一個經營 Patreon 的內容創作者，主要寫 AI 工具的實戰應用。我需要一篇 Threads 貼文，介紹我用 Claude 整理筆記的方法。好的版本應該用第一人稱、像在跟朋友聊天、控制在 300 字以內、結尾有清楚的 CTA。要避免列點式和空話。」\n\n兩個 prompt 的差距不是格式，是脈絡。\n\n**如果你不知道自己要什麼？** 用否定法。先讓 AI 出一版，然後跟它說「哪裡不對」。很多時候你說不清楚「要什麼」，但看到不要的東西會馬上知道。`, threads: `我寫 prompt 的方法改了。\n\n之前：研究各種技巧和格式。\n現在：只做一件事——把脈絡講清楚。\n\nAI 不是搜尋引擎，是一個什麼都不知道的聰明新同事。你不是在下指令，是在交代背景。\n\n「脈絡三層法」+ 完整範例放在 Patreon ↓` },
  { id: "03", title: "我的 AI 工具鏈：不同工具各司其職", hook: "AI 工具太多，很多人不是在「用工具」，是在「選工具」上浪費時間。", tags: ["工具"], content: `**原本：** 每出一個新 AI 工具就試。結果筆記散落五個地方，每個工具都用了一點點，沒有一個用到深處。\n\n**現在：** 固定三個工具，各有明確分工。\n\n**Claude → 深度思考的搭檔**\n寫長文、投資分析、系統設計、處理模糊問題。中文能力和語感目前最好。而且 Claude 生態系內部也有分工：claude.ai 做對話式思考，Claude Code 做文件整理和系統建設，Cowork 做操作教練。\n\n**Gemini → 即時資訊的觸角**\n每日資訊流整理、Google 生態整合、即時查詢。Gemini 和 ChatGPT 都有任務排程和自動推送功能，設定好關注主題就會定時推摘要給你。\n\n**Obsidian → 知識沉澱的終點**\n本地儲存、Markdown 格式、雙向連結。萬一哪天雲端服務倒了，你的筆記還在。\n\n同一個模型家族裡也有分工——Opus 做深度思考，Sonnet 做日常工作，Haiku 做批次瑣事。七成任務用 Sonnet 就夠，真正需要 Opus 的只有三成。\n\n**判斷邏輯：** 不要問「哪個 AI 最好」，問「哪個 AI 最適合這件事」。`, threads: `我選 AI 工具的方法改了。\n\n之前：每個都試，筆記散落五個地方。\n現在：三個工具各司其職，新的不試。\n\nClaude 做深度思考、Gemini 做資訊整理、Obsidian 做知識沉澱。工具之間的分工比工具本身更重要。\n\n工具鏈完整拆解 + 選工具判斷 prompt 放在 Patreon ↓` },
  { id: "04", title: "用 AI 寫一篇不像 AI 寫的 Threads 貼文", hook: "秘密不在 prompt 技巧，在於你有沒有教 AI「你是誰」。", tags: ["實戰"], content: `用 AI 寫社群貼文，最大的問題不是「寫不出來」，而是「一看就知道是 AI 寫的」。\n\n**原本：** 直接叫 AI 寫，出來像新聞稿。改了兩輪還是不對，最後自己重寫大半，花了 40 分鐘。\n\n**現在：** 先讓 AI 分析我過去表現最好的貼文，建立一份「風格檔案」。之後每次帶著風格檔案寫。AI 第一版就八成像我，微調 15 分鐘完成。\n\n**三步流程：**\n\n1. **建立風格檔案（一次性，30 分鐘）** — 貼上你 10 篇最好的貼文，讓 AI 分析你的開頭習慣、句子節奏、語氣詞、結尾方式、整體人格感。\n\n2. **用風格檔案生成** — 帶著風格指南 + 主題 + 核心觀點 + 目標，讓 AI 寫。要求它自評跟你風格的相似度。\n\n3. **人工微調（不能省）** — 把 AI 產出**唸出來**。不順的就改。加入只有你知道的細節，刪掉你平常不會用的詞，確認結尾有可以被反駁的主張。\n\n效果：以前寫一篇反覆改半小時以上，現在風格檔案建好後幾分鐘就能發。`, threads: `我用 AI 寫 Threads 的方法改了。\n\n之前：直接叫它寫，出來像新聞稿。\n現在：先讓它學我的風格，第一版就八成像。\n\n秘密不在 prompt 技巧，在於你有沒有教 AI「你是誰」。\n\n風格檔案建立流程 + prompt 放在 Patreon ↓` },
  { id: "05", title: "用 AI 做投資研究：從財報到決策的完整流程", hook: "AI 負責收集和整理資訊，你負責做判斷。兩件事分開做，清楚得多。", tags: ["實戰"], content: `投資研究需要大量閱讀和整理，但大多數散戶沒有時間——一打開財報就淹沒在數字裡。\n\n**原本：** 花一整天讀財報、看分析師報告、刷投資討論區。讀完腦子一團漿糊，最後不敢做決定。\n\n**現在：** 三步驟 prompt 流程——10 分鐘快速掃描、30 分鐘深入分析、20 分鐘整理成投資備忘錄。\n\n以 RKLB（Rocket Lab）為例，一小時內就有了一份結構化的備忘錄，看多看空理由都列清楚，還附了決策觸發點。\n\n**關鍵原則：永遠要求 AI 同時給你看多和看空的理由。** 如果你只問「這公司好不好」，AI 會傾向給正面答案。強制雙面論述，你才能看到完整圖景。\n\n**最重要的部分是「決策觸發點」** — 在研究階段就設好條件：「如果下季營收成長超過 X%，我就加碼」。條件到了就執行，不再猶豫。\n\n**注意：** AI 不是彭博終端。數字永遠要用官方財報交叉驗證。AI 的價值在快速整理和結構化資訊，不是給你準確的即時數據。`, threads: `我做投資研究的方法改了。\n\n之前：花一整天讀財報，讀完還是不敢決定。\n現在：三步驟 prompt 流程，1 小時出一份投資備忘錄。\n\n關鍵：AI 負責整理資訊，你負責做判斷。兩件事分開做。\n\n完整流程 + 三個 prompt 放在 Patreon ↓` },
  { id: "06", title: "用 AI 準備一場演講：從大綱到逐字稿", hook: "演講準備最花時間的不是「想內容」，是「排結構」——這恰好是 AI 最擅長的。", tags: ["實戰"], content: `**原本：** 打開空白簡報，邊想邊做。改五次才定稿，每次至少花兩天。\n\n**現在：** 先花 10 分鐘跟 AI 對話釐清核心訊息，15 分鐘讓 AI 排結構，30 分鐘轉成口語化逐字稿。我只需要加個人故事和臨場感。\n\n以前準備演講方式很亂——用好幾個 AI 工具拼湊，素材散落一地。現在有了整套 AI OS，讀書筆記、過去文章、校準過的觀點全部整理好，隨時可以調動。\n\n**三步流程：**\n\n1. **釐清核心訊息（10 分鐘）** — 場合、聽眾、時間、你最想傳達的一件事。讓 AI 定義核心訊息 + 建議開場方式。\n\n2. **建立結構（15 分鐘）** — 限定時長、個人故事數量、結尾 call to action。每段之間加過渡句。\n\n3. **口語化逐字稿（30 分鐘）** — 像跟朋友聊天、短句、每 2-3 分鐘有互動點。標記 [停頓]、[看觀眾]、[換投影片]。\n\n**一定要大聲唸出來。** 眼睛看覺得通順的，嘴巴說可能很卡。唸不順就改。`, threads: `我準備演講的方法改了。\n\n之前：打開空白簡報，改五次才定稿。\n現在：先跟 AI 聊 10 分鐘，讓它排結構，我只負責加故事。\n\n演講準備最花時間的不是「想內容」，而是「排結構」——這恰好是 AI 最擅長的事。\n\n完整三步驟 + prompt 放在 Patreon ↓` },
  { id: "07", title: "用 AI 整理知識：Obsidian + Claude 的筆記工作流", hook: "AI 產出太多卻沒有沉澱——這是最大的知識浪費。", tags: ["系統"], content: `**原本：** 跟 AI 對話完就關掉，覺得「有需要再問就好」。結果同樣的問題問了三次，每次答案還不太一樣。\n\n**現在：** 每次有價值的對話結束，花 2 分鐘萃取重點存進 Obsidian。每週花 15 分鐘建立連結。每月花 30 分鐘回顧。\n\n**三個動作：**\n\n1. **對話後萃取（每次 2 分鐘）** — 用固定 prompt 萃取標題、摘要、關鍵要點、可複製的 Prompt、標籤。複製到 Obsidian。\n\n2. **每週整理連結（15 分鐘）** — 讓 AI 判斷新筆記之間的關聯、跟舊主題的歸類、本週學習趨勢。\n\n3. **每月知識回顧（30 分鐘）** — 這個月學了什麼、有什麼沒注意到的跨域連結、知識缺口在哪。\n\n真正的價值不在單則筆記，在「連結」。我自己在整理時，發現了大量跨域連結——多到還沒時間全部處理。你讀了幾百本書以為它們各自獨立，直到放進同一個系統才發現之間有共通結構。這些連結一直都在，只是過去沒有工具讓你看見。`, threads: `我整理筆記的方法改了。\n\n之前：AI 對話完就關掉，下次遇到同樣問題再問一次。\n現在：每次花 2 分鐘萃取重點到 Obsidian，知識庫自己會長大。\n\n秘密不在筆記本身，在「連結」——當不同主題的知識串起來，你會看到一個人看不到的東西。\n\n萃取 prompt + 每週整理流程放在 Patreon ↓` },
  { id: "08", title: "用 Gemini 自動化你的每日資訊流", hook: "資訊焦慮的根源不是資訊太多，是你沒有篩選機制。", tags: ["系統"], content: `**原本：** 每天花 1.5 小時刷新聞、看文章、追社群。真正有用的不到 10%。\n\n**現在：** Gemini 每天幫我整理一份資訊摘要。30 分鐘搞定，真正讀到的東西反而更多。\n\n為什麼用 Gemini？這個任務的核心是「快速處理大量即時資訊」，Gemini 在 Google 生態裡的整合讓它特別適合。\n\nGemini 和 ChatGPT 都有任務排程和自動推送功能——跟手機 app 通知一樣，你設定好關注的主題，它會定時把篩選過的新聞、摘要、通知推給你。不用每次手動貼資訊進去，它主動來找你。這是目前 Claude 做不到的事，也是我把「資訊篩選」這個角色分給 Gemini 的主要原因。\n\n**每日早晨 prompt：** 貼上資訊來源 → 列出關注主題 → AI 篩出最多 5 則 → 標出「今天一定要讀」的 2 則。\n\n**每週大掃除：** 把「有空再看」但沒看的清單交給 AI，刪掉過時的、排序剩下的、補漏重要趨勢。\n\n**關鍵：** 加上「什麼算重要」的判斷標準。越具體越準。「跟我的投資持倉相關的」比「投資相關的」好十倍。`, threads: `每天吸收資訊的時間從 1.5 小時壓到 30 分鐘。\n\n方法不是「少看」，是讓 AI 先篩。Gemini 和 ChatGPT 都有排程推送——設定好主題，它主動推摘要給你，跟手機通知一樣。\n\n資訊焦慮的根源不是資訊太多，是你沒有篩選機制。\n\n篩選 prompt + 每週大掃除流程放在 Patreon ↓` },
  { id: "09", title: "用 AI 寫 code：非工程師的 SvelteKit 實戰", hook: "我現在還是不會寫 code。但我會用 AI 寫 code，然後判斷結果對不對。", tags: ["實戰"], content: `**原本：** 想做個人知識管理系統。先學 HTML → CSS → JavaScript → 框架 → 資料庫。預計半年。學了一個月就放棄。\n\n**現在：** 用 Claude 寫 SvelteKit。第一天就有可以跑的頁面。三個月後，BIU_AI_OS 已經是一個可用的系統。\n\n我最早用 ChatGPT 寫 code，做出來很多垃圾。後來試 Gemini，也是做了很多無謂的東西。問題不在工具——是我不知道怎麼跟 AI 協作寫 code。轉折點是開始用 Claude Code，學會了「一步一步來、每步都驗收」的節奏。\n\n**流程：**\n\n1. **定義你要做什麼** — 告訴 AI 你想做的東西、功能需求，讓它判斷技術方案和 MVP 範圍。\n\n2. **一步一步建** — 讓 AI 從最基礎開始帶，每一步等你確認再進下一步。有錯誤就貼完整訊息給它。\n\n3. **維護心態** — 每完成一個功能就用 Git 備份。錯誤訊息是你最好的朋友——複製貼給 AI，不要自己猜。\n\n**環境設定是最容易放棄的關卡。** 但只要照 AI 指令一步步來，通常半小時內搞定。撐過這關，後面順很多。`, threads: `我做網站的方法改了。\n\n之前：想學 code，一個月就放棄了。\n現在：用 Claude 寫 SvelteKit，第一天就有東西能跑。\n\n我現在還是不會寫 code。但我會用 AI 寫 code，然後判斷結果對不對。這是兩件完全不同的事。\n\n非工程師的完整實戰流程放在 Patreon ↓` },
  { id: "10", title: "打造你自己的 AI 工作系統", hook: "不是在「用 AI」，而是在一個有 AI 支撐的系統裡工作。", tags: ["系統"], content: `**原本：** 需要 AI 才打開，每次從零開始。寫文章開新對話，做研究開新對話，彼此之間沒有串聯。\n\n**現在：** 有一套固定的日常流程。AI 知道我是誰（記憶系統），知道不同任務用不同模型（分流），知道輸出標準（校準規則）。\n\n**三層架構：**\n\n**輸入層** — 每日資訊流（Gemini 自動篩選）、工作任務（AI 分類優先級）、靈感記錄（語音 → AI 轉文字 → Obsidian）\n\n**處理層** — 內容產出（風格檔案 + 模板）、研究分析（固定框架）、學習筆記（對話萃取）、程式開發（AI pair programming）\n\n**輸出層** — Threads 貼文、Patreon 完整版、知識庫沉澱、專案交付\n\n這個架構不是一天建好的。我花了半年，從一個流程開始慢慢擴展。\n\n三層裡最花時間的是整理文件——但做完後效果立竿見影。我之前讀了七百多本書、寫了大量筆記，滿腦子都是素材，問題只是它們散落各處沒有結構。AI OS 做的事就是把這些整理好。整理完的那一刻，我突然覺得自己的知識庫活了起來。`, threads: `我用 AI 的方式改了。\n\n之前：需要才打開，每次從零開始。\n現在：AI 已經嵌入我每天的流程——資訊篩選、內容產出、知識整理全部有固定做法。\n\n不是在「用 AI」，是在一個有 AI 支撐的系統裡工作。\n\n三層架構完整拆解放在 Patreon ↓` },
  { id: "11", title: "AI 輸出品質不穩？建立你的 prompt 模板庫", hook: "把你最好的一次 prompt 固定下來，以後每次都至少 80 分起跳。", tags: ["方法"], content: `第 02 篇教你怎麼寫好的 prompt——把脈絡講清楚，AI 產出就會好。但有一個問題那篇沒解決：你上次寫了一個很好的 prompt，這次又要從頭想。同樣的任務，有時候產出很好，有時候很差——不是 AI 不穩定，是你每次給的品質不一致。模板庫解決這個問題：把你最好的一次 prompt 固定下來，以後每次都至少 80 分起跳。\n\n**三步流程：**\n\n1. **盤點高頻場景** — 列出你最常用 AI 做的事，按「頻率 × 品質波動度」排序，前 5 個優先做模板。\n\n2. **把好的 prompt 轉成模板** — 把特定內容換成填空欄位，加使用說明，標出必填和選填，附填寫範例。\n\n3. **持續迭代** — 每次用完不滿意就分析：問題出在模板還是你填的內容？改完存回去。\n\n模板庫放 Obsidian 最適合——可以搜尋、分類、跟知識庫連結。\n\n**關鍵：** 不要超過 20 個常用模板。模板不是牢籠，是地板——讓你的起點更高。剩下 20% 自由發揮。`, threads: `AI 輸出品質像抽獎？問題不在 AI，在你。\n\n同一個任務，你每次給的 prompt 品質不一樣，結果當然不一樣。\n\n解法：把你最好的一次 prompt 存成模板，以後每次都從那個水準開始。\n\n模板建立流程 + 迭代 prompt 放在 Patreon ↓` },
  { id: "12", title: "什麼時候該換工具、什麼時候該優化流程", hook: "90% 的情況下結論是「優化現有 prompt」，不是換工具。", tags: ["觀念"], content: `每週都有新 AI 工具出來，FOMO 是真實的。但大多數時候，你的問題不是「工具不夠好」，而是「流程不夠好」。\n\n**原本：** 看到新工具就想試。一年下來試了十幾個，真正留下的只有三個。\n\n**現在：** 用一個決策流程判斷。90% 的結論是優化 prompt，不是換工具。\n\n**決策樹：**\n你不滿意 → 問題是輸出品質？→ 先優化 prompt（改 3 次還不行再說）\n         → 問題是速度效率？→ 先檢查流程是不是太多步驟\n         → 問題是功能缺失？→ 確認是「必須」還是「想要」\n         → 新工具看起來很酷？→ 等一個月，如果還在想就再評估\n\n老實說，我目前沒有認真考慮過換掉 Claude。不是沒試過其他工具——ChatGPT、Gemini 我都在用。但它們各有分工，不是互相取代。Claude 的位置是「深度思考搭檔」，而在這個位置上它目前最強：有問題可以問 claude.ai，要做事可以用 Claude Code，不懂操作可以用 Cowork 看它示範一次。一個生態系能覆蓋從思考到執行到學習的完整鏈路，我沒有理由換。\n\n但這不代表永遠不會換。這個決策樹不是寫給現在的我的——是寫給未來某天「新工具真的很誘人」的時候用的。`, threads: `每週都有新 AI 工具出來，FOMO 怎麼辦？\n\n我的方法：先問一個問題——「是工具的問題，還是流程的問題？」\n\n答案 90% 是後者。穩定的流程 > 最新的工具。\n\n決策樹 + 判斷 prompt 放在 Patreon ↓` },
  { id: "13", title: "從「會用 AI」到「用 AI 建立不可取代性」", hook: "當所有人都會用 AI，你的競爭力是：你的經驗 × 你的品味 × 你的系統。", tags: ["觀念"], content: `「會用 AI」很快會變成跟「會用 Word」一樣的基本技能。當所有人都會用 AI，你的競爭力在哪裡？\n\n**不可取代性的三個支柱：**\n\n**支柱一：獨特的輸入（你的經驗）** — AI 能處理所有公開資訊，但處理不了你獨有的經歷。你在課堂上踩過的坑、投資中犯的錯、凌晨三點想通的事——這些是 AI 生成不了的。把這些輸入餵給 AI，產出就是別人複製不了的。\n\n**支柱二：獨特的判斷（你的品味）** — AI 可以生成 100 個選項，但挑出最好的那個需要品味。品味不是天生的，是累積的。\n\n**支柱三：獨特的組合（你的系統）** — 同樣的工具，不同人組合出的系統不一樣。你的工作系統是根據你的工作方式、價值觀、判斷標準量身定做的，別人拿走也用不了。\n\nAI 是工具，是搭檔，是一面很好的鏡子。但鏡子不會告訴你要往哪裡走。\n\n在你急著學更多 AI 技巧之前，試一件事：打開一個空白文件，寫下你確定自己知道的十件事。不是 AI 告訴你的，不是書上讀的，而是你真的、經過驗證、有信心的十件事。\n\n如果你寫得出來，那就是你的地圖的起點。\n如果你寫不出來——那也許，在學更多 AI 之前，你先欠自己一段安靜的思考。`, threads: `學再多 AI 技巧也不會讓你不可取代。\n\n當所有人都會用 AI，你的競爭力是三樣東西：你的經驗 × 你的品味 × 你的系統。\n\n這三樣，別人拿走也用不了。\n\n完整拆解放在 Patreon ↓` }
];

const tagStyle = { "觀念": "#6366f1", "方法": "#10b981", "工具": "#f59e0b", "實戰": "#ef4444", "系統": "#8b5cf6" };

function Prose({ text }) {
  if (!text) return null;
  const lines = text.split("\n");
  const out = [];
  let inCode = false, code = [];
  lines.forEach((ln, i) => {
    if (ln.trim().startsWith("```")) {
      if (inCode) { out.push(<pre key={`c${i}`} style={{ background: "#f5f5f7", borderRadius: 12, padding: "20px 24px", fontSize: 13.5, lineHeight: 1.7, overflowX: "auto", margin: "20px 0", fontFamily: "'SF Mono','Fira Code','Menlo',monospace", color: "#1d1d1f" }}>{code.join("\n")}</pre>); code = []; }
      inCode = !inCode; return;
    }
    if (inCode) { code.push(ln); return; }
    if (!ln.trim()) { out.push(<div key={`s${i}`} style={{ height: 16 }} />); return; }
    const parts = []; const rx = /\*\*(.+?)\*\*/g; let last = 0, m;
    while ((m = rx.exec(ln)) !== null) { if (m.index > last) parts.push(ln.slice(last, m.index)); parts.push(<strong key={`b${i}${m.index}`} style={{ fontWeight: 600, color: "#1d1d1f" }}>{m[1]}</strong>); last = rx.lastIndex; }
    if (last < ln.length) parts.push(ln.slice(last));
    out.push(<p key={`p${i}`} style={{ margin: "0 0 8px", lineHeight: 1.9, color: "#424245" }}>{parts.length ? parts : ln}</p>);
  });
  return <>{out}</>;
}

export default function App() {
  const [activeId, setActiveId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);
  const active = articles.find(a => a.id === activeId);

  useEffect(() => { const c = () => setIsMobile(window.innerWidth < 768); c(); window.addEventListener("resize", c); return () => window.removeEventListener("resize", c); }, []);
  useEffect(() => { ref.current?.scrollTo(0, 0); window.scrollTo(0, 0); setMenuOpen(false); }, [activeId]);

  const copy = t => { navigator.clipboard.writeText(t); setCopied(true); setTimeout(() => setCopied(false), 1800); };
  const font = "'SF Pro Display','SF Pro Text',-apple-system,'Noto Sans TC','Helvetica Neue',sans-serif";

  if (!active) return (
    <div style={{ fontFamily: font, background: "#fff", color: "#1d1d1f", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <div style={{ maxWidth: 680, margin: "0 auto", padding: isMobile ? "60px 24px 40px" : "100px 24px 60px" }}>
        <p style={{ fontSize: 15, fontWeight: 500, color: "#86868b", marginBottom: 12, letterSpacing: 0.5 }}>Bookie</p>
        <h1 style={{ fontSize: isMobile ? 36 : 56, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1.5, margin: "0 0 24px", background: "linear-gradient(135deg,#1d1d1f 0%,#424245 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI 實戰手冊</h1>
        <p style={{ fontSize: isMobile ? 17 : 20, lineHeight: 1.6, color: "#86868b", maxWidth: 520, fontWeight: 400 }}>14 篇從零開始的 AI 協作指南。<br />不講理論，只講我實際在用的方法。</p>
      </div>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 24px" }}><div style={{ height: 1, background: "#d2d2d7" }} /></div>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 24px" }}>
        {articles.map(a => (
          <div key={a.id} onClick={() => setActiveId(a.id)} style={{ padding: isMobile ? "28px 0" : "36px 0", borderBottom: "1px solid #e8e8ed", cursor: "pointer", transition: "opacity 0.15s" }} onMouseEnter={e => { if (!isMobile) e.currentTarget.style.opacity = "0.7"; }} onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#86868b", fontFamily: "'SF Mono',monospace", minWidth: 24 }}>{a.id}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: tagStyle[a.tags[0]], textTransform: "uppercase", letterSpacing: 1 }}>{a.tags[0]}</span>
            </div>
            <h2 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 600, margin: "0 0 8px", lineHeight: 1.3, letterSpacing: -0.3 }}>{a.title}</h2>
            <p style={{ fontSize: 15, color: "#86868b", margin: 0, lineHeight: 1.5 }}>{a.hook}</p>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "60px 24px 80px", textAlign: "center" }}>
        <a href="https://patreon.com/Bookie918" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "16px 40px", background: "#1d1d1f", color: "#fff", borderRadius: 980, fontSize: 17, fontWeight: 500, textDecoration: "none", fontFamily: font, letterSpacing: -0.2 }}>在 Patreon 閱讀完整版</a>
        <p style={{ fontSize: 12, color: "#86868b", marginTop: 20 }}>© 2026 Bookie</p>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: font, background: "#fff", color: "#1d1d1f", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <div style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.8)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid #e8e8ed" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button onClick={() => setActiveId(null)} style={{ background: "none", border: "none", color: "#0066cc", cursor: "pointer", fontSize: 15, fontWeight: 400, fontFamily: font, padding: 0 }}>← 目錄</button>
          <span style={{ fontSize: 13, color: "#86868b", fontWeight: 500 }}>{parseInt(active.id) + 1} / {articles.length}</span>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", color: "#1d1d1f", cursor: "pointer", fontSize: 13, fontWeight: 500, fontFamily: font, padding: "4px 12px", borderRadius: 6, ...(menuOpen ? { background: "#f5f5f7" } : {}) }}>{menuOpen ? "關閉" : "全部文章"}</button>
        </div>
      </div>
      {menuOpen && (
        <div style={{ position: "fixed", top: 49, left: 0, right: 0, bottom: 0, zIndex: 40, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", overflowY: "auto" }}>
          <div style={{ maxWidth: 680, margin: "0 auto", padding: "8px 24px 40px" }}>
            {articles.map(a => (
              <div key={a.id} onClick={() => setActiveId(a.id)} style={{ padding: "14px 0", borderBottom: "1px solid #e8e8ed", cursor: "pointer", opacity: a.id === activeId ? 1 : 0.5, fontWeight: a.id === activeId ? 600 : 400, fontSize: 15, display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ color: "#86868b", fontFamily: "'SF Mono',monospace", fontSize: 12, minWidth: 22 }}>{a.id}</span>
                <span>{a.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div ref={ref} style={{ maxWidth: 640, margin: "0 auto", padding: isMobile ? "32px 24px 80px" : "48px 24px 100px" }}>
        <div style={{ marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: tagStyle[active.tags[0]], textTransform: "uppercase", letterSpacing: 1 }}>{active.tags[0]}</span>
        </div>
        <h1 style={{ fontSize: isMobile ? 28 : 40, fontWeight: 700, lineHeight: 1.2, letterSpacing: -0.8, margin: "0 0 32px" }}>{active.title}</h1>
        <div style={{ fontSize: isMobile ? 16 : 17, lineHeight: 1.9 }}><Prose text={active.content} /></div>
        <div style={{ marginTop: 56, padding: isMobile ? "24px 20px" : "28px 28px", background: "#f5f5f7", borderRadius: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#86868b", textTransform: "uppercase", letterSpacing: 1 }}>Threads 貼文</span>
            <button onClick={() => copy(active.threads)} style={{ background: copied ? "#e8f5e8" : "#fff", border: "1px solid #d2d2d7", borderRadius: 980, padding: "5px 16px", fontSize: 12, fontWeight: 500, color: copied ? "#1a7f37" : "#1d1d1f", cursor: "pointer", fontFamily: font }}>{copied ? "已複製 ✓" : "複製"}</button>
          </div>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: "#424245", whiteSpace: "pre-line" }}>{active.threads}</p>
        </div>
        <div style={{ marginTop: 32, textAlign: "center", padding: "36px 24px" }}>
          <a href="https://patreon.com/Bookie918" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "14px 36px", background: "#1d1d1f", color: "#fff", borderRadius: 980, fontSize: 15, fontWeight: 500, textDecoration: "none", fontFamily: font }}>閱讀完整版（含 Prompt）</a>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40, paddingTop: 24, borderTop: "1px solid #e8e8ed" }}>
          {parseInt(active.id) > 0 ? <button onClick={() => setActiveId(String(parseInt(active.id) - 1).padStart(2, "0"))} style={{ background: "none", border: "none", color: "#0066cc", cursor: "pointer", fontSize: 15, fontFamily: font, padding: 0 }}>← 上一篇</button> : <div />}
          {parseInt(active.id) < 13 ? <button onClick={() => setActiveId(String(parseInt(active.id) + 1).padStart(2, "0"))} style={{ background: "none", border: "none", color: "#0066cc", cursor: "pointer", fontSize: 15, fontFamily: font, padding: 0 }}>下一篇 →</button> : <div />}
        </div>
      </div>
    </div>
  );
}
