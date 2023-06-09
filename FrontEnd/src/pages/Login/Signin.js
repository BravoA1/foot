import { useContext } from "react";
import styles from "./Signin.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../../context/AuthContext";

export default function Signin({ handleClick, loginActive }) {
  const { signin } = useContext(AuthContext);
  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Ce champ doit être saisi")
      .email("Email non valide"),
    password: yup
      .string()
      .required("Ce champ doit être saisi")
      .min(6, "Le mot de passe doit contenir 6 caractères"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    initialValues,
    resolver: yupResolver(validationSchema),
  });

  const submit = handleSubmit(async (values) => {
    console.log(values);
    try {
      clearErrors();
      await signin(values);
    } catch (message) {
      setError("generic", { type: "generic", message });
    }
  });

  return (
    <div
      className={
        loginActive ? `${styles.login} ${styles.active}` : `${styles.login}`
      }
    >
      <form onSubmit={submit}>
        <label className="labelLogin" onClick={handleClick}>
          Sign in
        </label>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          {...register("email")}
        />
        {errors.email && <p className="form-error">{errors.email.message}</p>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <p className="form-error">{errors.password.message}</p>
        )}
        {errors.generic && (
          <p className="form-error">{errors.generic.message}</p>
        )}
        <button disabled={isSubmitting} className="btnLogin">
          Sign in
        </button>
      </form>
    </div>
  );
}
