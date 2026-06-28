'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface CloudinaryImage {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  created_at: string;
}

interface UploadItem {
  id: string;
  file: File;
  preview: string;
  title: string;
  status: 'pending' | 'uploading' | 'done' | 'error';
  progress: number;
  errorMsg?: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [gallery, setGallery] = useState<CloudinaryImage[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<CloudinaryImage | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const fetchGallery = useCallback(async () => {
    setLoadingGallery(true);
    try {
      const res = await fetch('/api/admin/gallery');
      if (!res.ok) throw new Error();
      const data = await res.json();
      setGallery(data.images);
    } catch {
      showToast('Failed to load gallery.');
    } finally {
      setLoadingGallery(false);
    }
  }, []);

  useEffect(() => { fetchGallery(); }, [fetchGallery]);

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const newItems: UploadItem[] = Array.from(files)
      .filter(f => f.type.startsWith('image/'))
      .map(f => ({
        id: `${Date.now()}-${Math.random()}`,
        file: f,
        preview: URL.createObjectURL(f),
        title: f.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
        status: 'pending',
        progress: 0,
      }));
    setUploads(prev => [...prev, ...newItems]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const uploadItem = async (item: UploadItem) => {
    setUploads(prev => prev.map(u => u.id === item.id ? { ...u, status: 'uploading', progress: 10 } : u));
    try {
      const fd = new FormData();
      fd.append('file', item.file);
      fd.append('title', item.title);
      const res = await fetch('/api/admin/gallery', { method: 'POST', body: fd });
      if (!res.ok) throw new Error((await res.json()).error || 'Upload failed');
      setUploads(prev => prev.map(u => u.id === item.id ? { ...u, status: 'done', progress: 100 } : u));
      showToast('Artwork uploaded successfully.');
      fetchGallery();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Upload failed';
      setUploads(prev => prev.map(u => u.id === item.id ? { ...u, status: 'error', errorMsg: msg } : u));
    }
  };

  const uploadAll = () => {
    uploads.filter(u => u.status === 'pending').forEach(u => uploadItem(u));
  };

  const removeUpload = (id: string) => {
    setUploads(prev => {
      const item = prev.find(u => u.id === id);
      if (item) URL.revokeObjectURL(item.preview);
      return prev.filter(u => u.id !== id);
    });
  };

  const handleDelete = async (img: CloudinaryImage) => {
    setDeletingId(img.public_id);
    setConfirmDelete(null);
    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_id: img.public_id }),
      });
      if (!res.ok) throw new Error();
      setGallery(prev => prev.filter(i => i.public_id !== img.public_id));
      showToast('Artwork deleted.');
    } catch {
      showToast('Failed to delete artwork.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    router.push('/admin/login');
  };

  const pendingUploads = uploads.filter(u => u.status === 'pending');

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white">
      {/* Top nav */}
      <header className="border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 bg-[#0B0B0C]/95 backdrop-blur-sm z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#D4AF37]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909" />
            </svg>
          </div>
          <div>
            <p className="font-sans text-sm font-medium text-white leading-none">Atelier Admin</p>
            <p className="font-sans text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">Gabriel Barclay</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 font-sans text-xs text-gray-500 hover:text-white transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            View Site
          </a>
          <button onClick={handleLogout}
            className="inline-flex items-center gap-1.5 font-sans text-xs text-gray-500 hover:text-red-400 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            Log Out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { label: 'Total Artworks', value: gallery.length },
            { label: 'Queued Uploads', value: uploads.filter(u => u.status === 'pending').length },
            { label: 'Uploaded Today', value: gallery.filter(i => new Date(i.created_at).toDateString() === new Date().toDateString()).length },
          ].map(stat => (
            <div key={stat.label} className="bg-white/[0.03] border border-white/8 rounded-sm p-5">
              <p className="font-sans text-2xl font-light text-white">{stat.value}</p>
              <p className="font-sans text-xs text-gray-500 uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Upload Zone */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-xl text-white">Upload Artwork</h2>
            {pendingUploads.length > 0 && (
              <button onClick={uploadAll}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37]/90 hover:bg-[#D4AF37] text-[#0B0B0C] font-sans text-xs uppercase tracking-widest font-medium transition-all rounded-sm hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                Upload All ({pendingUploads.length})
              </button>
            )}
          </div>

          {/* Drop zone */}
          <div
            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-sm p-12 text-center cursor-pointer transition-all duration-300 ${
              isDragging
                ? 'border-[#D4AF37]/60 bg-[#D4AF37]/5'
                : 'border-white/10 hover:border-white/20 hover:bg-white/[0.02]'
            }`}
          >
            <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden"
              onChange={e => addFiles(e.target.files)} />
            <div className="flex flex-col items-center gap-3 pointer-events-none">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${isDragging ? 'bg-[#D4AF37]/15' : 'bg-white/5'}`}>
                <svg className={`w-6 h-6 transition-colors ${isDragging ? 'text-[#D4AF37]' : 'text-gray-500'}`} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
              </div>
              <div>
                <p className="font-sans text-sm text-gray-300">{isDragging ? 'Drop to add artwork' : 'Drag & drop images here'}</p>
                <p className="font-sans text-xs text-gray-600 mt-1">or click to browse — JPG, PNG, WEBP supported</p>
              </div>
            </div>
          </div>

          {/* Upload queue */}
          <AnimatePresence>
            {uploads.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 space-y-3">
                {uploads.map(item => (
                  <motion.div key={item.id} layout
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                    className="flex items-center gap-4 bg-white/[0.03] border border-white/8 rounded-sm p-3"
                  >
                    <div className="relative w-14 h-14 flex-shrink-0 rounded-sm overflow-hidden bg-white/5">
                      <Image src={item.preview} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <input
                        value={item.title}
                        onChange={e => setUploads(prev => prev.map(u => u.id === item.id ? { ...u, title: e.target.value } : u))}
                        disabled={item.status !== 'pending'}
                        className="w-full bg-transparent font-sans text-sm text-white placeholder-gray-600 focus:outline-none border-b border-white/10 focus:border-[#D4AF37]/40 pb-1 transition-colors disabled:opacity-50"
                        placeholder="Artwork title"
                      />
                      <div className="flex items-center gap-2 mt-2">
                        {item.status === 'uploading' && (
                          <div className="flex-1 h-0.5 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-[#D4AF37] rounded-full animate-pulse" style={{ width: `${item.progress}%` }} />
                          </div>
                        )}
                        <span className={`font-sans text-[10px] uppercase tracking-widest ${
                          item.status === 'done' ? 'text-green-400' :
                          item.status === 'error' ? 'text-red-400' :
                          item.status === 'uploading' ? 'text-[#D4AF37]' : 'text-gray-500'
                        }`}>
                          {item.status === 'error' ? item.errorMsg || 'Failed' : item.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {item.status === 'pending' && (
                        <button onClick={() => uploadItem(item)}
                          className="px-3 py-1.5 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] font-sans text-[10px] uppercase tracking-widest rounded-sm transition-all">
                          Upload
                        </button>
                      )}
                      <button onClick={() => removeUpload(item.id)}
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 hover:bg-red-500/15 text-gray-500 hover:text-red-400 transition-all">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Gallery grid */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-xl text-white">Cloudinary Gallery</h2>
            <button onClick={fetchGallery}
              className="inline-flex items-center gap-1.5 font-sans text-xs text-gray-500 hover:text-white transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              Refresh
            </button>
          </div>

          {loadingGallery ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-square bg-white/[0.03] rounded-sm animate-pulse" />
              ))}
            </div>
          ) : gallery.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-white/8 rounded-sm">
              <p className="font-sans text-sm text-gray-500">No artworks in Cloudinary yet.</p>
              <p className="font-sans text-xs text-gray-600 mt-1">Upload your first piece above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <AnimatePresence>
                {gallery.map((img) => (
                  <motion.div key={img.public_id} layout
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                    className="group relative aspect-square bg-white/[0.03] rounded-sm overflow-hidden border border-white/8 hover:border-white/20 transition-all"
                  >
                    <Image src={img.secure_url} alt={img.public_id.split('/').pop() || 'artwork'}
                      fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end justify-between p-3">
                      <p className="font-sans text-[10px] text-white/0 group-hover:text-white/70 transition-all truncate max-w-[70%] leading-none">
                        {img.public_id.split('/').pop()}
                      </p>
                      <button
                        onClick={() => setConfirmDelete(img)}
                        disabled={deletingId === img.public_id}
                        className="opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 flex items-center justify-center rounded-full bg-red-500/20 hover:bg-red-500/40 border border-red-500/40 text-red-400 hover:text-red-300 disabled:opacity-50"
                      >
                        {deletingId === img.public_id
                          ? <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                          : <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                        }
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>
      </main>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setConfirmDelete(null)}>
            <motion.div className="bg-[#111] border border-white/10 rounded-sm p-8 max-w-sm w-full"
              initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
              onClick={e => e.stopPropagation()}>
              <h3 className="font-serif text-lg text-white mb-2">Delete Artwork?</h3>
              <p className="font-sans text-sm text-gray-400 mb-6">This will permanently remove the image from Cloudinary. This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmDelete(null)}
                  className="flex-1 py-3 border border-white/10 font-sans text-xs text-gray-400 hover:text-white hover:border-white/20 transition-all rounded-sm uppercase tracking-widest">
                  Cancel
                </button>
                <button onClick={() => handleDelete(confirmDelete)}
                  className="flex-1 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-400 font-sans text-xs uppercase tracking-widest rounded-sm transition-all">
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div className="fixed bottom-6 right-6 z-50 bg-[#111] border border-white/10 rounded-sm px-5 py-3 font-sans text-sm text-white shadow-xl"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
