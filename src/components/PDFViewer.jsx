import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiDownload, HiExternalLink } from 'react-icons/hi';

const PDFViewer = ({ isOpen, onClose }) => {
  const fileId = '1v6KNb0sYGJ-DltyglSLY6OiZ1_vqqRl0';
  
  const getUrl = (type) => {
    switch(type) {
      case 'preview':
        return `https://drive.google.com/file/d/${fileId}/preview?embedded=true&rm=minimal`;
      case 'open':
        return `https://drive.google.com/file/d/${fileId}/view`;
      case 'download':
        return `https://drive.google.com/uc?export=download&id=${fileId}`;
      default:
        return '';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-4xl bg-[var(--bg-paper)] rounded-2xl shadow-xl overflow-hidden max-h-[95vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-3 sm:p-4 border-b border-[var(--border-color)]">
              <h3 className="text-[var(--text-primary)] text-lg sm:text-xl font-semibold">Resume Preview</h3>
              <div className="flex items-center gap-1 sm:gap-2">
                <a
                  href={getUrl('open')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 text-sm hover:bg-[var(--bg-accent)] rounded-lg transition-colors"
                  title="Open in new tab"
                >
                  <HiExternalLink className="w-4 h-4" />
                  <span className="hidden sm:inline">Open</span>
                </a>
                <a
                  href={getUrl('download')}
                  download="Md._Sadidur_Rahman_Resume.pdf"
                  className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 text-sm bg-[var(--text-accent)] text-white rounded-lg hover:bg-[var(--text-accent)]/90 transition-colors"
                  title="Download PDF"
                >
                  <HiDownload className="w-4 h-4" />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-[var(--bg-accent)] rounded-lg transition-colors"
                  title="Close"
                >
                  <HiX className="w-5 h-5 text-[var(--text-primary)]" />
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 min-h-0 w-full bg-gray-100">
              <iframe
                src={getUrl('preview')}
                title="Resume Preview"
                className="w-full h-full"
                style={{ border: 'none', minHeight: '60vh' }}
                allow="autoplay"
                sandbox="allow-same-origin allow-scripts"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PDFViewer;
