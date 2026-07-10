import { useEffect, useState, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@windmill/react-ui";
import { IoCloudDownloadOutline } from "react-icons/io5";
import {
  FiTrash2,
  FiUser,
  FiMail,
  FiCheck,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiEye,
  FiPhone,
  FiCalendar,
  FiGlobe,
  FiBriefcase,
  FiChevronRight,
} from "react-icons/fi";
import exportFromJSON from "export-from-json";
import PageTitle from "@/components/Typography/PageTitle";
import TableLoading from "@/components/preloader/TableLoading";
import NotFound from "@/components/table/NotFound";
import LeadServices from "@/services/LeadServices";
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

const Leads = () => {
  const history = useHistory();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [productFilter, setProductFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [totalResults, setTotalResults] = useState(0);

  // Selection states (for bulk actions)
  const [selectedIds, setSelectedIds] = useState([]);

  const headerCheckboxRef = useRef(null);

  const allVisibleSelected = leads.length > 0 && leads.every((l) => selectedIds.includes(l._id));
  const someVisibleSelected = leads.length > 0 && leads.some((l) => selectedIds.includes(l._id)) && !allVisibleSelected;

  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = someVisibleSelected;
    }
  }, [leads, selectedIds, someVisibleSelected]);

  // Modal states
  const [selectedLead, setSelectedLead] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState(null);

  // Modal form states
  const [modalStatus, setModalStatus] = useState("");
  const [modalAssignee, setModalAssignee] = useState("");
  const [modalNotes, setModalNotes] = useState("");
  const [savingModal, setSavingModal] = useState(false);

  // Quick action state
  const [updatingStatusId, setUpdatingStatusId] = useState(null);

  const { pathname } = useLocation();

  // Determine enquiryType filter from route
  let enquiryType = "";
  if (pathname === "/leads/general") {
    enquiryType = "general";
  } else if (pathname === "/leads/product") {
    enquiryType = "product";
  } else if (pathname === "/leads/quote") {
    enquiryType = "quote";
  } else if (pathname === "/leads/service") {
    enquiryType = "service";
  }

  let pageTitle = "All Enquiries";
  let pageSubtitle = "Manage all customer enquiries from one place.";
  if (enquiryType === "general") {
    pageTitle = "General Enquiries";
    pageSubtitle = "Contact requests, exports, medical tourism and hospitality queries.";
  } else if (enquiryType === "product") {
    pageTitle = "Product Enquiries";
    pageSubtitle = "Direct quote requests and inquiries for specific products.";
  } else if (enquiryType === "quote") {
    pageTitle = "Quote Requests";
    pageSubtitle = "Bulk quotes, cart quote requests, and order slab pricing.";
  } else if (enquiryType === "service") {
    pageTitle = "Service Enquiries";
    pageSubtitle = "Clinical services, hospital management, and sourcing contract requests.";
  }

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await LeadServices.getAllLeads({
        search: searchTerm,
        status: statusFilter,
        country: countryFilter,
        product: productFilter,
        startDate,
        endDate,
        page: currentPage,
        limit: resultsPerPage,
        enquiryType,
      });
      setLeads(res.leads || []);
      setTotalResults(res.totalDoc || 0);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to fetch enquiries");
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch triggers
  useEffect(() => {
    fetchLeads();
  }, [currentPage, resultsPerPage, searchTerm, statusFilter, countryFilter, productFilter, startDate, endDate, pathname]);

  // Load modal variables when selectedLead changes
  useEffect(() => {
    if (selectedLead) {
      setModalStatus(selectedLead.status || "pending");
      setModalAssignee(selectedLead.assignedTo || "");
      setModalNotes(selectedLead.adminNotes || "");
    }
  }, [selectedLead]);

  const handleReset = () => {
    setSearchTerm("");
    setStatusFilter("");
    setCountryFilter("");
    setProductFilter("");
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
  };

  const handleStatusChange = async (leadId, newStatus) => {
    setUpdatingStatusId(leadId);
    try {
      await LeadServices.updateLead(leadId, { status: newStatus });
      notifySuccess("Status updated successfully");
      fetchLeads();
    } catch (err) {
      notifyError(err?.response?.data?.message || err?.message || "Failed to update status");
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const handleSaveModalChanges = async () => {
    if (!selectedLead) return;
    setSavingModal(true);
    try {
      await LeadServices.updateLead(selectedLead._id, {
        status: modalStatus,
        assignedTo: modalAssignee,
        adminNotes: modalNotes,
      });
      notifySuccess("Enquiry saved successfully");
      setModalOpen(false);
      fetchLeads();
    } catch (err) {
      notifyError(err?.response?.data?.message || err?.message || "Failed to save changes");
    } finally {
      setSavingModal(false);
    }
  };

  const handleDeleteLead = async () => {
    if (!leadToDelete) return;
    try {
      await LeadServices.deleteLead(leadToDelete._id);
      notifySuccess("Enquiry deleted successfully");
      setDeleteModalOpen(false);
      setLeadToDelete(null);
      fetchLeads();
    } catch (err) {
      notifyError(err?.response?.data?.message || err?.message || "Failed to delete enquiry");
    }
  };

  // Checkbox helpers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds((prev) => {
        const newIds = [...prev];
        leads.forEach((l) => {
          if (!newIds.includes(l._id)) {
            newIds.push(l._id);
          }
        });
        return newIds;
      });
    } else {
      const visibleIds = leads.map((l) => l._id);
      setSelectedIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
    }
  };

  const handleSelectRow = (id, checked) => {
    if (checked) {
      setSelectedIds((prev) => {
        if (prev.includes(id)) return prev;
        return [...prev, id];
      });
    } else {
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    }
  };

  // Bulk Actions
  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} selected enquiries?`)) return;
    try {
      await LeadServices.bulkDeleteLeads(selectedIds);
      notifySuccess("Selected enquiries deleted successfully");
      setSelectedIds([]);
      fetchLeads();
    } catch (err) {
      notifyError(err?.response?.data?.message || err?.message || "Failed to delete enquiries");
    }
  };

  const handleBulkStatusChange = async (status) => {
    if (selectedIds.length === 0) return;
    try {
      await LeadServices.bulkStatusUpdate(selectedIds, status);
      notifySuccess(`Selected enquiries marked as ${status}`);
      setSelectedIds([]);
      fetchLeads();
    } catch (err) {
      notifyError(err?.response?.data?.message || err?.message || "Failed to update enquiries");
    }
  };

  const handleBulkExport = () => {
    const selectedLeads = leads.filter((l) => selectedIds.includes(l._id));
    exportLeadsToCsv(selectedLeads);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "contacted":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-400";
    }
  };

  // CSV Export utility
  const exportLeadsToCsv = (dataset) => {
    const exportData = dataset.map((lead) => ({
      name: lead.name,
      company: lead.company || (lead.isEnterprise ? "Enterprise" : "Individual"),
      country: lead.country || "N/A",
      email: lead.email,
      phone: lead.phone,
      address: lead.address || "N/A",
      state: lead.state || "N/A",
      district: lead.district || "N/A",
      pincode: lead.pincode || "N/A",
      message: lead.message,
      enquiryType: lead.enquiryType || "General",
      product: lead.product?.items?.length > 0
        ? lead.product.items.map(i => `${i.name} (Qty: ${i.quantity})`).join(', ')
        : getLangValue(lead.product?.title) || "N/A",
      quantity: lead.product?.items?.length > 0
        ? lead.product.items.reduce((acc, i) => acc + i.quantity, 0)
        : lead.quantity || 1,
      estimatedTotal: lead.product?.items?.length > 0
        ? lead.product.items.reduce((acc, i) => acc + (i.price * i.quantity), 0)
        : lead.estimatedTotal || 0,
      status: lead.status || "pending",
      assignedTo: lead.assignedTo || "Unassigned",
      adminNotes: lead.adminNotes || "",
      date: new Date(lead.createdAt).toLocaleString(),
    }));

    exportFromJSON({
      data: exportData,
      fileName: "customer_enquiries",
      exportType: exportFromJSON.types.csv,
    });
  };

  const handleDownloadFiltered = () => {
    exportLeadsToCsv(leads);
  };

  return (
    <>
      {/* Top Title & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between my-6 gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-800 dark:text-gray-150 tracking-tight">
            {pageTitle}
          </h1>
          <p className="text-xs text-gray-455 mt-1">
            {pageSubtitle}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={fetchLeads}
            className="flex items-center gap-1.5 border border-gray-250 dark:border-gray-650 bg-white dark:bg-gray-750 text-gray-700 dark:text-gray-200 font-bold text-xs py-2 px-3 rounded-xl hover:bg-slate-50 transition-all"
            title="Refresh Leads"
          >
            <FiRefreshCw className={loading ? "animate-spin" : ""} /> Refresh
          </button>
          <button
            type="button"
            onClick={handleDownloadFiltered}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-3.5 rounded-xl shadow-sm transition-all"
          >
            <IoCloudDownloadOutline className="text-sm" /> Export CSV
          </button>
        </div>
      </div>

      {/* Filter and Search Card */}
      <Card className="min-w-0 shadow-sm overflow-hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-150 dark:border-gray-700/80 mb-6 rounded-2xl">
        <CardBody className="p-5 space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Search Input */}
            <div>
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-555 uppercase tracking-widest block mb-1.5">Search Keywords</label>
              <div style={{ position: "relative" }}>
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Name, email, phone, company..."
                  style={{ paddingLeft: "36px" }}
                  className="w-full pr-4 py-2 border border-gray-250 dark:border-gray-650 rounded-xl text-xs dark:bg-gray-750 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-[#0b1d3d]"
                />
                <FiSearch style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", zIndex: 10, pointerEvents: "none" }} className="text-gray-400 w-4 h-4" />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-555 uppercase tracking-widest block mb-1.5">Filter Status</label>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="block w-full text-xs border border-gray-250 dark:border-gray-650 dark:bg-gray-750 dark:text-gray-200 py-2 px-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0b1d3d] cursor-pointer"
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Country Filter */}
            <div>
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-555 uppercase tracking-widest block mb-1.5">Country</label>
              <div style={{ position: "relative" }}>
                <input
                  type="search"
                  value={countryFilter}
                  onChange={(e) => {
                    setCountryFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Filter country..."
                  style={{ paddingLeft: "36px" }}
                  className="w-full pr-4 py-2 border border-gray-250 dark:border-gray-650 rounded-xl text-xs dark:bg-gray-750 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-[#0b1d3d]"
                />
                <FiGlobe style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", zIndex: 10, pointerEvents: "none" }} className="text-gray-400 w-4 h-4" />
              </div>
            </div>

            {/* Product Filter */}
            <div>
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-555 uppercase tracking-widest block mb-1.5">Product</label>
              <div style={{ position: "relative" }}>
                <input
                  type="search"
                  value={productFilter}
                  onChange={(e) => {
                    setProductFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Filter product name..."
                  style={{ paddingLeft: "36px" }}
                  className="w-full pr-4 py-2 border border-gray-250 dark:border-gray-650 rounded-xl text-xs dark:bg-gray-750 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-[#0b1d3d]"
                />
                <FiBriefcase style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", zIndex: 10, pointerEvents: "none" }} className="text-gray-400 w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4 items-end pt-2 border-t border-gray-100 dark:border-gray-700">
            {/* Start Date */}
            <div>
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-555 uppercase tracking-widest block mb-1.5">Start Date</label>
              <div style={{ position: "relative" }}>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={{ paddingLeft: "36px" }}
                  className="w-full pr-4 py-2 border border-gray-250 dark:border-gray-650 rounded-xl text-xs dark:bg-gray-750 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-[#0b1d3d] cursor-pointer"
                />
                <FiCalendar style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", zIndex: 10, pointerEvents: "none" }} className="text-gray-400 w-4 h-4" />
              </div>
            </div>

            {/* End Date */}
            <div>
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-555 uppercase tracking-widest block mb-1.5">End Date</label>
              <div style={{ position: "relative" }}>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={{ paddingLeft: "36px" }}
                  className="w-full pr-4 py-2 border border-gray-250 dark:border-gray-650 rounded-xl text-xs dark:bg-gray-750 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-[#0b1d3d] cursor-pointer"
                />
                <FiCalendar style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", zIndex: 10, pointerEvents: "none" }} className="text-gray-400 w-4 h-4" />
              </div>
            </div>

            {/* Entries Size */}
            <div>
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-555 uppercase tracking-widest block mb-1.5">Entries Per Page</label>
              <select
                value={resultsPerPage}
                onChange={(e) => {
                  setResultsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="block w-full text-xs border border-gray-250 dark:border-gray-650 dark:bg-gray-750 dark:text-gray-200 py-2 px-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0b1d3d] cursor-pointer"
              >
                <option value={10}>10 Entries</option>
                <option value={25}>25 Entries</option>
                <option value={50}>50 Entries</option>
                <option value={100}>100 Entries</option>
              </select>
            </div>

            {/* Actions button */}
            <div className="flex gap-2">
              <Button
                layout="outline"
                onClick={handleReset}
                className="w-full py-2.5 rounded-xl border border-gray-200 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 text-xs font-bold"
              >
                <FiRefreshCw /> Reset Filters
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Bulk Actions Floating Bar */}
      {selectedIds.length > 0 && (
        <Card className="min-w-0 shadow-md bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-slate-700 mb-6 rounded-2xl animate-fade-in-up">
          <CardBody className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
              <p className="text-xs font-black text-blue-900 dark:text-blue-200">
                Selected {selectedIds.length} enquiries
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleBulkStatusChange("contacted")}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
              >
                Mark as Contacted
              </button>
              <button
                onClick={() => handleBulkStatusChange("completed")}
                className="px-3.5 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
              >
                Mark as Completed
              </button>
              <button
                onClick={handleBulkExport}
                className="px-3.5 py-1.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-colors"
              >
                Export Selected
              </button>
              <button
                onClick={handleBulkDelete}
                className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
              >
                Delete Selected
              </button>
              <button
                onClick={() => setSelectedIds([])}
                className="text-xs font-bold text-slate-500 hover:text-slate-700 ml-2"
              >
                Clear
              </button>
            </div>
          </CardBody>
        </Card>
      )}

      {loading ? (
        <TableLoading row={8} col={10} width={160} height={20} />
      ) : error ? (
        <div className="text-center py-10 bg-white rounded-3xl border text-red-500">{error}</div>
      ) : leads.length > 0 ? (
        <>
          {/* Mobile Layout */}
          <div className="block lg:hidden space-y-4 mb-8">
            {leads.map((lead) => (
              <div
                key={lead._id}
                className="bg-white dark:bg-gray-850 rounded-2xl border border-gray-150 dark:border-gray-750 p-4 shadow-xs relative space-y-3"
              >
                {/* Header info */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(lead._id)}
                      onChange={(e) => handleSelectRow(lead._id, e.target.checked)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                    <div>
                      <h4 className="font-extrabold text-sm text-gray-855 dark:text-gray-100">{lead.name}</h4>
                      <p className="text-[10px] text-gray-450 mt-0.5">{new Date(lead.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => history.push(`/leads/${lead._id}`)}
                      className="text-blue-500 hover:text-blue-700 p-1.5 rounded-lg hover:bg-blue-50 cursor-pointer"
                      title="View details"
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setLeadToDelete(lead);
                        setDeleteModalOpen(true);
                      }}
                      className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-55"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Additional metrics */}
                <div className="grid grid-cols-2 gap-2 text-xs border-t border-b py-2 text-gray-500">
                  <div className="truncate"><span className="font-bold">Company:</span> {lead.company || "Individual"}</div>
                  <div className="truncate"><span className="font-bold">Country:</span> {lead.country || "N/A"}</div>
                  <div className="truncate"><span className="font-bold">Phone:</span> {lead.phone}</div>
                  <div className="truncate"><span className="font-bold">Type:</span> {lead.enquiryType || "General"}</div>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700 truncate max-w-[200px]">
                    {lead.product?.items?.length > 0
                      ? `${lead.product.items.length} Products`
                      : getLangValue(lead.product?.title) || "Manual Quote"}
                  </span>
                  <select
                    value={lead.status || "pending"}
                    onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                    disabled={updatingStatusId === lead._id}
                    className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 border-0 rounded-full ${getStatusColor(lead.status || "pending")}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="contacted">Contacted</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}

            {/* Pagination Controls */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-150 dark:border-gray-750 p-4 flex justify-center shadow-xs">
              <Pagination
                totalResults={totalResults}
                resultsPerPage={resultsPerPage}
                onChange={setCurrentPage}
                label="Table navigation"
              />
            </div>
          </div>

          {/* Desktop Table View */}
          <TableContainer className="hidden lg:block mb-8 rounded-3xl border border-gray-150 dark:border-gray-700/80 shadow-xs responsive-table-container">
            <Table className="crm-table">
              <TableHeader>
                <tr className="bg-gray-50/50 dark:bg-gray-900/20 text-gray-500 uppercase tracking-wider text-[10px] font-black">
                  <TableCell className="py-3 w-10">
                    <input
                      type="checkbox"
                      ref={headerCheckboxRef}
                      onChange={handleSelectAll}
                      onClick={(e) => e.stopPropagation()}
                      checked={allVisibleSelected}
                      className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                  </TableCell>
                  <TableCell className="py-3">Customer Name</TableCell>
                  <TableCell className="py-3">Company</TableCell>
                  <TableCell className="py-3">Country</TableCell>
                  <TableCell className="py-3">Phone</TableCell>
                  <TableCell className="py-3">Email</TableCell>
                  <TableCell className="py-3">Enquiry Type</TableCell>
                  <TableCell className="py-3">Product</TableCell>
                  <TableCell className="py-3">Date</TableCell>
                  <TableCell className="py-3 text-center">Status</TableCell>
                  <TableCell className="py-3 text-right">Actions</TableCell>
                </tr>
              </TableHeader>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-755 text-xs font-semibold text-gray-755 dark:text-gray-305 bg-white dark:bg-gray-800">
                {leads.map((lead) => (
                  <tr
                    key={lead._id}
                    className="hover:bg-blue-50/30 dark:hover:bg-gray-755/20 transition-colors"
                  >
                    <TableCell className="py-3.5">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(lead._id)}
                        onChange={(e) => handleSelectRow(lead._id, e.target.checked)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                      />
                    </TableCell>
                    <TableCell
                      className="cursor-pointer py-3.5 font-bold text-gray-855 dark:text-gray-100"
                      onClick={() => {
                        setSelectedLead(lead);
                        setModalOpen(true);
                      }}
                    >
                      {lead.name}
                    </TableCell>
                    <TableCell className="py-3.5 text-gray-600 dark:text-gray-400">
                      {lead.company || (lead.isEnterprise ? "Enterprise" : "Individual")}
                    </TableCell>
                    <TableCell className="py-3.5 text-gray-600 dark:text-gray-400">
                      {lead.country || lead.state || "N/A"}
                    </TableCell>
                    <TableCell className="py-3.5">{lead.phone}</TableCell>
                    <TableCell className="py-3.5 font-mono text-gray-500">{lead.email}</TableCell>
                    <TableCell className="py-3.5 text-xs font-bold text-slate-700 capitalize">
                      {lead.enquiryType || "General"}
                    </TableCell>
                    <TableCell className="py-3.5 text-gray-700 dark:text-gray-300">
                      {lead.product?.items?.length > 0 ? (
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                          {lead.product.items.length} Products
                        </span>
                      ) : (
                        <span className="italic truncate block max-w-[150px]">{getLangValue(lead.product?.title) || "Manual Quote"}</span>
                      )}
                    </TableCell>
                    <TableCell className="py-3.5 text-gray-500">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="py-3.5 text-center">
                      <select
                        value={lead.status || "pending"}
                        onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                        disabled={updatingStatusId === lead._id}
                        className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 border-0 rounded-full cursor-pointer ${getStatusColor(
                          lead.status || "pending"
                        )} ${updatingStatusId === lead._id ? "opacity-50" : ""}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </TableCell>
                    <TableCell className="py-3.5 text-right">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => history.push(`/leads/${lead._id}`)}
                          className="text-blue-500 hover:text-blue-700 p-1.5 rounded-lg hover:bg-blue-50 cursor-pointer"
                          title="View"
                        >
                          <FiEye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setLeadToDelete(lead);
                            setDeleteModalOpen(true);
                          }}
                          className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-55"
                          title="Delete"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </TableCell>
                  </tr>
                ))}
              </tbody>
            </Table>
            <TableFooter className="bg-gray-50/50 dark:bg-gray-900/20">
              <Pagination
                totalResults={totalResults}
                resultsPerPage={resultsPerPage}
                onChange={setCurrentPage}
                label="Table navigation"
              />
            </TableFooter>
          </TableContainer>
        </>
      ) : (
        <NotFound title="No customer enquiries found matching the filters." />
      )}

      {/* CRM Lead Details Modal */}
      {modalOpen && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl max-w-5xl w-full max-h-[94vh] flex flex-col relative overflow-hidden animate-fade-in-up">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-slate-50 flex-shrink-0">
              <div>
                <h3 className="font-extrabold text-slate-800 text-sm sm:text-base leading-tight">
                  Enquiry Reference ID: {selectedLead._id}
                </h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                  Customer Enquiry CRM Worksheet
                </p>
              </div>
              <button
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 text-lg transition-colors"
                onClick={() => setModalOpen(false)}
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Left Side: customer info & products */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Customer Information */}
                  <div className="bg-slate-50/60 p-5 rounded-2xl border border-slate-100">
                    <h4 className="text-xs font-black text-ilmic-blue uppercase tracking-wider mb-4 pb-1 border-b border-slate-200">
                      Customer Information
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-gray-400">Name</p>
                        <p className="text-slate-800">{selectedLead.name}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-gray-400">Company</p>
                        <p className="text-slate-800">{selectedLead.company || "Individual Client"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-gray-400">Country</p>
                        <p className="text-slate-800">{selectedLead.country || selectedLead.state || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-gray-400">Phone</p>
                        <p className="text-slate-800">{selectedLead.phone}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-[10px] uppercase font-bold text-gray-400">Email Address</p>
                        <p className="text-slate-800 font-mono">{selectedLead.email}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-[10px] uppercase font-bold text-gray-400">Full Address</p>
                        <p className="text-slate-600 leading-relaxed font-normal">
                          {selectedLead.address || "N/A"}
                          {selectedLead.district && `, ${selectedLead.district}`}
                          {selectedLead.state && `, ${selectedLead.state}`}
                          {selectedLead.pincode && ` - ${selectedLead.pincode}`}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Products Details List */}
                  <div className="bg-slate-50/60 p-5 rounded-2xl border border-slate-100">
                    <h4 className="text-xs font-black text-ilmic-blue uppercase tracking-wider mb-4 pb-1 border-b border-slate-200">
                      Enquiry &amp; Quote Details
                    </h4>
                    <div className="space-y-4">
                      {selectedLead.product?.items?.length > 0 ? (
                        selectedLead.product.items.map((item, index) => (
                          <div key={index} className="flex items-center gap-4 p-3 border rounded-xl bg-white">
                            <img
                              src={item.image}
                              className="w-16 h-16 object-cover rounded-lg shadow-xs border flex-shrink-0"
                              onError={(e) => e.target.src = "/no-result.svg"}
                            />
                            <div className="flex-grow min-w-0">
                              <h5 className="font-bold text-slate-800 text-sm truncate">{item.name}</h5>
                              <p className="text-[10px] text-gray-400 capitalize">{item.category}</p>
                              <div className="flex justify-between items-center mt-1">
                                <span className="text-xs font-extrabold text-blue-600">Qty: {item.quantity}</span>
                                <span className="text-[10px] font-mono text-gray-400">ID: {item.id}</span>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex flex-col sm:flex-row gap-4 p-3 border rounded-xl bg-white">
                          {getSafeImages(selectedLead.product?.variant?.image || selectedLead.product?.images).slice(0, 1).map((img, i) => (
                            <img
                              key={i}
                              src={img}
                              className="w-20 h-20 object-cover rounded-lg border shadow-xs flex-shrink-0"
                              onError={(e) => e.target.src = "/no-result.svg"}
                            />
                          ))}
                          <div className="flex-grow space-y-1">
                            <h5 className="font-bold text-slate-800 text-sm">{getLangValue(selectedLead.product?.title) || "Manual Quote"}</h5>
                            <span className="inline-block px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-black rounded-full">
                              {getLangValue(selectedLead.product?.category?.name) || "General"}
                            </span>
                            <div className="grid grid-cols-2 gap-4 pt-1 text-[11px]">
                              <div>
                                <span className="text-gray-400 block uppercase font-bold text-[9px]">Variant</span>
                                <span className="font-bold text-slate-700">{getLangValue(selectedLead.product?.variant?.title) || "Standard"}</span>
                              </div>
                              <div>
                                <span className="text-gray-400 block uppercase font-bold text-[9px]">SKU</span>
                                <span className="font-bold text-slate-700">{selectedLead.product?.variant?.sku || selectedLead.product?.sku || "N/A"}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Quantity pricing for bulk orders */}
                    {(selectedLead.quantity || selectedLead.estimatedTotal) && (
                      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-200 text-xs font-semibold">
                        <div>
                          <p className="text-[9px] uppercase font-black text-gray-400">Quote Type</p>
                          <p className="text-slate-800 capitalize">{selectedLead.enquiryType || "bulk"}</p>
                        </div>
                        <div>
                          <p className="text-[9px] uppercase font-black text-gray-400">Slab Count</p>
                          <p className="text-slate-800 font-extrabold">{selectedLead.quantity || "—"}</p>
                        </div>
                        <div>
                          <p className="text-[9px] uppercase font-black text-gray-400">Estimated Total</p>
                          <p className="text-sm font-black text-blue-600">
                            {selectedLead.currency || "₹"}{selectedLead.estimatedTotal || "0"}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Customer Message */}
                  <div className="bg-slate-50/60 p-5 rounded-2xl border border-slate-100">
                    <h4 className="text-xs font-black text-ilmic-blue uppercase tracking-wider mb-2.5 pb-1 border-b border-slate-200">
                      Message
                    </h4>
                    <p className="text-slate-600 text-xs leading-relaxed italic bg-white p-4 rounded-xl border border-slate-100">
                      "{selectedLead.message || "No comments or description provided by the client."}"
                    </p>
                  </div>
                </div>

                {/* Right Side: Admin CRM interactions */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Timeline & Metadata */}
                  <div className="bg-slate-50/60 p-5 rounded-2xl border border-slate-100 space-y-3 text-xs font-semibold">
                    <h4 className="text-xs font-black text-ilmic-blue uppercase tracking-wider pb-1 border-b border-slate-200">
                      CRM Timeline
                    </h4>
                    <div className="space-y-2.5">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Submitted</span>
                        <span className="text-slate-800">{new Date(selectedLead.createdAt).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Action</span>
                        <span className="text-slate-800">{new Date(selectedLead.updatedAt).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* CRM Status & Notes Editor */}
                  <div className="bg-slate-50/60 p-5 rounded-2xl border border-slate-100 space-y-4">
                    <h4 className="text-xs font-black text-ilmic-blue uppercase tracking-wider pb-1 border-b border-slate-200">
                      CRM Status & Actions
                    </h4>

                    {/* Status Dropdown */}
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
                        Status badge
                      </label>
                      <select
                        value={modalStatus}
                        onChange={(e) => setModalStatus(e.target.value)}
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
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
                        Assignee (Staff Name/ID)
                      </label>
                      <input
                        type="text"
                        value={modalAssignee}
                        onChange={(e) => setModalAssignee(e.target.value)}
                        placeholder="e.g. Sales Executive"
                        className="w-full text-xs border border-gray-250 dark:border-gray-650 dark:bg-gray-750 dark:text-gray-200 py-2.5 px-3.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0b1d3d]"
                      />
                    </div>

                    {/* Internal Notes */}
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
                        Internal Admin Notes
                      </label>
                      <textarea
                        value={modalNotes}
                        onChange={(e) => setModalNotes(e.target.value)}
                        placeholder="Log status changes, details discussed, follow-ups..."
                        rows={5}
                        className="w-full text-xs border border-gray-250 dark:border-gray-650 dark:bg-gray-750 dark:text-gray-200 py-2.5 px-3.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0b1d3d] resize-none"
                      />
                    </div>

                    {/* Save Action Button */}
                    <div className="pt-2">
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 shadow-sm rounded-xl font-bold uppercase tracking-wider text-xs py-3 cursor-pointer"
                        disabled={savingModal}
                        onClick={handleSaveModalChanges}
                      >
                        {savingModal ? "Saving Details..." : "Save Changes"}
                      </Button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* Single Lead Delete Modal */}
      {deleteModalOpen && leadToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg max-w-md w-full p-6 relative animate-fade-in-up">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl"
              onClick={() => {
                setDeleteModalOpen(false);
                setLeadToDelete(null);
              }}
            >
              &times;
            </button>
            <h2 className="text-lg font-black text-gray-855 dark:text-gray-200 mb-2">
              Delete Enquiry
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
              Are you sure you want to permanently delete the enquiry from <strong>{leadToDelete.name}</strong>? This action will remove it from the system and cannot be undone.
            </p>
            <div className="flex justify-end gap-2.5">
              <Button
                layout="outline"
                className="rounded-xl font-bold text-xs"
                onClick={() => {
                  setDeleteModalOpen(false);
                  setLeadToDelete(null);
                }}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-650 hover:bg-red-750 rounded-xl font-bold text-xs"
                onClick={handleDeleteLead}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Leads;
