import StatisticLine from "./StatisticLine";

// paljon cleanimpi koodi...
const Stats = (props) => {
  // jos tekstiä lähetetään tänne, käytä sitä ja amounttia tässä.
  // lähetä StatisticLineen text ja amount, mikä palauttaa p:n, jossa on teksti ja amount.
  if (props.text) {
    return <StatisticLine text={props.text} value={props.amount} />;
  }

  // jos avg lähetetään tänne, laske keskiarvo avgValue muuttujaan, muuten näytä 0.
  // lähetä StatisticLineen "average ", joka on saatu propsina ja avgValue, joka on laskettu edellisessä vaiheessa.
  if (props.avg) {
    const avgValue =
      props.sum !== undefined && props.total !== undefined
        ? (props.sum / props.total).toFixed(2)
        : 0;
    return <StatisticLine text={props.avg} value={avgValue} />;
  }

  // jos good lähetetään tänne, laske goodPercentage muuttujaan goodin prosenttiosuus kokonaisäänistä, muuten näytä null.
  // lähetä StatisticLineen "good% ", joka on saatu propsina ja goodPercentage, joka on laskettu edellisessä vaiheessa.
  // helppo nakki.
  if (props.good) {
    const goodPercentage =
      props.total > 0 ? ((props.amount / props.total) * 100).toFixed(2) : 0;
    return <StatisticLine text={props.good} value={goodPercentage} />;
  }
  return null;
};

export default Stats;
