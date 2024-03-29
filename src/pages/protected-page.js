import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const domain = process.env.REACT_APP_LOGIN30_DOMAIN;
  const clientId = process.env.REACT_APP_LOGIN30_CLIENT_ID;
  const accountID= process.env.REACT_APP_ACCOUNT_ID;
  const redirectUri = window.location.origin;


export const ProtectedPage = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);


  const token = getAccessTokenSilently();
  console.log(token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${domain}/.well-known/openid-configuration`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "x-account-id": accountID,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();

    // Cleanup function to cancel the axios request
    return () => {
      // Cancel the request if component is unmounted
    };
  }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

  if (error) {
    return <div>エラーメッセージ: {error.message}</div>;
  } else if (!data) {
    return <div>ローディング...</div>;
  } else {
    return (
      <div>
        <h1>取得したデータ</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  }

};
