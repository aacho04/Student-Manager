import { useEffect, useState } from "react";
import api from "../api/client";

function DashboardPage() {
  const [metrics, setMetrics] = useState({
    totalStudents: 0,
    topStudents: [],
    overallAverage: 0,
    overallAttendance: 0
  });

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [{ data: students }, { data: reports }] = await Promise.all([
          api.get("/students"),
          api.get("/reports/dashboard")
        ]);

        setMetrics({
          totalStudents: students.length,
          topStudents: reports.topStudents || [],
          overallAverage: reports.overallAverage || 0,
          overallAttendance: reports.overallAttendance || 0
        });
      } catch (_error) {
        setMetrics((prev) => ({ ...prev }));
      }
    };
    loadDashboard();
  }, []);

  const cards = [
    { label: "Total Students", value: metrics.totalStudents },
    { label: "Average Score", value: `${metrics.overallAverage.toFixed(1)}%` },
    { label: "Attendance", value: `${metrics.overallAttendance.toFixed(1)}%` }
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="font-display text-3xl font-bold text-slate-900">Welcome back</h1>
        <p className="mt-2 text-slate-500">Track academic progress and administration from one place.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <article key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className="mt-2 font-display text-3xl font-bold text-brand-700">{card.value}</p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="font-display text-xl font-bold text-slate-800">Top Students</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {metrics.topStudents.length === 0 && (
            <p className="text-sm text-slate-400">Add grades and attendance to generate analytics.</p>
          )}
          {metrics.topStudents.map((student) => (
            <div key={student.studentId} className="rounded-xl border border-slate-200 p-4">
              <p className="font-semibold text-slate-800">{student.name}</p>
              <p className="text-sm text-slate-500">Average: {student.average.toFixed(1)}%</p>
              <p className="text-sm text-slate-500">
                Attendance: {student.attendancePercentage.toFixed(1)}%
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
