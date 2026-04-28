const Phonebook = (props) => {
  //   console.log(props.luettelo);
  return props.luettelo.map((person) => (
    <p key={person.name}>
      {person.name} {person.number}
    </p>
  ));
};

export default Phonebook;
