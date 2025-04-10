
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

const MobileUpload: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const isMobile = useIsMobile();

  useEffect(() => {
    if (sessionId) {
      // Just simulate connection status
      setIsConnected(true);
      toast.success("Connected to session");
    }
    
    return () => {
      // Cleanup function
    };
  }, [sessionId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setUploadStatus('idle');
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }
    
    try {
      setIsUploading(true);
      // Simulate upload with timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setUploadStatus('success');
      toast.success("File uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus('error');
      toast.error("Failed to upload file");
    } finally {
      setIsUploading(false);
    }
  };

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-4 flex flex-col">
        <div className="flex items-center justify-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Upload Document</h2>
        </div>
        
        <div className="mb-4 text-center text-sm text-gray-600">
          {isConnected ? "Connected to session" : "Waiting to connect..."}
        </div>
        
        <div className="flex-1 flex flex-col">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-white mb-4 flex-1 flex flex-col items-center justify-center">
            <input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              className="hidden"
              accept="image/*,application/pdf"
            />
            
            <label 
              htmlFor="file-upload" 
              className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
            >
              <Upload className="h-12 w-12 text-indigo-500 mb-3" />
              {file ? (
                <div className="text-center">
                  <p className="font-medium text-gray-900 break-all">{file.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="font-medium text-gray-900">Tap to select a file</p>
                  <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
                </div>
              )}
            </label>
          </div>
          
          {uploadStatus === 'success' && (
            <div className="flex items-center justify-center text-green-500 gap-2 py-2 bg-green-50 rounded-md mb-4">
              <CheckCircle size={16} />
              <span>Upload successful</span>
            </div>
          )}
          
          {uploadStatus === 'error' && (
            <div className="flex items-center justify-center text-red-500 gap-2 py-2 bg-red-50 rounded-md mb-4">
              <AlertCircle size={16} />
              <span>Upload failed</span>
            </div>
          )}
          
          <Button
            onClick={handleUpload}
            disabled={!file || isUploading}
            className="w-full py-3"
            size="lg"
          >
            {isUploading ? "Uploading..." : "Upload File"}
          </Button>
        </div>
      </div>
    );
  }

  // Desktop view
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload Document</h2>
          <p className="text-gray-600 mb-6">
            {isConnected ? 
              "Connected to session" : 
              "Waiting to connect..."}
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition-colors">
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*,application/pdf"
            />
            
            <div className="flex flex-col items-center justify-center space-y-3">
              <Upload className="h-10 w-10 text-gray-400" />
              <p className="text-gray-600 font-medium">
                {file ? file.name : "Click or drag file to upload"}
              </p>
              <p className="text-xs text-gray-500">
                {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "PDF, JPG, PNG up to 10MB"}
              </p>
            </div>
          </div>
          
          {uploadStatus === 'success' && (
            <div className="flex items-center justify-center text-green-500 gap-2 py-2">
              <CheckCircle size={18} />
              <span>Upload successful</span>
            </div>
          )}
          
          {uploadStatus === 'error' && (
            <div className="flex items-center justify-center text-red-500 gap-2 py-2">
              <AlertCircle size={18} />
              <span>Upload failed</span>
            </div>
          )}
          
          <Button
            onClick={handleUpload}
            disabled={!file || isUploading}
            className="w-full"
          >
            {isUploading ? "Uploading..." : "Upload File"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileUpload;
