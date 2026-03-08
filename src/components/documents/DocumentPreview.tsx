"use client";

import { Button } from "@/components/ui/Button";
import { Copy, Download } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

interface DocumentPreviewProps {
  content: string;
  docName: string;
}

export function DocumentPreview({ content, docName }: DocumentPreviewProps) {
  const handleCopy = () => {
    copyToClipboard(content);
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${docName.replace(/\s/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <pre className="bg-bg2 rounded-lg p-6 border border-line text-txt text-sm whitespace-pre-wrap font-sans max-h-[400px] overflow-y-auto">
        {content}
      </pre>
      <div className="flex gap-2">
        <Button variant="secondary" leftIcon={<Copy className="w-4 h-4" />} onClick={handleCopy}>
          Kopyala
        </Button>
        <Button variant="primary" leftIcon={<Download className="w-4 h-4" />} onClick={handleDownload}>
          İndir (.txt)
        </Button>
      </div>
    </div>
  );
}
