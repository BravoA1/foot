import React from "react";
import styles from "./Signup.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
//import { useNavigate } from "react-router-dom";
import { createUser } from "../../apis/users";

export default function Signup({ handleClick, loginActive }) {
  //const navigate = useNavigate();

  const validationSchema = yup.object({
    username: yup
      .string()
      .required("Ce champ doit être saisi")
      .min(2, "Au moins deux lettres"),
    email: yup
      .string()
      .required("Ce champ doit être saisi")
      .email("Email non valide"),
    password: yup
      .string()
      .required("Ce champ doit être saisi")
      .min(6, "Le mot de passe doit contenir 6 caractères"),
    confirm_password: yup
      .string()
      .required("Ce champ doit être saisi")
      .oneOf([yup.ref("password")], "les mots de passe ne sont pas identiques"),
  });

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
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
      await createUser(values);
      handleClick();
    } catch (message) {
      setError("generic", { type: "generic", message });
    }
  });

  return (
    <div
      className={
        loginActive ? `${styles.signup} ${styles.active}` : `${styles.signup}`
      }
    >
      <form onSubmit={submit}>
        <label onClick={handleClick}>Sign Up</label>

        <input
          type="text"
          name="username"
          placeholder="Username"
          {...register("username")}
        />
        {errors.username && (
          <p className="form-error">{errors.username.message}</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && <p className="form-error">{errors.email.message}</p>}

        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          {...register("password")}
        />
        {errors.password && (
          <p className="form-error">{errors.password.message}</p>
        )}

        <input
          type="password"
          name="confirm_password"
          placeholder="Confirmer votre mot de passe"
          {...register("confirm_password")}
        />
        {errors.confirm_password && (
          <p className="form-error">{errors.confirm_password.message}</p>
        )}
        {errors.generic && (
          <p className="form-error">{errors.generic.message}</p>
        )}
        <button disabled={isSubmitting} className="btnLogin btnSingUp">
          Inscription
        </button>
      </form>
    </div>
  );
}
