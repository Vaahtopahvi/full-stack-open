const Stats = (props) => {
  return (
    <div>
      <p>
        {props.text}
        {props.text && props.amount}
      </p>

      {/* jos avg prop on määritetty, niin renderöi p elementti, joka näyttää avg tekstin ja sum/total laskukaavan tuloksen, muuten ei mitään */}
      {props.avg && (
        <p>
          {props.avg}
          {props.sum !== undefined && props.total !== undefined
            ? (props.sum / props.total).toFixed(2)
            : 0}
        </p>
      )}

      {/* jos avg prop, amount prop, total prop on määritetty, niin renderöi p elementti, joka näyttää avg tekstin ja sum/total laskukaavan tuloksen, muuten ei mitään */}
      {props.good &&
        props.amount !== undefined &&
        props.total !== undefined && (
          <p>
            {props.good}
            {props.total > 0
              ? ((props.amount / props.total) * 100).toFixed(2)
              : 0}
            %
          </p>
        )}
    </div>
  );
};

export default Stats;
