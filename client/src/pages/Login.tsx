import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/auth/v1/login",
                {
                    email,
                    password,
                }
            );

            localStorage.setItem("token", response.data.token);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="h-screen bg-primary text-primary flex">
            <div className="w-1/2 flex justify-center items-center m-4">
                <img
                    src="https://images.unsplash.com/photo-1779614026411-d326c9744e8c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="register-img"
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>

            <div className="w-1/2 h-full flex-col flex justify-center items-center">
                <div className="flex flex-col gap-1 justify-center items-center">
                    <h1 className="text-4xl font-semibold">
                        Welcome Back
                    </h1>

                    <div className="flex gap-1">
                        <p className="text-md text-secondary">
                            First time here?
                        </p>

                        <Link
                            to="/register"
                            className="text-blue-800"
                        >
                            Sign up
                        </Link>
                    </div>
                </div>

                <form
                    onSubmit={handleLogin}
                    className="mt-10 flex flex-col w-1/2 gap-4"
                >
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        className="px-3 py-2 bg-secondary rounded-lg outline-0"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        className="px-3 py-2 bg-secondary rounded-lg outline-0"
                    />

                    <button
                        type="submit"
                        className="p-2 surface-secondary rounded-lg active:scale-99"
                    >
                        Sign in
                    </button>

                    <p className="text-xs text-center text-secondary">
                        Made by Priyansh Tiwari
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;