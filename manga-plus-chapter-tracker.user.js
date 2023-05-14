// ==UserScript==
// @name    [Manga Plus] Chapter Tracker
// @author  Aurange
// @version 1.1
// @match   https://mangaplus.shueisha.co.jp/titles/*
// @grant   window.close
// ==/UserScript==

"use strict";

new MutationObserver(function(mutationList, observer){
  let c = document.querySelectorAll("div[class^='ChapterListItem-module_chapterListItem']")[document.querySelectorAll("div[class^='ChapterListItem-module_chapterListItem']").length - 1];

  if(c){
    observer.disconnect();

    let cT = document.querySelector("h1").innerText,
        cN = c.children[0].children[2].innerText.split(/Chapter /i)[1].split(":")[0];

    if(localStorage.getItem(cT) === null) localStorage.setItem(cT, cN);
    else if(Number(cN) > Number(localStorage.getItem(cT))){
      localStorage.setItem(cT, cN);

      window.location.href = "https://mangaplus.shueisha.co.jp/viewer/" + c.children[0].children[0].dataset.src.split("chapter/")[1].split("/chapter")[0];
    }
    else window.close();
  }
}).observe(document, {
  childList: true,
  subtree: true
});
