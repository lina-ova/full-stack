import { useState } from "react";
import { useQuery } from "@apollo/client";
import { FIND_BY_GENRE } from "../queries";

const Books = ({ show, genres }) => {
  const [filter, setFilter] = useState();

  const result = useQuery(FIND_BY_GENRE, {
    variables: { genre: filter },
  });

  if (!show || result.loading) {
    return null;
  }

  const books = result.data.allBooks;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button onClick={() => setFilter(genre)}>{genre}</button>
      ))}
      <button onClick={() => setFilter(undefined)}>all genres</button>
    </div>
  );
};

export default Books;
