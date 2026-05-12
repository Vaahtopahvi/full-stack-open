const Phonebook = (props) => {
  //   console.log(props.luettelo);
  // console.log(props);
  // console.log("moi, katon onks tääl " + props.important);
  return props.luettelo.map((person) => (
    <p key={person.name}>
      {person.name} {person.number}
      <button onClick={() => props.deletePerson(person.id, person.name)}>
        delete
      </button>
    </p>
  ));
};

export default Phonebook;
