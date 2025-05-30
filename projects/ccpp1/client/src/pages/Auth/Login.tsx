import { Link, useLocation } from "react-router";
import { useLoginMutation, User } from "../../app/services/auth";

const Login = () => {
	const [login, { isLoading: isLoginLoading, error: loginError }] = useLoginMutation();
	const state = useLocation().state;

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		login({email, password} as User);
	};

	return (
		<article className="min-h-screen flex justify-center items-center">
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-md bg-secondary p-4 rounded-xs text-center flex flex-col gap-2"
			>
				{/* title */}
				<h1 className="text-logo text-2xl md:text-3xl font-secondary font-bold mt-4">LogIn</h1>
				{/* error message */}
				{state?.message && <p className="error-message">{state.message}</p>}
				{loginError && <p className="error-message">{loginError}</p>}
				{/* input */}
				<input className="text-field" type="email" name="email" placeholder="Email: " />
				<input className="text-field mt-4" type="password" name="password" placeholder="Password: " />
				{/* buttons */}
				<button className="btn rounded-xs text-sm py-1.5 mt-4" type="submit">
					Login
				</button>
				<button
					className="btn rounded-xs text-sm py-1.5 bg-primary text-logo hover:bg-logo hover:text-primary"
					type="button"
				>
					Guest Login
				</button>
				{/* info */}
				<p className="mt-2 text-xs md:text-sm text-gray-600">
					Don't have an account?
					<Link className="text-logo font-secondary font-bold" to="/signup">
						{" "}
						SignUp
					</Link>
				</p>
			</form>
		</article>
	);
};

export default Login;
