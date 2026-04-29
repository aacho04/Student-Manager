import { useMemo, useState } from "react";

function DataTable({ title, columns, data, searchableKey }) {
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: columns[0]?.key, direction: "asc" });

  const filteredData = useMemo(() => {
    const filtered = data.filter((item) =>
      String(item[searchableKey] || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    return filtered.sort((a, b) => {
      const left = a[sortConfig.key];
      const right = b[sortConfig.key];
      if (left < right) return sortConfig.direction === "asc" ? -1 : 1;
      if (left > right) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [columns, data, search, searchableKey, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc"
    }));
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h3 className="font-display text-xl font-bold text-slate-800">{title}</h3>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Filter..."
          className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none ring-brand-100 focus:ring md:w-64"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="cursor-pointer px-3 py-3 font-semibold"
                  onClick={() => handleSort(column.key)}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index} className="border-b border-slate-100 last:border-none hover:bg-slate-50/70">
                {columns.map((column) => (
                  <td key={`${index}-${column.key}`} className="px-3 py-3 text-slate-700">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-3 py-5 text-center text-slate-400">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default DataTable;
