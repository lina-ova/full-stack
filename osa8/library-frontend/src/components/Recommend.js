import React, { useState, useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { FAVORITE_GENRE, FIND_BY_GENRE } from "../queries";

const Recommended = ({ show }) => {
  const user = useQuery(FAVORITE_GENRE);
  const [getFavoriteBooks, result] = useLazyQuery(FIND_BY_GENRE);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [favoriteGenre, setFavoriteGenre] = useState();

  useEffect(() => {
    if (result.data && user.data.me) {
      setFavoriteBooks(result.data.allBooks);
      setFavoriteGenre(user.data.me.favoriteGenre);
    }
  }, [setFavoriteBooks, result, user.data.me]);

  useEffect(() => {
    if (user.data.me) {
      getFavoriteBooks({ variables: { genre: user.data.me.favoriteGenre } });
    }
  }, [getFavoriteBooks, user]);

  if (!show) {
    return null;
  }

  return (
    <div>
      <p>
        books in your favorite genre: <b>{favoriteGenre || "no genre :("}</b>
      </p>
      {favoriteBooks.length > 0 ? (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {favoriteBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Sorry, we can't be of any help to you on this.</p>
      )}
    </div>
  );
};

export default Recommended;
