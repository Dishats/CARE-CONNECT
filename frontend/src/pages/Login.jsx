import React, { useState } from 'react';

const Login = () => {
    const [state, setState] = useState('Sign Up');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        // Add form submission logic here
    };

    return (
        <form 
            className="min-h-[80vh] flex justify-center items-center bg-gray-100"
            onSubmit={onSubmitHandler}
        >
            <div className="bg-white p-8 shadow-lg rounded-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-2">
                    {state === 'Sign Up' ? "Create Account" : "Login"}
                </h2>
                <p className="text-gray-500 text-center mb-6">
                    Please {state === 'Sign Up' ? "Sign Up" : "Login"} to book an appointment
                </p>

                {state === 'Sign Up' && (
                    <div className="mb-4">
                        <label className="block text-gray-600 mb-1">Full Name</label>
                        <input 
                            type="text" 
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setName(e.target.value)} 
                            value={name} 
                            required
                        />
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-gray-600 mb-1">Email</label>
                    <input 
                        type="email" 
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email} 
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 mb-1">Password</label>
                    <input 
                        type="password" 
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password} 
                        required
                    />
                </div>

                <button 
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-600 transition"
                >
                    {state === 'Sign Up' ? "Create Account" : "Login"}
                </button>

                <p className="text-center mt-4 text-gray-500">
                    {state === 'Sign Up' ? "Already have an account?" : "Don't have an account?"}{" "}
                    <span 
                        className="text-blue-500 cursor-pointer hover:underline"
                        onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
                    >
                        {state === 'Sign Up' ? "Login" : "Sign Up"}
                    </span>
                </p>
            </div>
        </form>
    );
};

export default Login;
