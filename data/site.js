/* =============================================
   site.js — サイト共通設定
   ★ 普段触るファイル（プロフィール・ナビ・フッター）
   ============================================= */

const SITE = {
    /* --- バージョン管理（★ デプロイ時にここだけ更新） --- */
    SITE_VERSION: "20260218-1", // 形式: YYYYMMDD-連番

    /* --- メタ情報 --- */
    meta: {
        title: "PORTFOLIO — AI Team向け",
        description: "少人数で縦型動画を量産するための、AI活用と制作フローの試行錯誤をまとめています。",
        ogTitle: "PORTFOLIO — AI Team向け",
        ogDescription: "少人数で縦型動画を量産するための、AI活用と制作フローの試行錯誤。"
    },

    /* --- プロフィール --- */
    profile: {
        name: "名前（仮）",
        affiliation: "○○大学 ○○学部 ○年",
        email: "example@example.com"
    },

    /* --- ナビゲーション（ページ切替） --- */
    pageNav: [],

    /* --- フッター --- */
    footer: {
        links: [],
        copyright: "© 2026"
    }
};
