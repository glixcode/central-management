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
        padding: "12px 8px",
        borderRadius: 7,
        outline: "none",
        border: "1px solid #ccc",
        boxSizing: "border-box",
    };

    const fieldGroupStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        gap: 8,
    };

    const labelStyle: React.CSSProperties = { fontWeight: 600 };

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
                backgroundColor: "#333",
                overflowY: "auto",
                padding: "20px 0",
            }}
        >
            <form
                style={{
                    display: "flex",
                    background: "#f5f5f5",
                    flexDirection: "column",
                    width: "100%",
                    maxWidth: 420,
                    margin: "auto",
                    gap: 14,
                    padding: 30,
                    borderRadius: 10,
                    border: "1px solid gray",
                }}
                onSubmit={(e) => e.preventDefault()}
            >
                <h1
                    style={{
                        textAlign: "center",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        margin: 0,
                    }}
                >
                    Register
                </h1>

                {error && (
                    <div
                        style={{
                            background: "#fdecea",
                            color: "#b71c1c",
                            padding: "10px 12px",
                            borderRadius: 6,
                            border: "1px solid #f5c6cb",
                            fontSize: 14,
                        }}
                    >
                        {error}
                    </div>
                )}

                {success && (
                    <div
                        style={{
                            background: "#e6f4ea",
                            color: "#1e4620",
                            padding: "10px 12px",
                            borderRadius: 6,
                            border: "1px solid #c3e6cb",
                            fontSize: 14,
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
                    />
                </div>

                <button
                    type="button"
                    onClick={handleRegister}
                    disabled={loading}
                    style={{
                        padding: 12,
                        outline: "none",
                        border: "none",
                        borderRadius: 8,
                        cursor: loading ? "not-allowed" : "pointer",
                        marginTop: 12,
                        backgroundColor: loading ? "#6c8c6c" : "green",
                        color: "white",
                        fontWeight: 600,
                        textTransform: "uppercase",
                    }}
                >
                    {loading ? "Registering..." : "Register"}
                </button>

                <p style={{ textAlign: "center", margin: 0, fontSize: 14 }}>
                    Already have an account?{" "}
                    <Link to="/login" style={{ color: "green", fontWeight: 600 }}>
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
