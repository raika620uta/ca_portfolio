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

        /* ----- 制作設計（概要テキスト） ----- */
        {
            type: "process-overview",
            id: "process-design",
            title: "再現性を支える制作設計",
            paragraphs: [
                "フックの検証からAI映像化、AEでの仕上げまでを、\n一貫した流れとして設計しています。",
                "属人的な制作ではなく、同じ品質を再現できる構造を重視しています。"
            ]
        },

        /* ----- 制作フロー図 ----- */
        {
            type: "wide-image",
            id: "process-diagram",
            src: "assets/cases/case01/workflow_diagram.png",
            alt: "制作フロー図"
        },

        /* ----- 制作ツール図 ----- */
        {
            type: "wide-image",
            id: "tools-diagram",
            src: "assets/cases/case01/tools_overview.png",
            alt: "制作環境と使用ツール"
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

            // 制作フロー画像（最終動画の直下に表示）
            flowImage: {
                title: "再現性を重視した制作フロー",
                src: "assets/cases/case01/case01_flow.png",
                label: "制作フロー（case01_flow.png）"
            },

            // フック比較
            hooks: {
                title: "フック比較",
                subtitle: "最初の3秒の視聴維持率を最大化するため、複数パターンを作成・比較",
                items: [
                    { src: "assets/cases/case01/CASE01_HOOK_01.mp4", type: "FOMO", intent: "不安を喚起し、「今やらないと損」という防衛的な動機で視聴を引き止める" },
                    { src: "assets/cases/case01/CASE01_HOOK_02.mp4", type: "UGC", intent: "共感しやすい構造で安心感を与え、前向きな動機で視聴を継続させる" },
                    { src: "assets/cases/case01/CASE01_HOOK_03.mp4", type: "スクロール阻害", intent: "視聴者の状況を再現し、メタ的な違和感でスクロールを止める" },
                    { src: "assets/cases/case01/CASE01_HOOK_04.mp4", type: "AI違和感", intent: "あえて非現実的な世界観から始め、違和感によって注意を引く" },
                    { src: "assets/cases/case01/CASE01_HOOK_05.mp4", type: "男性＋データ提示", intent: "性別差による印象変化と、具体的な数値で信頼性を補強する" }
                ],
                decision: "UGCを採用",
                reason: "運営メンバーにも見てもらい複数パターンを検証した結果、前向きな共感で視聴を維持できるUGC形式を採用"
            },

            // 流れと構造を決める（カット割り決め）
            storyboard: {
                title: "流れと構造を決める（カット割り決め）",
                description: "構図と動線を整理し、動画の骨格を先に決める",
                singleImage: "assets/cases/case01/case01_cut_structure.png"
            },

            // 一貫性を高める（主体モデルの当て込み）
            blocking: {
                title: "一貫性を高める（主体モデルの当て込み）",
                description: "参照するモデル情報を固定し、カット間のズレを防ぐ",
                singleImage: "assets/cases/case01/case01_blocking.png"
            },

            // 動きを成立させる（開始・終了フレーム固定）
            startframes: {
                title: "動きを成立させる（開始・終了フレーム固定）",
                description: "動画の始点と終点を定義し、自然につながるようにする",
                halfImage: "assets/cases/case01/case01_start_end.png"
            },

            // 広告として成立させる（AE仕上げ）
            aeTimeline: {
                title: "広告として成立させる（AE仕上げ）",
                description: "テンポ・視線誘導・情報密度を調整し、視聴を維持できる形に仕上げる",
                src: "assets/cases/case01/CASE01_AE_TIMELINE.png",
                label: "AEタイムライン（CASE01_AE_TIMELINE.png）"
            },

            // ノウハウの蓄積（FAILMAP）
            failmap: {
                title: "ノウハウの蓄積（自作ツール:FAILMAP）",
                description: "失敗・成功の要因をログ化し、次回以降の再現性を更に高める",
                halfImage: "assets/cases/case01/case01_failmap.png"
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
