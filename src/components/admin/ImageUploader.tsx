'use client'
import { useState, useCallback } from 'react'
import { Upload, X } from 'lucide-react'

interface ImageUploaderProps {
  value: string
  onChange: (url: string) => void
  label?: string
}

export default function ImageUploader({ value, onChange, label = 'Image' }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const handleUpload = useCallback(async (file: File) => {
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      onChange(data.url)
    } catch (err) {
      console.error('Upload failed:', err)
    }
    setUploading(false)
  }, [onChange])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleUpload(file)
  }, [handleUpload])

  return (
    <div>
      <label className="block text-sm font-medium text-muted mb-2">{label}</label>
      {value && (
        <div className="relative mb-3 rounded-lg overflow-hidden border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value.startsWith('http') ? value : value} alt="Preview" className="w-full h-40 object-cover" />
          <button
            onClick={() => onChange('')}
            className="absolute top-2 right-2 bg-danger p-1 rounded-full text-white hover:bg-danger-hover"
          >
            <X size={14} />
          </button>
        </div>
      )}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
          dragOver ? 'border-accent bg-accent/10' : 'border-border hover:border-muted'
        }`}
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id={`upload-${label}`}
          onChange={(e) => { const file = e.target.files?.[0]; if (file) handleUpload(file) }}
        />
        <label htmlFor={`upload-${label}`} className="cursor-pointer">
          {uploading ? (
            <div className="text-accent">Uploading...</div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted">
              <Upload size={24} />
              <span className="text-sm">Drop image or click to upload</span>
            </div>
          )}
        </label>
      </div>
      <div className="mt-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or enter image URL..."
          className="w-full bg-input-bg border border-border rounded-lg px-3 py-2 text-sm text-white placeholder-muted/50 focus:outline-none focus:border-accent"
        />
      </div>
    </div>
  )
}
