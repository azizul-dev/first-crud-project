import Image from "next/image";
import { LuMapPin } from "react-icons/lu";

const DestinationCart = ({ destination }) => {
  const { imageUrl, price, destinationName, duration, country } = destination;

  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 hover:-translate-y-1.5 transition-transform duration-300 bg-white">
      
      {/* ✅ position: relative + fixed height দিতে হবে */}
      <div className="relative h-48 w-full">
        <Image
          alt={destinationName}
          src={imageUrl}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
          <LuMapPin/> {country}
        </p>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          {destinationName}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">🕐 {duration}</span>
          <div>
            <span className="text-xs text-gray-400">from </span>
            <span className="text-lg font-semibold text-gray-800">${price}</span>
          </div>
        </div>
        <button className="mt-4 w-full py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          Explore →
        </button>
      </div>
    </div>
  );
};

export default DestinationCart;