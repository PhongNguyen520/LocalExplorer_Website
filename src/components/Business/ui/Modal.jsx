export const Modal = ({ show, onClose, children }) => {
    if (!show) return null;
    
    const handleBackdropClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
        onClick={handleBackdropClick}
      >
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto relative animate-in fade-in-0 zoom-in-95 duration-300">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            onClick={onClose}
          >
            &times;
          </button>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    );
  };


  