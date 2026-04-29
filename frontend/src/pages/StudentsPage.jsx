import { useEffect, useMemo, useState } from "react";
import api from "../api/client";
import DataTable from "../components/DataTable";

const initialForm = {
  name: "",
  age: "",
  contact: "",
  course: "",
  profilePhoto: ""
};

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const fetchStudents = async () => {
    const { data } = await api.get("/students");
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (editingId) {
      await api.put(`/students/${editingId}`, { ...form, age: Number(form.age) });
    } else {
      await api.post("/students", { ...form, age: Number(form.age) });
    }
    setForm(initialForm);
    setEditingId(null);
    fetchStudents();
  };

  const startEdit = (student) => {
    setEditingId(student._id);
    setForm({
      name: student.name,
      age: student.age,
      contact: student.contact,
      course: student.course,
      profilePhoto: student.profilePhoto || ""
    });
  };

  const handleDelete = async (id) => {
    await api.delete(`/students/${id}`);
    fetchStudents();
  };

  const columns = useMemo(
    () => [
      {
        key: "name",
        label: "Student",
        render: (value, row) => (
          <div className="flex items-center gap-3">
            <img
              src={row.profilePhoto || "https://placehold.co/64x64/e5e7eb/0f172a?text=SM"}
              alt={value}
              className="h-9 w-9 rounded-full object-cover"
            />
            <span className="font-semibold">{value}</span>
          </div>
        )
      },
      { key: "age", label: "Age" },
      { key: "contact", label: "Contact" },
      { key: "course", label: "Course" },
      {
        key: "actions",
        label: "Actions",
        render: (_, row) => (
          <div className="flex gap-2">
            <button className="rounded-lg bg-slate-100 px-2 py-1" onClick={() => startEdit(row)}>
              Edit
            </button>
            <button
              className="rounded-lg bg-red-100 px-2 py-1 text-red-700"
              onClick={() => handleDelete(row._id)}
            >
              Delete
            </button>
          </div>
        )
      }
    ],
    []
  );

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="font-display text-2xl font-bold text-slate-800">
          {editingId ? "Edit Student" : "Add Student"}
        </h2>
        <form onSubmit={handleSubmit} className="mt-4 grid gap-3 md:grid-cols-2">
          {Object.keys(initialForm).map((key) => (
            <input
              key={key}
              type={key === "age" ? "number" : "text"}
              required={key !== "profilePhoto"}
              value={form[key]}
              onChange={(event) => setForm((prev) => ({ ...prev, [key]: event.target.value }))}
              placeholder={key}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-brand-100 focus:ring"
            />
          ))}
          <button className="rounded-xl bg-brand-500 px-4 py-2 font-semibold text-white md:col-span-2">
            {editingId ? "Update Student" : "Add Student"}
          </button>
        </form>
      </section>

      <DataTable title="Student Directory" columns={columns} data={students} searchableKey="name" />
    </div>
  );
}

export default StudentsPage;
