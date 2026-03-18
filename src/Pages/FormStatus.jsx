import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Approved: "bg-blue-100 text-blue-700 border-blue-200",
  Rejected: "bg-red-100 text-red-700 border-red-200",
  Printing: "bg-purple-100 text-purple-700 border-purple-200",
  "Ready for Collection": "bg-green-100 text-green-700 border-green-200",
};

const statusIcons = {
  Pending: "⏳",
  Approved: "✅",
  Rejected: "❌",
  Printing: "🖨️",
  "Ready for Collection": "🎉",
};

// ── Field outside component to prevent focus loss ──
const Field = ({
  label,
  nepali,
  name,
  value,
  onChange,
  required,
  type = "text",
  placeholder,
}) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      {required && <span className="text-red-500 mr-1">*</span>}
      {label}
      {nepali && (
        <span className="text-gray-400 font-normal ml-1 text-xs">
          ({nepali})
        </span>
      )}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl poppins border border-gray-200 focus:outline-none focus:border-[#FE6E4D] focus:ring-2 focus:ring-[#FE6E4D]/20 transition text-gray-800 bg-white"
    />
  </div>
);

const FormStatus = () => {
  const navigate = useNavigate();
  const [submissionId, setSubmissionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  // Edit/Resubmit state
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [resubmitLoading, setResubmitLoading] = useState(false);
  const [resubmitError, setResubmitError] = useState("");
  const [resubmitted, setResubmitted] = useState(false);

  const handleCheck = async (e) => {
    e.preventDefault();
    if (!submissionId.trim()) return;
    setError("");
    setData(null);
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/id-applications/status/${submissionId.trim()}`,
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Submission ID not found");
      setData(json);
      setEditing(false);
      setResubmitted(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditOpen = () => {
    setEditForm({
      officeName: data.officeName || "",
      employeeName: data.employeeName || "",
      employeeNameNepali: data.employeeNameNepali || "",
      designation: data.designation || "",
      designationNepali: data.designationNepali || "",
      citizenshipNo: data.citizenshipNo || "",
      contactNo: data.contactNo || "",
      bloodGroup: data.bloodGroup || "",
      pisNo: data.pisNo || "",
      permanentAddress: data.permanentAddress || "",
      permanentAddressNepali: data.permanentAddressNepali || "",
      otherDetails: data.otherDetails || "",
    });
    setEditing(true);
    setResubmitError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEditChange = (e) =>
    setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleResubmit = async (e) => {
    e.preventDefault();
    setResubmitError("");
    setResubmitLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/id-applications/${data.submissionId}/resubmit`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editForm),
          credentials: "include",
        },
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Resubmission failed");
      setResubmitted(true);
      setEditing(false);
      setData({ ...data, ...editForm, status: "Pending", rejectionReason: "" });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setResubmitError(err.message);
    } finally {
      setResubmitLoading(false);
    }
  };

  return (
    <div className="min-h-screen poppins bg-[#F7F5F2] pt-20 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Check Status
          </h1>
          <p className="text-gray-400 text-sm">
            Enter your Submission ID to track your application
          </p>
        </motion.div>

        {/* Search Box */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6"
        >
          <form onSubmit={handleCheck} className="flex gap-3">
            <input
              type="text"
              value={submissionId}
              onChange={(e) => setSubmissionId(e.target.value)}
              placeholder="e.g. hari123"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FE6E4D] focus:ring-2 focus:ring-[#FE6E4D]/20 transition text-gray-800 font-poppins"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FE6E4D] to-[#CC1267] text-white font-semibold hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? (
                <svg
                  className="animate-spin w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              ) : (
                "Track"
              )}
            </button>
          </form>
        </motion.div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-600 text-sm mb-4">
            {error}
          </div>
        )}

        {/* Resubmitted success banner */}
        <AnimatePresence>
          {resubmitted && (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-green-50 border border-green-200 rounded-2xl p-4 text-green-700 text-sm mb-4 flex items-center gap-2"
            >
              <span>✅</span> Application resubmitted successfully. Status reset
              to Pending.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result */}
        <AnimatePresence>
          {data && !editing && (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Banner */}
              <div className="bg-gradient-to-r poppins from-[#FE6E4D] to-[#CC1267] p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-xs mb-1">Submission ID</p>
                    <p className="text-2xl font-bold font-poppins">
                      {data.submissionId}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/70 text-xs mb-1">Type</p>
                    <p className="font-semibold capitalize">{data.type}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Current Status */}
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                    Current Status
                  </p>
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold ${statusColors[data.status] || "bg-gray-100 text-gray-700"}`}
                  >
                    <span>{statusIcons[data.status]}</span>
                    {data.status}
                  </div>

                  {/* Rejection reason */}
                  {data.status === "Rejected" && data.rejectionReason && (
                    <div className="mt-3 bg-red-50 border border-red-200 rounded-xl p-4">
                      <p className="text-sm font-semibold text-red-700 mb-1">
                        Reason for Rejection:
                      </p>
                      <p className="text-sm text-red-600">
                        {data.rejectionReason}
                      </p>
                    </div>
                  )}

                  {/* Estimated date */}
                  {data.estimatedDate && (
                    <div className="mt-3 bg-green-50 border border-green-200 rounded-xl p-4">
                      <p className="text-sm font-semibold text-green-700 mb-1">
                        📅 Expected Collection Date:
                      </p>
                      <p className="text-sm text-green-600">
                        {new Date(data.estimatedDate).toLocaleDateString(
                          "en-NP",
                          { dateStyle: "long" },
                        )}
                      </p>
                    </div>
                  )}
                </div>

                {/* Status Timeline */}
                {data.statusTimeline && data.statusTimeline.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                      Status Timeline
                    </p>
                    <div className="space-y-3">
                      {[...data.statusTimeline].reverse().map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FE6E4D]/20 to-[#CC1267]/20 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                            {statusIcons[item.status] || "•"}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              {item.status}
                            </p>
                            <p className="text-xs text-gray-400">
                              {new Date(item.changedAt).toLocaleString("en-NP")}
                            </p>
                            {item.note && (
                              <p className="text-xs text-gray-500 mt-0.5">
                                {item.note}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Submitted Details */}
                {/* Submitted Details - ID Card Style */}
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                    Submitted Details
                  </p>

                  <div className="border border-gray-200 rounded-2xl overflow-hidden">
                    {/* Office Name */}
                    <div className="bg-red-600 text-white text-center py-3 px-4">
                      <p className="text-lg md:text-xl font-bold">
                        {data.officeName || "—"}
                      </p>
                    </div>

                    {/* Fixed Label */}
                    <div className="bg-blue-800 text-white text-center py-2 px-4">
                      <p className="text-sm md:text-base font-bold tracking-wide">
                        कर्मचारी परिचय-पत्र
                      </p>
                    </div>

                    {/* Fields */}
                    <div className="divide-y divide-gray-100">
                      {[
                        [
                          "Employee Name",
                          "कर्मचारीको नाम",
                          data.employeeName,
                          data.employeeNameNepali,
                        ],
                        [
                          "Designation",
                          "पद",
                          data.designation,
                          data.designationNepali,
                        ],
                        ["Citizenship No", null, data.citizenshipNo, null],
                        ["Contact No", null, data.contactNo, null],
                        ["Blood Group", null, data.bloodGroup, null],
                        [
                          "Permanent Address",
                          null,
                          data.permanentAddress,
                          null,
                        ],
                        ["PIS No", null, data.pisNo, null],
                      ]
                        .filter(([, , v]) => v)
                        .map(([label, nepali, value, nepaliValue]) => (
                          <div
                            key={label}
                            className="flex items-start px-4 py-3 gap-2"
                          >
                            <div className="w-1/2 shrink-0">
                              <p className="text-sm font-bold text-gray-900">
                                {label}
                                {nepali ? ":" : ":"}
                              </p>
                              {nepali && (
                                <p className="text-sm font-medium text-gray-700">
                                  {nepali} :
                                </p>
                              )}
                            </div>
                            <div className="w-1/2">
                              <p className="text-sm text-gray-800">{value}</p>
                              {nepaliValue && (
                                <p className="text-sm text-gray-700">
                                  {nepaliValue}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}

                      {data.otherDetails && (
                        <div className="flex items-start px-4 py-3 gap-2">
                          <div className="w-1/2 shrink-0">
                            <p className="text-sm font-bold text-gray-900">
                              Other Details:
                            </p>
                          </div>
                          <div className="w-1/2">
                            <p className="text-sm text-gray-800">
                              {data.otherDetails}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Submitted date */}
                      <div className="flex items-start px-4 py-3 gap-2 bg-gray-50">
                        <div className="w-1/2 shrink-0">
                          <p className="text-sm font-bold text-gray-900">
                            Submitted:
                          </p>
                        </div>
                        <div className="w-1/2">
                          <p className="text-sm text-gray-600">
                            {data.createdAt
                              ? new Date(data.createdAt).toLocaleDateString(
                                  "en-NP",
                                )
                              : "—"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Edit & Resubmit button — only if Rejected */}
                {data.status === "Rejected" && (
                  <button
                    onClick={handleEditOpen}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FE6E4D] to-[#CC1267] text-white font-bold text-base hover:opacity-90 active:scale-[0.98] transition"
                  >
                    ✏️ Edit & Resubmit Application
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit Form — only shown when editing */}
        <AnimatePresence>
          {editing && (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white poppins rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Banner */}
              <div className="bg-gradient-to-r from-[#FE6E4D] to-[#CC1267] p-6 text-white">
                <p className="text-white/70 text-xs mb-1">
                  Editing Application
                </p>
                <p className="text-2xl font-bold font-mono">
                  {data.submissionId}
                </p>
              </div>

              <div className="p-8">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                  <p className="text-yellow-800 text-sm font-semibold mb-1">
                    ⚠️ Rejection Reason:
                  </p>
                  <p className="text-yellow-700 text-sm">
                    {data.rejectionReason}
                  </p>
                </div>

                <form onSubmit={handleResubmit} className="space-y-5">
                  <Field
                    label="Office's Name"
                    name="officeName"
                    value={editForm.officeName}
                    onChange={handleEditChange}
                    placeholder="e.g. Nepal Rastra Bank"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field
                      label="Employee's Name"
                      nepali="कर्मचारीको नाम"
                      name="employeeName"
                      value={editForm.employeeName}
                      onChange={handleEditChange}
                      required
                      placeholder="Full name in English"
                    />
                    <Field
                      label="Name in Nepali"
                      nepali="नेपालीमा नाम"
                      name="employeeNameNepali"
                      value={editForm.employeeNameNepali}
                      onChange={handleEditChange}
                      required
                      placeholder="पूरा नाम"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field
                      label="Designation"
                      nepali="पद"
                      name="designation"
                      value={editForm.designation}
                      onChange={handleEditChange}
                      required
                      placeholder="e.g. Manager"
                    />
                    <Field
                      label="Designation (Nepali)"
                      nepali="पद नेपालीमा"
                      name="designationNepali"
                      value={editForm.designationNepali}
                      onChange={handleEditChange}
                      required
                      placeholder="e.g. प्रबन्धक"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field
                      label="Citizenship No"
                      nepali="ना.प्र.प.नं."
                      name="citizenshipNo"
                      value={editForm.citizenshipNo}
                      onChange={handleEditChange}
                      required
                      placeholder="e.g. 12-34-56-78901"
                    />
                    <Field
                      label="Contact No"
                      name="contactNo"
                      value={editForm.contactNo}
                      onChange={handleEditChange}
                      required
                      type="tel"
                      placeholder="98XXXXXXXX"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Blood Group
                      </label>
                      <select
                        name="bloodGroup"
                        value={editForm.bloodGroup}
                        onChange={handleEditChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FE6E4D] focus:ring-2 focus:ring-[#FE6E4D]/20 transition text-gray-800 bg-white"
                      >
                        <option value="">Select</option>
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                          (g) => (
                            <option key={g} value={g}>
                              {g}
                            </option>
                          ),
                        )}
                      </select>
                    </div>
                    <Field
                      label="PIS No (कर्मचारी संकेत नं.)"
                      name="pisNo"
                      value={editForm.pisNo}
                      onChange={handleEditChange}
                      placeholder="e.g. 001"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field
                      label="Permanent Address"
                      nepali="स्थायी ठेगाना"
                      name="permanentAddress"
                      value={editForm.permanentAddress}
                      onChange={handleEditChange}
                      required
                      placeholder="Address in English"
                    />
                    <Field
                      label="Address (Nepali)"
                      name="permanentAddressNepali"
                      value={editForm.permanentAddressNepali}
                      onChange={handleEditChange}
                      required
                      placeholder="स्थायी ठेगाना"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Others Detail{" "}
                      <span className="text-gray-400 font-normal text-xs">
                        (if any)
                      </span>
                    </label>
                    <textarea
                      name="otherDetails"
                      value={editForm.otherDetails}
                      onChange={handleEditChange}
                      rows={3}
                      placeholder="Any additional information..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FE6E4D] focus:ring-2 focus:ring-[#FE6E4D]/20 transition text-gray-800 bg-white resize-none"
                    />
                  </div>

                  {resubmitError && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
                      {resubmitError}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      className="flex-1 py-4 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={resubmitLoading}
                      className="flex-1 py-4 rounded-xl bg-gradient-to-r from-[#FE6E4D] to-[#CC1267] text-white font-bold hover:opacity-90 active:scale-[0.98] transition disabled:opacity-60"
                    >
                      {resubmitLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="animate-spin w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          Resubmitting...
                        </span>
                      ) : (
                        "Resubmit Application"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FormStatus;
