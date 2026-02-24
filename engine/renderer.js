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
     ヘッダー生成
     ============================================= */
  function renderHeader() {
    const headerEl = document.getElementById("site-header");
    if (!headerEl) return;

    const p = SITE.profile;
    const updated = new Date().toISOString().slice(0, 10);

    headerEl.className = "site-header";
    headerEl.innerHTML = `<div class="container">
      <div class="site-header__top">
        <div class="site-header__left">
          <h1 class="site-header__title">PORTFOLIO</h1>
        </div>
        <div class="site-header__right">
          <p class="site-header__label">AI Team向け</p>
        </div>
      </div>
    </div>`;
  }

  /* =============================================
     ナビゲーション生成
     ============================================= */
  function renderNav(sections) {
    const navEl = document.getElementById("site-nav");
    if (!navEl) return;


    // 固定ナビマップ（ID ↔ 表示房)
    var NAV_ITEMS = [
      { label: "イントロ", id: "intro" },
      { label: "スタンス", id: "hero" },
      { label: "ワークフロー", id: "workflow" },
      { label: "プロセス", id: "process-diagram" },
      { label: "事例", id: "cases" },
      { label: "縦型動画制作", id: "case01" },
      { label: "自動化事例", id: "case03" },
      { label: "これまでの制作", id: "other-works" }
    ];

    var sectionLinks = NAV_ITEMS
      .map(function (item) {
        return `<a class="site-nav__link" href="#${item.id}" data-nav-id="${item.id}">${item.label}</a>`;
      })
      .join("");

    navEl.className = "site-nav";
    navEl.setAttribute("aria-label", "ページ内ナビゲーション");
    navEl.innerHTML = `<div class="site-nav__inner" role="list">${sectionLinks}</div>`;
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

  /* ----- profile-intro ----- */
  renderers["profile-intro"] = function (s) {
    // 上部：画像 + 名前（中央寄せ）
    const imgHtml = `<div class="intro__image-wrap">
        <img src="${esc(s.image || "")}" alt="" class="intro__image"
             onerror="this.style.display='none';this.parentNode.classList.add('intro__image-wrap--fallback')">
      </div>`;
    const nameHtml = s.name ? `<p class="intro__name">${esc(s.name)}</p>` : "";
    const affHtml = s.affiliation ? `<p class="intro__affiliation">${esc(s.affiliation)}</p>` : "";

    // headline（2行、左揃えブロック）
    const headlineHtml = (s.headline && s.headline.length)
      ? `<div class="intro__headline">${s.headline.map(l => `<span class="intro__headline-line">${esc(l)}</span>`).join("")}</div>`
      : "";

    // items ループ
    const itemsHtml = (s.items && s.items.length)
      ? `<div class="intro__items">${s.items.map(it => `
          <div class="intro__item">
            <p class="intro__item-title">— ${esc(it.title)}</p>
            <p class="intro__item-body">${nl2br(esc(it.body))}</p>
          </div>`).join("")}</div>`
      : "";

    // 自己紹介末尾の案内リンク
    var jumpHtml = `<p class="intro__jump">
      <a class="intro__jump-link" href="#other-works">実績を見る</a>
      <span class="intro__jump-note">（スクロール）</span>
    </p>`;

    return `<section class="profile-intro" id="${esc(s.id || "")}">
      <div class="container">
        <div class="profile-intro__top">
          ${imgHtml}
          ${nameHtml}
          ${affHtml}
        </div>
        <div class="profile-intro__text">
          ${headlineHtml}
          ${itemsHtml}
          ${jumpHtml}
        </div>
      </div>
    </section>`;
  };

  /* ----- philosophy-bridge ----- */
  renderers["philosophy-bridge"] = function (s) {
    const titleHtml = s.title
      ? `<div class="bridge__title-wrap js-reveal">
           <span class="bridge__title-line bridge__title-line--left"></span>
           <span class="bridge__title-bar"></span>
           <h2 class="bridge__title">${esc(s.title)}</h2>
           <span class="bridge__title-line bridge__title-line--right"></span>
         </div>`
      : "";
    const blocksHtml = (s.blocks || []).map(function (b) {
      return `<p class="bridge__block bridge__block--${esc(b.weight || "light")} js-reveal">${nl2br(esc(b.text || ""))}</p>`;
    }).join("");
    return `<section class="philosophy-bridge" id="${esc(s.id || "")}">
      <div class="container">
        ${titleHtml}
        <div class="bridge__blocks">
          ${blocksHtml}
        </div>
      </div>
    </section>`;
  };

  /* ----- hero-simple ----- */
  renderers["hero-simple"] = function (s) {
    let titleHtml = "";
    if (s.title) {
      if (Array.isArray(s.title)) {
        titleHtml = `<h1 class="hero__title">${s.title.map(line => `<span class="hero-line">${esc(line)}</span>`).join("")}</h1>`;
      } else {
        titleHtml = `<h1 class="hero__title">${nl2br(esc(s.title))}</h1>`;
      }
    }
    const subtitleHtml = s.subtitle ? `<p class="hero__subtitle">${nl2br(esc(s.subtitle))}</p>` : "";
    return `<section class="hero-simple fade-in" id="${s.id || ""}">
      ${titleHtml}
      ${subtitleHtml}
    </section>`;
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
        mediaHtml = `<video class="case-video" data-src="${esc(c.src)}"${posterAttr} controls playsinline preload="metadata" aria-label="Case ${esc(c.id)} 動画"></video>`;
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

  /* ----- process-overview ----- */
  renderers["process-overview"] = function (s, idx) {
    const paras = (s.paragraphs || []).map(p =>
      `<p class="process-overview__text">${nl2br(esc(p))}</p>`
    ).join("");

    return sectionWrap(s, idx, `
      <div class="process-overview__body fade-in">${paras}</div>
    `);
  };

  /* ----- wide-image ----- */
  renderers["wide-image"] = function (s, idx) {
    const fn = s.src ? s.src.split("/").pop() : "";
    const ph = fn ? fn + " をここに配置" : "IMAGE";
    return `
      <section class="wide-image-section fade-in" id="${esc(s.id || "")}">
        <div class="wide-image-wrap">
          <img class="wide-image" data-src="${esc(s.src)}" alt="${esc(s.alt || "")}" loading="lazy" />
          <div class="media-placeholder">${esc(ph)}</div>
        </div>
      </section>`;
  };

  /* ----- content-bridge（セクション間の中継テキスト） ----- */
  renderers["content-bridge"] = function (s) {
    const headingHtml = s.heading ? `<h2 class="bridge__heading section-heading underline--major">${esc(s.heading)}</h2>` : "";
    const subHtml = s.sub ? `<p class="bridge__sub">${esc(s.sub)}</p>` : "";
    const titleHtml = s.title ? `<h3 class="bridge__title">${esc(s.title)}</h3>` : "";
    const textHtml = s.text ? `<p class="bridge__text">${nl2br(esc(s.text))}</p>` : "";
    const leadHtml = s.lead ? `<p class="section__lead">${raw(nl2br(esc(s.lead)))}</p>` : "";

    return `
      <section class="section-container fade-in" id="${esc(s.id || "")}">
        ${headingHtml}
        ${subHtml}
        ${titleHtml}
        ${leadHtml}
        ${textHtml}
      </section>`;
  };

  /* ----- workflow ----- */
  renderers.workflow = function (s, idx) {
    const introHtml = s.intro ? `<p class="workflow__intro">${nl2br(esc(s.intro))}</p>` : "";
    const stepsHtml = (s.steps || []).map(st => `
      <div class="workflow__step fade-in">
        <div class="workflow__step-label">${esc(st.label)}</div>
        ${st.text ? `<div class="workflow__step-text">${esc(st.text)}</div>` : ""}
      </div>`).join("");
    const noteHtml = s.note ? `<p class="workflow__note">${nl2br(esc(s.note))}</p>` : "";

    return sectionWrap(s, idx, `
      ${introHtml}
      <div class="workflow__steps">${stepsHtml}</div>
      ${noteHtml}
    `);
  };

  /* ----- case-detailed（Case 01用の詳細レンダラー） ----- */
  renderers["case-detailed"] = function (s, idx) {
    // 最終動画（side-by-side 対応）
    let finalHtml = "";
    if (s.final) {
      if (s.final.layout === "side-by-side" && s.final.sideText) {
        const fn = s.final.src ? s.final.src.split("/").pop() : "";
        const ph = fn ? fn + " をここに配置" : "VIDEO";
        finalHtml = `
          <div class="case-sidebyside fade-in">
            <div class="case-sidebyside__media">
              <video class="case-media__video" data-src="${esc(s.final.src)}" controls playsinline preload="metadata" style="aspect-ratio:${esc(s.final.ratio || '9/16')}"></video>
              <div class="media-placeholder media-placeholder--vertical">${esc(ph)}</div>
            </div>
            <div class="case-sidebyside__text">
              <p>${nl2br(esc(s.final.sideText))}</p>
            </div>
          </div>`;
      } else {
        finalHtml = renderMediaItem(s.final);
      }
    }

    // 制作フロー画像（最終動画の直下）
    let flowImageHtml = "";
    if (s.flowImage) {
      const flowFileName = s.flowImage.src ? s.flowImage.src.split("/").pop() : "";
      const flowPlaceholder = flowFileName ? flowFileName + " をここに配置" : (s.flowImage.label || "IMAGE");
      flowImageHtml = `
        <div class="subsection fade-in">
          <h4 class="subsection__title">${esc(s.flowImage.title)}</h4>
          <div class="single-media">
            <img class="single-media__image" data-src="${esc(s.flowImage.src)}" alt="${esc(s.flowImage.label || "")}" loading="lazy" style="aspect-ratio:16/9;object-fit:contain" />
            <div class="media-placeholder">${esc(flowPlaceholder)}</div>
          </div>
        </div>`;
    }

    // フック比較（横スクロール）
    let hooksHtml = "";
    if (s.hooks && s.hooks.items) {
      const hookTilesHtml = s.hooks.items.map(hook => {
        const hookFileName = hook.src ? hook.src.split("/").pop() : "";
        const hookPlaceholder = hookFileName ? hookFileName + " をここに配置" : (hook.type || "VIDEO");
        return `
        <div class="hook-tile">
          <div class="hook-tile__media">
            <video class="hook-tile__video" data-src="${esc(hook.src)}" data-hook-video="1" muted loop playsinline preload="metadata"></video>
            <div class="media-placeholder media-placeholder--vertical">${esc(hookPlaceholder)}</div>
          </div>
          <div class="hook-tile__info">
            <div class="hook-tile__type">${esc(hook.type)}</div>
            <p class="hook-tile__intent">${esc(hook.intent)}</p>
          </div>
        </div>`;
      }).join("");

      const decisionHtml = s.hooks.decision ? `
        <div class="hook-decision fade-in">
          <div class="hook-decision__label">${esc(s.hooks.decision)}</div>
          <p class="hook-decision__reason">${esc(s.hooks.reason)}</p>
        </div>` : "";

      const purposeHtml = s.hooks.purpose ? `<p class="subsection__purpose"><strong>目的：</strong>${esc(s.hooks.purpose)}</p>` : "";
      const subtitleHtml = s.hooks.subtitle ? `<p class="subsection__subtitle">${esc(s.hooks.subtitle)}</p>` : "";

      hooksHtml = `
        <div class="subsection fade-in">
          <h4 class="subsection__title">${esc(s.hooks.title)}</h4>
          ${purposeHtml}
          ${subtitleHtml}
          <div class="hooks-grid">${hookTilesHtml}</div>
          ${decisionHtml}
        </div>`;
    }

    // カット割り決め（singleImage対応）
    let storyboardHtml = "";
    if (s.storyboard) {
      if (s.storyboard.singleImage) {
        const fn = s.storyboard.singleImage.split("/").pop();
        const ph = fn ? fn + " をここに配置" : "IMAGE";
        const purposeHtml = s.storyboard.purpose ? `<p class="subsection__purpose"><strong>目的：</strong>${esc(s.storyboard.purpose)}</p>` : "";
        const desc = s.storyboard.description ? `<p class="subsection__subtitle">${esc(s.storyboard.description)}</p>` : "";
        storyboardHtml = `
          <div class="subsection fade-in">
            <h4 class="subsection__title">${esc(s.storyboard.title)}</h4>
            ${purposeHtml}
            ${desc}
            <div class="single-media">
              <img class="single-media__image" data-src="${esc(s.storyboard.singleImage)}" alt="${esc(s.storyboard.title)}" loading="lazy" style="aspect-ratio:16/9;object-fit:contain" />
              <div class="media-placeholder">${esc(ph)}</div>
            </div>
          </div>`;
      } else if (s.storyboard.items) {
        const itemsHtml = s.storyboard.items.map(item => `
          <div class="gallery-item">
            <img class="gallery-item__image" data-src="${esc(item.src)}" alt="${esc(item.label || "")}" loading="lazy" />
            <div class="media-placeholder">${esc(item.label || "IMAGE")}</div>
          </div>`).join("");
        const purposeHtml = s.storyboard.purpose ? `<p class="subsection__purpose"><strong>目的：</strong>${esc(s.storyboard.purpose)}</p>` : "";
        storyboardHtml = `
          <div class="subsection fade-in">
            <h4 class="subsection__title">${esc(s.storyboard.title)}</h4>
            ${purposeHtml}
            <div class="horizontal-scroll hscroll">${itemsHtml}</div>
          </div>`;
      }
    }

    // 主体モデルの当て込み（singleImage対応）
    let blockingHtml = "";
    if (s.blocking) {
      if (s.blocking.singleImage) {
        const fn = s.blocking.singleImage.split("/").pop();
        const ph = fn ? fn + " をここに配置" : "IMAGE";
        const purposeHtml = s.blocking.purpose ? `<p class="subsection__purpose"><strong>目的：</strong>${esc(s.blocking.purpose)}</p>` : "";
        const desc = s.blocking.description ? `<p class="subsection__subtitle">${esc(s.blocking.description)}</p>` : "";
        blockingHtml = `
          <div class="subsection fade-in">
            <h4 class="subsection__title">${esc(s.blocking.title)}</h4>
            ${purposeHtml}
            ${desc}
            <div class="single-media">
              <img class="single-media__image" data-src="${esc(s.blocking.singleImage)}" alt="${esc(s.blocking.title)}" loading="lazy" style="aspect-ratio:16/9;object-fit:contain" />
              <div class="media-placeholder">${esc(ph)}</div>
            </div>
          </div>`;
      } else if (s.blocking.items) {
        const itemsHtml = s.blocking.items.map(item => `
          <div class="gallery-item">
            <img class="gallery-item__image" data-src="${esc(item.src)}" alt="${esc(item.label || "")}" loading="lazy" />
            <div class="media-placeholder">${esc(item.label || "IMAGE")}</div>
          </div>`).join("");
        const purposeHtml = s.blocking.purpose ? `<p class="subsection__purpose"><strong>目的：</strong>${esc(s.blocking.purpose)}</p>` : "";
        blockingHtml = `
          <div class="subsection fade-in">
            <h4 class="subsection__title">${esc(s.blocking.title)}</h4>
            ${purposeHtml}
            <div class="gallery-grid">${itemsHtml}</div>
          </div>`;
      }
    }

    // 開始・終了フレーム固定（halfImage / singleImage対応）
    let startframesHtml = "";
    if (s.startframes) {
      const sfDesc = s.startframes.description ? `<p class="subsection__subtitle">${esc(s.startframes.description)}</p>` : "";
      if (s.startframes.halfImage) {
        const fn = s.startframes.halfImage.split("/").pop();
        const ph = fn ? fn + " をここに配置" : "IMAGE";
        const purposeHtml = s.startframes.purpose ? `<p class="subsection__purpose"><strong>目的：</strong>${esc(s.startframes.purpose)}</p>` : "";
        startframesHtml = `
          <div class="subsection fade-in">
            <h4 class="subsection__title">${esc(s.startframes.title)}</h4>
            ${purposeHtml}
            ${sfDesc}
            <div class="half-media">
              <img class="half-media__img" data-src="${esc(s.startframes.halfImage)}" alt="${esc(s.startframes.title)}" loading="lazy" />
              <div class="media-placeholder">${esc(ph)}</div>
            </div>
          </div>`;
      } else if (s.startframes.singleImage) {
        const fn = s.startframes.singleImage.split("/").pop();
        const ph = fn ? fn + " をここに配置" : "IMAGE";
        const purposeHtml = s.startframes.purpose ? `<p class="subsection__purpose"><strong>目的：</strong>${esc(s.startframes.purpose)}</p>` : "";
        startframesHtml = `
          <div class="subsection fade-in">
            <h4 class="subsection__title">${esc(s.startframes.title)}</h4>
            ${purposeHtml}
            ${sfDesc}
            <div class="single-media">
              <img class="single-media__image" data-src="${esc(s.startframes.singleImage)}" alt="${esc(s.startframes.title)}" loading="lazy" style="aspect-ratio:16/9;object-fit:contain" />
              <div class="media-placeholder">${esc(ph)}</div>
            </div>
          </div>`;
      } else if (s.startframes.items) {
        const itemsHtml = s.startframes.items.map(item => `
          <div class="gallery-item">
            <img class="gallery-item__image" data-src="${esc(item.src)}" alt="${esc(item.label || "")}" loading="lazy" />
            <div class="media-placeholder">${esc(item.label || "IMAGE")}</div>
          </div>`).join("");
        const purposeHtml = s.startframes.purpose ? `<p class="subsection__purpose"><strong>目的：</strong>${esc(s.startframes.purpose)}</p>` : "";
        startframesHtml = `
          <div class="subsection fade-in">
            <h4 class="subsection__title">${esc(s.startframes.title)}</h4>
            ${purposeHtml}
            <div class="gallery-grid">${itemsHtml}</div>
          </div>`;
      }
    }

    // AE仕上げ / 制作フロー（画像 or 自動再生MP4）
    let aeTimelineHtml = "";
    if (s.aeTimeline) {
      const aeDesc = s.aeTimeline.description ? `<p class="subsection__subtitle">${esc(s.aeTimeline.description)}</p>` : "";
      const aeFn = s.aeTimeline.src ? s.aeTimeline.src.split("/").pop() : "";
      const aePh = aeFn ? aeFn + " をここに配置" : (s.aeTimeline.type === "video" ? "VIDEO" : "IMAGE");
      let aeMediaHtml;
      if (s.aeTimeline.type === "video") {
        const ratioStyle = s.aeTimeline.ratio ? ` style="aspect-ratio:${esc(s.aeTimeline.ratio)};width:100%;object-fit:contain"` : "";
        aeMediaHtml = `
          <div class="wide-video-wrap">
            <video class="wide-video" data-src="${esc(s.aeTimeline.src)}" data-autoplay-video="1" muted loop playsinline preload="metadata"${ratioStyle}></video>
            <div class="media-placeholder" style="aspect-ratio:${esc(s.aeTimeline.ratio || '1920/540')}">${esc(aePh)}</div>
          </div>`;
      } else {
        const ratioStyle = ` style="aspect-ratio: 1920/540; width: 100%; object-fit: contain;"`;
        aeMediaHtml = `
          <div class="single-media" ${ratioStyle}>
            <img class="single-media__image" data-src="${esc(s.aeTimeline.src)}" alt="${esc(s.aeTimeline.label || "")}" loading="lazy" />
            <div class="media-placeholder">${esc(aePh)}</div>
          </div>`;
      }
      const purposeHtml = s.aeTimeline.purpose ? `<p class="subsection__purpose"><strong>目的：</strong>${esc(s.aeTimeline.purpose)}</p>` : "";
      aeTimelineHtml = `
        <div class="subsection fade-in">
          <h4 class="subsection__title">${esc(s.aeTimeline.title)}</h4>
          ${purposeHtml}
          ${aeDesc}
          ${aeMediaHtml}
        </div>`;
    }

    // FAILMAP
    let failmapHtml = "";
    if (s.failmap) {
      const fmDesc = s.failmap.description ? `<p class="subsection__subtitle">${esc(s.failmap.description)}</p>` : "";
      let fmImageHtml = "";
      if (s.failmap.halfImage) {
        const fn = s.failmap.halfImage.split("/").pop();
        const ph = fn ? fn + " をここに配置" : "IMAGE";
        fmImageHtml = `
          <div class="half-media">
            <img class="half-media__img" data-src="${esc(s.failmap.halfImage)}" alt="${esc(s.failmap.title)}" loading="lazy" />
            <div class="media-placeholder">${esc(ph)}</div>
          </div>`;
      }
      failmapHtml = `
        <div class="subsection fade-in">
          <h4 class="subsection__title">${esc(s.failmap.title)}</h4>
          ${fmDesc}
          ${fmImageHtml}
        </div>`;
    }

    // 詳細ドロップダウン
    let detailsHtml = "";
    if (s.details) {
      detailsHtml = `
        <details class="dropdown fade-in">
          <summary class="dropdown__summary">${esc(s.details.title)}</summary>
          <div class="dropdown__content">${nl2br(esc(s.details.content))}</div>
        </details>`;
    }

    return sectionWrap(s, idx, `
      <div class="case-header fade-in">
        <div class="case-number">Case ${esc(s.number)}</div>
        <h3 class="case-title">${esc(s.title)}</h3>
      </div>
      <p class="case-description fade-in">${nl2br(esc(s.description))}</p>
      ${finalHtml}
      ${flowImageHtml}
      ${hooksHtml}
      ${storyboardHtml}
      ${blockingHtml}
      ${startframesHtml}
      ${aeTimelineHtml}
      ${failmapHtml}
      ${detailsHtml}
    `, true);
  };

  /* ----- case-standard（Case 02/03用の標準レンダラー） ----- */
  renderers["case-standard"] = function (s, idx) {
    const mediaHtml = (s.media || []).map(m => renderMediaItem(m)).join("");

    let detailsHtml = "";
    if (s.details) {
      detailsHtml = `
        <details class="dropdown fade-in">
          <summary class="dropdown__summary">${esc(s.details.title)}</summary>
          <div class="dropdown__content">${nl2br(esc(s.details.content))}</div>
        </details>`;
    }

    return sectionWrap(s, idx, `
      <div class="case-header fade-in">
        <div class="case-number">Case ${esc(s.number)}</div>
        <h3 class="case-title">${esc(s.title)}</h3>
      </div>
      <p class="case-description fade-in">${nl2br(esc(s.description))}</p>
      <div class="case-media-grid">${mediaHtml}</div>
      ${detailsHtml}
    `, true);
  };

  /* ----- other-works-categorized（3カテゴリ版） ----- */
  renderers["other-works-categorized"] = function (s, idx) {
    const introHtml = s.intro ? `<p class="other-works__intro fade-in">${nl2br(esc(s.intro))}</p>` : "";

    const categoriesHtml = (s.categories || []).map(cat => {
      const itemsHtml = (cat.items || []).map((item, i) => {
        const owFileName = item.src ? item.src.split("/").pop() : "";
        const owPlaceholder = owFileName ? owFileName + " をここに配置" : (item.label || (item.type === "video" ? "VIDEO" : "IMAGE"));
        const ratioVal = item.ratio || item.aspect;
        const ratioStyle = ratioVal && ratioVal !== "auto" ? ` style="aspect-ratio:${ratioVal.replace(":", "/")}"` : "";

        let captionHtml = "";
        if (item.caption) {
          const cTitle = item.caption.title ? `<div class="other-works__caption-title">${esc(item.caption.title)}</div>` : "";
          const cBody = item.caption.body ? `<div class="other-works__caption-body">${esc(item.caption.body)}</div>` : "";
          captionHtml = `<div class="other-works__caption">
            <div class="other-works__caption-inner">${cTitle}${cBody}</div>
          </div>`;
        }

        if (item.type === "video") {
          return `<div class="other-works__item fade-in">
            <video class="other-works__video" data-src="${esc(item.src)}" muted loop playsinline preload="metadata"${ratioStyle}></video>
            <div class="media-placeholder media-placeholder--vertical">${esc(owPlaceholder)}</div>
            ${captionHtml}
          </div>`;
        } else {
          return `<div class="other-works__item fade-in">
            <img class="other-works__image" data-src="${esc(item.src)}" alt="${esc(item.label || "")}" loading="lazy"${ratioStyle} />
            <div class="media-placeholder">${esc(owPlaceholder)}</div>
            ${captionHtml}
          </div>`;
        }
      }).join("");

      const policyHtml = cat.policy ? `<p class="other-works__category-policy">${esc(cat.policy)}</p>` : "";

      return `
        <div class="other-works__category fade-in">
          <h4 class="other-works__category-title section-heading underline--mid">${esc(cat.title)}</h4>
          ${policyHtml}
          <div class="other-works__grid">${itemsHtml}</div>
        </div>`;
    }).join("");

    return sectionWrap(s, idx, `
      ${introHtml}
      ${categoriesHtml}
    `);
  };

  /* ----- ヘルパー: メディアアイテムレンダリング ----- */
  function renderMediaItem(m) {
    // --- 任意メタからインラインスタイルを生成（未指定時は空文字） ---
    const mediaStyles = [];
    // ratio および aspect の両方をサポート（ratio 優先）
    const ratioVal = m.ratio || m.aspect;
    if (ratioVal && ratioVal !== "auto") {
      mediaStyles.push("aspect-ratio:" + ratioVal.replace(":", "/"));
    }
    if (m.fit) {
      mediaStyles.push("object-fit:" + m.fit);
    }
    const mediaStyleAttr = mediaStyles.length ? ` style="${mediaStyles.join(";")}"` : "";

    // span: グリッドで横2列占有（未指定 or 1 は何もしない）
    const wrapStyles = [];
    if (m.span && m.span > 1) {
      wrapStyles.push("grid-column:span " + m.span);
    }
    const wrapStyleAttr = wrapStyles.length ? ` style="${wrapStyles.join(";")}"` : "";

    // ファイル名を抽出してUIガイド文言を生成
    const fileName = m.src ? m.src.split("/").pop() : "";
    const placeholderText = fileName ? fileName + " をここに配置" : (m.label || (m.type === "video" ? "VIDEO" : "IMAGE"));

    const label = m.label ? `<div class="case-media__label">${esc(m.label)}</div>` : "";
    if (m.type === "video") {
      return `<div class="case-media fade-in"${wrapStyleAttr}>
        <video class="case-media__video" data-src="${esc(m.src)}" controls playsinline preload="metadata"${mediaStyleAttr}></video>
        <div class="media-placeholder media-placeholder--vertical">${esc(placeholderText)}</div>
        ${label}
      </div>`;
    } else {
      return `<div class="case-media fade-in"${wrapStyleAttr}>
        <img class="case-media__image" data-src="${esc(m.src)}" alt="${esc(m.label || "")}" loading="lazy"${mediaStyleAttr} />
        <div class="media-placeholder">${esc(placeholderText)}</div>
        ${label}
      </div>`;
    }
  }

  /* ----- case（旧版、互換性のため残す） ----- */
  renderers.case = function (s, idx) {
    const mediaHtml = (s.media || []).map(m => {
      const label = m.label ? `<div class="case-media__label">${esc(m.label)}</div>` : "";
      if (m.type === "video") {
        return `<div class="case-media fade-in">
          <video class="case-media__video" data-src="${esc(m.src)}" controls playsinline preload="metadata"></video>
          <div class="media-placeholder">${esc(m.label || "VIDEO")}</div>
          ${label}
        </div>`;
      } else {
        return `<div class="case-media fade-in">
          <img class="case-media__image" data-src="${esc(m.src)}" alt="${esc(m.label || "")}" loading="lazy" />
          <div class="media-placeholder">${esc(m.label || "IMAGE")}</div>
          ${label}
        </div>`;
      }
    }).join("");

    return sectionWrap(s, idx, `
      <div class="case-header fade-in">
        <div class="case-number">Case ${esc(s.number)}</div>
        <h3 class="case-title">${esc(s.title)}</h3>
      </div>
      <p class="case-description fade-in">${nl2br(esc(s.description))}</p>
      <div class="case-media-grid">${mediaHtml}</div>
    `, true);
  };

  /* ----- other-works ----- */
  renderers["other-works"] = function (s, idx) {
    const introHtml = s.intro ? `<p class="other-works__intro fade-in">${nl2br(esc(s.intro))}</p>` : "";
    const itemsHtml = (s.items || []).map(item => {
      if (item.type === "image") {
        return `<div class="other-works__item fade-in">
          <img class="other-works__image" data-src="${esc(item.src)}" alt="${esc(item.label || "")}" loading="lazy" />
          <div class="media-placeholder">${esc(item.label || "IMAGE")}</div>
        </div>`;
      }
      return "";
    }).join("");

    return sectionWrap(s, idx, `
      ${introHtml}
      <div class="other-works__grid">${itemsHtml}</div>
    `);
  };

  /* ----- contact ----- */
  renderers.contact = function (s, idx) {
    const p = SITE.profile;
    return sectionWrap(s, idx, `
      <div class="contact fade-in">
        <h3 class="contact__title">Contact</h3>
        <p class="contact__email"><a href="mailto:${esc(p.email)}">${esc(p.email)}</a></p>
      </div>
    `, true);
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

  /* ----- image-gallery ----- */
  renderers["image-gallery"] = function (s, idx) {
    const categoriesHtml = (s.categories || []).map(cat => {
      const cardsHtml = Array.from({ length: cat.slots }, (_, i) => {
        const num = String(i + 1).padStart(2, '0');
        const label = `${cat.id.toUpperCase()}_${num}`;
        const imagePath = `${cat.basePath}${num}`;

        return `
                    <div class="image-slot" style="aspect-ratio: ${cat.aspectRatio}" data-path="${esc(imagePath)}" data-label="${esc(label)}">
                        <img class="image-slot__img" alt="${esc(label)}" loading="lazy" />
                        <div class="image-slot__placeholder">${esc(label)}</div>
                    </div>
                `;
      }).join('');

      return `
                <div class="image-category">
                    <h3 class="image-category__title">${esc(cat.title)}</h3>
                    <div class="image-grid">${cardsHtml}</div>
                </div>
            `;
    }).join('');

    return sectionWrap(s, idx, categoriesHtml);
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
    const titleHtml = s.title ? `<h2 class="section__title section-heading underline--major">${esc(s.title)}</h2>` : "";
    const leadHtml = s.lead ? `<p class="section__lead">${raw(nl2br(esc(s.lead)))}</p>` : "";

    return `<section class="section-container fade-in ${bgClass}" id="${s.id || ""}">
      ${numHtml}${titleHtml}${leadHtml}${innerHtml}
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

    // ヘッダー・ナビ・フッター
    renderHeader();
    renderNav(PAGE.sections);
    renderFooter();

    // --- メディア読み込み（画像・動画） ---
    const mediaItems = document.querySelectorAll('[data-src]');
    mediaItems.forEach(item => {
      const src = item.dataset.src;
      const placeholder = item.nextElementSibling;

      if (item.tagName === 'VIDEO') {
        // 動画の場合
        const testVideo = document.createElement('video');
        testVideo.onloadedmetadata = function () {
          item.src = src;
          item.style.display = 'block';
          if (placeholder && placeholder.classList.contains('media-placeholder')) {
            placeholder.style.display = 'none';
          }
        };
        testVideo.onerror = function () {
          item.style.display = 'none';
        };
        testVideo.src = src;
      } else if (item.tagName === 'IMG') {
        // 画像の場合
        const testImg = new Image();
        testImg.onload = function () {
          item.src = src;
          item.style.display = 'block';
          if (placeholder && placeholder.classList.contains('media-placeholder')) {
            placeholder.style.display = 'none';
          }
        };
        testImg.onerror = function () {
          item.style.display = 'none';
        };
        testImg.src = src;
      }
    });

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

    // --- 画像スロット読み込み ---
    const imageSlots = document.querySelectorAll('.image-slot');
    imageSlots.forEach(slot => {
      const basePath = slot.dataset.path;
      const img = slot.querySelector('.image-slot__img');
      const extensions = ['png', 'jpg', 'jpeg', 'webp'];

      function tryLoadImage(index) {
        if (index >= extensions.length) {
          // すべての拡張子で失敗 → プレースホルダ表示
          img.style.display = 'none';
          return;
        }

        const testImg = new Image();
        testImg.onload = function () {
          img.src = `${basePath}.${extensions[index]}`;
          slot.classList.add('has-image');
        };
        testImg.onerror = function () {
          tryLoadImage(index + 1);
        };
        testImg.src = `${basePath}.${extensions[index]}`;
      }

      tryLoadImage(0);
    });

    // --- 自動再生動画: 表示中だけ再生（IntersectionObserver） ---
    // data-hook-video（フック比較）と data-autoplay-video（横長MP4等）を統合
    const autoVideos = document.querySelectorAll('video[data-hook-video], video[data-autoplay-video]');
    if (autoVideos.length && "IntersectionObserver" in window) {
      // viewport内で40%以上見えたら再生、外れたら停止＋巻き戻し
      const autoObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          const v = e.target;
          if (e.isIntersecting) {
            try { v.play().catch(function () { }); } catch (err) { /* ignore */ }
          } else {
            v.pause();
            v.currentTime = 0;
          }
        });
      }, { threshold: 0.4 });
      autoVideos.forEach(v => autoObs.observe(v));
    }

    // --- Other Works 動画: 表示中だけ自動再生（muted + loop） ---
    const owVideos = document.querySelectorAll('video.other-works__video');
    if (owVideos.length && "IntersectionObserver" in window) {
      const owObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          const v = e.target;
          if (e.isIntersecting) {
            v.muted = true; // 強制ミュート
            if (!v.src && v.dataset.src) { v.src = v.dataset.src; v.load(); }
            try {
              const playPromise = v.play();
              if (playPromise !== undefined) {
                playPromise.catch(() => { /* 自動再生ブロック対応 */ });
              }
            } catch (err) { /* ignore */ }
          } else {
            v.pause();
            v.currentTime = 0; // 画面外でリセット
          }
        });
      }, { threshold: 0.1 });
      owVideos.forEach(v => {
        v.muted = true;
        owObs.observe(v);
      });
    }

    // --- Other Works 画像: 表示中だけ読み込み開始 ---
    const owImages = document.querySelectorAll('img.other-works__image');
    if (owImages.length && "IntersectionObserver" in window) {
      const imgObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const img = e.target;
            if (!img.src && img.dataset.src) {
              img.src = img.dataset.src;
              img.onload = () => {
                // 読み込み完了後に枠を表示
                img.closest('.other-works__item').classList.add('has-image');
              };
            }
            imgObs.unobserve(img); // 一度読み込んだら監視終了
          }
        });
      }, { threshold: 0.1 });
      owImages.forEach(img => imgObs.observe(img));
    }

    // --- Section Heading Reveal: 右から伸びるアンダーライン演出の発火 ---
    const headingBlocks = document.querySelectorAll('.section-heading');
    if (headingBlocks.length && "IntersectionObserver" in window) {
      const headingObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('is-inview');
            headingObs.unobserve(e.target); // 1回のみ実行
          }
        });
      }, { threshold: 0.3 }); // 30%見えたら発火
      headingBlocks.forEach(b => headingObs.observe(b));
    }
  }

  /* --- DOMContentLoaded で実行 --- */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      render();
      initDragScroll();
    });
  } else {
    render();
    initDragScroll();
  }

  /* =============================================
     ドラッグスクロール機能
     ============================================= */
  function initDragScroll() {
    const containers = document.querySelectorAll('.hscroll');

    containers.forEach(container => {
      let isDown = false;
      let startX;
      let scrollLeft;
      let hasMoved = false;

      container.addEventListener('pointerdown', (e) => {
        // リンクやボタンのクリックを妨げないため、特定の要素は除外
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;

        isDown = true;
        hasMoved = false;
        container.style.cursor = 'grabbing';
        container.style.userSelect = 'none';
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      });

      container.addEventListener('pointerleave', () => {
        isDown = false;
        container.style.cursor = 'grab';
        container.style.userSelect = '';
      });

      container.addEventListener('pointerup', () => {
        isDown = false;
        container.style.cursor = 'grab';
        container.style.userSelect = '';
      });

      container.addEventListener('pointermove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 1.5; // スクロール速度調整
        if (Math.abs(walk) > 5) hasMoved = true; // しきい値5px
        container.scrollLeft = scrollLeft - walk;
      });

      // クリックイベントを壊さないための処理
      container.addEventListener('click', (e) => {
        if (hasMoved) {
          e.preventDefault();
          e.stopPropagation();
        }
      }, true);
    });
  }


  /* ----- Reveal Animation（.js-reveal） ----- */
  function initReveal() {
    document.querySelectorAll(".js-reveal").forEach(function (el) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            obs.unobserve(el);
          }
        });
      }, { threshold: 0.25 });
      obs.observe(el);
    });
  }
  initReveal();

  /* ----- アクティブナビハイライト ----- */
  function initActiveNav() {
    var navLinks = document.querySelectorAll('.site-nav__link[data-nav-id]');
    if (!navLinks.length) return;

    var sectionIds = Array.from(navLinks).map(function (a) { return a.dataset.navId; });

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (a) {
            a.classList.toggle('is-active', a.dataset.navId === entry.target.id);
          });
        }
      });
    }, { threshold: 0.2, rootMargin: '-10% 0px -70% 0px' });

    sectionIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) obs.observe(el);
    });
  }
  initActiveNav();

})();

