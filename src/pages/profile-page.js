import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";

export const ProfilePage = () => {
  const { user } = useAuth0();

  if (!user) {
    return null;
    console.log(user, "user not found");
  }

  console.log(user);
  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
         マイページ
        </h1>
        <div className="content__body">
          <p id="page-description">
          <span>
        <strong>ID トークン</strong> を使用して、認証されたユーザーのプロファイル情報を取得できます。
        </span>
        <span>
          <strong>認証されたユーザーのみがこのページにアクセスできます。</strong>
        </span>
          </p>
          <div className="profile-grid">
            <div className="profile__header">
              <div className="profile__headline">
                <h2 className="profile__title">{user.name}</h2>
                <span className="profile__description">{user.email}</span>
              </div>
            </div>
            <div className="profile__details">
              <CodeSnippet
                title="Decoded ID Token"
                code={JSON.stringify(user, null, 2)}
              />
            </div>
          </div>
        </div>
      </div>
   <div>
      
    </div> 


    </PageLayout>
  );
};
