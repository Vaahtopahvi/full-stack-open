import personService from "../services/persons";

const PersonForm = (props) => {
  // console.log(props);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.persons.some((person) => person.name === props.newName)) {
      window.confirm(
        `${props.newName} is already added to phonebook, replace the old number with a new one?`,
      );
      {
        // APUAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        const personName = props.persons.find(
          (person) => person.name === props.newName,
        );
        console.log("henkilö", personName, props.newNumber);
        const changedNumber = { ...personName, number: props.newNumber };
        console.log(changedNumber.id);
        personService
          .update(changedNumber.id, changedNumber)
          .then((response) => {
            console.log(response);
            props.setPersons(
              props.persons.map((person) =>
                changedNumber.id === person.id ? changedNumber : person,
              ),
            );
            props.setNewName("");
            props.setNewNumber("");
          });
      }
    } else {
      const personObject = { name: props.newName, number: props.newNumber };
      personService.create(personObject).then((response) => {
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
