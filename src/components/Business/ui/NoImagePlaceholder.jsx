import { Image as ImageIcon } from "lucide-react";

const NoImagePlaceholder = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-xl flex items-center justify-center ${className}`}>
      <div className="text-center">
        <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-500 text-sm font-medium">Không có hình ảnh</p>
      </div>
    </div>
  );
};

export default NoImagePlaceholder; 