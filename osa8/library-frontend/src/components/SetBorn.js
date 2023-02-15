import { React, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Select from "react-select";

import { EDIT_YEAR } from "../queries";
const BornForm = ({ authors }) => {
  const [name, setName] = useState();
  const [born, setBorn] = useState("");
  const options = authors.map((author) => ({
    value: author.name,
    label: author.name,
  }));

  const [changeYear] = useMutation(EDIT_YEAR);

  const submit = async (event) => {
    event.preventDefault();

    changeYear({ variables: { name: name.value, setBornTo: Number(born) } });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>Set Birthyear</h2>

      <form onSubmit={submit}>
        <div>
          name
          <Select defaultValue={name} onChange={setName} options={options} />
        </div>
        <div>
          born{" "}
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">change year</button>
      </form>
    </div>
  );
};

export default BornForm;
