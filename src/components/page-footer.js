import React from "react";
import { PageFooterHyperlink } from "./page-footer-hyperlink";

export const PageFooter = () => {
  return (
    <footer className="page-footer">
      <div className="page-footer-grid">
        <div className="page-footer-grid__info">
          <div className="page-footer-info__message">
            <h3 className="f-title">
              UPBOND LOGIN3.0 </h3>
            <p className="page-footer-message__description">
              <PageFooterHyperlink path="https://auth0.com/docs/quickstarts/">
                <span>
                LOGIN3.0を使用して認証を安全に実装しましょう。
                </span>
              </PageFooterHyperlink>
            </p>
          </div>
          <div className="page-footer-info__button">
            <a
              id="create-account-button"
              className="button button--secondary"
              href="https://www.upbond.io/contact"
              target="_blank"
              rel="noreferrer noopener"
            >
              お問い合わせ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
