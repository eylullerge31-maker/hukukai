"use client";

import { Button } from "@/components/ui/Button";
import { Copy, Download, FileText } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

interface DocumentPreviewProps {
  content: string;
  docName: string;
  onCopySuccess?: () => void;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function formatForPrint(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>");
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
    const safeTitle = escapeHtml(docName);
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${safeTitle}</title>
<style>
@page { size: A4; margin: 2.5cm; }
body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.5; color: #000; margin: 0; padding: 2.5cm; }
h1 { font-size: 14pt; text-align: center; margin-bottom: 24pt; text-transform: uppercase; }
.content { white-space: pre-wrap; }
strong { font-weight: bold; }
</style></head><body>
<h1>${safeTitle}</h1>
<div class="content">${formatForPrint(content)}</div>
</body></html>`;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(html);
    w.document.close();
    w.focus();
    setTimeout(() => {
      w.print();
      w.onafterprint = () => w.close();
    }, 250);
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
        <Button variant="primary" leftIcon={<Download className="w-4 h-4" />} onClick={handleDownloadPdf} title="Yazdır penceresinde 'PDF olarak kaydet' veya 'Microsoft Print to PDF' seçin">
          PDF İndir
        </Button>
        <Button variant="ghost" leftIcon={<FileText className="w-4 h-4" />} onClick={handleDownloadTxt}>
          İndir (.txt)
        </Button>
      </div>
    </div>
  );
}
