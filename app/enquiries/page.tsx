"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  Mail,
  Phone,
  Calendar,
  Trash2,
  Eye,
  RefreshCw,
  ExternalLink,
  MessageCircle,
  Tag,
  FileText,
  Save,
  X,
  Send,
  Check,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import DataGrid, { Header } from "@/components/admin/tables/dataGrid";
import PageHeader from "@/components/admin/head/head";
import { StatsCards } from "@/components/admin/stateCard/stateCard";
import {
  enquiryAPI,
  EnquiryItem,
  EnquiryStats,
  EnquiryLazyParams,
} from "@/lib/integration/enquiry";
import { confirmDelete } from "@/lib/sweetAlert";
import { getErrorMessage } from "@/lib/helpers/handlers";

const STATUS_CONFIG: Record<
  string,
  { label: string; bg: string; color: string; border: string }
> = {
  pending: {
    label: "Pending",
    bg: "bg-amber-50",
    color: "text-amber-700",
    border: "border-amber-200",
  },
  in_progress: {
    label: "In Progress",
    bg: "bg-blue-50",
    color: "text-blue-700",
    border: "border-blue-200",
  },
  resolved: {
    label: "Resolved",
    bg: "bg-emerald-50",
    color: "text-emerald-700",
    border: "border-emerald-200",
  },
  closed: {
    label: "Closed",
    bg: "bg-slate-100",
    color: "text-slate-600",
    border: "border-slate-200",
  },
};

