import { useEffect, useState } from "react";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import api from "../api/client";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

function ReportsPage() {
  const [report, setReport] = useState({ topStudents: [], overallAverage: 0, overallAttendance: 0 });

  useEffect(() => {
    const loadReport = async () => {
      const { data } = await api.get("/reports/dashboard");
      setReport(data);
    };
    loadReport();
  }, []);

  const barData = {
    labels: report.topStudents.map((student) => student.name),
    datasets: [
      {
        label: "Average Marks",
        data: report.topStudents.map((student) => student.average),
        backgroundColor: "#2356d8"
      }
    ]
  };

  const doughnutData = {
    labels: ["Attendance", "Gap"],
    datasets: [
      {
        data: [report.overallAttendance, Math.max(100 - report.overallAttendance, 0)],
        backgroundColor: ["#2356d8", "#dbe7ff"]
      }
    ]
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="font-display text-2xl font-bold text-slate-800">Reports & Analytics</h2>
        <p className="mt-1 text-sm text-slate-500">Insights generated through the Java analytics module.</p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-slate-700">Top Student Performance</h3>
          <div className="mt-4">
            <Bar data={barData} />
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-slate-700">Overall Attendance</h3>
          <div className="mx-auto mt-4 max-w-[300px]">
            <Doughnut data={doughnutData} />
          </div>
        </article>
      </section>
    </div>
  );
}

export default ReportsPage;
