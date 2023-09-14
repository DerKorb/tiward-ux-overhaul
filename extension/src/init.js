setTimeout(async function () {
  const files = ["bundle.js.iife.js"];
  for (const file of files) {
    var s = document.createElement("script");
    s.src = chrome.runtime.getURL(file);
    s.onload = function () {
      this.remove();
    };
    // see also "Dynamic values in the injected code" section in this answer
    (document.head || document.documentElement).appendChild(s);
  }
}, 5000);
