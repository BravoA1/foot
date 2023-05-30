import style from "./Card.module.scss";
import { Link } from "react-router-dom";
import edit_icon from "../../../assets/images/icon-edit.svg";
import plus_icon from "../../../assets/images/icon-plus.svg";
import close_icon from "../../../assets/images/icon-close.svg";
import delete_icon from "../../../assets/images/icon-delete.svg";
import { useState, useEffect } from "react";
import { fetchTeamsList } from "../../../apis/teams";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

/*
 * A pool card has 3 states:
 *   - 0 normal: display names of the four teams and stuffs
 *   - 1 edit-idle:
 *                 - case new pool: icon add
 *                 - case edit pool: normal + icon edit at bottom
 *   - 2 edit:
 *                 - case new pool: edition is enabled + icon register + icon cancel
 *                 - case edit pool: edition is enabled + icon register + icon cancel
 */

function PoolCardEdition({
  pool,
  newPool = false,
  handleAdd,
  handleDelete,
  handleUpdate,
  handleEdit,
}) {
  const [teamsList, setTeamsList] = useState([]);
  const [newPoolIdle, setNewPoolIdle] = useState(newPool);
  const [team1Id, setTeam1Id] = useState(pool?.team_1_id);
  const [team2Id, setTeam2Id] = useState(pool?.team_2_id);
  const [team3Id, setTeam3Id] = useState(pool?.team_3_id);
  const [team4Id, setTeam4Id] = useState(pool?.team_4_id);
  //const [positionsList, setPositionsList] = useState([]);
  //const [localeEditBtnToggled, setLocaleEditBtnToggled] = useState(false);

  // function getTeamPositions(pool) {
  //   const scores = [pool.score1, pool.score2, pool.score3, pool.score4];

  //   // Sort the scores in descending order
  //   const sortedScores = scores.slice().sort((a, b) => b - a);

  //   // Map the positions based on the sorted scores
  //   const positions = scores.map((score) => sortedScores.indexOf(score) + 1);

  //   return positions;
  // }

  useEffect(() => {
    const fetchAndSetTeamsList = async () => {
      try {
        const data = await fetchTeamsList();
        //const data = await response.json();
        if (data.length > 0) setTeamsList(data);
      } catch (error) {
        console.log("Error fetchAndSetTeamList:", error);
      }
    };
    fetchAndSetTeamsList();
    console.log("PoolCardEdition pool:", pool);
    //   setPositionsList(pool ? getTeamPositions(pool) : []);
    // }, [pool]);
  }, []);
  function handleLocaleEditBtnToggle() {
    setNewPoolIdle(false);
    //setLocaleEditBtnToggled(!localeEditBtnToggled);
  }
  function handleLocaleCancelBtnToggle() {
    //setLocaleEditBtnToggled(false);
    if (newPool) {
      setNewPoolIdle(true);
    } else {
      pool.onEdit = false;
      handleEdit(pool);
    }
  }
  function handleSelectChange(event, select) {
    switch (select) {
      case 1:
        setTeam1Id(event.target.value);
        break;
      case 2:
        setTeam2Id(event.target.value);
        break;
      case 3:
        setTeam3Id(event.target.value);
        break;
      case 4:
        setTeam4Id(event.target.value);
        break;
      default:
        break;
    }
  }
  // async function handleLocaleDeleteBtnToggle() {
  //   handleDelete(pool);
  // }
  const validationSchema = yup.object({
    team_1_id: yup
      .number()
      .typeError("select all nations")
      .notOneOf(
        [yup.ref("team_2_id"), yup.ref("team_3_id"), yup.ref("team_4_id")],
        "already picked"
      ),
    team_2_id: yup
      .number()
      .typeError("select all nations")
      .notOneOf(
        [yup.ref("team_1_id"), yup.ref("team_3_id"), yup.ref("team_4_id")],
        "already picked"
      ),
    team_3_id: yup
      .number()
      .typeError("select all nations")
      .notOneOf(
        [yup.ref("team_2_id"), yup.ref("team_1_id"), yup.ref("team_4_id")],
        "already picked"
      ),
    team_4_id: yup
      .number()
      .typeError("select all nations")
      .notOneOf(
        [yup.ref("team_2_id"), yup.ref("team_3_id"), yup.ref("team_1_id")],
        "already picked"
      ),
  });
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    //formState: { isSubmitting },
    //setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      // team_1_id: "",
      // team_2_id: "",
      // team_3_id: "",
      // team_4_id: "",
      score1: pool?.score1,
      score2: pool?.score2,
      score3: pool?.score3,
      score4: pool?.score4,
    },
  });
  const submit = handleSubmit((values) => {
    clearErrors();
    if (newPool) {
      handleAdd(values);
      //setLocaleEditBtnToggled(false);
    } else {
      values.id = pool.id;
      handleUpdate(values);
      //setLocaleEditBtnToggled(false);
    }
  });
  return (
    <div className="d-flex flex-column align-items-center">
      {newPoolIdle ? (
        <div className={`${style.card}`} onClick={handleLocaleEditBtnToggle}>
          <img src={plus_icon} alt="plus" />
        </div>
      ) : (
        <form onSubmit={submit}>
          <div className="d-flex flex-column align-items-center">
            <div className={`${style.card}`}>
              <table className={`${style.scoreTable}`}>
                <thead>
                  <tr>
                    <th>Teams</th>
                    <th>Scores</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <select
                        id="team_1_id"
                        {...register("team_1_id")}
                        value={team1Id}
                        onChange={(e) => handleSelectChange(e, 1)}
                      >
                        <option value="" disabled>
                          Choose nation
                        </option>
                        {teamsList.map((e) => (
                          <option value={e.id} key={e.id}>
                            {e.name}
                          </option>
                        ))}
                      </select>
                      {errors.team_1_id && (
                        <p className="form-error">{errors.team_1_id.message}</p>
                      )}
                    </td>
                    <td>
                      <input
                        type="number"
                        min={0}
                        name="score1"
                        {...register("score1")}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <select
                        id="team_2_id"
                        {...register("team_2_id")}
                        value={team2Id}
                        onChange={(e) => handleSelectChange(e, 2)}
                      >
                        <option value="" disabled>
                          Choose nation
                        </option>
                        {teamsList &&
                          teamsList.map((e) => (
                            <option value={e.id} key={e.id}>
                              {e.name}
                            </option>
                          ))}
                      </select>
                      {errors.team_2_id && (
                        <p className="form-error">{errors.team_2_id.message}</p>
                      )}
                    </td>
                    <td>
                      <input
                        type="number"
                        min={0}
                        name="score2"
                        {...register("score2")}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <select
                        id="team_3_id"
                        {...register("team_3_id")}
                        value={team3Id}
                        onChange={(e) => handleSelectChange(e, 3)}
                      >
                        <option value="0" disabled>
                          Choose nation
                        </option>
                        {teamsList &&
                          teamsList.map((e) => (
                            <option value={e.id} key={e.id}>
                              {e.name}
                            </option>
                          ))}
                      </select>
                      {errors.team_3_id && (
                        <p className="form-error">{errors.team_3_id.message}</p>
                      )}
                    </td>
                    <td>
                      <input
                        type="number"
                        min={0}
                        name="score3"
                        {...register("score3")}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <select
                        id="team_4_id"
                        {...register("team_4_id")}
                        value={team4Id}
                        onChange={(e) => handleSelectChange(e, 4)}
                      >
                        <option value="0" disabled>
                          Choose nation
                        </option>
                        {teamsList &&
                          teamsList.map((e) => (
                            <option value={e.id} key={e.id}>
                              {e.name}
                            </option>
                          ))}
                      </select>
                      {errors.team_4_id && (
                        <p className="form-error">{errors.team_4_id.message}</p>
                      )}
                    </td>
                    <td>
                      <input
                        type="number"
                        min={0}
                        name="score4"
                        {...register("score4")}
                      ></input>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="d-flex flex-row align-items-center">
              <button disabled={isSubmitting} className={`${style.icon}`}>
                <img src={plus_icon} alt="add" />
              </button>
              <button
                onClick={handleLocaleCancelBtnToggle}
                className={`${style.icon}`}
                type="button"
              >
                <img src={close_icon} alt="cancel" />
              </button>
            </div>
          </div>
        </form>
      )}
      {/* {!newPool && mainEditBtnToggled && !localeEditBtnToggled && (
        <div className="d-flex flex-row align-items-center">
          <button
            onClick={handleLocaleEditBtnToggle}
            className={`${style.icon}`}
          >
            <img src={edit_icon} alt="add" />
          </button>
          <button
            onClick={handleLocaleDeleteBtnToggle}
            className={`${style.icon}`}
          >
            <img src={delete_icon} alt="delete" />
          </button>
        </div>
      )} */}
    </div>
  );
}
export default PoolCardEdition;
