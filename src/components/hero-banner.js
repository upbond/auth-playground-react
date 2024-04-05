import React from "react";

export const HeroBanner = () => {

  return (
    <div className="hero-banner hero-banner--pink-yellow">
      <div className="hero-banner__logo">
      <img class="mb-3 app-logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfWPnTKe8LNIZqCT0_7MYhxJEeqd9LDODTgm7j73wACQ&s" alt="upbondlogo" width="200" />
      </div>
      <h1 className="hero-banner__headline">LOGIN3.0サンプル</h1>
      <p class="hero-banner__description">
      Login 3.0 SDKを使用した認証フローを示すサンプルアプリケーションです。
    </p>
      <a
        id="code-sample-link"
        target="_blank"
        rel="noopener noreferrer"
        href="https://upbondocs.gitbook.io/wallet/"
        className="button button--secondary"
      >
        ドキュメントを確認する →
      </a>
    </div>
  );
};
