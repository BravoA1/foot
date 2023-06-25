import style from "./Card.module.scss";
import apply_icon from "../../../assets/images/apply.svg";
import close_icon from "../../../assets/images/cancel.svg";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Tooltip } from "react-tooltip";

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
  handleInsertBet,
  handleUpdateBet,
  handleEditPool,
}) {
  function handleLocaleCancelBtnToggle() {
    pool.onEdit = 0;
    handleEditPool(pool);
  }

  const validationSchema = yup.object({
    bet1: yup.number().min(1).max(4),
    bet2: yup.number().min(1).max(4),
    bet3: yup.number().min(1).max(4),
    bet4: yup.number().min(1).max(4),
  });
  const defaultValues = {
    bet1: pool?.bet1,
    bet2: pool?.bet2,
    bet3: pool?.bet3,
    bet4: pool?.bet4,
  };
  const {
    handleSubmit,
    register,
    //formState: { errors, isSubmitting },
    formState: { isSubmitting },
    //setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });
  const submit = handleSubmit((values) => {
    clearErrors();
    values.pool_id = pool.id;
    if (
      defaultValues.bet1 &&
      defaultValues.bet2 &&
      defaultValues.bet3 &&
      defaultValues.bet4
    ) {
      handleUpdateBet(values);
    } else {
      handleInsertBet(values);
    }
  });

  return (
    <div className="d-flex flex-column align-items-center">
      <Tooltip id="bet" />
      <Tooltip id="apply" />
      <Tooltip id="cancel" />
      <form onSubmit={submit}>
        <div className="d-flex flex-column align-items-center">
          <div className={`${style.card}`}>
            <table className={`${style.scoreTable}`}>
              <thead>
                <tr>
                  <th>Teams</th>
                  <th>Bets</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{pool.name1}</td>
                  <td>
                    <input
                      type="number"
                      min={1}
                      max={4}
                      name="bet1"
                      {...register("bet1")}
                      data-tooltip-content="Select the position to bet on"
                      data-tooltip-id="bet"
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>{pool.name2}</td>
                  <td>
                    <input
                      type="number"
                      min={1}
                      max={4}
                      name="bet2"
                      {...register("bet2")}
                      data-tooltip-content="Select the position to bet on"
                      data-tooltip-id="bet"
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>{pool.name3}</td>
                  <td>
                    <input
                      type="number"
                      min={1}
                      max={4}
                      name="bet3"
                      {...register("bet3")}
                      data-tooltip-content="Select the position to bet on"
                      data-tooltip-id="bet"
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>{pool.name4}</td>
                  <td>
                    <input
                      type="number"
                      min={1}
                      max={4}
                      name="bet4"
                      {...register("bet4")}
                      data-tooltip-content="Select the position to bet on"
                      data-tooltip-id="bet"
                    ></input>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="d-flex flex-row align-items-center">
            <button disabled={isSubmitting} className="btnRound">
              <img
                src={apply_icon}
                alt="add"
                data-tooltip-content="Register bet"
                data-tooltip-id="apply"
              />
            </button>
            <button
              onClick={handleLocaleCancelBtnToggle}
              className="btnRound"
              type="button"
            >
              <img
                src={close_icon}
                alt="cancel"
                data-tooltip-content="Cancel betting"
                data-tooltip-id="cancel"
              />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default PoolCardEdition;
