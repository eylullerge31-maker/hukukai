"use client";

import { Button } from "@/components/ui/Button";
import { Copy, Download, FileText } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";
import { jsPDF } from "jspdf";

interface DocumentPreviewProps {
  content: string;
  docName: string;
  onCopySuccess?: () => void;
}

export function DocumentPreview({ content, docName, onCopySuccess }: DocumentPreviewProps) {
  const handleCopy = async () => {
    const ok = await copyToClipboard(content);
    if (ok) onCopySuccess?.();
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${docName.replace(/\s/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = () => {
    const doc = new jsPDF({ format: "a4", unit: "mm" });
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const maxWidth = pageWidth - 2 * margin;
    const lineHeight = 6;
    let y = margin;

    doc.setFontSize(11);
    const lines = doc.splitTextToSize(content, maxWidth);

    for (const line of lines) {
      if (y + lineHeight > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    }

    doc.save(`${docName.replace(/\s/g, "_")}.pdf`);
  };

  return (
    <div className="space-y-4">
      <pre className="bg-bg2 rounded-lg p-6 border border-line text-txt text-sm whitespace-pre-wrap font-sans max-h-[400px] overflow-y-auto">
        {content}
      </pre>
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" leftIcon={<Copy className="w-4 h-4" />} onClick={handleCopy}>
          Kopyala
        </Button>
        <Button variant="primary" leftIcon={<Download className="w-4 h-4" />} onClick={handleDownloadPdf}>
          İndir (.pdf)
        </Button>
        <Button variant="ghost" leftIcon={<FileText className="w-4 h-4" />} onClick={handleDownloadTxt}>
          İndir (.txt)
        </Button>
      </div>
    </div>
  );
}
