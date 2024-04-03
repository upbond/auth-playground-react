import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import { PageLayout } from "../components/page-layout";
import axios from "axios";

export const ProfilePage = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState("");
  const [userInfoUrl, setUserInfoUrl] = useState("");
  const [user, setUser] = useState({});

  const account_id = process.env.REACT_APP_ACCOUNT_ID;
  const DOMAIN_AUTH =
  process.env.REACT_APP_LOGIN3_DOMAIN ||
  "https://auth-wallet.dev.upbond.io";

  const scope = ["email", "wallet_address", "name", "picture"]

  if (!user) {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    async function getUser() {

      let userinfo_url;
      let tkn;
      try {
        tkn = await getAccessTokenSilently();
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
        userinfo_url = response.data.userinfo_endpoint;
        setUserInfoUrl(userinfo_url)

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
          setUser(user);
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
            data: {
              age: '23',
              gender: 'male',
              address: 'tokyo'
            }
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
          setUser(user);
        }
      }
    }
    getUser();
  }, []);
  

  const handleSubmit = async () => {
    try {
      await axios.request({
        url: userInfoUrl,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        // add extra params here
        data: user,
      });

      // GET userinfo detail from user info API
      const userInfoResp = await axios.get(userInfoUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(userInfoResp);
    } catch (error) {
      console.log(error, "@error");
    }
  };

  const picture = "picture";
  const setState = (key, value) => {
    setUser({
      ...user,
      [key]: value,
    });
  };

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          アカウント情報
        </h1>
        <div className="content__body">
          <div className="profile-grid">
            <div className="profile__details">
              {Object.entries(user).map(
                ([key, value], index) =>
                  scope.includes(key) && (
                    <div key={index}>
                      <label htmlFor={key} className="profile-label">
                        {key
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (char) => char.toUpperCase())}
                      </label>
                      <br />
                      {key === picture ? (
                        <img
                          src={value}
                          alt={"profile-pic"}
                          srcset={value}
                          width={300}
                          height={300}
                          className="profile-pic"
                        />
                      ) : (
                        <input
                          type="text"
                          className="profile-text-input"
                          onChange={(e) =>
                            setState(e.target.name, e.target.value)
                          }
                          name={key}
                          value={value}
                        />
                      )}
                    </div>
                  )
              )}
            </div>
          </div>
          <div className="profile-container-button">
            <button className="profile-save-button" onClick={handleSubmit}>
              編集
            </button>
          </div>
        </div>
      </div>
      <div></div>
    </PageLayout>
  );
};
