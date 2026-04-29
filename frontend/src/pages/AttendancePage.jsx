import { useEffect, useMemo, useState } from "react";
import api from "../api/client";
import DataTable from "../components/DataTable";

function AttendancePage() {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [status, setStatus] = useState("Present");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadStudents = async () => {
      const { data } = await api.get("/students");
      setStudents(data);
      if (data.length > 0) {
        setSelectedStudentId(data[0]._id);
      }
    };
    loadStudents();
  }, []);

  const loadHistory = async (studentId) => {
    if (!studentId) return;
    const { data } = await api.get(`/attendance/${studentId}`);
    setHistory(data);
  };

  useEffect(() => {
    loadHistory(selectedStudentId);
  }, [selectedStudentId]);

  const markToday = async () => {
    await api.post("/attendance", {
      studentId: selectedStudentId,
      date: new Date().toISOString(),
      status
    });
    loadHistory(selectedStudentId);
  };

  const columns = useMemo(
    () => [
      {
        key: "date",
        label: "Date",
        render: (value) => new Date(value).toLocaleDateString()
      },
      { key: "status", label: "Status" }
    ],
    []
  );

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="font-display text-2xl font-bold text-slate-800">Mark Attendance</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <select
            value={selectedStudentId}
            onChange={(event) => setSelectedStudentId(event.target.value)}
            className="rounded-xl border border-slate-200 px-3 py-2"
          >
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="rounded-xl border border-slate-200 px-3 py-2"
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>

          <button className="rounded-xl bg-brand-500 px-4 py-2 font-semibold text-white" onClick={markToday}>
            Save Attendance
          </button>
        </div>
      </section>

      <DataTable title="Attendance History" columns={columns} data={history} searchableKey="status" />
    </div>
  );
}

export default AttendancePage;
