import React, { useState, useEffect } from "react";
import { useUserDetails } from "../../context/AuthContext";

const EditProfile = () => {
  const { user, setUser } = useUserDetails(); // get current user from context
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    // You can add more fields here if needed, e.g. phone, designation
  });

  // fill initial data from user context
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: user.password || "", // make sure password is stored safely in context
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, ...formData };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    alert("Profile updated successfully!");
  };

  return (
    <div className="col-span-12 md:col-span-6">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-6">
        <h2 className="mb-6 text-lg font-semibold text-[var(--text)]">
          Edit Profile
        </h2>

        <form className="grid grid-cols-1 gap-4" onSubmit={handleSave}>
          <div>
            <label className="block text-sm text-[var(--muted)] mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full border-b border-[var(--border)] bg-transparent py-2 px-3 text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
            />
          </div>

          <div>
            <label className="block text-sm text-[var(--muted)] mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-b border-[var(--border)] bg-transparent py-2 px-3 text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
            />
          </div>

          <div>
            <label className="block text-sm text-[var(--muted)] mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              className="w-full border-b border-[var(--border)] bg-transparent py-2 px-3 text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
            />
          </div>

          {/* Optional extra fields */}
          {/* <div>
            <label>Phone</label>
            <input name="phone" value={formData.phone} onChange={handleChange} />
          </div> */}

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="rounded-lg bg-[var(--primary)] px-6 py-2 text-sm font-medium text-[var(--bg)]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
