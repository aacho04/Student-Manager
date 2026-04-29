import { useEffect, useMemo, useState } from "react";
import api from "../api/client";
import DataTable from "../components/DataTable";

function FeesPage() {
  const [students, setStudents] = useState([]);
  const [fees, setFees] = useState([]);
  const [form, setForm] = useState({ studentId: "", amount: "", dueDate: "" });

  const loadData = async () => {
    const [{ data: studentsData }, { data: feesData }] = await Promise.all([
      api.get("/students"),
      api.get("/fees")
    ]);
    setStudents(studentsData);
    setFees(feesData);
    if (studentsData.length > 0 && !form.studentId) {
      setForm((prev) => ({ ...prev, studentId: studentsData[0]._id }));
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const createFee = async (event) => {
    event.preventDefault();
    await api.post("/fees", {
      studentId: form.studentId,
      amount: Number(form.amount),
      dueDate: form.dueDate
    });
    setForm((prev) => ({ ...prev, amount: "", dueDate: "" }));
    loadData();
  };

  const togglePaid = async (fee) => {
    await api.patch(`/fees/${fee._id}/status`, { paid: !fee.paid });
    loadData();
  };

  const columns = useMemo(
    () => [
      {
        key: "studentId",
        label: "Student",
        render: (value) => value?.name || "-"
      },
      { key: "amount", label: "Amount" },
      {
        key: "dueDate",
        label: "Due Date",
        render: (value) => new Date(value).toLocaleDateString()
      },
      {
        key: "paid",
        label: "Status",
        render: (value, row) => (
          <button
            className={`rounded-lg px-3 py-1 text-xs font-semibold ${
              value ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
            }`}
            onClick={() => togglePaid(row)}
          >
            {value ? "Paid" : "Pending"}
          </button>
        )
      }
    ],
    [fees]
  );

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="font-display text-2xl font-bold text-slate-800">Fee Management</h2>
        <form onSubmit={createFee} className="mt-4 grid gap-3 md:grid-cols-4">
          <select
            value={form.studentId}
            onChange={(event) => setForm((prev) => ({ ...prev, studentId: event.target.value }))}
            className="rounded-xl border border-slate-200 px-3 py-2"
          >
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name}
              </option>
            ))}
          </select>
          <input
            value={form.amount}
            onChange={(event) => setForm((prev) => ({ ...prev, amount: event.target.value }))}
            placeholder="Amount"
            type="number"
            required
            className="rounded-xl border border-slate-200 px-3 py-2"
          />
          <input
            value={form.dueDate}
            onChange={(event) => setForm((prev) => ({ ...prev, dueDate: event.target.value }))}
            type="date"
            required
            className="rounded-xl border border-slate-200 px-3 py-2"
          />
          <button className="rounded-xl bg-brand-500 px-4 py-2 font-semibold text-white">Add Fee</button>
        </form>
      </section>

      <DataTable title="Payment Tracking" columns={columns} data={fees} searchableKey="paid" />
    </div>
  );
}

export default FeesPage;
