import React from "react";

export const HeroBanner = () => {
  const logo = "https://cdn.auth0.com/blog/developer-hub/react-logo.svg";

  return (
    <div className="hero-banner hero-banner--pink-yellow">
      <div className="hero-banner__logo">
      <img class="mb-3 app-logo" src="https://da7udebijaype.cloudfront.net/uploads/startups/logos/c915d3a2-faa5-47c1-952c-45432b0ef32f.png?=1661886060" alt="upbondlogo" width="120" />
      </div>
      <h1 className="hero-banner__headline">UPBOND LOGIN3.0</h1>
      <p class="hero-banner__description">
      UpbondのLogin 3.0 SDKを使用した認証フローを示すサンプルアプリケーションです。
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
