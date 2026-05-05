import { useState } from "react";
import type { FormEvent } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type Account = {
    email: string,
    password: string,
}
const apiBaseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000/api';

const Login = () => {
    const [form, setForm] = useState<Account>({
        email: "",
        password: "",
    });
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e?: FormEvent) => {
        if (e) e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await axios.post(`${apiBaseURL}/login`, form);
            login(response.data.token, response.data.user);
            alert()
            navigate("/admin");
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || "An error occurred during login");
        } finally {
            setIsLoading(false);
        }
    }

    const handleChange = (key: string, value: string) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <div className={`w-full gap-4 h-screen justify-content-center items-center`}
            style={{ display: 'flex', gap: '4px', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', justifyContent: 'center', alignItems: "center", backgroundColor: '#333' }}>
            <form onSubmit={handleLogin} className="flex flex-col max-w-xl mx-auto" style={{ display: 'flex', background: '#f5f5f5', flexDirection: 'column', width: '100%', maxWidth: '20%', margin: "0 auto", gap: 15, padding: '30px', borderRadius: '10px', border: '1px solid gray' }}>
                <h1 style={{ textAlign: 'center', fontWeight: 700, textTransform: 'uppercase', marginTop: 0 }}>login</h1>

                {error && <div style={{ padding: '10px', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: '5px', textAlign: 'center', fontSize: '14px' }}>{error}</div>}

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <label htmlFor="email" style={{ fontWeight: 600 }}>Email</label>
                    <input type="text" onChange={(e) => handleChange('email', e.target.value)} placeholder="Email" autoComplete="off" style={{ width: '100%', padding: '12px 5px', borderRadius: 7, outline: 'none', border: '1px solid #ccc' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <label htmlFor="password" style={{ fontWeight: 600 }}>Password</label>
                    <input type="password" onChange={(e) => handleChange('password', e.target.value)} placeholder="****" autoComplete="off" style={{ width: '100%', padding: '12px 5px', borderRadius: 7, outline: 'none', border: '1px solid #ccc' }} />
                </div>
                <button
                    style={{ padding: '12px', outline: 'none', borderRadius: '8px', cursor: isLoading ? 'not-allowed' : 'pointer', marginTop: 20, backgroundColor: isLoading ? '#9ca3af' : 'green', color: 'white' }}
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
                <p style={{ textAlign: 'center', margin: 0, fontSize: 14 }}>
                    Don't have an account?{" "}
                    <Link to="/register" style={{ color: 'green', fontWeight: 600 }}>Register</Link>
                </p>
            </form>
        </div>
    )
}

export default Login
