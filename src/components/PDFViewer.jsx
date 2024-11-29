import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiDownload, HiExternalLink } from 'react-icons/hi';

const PDFViewer = ({ isOpen, onClose, pdfUrl }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-3xl bg-[var(--bg-paper)] rounded-2xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-[var(--border-color)]">
              <h3 className="text-[var(--text-primary)] text-xl font-semibold">Resume Preview</h3>
              <div className="flex items-center gap-2">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1.5 text-sm hover:bg-[var(--bg-accent)] rounded-lg transition-colors"
                >
                  <HiExternalLink className="w-4 h-4" />
                  <span>Open</span>
                </a>
                <a
                  href={pdfUrl}
                  download="Md._Sadidur_Rahman_Resume.pdf"
                  className="flex items-center gap-1 px-3 py-1.5 text-sm bg-[var(--text-accent)] text-white rounded-lg hover:bg-[var(--text-accent)]/90 transition-colors"
                >
                  <HiDownload className="w-4 h-4" />
                  <span>Download</span>
                </a>
                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-[var(--bg-accent)] rounded-lg transition-colors"
                >
                  <HiX className="w-5 h-5 text-[var(--text-primary)]" />
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="p-4">
              <div className="relative w-full bg-white rounded-lg overflow-hidden shadow-lg" style={{ height: 'calc(90vh - 140px)' }}>
                <iframe
                  src={`${pdfUrl}#toolbar=0`}
                  title="Resume Preview"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 'none' }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PDFViewer;
