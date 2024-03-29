import React from "react";
import { Auth0Feature } from "./auth0-feature";

export const Auth0Features = () => {
  const featuresList = [
    {
      title: "クイックスタートガイド",
      description:
        "このクイックスタートガイドは、開発者がNode.jsアプリケーションを素早くセットアップし、OIDCクライアントライブラリを使用してUpbond Login 3.0と統合するのに役立ちます。基本的なOIDC認証フローを実装するためにこれらの手順に従ってください。",
      resourceUrl: "https://upbondocs.gitbook.io/wallet/login-30gaido/quick-start-guide",
      icon: "https://cdn.auth0.com/blog/hello-auth0/identity-providers-logo.svg",
    },
    {
      title: "Login3.0",
      description:
        "UPBOND Login 3.0と呼ばれる分散型のアイデンティティおよびウォレットサービスと外部のOIDCフロントエンド（FE）クライアントの統合に関する概要を提供しています。この統合の目的は、UPBONDのアイデンティティプロバイダ（IdP）を活用してユーザーを認証し、彼らにウォレットアドレスへの安全で効率的なアクセスを提供することです。",
      resourceUrl: "https://upbondocs.gitbook.io/wallet/nohe/login-3.0",
      icon: "https://cdn.auth0.com/blog/hello-auth0/mfa-logo.svg",
    },
    {
      title: "UPBOND WALLET",
      description:
        "Upbondウォレットは、ユーザーがさまざまな暗号通貨を保存、送信、および受信できる分散型の暗号通貨ウォレットです。",
      resourceUrl: "https://upbondocs.gitbook.io/wallet/services/upbond-wallet",
      icon: "https://cdn.auth0.com/blog/hello-auth0/private-cloud-logo.svg",
    },
    {
      title: "セキュリティ",
      description:
      "IAMポリシーを使用して、最小権限のアクセスを確保しています。これにより、ユーザーやシステムはそれぞれの特定の役割に必要なリソースにのみアクセスできます。",
      resourceUrl: "https://upbondocs.gitbook.io/wallet/security/security-protocols-and-measures",
      icon: "https://cdn.auth0.com/blog/hello-auth0/advanced-protection-logo.svg",
    },
  ];

  return (
    <div className="auth0-features">
      <h2 className="auth0-features__title">サービスの特徴</h2>
      <div className="auth0-features__grid">
        {featuresList.map((feature) => (
          <Auth0Feature
            key={feature.resourceUrl}
            title={feature.title}
            description={feature.description}
            resourceUrl={feature.resourceUrl}
            icon={feature.icon}
          />
        ))}
      </div>
    </div>
  );
};
