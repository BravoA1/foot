import { fetchBetsListTournament, updateResultBet } from "../apis/bets";
import { insertResults } from "../apis/results";
import { setTournamentClosed } from "../apis/tournaments";

export function getTeamPositions(pool) {
  const scores = [pool.score1, pool.score2, pool.score3, pool.score4];

  // Sort the scores in descending order
  const sortedScores = scores.slice().sort((a, b) => b - a);

  // Map the positions based on the sorted scores
  const positions = scores.map((score) => sortedScores.indexOf(score) + 1);

  return positions;
}

export async function endTournament(tournamentId) {
  console.log("endTournament:", endTournament);
  try {
    // check if tournament already closed:
    // const closed = await tournamentIsClosed(tournamentId);
    // if (closed) return;
    // then set it to closed:
    setTournamentClosed(tournamentId);
    const betsList = await fetchBetsListTournament(tournamentId);
    console.log("betsList:", betsList);
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
          if (first) totalBet += 10;
          break;
        case 1:
          totalBet = 1;
          if (first) totalBet += 4;
          break;
        default:
          break;
      }
      console.log(
        `user: ${bet.user_id} pool: ${bet.pool_id}
         correct: ${totalMatches}
         total bet: ${totalBet}`
      );
      //insert result in database table bet column resultBet
      updateResultBet(bet.user_id, bet.pool_id, totalBet);
      //keep (userId,result) in a hash map for total
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
      console.log(
        `user: ${key} 
         tournament: ${tournamentId}
         total tournament: ${value}`
      );
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
