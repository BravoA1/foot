import style from "./Card.module.scss";
import plus_icon from "../../../assets/images/icon-plus.svg";
import { useState, useEffect } from "react";
import { fetchTeamsList } from "../../../apis/teams";
import { insertPool } from "../../../apis/pools";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function PlusCard({ edit }) {
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
    setIdle(!idle);
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
  } = useForm({ resolver: yupResolver(validationSchema) });
  const submit = handleSubmit((values) => {
    insertPool(values);
    setIdle(true);
    window.location.reload(false);
  });
  return (
    <>
      {idle ? (
        <div className={`${style.card}`} onClick={handleIdleClick}>
          <img src={plus_icon} alt="Logo" />
        </div>
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
    </>
  );
}
export default PlusCard;
