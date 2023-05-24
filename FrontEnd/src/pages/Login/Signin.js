import { useContext } from "react";
import styles from "./Signin.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Signin({ handleClick, loginActive }) {
	const { signin } = useContext(AuthContext);
	const validationSchema = yup.object({
		user_mail: yup
			.string()
			.required("Ce champ doit être saisi")
			.email("Email non valide"),
		user_password: yup
			.string()
			.required("Ce champ doit être saisi")
			.min(6, "Le mot de passe doit contenir 6 caractères"),
	});

	const initialValues = {
		user_mail: "",
		user_password: "",
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
					Connexion
				</label>
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
				{errors.generic && (
					<p className="form-error">{errors.generic.message}</p>
				)}
				<button disabled={isSubmitting} className="btnLogin">
					Connexion
				</button>
				<Link to="/forgotpassword">
					<p className={`${styles.forgetPassword}`}>Mot de passe oublié?</p>
				</Link>
			</form>
		</div>
	);
}
