import PoolCard from "../Homepage/components/PoolCard";

function Rulespage() {
  const pool_full = {
    name1: "France",
    name2: "United States",
    name3: "Spain",
    name4: "Monaco",
    score1: 5,
    score2: 1,
    score3: 8,
    score4: 3,
    bet1: 2,
    bet2: 4,
    bet3: 1,
    bet4: 3,
  };
  const pool_double = {
    name1: "Nederland",
    name2: "Argentina",
    name3: "South Korea",
    name4: "Canada",
    score1: 2,
    score3: 1,
    score2: 5,
    score4: 3,
    bet1: 2,
    bet2: 1,
    bet3: 4,
    bet4: 3,
  };
  const pool_simple = {
    name1: "Luxemburg",
    name2: "Pérou",
    name3: "South Africa",
    name4: "Qatar",
    score1: 6,
    score3: 2,
    score2: 7,
    score4: 3,
    bet1: 1,
    bet2: 3,
    bet3: 4,
    bet4: 2,
  };
  return (
    <div
      className={`d-flex flex-column align-items-center justify-content-center mt10`}
    >
      <h2>Rules</h2>
      <h3>How to bet:</h3>
      <p>Rank each team by pool</p>
      <h3>How the results are determined:</h3>
      <h4>Full house: every positions matches.</h4>
      <p>100 points</p>
      <p>Example:</p>
      <PoolCard pool={pool_full} handleEdit={() => {}} />
      <h4>Pair: Two positions matches</h4>
      <p>10 points</p>
      <p>+10 points if first and second match</p>
      <p>Example:</p>
      <PoolCard pool={pool_double} handleEdit={() => {}} />
      <h4>Simple: One position matches</h4>
      <p>1 point</p>
      <p>+4 points if first matches</p>
      <PoolCard pool={pool_simple} handleEdit={() => {}} />
    </div>
  );
}

export default Rulespage;
