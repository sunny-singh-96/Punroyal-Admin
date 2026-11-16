"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import DataGrid from '@/components/admin/tables/dataGrid';
import PageHeader from '@/components/admin/head/head';
import { bannersAPI } from '@/lib/integration/banners';
import { confirmDelete } from '@/lib/sweetAlert';
import { getErrorMessage } from '@/lib/helpers/handlers';
import { Edit2, Trash2, ExternalLink, ArrowUp, ArrowDown } from 'lucide-react';

type Banner = {
  _id: string;
  title: string;
  banner: string;
  redirect_to?: string;
  status: boolean;
  order?: number;
  createdAt: string;
  updatedAt: string;
};

export default function BannerListPage() {
  const router = useRouter();
  const [data, setData] = useState<Banner[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [lazyParams, setLazyParams] = useState({ page: 1, limit: 10, search: '' });
  const [loading, setLoading] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchBanners = useCallback(async () => {
    try {
      const response = await bannersAPI.getAll(lazyParams);
      if (response?.code === 'OK') {
        setData(response.data || []);
        setTotalRecords(response.totalRecords || 0);
      }
    } catch (error) {
      toast.error(getErrorMessage(error) || 'Failed to fetch banners');
    } finally {
      setLoading(false);
    }
  }, [lazyParams]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(true);
      fetchBanners();
    }, 300);
    return () => clearTimeout(timeout);
  }, [fetchBanners]);

  const handleSearch = useCallback((search: string) => {
    setLazyParams((prev) => ({ ...prev, search, page: 1 }));
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    const isConfirmed = await confirmDelete('Delete this banner?');
    if (!isConfirmed) return;
    try {
      const response = await bannersAPI.delete(id);
      if (response?.code === 'OK') {
        setData((prev) => prev.filter((item) => item._id !== id));
        toast.success('Banner deleted successfully');
      } else {
        toast.error('Failed to delete banner');
      }
    } catch (error) {
      toast.error(getErrorMessage(error) || 'Failed to delete banner');
    }
  }, []);

  const handleToggleStatus = useCallback(async (id: string, currentStatus: boolean) => {
    const nextStatus = !currentStatus;
    // Optimistic UI update
    setData((prev) =>
      prev.map((item) => (item._id === id ? { ...item, status: nextStatus } : item))
    );
    setTogglingId(id);

    try {
      await bannersAPI.updateStatus(id, nextStatus);
      toast.success(`Banner ${nextStatus ? 'activated (Live)' : 'deactivated (Hidden)'}`);
      fetchBanners();
    } catch (error) {
      // Rollback on failure
      setData((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status: currentStatus } : item))
      );
      toast.error(getErrorMessage(error) || 'Failed to update banner status');
    } finally {
      setTogglingId(null);
    }
  }, [fetchBanners]);

  const handleMove = useCallback(async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === data.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const newData = [...data];
    const temp = newData[index];
    newData[index] = newData[targetIndex];
    newData[targetIndex] = temp;

    const baseOrder = (lazyParams.page - 1) * lazyParams.limit;
    const reorderPayload = newData.map((banner, idx) => ({
      id: banner._id,
      order: baseOrder + idx + 1,
    }));

    const updatedData = newData.map((banner, idx) => ({
      ...banner,
      order: baseOrder + idx + 1,
    }));
    setData(updatedData);

    try {
      await bannersAPI.reorder(reorderPayload);
      toast.success("Banner order updated");
    } catch (error) {
      toast.error(getErrorMessage(error) || "Failed to update banner order");
      fetchBanners();
    }
  }, [data, lazyParams, fetchBanners]);

  const handleUpdateOrderNumber = useCallback(async (id: string, newOrder: number) => {
    try {
      await bannersAPI.updateOrder(id, newOrder);
      setData((prev) =>
        prev.map((b) => (b._id === id ? { ...b, order: newOrder } : b))
      );
      toast.success("Banner order saved");
      fetchBanners();
    } catch (error) {
      toast.error(getErrorMessage(error) || "Failed to update order");
    }
  }, [fetchBanners]);

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Banners" subtitle="Manage site banners (Active banners appear on customer homepage)" />

      <div className="p-4 md:p-6">
        <DataGrid<Banner>
          headers={[
            {
              key: "order",
              label: "Display Order",
              render: (row: Banner) => {
                const currentIndex = data.findIndex((b) => b._id === row._id);
                return (
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col gap-1">
                      <button
                        type="button"
                        onClick={() => handleMove(currentIndex, 'up')}
                        disabled={currentIndex === 0}
                        title="Move Up"
                        className="p-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition text-slate-700 cursor-pointer"
                      >
                        <ArrowUp size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMove(currentIndex, 'down')}
                        disabled={currentIndex === data.length - 1}
                        title="Move Down"
                        className="p-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition text-slate-700 cursor-pointer"
                      >
                        <ArrowDown size={13} />
                      </button>
                    </div>
                    <input
                      type="number"
                      defaultValue={row.order ?? currentIndex + 1}
                      key={`${row._id}-${row.order ?? currentIndex + 1}`}
                      onBlur={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val) && val !== row.order) {
                          handleUpdateOrderNumber(row._id, val);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const val = parseInt((e.target as HTMLInputElement).value, 10);
                          if (!isNaN(val) && val !== row.order) {
                            handleUpdateOrderNumber(row._id, val);
                          }
                        }
                      }}
                      className="w-14 px-2 py-1 text-xs text-center border border-slate-300 rounded-md font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                      title="Enter order number and press Enter or blur to save"
                    />
                  </div>
                );
              },
            },
            {
              key: 'image',
              label: 'Banner',
              render: (row) => (
                <div className="flex items-center gap-3">
                  {row.banner ? (
                    <img
                      src={row.banner}
                      alt={row.title || 'banner'}
                      width={100}
                      height={60}
                      className="rounded-lg object-cover h-14 w-24 bg-slate-100 border border-slate-200"
                    />
                  ) : (
                    <div className="h-14 w-24 rounded-lg bg-slate-100 border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-[10px] font-semibold">
                      No Image
                    </div>
                  )}
                  <span className="font-semibold text-slate-800">{row.title || 'Untitled Banner'}</span>
                </div>
              ),
            },
            {
              key: 'redirect_to',
              label: 'Link URL',
              render: (row) => (
                <div className="max-w-xs truncate">
                  {row.redirect_to ? (
                    <a
                      href={row.redirect_to}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-800 font-mono underline inline-flex items-center gap-1"
                      title={row.redirect_to}
                    >
                      <span className="truncate max-w-[200px]">{row.redirect_to}</span>
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400 italic">No link</span>
                  )}
                </div>
              ),
            },
            {
              key: 'status',
              label: 'Status',
              render: (row) => (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled={togglingId === row._id}
                    onClick={() => handleToggleStatus(row._id, row.status)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer disabled:opacity-50 ${
                      row.status ? 'bg-emerald-500' : 'bg-slate-300'
                    }`}
                    title={row.status ? 'Click to deactivate' : 'Click to activate'}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-xs ${
                        row.status ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span
                    className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                      row.status
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}
                  >
                    {row.status ? 'Active' : 'Inactive'}
                  </span>
                </div>
              ),
            },
            {
              key: 'actions',
              label: 'Actions',
              render: (row) => (
                <div className="flex items-center gap-2">
                  <Link
                    href={`/banners/edit/${row._id}`}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Edit Banner"
                  >
                    <Edit2 size={16} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(row._id)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                    title="Delete Banner"
                  >
                    <Trash2 size={16} />
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
          onPageChange={(page) => setLazyParams((prev) => ({ ...prev, page }))}
          searchEnable
          onSearch={handleSearch}
          rightContent={{ text: '+ Create Banner', onClick: () => router.push('/banners/create') }}
        />
      </div>
    </div>
  );
}
