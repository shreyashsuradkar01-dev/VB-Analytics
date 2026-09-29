"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  UserRound,
  Building2,
  GraduationCap,
  ShieldCheck,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  Cloud,
} from "lucide-react";

import { useLanguage } from "@/components/language-context";

type Role = "trainee" | "employer" | "provider" | "gov";

const roles = [
  {
    id: "trainee" as Role,
    icon: UserRound,
  },
  {
    id: "employer" as Role,
    icon: Building2,
  },
  {
    id: "provider" as Role,
    icon: GraduationCap,
  },
  {
    id: "gov" as Role,
    icon: ShieldCheck,
  },
];

// SIH DEMO CREDENTIALS
const DEMO_EMAIL = "demo@vbanalytics.in";
const DEMO_PASSWORD = "Demo@1234";

export default function LoginCard() {
  const router = useRouter();

  const { language } = useLanguage();

  const marathi = language === "mr";

  const [role, setRole] = useState<Role>("trainee");
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const roleLabels: Record<Role, string> = {
    trainee: marathi ? "प्रशिक्षार्थी" : "Trainee",
    employer: marathi ? "नियोक्ता" : "Employer",
    provider: marathi ? "प्रशिक्षण संस्था" : "Institute",
    gov: marathi ? "सरकारी अधिकारी" : "Authority",
  };

  // Fill the demo credentials into the login form
  const useDemoCredentials = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setError("");
  };

  const handleLogin = async () => {
    setError("");

    if (!email.trim()) {
      setError(
        marathi
          ? "कृपया तुमचा ईमेल प्रविष्ट करा."
          : "Please enter your email."
      );
      return;
    }

    if (!password.trim()) {
      setError(
        marathi
          ? "कृपया तुमचा पासवर्ड प्रविष्ट करा."
          : "Please enter your password."
      );
      return;
    }

    if (!email.includes("@")) {
      setError(
        marathi
          ? "कृपया वैध ईमेल पत्ता प्रविष्ट करा."
          : "Please enter a valid email address."
      );
      return;
    }

    // DEMO AUTHENTICATION
    // This is only for the SIH prototype.
    if (
      email.trim().toLowerCase() !== DEMO_EMAIL.toLowerCase() ||
      password !== DEMO_PASSWORD
    ) {
      setError(
        marathi
          ? "डेमो खात्यासाठी योग्य ईमेल आणि पासवर्ड वापरा."
          : "Please use the demo email and password provided below."
      );
      return;
    }

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 700));

    localStorage.setItem(
      "vb-analytics-session",
      JSON.stringify({
        email,
        role,
        loggedIn: true,
        loginTime: new Date().toISOString(),
        demo: true,
      })
    );

    switch (role) {
      case "trainee":
        router.push("/trainee/dashboard");
        break;

      case "employer":
        router.push("/employer/dashboard");
        break;

      case "provider":
        router.push("/provider/dashboard");
        break;

      case "gov":
        router.push("/government/dashboard");
        break;
    }

    setLoading(false);
  };

  return (
    <div className="vb-login-card">

      {/* HEADER */}
      <div className="vb-login-card-header">
        <h2>
          {marathi
            ? "साइन इन करून पुढे जा"
            : "Sign In to Continue"}
        </h2>

        <p>
          {marathi
            ? "तुमच्या क्रेडेन्शियल्ससह प्लॅटफॉर्मवर प्रवेश करा"
            : "Access the platform with your credentials"}
        </p>
      </div>

      {/* ROLE TABS */}
      <div className="vb-role-tabs">
        {roles.map((item) => {
          const Icon = item.icon;
          const active = role === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setRole(item.id);
                setError("");
              }}
              className={`vb-role-tab ${
                active ? "active" : ""
              }`}
            >
              <Icon
                size={17}
                strokeWidth={2}
              />

              <span>
                {roleLabels[item.id]}
              </span>
            </button>
          );
        })}
      </div>

      {/* EMAIL */}
      <div className="vb-form-group">
        <label className="vb-form-label">
          {marathi ? "ईमेल" : "Email"}
        </label>

        <div className="vb-input-wrap">
          <Mail
            className="vb-input-icon"
            size={17}
          />

          <input
            type="email"
            placeholder={
              marathi
                ? "तुमचा ईमेल प्रविष्ट करा"
                : "Enter your email"
            }
            autoComplete="username"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setError("");
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleLogin();
              }
            }}
          />
        </div>
      </div>

      {/* PASSWORD */}
      <div className="vb-form-group">
        <label className="vb-form-label">
          {marathi ? "पासवर्ड" : "Password"}
        </label>

        <div className="vb-input-wrap">
          <LockKeyhole
            className="vb-input-icon"
            size={17}
          />

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder={
              marathi
                ? "तुमचा पासवर्ड प्रविष्ट करा"
                : "Enter your password"
            }
            autoComplete="current-password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setError("");
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleLogin();
              }
            }}
          />

          <button
            type="button"
            className="vb-password-toggle"
            onClick={() =>
              setShowPassword(
                (value) => !value
              )
            }
            aria-label={
              showPassword
                ? marathi
                  ? "पासवर्ड लपवा"
                  : "Hide password"
                : marathi
                  ? "पासवर्ड दाखवा"
                  : "Show password"
            }
          >
            {showPassword ? (
              <EyeOff size={17} />
            ) : (
              <Eye size={17} />
            )}
          </button>
        </div>
      </div>

      {/* DEMO ACCOUNT */}
      <div
        className="vb-demo-account"
        style={{
          marginTop: "10px",
          marginBottom: "14px",
          padding: "12px 14px",
          border: "1px solid rgba(59, 130, 246, 0.25)",
          borderRadius: "10px",
          background: "rgba(59, 130, 246, 0.06)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
            marginBottom: "8px",
          }}
        >
          <strong
            style={{
              fontSize: "13px",
            }}
          >
            {marathi
              ? "डेमो खाते"
              : "Demo Account"}
          </strong>

          <span
            style={{
              fontSize: "10px",
              padding: "3px 7px",
              borderRadius: "999px",
              background: "rgba(59, 130, 246, 0.12)",
            }}
          >
            SIH Prototype
          </span>
        </div>

        <div
          style={{
            fontSize: "12px",
            lineHeight: "1.7",
            marginBottom: "9px",
          }}
        >
          <div>
            <strong>
              {marathi ? "ईमेल:" : "Email:"}
            </strong>{" "}
            {DEMO_EMAIL}
          </div>

          <div>
            <strong>
              {marathi
                ? "पासवर्ड:"
                : "Password:"}
            </strong>{" "}
            {DEMO_PASSWORD}
          </div>
        </div>

        <button
          type="button"
          onClick={useDemoCredentials}
          style={{
            width: "100%",
            border: "none",
            borderRadius: "7px",
            padding: "8px 10px",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: 600,
            background: "rgba(59, 130, 246, 0.12)",
          }}
        >
          {marathi
            ? "डेमो क्रेडेन्शियल्स वापरा"
            : "Use Demo Credentials"}
        </button>

        <p
          style={{
            fontSize: "10px",
            opacity: 0.65,
            marginTop: "7px",
            marginBottom: 0,
          }}
        >
          {marathi
            ? "हे SIH प्रोटोटाइपसाठी डेमो प्रमाणीकरण आहे."
            : "Demo authentication for the SIH prototype only."}
        </p>
      </div>

      {/* FORGOT PASSWORD */}
      <button
        type="button"
        className="vb-forgot"
        onClick={() => {
          setError(
            marathi
              ? "पासवर्ड पुनर्प्राप्ती सुविधा बॅकएंडशी जोडली जाईल."
              : "Password recovery will be connected to the backend."
          );
        }}
      >
        {marathi
          ? "तुमचा पासवर्ड विसरलात?"
          : "Forgot Your Password?"}
      </button>

      {/* ERROR */}
      {error && (
        <div className="vb-login-error">
          {error}
        </div>
      )}

      {/* LOGIN */}
      <button
        type="button"
        className="vb-login-button"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading
          ? marathi
            ? "साइन इन होत आहे..."
            : "Signing In..."
          : marathi
            ? "साइन इन करा"
            : "Login"}
      </button>

      {/* OR */}
      <div className="vb-or">
        <span />

        <strong>
          {marathi ? "किंवा" : "OR"}
        </strong>

        <span />
      </div>

      {/* OTP */}
      <button
        type="button"
        className="vb-otp-button"
        onClick={() =>
          setError(
            marathi
              ? "OTP / MFA प्रमाणीकरण बॅकएंडशी जोडले जाईल."
              : "OTP / MFA authentication will be connected to the backend."
          )
        }
      >
        <span className="vb-otp-left">
          <Cloud
            size={20}
            strokeWidth={2.3}
          />
        </span>

        <span>
          {marathi
            ? "DigiLocker / Aadhaar OTP सह साइन इन करा"
            : "Sign in with DigiLocker / Aadhaar OTP"}
        </span>

        <ArrowRight size={20} />
      </button>

      {/* SECURITY */}
      <div className="vb-security">
        <ShieldCheck size={15} />

        <span>
          {marathi
            ? "सुरक्षित प्रवेश • भूमिका-आधारित प्रमाणीकरण • गोपनीयता संरक्षित"
            : "Secure access • Role-based authentication • Privacy protected"}
        </span>
      </div>

      {/* REGISTER */}
      <div className="vb-register">
        <span>
          {marathi
            ? "खाते नाही?"
            : "Don't Have an Account?"}
        </span>

        <button
          type="button"
          onClick={() =>
            setError(
              marathi
                ? "नोंदणी सुविधा बॅकएंडशी जोडली जाईल."
                : "Registration will be connected to the backend."
            )
          }
        >
          {marathi
            ? "आता नोंदणी करा"
            : "Register Now"}
        </button>
      </div>

    </div>
  );
}