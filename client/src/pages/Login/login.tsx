import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

type Account = {
    email: string,
    password: string,
}

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
            const response = await api.post(`login`, form);
            login(response.data.token, response.data.user);
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
            style={{ display: 'flex', gap: '4px', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', justifyContent: 'center', alignItems: "center", backgroundColor: '#111827' }}>
            <form onSubmit={handleLogin} className="flex flex-col max-w-xl mx-auto" style={{ display: 'flex', background: '#ffffff', flexDirection: 'column', width: '100%', maxWidth: '400px', margin: "0 auto", gap: 15, padding: '40px', borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)' }}>
                <h1 style={{ textAlign: 'center', fontWeight: 800, textTransform: 'uppercase', marginTop: 0, color: 'var(--purple-primary)' }}>login</h1>

                {error && <div style={{ padding: '10px', backgroundColor: 'var(--red-secondary)', color: 'white', borderRadius: '5px', textAlign: 'center', fontSize: '14px', fontWeight: 600 }}>{error}</div>}

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <label htmlFor="email" style={{ fontWeight: 600, color: '#374151' }}>Email</label>
                    <input type="text" onChange={(e) => handleChange('email', e.target.value)} placeholder="Email" autoComplete="off" style={{ width: '100%', padding: '12px 16px', borderRadius: 8, outline: 'none', border: '1px solid #d1d5db', transition: 'border-color 0.2s', boxSizing: 'border-box' }} onFocus={(e) => e.target.style.borderColor = 'var(--purple-primary)'} onBlur={(e) => e.target.style.borderColor = '#d1d5db'} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <label htmlFor="password" style={{ fontWeight: 600, color: '#374151' }}>Password</label>
                    <input type="password" onChange={(e) => handleChange('password', e.target.value)} placeholder="****" autoComplete="off" style={{ width: '100%', padding: '12px 16px', borderRadius: 8, outline: 'none', border: '1px solid #d1d5db', transition: 'border-color 0.2s', boxSizing: 'border-box' }} onFocus={(e) => e.target.style.borderColor = 'var(--purple-primary)'} onBlur={(e) => e.target.style.borderColor = '#d1d5db'} />
                </div>
                <button
                    style={{ padding: '14px', outline: 'none', border: 'none', borderRadius: '8px', cursor: isLoading ? 'not-allowed' : 'pointer', marginTop: 20, backgroundColor: isLoading ? '#9ca3af' : 'var(--purple-primary)', color: 'white', fontWeight: 700, fontSize: '16px', transition: 'background-color 0.2s', boxShadow: '0 4px 6px rgba(160, 90, 255, 0.25)' }}
                    type="submit"
                    disabled={isLoading}
                    onMouseOver={(e) => { if (!isLoading) e.currentTarget.style.backgroundColor = 'var(--purple-secondary)' }}
                    onMouseOut={(e) => { if (!isLoading) e.currentTarget.style.backgroundColor = 'var(--purple-primary)' }}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
                <p style={{ textAlign: 'center', margin: 0, fontSize: 14, color: '#6b7280' }}>
                    Don't have an account?{" "}
                    <Link to="/register" style={{ color: 'var(--teal-primary)', fontWeight: 700, textDecoration: 'none' }}>Register</Link>
                </p>
            </form>
        </div>
    )
}

export default Login
