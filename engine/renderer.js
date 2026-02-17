/* =============================================
   engine/renderer.js — セクションレンダラー
   ⚠ このファイルは原則触らない
   PAGE.sections のデータからHTMLを自動生成する
   ============================================= */

(function () {
    "use strict";

    /* --- ユーティリティ --- */
    function esc(s) {
        if (!s) return "";
        const d = document.createElement("div");
        d.textContent = s;
        return d.innerHTML;
    }

    // HTMLタグを許可する箇所用（既にデータ内でstrong等を使っている）
    function raw(s) { return s || ""; }

    function nl2br(s) {
        return (s || "").replace(/\n/g, "<br>");
    }

    /* =============================================
       ナビゲーション生成
       ============================================= */
    function renderNav(sections) {
        const navEl = document.getElementById("site-nav");
        if (!navEl) return;

        // セクション内ナビ（idを持つセクションのみ）
        const sectionLinks = sections
            .filter(s => s.id && s.type !== "hero" && s.type !== "closing")
            .map(s => `<a class="site-nav__link" href="#${esc(s.id)}">${esc(s.title || s.id)}</a>`)
            .join("");

        // ページナビ（複数ページがある場合）
        let pageNavHtml = "";
        if (SITE.pageNav && SITE.pageNav.length > 1) {
            const links = SITE.pageNav.map(p => {
                const isCurrent = p.id === PAGE.id;
                return `<a class="site-nav__link${isCurrent ? " is-current" : ""}" href="${esc(p.href)}">${esc(p.label)}</a>`;
            }).join("");
            pageNavHtml = `<div class="page-nav">${links}</div>`;
        }

        navEl.className = "site-nav";
        navEl.setAttribute("aria-label", "ページ内ナビゲーション");
        navEl.innerHTML = `<div class="site-nav__inner" role="list">${pageNavHtml}${sectionLinks}</div>`;
    }

    /* =============================================
       フッター生成
       ============================================= */
    function renderFooter() {
        const el = document.getElementById("site-footer");
        if (!el) return;

        const p = SITE.profile;
        const f = SITE.footer;
        const links = (f.links || []).map(l => `<a href="${esc(l.href)}">${esc(l.label)}</a>`).join("");

        el.className = "footer";
        el.innerHTML = `<div class="container">
      <div class="footer__line"></div>
      <p class="footer__name">${esc(p.name)}</p>
      <p class="footer__contact"><a href="mailto:${esc(p.email)}">${esc(p.email)}</a></p>
      <div class="footer__links">${links}</div>
      <p class="footer__copy">${raw(f.copyright)}</p>
      <details class="guide">
        <summary>How to Update（差し替えガイド）</summary>
        <div class="guide__body">
          <h4>🚀 最短手順</h4>
          <ul>
            <li>① <code>assets/videos/</code> にMP4を入れる</li>
            <li>② <code>data/page-main.js</code> の cases に追加</li>
            <li>③ git push → スマホで確認</li>
          </ul>
          <h4>セクション追加</h4>
          <p><code>data/page-main.js</code> の sections 配列にオブジェクトを挿入するだけ。</p>
          <h4>新ページ追加</h4>
          <p><code>data/page-xxx.js</code> を作成 → HTMLをコピー → script src を変更 → <code>data/site.js</code> の pageNav に追加。</p>
        </div>
      </details>
    </div>`;
    }

    /* =============================================
       セクションレンダラー（type → HTML）
       ============================================= */
    const renderers = {};

    /* ----- hero ----- */
    renderers.hero = function (s) {
        const p = SITE.profile;
        const updated = new Date().toISOString().slice(0, 10);
        return `<header class="hero" id="hero">
      <div class="container">
        <p class="hero__label">${esc(s.label || "Portfolio")}</p>
        <h1 class="hero__tagline">${esc(s.tagline)}</h1>
        <div class="hero__accent-line"></div>
        <p class="hero__sub">${esc(s.sub)}</p>
        <p class="hero__updated">Last updated: ${updated}</p>
        <div class="hero__profile">
          <p class="hero__name">${esc(p.name)}</p>
          <p class="hero__affiliation">${esc(p.affiliation)}</p>
        </div>
      </div>
    </header>`;
    };

    /* ----- text-list ----- */
    renderers["text-list"] = function (s, idx) {
        const items = (s.items || []).map(it => `
      <div class="structure-item">
        <div class="structure-item__icon">${esc(it.icon)}</div>
        <div class="structure-item__body">
          <h3>${esc(it.title)}</h3>
          <p>${raw(it.body)}</p>
        </div>
      </div>`).join("");

        const noteHtml = s.note
            ? `<div class="note-box fade-in"><p>${raw(s.note)}</p></div>`
            : "";

        return sectionWrap(s, idx, `
      <div class="structure-list fade-in">${items}</div>
      ${noteHtml}
    `);
    };

    /* ----- cards ----- */
    renderers.cards = function (s, idx) {
        const introHtml = s.intro
            ? `<div class="cases-intro fade-in"><p>${raw(s.intro)}</p></div>`
            : "";

        const cards = (s.cases || []).map(c => {
            const hasSrc = c.src && c.src !== "";
            const posterAttr = c.poster ? ` poster="${esc(c.poster)}"` : "";
            const featuredClass = c.featured ? " case-card--featured" : "";

            let mediaHtml;
            if (c.type === "image" && c.src) {
                mediaHtml = `<img class="case-image" src="${esc(c.src)}" alt="${esc(c.title)}" loading="lazy">`;
            } else if (hasSrc) {
                mediaHtml = `<video class="case-video" data-src="${esc(c.src)}"${posterAttr} controls playsinline preload="none" aria-label="Case ${esc(c.id)} 動画"></video>`;
            } else {
                mediaHtml = `<div class="video-placeholder"><div class="video-placeholder__icon">▶</div><p class="video-placeholder__text">動画を配置</p></div>`;
            }

            // 汎用dl生成（hook/hypothesis/finishing以外の任意フィールドにも対応）
            const fields = [];
            if (c.hook) fields.push(["Hook", c.hook]);
            if (c.hypothesis) fields.push(["仮説", c.hypothesis]);
            if (c.finishing) fields.push(["仕上げ方針", c.finishing]);
            if (c.description) fields.push(["説明", c.description]);
            if (c.tools) fields.push(["使用ツール", c.tools]);

            const dlHtml = fields.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("");

            return `<article class="case-card fade-in${featuredClass}">
        <div class="case-card__header">
          <span class="case-card__num">Case ${esc(c.id)}</span>
          <span class="case-card__label">${esc(c.title)}</span>
        </div>
        <div class="case-card__body">
          <div class="case-card__video">${mediaHtml}</div>
          <div class="case-card__detail"><dl>${dlHtml}</dl></div>
        </div>
      </article>`;
        }).join("");

        return sectionWrap(s, idx, `${introHtml}<div class="cases-grid">${cards}</div>`, true);
    };

    /* ----- steps ----- */
    renderers.steps = function (s, idx) {
        const stepsHtml = (s.steps || []).map((st, i) => {
            const arrow = i < s.steps.length - 1 ? `<div class="steps-flow__arrow">↓</div>` : "";
            return `<div class="steps-flow__step">
        <span class="steps-flow__label">${esc(st.label)}</span>
        <p>${raw(st.text)}</p>
      </div>${arrow}`;
        }).join("");

        return sectionWrap(s, idx, `<div class="steps-flow fade-in">${stepsHtml}</div>`);
    };

    /* ----- ab-test ----- */
    renderers["ab-test"] = function (s, idx) {
        const items = (s.hypotheses || []).map((h, i) => `
      <div class="hypothesis-item">
        <div class="hypothesis-item__header"><span class="hypothesis-item__num">仮説 ${i + 1}</span></div>
        <div class="hypothesis-item__body">
          <p class="hypothesis-item__q">${esc(h.question)}</p>
          <div class="hypothesis-item__compare">
            <div class="hypothesis-item__a"><span class="hypothesis-item__variant">A</span><p>${esc(h.a)}</p></div>
            <div class="hypothesis-item__vs">vs</div>
            <div class="hypothesis-item__a"><span class="hypothesis-item__variant">B</span><p>${esc(h.b)}</p></div>
          </div>
          <p class="hypothesis-item__metric">${esc(h.metric)}</p>
        </div>
      </div>`).join("");

        return sectionWrap(s, idx, `<div class="hypothesis-list fade-in">${items}</div>`, true);
    };

    /* ----- content ----- */
    renderers.content = function (s, idx) {
        const paras = (s.paragraphs || []).map(p => `<p>${raw(p)}</p>`).join("");
        const tags = (s.tags || []).map(t => `<span class="content-tag">${esc(t)}</span>`).join("");
        const tagsHtml = tags ? `<div class="content-tags">${tags}</div>` : "";
        const heading = s.heading ? `<h3>${esc(s.heading)}</h3>` : "";

        return sectionWrap(s, idx, `
      <div class="content-block fade-in">
        ${heading}${paras}${tagsHtml}
      </div>
    `);
    };

    /* ----- flowchart ----- */
    renderers.flowchart = function (s, idx) {
        const introParas = (s.introParagraphs || []).map(p => `<p>${raw(p)}</p>`).join("");
        const quoteHtml = s.quote ? `<p class="flowchart-quote">${raw(s.quote)}</p>` : "";

        const nodes = (s.nodes || []).map((n, i) => {
            const arrow = i < s.nodes.length - 1 ? `<div class="flowchart-arrow">↓</div>` : "";
            return `<div class="flowchart-node flowchart-node--${n.status}">
        <div class="flowchart-node__label">${esc(n.label)}</div>
        <div class="flowchart-node__status">${esc(n.statusText)}</div>
        <p class="flowchart-node__note">${esc(n.note)}</p>
      </div>${arrow}`;
        }).join("");

        const insights = (s.insights || []).map((ins, i) => `
      <div class="insight-item">
        <span class="insight-item__marker">${i + 1}</span>
        <p>${raw(ins.text)}</p>
      </div>`).join("");

        const insightHtml = s.insightHeading
            ? `<div class="flowchart-insight fade-in"><h3>${esc(s.insightHeading)}</h3><div class="insight-list">${insights}</div></div>`
            : "";

        return sectionWrap(s, idx, `
      <div class="flowchart-intro fade-in">
        <h3>${esc(s.introHeading || "")}</h3>
        ${introParas}${quoteHtml}
      </div>
      <div class="flowchart-diagram fade-in">
        <h3 class="flowchart-diagram__title">${esc(s.flowTitle || "")}</h3>
        <div class="flowchart-flow">${nodes}</div>
      </div>
      ${insightHtml}
    `, true);
    };

    /* ----- checklist ----- */
    renderers.checklist = function (s, idx) {
        const items = (s.items || []).map(it => `
      <div class="checklist-item">
        <span class="checklist-item__status">${esc(it.status)}</span>
        <div class="checklist-item__body">
          <h3>${esc(it.title)}</h3>
          <p>${raw(it.body)}</p>
        </div>
      </div>`).join("");

        return sectionWrap(s, idx, `<div class="checklist-list fade-in">${items}</div>`);
    };

    /* ----- closing ----- */
    renderers.closing = function (s) {
        const paras = (s.paragraphs || []).map(p => `<p class="closing__body">${esc(p)}</p>`).join("");
        return `<section class="section section--white" id="${s.id || "closing"}">
      <div class="container">
        <div class="closing fade-in">
          <div class="closing__line"></div>
          <p class="closing__text">${esc(s.heading)}</p>
          ${paras}
          <p class="closing__cta">${esc(s.cta)}</p>
        </div>
      </div>
    </section>`;
    };

    /* ----- gallery（将来用） ----- */
    renderers.gallery = function (s, idx) {
        const items = (s.images || []).map(img => `
      <div class="gallery-item">
        <img src="${esc(img.src)}" alt="${esc(img.alt || "")}" loading="lazy">
        ${img.caption ? `<div class="gallery-item__caption">${esc(img.caption)}</div>` : ""}
      </div>`).join("");

        return sectionWrap(s, idx, `<div class="gallery-grid fade-in">${items}</div>`);
    };

    /* --- セクションラッパー（共通枠） --- */
    function sectionWrap(s, idx, innerHtml, isWhite) {
        const bgClass = (isWhite || idx % 2 === 1) ? " section--white" : "";
        const numHtml = s.number ? `<p class="section__number">${esc(s.number)}</p>` : "";
        const titleHtml = s.title ? `<h2 class="section__title">${esc(s.title)}</h2>` : "";
        const leadHtml = s.lead ? `<p class="section__lead">${raw(s.lead)}</p>` : "";

        return `<section class="section${bgClass}" id="${s.id || ""}">
      <div class="container">
        ${numHtml}${titleHtml}${leadHtml}${innerHtml}
      </div>
    </section>`;
    }

    /* =============================================
       メインレンダリング
       ============================================= */
    function render() {
        // メタ情報
        document.title = SITE.meta.title || "Portfolio";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.content = SITE.meta.description || "";

        // セクション生成
        const app = document.getElementById("app");
        if (!app || !PAGE || !PAGE.sections) return;

        let html = "";
        PAGE.sections.forEach((s, i) => {
            const fn = renderers[s.type];
            if (fn) {
                html += fn(s, i);
            } else {
                console.warn(`[renderer] 未対応のセクションタイプ: "${s.type}"`);
            }
        });
        app.innerHTML = html;

        // ナビ・フッター
        renderNav(PAGE.sections);
        renderFooter();

        // --- フェードイン ---
        const fadeEls = document.querySelectorAll(".fade-in");
        if ("IntersectionObserver" in window) {
            const fadeObs = new IntersectionObserver((entries) => {
                entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-visible"); fadeObs.unobserve(e.target); } });
            }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
            fadeEls.forEach(el => fadeObs.observe(el));
        } else {
            fadeEls.forEach(el => el.classList.add("is-visible"));
        }

        // --- 動画 onerror + 遅延読み込み ---
        const videos = document.querySelectorAll("video[data-src]");
        videos.forEach(v => {
            v.addEventListener("error", function () {
                const src = v.dataset.src || v.src || "";
                const name = src.split("/").pop() || "動画";
                const link = document.createElement("a");
                link.className = "video-error";
                link.href = src;
                link.target = "_blank";
                link.rel = "noopener";
                link.innerHTML = `<span class="video-error__icon">⚠</span><span class="video-error__text">動画を開けませんでした<br>(${esc(name)})<br><small>タップで直接開く →</small></span>`;
                v.replaceWith(link);
            }, { once: true });
        });

        if (videos.length && "IntersectionObserver" in window) {
            const vidObs = new IntersectionObserver((entries) => {
                entries.forEach(e => {
                    const v = e.target;
                    if (e.isIntersecting) {
                        if (!v.src && v.dataset.src) { v.src = v.dataset.src; v.load(); }
                    } else {
                        if (!v.paused) v.pause();
                    }
                });
            }, { threshold: 0.25 });
            videos.forEach(v => vidObs.observe(v));
        } else {
            // IO非対応: click-to-load
            videos.forEach(v => {
                v.addEventListener("click", function loadOnClick() {
                    if (!v.src && v.dataset.src) { v.src = v.dataset.src; v.load(); }
                    v.removeEventListener("click", loadOnClick);
                });
            });
        }

        // --- ナビ現在地ハイライト ---
        const navLinks = document.querySelectorAll(".site-nav__link[href^='#']");
        const sectionEls = Array.from(navLinks).map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);
        if (sectionEls.length && "IntersectionObserver" in window) {
            const secObs = new IntersectionObserver((entries) => {
                entries.forEach(e => {
                    const link = document.querySelector(`.site-nav__link[href="#${e.target.id}"]`);
                    if (link) link.classList.toggle("is-active", e.isIntersecting);
                });
            }, { threshold: 0, rootMargin: `-${getComputedStyle(document.documentElement).getPropertyValue("--nav-height").trim() || "44px"} 0px -60% 0px` });
            sectionEls.forEach(s => secObs.observe(s));
        }
    }

    /* --- DOMContentLoaded で実行 --- */
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", render);
    } else {
        render();
    }

})();
