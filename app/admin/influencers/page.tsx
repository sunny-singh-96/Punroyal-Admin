"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { confirmDelete } from "@/lib/sweetAlert";
import { modelsValidate } from "@/validations/models";
import { modelsAPI } from "@/lib/integration/models";
import PageHeader from "@/components/admin/head/head";
import DataGrid from "@/components/admin/tables/dataGrid";
import Modal from "@/components/admin/shared/Modal";
import { ModelsError } from "@/validations/models";
import { getErrorMessage } from "@/lib/helpers/handlers";
import { UploadCloud, Video, Edit3 } from "lucide-react";

type Influencers = {
  _id: string;
  name: string;
  status: boolean;
  auth_created?: boolean;
  video?: string;
  order?: number;
};

export default function ModelsPage() {
  const [data, setData] = useState<Influencers[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'MODEL' | 'AUTH' | 'EDIT_VIDEO'>('MODEL');
  const [selectedRow, setSelectedRow] = useState<Influencers | null>(null);
  const [registeredAuthIds, setRegisteredAuthIds] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    status: true,
  });

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const MAX_VIDEO_SIZE_MB = 30;
  const MAX_VIDEO_SIZE_BYTES = MAX_VIDEO_SIZE_MB * 1024 * 1024;

  const [errors, setErrors] = useState<ModelsError>({});

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

  // ✅ Handle Name Change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const generatedUsername = val.trim().toLowerCase().replace(/\s+/g, '');
    setFormData({ ...formData, name: val, username: generatedUsername });
  };

  // ✅ Handle Edit Influencer Video
  const handleEdit = useCallback((row: Influencers) => {
    setSelectedRow(row);
    setModalType('EDIT_VIDEO');
    setVideoFile(null);
    setVideoPreview(row.video || '');
    setUploadProgress(null);
    setErrors({});
    setIsModalOpen(true);
  }, []);

  // ✅ Create influencer, Auth, or Update Video
  const handleSave = async () => {
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
      const toastId = toast.loading("Creating Model...");
      try {
        setLoading(true);
        const response = await modelsAPI.create({
          name: formData.name,
          username: '',
          password: ''
        });
        if (response?.data?.code === "OK" || response?.code === "OK") {
          setFormData({ name: "", username: "", password: "", status: true });
          setIsModalOpen(false);
          setReload(!reload);
          toast.success(`Influencer created successfully!`, { id: toastId });
        }
      } catch (error) {
        toast.error(getErrorMessage(error), { id: toastId });
      } finally {
        setLoading(false);
      }
    } else {
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
            // Update the backend to save auth_created: true
            await modelsAPI.update(selectedRow._id, { auth_created: true });
            setData((prev) => prev.map((item) => item._id === selectedRow._id ? { ...item, auth_created: true } : item));
          }
          setFormData({ name: "", username: "", password: "", status: true });
          setIsModalOpen(false);
          toast.success(`Auth registered successfully!`, { id: toastId });
        } else {
          toast.success("Auth registration request completed.", { id: toastId }); // Fallback
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

  // ✅ Delete Influncers
  const handleDelete = useCallback(async (id: string) => {
    const isConfirmed = await confirmDelete("Delete this influencer?");
    if (!isConfirmed) return;

    try {
      setLoading(true);
      const response = await modelsAPI.delete(id);
      if (response?.code === "OK" || response?.data?.code === "OK") {
        setData((prev) => prev.filter((item) => item._id !== id));
        toast.success("Influencer deleted successfully!");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Register Auth for Influencer (Opens Modal)
  const handleRegisterAuth = useCallback(async (row: Influencers) => {
    setModalType('AUTH');
    setSelectedRow(row);
    setFormData({
      name: row.name,
      username: (row as any).username || row.name.trim().toLowerCase().replace(/\s+/g, ''),
      password: "",
      status: true
    });
    setErrors({});
    setIsModalOpen(true);
  }, []);

  // ✅ Handle Drag & Drop Reordering
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
      fetchModels(); // Revert back on error
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header - Sticky */}
      <PageHeader
        title="Influencers"
        subtitle="Manage Product Influencers • Drag and drop rows to reorder videos on the website"
        rightContent={
          <button
            onClick={() => {
              setModalType('MODEL');
              setFormData({ name: "", username: "", password: "", status: true });
              setErrors({});
              setIsModalOpen(true);
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg"
          >
            Create Influencer
          </button>
        }
      />

      <div className="max-w-7xl mx-auto py-8">
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={
            modalType === 'EDIT_VIDEO'
              ? `Edit Influencer Video - ${selectedRow?.name}`
              : modalType === 'AUTH'
                ? 'Register Auth'
                : 'Create Influencer'
          }
          type="custom"
        >
          {modalType === 'EDIT_VIDEO' ? (
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
                        MP4, WebM, or QuickTime format • <span className="font-semibold text-blue-600">Max {MAX_VIDEO_SIZE_MB}MB limit</span> for fast uploads
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
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Influencer Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Kiren"
                  value={formData.name}
                  onChange={handleNameChange}
                  readOnly={modalType === 'AUTH'}
                  className={`w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow ${modalType === 'AUTH' ? 'bg-slate-50 text-slate-500 cursor-not-allowed' : ''}`}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                )}
              </div>
              
              {modalType === 'AUTH' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      placeholder="Automatically generated"
                      value={formData.username}
                      readOnly
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Minimum 6 characters"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                    />
                    {errors.password && (
                      <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                    )}
                  </div>
                </>
              )}
              <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Create"}
                </button>
              </div>
            </div>
          )}
        </Modal>

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
                key: "status",
                label: "Status",
                render: (row: Influencers) => (
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      row.status
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {row.status ? "Active" : "Inactive"}
                  </span>
                ),
              },
              {
                key: "actions",
                label: "Actions",
                render: (row: Influencers) => (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(row)}
                      className="bg-amber-500 text-white px-3 py-1 rounded-md hover:bg-amber-600 transition text-sm flex items-center gap-1 font-medium shadow-sm"
                      title="Edit Influencer Video"
                    >
                      <Edit3 size={13} /> Edit
                    </button>
                    <button
                      onClick={() => handleRegisterAuth(row)}
                      disabled={row.auth_created || registeredAuthIds.includes(row._id)}
                      className={`px-3 py-1 rounded-md transition text-sm ${row.auth_created || registeredAuthIds.includes(row._id) ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                    >
                      {row.auth_created || registeredAuthIds.includes(row._id) ? 'Auth Created' : 'Create Auth'}
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(row._id);
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition text-sm shadow-sm"
                    >
                      Delete
                    </button>
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
