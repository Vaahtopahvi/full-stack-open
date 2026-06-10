const Filter = (props) => {
  return (
    <div>
      filter shown with{" "}
      <input
        value={props.showFiltered}
        onChange={(e) => props.setShowFiltered(e.target.value)}
      />
    </div>
  );
};
export default Filter;
