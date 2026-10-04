"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import DataGrid from '@/components/admin/tables/dataGrid';
import PageHeader from '@/components/admin/head/head';
import { bannersAPI } from '@/lib/integration/banners';
import { confirmDelete } from '@/lib/sweetAlert';
import { getErrorMessage } from '@/lib/helpers/handlers';

type Banner = {
  _id: string;
  title: string;
  banner: string;
  redirect_to?: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function BannerListPage() {
  const router = useRouter();
  const [data, setData] = useState<Banner[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [lazyParams, setLazyParams] = useState({ page: 1, limit: 10, search: '' });
  const [loading, setLoading] = useState(false);
  const [redirectTo, setRedirectTo] = useState('');

  const fetchBanners = useCallback(async () => {
    try {
      const response = await bannersAPI.getAll(lazyParams);
      if (response?.code === 'OK') {
        setData(response.data || []);
        setTotalRecords(response.totalRecords || 0);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [lazyParams]);

  useEffect(() => {
    if (redirectTo) router.push(redirectTo);
  }, [redirectTo, router]);

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
      setLoading(true);
      const response = await bannersAPI.delete(id);
      if (response?.code === 'OK') {
        setData((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  const handleToggleStatus = useCallback(async (id: string, currentStatus: boolean) => {
    try {
      setLoading(true);
      await bannersAPI.updateStatus(id, !currentStatus);
      setData((prev) => prev.map((item) => item._id === id ? { ...item, status: !currentStatus } : item));
      toast.success(`Banner ${!currentStatus ? 'activated' : 'deactivated'}`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Banners" subtitle="Manage site banners" />

      <div className="p-4">
        <DataGrid<Banner>
          headers={[
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
                      className="rounded object-cover h-14 w-24 bg-slate-100 border border-slate-200"
                    />
                  ) : (
                    <div className="h-14 w-24 rounded bg-slate-100 border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-[10px] font-semibold">
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
                      <span className="text-[10px]">↗</span>
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
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${row.status ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {row.status ? 'Active' : 'Inactive'}
                  </span>
                  <button
                    onClick={() => handleToggleStatus(row._id, row.status)}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition ${row.status ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-green-500 text-white hover:bg-green-600'}`}
                  >
                    {row.status ? 'Turn Off' : 'Turn On'}
                  </button>
                </div>
              ),
            },
            {
              key: 'actions',
              label: 'Actions',
              render: (row) => (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setRedirectTo(`/banners/edit/${row._id}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(row._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
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
          onPageChange={(page) => setLazyParams((prev) => ({ ...prev, page }))}
          searchEnable
          onSearch={handleSearch}
          rightContent={{ text: '+ Create Banner', onClick: () => setRedirectTo('/banners/create') }}
        />
      </div>
    </div>
  );
}
