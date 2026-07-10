import { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button, Card, CardBody } from "@windmill/react-ui";
import { FiChevronLeft, FiGlobe, FiBriefcase, FiMail, FiPhone, FiCalendar } from "react-icons/fi";
import useAsync from "@/hooks/useAsync";
import LeadServices from "@/services/LeadServices";
import Loading from "@/components/preloader/Loading";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import { notifySuccess, notifyError } from "@/utils/toast";

const getLangValue = (val) => {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object" && val.en) return val.en;
  return JSON.stringify(val);
};

const getSafeImages = (imageData) => {
  if (!imageData) return [];
  if (Array.isArray(imageData)) return imageData;
  if (typeof imageData === "string") return [imageData];
  return [];
};

const LeadDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const { setIsUpdate } = useContext(SidebarContext);

  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // CRM Form States
  const [status, setStatus] = useState("pending");
  const [assignedTo, setAssignedTo] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchLeadDetails = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await LeadServices.getLeadById(id);
      if (data) {
        setLead(data);
        setStatus(data.status || "pending");
        setAssignedTo(data.assignedTo || "");
        setAdminNotes(data.adminNotes || "");
      } else {
        setError("Enquiry not found");
      }
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Enquiry not found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchLeadDetails();
    }
  }, [id]);

  const handleSaveChanges = async () => {
    setSaving(true);
    try {
      await LeadServices.updateLead(id, {
        status,
        assignedTo,
        adminNotes,
      });
      notifySuccess("Enquiry updated successfully");
      setIsUpdate(true);
      fetchLeadDetails();
    } catch (err) {
      notifyError(err?.response?.data?.message || err?.message || "Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-64 flex flex-col justify-center items-center">
        <Loading loading={loading} />
        <p className="text-xs text-gray-500 mt-2">Loading enquiry details...</p>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-24 h-24 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-4 text-red-500">
          <FiBriefcase className="w-12 h-12" />
        </div>
        <h2 className="text-xl font-black text-gray-800 dark:text-gray-200">Enquiry Not Found</h2>
        <p className="text-xs text-gray-450 dark:text-gray-450 mt-2 max-w-sm">
          The enquiry reference ID is invalid, or has been deleted from the database.
        </p>
        <button
          onClick={() => history.push("/leads")}
          className="mt-6 flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-sm transition-all"
        >
          <FiChevronLeft /> Back to Enquiries
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between my-6 gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => history.push("/leads")}
            className="w-10 h-10 rounded-xl border border-gray-250 dark:border-gray-650 bg-white dark:bg-gray-750 text-gray-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-700 flex items-center justify-center transition-all shadow-xs"
            title="Go Back"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-black text-gray-800 dark:text-gray-150 tracking-tight">
              Enquiry Reference ID: {lead._id}
            </h1>
            <p className="text-[10px] text-gray-450 dark:text-gray-450 font-bold uppercase tracking-wider mt-0.5">
              Customer Enquiry CRM Worksheet
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className={`px-3 py-1.5 text-xs font-black uppercase rounded-xl border-0 ${
            lead.status === "pending"
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
              : lead.status === "contacted"
              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
              : lead.status === "completed"
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              : lead.status === "cancelled"
              ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
              : "bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-400"
          }`}>
            Status: {lead.status || "pending"}
          </span>
        </div>
      </div>

      {/* Main Details Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
        {/* Left Columns - Client & Enquiry Details */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Customer Information Card */}
          <Card className="min-w-0 shadow-xs border border-gray-150 dark:border-gray-700/80 rounded-2xl bg-white dark:bg-gray-800">
            <CardBody className="p-6">
              <h4 className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                Customer Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500">Name</p>
                  <p className="text-slate-800 dark:text-gray-200 mt-0.5">{lead.name}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500">Company</p>
                  <p className="text-slate-800 dark:text-gray-200 mt-0.5">{lead.company || "Individual Client"}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500">Country</p>
                  <p className="text-slate-800 dark:text-gray-200 mt-0.5">{lead.country || lead.state || "N/A"}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500">Phone</p>
                  <p className="text-slate-800 dark:text-gray-200 mt-0.5">{lead.phone}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500">Email Address</p>
                  <p className="text-slate-800 dark:text-gray-200 font-mono mt-0.5">{lead.email}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500">Full Address</p>
                  <p className="text-slate-600 dark:text-gray-300 leading-relaxed font-normal mt-0.5">
                    {lead.address || "N/A"}
                    {lead.district && `, ${lead.district}`}
                    {lead.state && `, ${lead.state}`}
                    {lead.pincode && ` - ${lead.pincode}`}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Enquiry details card */}
          <Card className="min-w-0 shadow-xs border border-gray-150 dark:border-gray-700/80 rounded-2xl bg-white dark:bg-gray-800">
            <CardBody className="p-6">
              <h4 className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                Enquiry &amp; Quote Details
              </h4>
              <div className="space-y-4">
                {lead.product?.items?.length > 0 ? (
                  lead.product.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 border border-gray-100 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900/50">
                      <img
                        src={item.image}
                        className="w-16 h-16 object-cover rounded-lg shadow-xs border border-gray-100 dark:border-gray-700 flex-shrink-0"
                        onError={(e) => e.target.src = "/no-result.svg"}
                      />
                      <div className="flex-grow min-w-0">
                        <h5 className="font-bold text-slate-800 dark:text-gray-200 text-sm truncate">{item.name}</h5>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 capitalize">{item.category}</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400">Qty: {item.quantity}</span>
                          <span className="text-[10px] font-mono text-gray-450">ID: {item.id}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col sm:flex-row gap-4 p-3 border border-gray-100 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900/50">
                    {getSafeImages(lead.product?.variant?.image || lead.product?.images).slice(0, 1).map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        className="w-20 h-20 object-cover rounded-lg border border-gray-100 dark:border-gray-700 shadow-xs flex-shrink-0"
                        onError={(e) => e.target.src = "/no-result.svg"}
                      />
                    ))}
                    <div className="flex-grow space-y-1">
                      <h5 className="font-bold text-slate-800 dark:text-gray-200 text-sm">{getLangValue(lead.product?.title) || "Manual Quote"}</h5>
                      <span className="inline-block px-2 py-0.5 bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400 text-[10px] font-black rounded-full">
                        {getLangValue(lead.product?.category?.name) || "General"}
                      </span>
                      <div className="grid grid-cols-2 gap-4 pt-1 text-[11px]">
                        <div>
                          <span className="text-gray-400 dark:text-gray-500 block uppercase font-bold text-[9px]">Variant</span>
                          <span className="font-bold text-slate-700 dark:text-gray-300">{getLangValue(lead.product?.variant?.title) || "Standard"}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 dark:text-gray-500 block uppercase font-bold text-[9px]">SKU</span>
                          <span className="font-bold text-slate-700 dark:text-gray-300">{lead.product?.variant?.sku || lead.product?.sku || "N/A"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity / Pricing Estimate */}
              {(lead.quantity || lead.estimatedTotal) && (
                <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 text-xs font-semibold">
                  <div>
                    <p className="text-[9px] uppercase font-black text-gray-450 dark:text-gray-500">Quote Type</p>
                    <p className="text-slate-800 dark:text-gray-300 mt-0.5 capitalize">{lead.enquiryType || "bulk"}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-black text-gray-450 dark:text-gray-500">Slab Count</p>
                    <p className="text-slate-800 dark:text-gray-300 mt-0.5 font-extrabold">{lead.quantity || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-black text-gray-450 dark:text-gray-500">Estimated Total</p>
                    <p className="text-sm font-black text-blue-600 dark:text-blue-400 mt-0.5">
                      {lead.currency || "₹"}{lead.estimatedTotal || "0"}
                    </p>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>

          {/* Customer Message Card */}
          <Card className="min-w-0 shadow-xs border border-gray-150 dark:border-gray-700/80 rounded-2xl bg-white dark:bg-gray-800">
            <CardBody className="p-6">
              <h4 className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2.5 pb-2 border-b border-gray-100 dark:border-gray-700">
                Message
              </h4>
              <p className="text-slate-650 dark:text-gray-300 text-xs leading-relaxed italic bg-slate-50/50 dark:bg-gray-900/30 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                "{lead.message || "No comments or description provided by the client."}"
              </p>
            </CardBody>
          </Card>
        </div>

        {/* Right Columns - CRM Worksheet Operations */}
        <div className="lg:col-span-4 space-y-6">
          {/* CRM Timeline */}
          <Card className="min-w-0 shadow-xs border border-gray-150 dark:border-gray-700/80 rounded-2xl bg-white dark:bg-gray-800">
            <CardBody className="p-6 space-y-3 text-xs font-semibold">
              <h4 className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider pb-2 border-b border-gray-100 dark:border-gray-700">
                CRM Timeline
              </h4>
              <div className="space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-gray-400 dark:text-gray-500">Submitted</span>
                  <span className="text-slate-800 dark:text-gray-300">{new Date(lead.createdAt).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 dark:text-gray-500">Last Action</span>
                  <span className="text-slate-800 dark:text-gray-300">{new Date(lead.updatedAt).toLocaleString()}</span>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Status, assignee, and notes editor */}
          <Card className="min-w-0 shadow-xs border border-gray-150 dark:border-gray-700/80 rounded-2xl bg-white dark:bg-gray-800">
            <CardBody className="p-6 space-y-4">
              <h4 className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider pb-2 border-b border-gray-100 dark:border-gray-700">
                CRM Status & Actions
              </h4>

              {/* Status Dropdown */}
              <div>
                <label className="block text-[10px] font-black text-gray-400 dark:text-gray-555 uppercase tracking-widest mb-1.5">
                  Status badge
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full text-xs border border-gray-250 dark:border-gray-650 dark:bg-gray-750 dark:text-gray-200 py-2 px-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0b1d3d] cursor-pointer"
                >
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Assignee Field */}
              <div>
                <label className="block text-[10px] font-black text-gray-400 dark:text-gray-555 uppercase tracking-widest mb-1.5">
                  Assignee (Staff Name/ID)
                </label>
                <input
                  type="text"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  placeholder="e.g. Sales Executive"
                  className="w-full text-xs border border-gray-250 dark:border-gray-650 dark:bg-gray-750 dark:text-gray-200 py-2.5 px-3.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0b1d3d]"
                />
              </div>

              {/* Internal Notes */}
              <div>
                <label className="block text-[10px] font-black text-gray-400 dark:text-gray-555 uppercase tracking-widest mb-1.5">
                  Internal Admin Notes
                </label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Log status changes, details discussed, follow-ups..."
                  rows={5}
                  className="w-full text-xs border border-gray-250 dark:border-gray-650 dark:bg-gray-750 dark:text-gray-200 py-2.5 px-3.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0b1d3d] resize-none"
                />
              </div>

              {/* Save Action Button */}
              <div className="pt-2">
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 shadow-sm rounded-xl font-bold uppercase tracking-wider text-xs py-3 cursor-pointer"
                  disabled={saving}
                  onClick={handleSaveChanges}
                >
                  {saving ? "Saving Details..." : "Save Changes"}
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default LeadDetails;
