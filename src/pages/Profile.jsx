import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useUserDetails } from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";
import EditProfile from "../components/EditProfile/EditProfile";

const Profile = () => {
  const { user } = useUserDetails();
  const { tasks } = useTasks();
  const completedTasks = tasks.filter((task) => task.status === "Closed");

  const totalWeeks = completedTasks.length;
  const totalDays = completedTasks.length * 2; // just for example: 1 task = 1w:2d
  return (
    <DashboardLayout>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3 space-y-6">
          <div className="rounded-xl border border-(--border) bg-(--card-bg) p-5">
            <div className="flex flex-col items-center text-center">
              <img
                src={`https://ui-avatars.com/api/?name=${user.name}&background=000&color=fff`}
                alt="profile"
                className="h-24 w-24 rounded-full border-4 border-[var(--primary)]"
              />

              <h3 className="mt-3 text-lg font-semibold text-[var(--text)]">
                {user.name}
              </h3>

              <p className="text-xs text-[var(--muted)]">{user.email}</p>

              <div className="mt-4 w-full border-t border-(--border)" />

              <div className="mt-4 w-full space-y-2 text-left text-sm">
                <p className="text-[var(--muted)]">👨‍💻 Frontend Developer</p>
                <p className="text-[var(--muted)]">✉️ {user.email}</p>
              </div>
            </div>
          </div>

          <div
            className="
             rounded-xl border border-[var(--border)]
             bg-[var(--card-bg)] p-5
            ">
            <p className="text-sm font-medium text-[var(--text)] mb-4">
              Total work done
            </p>

            <div className="flex items-center justify-center">
              <div
                className="
            h-28 w-28 rounded-full
            border-[10px] border-[var(--primary)]
            flex items-center justify-center
          "
              >
                <span className="text-lg font-semibold text-[var(--text)]">
                  {totalWeeks}w: {totalDays}d
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Section */}
        <EditProfile />

        {/* RIGHT COLUMN */}
        <div className="col-span-12 md:col-span-3 space-y-6">
          {/* Projects */}
          <div
            className="
          rounded-xl border border-(--border)
          bg-(--card-bg) p-5
        "
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[var(--text)]">
                Projects
              </h3>
              <button className="text-xs text-[var(--primary)]">
                View all
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <img
                  key={i}
                  src={`https://picsum.photos/100?random=${i}`}
                  className="h-16 w-full rounded-md object-cover"
                />
              ))}
            </div>
          </div>

          {/* Worked With */}
          <div
            className="
          rounded-xl border border-(--border)
          bg-(--card-bg) p-5
        "
          >
            <h3 className="mb-4 text-sm font-semibold text-[var(--text)]">
              Worked with
            </h3>

            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/100?img=${i}`}
                  className="h-12 w-12 rounded-full"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
