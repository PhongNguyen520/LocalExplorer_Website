export const Modal = ({ show, onClose, children }) => {
    if (!show) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 ">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full h-80 p-8 relative animate-fade-in">
          <button
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl"
            onClick={onClose}
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    );
  };


  