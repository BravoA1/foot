import style from "./Card.module.scss";
import { Link } from "react-router-dom";
import edit_icon from "../../../assets/images/icon-edit.svg";
import plus_icon from "../../../assets/images/icon-plus.svg";
import close_icon from "../../../assets/images/icon-close.svg";
import delete_icon from "../../../assets/images/icon-delete.svg";
import { useState, useEffect } from "react";
import { fetchTeamsList } from "../../../apis/teams";
import { insertPool, updatePool, deletePool } from "../../../apis/pools";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

/*
 * A pool card has 4 states:
 *   - 0 normal: display names of the four teams and stuffs
 *   - 1 superuser create new pool: icon add
 *   - 2 superuser insert new pool: edition is enabled + icon register + icon cancel
 *   - 3 superuser edit not triggered: normal + icon edit at bottom
 *   - 4 superuser update existing pool: edition is enabled + icon register + icon cancel
 */
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

//function PoolCard({ pool, edit, plus }) {
function PoolCard({ pool, mainEditBtnToggled, newPool = false }) {
  const [teamsList, setTeamsList] = useState(null);
  const [localeEditBtnToggled, setLocaleEditBtnToggled] = useState(false);
  useEffect(() => {
    const fetchAndSetTeamsList = async () => {
      const data = await fetchTeamsList();
      //console.log(data);
      if (data.length > 0) {
        setTeamsList(data);
      }
    };
    fetchAndSetTeamsList();
  }, []);
  function handleLocaleEditBtnToggle() {
    setLocaleEditBtnToggled(!localeEditBtnToggled);
  }
  function handleLocaleCancelBtnToggle() {
    setLocaleEditBtnToggled(false);
  }
  async function handleLocaleDeleteBtnToggle() {
    const response = await deletePool(pool);
    console.log(response.json());
    window.location.reload(false);
  }
  const validationSchema = yup.object({
    team_1_id: yup.string().required("sélectionner une valeur"),
    team_2_id: yup.string().required("sélectionner une valeur"),
    team_3_id: yup.string().required("sélectionner une valeur"),
    team_4_id: yup.string().required("sélectionner une valeur"),
  });
  const {
    handleSubmit,
    register,
    //formState: { errors, isSubmitting },
    formState: { isSubmitting },
    //setError,
    //clearErrors,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      team_1_id: pool ? pool.team_1_id : "",
      team_2_id: pool ? pool.team_2_id : "",
      team_3_id: pool ? pool.team_3_id : "",
      team_4_id: pool ? pool.team_4_id : "",
      score1: pool ? pool.score1 : "",
      score2: pool ? pool.score2 : "",
      score3: pool ? pool.score3 : "",
      score4: pool ? pool.score4 : "",
    },
  });
  const submit = handleSubmit((values) => {
    if (newPool) {
      insertPool(values);
      window.location.reload(false);
      return;
    } else {
      values.id = pool.id;
      updatePool(values);
      window.location.reload(false);
      return;
    }
    // if ((state = 2)) insertPool(values);
    // else {
    //   values.id = pool.id;
    //   updatePool(values);
    // }
    // setIdle(true);
    // window.location.reload(false);
  });
  return (
    <div className="d-flex flex-column align-items-center">
      {newPool && !localeEditBtnToggled && (
        <div className={`${style.card}`} onClick={handleLocaleEditBtnToggle}>
          <img src={plus_icon} alt="plus" />
        </div>
      )}
      {!localeEditBtnToggled && !newPool && (
        <Link to={`/login`}>
          <div className={`${style.card}`}>
            <div className={`${style.card_teams}`}>
              <p>{pool.name1}</p>
              <p>{pool.name2}</p>
              <p>{pool.name3}</p>
              <p>{pool.name4}</p>
            </div>
            <div className={`${style.card_scores}`}>
              <p>{pool.score1}</p>
              <p>{pool.score2}</p>
              <p>{pool.score3}</p>
              <p>{pool.score4}</p>
            </div>
          </div>
        </Link>
      )}
      {localeEditBtnToggled && (
        <div className="d-flex flex-column align-items-center">
          <form onSubmit={submit}>
            <div className={`${style.card}`}>
              <div className={`${style.card_teams}`}>
                <p>
                  <select id="team_1_id" {...register("team_1_id")}>
                    {teamsList &&
                      teamsList.map((e) => (
                        <option value={e.id} key={e.id}>
                          {e.name}
                        </option>
                      ))}
                  </select>
                </p>
                <p>
                  <select id="team_2_id" {...register("team_2_id")}>
                    {teamsList &&
                      teamsList.map((e) => (
                        <option value={e.id} key={e.id}>
                          {e.name}
                        </option>
                      ))}
                  </select>
                </p>
                <p>
                  <select id="team_3_id" {...register("team_3_id")}>
                    {teamsList &&
                      teamsList.map((e) => (
                        <option value={e.id} key={e.id}>
                          {e.name}
                        </option>
                      ))}
                  </select>
                </p>
                <p>
                  <select id="team_4_id" {...register("team_4_id")}>
                    {teamsList &&
                      teamsList.map((e) => (
                        <option value={e.id} key={e.id}>
                          {e.name}
                        </option>
                      ))}
                  </select>
                </p>
              </div>
              <div className={`${style.card_scores}`}>
                <p>
                  <input
                    type="number"
                    name="score1"
                    {...register("score1")}
                  ></input>
                </p>
                <p>
                  <input
                    type="number"
                    name="score2"
                    {...register("score2")}
                  ></input>
                </p>
                <p>
                  <input
                    type="number"
                    name="score3"
                    {...register("score3")}
                  ></input>
                </p>
                <p>
                  <input
                    type="number"
                    name="score4"
                    {...register("score4")}
                  ></input>
                </p>
              </div>
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
          </form>
        </div>
      )}
      {!newPool && mainEditBtnToggled && !localeEditBtnToggled && (
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
      )}
    </div>
  );

  /*/
    <div className="d-flex flex-column align-items-center">
      {plus && (
        <div className={`${style.card}`} onClick={handleStateClick}>
          <img src={plus_icon} alt="plus" />
        </div>
      )}
      {pool && idle ? (
        <Link to={`/login`}>
          <div className={`${style.card}`}>
            <div className={`${style.card_teams}`}>
              <p>{pool.name1}</p>
              <p>{pool.name2}</p>
              <p>{pool.name3}</p>
              <p>{pool.name4}</p>
            </div>
            <div className={`${style.card_scores}`}>
              <p>{pool.score1}</p>
              <p>{pool.score2}</p>
              <p>{pool.score3}</p>
              <p>{pool.score4}</p>
            </div>
          </div>
        </Link>
      ) : (
        <div className="d-flex flex-column align-items-center">
          <div className={`${style.card}`}>
            <div className={`${style.card_teams}`}>
              <form onSubmit={submit}>
                <p>
                  <select id="team_1_id" {...register("team_1_id")}>
                    {teamsList &&
                      teamsList.map((e) => (
                        <option value={e.id} key={e.id}>
                          {e.name}
                        </option>
                      ))}
                  </select>
                </p>
                <p>
                  <select id="team_2_id" {...register("team_2_id")}>
                    {teamsList &&
                      teamsList.map((e) => (
                        <option value={e.id} key={e.id}>
                          {e.name}
                        </option>
                      ))}
                  </select>
                </p>
                <p>
                  <select id="team_3_id" {...register("team_3_id")}>
                    {teamsList &&
                      teamsList.map((e) => (
                        <option value={e.id} key={e.id}>
                          {e.name}
                        </option>
                      ))}
                  </select>
                </p>
                <p>
                  <select id="team_4_id" {...register("team_4_id")}>
                    {teamsList &&
                      teamsList.map((e) => (
                        <option value={e.id} key={e.id}>
                          {e.name}
                        </option>
                      ))}
                  </select>
                </p>
                <button disabled={isSubmitting} className={`${style.icon}`}>
                  <img src={plus_icon} alt="add" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {edit && idle && (
        <button onClick={handleStateClick} className={`${style.icon}`}>
          <img src={edit_icon} alt="add" />
        </button>
      )}
    </div>
      */
}
export default PoolCard;
