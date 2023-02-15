import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useQuery, useApolloClient } from "@apollo/client";
import { ALL } from "./queries";

import LoginForm from "./components/LoginForm";

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

const App = () => {
  const [page, setPage] = useState("authors");

  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const result = useQuery(ALL, {
    pollInterval: 2000,
  });
  const client = useApolloClient();

  if (result.loading) {
    return <div>loading...</div>;
  }

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };
  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>
      <Notify errorMessage={errorMessage} />
      <Authors show={page === "authors"} result={result} token={token} />
      <Books show={page === "books"} result={result} />
      <NewBook show={page === "add"} setError={notify} />
      <LoginForm
        show={page === "login" && !token}
        setToken={setToken}
        setError={notify}
      />
    </div>
  );
};

export default App;
