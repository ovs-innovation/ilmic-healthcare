import {
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  WindmillContext,
} from "@windmill/react-ui";
import { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import {
  FiCheck,
  FiUser,
  FiMessageCircle,
  FiMail,
  FiShoppingBag,
  FiCalendar,
  FiTrendingUp,
  FiClock,
  FiEye,
} from "react-icons/fi";

//internal import
import useAsync from "@/hooks/useAsync";
import TableLoading from "@/components/preloader/TableLoading";
import NotFound from "@/components/table/NotFound";
import LeadServices from "@/services/LeadServices";
import ProductServices from "@/services/ProductServices";
import AnimatedContent from "@/components/common/AnimatedContent";
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

const ModernMetricCard = ({ title, value, icon: Icon, gradient, loading }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl p-4 sm:p-6 text-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] bg-gradient-to-br ${gradient}`}>
      <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-6 translate-y-6 scale-[1.8] pointer-events-none">
        <Icon className="w-24 h-24" />
      </div>
      <div className="flex items-center justify-between relative z-10">
        <div className="space-y-1">
          <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-white/80 truncate">{title}</p>
          {loading ? (
            <div className="h-6 w-12 sm:w-16 bg-white/20 animate-pulse rounded" />
          ) : (
            <h3 className="text-xl sm:text-3xl font-black tracking-tight">{value}</h3>
          )}
        </div>
        <div className="p-2 sm:p-3.5 bg-white/10 rounded-xl sm:rounded-2xl backdrop-blur-md border border-white/15">
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
      </div>
    </div>
  );
};

const ModernGlassCard = ({ title, value, icon: Icon, iconColor, loading }) => {
  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-150 dark:border-gray-700/80 p-3 sm:p-5 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-3 sm:gap-4">
      <div className={`p-2 sm:p-3 rounded-xl ${iconColor} bg-opacity-10 dark:bg-opacity-20 flex items-center justify-center`}>
        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>
      <div>
        <p className="text-[8px] sm:text-[9px] font-black text-gray-400 dark:text-gray-555 uppercase tracking-widest mb-0.5 sm:mb-1 truncate">{title}</p>
        {loading ? (
          <div className="h-4 w-10 bg-gray-250 dark:bg-gray-700 animate-pulse rounded" />
        ) : (
          <h4 className="text-sm sm:text-lg font-black text-gray-855 dark:text-gray-200">{value}</h4>
        )}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { t } = useTranslation();
  const { mode } = useContext(WindmillContext);
  const { setIsUpdate } = useContext(SidebarContext);
  const history = useHistory();

  // CRM details modal states
  const [selectedLead, setSelectedLead] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState("");
  const [modalAssignee, setModalAssignee] = useState("");
  const [modalNotes, setModalNotes] = useState("");
  const [savingModal, setSavingModal] = useState(false);

  // Sync modal inputs with selected lead
  useEffect(() => {
    if (selectedLead) {
      setModalStatus(selectedLead.status || "pending");
      setModalAssignee(selectedLead.assignedTo || "");
      setModalNotes(selectedLead.adminNotes || "");
    }
  }, [selectedLead]);

  // Lead statistics
  const { data: dashboardLeadCount, loading: loadingLeadCount } = useAsync(
    LeadServices.getDashboardCount
  );

  const { data: dashboardLeadData, loading: loadingLeadData } = useAsync(
    LeadServices.getDashboardLeadData
  );

  const { data: dashboardRecentLeads, loading: loadingRecentLeads } = useAsync(
    () => LeadServices.getDashboardRecentLeads({ page: 1, limit: 5 })
  );

  // Fetch total products
  const { data: productsData, loading: loadingProducts } = useAsync(
    () => ProductServices.getAllProducts({ page: 1, limit: 1 })
  );

  const handleSaveModalChanges = async () => {
    if (!selectedLead) return;
    setSavingModal(true);
    try {
      await LeadServices.updateLead(selectedLead._id, {
        status: modalStatus,
        assignedTo: modalAssignee,
        adminNotes: modalNotes,
      });
      notifySuccess("Enquiry updated successfully");
      setModalOpen(false);
      setIsUpdate(true); // force reload of dashboard useAsync statistics
    } catch (err) {
      notifyError(err?.response?.data?.message || err?.message || "Failed to save changes");
    } finally {
      setSavingModal(false);
    }
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

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between my-6 gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-855 dark:text-gray-100 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-455 mt-1">
            Real-time analytics and customer enquiry intelligence
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 py-1.5 px-3 rounded-xl shadow-xs border border-gray-150 dark:border-gray-755 w-fit">
          <FiCalendar className="text-blue-500 w-4 h-4" />
          <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
            {new Date().toLocaleDateString("en-US", { weekday: 'long', month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>

      <AnimatedContent>
        {/* Row 1: Core Metrics */}
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-8">
          <ModernMetricCard
            title="Total Products"
            value={productsData?.totalDoc || 0}
            icon={FiShoppingBag}
            gradient="from-[#0f766e] via-[#0d9488] to-[#14b8a6]"
            loading={loadingProducts}
          />
          <ModernMetricCard
            title="Total Leads"
            value={dashboardLeadCount?.totalLeads || 0}
            icon={FiUser}
            gradient="from-[#4338ca] via-[#4f46e5] to-[#6366f1]"
            loading={loadingLeadCount}
          />
          <ModernMetricCard
            title="Pending Leads"
            value={dashboardLeadCount?.totalPendingLeads || 0}
            icon={FiMessageCircle}
            gradient="from-[#b45309] via-[#d97706] to-[#f59e0b]"
            loading={loadingLeadCount}
          />
          <ModernMetricCard
            title="Contacted Leads"
            value={dashboardLeadCount?.totalContactedLeads || 0}
            icon={FiMail}
            gradient="from-[#1d4ed8] via-[#2563eb] to-[#3b82f6]"
            loading={loadingLeadCount}
          />
          <ModernMetricCard
            title="Completed Leads"
            value={dashboardLeadCount?.totalCompletedLeads || 0}
            icon={FiCheck}
            gradient="from-[#047857] via-[#059669] to-[#10b981]"
            loading={loadingLeadCount}
          />
        </div>

        {/* Row 2: Timeline Metrics */}
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-8">
          <ModernGlassCard
            title="Today Leads"
            value={dashboardLeadData?.todayLeads || 0}
            icon={FiClock}
            iconColor="text-purple-600 bg-purple-100"
            loading={loadingLeadData}
          />
          <ModernGlassCard
            title="Yesterday Leads"
            value={dashboardLeadData?.yesterdayLeads || 0}
            icon={FiClock}
            iconColor="text-orange-500 bg-orange-100"
            loading={loadingLeadData}
          />
          <ModernGlassCard
            title="This Month Leads"
            value={dashboardLeadData?.thisMonthLeads || 0}
            icon={FiCalendar}
            iconColor="text-pink-500 bg-pink-100"
            loading={loadingLeadData}
          />
          <ModernGlassCard
            title="Last Month Leads"
            value={dashboardLeadData?.lastMonthLeads || 0}
            icon={FiCalendar}
            iconColor="text-teal-600 bg-teal-100"
            loading={loadingLeadData}
          />
          <ModernGlassCard
            title="All Time Leads"
            value={dashboardLeadData?.allTimeLeads || 0}
            icon={FiTrendingUp}
            iconColor="text-green-600 bg-green-100"
            loading={loadingLeadData}
          />
        </div>
      </AnimatedContent>

      {/* Row 3: Recent Leads Section */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-150 dark:border-gray-700/80 p-6 mb-8 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-sm font-black text-gray-855 dark:text-gray-200 uppercase tracking-widest">Recent Enquiries</h2>
            <p className="text-[10px] text-gray-400">Latest queries submitted by healthcare professionals</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/leads"
              className="text-xs font-black text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              View All Enquiries &rarr;
            </Link>
            <span className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
              Live Stream
            </span>
          </div>
        </div>

        {loadingRecentLeads ? (
          <TableLoading row={5} col={6} />
        ) : dashboardRecentLeads?.leads?.length > 0 ? (
          <>
            {/* Mobile View: Recent Enquiries Card List */}
            <div className="block md:hidden space-y-3 mb-4">
              {dashboardRecentLeads.leads.map((lead) => (
                <div
                  key={lead._id}
                  className="bg-white dark:bg-gray-855 rounded-2xl border border-gray-150 dark:border-gray-755 p-4 shadow-xs space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-extrabold text-sm text-gray-800 dark:text-gray-100">
                        {lead.name}
                      </h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {new Date(lead.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => history.push(`/leads/${lead._id}`)}
                        className="text-blue-500 hover:text-blue-700 p-1 rounded hover:bg-slate-50 cursor-pointer"
                        title="View details"
                      >
                        <FiEye className="w-4 h-4" />
                      </button>
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                          lead.status === "pending"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-450"
                            : lead.status === "contacted"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-450"
                            : lead.status === "completed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-455"
                            : lead.status === "cancelled"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-455"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-450"
                        }`}
                      >
                        {(lead.status || "pending").replace("_", " ")}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-500 pt-2 border-t border-gray-100 dark:border-gray-750">
                    <span className="truncate font-mono">{lead.email}</span>
                    <span className="text-right truncate">{lead.phone}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View: Table Container */}
            <TableContainer className="hidden md:block mb-4 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-755 shadow-xs">
              <Table>
                <TableHeader>
                  <tr className="bg-gray-50/50 dark:bg-gray-900/20 text-gray-500 uppercase tracking-wider text-[10px] font-black">
                    <TableCell className="py-3">Customer Name</TableCell>
                    <TableCell className="py-3">Email ID</TableCell>
                    <TableCell className="py-3">Phone Number</TableCell>
                    <TableCell className="py-3 text-center">Status</TableCell>
                    <TableCell className="py-3 text-right">Date & Time</TableCell>
                    <TableCell className="py-3 text-right">Actions</TableCell>
                  </tr>
                </TableHeader>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-755 text-xs font-semibold text-gray-770 dark:text-gray-305 bg-white dark:bg-gray-800">
                  {dashboardRecentLeads.leads.map((lead) => (
                    <tr key={lead._id} className="hover:bg-blue-50/40 dark:hover:bg-gray-700/20 transition-colors">
                      <TableCell className="py-3.5 font-bold text-gray-800 dark:text-gray-100">{lead.name}</TableCell>
                      <TableCell className="py-3.5 font-mono">{lead.email}</TableCell>
                      <TableCell className="py-3.5">{lead.phone}</TableCell>
                      <TableCell className="py-3.5 text-center">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                            lead.status === "pending"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-455"
                              : lead.status === "contacted"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-455"
                              : lead.status === "completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-455"
                              : lead.status === "cancelled"
                              ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-455"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-450"
                          }`}
                        >
                          {(lead.status || "pending").replace("_", " ")}
                        </span>
                      </TableCell>
                      <TableCell className="py-3.5 text-right text-gray-500 dark:text-gray-400">
                        {new Date(lead.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell className="py-3.5 text-right">
                        <button
                          onClick={() => history.push(`/leads/${lead._id}`)}
                          className="text-blue-500 hover:text-blue-700 p-1.5 rounded-lg hover:bg-blue-50 cursor-pointer"
                          title="View Details"
                        >
                          <FiEye className="w-4 h-4" />
                        </button>
                      </TableCell>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <NotFound title="Sorry, There are no leads right now." />
        )}
      </div>

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
                    <h4 className="text-xs font-black text-blue-600 uppercase tracking-wider mb-4 pb-1 border-b border-slate-200">
                      Customer Information
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-gray-400">Name</p>
                        <p className="text-slate-850">{selectedLead.name}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-gray-400">Company</p>
                        <p className="text-slate-850">{selectedLead.company || "Individual Client"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-gray-400">Country</p>
                        <p className="text-slate-850">{selectedLead.country || selectedLead.state || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-gray-400">Phone</p>
                        <p className="text-slate-850">{selectedLead.phone}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-[10px] uppercase font-bold text-gray-400">Email Address</p>
                        <p className="text-slate-850 font-mono">{selectedLead.email}</p>
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
                    <h4 className="text-xs font-black text-blue-600 uppercase tracking-wider mb-4 pb-1 border-b border-slate-200">
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
                    <h4 className="text-xs font-black text-blue-600 uppercase tracking-wider mb-2.5 pb-1 border-b border-slate-200">
                      Message
                    </h4>
                    <p className="text-slate-650 text-xs leading-relaxed italic bg-white p-4 rounded-xl border border-slate-100">
                      "{selectedLead.message || "No comments or description provided by the client."}"
                    </p>
                  </div>
                </div>

                {/* Right Side: Admin CRM interactions */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Timeline & Metadata */}
                  <div className="bg-slate-50/60 p-5 rounded-2xl border border-slate-100 space-y-3 text-xs font-semibold">
                    <h4 className="text-xs font-black text-blue-600 uppercase tracking-wider pb-1 border-b border-slate-200">
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
                    <h4 className="text-xs font-black text-blue-600 uppercase tracking-wider pb-1 border-b border-slate-200">
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
    </>
  );
};

export default Dashboard;
