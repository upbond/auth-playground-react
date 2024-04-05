import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import axios from "axios";

export const ProfilePage = () => {
  const { user } = useAuth0();
  const {person, setPerson} = useState();
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState("");
  const [userInfoUrl, setUserInfoUrl] = useState("");

  // if (!user) {
  //   return null;
  // }
  useEffect(() => {
    async function getUser() {

      let userinfo_url;
      let tkn;
      try {
        tkn = await getAccessTokenSilently();
        setToken(tkn);

        // GET user info endpoint
        const response = await axios.get(
          `${process.env.REACT_APP_LOGIN3_DOMAIN}/.well-known/openid-configuration`,
          {
            headers: {
              "x-account-id": process.env.REACT_APP_ACCOUNT_ID,
            },
          }
        );
        console.log("response", response.data);
        // userinfo_url = response.data.userinfo_endpoint;

        // setUserInfoUrl(userinfo_url)

        if (userinfo_url) {
          // GET userinfo detail from user info API
          const userInfoResp = await axios.get(userinfo_url, {
            headers: {
              Authorization: `Bearer ${tkn}`,
            },
          });
          const user = userInfoResp?.data;
          if (!user) {
            throw new Error("User not Found");
          }
          setPerson(user);
        }
      } catch (error) {
        console.error("Error fetching data:", error.response.data.error);
        if (error?.response?.data?.error === "Not found") {
          // post user info
          await axios.request({
            url: userinfo_url,
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${tkn}`,
            },
            // add extra params here
            
          });
          // GET userinfo detail from user info API
          const userInfoResp = await axios.get(userinfo_url, {
            headers: {
              Authorization: `Bearer ${tkn}`,
            },
          });
          const user = userInfoResp?.data?.data;
          if (!user) {
            throw new Error("User not Found");
          }
          setPerson(user);
        }
      }
    }
    getUser();
  }, []);



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
