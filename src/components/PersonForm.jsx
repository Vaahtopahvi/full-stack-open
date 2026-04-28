const PersonForm = (props) => {
  console.log(props);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.persons.some((person) => person.name === props.newName)) {
      alert(`${props.newName} is already added to phonebook`);
    } else {
      const personObject = { name: props.newName, number: props.newNumber };
      // console.log("button clicked");
      // console.log(personObject);

      props.setPersons(props.persons.concat(personObject));
      props.setNewName("");
      props.setNewNumber("");
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
