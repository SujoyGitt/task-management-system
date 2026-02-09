import DashboardLayout from "../layouts/DashboardLayout";
import WorkLogDonut from "../components/charts/WorkLogDonut";
import PerformanceLine from "../components/charts/PerformanceLine";
import TasksStatusChart from "../components/charts/TasksStatusChart";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <h2 className="text-xl font-semibold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-(--bg) rounded-xl p-4 shadow">
          <h3 className="font-medium mb-4">Tasks</h3>
          <TasksStatusChart  />
        </div>

        <div className="bg-(--bg) rounded-xl p-4 shadow">
          <h3 className="font-medium mb-4">Work Log</h3>
          <WorkLogDonut />
        </div>

        <div className="bg-(--bg) rounded-xl p-4 shadow md:col-span-2">
          <h3 className="font-medium mb-4">Performance</h3>
          <PerformanceLine />
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
