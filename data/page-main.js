/* =============================================
   page-main.js — メインページのセクション定義
   ★ 普段触るファイル（内容の追加・編集・並べ替え）
   ============================================= */

const PAGE = {
    id: "main",

    sections: [

        /* ----- HERO ----- */
        {
            type: "hero-simple",
            tagline: "少人数で、\n縦型動画を量産する必要がありました。",
            paragraphs: [
                "時間も、クレジットも限られている。\nそれでも、スクロールに耐えられる質は落とせない。",
                "その中で、\nAIをどう使えば、再現性を持って制作を回せるのか。\nその試行錯誤をまとめています。"
            ]
        },

        /* ----- Context ----- */
        {
            type: "content",
            id: "context",
            title: "Context",
            paragraphs: [
                "現在、学生3人で縦型コンテンツの制作を行っています。",
                "新しいアプリ内で公開される動画のため、高速スクロール環境に耐えるフックと、一定の制作本数が同時に求められます。",
                "制作時間も限られています。クレジットも無限ではありません。",
                "その制約の中で、AIを\"生成ツール\"としてではなく、制作工程の一部として扱えないかと考えました。"
            ]
        },

        /* ----- Workflow ----- */
        {
            type: "workflow",
            id: "workflow",
            title: "Workflow",
            lead: "再現性を持たせるための制作フロー",
            intro: "AIを使えば映像は作れます。でも、それだけでは安定しません。",
            steps: [
                { label: "仮説設計", text: "フック・訴求の整理" },
                { label: "構図・動線", text: "3Dで整理" },
                { label: "AI素材生成", text: "" },
                { label: "素材の分解・選定", text: "" },
                { label: "AE再設計", text: "" },
                { label: "改善ログ", text: "FAILMAP" }
            ],
            note: "ガチャ的な生成に頼らず、構造を持った制作を目指しています。"
        },

        /* ----- Case 01: 就活コミュニティ（メインケース） ----- */
        {
            type: "case-detailed",
            id: "case01",
            number: "01",
            title: "就活コミュニティ",
            description: "28卒向け就活コミュニティの募集動画。\n\n不安ではなく「得られるもの」にフォーカスし、ベネフィット型のフックを設計しました。",

            // 最終動画
            final: {
                type: "video",
                src: "assets/cases/case01/CASE01_FINAL.mp4",
                label: "最終動画（CASE01_FINAL.mp4）",
                role: "final",
                ratio: "9/16"
            },

            // フック比較（5バリエーション）
            hooks: {
                title: "フック比較（5バリエーション）",
                items: [
                    { src: "assets/cases/case01/CASE01_HOOK_01.mp4", type: "FOMO型（CASE01_HOOK_01.mp4）", intent: "「逃すと損」という不安を刺激" },
                    { src: "assets/cases/case01/CASE01_HOOK_02.mp4", type: "UGC型（CASE01_HOOK_02.mp4）", intent: "実際の利用者の声を前面に" },
                    { src: "assets/cases/case01/CASE01_HOOK_03.mp4", type: "ベネフィット型（CASE01_HOOK_03.mp4）", intent: "得られる価値を明示" },
                    { src: "assets/cases/case01/CASE01_HOOK_04.mp4", type: "権威型（CASE01_HOOK_04.mp4）", intent: "信頼性を前面に" },
                    { src: "assets/cases/case01/CASE01_HOOK_05.mp4", type: "疑問型（CASE01_HOOK_05.mp4）", intent: "問いかけで興味を引く" }
                ],
                decision: "UGC型を採用",
                reason: "実際の利用者の声が最も信頼性が高く、スクロール環境でも止まりやすいと判断しました。"
            },

            // ストーリーボード
            storyboard: {
                title: "俯瞰ストーリーボード",
                items: [
                    { src: "assets/cases/case01/CASE01_STORYBOARD_01.png", label: "ストーリーボード01（CASE01_STORYBOARD_01.png）" },
                    { src: "assets/cases/case01/CASE01_STORYBOARD_02.png", label: "ストーリーボード02（CASE01_STORYBOARD_02.png）" },
                    { src: "assets/cases/case01/CASE01_STORYBOARD_03.png", label: "ストーリーボード03（CASE01_STORYBOARD_03.png）" },
                    { src: "assets/cases/case01/CASE01_STORYBOARD_04.png", label: "ストーリーボード04（CASE01_STORYBOARD_04.png）" },
                    { src: "assets/cases/case01/CASE01_STORYBOARD_05.png", label: "ストーリーボード05（CASE01_STORYBOARD_05.png）" },
                    { src: "assets/cases/case01/CASE01_STORYBOARD_06.png", label: "ストーリーボード06（CASE01_STORYBOARD_06.png）" }
                ]
            },

            // ブロッキング
            blocking: {
                title: "ブロッキング/構図証明",
                items: [
                    { src: "assets/cases/case01/CASE01_BLOCKING_01.png", label: "ブロッキング01（CASE01_BLOCKING_01.png）" },
                    { src: "assets/cases/case01/CASE01_BLOCKING_02.png", label: "ブロッキング02（CASE01_BLOCKING_02.png）" },
                    { src: "assets/cases/case01/CASE01_BLOCKING_03.png", label: "ブロッキング03（CASE01_BLOCKING_03.png）" }
                ]
            },

            // スタートフレーム
            startframes: {
                title: "スタートフレーム定義",
                items: [
                    { src: "assets/cases/case01/CASE01_STARTFRAME_01.png", label: "スタートフレーム01（CASE01_STARTFRAME_01.png）" },
                    { src: "assets/cases/case01/CASE01_STARTFRAME_02.png", label: "スタートフレーム02（CASE01_STARTFRAME_02.png）" },
                    { src: "assets/cases/case01/CASE01_STARTFRAME_03.png", label: "スタートフレーム03（CASE01_STARTFRAME_03.png）" }
                ]
            },

            // キャラクター参考
            charRef: {
                title: "キャラクター参考",
                src: "assets/cases/case01/CASE01_CHAR_REF.png",
                label: "キャラクター参考（CASE01_CHAR_REF.png）"
            },

            // AE仕上げ
            aeTimeline: {
                title: "AE仕上げ証明",
                src: "assets/cases/case01/CASE01_AE_TIMELINE.png",
                label: "AEタイムライン（CASE01_AE_TIMELINE.png）"
            },

            // 詳細ドロップダウン
            details: {
                title: "詳細プロセスノート",
                content: "フック設計では、5つのパターンを比較検証しました。FOMO型は不安を刺激しますが、ネガティブな印象を与える可能性があります。UGC型は実際の利用者の声を前面に出すことで、信頼性と親近感を両立できると判断しました。\n\n構図設計では、3Dブロッキングで動線を事前に整理し、AI生成時の偶然性を減らしています。スタートフレームを明確に定義することで、生成結果の一貫性を高めました。\n\nAE仕上げでは、AI素材をそのまま使うのではなく、タイミング調整、色補正、モーショングラフィックスの追加を行い、完成度を高めています。"
            }
        },

        /* ----- Case 02: マウスメーカー（AE仕上げ） ----- */
        {
            type: "case-standard",
            id: "case02",
            number: "02",
            title: "マウスメーカー",
            description: "プロダクト広告を想定した映像。\n\nクロマキー背景で生成した動きをAfter Effects上で抜き、ダイナミックなモーションに再構築しています。",

            media: [
                { type: "video", src: "assets/cases/case02/CASE02_FINAL.mp4", label: "最終動画（CASE02_FINAL.mp4）", role: "final", ratio: "9/16" },
                { type: "video", src: "assets/cases/case02/CASE02_AI_ASSET_01.mp4", label: "AI素材（CASE02_AI_ASSET_01.mp4）", role: "other" },
                { type: "image", src: "assets/cases/case02/CASE02_AE_TIMELINE.png", label: "AEタイムライン（CASE02_AE_TIMELINE.png）", role: "timeline" }
            ],

            details: {
                title: "制作ブレイクダウン",
                content: "AI生成時にクロマキー背景（グリーンバック）を指定し、動きのある素材を生成。After Effectsでクロマキー合成を行い、背景を抜き出しました。\n\n抜き出した素材に対して、カメラワーク、パーティクル、グローエフェクトを追加し、ダイナミックなモーションに仕上げています。AI素材をそのまま使うのではなく、AEでの再設計が重要です。"
            }
        },

        /* ----- Case 03: TOYOTA 北山区（実案件＋自動化） ----- */
        {
            type: "case-standard",
            id: "case03",
            number: "03",
            title: "TOYOTA 北山区",
            description: "TOYOTAインターンで制作した、京都市北山区店舗のPR映像。\n\n実際に公開されているアプリ内で使用されています。学生3人で、量と質を同時に求められる環境で制作を行いました。",

            media: [
                { type: "video", src: "assets/cases/case03/CASE03_FINAL.mp4", label: "最終動画（CASE03_FINAL.mp4）" },
                { type: "image", src: "assets/cases/case03/CASE03_APP_LINK.png", label: "アプリリンク（CASE03_APP_LINK.png）" },
                { type: "image", src: "assets/cases/case03/CASE03_REMOTION_UI.png", label: "Remotion UI（CASE03_REMOTION_UI.png）" },
                { type: "image", src: "assets/cases/case03/CASE03_AE_TEMPLATE.png", label: "AEテンプレート（CASE03_AE_TEMPLATE.png）" },
                { type: "image", src: "assets/cases/case03/CASE03_AUTO_CAPTION_EXAMPLE.png", label: "自動字幕例（CASE03_AUTO_CAPTION_EXAMPLE.png）" }
            ],

            details: {
                title: "自動化の必要性",
                content: "90本以上の動画を、学生3人で制作する必要がありました。手作業では到底間に合いません。\n\nRemotion（React + TypeScript）を使用し、データ駆動型の動画生成システムを構築。AEテンプレートと組み合わせることで、データを入力するだけで動画が生成される仕組みを作りました。\n\n自動字幕生成、タイミング調整、エクスポートまでを自動化し、制作時間を大幅に短縮しています。"
            }
        },

        /* ----- Other Works（3カテゴリ） ----- */
        {
            type: "other-works-categorized",
            id: "other-works",
            title: "Other Works",
            intro: "現在はAI広告制作にフォーカスしていますが、UI/UX、モーショングラフィックス、システム設計なども行っています。",

            categories: [
                {
                    id: "video",
                    title: "Video / Motion",
                    items: [
                        { type: "video", src: "assets/other/video/OTHER_VIDEO_01.mp4", label: "VIDEO_01（OTHER_VIDEO_01.mp4）" },
                        { type: "video", src: "assets/other/video/OTHER_VIDEO_02.mp4", label: "VIDEO_02（OTHER_VIDEO_02.mp4）" },
                        { type: "video", src: "assets/other/video/OTHER_VIDEO_03.mp4", label: "VIDEO_03（OTHER_VIDEO_03.mp4）" },
                        { type: "video", src: "assets/other/video/OTHER_VIDEO_04.mp4", label: "VIDEO_04（OTHER_VIDEO_04.mp4）" }
                    ]
                },
                {
                    id: "ui",
                    title: "UI / Graphic",
                    items: [
                        { type: "image", src: "assets/other/ui/OTHER_UI_01.png", label: "UI_01（OTHER_UI_01.png）" },
                        { type: "image", src: "assets/other/ui/OTHER_UI_02.png", label: "UI_02（OTHER_UI_02.png）" },
                        { type: "image", src: "assets/other/ui/OTHER_UI_03.png", label: "UI_03（OTHER_UI_03.png）" },
                        { type: "image", src: "assets/other/ui/OTHER_UI_04.png", label: "UI_04（OTHER_UI_04.png）" }
                    ]
                },
                {
                    id: "system",
                    title: "Apps / Systems",
                    items: [
                        { type: "image", src: "assets/other/system/OTHER_SYS_01.png", label: "SYS_01（OTHER_SYS_01.png）" },
                        { type: "image", src: "assets/other/system/OTHER_SYS_02.png", label: "SYS_02（OTHER_SYS_02.png）" },
                        { type: "image", src: "assets/other/system/OTHER_SYS_03.png", label: "SYS_03（OTHER_SYS_03.png）" },
                        { type: "image", src: "assets/other/system/OTHER_SYS_04.png", label: "SYS_04（OTHER_SYS_04.png）" }
                    ]
                }
            ]
        },

        /* ----- Contact ----- */
        {
            type: "contact",
            id: "contact"
        }

    ]
};
