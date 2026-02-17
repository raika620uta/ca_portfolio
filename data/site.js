/* =============================================
   site.js — サイト共通設定
   ★ 普段触るファイル（プロフィール・ナビ・フッター）
   ============================================= */

const SITE = {

    /* --- メタ情報 --- */
    meta: {
        title: "ポートフォリオ — AI動画制作の構造化を模索する",
        description: "TikTok縦型広告におけるAI活用と制作プロセスの構造化を模索する学生のポートフォリオ。",
        ogTitle: "AI動画制作の構造化を模索する",
        ogDescription: "就活コミュニティ×TikTok広告。制作プロセスの可視化に取り組んでいます。"
    },

    /* --- プロフィール --- */
    profile: {
        name: "あなたの名前",
        affiliation: "○○大学 ○○学部 ○年",
        email: "your-email@example.com"
    },

    /* --- ナビゲーション（ページ切替） --- */
    // href はこのファイルから見た相対パスではなく、各HTMLの置き場所基準
    pageNav: [
        { label: "AI動画", href: "index.html", id: "main" }
        // 将来追加例:
        // { label: "AE作品", href: "pages/ae.html", id: "ae" },
        // { label: "UI/UX",  href: "pages/uiux.html", id: "uiux" },
    ],

    /* --- フッター --- */
    footer: {
        links: [
            { label: "Contact", href: "mailto:your-email@example.com" },
            { label: "PDF版（準備中）", href: "#" }
        ],
        copyright: "© 2026"
    }
};
