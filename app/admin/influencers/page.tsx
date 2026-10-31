"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { modelsValidate } from "@/validations/models";
import { modelsAPI } from "@/lib/integration/models";
import PageHeader from "@/components/admin/head/head";
import DataGrid from "@/components/admin/tables/dataGrid";
import Modal from "@/components/admin/shared/Modal";
import { ModelsError } from "@/validations/models";
import { getErrorMessage } from "@/lib/helpers/handlers";
import { useRouter } from "next/navigation";
import {
  UploadCloud,
  Video,
  Edit3,
  Wallet,
  Copy,
  Check,
  Eye,
  EyeOff,
  KeyRound,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

type Influencers = {
  _id: string;
  name: string;
  username?: string;
  status: boolean;
  auth_created?: boolean;
  video?: string;
  order?: number;
  role_label?: string;
};

interface CredentialsData {
  name: string;
  username: string;
  email: string;
  password: string;
  title?: string;
}

export default function ModelsPage() {
  const router = useRouter();
  const [data, setData] = useState<Influencers[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<
    'MODEL' | 'AUTH' | 'EDIT_VIDEO' | 'EDIT_LABEL' | 'EDIT_INFLUENCER' | 'CHANGE_PASSWORD'
  >('MODEL');
  const [selectedRow, setSelectedRow] = useState<Influencers | null>(null);
  const [registeredAuthIds, setRegisteredAuthIds] = useState<string[]>([]);
  const [roleLabel, setRoleLabel] = useState('');
  const [editInfluencerName, setEditInfluencerName] = useState('');
  const [editInfluencerStatus, setEditInfluencerStatus] = useState(true);

  // Change password modal state (Admin only, no old password needed)
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form Data for Create Influencer / Auth
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    status: true,
  });
  const [showCreatePassword, setShowCreatePassword] = useState(false);

  // Credentials Success Popup Modal state
  const [isCredentialsModalOpen, setIsCredentialsModalOpen] = useState(false);
  const [credentialsData, setCredentialsData] = useState<CredentialsData | null>(null);
  const [showCredPassword, setShowCredPassword] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Video upload state
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const MAX_VIDEO_SIZE_MB = 30;
  const MAX_VIDEO_SIZE_BYTES = MAX_VIDEO_SIZE_MB * 1024 * 1024;

  const [errors, setErrors] = useState<ModelsError>({});
  const [copiedUsernameId, setCopiedUsernameId] = useState<string | null>(null);

  const copyTextToClipboard = async (text: string) => {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return;
      } catch {
        // Fallback for non-https
      }
    }

    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();
    const copied = document.execCommand("copy");
    textArea.remove();

    if (!copied) {
      throw new Error("Clipboard copy was denied");
    }
  };

  const copyUsername = async (row: Influencers) => {
    if (!row.username) return;
    try {
      await copyTextToClipboard(row.username);
      setCopiedUsernameId(row._id);
      toast.success("Username copied to clipboard");
      setTimeout(() => setCopiedUsernameId(null), 2000);
    } catch {
      toast.error("Could not copy username");
    }
  };

  const copyField = async (text: string, fieldName: string) => {
    try {
      await copyTextToClipboard(text);
      setCopiedField(fieldName);
      toast.success(`${fieldName} copied!`);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      toast.error(`Could not copy ${fieldName}`);
    }
  };

  const copyAllCredentials = async () => {
    if (!credentialsData) return;
    const allText = `Punroyal Influencer Portal Credentials\n` +
      `URL: http://194.5.157.175:5000/\n` +
      `Name: ${credentialsData.name}\n` +
      `Username: ${credentialsData.username}\n` +
      `Email: ${credentialsData.email}\n` +
      `Password: ${credentialsData.password}\n`;
    try {
      await copyTextToClipboard(allText);
      setCopiedField('all');
      toast.success("All login credentials copied to clipboard!");
      setTimeout(() => setCopiedField(null), 2500);
    } catch {
      toast.error("Could not copy credentials");
    }
  };

  const generateRandomPassword = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%";
    let pass = "";
    for (let i = 0; i < 10; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pass;
  };

  const initialParams = {
    page: 1,
    limit: 10,
    search: "",
  };

  const [lazyParams, setLazyParams] = useState(initialParams);

  const fetchModels = useCallback(async () => {
    try {
      setLoading(true);
      const response = await modelsAPI.getAll(lazyParams);
      if (response?.code === "OK" || response?.data) {
        const payload = response.data?.data;
        const list = Array.isArray(payload) ? payload : (payload?.data || []);
        const total = typeof payload?.totalRecords === 'number'
          ? payload.totalRecords
          : (Array.isArray(payload) ? payload.length : (list.length || 0));

        setData(list);
        setTotalRecords(total);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [lazyParams]);

  const handleSearch = useCallback((search: string) => {
    setLazyParams((p) => ({ ...p, search, page: 1 }));
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchModels();
    }, 300);
    return () => clearTimeout(delay);
  }, [fetchModels, reload]);

  // Handle Name Change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const generatedUsername = val.trim().toLowerCase().replace(/\s+/g, '');
    setFormData({ ...formData, name: val, username: generatedUsername });
  };

  // Handle Active / Inactive Status Toggle (Admin can toggle status directly)
  const handleToggleStatus = async (row: Influencers) => {
    const currentStatus = row.status === true || String(row.status) === 'true';
    const nextStatus = !currentStatus;
    const toastId = toast.loading(`Setting ${row.name} to ${nextStatus ? 'Active' : 'Inactive'}...`);
    try {
      setData((prev) =>
        prev.map((item) =>
          item._id === row._id ? { ...item, status: nextStatus } : item
        )
      );
      await modelsAPI.update(row._id, { status: nextStatus ? 'true' : 'false' });
      toast.success(`${row.name} is now ${nextStatus ? 'Active' : 'Inactive'}!`, { id: toastId });
    } catch (error) {
      setData((prev) =>
        prev.map((item) =>
          item._id === row._id ? { ...item, status: currentStatus } : item
        )
      );
      toast.error(getErrorMessage(error), { id: toastId });
    }
  };

  // Open Edit Influencer Name & Details
  const handleOpenEditInfluencer = useCallback((row: Influencers) => {
    setSelectedRow(row);
    setEditInfluencerName(row.name || '');
    setRoleLabel(row.role_label || '');
    setEditInfluencerStatus(row.status === true || String(row.status) === 'true');
    setModalType('EDIT_INFLUENCER');
    setErrors({});
    setIsModalOpen(true);
  }, []);

  // Open Edit Influencer Video
  const handleEdit = useCallback((row: Influencers) => {
    setSelectedRow(row);
    setModalType('EDIT_VIDEO');
    setVideoFile(null);
    setVideoPreview(row.video || '');
    setUploadProgress(null);
    setErrors({});
    setIsModalOpen(true);
  }, []);

  // Open Change Password Modal (Admin only, no previous password required)
  const handleOpenChangePassword = useCallback((row: Influencers) => {
    setSelectedRow(row);
    setNewPassword(generateRandomPassword());
    setConfirmPassword("");
    setShowNewPassword(true);
    setShowConfirmPassword(false);
    setModalType('CHANGE_PASSWORD');
    setIsModalOpen(true);
  }, []);

  // Handle Save
  const handleSave = async () => {
    if (modalType === 'CHANGE_PASSWORD') {
      if (!selectedRow?._id) return;
      if (!newPassword || newPassword.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
      }
      if (confirmPassword && newPassword !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      const toastId = toast.loading("Updating influencer password...");
      try {
        setLoading(true);
        await modelsAPI.changePassword(selectedRow._id, newPassword);
        setIsModalOpen(false);
        toast.success("Password updated successfully!", { id: toastId });

        // Show Credentials Success Popup
        const rawUsername = selectedRow.username || selectedRow.name.toLowerCase().replace(/\s+/g, '');
        setCredentialsData({
          name: selectedRow.name,
          username: rawUsername,
          email: `${rawUsername}@punroyal.com`,
          password: newPassword,
          title: `Updated Credentials for ${selectedRow.name}`
        });
        setShowCredPassword(true);
        setIsCredentialsModalOpen(true);

        setNewPassword("");
        setConfirmPassword("");
        setReload(!reload);
      } catch (error) {
        toast.error(getErrorMessage(error), { id: toastId });
      } finally {
        setLoading(false);
      }
      return;
    }

    if (modalType === 'EDIT_INFLUENCER') {
      if (!selectedRow?._id) return;
      if (!editInfluencerName.trim()) {
        setErrors({ name: 'Influencer name is required' });
        return;
      }
      const toastId = toast.loading("Saving influencer details...");
      try {
        setLoading(true);
        const response: any = await modelsAPI.update(selectedRow._id, {
          name: editInfluencerName.trim(),
          role_label: roleLabel.trim(),
          status: editInfluencerStatus ? 'true' : 'false',
        });
        if (response?.code !== "OK" && response?.data?.code !== "OK" && !response?.success && response?.status !== 200) {
          throw new Error(response?.message || response?.data?.message || "Failed to update influencer.");
        }
        setData((prev) =>
          prev.map((item) =>
            item._id === selectedRow._id
              ? {
                  ...item,
                  name: editInfluencerName.trim(),
                  role_label: roleLabel.trim(),
                  status: editInfluencerStatus,
                }
              : item
          )
        );
        setIsModalOpen(false);
        setReload(!reload);
        toast.success("Influencer details updated successfully!", { id: toastId });
      } catch (error) {
        toast.error(getErrorMessage(error), { id: toastId });
      } finally {
        setLoading(false);
      }
      return;
    }

    if (modalType === 'EDIT_LABEL') {
      if (!selectedRow?._id) return;
      const toastId = toast.loading("Saving influencer label...");
      try {
        setLoading(true);
        const response = await modelsAPI.update(selectedRow._id, { role_label: roleLabel.trim() });
        if (response?.code !== "OK" && response?.data?.code !== "OK") {
          throw new Error(response?.message || response?.data?.message || "Failed to update influencer label.");
        }
        setData((prev) =>
          prev.map((item) =>
            item._id === selectedRow._id ? { ...item, role_label: roleLabel.trim() } : item
          )
        );
        setIsModalOpen(false);
        toast.success("Influencer label updated successfully!", { id: toastId });
      } catch (error) {
        toast.error(getErrorMessage(error), { id: toastId });
      } finally {
        setLoading(false);
      }
      return;
    }

    if (modalType === 'EDIT_VIDEO') {
      if (!selectedRow?._id) return;
      if (!videoFile && !videoPreview) {
        toast.error('Please select a video file to upload');
        return;
      }
      if (videoFile && videoFile.size > MAX_VIDEO_SIZE_BYTES) {
        const sizeMB = (videoFile.size / (1024 * 1024)).toFixed(1);
        toast.error(`Video size is ${sizeMB}MB. Maximum limit is ${MAX_VIDEO_SIZE_MB}MB.`);
        return;
      }
      const toastId = toast.loading("Uploading influencer video...");
      try {
        setLoading(true);
        let finalVideoUrl = videoPreview;
        if (videoFile) {
          const payload = new FormData();
          payload.append('video', videoFile);
          setUploadProgress(0);
          const res = await modelsAPI.uploadVideo(selectedRow._id, payload, (progressEvent) => {
            if (progressEvent.total) {
              const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadProgress(percent);
            }
          });
          if (res?.data?.data?.video || res?.data?.video || res?.code === 'OK') {
            finalVideoUrl = res?.data?.data?.video || res?.data?.video || res?.video || finalVideoUrl;
          }
        }
        setData((prev) =>
          prev.map((item) =>
            item._id === selectedRow._id
              ? { ...item, video: finalVideoUrl }
              : item
          )
        );
        toast.success("Influencer video updated successfully!", { id: toastId });
        setIsModalOpen(false);
        setReload(!reload);
      } catch (error) {
        toast.error(getErrorMessage(error), { id: toastId });
      } finally {
        setLoading(false);
        setUploadProgress(null);
      }
      return;
    }

    if (modalType === 'MODEL') {
      if (!formData.name.trim()) {
        setErrors({ name: 'Name is required' });
        return;
      }
      const passwordToUse = formData.password.trim() || generateRandomPassword();
      const rawUsername = formData.username.trim() || formData.name.trim().toLowerCase().replace(/\s+/g, '');
      const toastId = toast.loading("Creating Influencer & Auth account...");
      try {
        setLoading(true);
        const response = await modelsAPI.create({
          name: formData.name.trim(),
          username: rawUsername,
          password: passwordToUse,
          role_label: roleLabel.trim(),
          status: formData.status,
        });

        // Also register Auth so the influencer can log in immediately
        try {
          await modelsAPI.createAuth({
            name: formData.name.trim(),
            username: rawUsername,
            password: passwordToUse
          });
        } catch (authErr) {
          console.warn("Auth account creation warning:", authErr);
        }

        setIsModalOpen(false);
        setReload(!reload);
        toast.success(`Influencer created successfully!`, { id: toastId });

        // Show Credentials Success Popup Modal
        setCredentialsData({
          name: formData.name.trim(),
          username: rawUsername,
          email: `${rawUsername}@punroyal.com`,
          password: passwordToUse,
          title: `Influencer Account Created Successfully!`
        });
        setShowCredPassword(true);
        setIsCredentialsModalOpen(true);

        setFormData({ name: "", username: "", password: "", status: true });
        setRoleLabel('');
      } catch (error) {
        toast.error(getErrorMessage(error), { id: toastId });
      } finally {
        setLoading(false);
      }
    } else if (modalType === 'AUTH') {
      if (!modelsValidate(formData.name, formData.password, setErrors)) return;
      const toastId = toast.loading("Registering Auth...");
      try {
        setLoading(true);
        const response = await modelsAPI.createAuth({
          name: formData.name,
          username: formData.username,
          password: formData.password
        });
        if (response?.data?.code === "OK" || response?.code === "OK" || response?.data?._id || response?._id || response?.message === 'Auth registered successfully') {
          if (selectedRow?._id) {
            setRegisteredAuthIds(prev => [...prev, selectedRow._id]);
            await modelsAPI.update(selectedRow._id, { auth_created: true });
            setData((prev) => prev.map((item) => item._id === selectedRow._id ? { ...item, auth_created: true } : item));
          }

          setIsModalOpen(false);
          toast.success(`Auth registered successfully!`, { id: toastId });

          // Show Credentials Success Popup Modal
          setCredentialsData({
            name: formData.name,
            username: formData.username,
            email: `${formData.username}@punroyal.com`,
            password: formData.password,
            title: `Auth Registered for ${formData.name}`
          });
          setShowCredPassword(true);
          setIsCredentialsModalOpen(true);

          setFormData({ name: "", username: "", password: "", status: true });
        } else {
          toast.success("Auth registration request completed.", { id: toastId });
          if (selectedRow?._id) {
            setRegisteredAuthIds(prev => [...prev, selectedRow._id]);
            await modelsAPI.update(selectedRow._id, { auth_created: true });
            setData((prev) => prev.map((item) => item._id === selectedRow._id ? { ...item, auth_created: true } : item));
          }
          setIsModalOpen(false);
        }
      } catch (error) {
        toast.error(getErrorMessage(error), { id: toastId });
      } finally {
        setLoading(false);
      }
    }
  };

  // Register Auth for Influencer (Opens Modal)
  const handleRegisterAuth = useCallback(async (row: Influencers) => {
    setModalType('AUTH');
    setSelectedRow(row);
    const suggestedUsername = (row as any).username || row.name.trim().toLowerCase().replace(/\s+/g, '');
    setFormData({
      name: row.name,
      username: suggestedUsername,
      password: generateRandomPassword(),
      status: true
    });
    setErrors({});
    setIsModalOpen(true);
  }, []);

  // Handle Drag & Drop Reordering
  const handleReorder = async (newRows: Influencers[]) => {
    setData(newRows);
    const toastId = toast.loading("Saving new video order...");
    try {
      const orders = newRows.map((item, idx) => ({
        id: item._id,
        order: (lazyParams.page - 1) * lazyParams.limit + idx,
      }));
      await modelsAPI.reorder(orders);
      toast.success("Influencer order updated successfully!", { id: toastId });
    } catch (error) {
      toast.error(getErrorMessage(error) || "Failed to update order", { id: toastId });
      fetchModels();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header - Sticky */}
      <PageHeader
        title="Influencers"
        subtitle="Manage Product Influencers • Active / Inactive Status • Admin Password Control • Video Showcases"
        rightContent={
          <button
            onClick={() => {
              setModalType('MODEL');
              const randomPass = generateRandomPassword();
              setFormData({ name: "", username: "", password: randomPass, status: true });
              setRoleLabel('');
              setShowCreatePassword(true);
              setErrors({});
              setIsModalOpen(true);
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <Sparkles size={16} /> Create Influencer
          </button>
        }
      />

      <div className="max-w-7xl mx-auto py-8">
        {/* =========================================================================
            CREDENTIALS SUCCESS POPUP MODAL (Name, Username, Password + Copy Option)
           ========================================================================= */}
        <Modal
          isOpen={isCredentialsModalOpen}
          onClose={() => setIsCredentialsModalOpen(false)}
          title={credentialsData?.title || "Influencer Login Credentials"}
          type="custom"
        >
          {credentialsData && (
            <div className="space-y-4 py-2">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-emerald-800 text-xs font-semibold">
                <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
                <span>Account ready! Please copy and securely share these credentials with the influencer.</span>
              </div>

              {/* Influencer Name */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Influencer Name</span>
                  <span className="text-sm font-bold text-slate-800">{credentialsData.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyField(credentialsData.name, "Name")}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-white text-slate-600 hover:text-blue-600 transition"
                  title="Copy Name"
                >
                  {copiedField === "Name" ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                </button>
              </div>

              {/* Username */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Username</span>
                  <span className="text-sm font-mono font-bold text-slate-800">@{credentialsData.username}</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyField(credentialsData.username, "Username")}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-white text-slate-600 hover:text-blue-600 transition"
                  title="Copy Username"
                >
                  {copiedField === "Username" ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                </button>
              </div>

              {/* Login Email */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Login Email</span>
                  <span className="text-sm font-mono text-slate-700">{credentialsData.email}</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyField(credentialsData.email, "Email")}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-white text-slate-600 hover:text-blue-600 transition"
                  title="Copy Email"
                >
                  {copiedField === "Email" ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                </button>
              </div>

              {/* Password with Eye Icon */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                <div className="flex-1 mr-3">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Password</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-sm font-mono font-bold text-blue-700">
                      {showCredPassword ? credentialsData.password : "••••••••••••"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowCredPassword(!showCredPassword)}
                      className="text-slate-400 hover:text-slate-600 p-0.5"
                      title={showCredPassword ? "Hide password" : "Show password"}
                    >
                      {showCredPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copyField(credentialsData.password, "Password")}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-white text-slate-600 hover:text-blue-600 transition"
                  title="Copy Password"
                >
                  {copiedField === "Password" ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                </button>
              </div>

              {/* Portal URL */}
              <div className="p-2.5 bg-blue-50/50 border border-blue-100 rounded-xl text-xs text-slate-600 flex items-center justify-between">
                <span>Login URL: <strong className="text-blue-700 font-mono">http://194.5.157.175:5000/</strong></span>
                <button
                  type="button"
                  onClick={() => copyField("http://194.5.157.175:5000/", "URL")}
                  className="text-blue-600 hover:underline font-bold text-[11px]"
                >
                  {copiedField === "URL" ? "Copied!" : "Copy URL"}
                </button>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCredentialsModalOpen(false)}
                  className="px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={copyAllCredentials}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition flex items-center gap-1.5 shadow-md"
                >
                  {copiedField === 'all' ? <Check size={16} /> : <Copy size={16} />}
                  {copiedField === 'all' ? "Copied All!" : "Copy All Credentials"}
                </button>
              </div>
            </div>
          )}
        </Modal>

        {/* =========================================================================
            MAIN ACTION MODAL (CREATE, EDIT, CHANGE PASSWORD, VIDEO)
           ========================================================================= */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={
            modalType === 'CHANGE_PASSWORD'
              ? `Change Password - ${selectedRow?.name}`
              : modalType === 'EDIT_INFLUENCER'
                ? `Edit Influencer - ${selectedRow?.name}`
                : modalType === 'EDIT_VIDEO'
                  ? `Edit Influencer Video - ${selectedRow?.name}`
                  : modalType === 'EDIT_LABEL'
                    ? `Edit Influencer Label - ${selectedRow?.name}`
                    : modalType === 'AUTH'
                      ? `Register Auth - ${selectedRow?.name}`
                      : 'Create Influencer'
          }
          type="custom"
        >
          {/* 1. CHANGE PASSWORD MODAL (Admin only, no previous password required, with Eye icons) */}
          {modalType === 'CHANGE_PASSWORD' ? (
            <div className="space-y-4 py-2">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-800 leading-relaxed">
                <strong>Admin Direct Password Reset:</strong> You do not need the previous password. Setting a new password will immediately update the influencer&apos;s login.
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password (min. 6 characters)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2.5 pr-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    title={showNewPassword ? "Hide password" : "Show password"}
                  >
                    {showNewPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2.5 pr-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    title={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    const rnd = generateRandomPassword();
                    setNewPassword(rnd);
                    setConfirmPassword(rnd);
                    setShowNewPassword(true);
                  }}
                  className="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1"
                >
                  <Sparkles size={13} /> Generate Random
                </button>

                <div className="flex gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    disabled={loading}
                    className="px-5 py-2 border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={loading}
                    className="px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {loading ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </div>
            </div>
          ) : modalType === 'EDIT_INFLUENCER' ? (
            <div className="space-y-4 py-2">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Influencer Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter influencer full name"
                  value={editInfluencerName}
                  onChange={(e) => setEditInfluencerName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Influencer Label
                </label>
                <input
                  type="text"
                  placeholder="e.g., Verified Influencer"
                  value={roleLabel}
                  onChange={(e) => setRoleLabel(e.target.value)}
                  maxLength={60}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-slate-500 mt-1">Shown on product tags and influencer reels.</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Status (Active / Inactive)
                </label>
                <select
                  value={editInfluencerStatus ? "true" : "false"}
                  onChange={(e) => setEditInfluencerStatus(e.target.value === "true")}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={loading}
                  className="px-5 py-2 border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={loading}
                  className="px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-blue-700 transition-all disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Details"}
                </button>
              </div>
            </div>
          ) : modalType === 'EDIT_LABEL' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Influencer Label
                </label>
                <input
                  type="text"
                  placeholder="e.g., Verified Influencer"
                  value={roleLabel}
                  onChange={(e) => setRoleLabel(e.target.value)}
                  maxLength={60}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                />
                <p className="text-xs text-slate-500 mt-1">Leave blank to show the default label.</p>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={loading}
                  className="px-5 py-2 border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={loading}
                  className="px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-blue-700 transition-all disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Label"}
                </button>
              </div>
            </div>
          ) : modalType === 'EDIT_VIDEO' ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between px-3.5 py-2 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Influencer</span>
                <p className="text-sm font-bold text-slate-800">{selectedRow?.name}</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Upload Showcase Video
                </label>
                <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-3 text-center transition-all bg-slate-50/60 hover:bg-blue-50/30">
                  <input
                    type="file"
                    id="influencerVideoFile"
                    accept="video/mp4,video/webm,video/quicktime,video/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.size > MAX_VIDEO_SIZE_BYTES) {
                          const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
                          toast.error(
                            `Video size is ${sizeMB}MB. Maximum limit is ${MAX_VIDEO_SIZE_MB}MB for fast uploads and playback. Please choose a smaller video.`,
                            { duration: 5000 }
                          );
                          e.target.value = '';
                          return;
                        }
                        setVideoFile(file);
                        setVideoPreview(URL.createObjectURL(file));
                      }
                    }}
                    className="hidden"
                  />
                  <label htmlFor="influencerVideoFile" className="cursor-pointer flex items-center justify-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                      <UploadCloud size={18} />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-700">
                        {videoFile
                          ? `${videoFile.name} (${(videoFile.size / (1024 * 1024)).toFixed(1)} MB)`
                          : videoPreview
                          ? 'Click to change video file'
                          : 'Click to upload video file'}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Recommended: <strong>1080 × 1920 px (9:16 Reel)</strong> • MP4, WebM, QuickTime • <span className="font-semibold text-blue-600">Max {MAX_VIDEO_SIZE_MB}MB</span>
                      </p>
                    </div>
                  </label>
                </div>

                {videoPreview && (
                  <div className="mt-3 p-2.5 bg-slate-100 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between mb-1.5 px-1">
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                        <Video size={13} /> Video Preview
                      </span>
                      {videoFile && (
                        <button
                          type="button"
                          onClick={() => {
                            setVideoFile(null);
                            setVideoPreview(selectedRow?.video || '');
                          }}
                          className="text-xs text-red-500 hover:underline font-semibold"
                        >
                          Reset / Keep Current
                        </button>
                      )}
                    </div>
                    <div className="flex justify-center bg-black rounded-lg overflow-hidden h-44 max-h-44">
                      <video
                        src={videoPreview}
                        controls
                        playsInline
                        className="h-full w-auto max-w-full object-contain"
                      />
                    </div>
                  </div>
                )}

                {uploadProgress !== null && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="flex justify-between items-center text-xs font-bold text-blue-700 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <span className="animate-spin inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full" />
                        Uploading to server...
                      </span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 mt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={loading}
                  className="px-5 py-2 border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={loading || (!videoFile && !videoPreview)}
                  className="px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-blue-700 transition-all disabled:opacity-50"
                >
                  {uploadProgress !== null ? `Uploading ${uploadProgress}%...` : loading ? "Saving Video..." : "Save Video"}
                </button>
              </div>
            </div>
          ) : (
            /* CREATE INFLUENCER / REGISTER AUTH MODAL */
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Influencer Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Samayra Mehta"
                  value={formData.name}
                  onChange={handleNameChange}
                  readOnly={modalType === 'AUTH'}
                  className={`w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow ${modalType === 'AUTH' ? 'bg-slate-50 text-slate-500 cursor-not-allowed' : ''}`}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="e.g., samayramehta"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value.toLowerCase().replace(/\s+/g, '') })}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-slate-400 mt-1">Used by influencer to log in.</p>
              </div>

              {/* Password with Eye Icon and Generate Button */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-semibold text-slate-700">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const rnd = generateRandomPassword();
                      setFormData({ ...formData, password: rnd });
                      setShowCreatePassword(true);
                    }}
                    className="text-xs text-blue-600 hover:underline font-bold flex items-center gap-1"
                  >
                    <Sparkles size={12} /> Generate Random
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showCreatePassword ? "text" : "password"}
                    placeholder="Enter or generate password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-2.5 pr-10 border border-slate-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCreatePassword(!showCreatePassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    title={showCreatePassword ? "Hide password" : "Show password"}
                  >
                    {showCreatePassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                )}
              </div>

              {modalType === 'MODEL' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Influencer Label
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Verified Influencer"
                      value={roleLabel}
                      onChange={(e) => setRoleLabel(e.target.value)}
                      maxLength={60}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status ? "true" : "false"}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value === "true" })}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="true">Active (Can Log in & Visible)</option>
                      <option value="false">Inactive (Blocked from Login)</option>
                    </select>
                  </div>
                </>
              )}

              <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={loading}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all disabled:opacity-50"
                >
                  {loading ? "Creating..." : modalType === 'AUTH' ? "Register Auth" : "Create Influencer"}
                </button>
              </div>
            </div>
          )}
        </Modal>

        {/* DATA TABLE */}
        <div className="p-4">
          <DataGrid<Influencers>
            headers={[
              {
                key: "name",
                label: "Name",
                render: (row: Influencers) => (
                  <div className="font-semibold text-slate-700 flex items-center gap-2">
                    {row.name}
                    {row.video && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                        <Video size={11} /> Video
                      </span>
                    )}
                  </div>
                ),
              },
              {
                key: "username",
                label: "Username",
                render: (row: Influencers) => (
                  row.username ? (
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-mono text-slate-600">@{row.username}</span>
                      <button
                        type="button"
                        onClick={() => copyUsername(row)}
                        className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 border border-transparent hover:border-blue-100 transition"
                        title="Copy username"
                      >
                        {copiedUsernameId === row._id ? (
                          <Check size={14} className="text-emerald-600" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                    </div>
                  ) : (
                    <span className="text-slate-400 italic text-xs">Not set</span>
                  )
                ),
              },
              {
                key: "status",
                label: "Status",
                render: (row: Influencers) => {
                  const isActive = row.status === true || String(row.status) === 'true';
                  return (
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(row)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all shadow-sm ${
                        isActive
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-300"
                      }`}
                      title={`Click to set ${isActive ? 'Inactive' : 'Active'}`}
                    >
                      <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                      {isActive ? "Active" : "Inactive"}
                    </button>
                  );
                },
              },
              {
                key: "actions",
                label: "Actions",
                render: (row: Influencers) => (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditInfluencer(row)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition text-sm flex items-center gap-1 font-medium shadow-sm"
                      title="Edit Influencer Name & Details"
                    >
                      <Edit3 size={13} /> Edit
                    </button>
                    <button
                      onClick={() => handleEdit(row)}
                      className="bg-amber-500 text-white px-3 py-1 rounded-md hover:bg-amber-600 transition text-sm flex items-center gap-1 font-medium shadow-sm"
                      title="Upload / Change Influencer Video"
                    >
                      <Video size={13} /> Video
                    </button>
                    {/* Admin Password Change Button (Eye Icon inside modal, No old password needed) */}
                    <button
                      onClick={() => handleOpenChangePassword(row)}
                      className="bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-700 transition text-sm flex items-center gap-1 font-medium shadow-sm"
                      title="Set New Password (Admin Only)"
                    >
                      <KeyRound size={13} /> Password
                    </button>
                    
                    <button
                      onClick={() => router.push(`/admin/influencers/${row._id}/payments`)}
                      className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 transition text-sm flex items-center gap-1 font-medium shadow-sm"
                      title="Manage influencer payments"
                    >
                      <Wallet size={13} /> Payments
                    </button>
                    {/* DELETE BUTTON INTENTIONALLY REMOVED: Influencers cannot be deleted by admin, only set to Active/Inactive */}
                  </div>
                ),
              },
            ]}
            loading={loading}
            rows={data}
            totalRecords={totalRecords}
            page={lazyParams.page}
            pageSize={lazyParams.limit}
            onPageChange={(page) => setLazyParams((p) => ({ ...p, page }))}
            searchEnable={true}
            onSearch={handleSearch}
            draggable={!lazyParams.search}
            onReorder={handleReorder}
          />
        </div>
      </div>
    </div>
  );
}
