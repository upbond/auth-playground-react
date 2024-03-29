import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import axios from "axios";

export const UserinfoPage = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  const account_id = process.env.REACT_APP_ACCOUNT_ID;

  useEffect(() => {
    async function getUser() {
      const DOMAIN_AUTH =
        process.env.REACT_APP_LOGIN30_DOMAIN ||
        "https://auth-wallet.dev.upbond.io";

      try {
        const tkn = await getAccessTokenSilently();
        setToken(tkn);

        // GET user info endpoint
        const response = await axios.get(
          `${DOMAIN_AUTH}/.well-known/openid-configuration`,
          {
            headers: {
              Authorization: `Bearer ${tkn}`,
              "x-account-id": account_id,
            },
          }
        );
        const userinfo_url = response.data.userinfo_endpoint;
        console.log(response.data, account_id)

        if (userinfo_url) {
          // GET userinfo detail from user info API
          const userInfoResp = await axios.get(userinfo_url, {
            headers: {
              Authorization: `Bearer ${tkn}`,
            },
          });
          console.log(userInfoResp?.data)
          const user = userInfoResp?.data?.data;
          if (!user) {
            throw new Error("User not Found");
          }
          setUser(user)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getUser();
  }, []);

  if (!user) {
    return null;
  }

  console.log(user);
  return (
    <PageLayout>
      <div className="content-layout">
        <div className="content__body">
          <div className="profile-grid">
            <div className="float-right">x-account-id: {account_id}</div>
            <div className="profile__header">
              <div className="profile__headline">
                <h2 className="profile__title">Hi {user.name}</h2>
                <span className="profile__description">{user.email}</span>
                <p className="profile__description">Access Token: {token}</p>
              </div>
            </div>
            <div className="profile__details">
              <CodeSnippet
                title="Userinfo Detail"
                code={JSON.stringify(user, null, 2)}
              />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
