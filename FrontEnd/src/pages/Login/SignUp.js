import React from "react";
import styles from "./SignUp.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
//import { useNavigate } from "react-router-dom";
import { createUser } from "../../apis/users";

export default function SignUp({ handleClick, loginActive }) {
  //const navigate = useNavigate();

  const validationSchema = yup.object({
    user_name: yup
      .string()
      .required("Ce champ doit être saisi")
      .min(2, "Au moins deux lettres"),
    user_firstname: yup
      .string()
      .required("Ce champ doit être saisi")
      .min(2, "Au moins deux lettres"),
    user_mail: yup
      .string()
      .required("Ce champ doit être saisi")
      .email("Email non valide"),
    user_password: yup
      .string()
      .required("Ce champ doit être saisi")
      .min(6, "Le mot de passe doit contenir 6 caractères"),
    confirm_password: yup
      .string()
      .required("Ce champ doit être saisi")
      .oneOf(
        [yup.ref("user_password")],
        "les mots de passe ne sont pas identiques"
      ),
  });

  const initialValues = {
    user_name: "",
    user_firstname: "",
    user_mail: "",
    user_password: "",
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
          name="user_name"
          placeholder="Nom"
          {...register("user_name")}
        />
        {errors.user_name && (
          <p className="form-error">{errors.user_name.message}</p>
        )}

        <input
          type="text"
          name="user_firstname"
          placeholder="Prénom"
          {...register("user_firstname")}
        />
        {errors.user_firstname && (
          <p className="form-error">{errors.user_firstname.message}</p>
        )}

        <input
          type="email"
          name="user_mail"
          placeholder="Email"
          {...register("user_mail")}
        />
        {errors.user_mail && (
          <p className="form-error">{errors.user_mail.message}</p>
        )}

        <input
          type="password"
          name="user_password"
          placeholder="Mot de passe"
          {...register("user_password")}
        />
        {errors.user_password && (
          <p className="form-error">{errors.user_password.message}</p>
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
