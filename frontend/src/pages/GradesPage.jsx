import { useEffect, useMemo, useState } from "react";
import api from "../api/client";
import DataTable from "../components/DataTable";

function GradesPage() {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");
  const [gradeData, setGradeData] = useState({ grades: [], average: 0, classification: "-" });

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

  const loadGrades = async (studentId) => {
    if (!studentId) return;
    const { data } = await api.get(`/grades/${studentId}`);
    setGradeData(data);
  };

  useEffect(() => {
    loadGrades(selectedStudentId);
  }, [selectedStudentId]);

  const addGrade = async (event) => {
    event.preventDefault();
    await api.post("/grades", {
      studentId: selectedStudentId,
      subject,
      marks: Number(marks)
    });
    setSubject("");
    setMarks("");
    loadGrades(selectedStudentId);
  };

  const columns = useMemo(() => [{ key: "subject", label: "Subject" }, { key: "marks", label: "Marks" }], []);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="font-display text-2xl font-bold text-slate-800">Grade Management</h2>
        <form onSubmit={addGrade} className="mt-4 grid gap-3 md:grid-cols-4">
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
          <input
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            placeholder="Subject"
            required
            className="rounded-xl border border-slate-200 px-3 py-2"
          />
          <input
            value={marks}
            onChange={(event) => setMarks(event.target.value)}
            placeholder="Marks"
            type="number"
            min="0"
            max="100"
            required
            className="rounded-xl border border-slate-200 px-3 py-2"
          />
          <button className="rounded-xl bg-brand-500 px-4 py-2 font-semibold text-white">Add Grade</button>
        </form>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Average</p>
            <p className="font-display text-2xl font-bold text-brand-700">{gradeData.average.toFixed(1)}%</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Performance</p>
            <p className="font-display text-2xl font-bold text-brand-700">{gradeData.classification}</p>
          </div>
        </div>
      </section>

      <DataTable title="Subject-wise Marks" columns={columns} data={gradeData.grades} searchableKey="subject" />
    </div>
  );
}

export default GradesPage;
