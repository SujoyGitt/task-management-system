import { useReducer, useState } from "react";
import { useUserDetails } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import Toggle from "../components/Toggle";
import myImage from "../assets/login-illustration.png";

const initialState = {
  name: "",
  email: "",
  password: "",
  termsConditions: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "fieldChange":
      return { ...state, [action.fieldName]: action.value };
    case "submit":
      return initialState;
    default:
      return state;
  }
};

const Login = () => {
  const { user, setUser } = useUserDetails();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [focusedField, setFocusedField] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    isLogin ? loginUser() : signupUser();
  };

  const getRegisteredUsers = () => {
    try {
      const data = JSON.parse(localStorage.getItem("registeredUsers"));
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  };

  const loginUser = () => {
    if (!state.email || !state.password) {
      alert("Please fill email & password");
      return;
    }

    const users = getRegisteredUsers();

    const matchedUser = users.find(
      (user) => user.email === state.email && user.password === state.password
    );

    if (!matchedUser) {
      alert("Invalid email or password");
      return;
    }

    const loggedUser = {
      name: matchedUser.name,
      email: matchedUser.email,
    };

    setUser(loggedUser);
    localStorage.setItem("user", JSON.stringify(loggedUser));

    navigate("/tasks");
  };

  const signupUser = () => {
    if (
      !state.name ||
      !state.email ||
      !state.password ||
      !state.termsConditions
    ) {
      alert("Please fill all signup fields");
      return;
    }

    const users = getRegisteredUsers();

    const alreadyExists = users.some((user) => user.email === state.email);

    if (alreadyExists) {
      alert("User already exists with this email");
      return;
    }

    const newUser = {
      name: state.name,
      email: state.email,
      password: state.password,
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

    alert("Signup successful. Please log in.");
    dispatch({
      type: "submit",
    });
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    dispatch({
      type: "fieldChange",
      fieldName: name,
      value: type === "checkbox" ? checked : value,
    });
  };

  return (
    <>
      {/* Enhanced Header with glassmorphism effect */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border-b border-[var(--border)] bg-[var(--card-bg)]/80 backdrop-blur-lg">
        <div className="flex items-center gap-3 animate-fadeInLeft">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary)]/70 text-[var(--bg)] flex items-center justify-center font-bold shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-3">
            <span className="relative z-10">TM</span>
            <div className="absolute inset-0 rounded-xl bg-[var(--primary)] opacity-50 blur-md"></div>
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-lg text-[var(--text)] tracking-tight">
              TaskManager
            </span>
            <span className="text-xs text-[var(--muted)] font-medium">
              Productivity Redefined
            </span>
          </div>
        </div>

        <div className="animate-fadeInRight">
          <Toggle />
        </div>
      </div>

      <div className="min-h-screen flex bg-[var(--bg)] text-[var(--text)] pt-20">
        {/* Left side - Illustration with floating animations */}
        <div className="hidden lg:flex w-1/2 items-center justify-center bg-[var(--card-bg)] relative overflow-hidden">
          {/* Animated background blobs */}
          <div className="absolute top-20 left-20 w-72 h-72 bg-[var(--primary)]/5 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[var(--primary)]/5 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[var(--primary)]/5 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

          <div className="relative z-10 animate-fadeInScale">
            <img
              src={myImage}
              alt="Login Illustration"
              className="max-w-xl drop-shadow-2xl transform transition-transform duration-700 hover:scale-105"
            />

            {/* Floating feature badges */}
            <div className="absolute -top-8 -right-8 bg-[var(--card-bg)] border border-[var(--border)] px-4 py-2 rounded-full shadow-lg animate-float">
              <span className="text-sm font-semibold text-[var(--text)]">
                🚀 Fast & Secure
              </span>
            </div>

            <div className="absolute -bottom-8 -left-8 bg-[var(--card-bg)] border border-[var(--border)] px-4 py-2 rounded-full shadow-lg animate-float animation-delay-2000">
              <span className="text-sm font-semibold text-[var(--text)]">
                ✨ Modern UI
              </span>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-10 right-10 w-2 h-2 bg-[var(--primary)] rounded-full animate-ping"></div>
          <div className="absolute bottom-32 left-10 w-2 h-2 bg-[var(--primary)] rounded-full animate-ping animation-delay-1000"></div>
        </div>

        {/* Right side - Form with enhanced animations */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Header Section */}
            <div className="mb-10 animate-fadeInUp">
              <div className="inline-block mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)] bg-[var(--primary)]/10 px-3 py-1 rounded-full">
                  {isLogin ? "Welcome Back" : "Get Started"}
                </span>
              </div>

              <h2 className="text-4xl font-bold text-[var(--text)] mb-3 leading-tight">
                {isLogin ? (
                  <>
                    Welcome back,
                    <br />
                    <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary)]/70 bg-clip-text text-transparent">
                      User
                    </span>{" "}
                    👋
                  </>
                ) : (
                  <>
                    Create your
                    <br />
                    <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary)]/70 bg-clip-text text-transparent">
                      account
                    </span>{" "}
                    🚀
                  </>
                )}
              </h2>

              <p className="text-[var(--muted)] text-base">
                {isLogin
                  ? "Enter your credentials to access your workspace."
                  : "Fill in your details and join thousands of users."}
              </p>
            </div>

            {/* Form */}
            <form
              className="space-y-6 animate-fadeInUp animation-delay-200"
              onSubmit={handleSubmit}
            >
              {!isLogin && (
                <div className="transform transition-all duration-300">
                  <label className="block text-sm font-medium text-[var(--muted)] mb-2">
                    Full Name
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="John Doe"
                      className={`w-full border-2 ${
                        focusedField === "name"
                          ? "border-[var(--primary)]"
                          : "border-[var(--border)]"
                      } rounded-xl px-4 py-3.5 bg-[var(--card-bg)] outline-none transition-all duration-300 hover:border-[var(--primary)]/50 placeholder:text-[var(--muted)]/50`}
                      name="name"
                      value={state.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField("")}
                    />
                    <div
                      className={`absolute inset-0 rounded-xl bg-[var(--primary)]/5 -z-10 transition-all duration-300 ${
                        focusedField === "name"
                          ? "opacity-100 scale-105"
                          : "opacity-0 scale-100"
                      }`}
                    ></div>
                  </div>
                </div>
              )}

              <div className="transform transition-all duration-300">
                <label className="block text-sm font-medium text-[var(--muted)] mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    placeholder="example@email.com"
                    className={`w-full border-2 ${
                      focusedField === "email"
                        ? "border-[var(--primary)]"
                        : "border-[var(--border)]"
                    } rounded-xl px-4 py-3.5 bg-[var(--card-bg)] outline-none transition-all duration-300 hover:border-[var(--primary)]/50 placeholder:text-[var(--muted)]/50`}
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField("")}
                  />
                  <div
                    className={`absolute inset-0 rounded-xl bg-[var(--primary)]/5 -z-10 transition-all duration-300 ${
                      focusedField === "email"
                        ? "opacity-100 scale-105"
                        : "opacity-0 scale-100"
                    }`}
                  ></div>
                </div>
              </div>

              <div className="transform transition-all duration-300">
                <label className="block text-sm font-medium text-[var(--muted)] mb-2">
                  Password
                </label>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`w-full border-2 ${
                      focusedField === "password"
                        ? "border-[var(--primary)]"
                        : "border-[var(--border)]"
                    } rounded-xl px-4 py-3.5 pr-24 bg-[var(--card-bg)] outline-none transition-all duration-300 hover:border-[var(--primary)]/50 placeholder:text-[var(--muted)]/50`}
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField("")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm font-medium text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors duration-200"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                  <div
                    className={`absolute inset-0 rounded-xl bg-[var(--primary)]/5 -z-10 transition-all duration-300 ${
                      focusedField === "password"
                        ? "opacity-100 scale-105"
                        : "opacity-0 scale-100"
                    }`}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                {!isLogin && (
                  <label className="flex items-center gap-2 text-[var(--muted)] cursor-pointer group">
                    <input
                      type="checkbox"
                      name="termsConditions"
                      checked={state.termsConditions}
                      onChange={handleChange}
                      className="w-4 h-4 rounded border-2 border-[var(--border)] checked:bg-[var(--primary)] checked:border-[var(--primary)] cursor-pointer transition-all duration-200"
                    />
                    <span className="group-hover:text-[var(--text)] transition-colors duration-200">
                      I agree to Terms & Conditions
                    </span>
                  </label>
                )}

                {isLogin && (
                  <span className="text-[var(--primary)] font-medium cursor-pointer hover:underline transition-all duration-200">
                    Forgot Password?
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[var(--primary)] text-[var(--bg)] py-4 rounded-xl font-semibold text-base hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl relative overflow-hidden group"
              >
                <span className="relative z-10">
                  {isLogin ? "Log in to Dashboard" : "Create Account"}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center animate-fadeInUp animation-delay-400">
              <p className="text-sm text-[var(--muted)]">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <span
                  className="text-[var(--primary)] font-semibold cursor-pointer ml-1 hover:underline transition-all duration-200"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Sign up for free" : "Log in here"}
                </span>
              </p>

              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-[var(--border)]">
                <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Secure Login</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                  <svg
                    className="w-4 h-4 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -20px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(20px, 20px) scale(1.05);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 0.6s ease-out;
        }

        .animate-fadeInRight {
          animation: fadeInRight 0.6s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }

        .animate-fadeInScale {
          animation: fadeInScale 0.8s ease-out;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
};

export default Login;