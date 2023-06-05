import { fetchBetsListTournament, updateResultBet } from "../apis/bets";
import { insertResults } from "../apis/results";

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
      let totalBet = 0;
      // optimize me: teams' positions is determined for every bet with (pool_id,user_id) although it doesn't change with pool_id
      const scores = getTeamPositions(bet);
      const first = bet.position1 === scores[0];
      const second = bet.position2 === scores[1];
      const third = bet.position3 === scores[2];
      const fourth = bet.position4 === scores[3];
      const totalMatches = first + second + third + fourth;
      switch (totalMatches) {
        case 4:
          totalBet = 100;
          break;
        case 2:
          totalBet = 10;
          if (first === second) totalBet += 10;
          break;
        case 1:
          totalBet = 1;
          if (first === second) totalBet += 4;
          break;
        default:
          break;
      }
      //insert result in database table bet column resultBet
      updateResultBet(bet.user_id, bet.pool_id, totalBet);
      //keep (userId,result) in a hash map
      if (!listUserResult.has(bet.user_id)) {
        listUserResult.set(bet.user_id, totalBet);
      } else {
        listUserResult.set(
          bet.user_id,
          listUserResult.get(bet.user_id) + totalBet
        );
      }
    }
    //insert total in database table result column resultTournament
    for (const [key, value] of listUserResult) {
      insertResults({
        tournament_id: tournamentId,
        user_id: key,
        resultTournament: value,
      });
    }
  } catch (error) {
    window.alert(`Frontend error catched in endTournament: ${error}`);
  }
}
