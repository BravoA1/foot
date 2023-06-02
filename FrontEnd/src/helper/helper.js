import { fetchBetsListTournament, updateResultBet } from "../apis/bets";

export function getTeamPositions(pool) {
  const scores = [pool.score1, pool.score2, pool.score3, pool.score4];

  // Sort the scores in descending order
  const sortedScores = scores.slice().sort((a, b) => b - a);

  // Map the positions based on the sorted scores
  const positions = scores.map((score) => sortedScores.indexOf(score) + 1);

  return positions;
}

export async function endTournament(tournamentId) {
  try {
    const betsList = fetchBetsListTournament(tournamentId);
    const listUserResult = new Map();
    for (const bet of betsList) {
      const totalBet = 0;
      const scores = getTeamPositions(bet);
      const first = bet.position1 === scores[0];
      const second = bet.position2 === scores[1];
      const third = bet.position3 === scores[2];
      const fourth = bet.position4 === scores[3];
      const totalMatches = first + second + third + fourth;
      if (totalMatches === 4) {
        totalBet = 100;
      } else if (totalMatches === 2) {
        totalBet = 10;
        if (first === second) totalBet += 10;
      } else if (totalMatches === 1) {
        totalBet = 1;
        if (first === second) totalBet += 4;
      }
      //insert result in database
      updateResultBet(bet.user_id, bet.pool_id, totalBet);
      //keep (userId,result) in a vector
      if (!listUserResult.has(bet.user_id)) {
        listUserResult.set(bet.user_id, totalBet);
      } else {
        listUserResult.set(
          bet.user_id,
          listUserResult.get(bet.user_id) + totalBet
        );
      }
      //insert it in the database
    }
  } catch (error) {
    window.alert(`Frontend error catched in endTournament: ${error}`);
  }
}
