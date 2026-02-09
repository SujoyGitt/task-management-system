import {  useReducer, useState } from "react";
import { useUserDetails } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import Toggle from "../components/Toggle";

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
      (user) =>
        user.email === state.email &&
        user.password === state.password
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

    
    const alreadyExists = users.some(
      (user) => user.email === state.email
    );

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
    localStorage.setItem(
      "registeredUsers",
      JSON.stringify(updatedUsers)
    );

    alert("Signup successful. Please log in.");
    dispatch({
      type: "submit"
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
      <div className="flex items-center justify-between px-8 py-4 border-b border-(--border) bg-(--card-bg)">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-[var(--primary)] text-[var(--bg)] flex items-center justify-center font-bold">
            TM
          </div>

          <span className="font-semibold text-[var(--text)]">TaskManager</span>
        </div>

        <Toggle />
      </div>

      <div className="min-h-screen flex bg-(--bg) text-(--text)">
        <div className="hidden lg:flex w-1/2 items-center justify-center bg-(--card-bg)">
          <img
            src="/src/assets/login-illustration.png"
            alt="Login Illustration"
            className="max-w-xl"
          />
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-md px-8">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-(--text)">
                {isLogin ? "Welcome back, User 👋" : "Create your account 🚀"}
              </h2>

              <p className="text-(--muted) mt-2">
                {isLogin
                  ? "Please enter your details to log in."
                  : "Fill the details to get started."}
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {!isLogin && (
                <div>
                  <label className="block text-sm text-[var(--muted)] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full border-b border-[var(--border)] focus:border-[var(--primary)] outline-none py-2 bg-transparent"
                    name="name"
                    value={state.name}
                    onChange={handleChange}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm text-[var(--muted)] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  className="w-full border-b border-[var(--border)] focus:border-[var(--primary)] outline-none py-2 bg-transparent"
                  name="email"
                  value={state.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm text-[var(--muted)] mb-1">
                  Password
                </label>
                <div className="flex items-center border-b border-[var(--border)] focus-within:border-[var(--primary)]">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    className="w-full outline-none py-2 bg-transparent"
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-sm text-[var(--muted)] px-2 cursor-pointer"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                {!isLogin && (
                  <label className="flex items-center gap-2 text-[var(--muted)]">
                    <input
                      type="checkbox"
                      name="termsConditions"
                      checked={state.termsConditions}
                      onChange={handleChange}
                    />
                    Terms & Conditions
                  </label>
                )}

                {isLogin && (
                  <span className="text-[var(--primary)] cursor-pointer">
                    Forgot Password?
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[var(--primary)] text-[var(--bg)] py-3 rounded-md hover:opacity-90 transition cursor-pointer"
              >
                {isLogin ? "Log in" : "Sign up"}
              </button>
            </form>

            <p className="text-center text-sm text-(--muted) mt-6">
              {isLogin ? "Don’t have an account?" : "Already have an account?"}
              <span
                className="text-(--primary) font-medium cursor-pointer ml-1"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign up for free" : "Log in"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