export default function EnquiriesPage() {
  const [data, setData] = useState<EnquiryItem[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [stats, setStats] = useState<EnquiryStats>({
    total: 0,
    pending: 0,
    in_progress: 0,
    resolved: 0,
    closed: 0,
  });

  const [lazyParams, setLazyParams] = useState<EnquiryLazyParams>({
    page: 1,
    limit: 10,
    search: "",
    status: "all",
  });

  // Modal State
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);
  const [selectedStatusAction, setSelectedStatusAction] = useState<'pending' | 'in_progress' | 'resolved' | 'closed'>('resolved');
  const [customerReplyMessage, setCustomerReplyMessage] = useState("");
  const [sendCustomerEmail, setSendCustomerEmail] = useState(true);

  // Fetch stats
  const fetchStats = useCallback(async () => {
    try {
      setStatsLoading(true);
      const res = await enquiryAPI.getStats();
      if (res?.code === "OK" && res.data) {
        setStats(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch enquiry stats:", err);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  // Fetch enquiries list
  const fetchEnquiries = useCallback(async () => {
    try {
      setLoading(true);
      const res = await enquiryAPI.getAll(lazyParams);
      if (res?.code === "OK") {
        setData(res.data || []);
        setTotalRecords(res.totalRecords || 0);
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [lazyParams]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEnquiries();
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchEnquiries]);

  // Handle Search
  const handleSearch = useCallback((search: string) => {
    setLazyParams((prev) => ({ ...prev, search, page: 1 }));
  }, []);

  // Handle Page Change
  const handlePageChange = useCallback((page: number) => {
    setLazyParams((prev) => ({ ...prev, page }));
  }, []);

  // Handle Status Filter Tab
  const handleStatusFilter = (status: string) => {
    setLazyParams((prev) => ({ ...prev, status, page: 1 }));
  };

  // Open Details Modal
  const handleView = (item: EnquiryItem) => {
    setSelectedEnquiry(item);
    setAdminNotes(item.notes || "");
    setSelectedStatusAction((item.status as any) || 'resolved');
    setCustomerReplyMessage((item as any).resolutionMessage || "");
    setSendCustomerEmail(true);
    setIsModalOpen(true);
  };

  // Update Status and send custom message to customer
  const handleSubmitAction = async () => {
    if (!selectedEnquiry) return;
    try {
      setUpdatingStatus(true);
      const payload: {
        status: 'pending' | 'in_progress' | 'resolved' | 'closed';
        notes?: string;
        resolutionMessage?: string;
        sendEmail?: boolean;
      } = {
        status: selectedStatusAction,
        notes: adminNotes.trim(),
        resolutionMessage: customerReplyMessage.trim(),
        sendEmail: sendCustomerEmail,
      };

      const res = await enquiryAPI.update(selectedEnquiry._id, payload);
      if (res?.code === "OK") {
        if (sendCustomerEmail && selectedEnquiry.email) {
          toast.success(`Enquiry saved as ${STATUS_CONFIG[selectedStatusAction]?.label} and email sent to ${selectedEnquiry.email}!`);
        } else {
          toast.success(`Enquiry status updated to ${STATUS_CONFIG[selectedStatusAction]?.label}!`);
        }
        const updatedItem = {
          ...selectedEnquiry,
          status: selectedStatusAction,
          notes: adminNotes.trim(),
          ...(customerReplyMessage.trim() ? { resolutionMessage: customerReplyMessage.trim() } : {}),
        };
        setSelectedEnquiry(updatedItem);
        setData((prev) =>
          prev.map((e) => (e._id === selectedEnquiry._id ? updatedItem : e))
        );
        fetchStats();
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Save Admin Notes
  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    try {
      setSavingNotes(true);
      const res = await enquiryAPI.update(selectedEnquiry._id, { notes: adminNotes });
      if (res?.code === "OK") {
        toast.success("Notes saved successfully");
        const updatedItem = { ...selectedEnquiry, notes: adminNotes };
        setSelectedEnquiry(updatedItem);
        setData((prev) =>
          prev.map((e) => (e._id === selectedEnquiry._id ? updatedItem : e))
        );
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSavingNotes(false);
    }
  };

  // Delete Enquiry
  const handleDelete = async (id: string) => {
    const isConfirmed = await confirmDelete("Delete this enquiry? This action cannot be undone.");
    if (!isConfirmed) return;

    try {
      const res = await enquiryAPI.delete(id);
      if (res?.code === "OK") {
        toast.success("Enquiry deleted successfully");
        if (isModalOpen && selectedEnquiry?._id === id) {
          setIsModalOpen(false);
        }
        fetchEnquiries();
        fetchStats();
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  // Format phone for WhatsApp link
  const getWhatsAppLink = (phone?: string) => {
    if (!phone) return null;
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length >= 10) {
      const fullNumber = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
      return `https://wa.me/${fullNumber}`;
    }
    return null;
  };

  // Stats Card Items
  const statItems = [
    {
      icon: MessageSquare,
      label: "Total Enquiries",
      value: statsLoading ? "..." : stats.total,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Clock,
      label: "Pending Review",
      value: statsLoading ? "..." : stats.pending,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      icon: AlertCircle,
      label: "In Progress",
      value: statsLoading ? "..." : stats.in_progress,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      icon: CheckCircle2,
      label: "Resolved",
      value: statsLoading ? "..." : stats.resolved,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  // DataGrid Headers
  const headers: Header<EnquiryItem>[] = [
    {
      key: "name",
      label: "Customer",
      render: (row) => (
        <div className="flex flex-col py-1">
          <span className="font-semibold text-slate-800 text-sm">{row.name}</span>
          <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
            <Calendar size={12} />
            {row.createdAt ? format(new Date(row.createdAt), "dd MMM yyyy, hh:mm a") : "—"}
          </span>
        </div>
      ),
    },
    {
      key: "email",
      label: "Contact Details",
      render: (row) => (
        <div className="flex flex-col gap-0.5 text-xs">
          <a
            href={`mailto:${row.email}`}
            className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:underline font-medium"
            title="Send email"
          >
            <Mail size={13} className="shrink-0 text-slate-400" />
            <span>{row.email}</span>
          </a>
          {row.phone && (
            <a
              href={`tel:${row.phone}`}
              className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900"
              title="Call phone"
            >
              <Phone size={13} className="shrink-0 text-slate-400" />
              <span>{row.phone}</span>
            </a>
          )}
        </div>
      ),
    },
    {
      key: "services",
      label: "Services",
      render: (row) => (
        <div className="flex flex-wrap gap-1 max-w-[180px]">
          {row.services && row.services.length > 0 ? (
            row.services.map((srv, idx) => (
              <span
                key={idx}
                className="inline-flex items-center text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200"
              >
                {srv}
              </span>
            ))
          ) : (
            <span className="text-xs text-slate-400 italic">None selected</span>
          )}
        </div>
      ),
    },
    {
      key: "message",
      label: "Message Excerpt",
      render: (row) => (
        <div className="max-w-[260px]">
          <p className="text-xs text-slate-600 truncate" title={row.message}>
            {row.message}
          </p>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => {
        const config = STATUS_CONFIG[row.status] || STATUS_CONFIG.pending;
        return (
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.color} ${config.border}`}
          >
            {config.label}
          </span>
        );
      },
    },
    {
      key: "_id",
      label: "Actions",
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleView(row)}
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors title='View Details'"
            title="View Details"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete Enquiry"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Customer Enquiries"
        subtitle="Review, respond to, and track incoming customer enquiries and custom collection requests"
        rightContent={
          <button
            onClick={() => {
              fetchEnquiries();
              fetchStats();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl transition shadow-xs"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>
        }
      />

      {/* Stats Cards */}
      <StatsCards items={statItems} />

      {/* Filter Tabs */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-1">
            Status:
          </span>
          {[
            { key: "all", label: "All" },
            { key: "pending", label: "Pending" },
            { key: "in_progress", label: "In Progress" },
            { key: "resolved", label: "Resolved" },
            { key: "closed", label: "Closed" },
          ].map((tab) => {
            const isActive = (lazyParams.status || "all") === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => handleStatusFilter(tab.key)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition ${
                  isActive
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="text-xs text-slate-500">
          Showing <strong className="text-slate-800">{data.length}</strong> of{" "}
          <strong className="text-slate-800">{totalRecords}</strong> enquiries
        </div>
      </div>

      {/* DataGrid */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <DataGrid<EnquiryItem>
          headers={headers}
          rows={data}
          totalRecords={totalRecords}
          page={lazyParams.page}
          pageSize={lazyParams.limit}
          onPageChange={handlePageChange}
          onSearch={handleSearch}
          searchEnable={true}
          loading={loading}
        />
      </div>

      {/* Enquiry Details Modal */}
      {isModalOpen && selectedEnquiry && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Enquiry Details</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Submitted on{" "}
                  {selectedEnquiry.createdAt
                    ? format(new Date(selectedEnquiry.createdAt), "dd MMMM yyyy, hh:mm a")
                    : "—"}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* Customer Contact Card */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Customer Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-xs text-slate-400 block">Name</span>
                    <span className="font-semibold text-slate-800">{selectedEnquiry.name}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Email Address</span>
                    <a
                      href={`mailto:${selectedEnquiry.email}`}
                      className="text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
                    >
                      <Mail size={14} />
                      {selectedEnquiry.email}
                      <ExternalLink size={12} />
                    </a>
                  </div>
                  {selectedEnquiry.phone && (
                    <div>
                      <span className="text-xs text-slate-400 block">Phone Number</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <a
                          href={`tel:${selectedEnquiry.phone}`}
                          className="font-medium text-slate-800 hover:text-blue-600 inline-flex items-center gap-1"
                        >
                          <Phone size={14} className="text-slate-400" />
                          {selectedEnquiry.phone}
                        </a>
                        {getWhatsAppLink(selectedEnquiry.phone) && (
                          <a
                            href={getWhatsAppLink(selectedEnquiry.phone)!}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs bg-emerald-500 hover:bg-emerald-600 text-white px-2 py-0.5 rounded-md font-medium transition"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle size={12} />
                            WhatsApp
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                  <div>
                    <span className="text-xs text-slate-400 block">Current Status</span>
                    <span
                      className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                        STATUS_CONFIG[selectedEnquiry.status]?.bg || "bg-slate-100"
                      } ${STATUS_CONFIG[selectedEnquiry.status]?.color || "text-slate-700"} ${
                        STATUS_CONFIG[selectedEnquiry.status]?.border || "border-slate-200"
                      }`}
                    >
                      {STATUS_CONFIG[selectedEnquiry.status]?.label || selectedEnquiry.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Services Requested */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
                  <Tag size={14} /> Services / Products Requested
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedEnquiry.services && selectedEnquiry.services.length > 0 ? (
                    selectedEnquiry.services.map((srv, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-50 text-blue-700 font-medium text-xs px-3 py-1 rounded-lg border border-blue-100"
                      >
                        {srv}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 italic">No specific service tagged</span>
                  )}
                </div>
              </div>

              {/* Full Message */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
                  <FileText size={14} /> Message
                </h4>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {selectedEnquiry.message}
                </div>
              </div>

              {/* Status Action & Customer Email Message Section */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xs">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center justify-between">
                    <span>1. Select Status Action</span>
                    <span className="text-[11px] font-normal text-slate-500">Pick action to apply</span>
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(
                      [
                        { key: "pending", label: "Pending", bg: "hover:bg-amber-50 text-amber-800 border-amber-200" },
                        {
                          key: "in_progress",
                          label: "In Progress",
                          bg: "hover:bg-blue-50 text-blue-800 border-blue-200",
                        },
                        {
                          key: "resolved",
                          label: "Resolved",
                          bg: "hover:bg-emerald-50 text-emerald-800 border-emerald-300",
                        },
                        { key: "closed", label: "Closed", bg: "hover:bg-slate-100 text-slate-800 border-slate-200" },
                      ] as const
                    ).map((st) => {
                      const isSelected = selectedStatusAction === st.key;
                      return (
                        <button
                          key={st.key}
                          type="button"
                          onClick={() => {
                            setSelectedStatusAction(st.key);
                            if (st.key === 'resolved' && !customerReplyMessage) {
                              setCustomerReplyMessage("Your enquiry has been carefully reviewed and resolved by our customer care team. Thank you for choosing Punroyal!");
                            }
                          }}
                          className={`px-3 py-2 text-xs font-bold rounded-xl border text-center transition flex items-center justify-center gap-1.5 ${
                            isSelected
                              ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                              : `bg-white ${st.bg}`
                          }`}
                        >
                          {isSelected && <Check size={13} className="text-amber-400" />}
                          <span>{st.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Customer Response Message (Sent to Customer via Email) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Mail size={13} className="text-indigo-600" />
                      <span>2. Message to Customer (Emailed Directly)</span>
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={sendCustomerEmail}
                        onChange={(e) => setSendCustomerEmail(e.target.checked)}
                        className="rounded text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
                      />
                      <span>Email to: <strong>{selectedEnquiry.email}</strong></span>
                    </label>
                  </div>
                  <textarea
                    rows={4}
                    value={customerReplyMessage}
                    onChange={(e) => setCustomerReplyMessage(e.target.value)}
                    placeholder="Type the message that will be sent to the customer's email..."
                    className="w-full text-sm border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white shadow-inner leading-relaxed"
                  />
                  <div className="flex flex-wrap items-center gap-1.5 mt-2 text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-600">Quick templates:</span>
                    <button
                      type="button"
                      onClick={() => setCustomerReplyMessage("Your enquiry has been carefully reviewed and resolved by our customer care team. Thank you for choosing Punroyal!")}
                      className="px-2 py-0.5 rounded bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition"
                    >
                      Resolved standard
                    </button>
                    <button
                      type="button"
                      onClick={() => setCustomerReplyMessage("We have assigned a personal stylist to assist you. Our stylist will reach out on your phone/WhatsApp shortly.")}
                      className="px-2 py-0.5 rounded bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition"
                    >
                      Stylist follow-up
                    </button>
                    <button
                      type="button"
                      onClick={() => setCustomerReplyMessage("We have noted your custom sizing request. Our team is preparing your custom order measurements.")}
                      className="px-2 py-0.5 rounded bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition"
                    >
                      Custom sizing
                    </button>
                  </div>
                </div>

                {/* Internal Admin Notes */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Internal Admin Notes (Staff only, not emailed to customer)
                    </label>
                    <button
                      type="button"
                      onClick={handleSaveNotes}
                      disabled={savingNotes}
                      className="text-[11px] font-semibold text-blue-600 hover:underline inline-flex items-center gap-1"
                    >
                      <Save size={11} /> {savingNotes ? "Saving..." : "Save internal notes only"}
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Record internal remarks, call log, or team notes..."
                    className="w-full text-xs border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-slate-400 bg-white"
                  />
                </div>

                {/* Submit Action Button */}
                <button
                  type="button"
                  disabled={updatingStatus}
                  onClick={handleSubmitAction}
                  className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition shadow-sm flex items-center justify-center gap-2"
                >
                  {updatingStatus ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Updating & Sending Email...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>
                        Save Status as {STATUS_CONFIG[selectedStatusAction]?.label} {sendCustomerEmail ? "& Send Email Message" : ""}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
              <button
                onClick={() => handleDelete(selectedEnquiry._id)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-red-600 hover:bg-red-50 text-xs font-semibold rounded-xl transition"
              >
                <Trash2 size={15} />
                <span>Delete Enquiry</span>
              </button>

              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-xl transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
