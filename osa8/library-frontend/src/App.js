import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Recommendations from "./components/Recommend";
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
  const [favGenre, setFavGenre] = useState(null);

  const result = useQuery(ALL, {
    pollInterval: 2000,
  });
  const client = useApolloClient();

  if (result.loading) {
    return <div>loading...</div>;
  }
  let genres = Array.prototype.concat.apply(
    [],
    result.data.allBooks.map((b) => b.genres)
  );
  genres = [...new Set(genres)];

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
    setPage("authors");
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>
              recommendations
            </button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>
      <Notify errorMessage={errorMessage} />
      <Authors show={page === "authors"} result={result} token={token} />
      <Books show={page === "books"} genres={genres} />
      <NewBook show={page === "add"} setError={notify} />
      <Recommendations show={page === "recommend"} genre={result} />
      <LoginForm
        show={page === "login" && !token}
        setToken={setToken}
        setError={notify}
        setPage={setPage}
      />
    </div>
  );
};

export default App;
