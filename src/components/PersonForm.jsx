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
        // APUAAAAAAAAAAAAAAAAAAAAAAAAAAAAA (nimen päivitys)
        const personName = props.persons.find(
          (person) => person.name === props.newName,
        );
        console.log("henkilö", personName, props.newNumber);
        const changedNumber = { ...personName, number: props.newNumber };
        console.log(changedNumber.id);
        personService
          .update(changedNumber.id, changedNumber)
          .then((response) => {
            console.log(response); // käytä responsen dataa
            props.setPersons(
              props.persons.map((person) =>
                changedNumber.id === person.id ? response.data : person,
              ),
            );
          })
          .catch((error) => {
            console.log(error);
            props.setToast({
              message: `Information of ${props.newName} has already been removed from server, please refresh the page`,
              type: "error",
            });
          });
        // onnistumisviesti ja ajastin setToastille
        props.setToast(`Updated ${props.newName}'s number`);

        setTimeout(() => {
          props.setToast(null);
        }, 5000);
        props.setNewName("");
        props.setNewNumber("");
      }
    } else {
      const personObject = { name: props.newName, number: props.newNumber };
      personService.create(personObject).then((response) => {
        props.setPersons(props.persons.concat(response.data));

        // onnistumisviesti ja ajastin setToastille. nice pystyy passaa myös objekteja.
        props.setToast({ message: `Added ${props.newName}`, type: "success" });

        setTimeout(() => {
          props.setToast(null);
        }, 5000);
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
