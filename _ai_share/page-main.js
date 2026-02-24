/* =============================================
   page-main.js — メインページのセクション定義
   ★ 普段触るファイル（内容の追加・編集・並べ替え）
   ============================================= */

const PAGE = {
    id: "main",
    BUILD_ID: "20260224-03",

    sections: [

        /* ----- PROFILE INTRO ----- */
        {
            type: "profile-intro",
            id: "intro",
            image: "assets/common/profile.png",
            name: "外川 蓮 / TOGAWA REN",
            affiliation: "京都精華大学 メディア表現学部 イメージ表現専攻 2年",
            headline: [
                "AIを制作フローに組み込み、",
                "再現可能な形でアウトプットを作る。"
            ],
            items: [
                {
                    title: "できること",
                    body: "AI生成からAfter Effectsでの仕上げまで、一貫した動画制作。"
                },
                {
                    title: "大切にしていること",
                    body: "制作を仕組みに落とし込み、安定して回せる形にすること。"
                },
                {
                    title: "興味・関心",
                    body: "映像制作 / UI設計 / コーディング"
                },
                {
                    title: "趣味",
                    body: "ドラム / チワワ"
                },
                {
                    title: "連絡先",
                    body: "raika620uta@gmail.com"
                }
            ]
        },

        /* ----- PHILOSOPHY BRIDGE ----- */
        {
            type: "philosophy-bridge",
            id: "bridge",
            title: "私がAIを使う上で大切にしていること",
            lead: "AIを使った制作は、当たり外れが大きいと感じています。",
            body: "だからこそ、偶然に頼らず、\n手順として回せる形に落とし込み、\n安定して仕上げまで持っていくことを重視しています。"
        },

        /* ----- HERO ----- */
        {
            type: "hero-simple",
            id: "hero",
            title: ["AIガチャからの脱却。", "クリエイティブの流れの中に、AIを組み込む。"],
            subtitle: "再現性のある制作フローへ"
        },

        /* ----- Workflow見出し + フロー図 ----- */
        {
            type: "content-bridge",
            id: "workflow",
            heading: "WORK-FLOW",
            sub: "再現性を重視した制作フロー",
            lead: "以下では、フック検証からAI映像化、AE仕上げまでを一貫したロジックで回す、実際の制作プロセスを示します。"
        },

        /* ----- 制作フロー図 ----- */
        {
            type: "wide-image",
            id: "process-diagram",
            src: "assets/cases/case01/workflow_diagram.png",
            alt: "制作フロー図"
        },

        /* ----- 制作体制・使用ツール見出し + ツール図 ----- */
        {
            type: "content-bridge",
            id: "tools",
            heading: "TOOLS",
            sub: "制作環境と使用ツール",
            lead: "目的と再現性に応じて、以下の4つのツール群を最適に組み合わせています。"
        },

        /* ----- 制作ツール図 ----- */
        {
            type: "wide-image",
            id: "tools-diagram",
            src: "assets/cases/case01/tools_overview.png",
            alt: "制作環境と使用ツール"
        },

        /* ----- Cases見出し ----- */
        {
            type: "content-bridge",
            id: "cases",
            heading: "CASES",
            sub: "制作実例",
            lead: "ここからは具体的な案件を例に、フローがどのように機能し、再現性を担保しているかを示します。"
        },

        /* ----- Case 01: 就活コミュニティ（メインケース） ----- */
        {
            type: "case-detailed",
            id: "case01",
            number: "01",
            title: "TikTok縦型動画 AI x AfterEffects",
            lead: "就活コミュニティの募集動画。AIによる素材生成とAEによる広告設計を組み合わせた事例です。",
            description: "28卒向け就活コミュニティの募集動画。\n不安ではなく「得られるもの」にフォーカスし、ベネフィット型のフックを設計しました。",

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
                title: "以下の制作フローの中で、再現性に直結する工程をいくつかピックアップして紹介します。",
                src: "assets/cases/case01/case01_flow.png",
                label: "制作フロー（case01_flow.png）"
            },

            // フック比較
            hooks: {
                title: "01 フック比較　　ー最初がすべて。",
                purpose: "視聴維持率を最大化するための最適な導入パターンを検証",
                subtitle: "TikTokは冒頭数秒のフックが視聴維持率に直結するため、複数パターンを作成し、比較・検証を行っています",
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
                title: "02 流れと構造を決める（カット割り決め）",
                purpose: "生成の不確実性を排除し、再現可能な構造へ分解",
                description: "従来の「プロンプト→最終ルック生成」は結果依存で再現性が低い。\n余分な視覚情報を除いたワイヤーフレームで構造を確定。`",
                singleImage: "assets/cases/case01/case01_cut_structure.png"
            },

            // 一貫性を高める（主体モデルの当て込み）
            blocking: {
                title: "03 一貫性を高める（主体モデルの当て込み）",
                purpose: "カット間の人物ブレを防ぎ、一貫性を担保",
                description: "参照するモデル情報を固定し、カット間のズレを防ぐ",
                singleImage: "assets/cases/case01/case01_blocking.png"
            },

            // 動きを成立させる（開始・終了フレーム固定）
            startframes: {
                title: "04 動きを成立させる（開始・終了フレーム固定）",
                purpose: "動きの破綻を防ぎ、自然な連続性を生成",
                description: "動画の始点と終点を定義し、自然につながるようにする",
                halfImage: "assets/cases/case01/case01_start_end.png"
            },

            // 広告として成立させる（AE仕上げ）
            aeTimeline: {
                title: "05 広告として成立させる（AE仕上げ）",
                purpose: "AI素材を視線誘導・情報整理・テンポ設計により広告品質へ変換",
                description: "テンポ・視線誘導・情報密度を調整し、視聴を維持できる形に仕上げる",
                src: "assets/cases/case01/CASE01_AE_TIMELINE.png",
                label: "AEタイムライン（CASE01_AE_TIMELINE.png）"
            },

            // ノウハウの蓄積（FAILMAP）
            failmap: {
                title: "+@ ノウハウの蓄積（自作ツール:FAILMAP）",
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
        /*
                {
                    type: "case-standard",
                    id: "case02",
                    number: "02",
                    title: "マウスメーカー",
                    lead: "プロダクト広告を想定した、AEでのモーション再構築とエフェクト仕上げの事例です。",
                    description: "プロダクト広告を想定した映像。\n\nクロマキー背景で生成した動きをAfter Effects上で抜き、ダイナミックなモーションに再構築しています。",
        
                    media: [
                        { type: "video", src: "assets/cases/case02/CASE02_FINAL.mp4", label: "最終動画（CASE02_FINAL.mp4）", role: "final", ratio: "9/16" },
                        { type: "video", src: "assets/cases/case02/CASE02_AI_ASSET_01.mp4", label: "AI素材（CASE02_AI_ASSET_01.mp4）", role: "other" },
                        { type: "image", src: "assets/cases/case02/CASE02_AE_TIMELINE.png", label: "AEタイムライン（CASE02_AE_TIMELINE.png）", role: "timeline" }
                    ],
        
                    details: {
                        title: "制作ブレイクダウン",
                        content: "AI生成時にクロマキー背景（グリーンバック）を指定し、動きのある素材を生成。After Effectsでクロマキー合成を行い、背景を抜き出しました。\n\n抜き出した素材に対して、カメラワーク,パーティクル,グローエフェクトを追加し、ダイナミックなモーションに仕上げています。AI素材をそのまま使うのではなく、AEでの再設計が重要です。"
                    }
                },
        */

        /* ----- Case 03: TOYOTA 北山区（実案件＋自動化） ----- */
        {
            type: "case-detailed",
            id: "case03",
            number: "03",
            title: "TOYOTA 北山区",
            lead: "Remotionによる自動化とAEのテンプレート設計を組み合わせ、制作速度を追求した事例です。",
            description: "",

            // 最終動画（横並びレイアウト）
            final: {
                type: "video",
                src: "assets/cases/case03/CASE03_FINAL.mp4",
                label: "最終動画（CASE03_FINAL.mp4）",
                ratio: "9/16",
                layout: "side-by-side",
                sideText: "学生個人で制作。\n\nAfter Effectsでテンプレートを設計し、\nRemotionでテキストを自動生成。\n\n手作業と自動化を切り分けることで、\n再現性と制作速度を両立。"
            },

            // 制作フロー（横長MP4 1920x540）
            aeTimeline: {
                title: "制作フロー（Remotion × AE）",
                type: "video",
                src: "assets/cases/case03/CASE03_REMOTION_FLOW.mp4",
                label: "CASE03_REMOTION_FLOW.mp4",
                autoplay: true,
                ratio: "16/9"
            },

            details: {
                title: "制作アプローチ",
                content: "After Effectsで構成・レイアウトをテンプレート化し、映像の骨格を固定。\n\nテキスト部分はRemotionで自動生成することで、修正コストと制作時間を削減しました。\n\nすべてをAI任せにするのではなく、固定する部分と変化させる部分を分けることで、再現性のある制作を実現しています。"
            }
        },

        /* ----- Other Works（3カテゴリ） ----- */
        {
            type: "other-works-categorized",
            id: "other-works",
            title: "Other Works",
            lead: "AI広告以外の領域（UI/UX、モーショングラフィックス、システム設計など）の制作実績です。",
            intro: "現在はAI広告制作にフォーカスしていますが、UI/UX、モーショングラフィックス、システム設計なども行っています。",

            categories: [
                {
                    id: "video",
                    title: "Video / Motion",
                    policy: "テンポとグラフィックの気持ちよさを軸に、視覚的に心地よい映像体験を設計しています。",
                    items: [
                        { type: "video", src: "assets/other/video/OTHER_VIDEO_01.mp4", label: "VIDEO_01（OTHER_VIDEO_01.mp4）", caption: { title: "Video 01", body: "モーショングラフィックス" } },
                        { type: "video", src: "assets/other/video/OTHER_VIDEO_02.mp4", label: "VIDEO_02（OTHER_VIDEO_02.mp4）", caption: { title: "Video 02", body: "タイポグラフィ演出" } },
                        { type: "video", src: "assets/other/video/OTHER_VIDEO_03.mp4", label: "VIDEO_03（OTHER_VIDEO_03.mp4）", caption: { title: "Video 03", body: "プロモーション映像" } },
                        { type: "video", src: "assets/other/video/OTHER_VIDEO_04.mp4", label: "VIDEO_04（OTHER_VIDEO_04.mp4）", caption: { title: "Video 04", body: "イベント映像" } },
                        { type: "video", src: "assets/other/video/OTHER_VIDEO_05.mp4", label: "VIDEO_05（OTHER_VIDEO_05.mp4）", caption: { title: "Video 05", body: "ショートムービー" } },
                        { type: "video", src: "assets/other/video/OTHER_VIDEO_06.mp4", label: "VIDEO_06（OTHER_VIDEO_06.mp4）", caption: { title: "Video 06", body: "エフェクト実験" } }
                    ]
                },
                {
                    id: "ui",
                    title: "UI / Interface",
                    policy: "ユーザーの行動を起点に、迷わず使える構造と新しさのバランスを設計しています。",
                    items: [
                        { type: "image", src: "assets/other/ui/OTHER_UI_01.png", label: "UI_01（OTHER_UI_01.png）", caption: { title: "UI 01", body: "ダッシュボードUI" } },
                        { type: "image", src: "assets/other/ui/OTHER_UI_02.png", label: "UI_02（OTHER_UI_02.png）", caption: { title: "UI 02", body: "モバイルアプリUI" } },
                        { type: "image", src: "assets/other/ui/OTHER_UI_03.png", label: "UI_03（OTHER_UI_03.png）", caption: { title: "UI 03", body: "ランディングページ" } },
                        { type: "image", src: "assets/other/ui/OTHER_UI_04.png", label: "UI_04（OTHER_UI_04.png）", caption: { title: "UI 04", body: "管理画面プロトタイプ" } },
                        { type: "image", src: "assets/other/ui/OTHER_UI_05.png", label: "UI_05（OTHER_UI_05.png）", caption: { title: "UI 05", body: "デザインシステム設計" } },
                        { type: "image", src: "assets/other/ui/OTHER_UI_06.png", label: "UI_06（OTHER_UI_06.png）", caption: { title: "UI 06", body: "コンポーネントライブラリ" } }
                    ]
                },
                {
                    id: "graphic",
                    title: "Graphic Design",
                    policy: "余白と視線誘導をコントロールし、情報が自然に伝わるビジュアルを意識しています。",
                    items: [
                        { type: "image", src: "assets/other/graphic/OTHER_GRAPHIC_01.png", label: "GRAPHIC_01", caption: { title: "Graphic 01", body: "タイポグラフィポスター" } },
                        { type: "image", src: "assets/other/graphic/OTHER_GRAPHIC_02.png", label: "GRAPHIC_02", caption: { title: "Graphic 02", body: "インフォグラフィック設計" } },
                        { type: "image", src: "assets/other/graphic/OTHER_GRAPHIC_03.png", label: "GRAPHIC_03", caption: { title: "Graphic 03", body: "ビジュアルアイデンティティ" } },
                        { type: "image", src: "assets/other/graphic/OTHER_GRAPHIC_04.png", label: "GRAPHIC_04", caption: { title: "Graphic 04", body: "ブランドブックレイアウト" } },
                        { type: "image", src: "assets/other/graphic/OTHER_GRAPHIC_05.png", label: "GRAPHIC_05", caption: { title: "Graphic 05", body: "展示会キービジュアル" } },
                        { type: "image", src: "assets/other/graphic/OTHER_GRAPHIC_06.png", label: "GRAPHIC_06", caption: { title: "Graphic 06", body: "広告バナー展開" } }
                    ]
                },
                {
                    id: "system",
                    title: "Apps / Systems",
                    policy: "使われることを前提に、シンプルで再利用可能な構造設計を行っています。",
                    items: [
                        { type: "image", src: "assets/other/system/OTHER_SYS_01.png", label: "SYS_01（OTHER_SYS_01.png）", caption: { title: "System 01", body: "自動化ツール" } },
                        { type: "image", src: "assets/other/system/OTHER_SYS_02.png", label: "SYS_02（OTHER_SYS_02.png）", caption: { title: "System 02", body: "データ管理システム" } },
                        { type: "image", src: "assets/other/system/OTHER_SYS_03.png", label: "SYS_03（OTHER_SYS_03.png）", caption: { title: "System 03", body: "APIインテグレーション" } }
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
