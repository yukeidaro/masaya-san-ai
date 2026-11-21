/*
 * スライド資料のスマホ表示（読み物モード）
 *
 * Marp のスライドは 1280×720 の SVG を画面幅に縮めて表示するため、
 * スマホ（幅 390px 前後）では本文が 6〜8px 相当まで小さくなり読めない。
 * 画面幅が狭いときだけ、各スライドを「縦に並んだカード」として
 * 等倍・画面幅で流し込み直し、ふつうに縦スクロールで読めるようにする。
 *
 * - PC や横向きの広い画面では何もしない（従来どおりのスライド表示）
 * - Marp が生成した index.html に scripts/inject-deck-mobile.mjs が読み込みタグを足す
 * - テーマの CSS は `svg > foreignObject > section` に紐づくので、DOM 構造は動かさない。
 *   SVG の縮小（viewBox）を 1:1 に置き換え、高さを中身に合わせるだけにする。
 */
(function () {
  "use strict";

  var QUERY = "(max-width: 760px)";
  var CLASS = "deck-reflow";
  var root = document.documentElement;
  var mql = window.matchMedia ? window.matchMedia(QUERY) : null;

  function active() {
    return root.classList.contains(CLASS);
  }

  // ---- 見た目（先に入れて、縮小スライドが一瞬見えるのを防ぐ） ----
  var css = [
    "html." + CLASS + ",html." + CLASS + " body{height:auto!important;min-height:100%;overflow-x:hidden!important;overflow-y:auto!important;background:#e9e6e0!important}",
    "html." + CLASS + " body{margin:0;padding:0 0 32px}",
    "html." + CLASS + " .bespoke-marp-osc,html." + CLASS + " .bespoke-progress-parent{display:none!important}",
    "html." + CLASS + " .bespoke-marp-parent{position:static!important;inset:auto!important;cursor:auto!important}",
    "html." + CLASS + " div.marpit{padding:12px 10px 0}",
    "html." + CLASS + " svg[data-marpit-svg]{position:static!important;display:block!important;width:100%!important;max-width:100%;margin:0 0 12px!important;opacity:1!important;z-index:auto!important;pointer-events:auto!important;content-visibility:visible!important;interactivity:auto!important;transform:none!important;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,.12);overflow:hidden}",
    "html." + CLASS + " svg[data-marpit-svg]>foreignObject>section{width:100%!important;height:auto!important;min-height:0!important;overflow:visible!important;container-type:inline-size!important;transform:none!important;font-size:17px!important;line-height:1.7;padding:28px 20px 36px!important;overflow-wrap:anywhere;word-break:normal}",
    "html." + CLASS + " svg[data-marpit-svg]>foreignObject>section.lead{min-height:220px!important}",
    "html." + CLASS + " svg[data-marpit-svg]>foreignObject>section::after{font-size:12px!important;line-height:1!important;padding:0 14px 10px!important;color:#9a9a9a}",
    "html." + CLASS + " section h1{font-size:1.6em!important;line-height:1.35}",
    "html." + CLASS + " section h2{font-size:1.3em!important;line-height:1.4;margin-top:0}",
    "html." + CLASS + " section h3{font-size:1.1em!important}",
    "html." + CLASS + " section ul,html." + CLASS + " section ol{padding-left:1.2em}",
    "html." + CLASS + " section img,html." + CLASS + " section svg,html." + CLASS + " section video{max-width:100%!important;height:auto!important}",
    "html." + CLASS + " section table{display:block!important;max-width:100%!important;width:auto!important;overflow-x:auto;font-size:.88em!important;-webkit-overflow-scrolling:touch}",
    "html." + CLASS + " section th,html." + CLASS + " section td{min-width:6em;overflow-wrap:normal;word-break:normal}",
    "html." + CLASS + " section pre{max-width:100%;overflow-x:auto;white-space:pre-wrap;word-break:break-word;font-size:.85em}",
    "html." + CLASS + " section blockquote{margin-left:0;margin-right:0}",
    "html." + CLASS + " .deck-mobile-bar{display:flex}",
    ".deck-mobile-bar{display:none;position:sticky;top:0;z-index:10;align-items:center;gap:12px;padding:10px 14px;background:rgba(247,244,239,.94);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);border-bottom:1px solid #dedede;font:600 15px/1.4 -apple-system,BlinkMacSystemFont,'Hiragino Sans','Segoe UI',sans-serif}",
    ".deck-mobile-bar a{color:#b11f4b;text-decoration:none;padding:6px 2px;white-space:nowrap}",
    ".deck-mobile-bar span{color:#5c5c5c;font-weight:500;font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-left:auto}"
  ].join("\n");
  var style = document.createElement("style");
  style.setAttribute("data-deck-mobile", "");
  style.textContent = css;
  (document.head || root).appendChild(style);

  if (!mql) return;
  if (mql.matches) root.classList.add(CLASS);

  // ---- スライド送りの操作を止める ----
  // Marp のスライドショーは touchmove で preventDefault するため、そのままだと縦スクロールできない。
  // 読み物モードの間だけ、スライド送りに使われる入力を Marp に届けない（既定のスクロールは残る）。
  ["touchstart", "touchmove", "touchend", "wheel", "keydown", "mousedown", "mousemove", "mouseup"].forEach(function (type) {
    window.addEventListener(type, function (e) {
      if (active()) e.stopPropagation();
    }, { capture: true, passive: true });
  });

  // ---- スライドの大きさを中身に合わせる ----
  function slides() {
    return Array.prototype.slice.call(document.querySelectorAll("svg[data-marpit-svg]"));
  }

  function remember(svg, fo) {
    if (svg.hasAttribute("data-deck-vb")) return;
    svg.setAttribute("data-deck-vb", svg.getAttribute("viewBox") || "");
    fo.setAttribute("data-deck-w", fo.getAttribute("width") || "");
    fo.setAttribute("data-deck-h", fo.getAttribute("height") || "");
  }

  function fit(svg) {
    var fo = svg.querySelector(":scope > foreignObject");
    var section = fo && fo.querySelector(":scope > section");
    if (!section) return;
    remember(svg, fo);
    if (active()) {
      var w = Math.round(svg.getBoundingClientRect().width) || root.clientWidth;
      fo.setAttribute("width", String(w));
      var h = Math.ceil(section.getBoundingClientRect().height) || 1;
      fo.setAttribute("height", String(h));
      svg.setAttribute("viewBox", "0 0 " + w + " " + h);
      svg.style.setProperty("height", h + "px", "important");
    } else {
      svg.setAttribute("viewBox", svg.getAttribute("data-deck-vb"));
      fo.setAttribute("width", fo.getAttribute("data-deck-w"));
      fo.setAttribute("height", fo.getAttribute("data-deck-h"));
      svg.style.removeProperty("height");
    }
  }

  var queued = false;
  function fitAll() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () {
      queued = false;
      slides().forEach(fit);
    });
  }

  function addBar() {
    if (document.querySelector(".deck-mobile-bar")) return;
    var bar = document.createElement("div");
    bar.className = "deck-mobile-bar";
    var back = document.createElement("a");
    back.href = "../../#materials";
    back.textContent = "← 資料一覧";
    var title = document.createElement("span");
    title.textContent = document.title || "";
    bar.appendChild(back);
    bar.appendChild(title);
    document.body.insertBefore(bar, document.body.firstChild);
  }

  // URL が #3 のようにページ番号を指していたら、そのスライドまでスクロールする
  function jumpToHash() {
    var m = /^#(\d+)/.exec(location.hash || "");
    if (!m || !active()) return;
    var target = slides()[parseInt(m[1], 10) - 1];
    if (target) target.scrollIntoView({ block: "start" });
  }

  function onChange() {
    root.classList.toggle(CLASS, mql.matches);
    fitAll();
  }

  function start() {
    addBar();
    fitAll();
    if ("ResizeObserver" in window) {
      // Mermaid の図や Web フォントの読み込みで中身の高さが変わったら合わせ直す
      var ro = new ResizeObserver(function () { if (active()) fitAll(); });
      slides().forEach(function (svg) {
        var section = svg.querySelector(":scope > foreignObject > section");
        if (section) ro.observe(section);
      });
    }
    requestAnimationFrame(function () { requestAnimationFrame(jumpToHash); });
  }

  if (mql.addEventListener) mql.addEventListener("change", onChange);
  else if (mql.addListener) mql.addListener(onChange);
  window.addEventListener("resize", fitAll);
  window.addEventListener("load", fitAll);

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
