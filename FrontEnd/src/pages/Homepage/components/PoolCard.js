import style from "./Card.module.scss";
import { Link } from "react-router-dom";
import edit_icon from "../../../assets/images/icon-edit.svg";
import plus_icon from "../../../assets/images/icon-plus.svg";
import { useState, useEffect } from "react";
import { fetchTeamsList } from "../../../apis/teams";
import { updatePool } from "../../../apis/pools";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function PoolCard({ pool, edit }) {
  const [idle, setIdle] = useState(true);
  const [teamsList, setTeamsList] = useState(null);
  useEffect(() => {
    const fetchAndSetTeamsList = async () => {
      const data = await fetchTeamsList();
      console.log(data);
      if (data.length > 0) {
        setTeamsList(data);
      }
    };
    fetchAndSetTeamsList();
  }, []);
  function handleIdleClick() {
    if (idle) {
      setIdle(false);
    } else setIdle(true);
  }
  const validationSchema = yup.object({
    team_1_id: yup.string().required("selectionner une valeur"),
    team_2_id: yup.string().required("selectionner une valeur"),
    team_3_id: yup.string().required("selectionner une valeur"),
    team_4_id: yup.string().required("selectionner une valeur"),
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
      team_1_id: pool.team_1_id,
      team_2_id: pool.team_2_id,
      team_3_id: pool.team_3_id,
      team_4_id: pool.team_4_id,
    },
  });
  const submit = handleSubmit((values) => {
    values.id = pool.id;
    updatePool(values);
    setIdle(true);
    window.location.reload(false);
  });
  return (
    <div className="d-flex flex-column align-items-center">
      {idle ? (
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
        <button onClick={handleIdleClick} className={`${style.icon}`}>
          <img src={edit_icon} alt="add" />
        </button>
      )}
    </div>
  );
}
export default PoolCard;
