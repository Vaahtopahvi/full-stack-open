import axios from "axios";

const PersonForm = (props) => {
  // console.log(props);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.persons.some((person) => person.name === props.newName)) {
      alert(`${props.newName} is already added to phonebook`);
    } else {
      const personObject = { name: props.newName, number: props.newNumber };
      axios
        .post("http://localhost:3001/persons", personObject)
        .then((response) => {
          props.setPersons(props.persons.concat(response.data));
          props.setNewName("");
          props.setNewNumber("");
        });
      // console.log("button clicked");
      // console.log(personObject);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:{" "}
        <input
          value={props.newName}
          onChange={(e) => props.setNewName(e.target.value)}
        />
        <div>
          number:{" "}
          <input
            value={props.newNumber}
            onChange={(e) => props.setNewNumber(e.target.value)}
          />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
