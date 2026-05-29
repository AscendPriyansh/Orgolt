import { Link } from "react-router-dom";

function Register() {
    return <div className="h-screen bg-primary text-primary flex">
        <div className="w-1/2 h-full flex-col flex justify-center items-center">
            <div className="flex flex-col gap-1 justify-center items-center">
                <h1 className="text-4xl font-semibold">Create an account</h1>
                <div className="flex gap-1">
                <p className="text-md text-secondary">already have an account?</p>
                <Link to="/login" className="text-blue-800">Login</Link>
                </div>
            </div>
            <div className="mt-10 flex flex-col w-1/2 gap-4">
                <input type="text" placeholder="Name" className="px-3 py-2 bg-secondary rounded-lg outline-0"/>
                <input type="text" placeholder="Username" className="px-3 py-2 bg-secondary rounded-lg outline-0"/>
                <input type="email" placeholder="Email" className="px-3 py-2 bg-secondary rounded-lg outline-0"/>
                <input type="password" placeholder="Password" className="px-3 py-2 bg-secondary rounded-lg outline-0"/>
                <button className="p-2 surface-secondary rounded-lg active:scale-99">Sign up</button>
                <p className="text-xs text-center text-secondary">Made by Priyansh Tiwari</p>
            </div>
        </div>
        <div className="w-1/2 flex justify-center items-center m-4"><img src="https://images.unsplash.com/photo-1779614026411-d326c9744e8c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="register-img" className="w-full h-full object-cover rounded-lg"/></div>
    </div>
}

export default Register;