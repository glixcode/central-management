import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

type Account = {
    name: string;
    address: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
};

const apiBaseURL = import.meta.env.VITE_API_BASE_URL;

const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState<Account>({
        name: "",
        address: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (key: string, value: string) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const validate = (): string => {
        if (!form.name.trim()) return "Name is required.";
        if (!form.address.trim()) return "Address is required.";
        if (!form.email.trim()) return "Email is required.";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) return "Please enter a valid email address.";

        if (!form.phone.trim()) return "Phone number is required.";
        const phoneRegex = /^[0-9+\-\s()]{7,20}$/;
        if (!phoneRegex.test(form.phone)) return "Please enter a valid phone number.";

        if (!form.password) return "Password is required.";
        if (form.password.length < 6) return "Password must be at least 6 characters.";
        if (form.password !== form.confirmPassword) return "Passwords do not match.";

        return "";
    };

    const handleRegister = async () => {
        setError("");
        setSuccess("");

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            setLoading(true);
            // Don't send confirmPassword to the backend
            const { confirmPassword, ...payload } = form;
            void confirmPassword;

            const response = await axios.post(`${apiBaseURL}/register`, payload);
            console.log(response.data);
            setSuccess("Registration successful! Redirecting to login...");
            setTimeout(() => navigate("/login"), 1500);
        } catch (err: any) {
            const message =
                err?.response?.data?.message ||
                err?.message ||
                "Registration failed. Please try again.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const inputStyle: React.CSSProperties = {
        width: "100%",
        padding: "12px 16px",
        borderRadius: 8,
        outline: "none",
        border: "1px solid #d1d5db",
        boxSizing: "border-box",
        transition: 'border-color 0.2s',
    };

    const fieldGroupStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        gap: 8,
    };

    const labelStyle: React.CSSProperties = { fontWeight: 600, color: '#374151' };

    return (
        <div
            style={{
                display: "flex",
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#111827",
                overflowY: "auto",
                padding: "20px 0",
            }}
        >
            <form
                style={{
                    display: "flex",
                    background: "#ffffff",
                    flexDirection: "column",
                    width: "100%",
                    maxWidth: 400,
                    margin: "auto",
                    gap: 15,
                    padding: 40,
                    borderRadius: 16,
                    border: "none",
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
                }}
                onSubmit={(e) => e.preventDefault()}
            >
                <h1
                    style={{
                        textAlign: "center",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        margin: 0,
                        color: 'var(--purple-primary)'
                    }}
                >
                    Register
                </h1>

                {error && (
                    <div
                        style={{
                            background: "var(--red-secondary)",
                            color: "white",
                            padding: "10px 12px",
                            borderRadius: 6,
                            textAlign: "center",
                            fontSize: 14,
                            fontWeight: 600
                        }}
                    >
                        {error}
                    </div>
                )}

                {success && (
                    <div
                        style={{
                            background: "var(--teal-primary)",
                            color: "white",
                            padding: "10px 12px",
                            borderRadius: 6,
                            textAlign: "center",
                            fontSize: 14,
                            fontWeight: 600
                        }}
                    >
                        {success}
                    </div>
                )}

                <div style={fieldGroupStyle}>
                    <label htmlFor="name" style={labelStyle}>Name</label>
                    <input
                        id="name"
                        type="text"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Full name"
                        autoComplete="name"
                        style={inputStyle}
                        onFocus={(e) => e.target.style.borderColor = 'var(--purple-primary)'}
                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                </div>

                <div style={fieldGroupStyle}>
                    <label htmlFor="address" style={labelStyle}>Address</label>
                    <input
                        id="address"
                        type="text"
                        value={form.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                        placeholder="Street, City, Country"
                        autoComplete="street-address"
                        style={inputStyle}
                        onFocus={(e) => e.target.style.borderColor = 'var(--purple-primary)'}
                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                </div>

                <div style={fieldGroupStyle}>
                    <label htmlFor="email" style={labelStyle}>Email</label>
                    <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="you@example.com"
                        autoComplete="email"
                        style={inputStyle}
                        onFocus={(e) => e.target.style.borderColor = 'var(--purple-primary)'}
                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                </div>

                <div style={fieldGroupStyle}>
                    <label htmlFor="phone" style={labelStyle}>Phone Number</label>
                    <input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="+1 555 123 4567"
                        autoComplete="tel"
                        style={inputStyle}
                        onFocus={(e) => e.target.style.borderColor = 'var(--purple-primary)'}
                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                </div>

                <div style={fieldGroupStyle}>
                    <label htmlFor="password" style={labelStyle}>Password</label>
                    <input
                        id="password"
                        type="password"
                        value={form.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                        placeholder="At least 6 characters"
                        autoComplete="new-password"
                        style={inputStyle}
                        onFocus={(e) => e.target.style.borderColor = 'var(--purple-primary)'}
                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                </div>

                <div style={fieldGroupStyle}>
                    <label htmlFor="confirmPassword" style={labelStyle}>Confirm Password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={(e) => handleChange("confirmPassword", e.target.value)}
                        placeholder="Re-enter password"
                        autoComplete="new-password"
                        style={inputStyle}
                        onFocus={(e) => e.target.style.borderColor = 'var(--purple-primary)'}
                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                </div>

                <button
                    type="button"
                    onClick={handleRegister}
                    disabled={loading}
                    style={{
                        padding: 14,
                        outline: "none",
                        border:'1px solid #ddd',
                        borderRadius: 8,
                        cursor: loading ? "not-allowed" : "pointer",
                        marginTop: 12,
                        backgroundColor: loading ? "#9ca3af" : "var(--purple-primary)",
                        color: "black",
                        fontWeight: 700,
                        fontSize: 16,
                        transition: 'background-color 0.2s',
                        boxShadow: '0 4px 6px rgba(160, 90, 255, 0.25)',
                    }}
                    onMouseOver={(e) => { if (!loading) e.currentTarget.style.backgroundColor = 'var(--purple-secondary)' }}
                    onMouseOut={(e) => { if (!loading) e.currentTarget.style.backgroundColor = 'var(--purple-primary)' }}
                >
                    {loading ? "Registering..." : "Register"}
                </button>

                <p style={{ textAlign: "center", margin: 0, fontSize: 14, color: '#6b7280' }}>
                    Already have an account?{" "}
                    <Link to="/login" style={{ color: "var(--teal-primary)", fontWeight: 700, textDecoration: 'none' }}>
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
