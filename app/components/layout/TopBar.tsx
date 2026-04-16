import { FiPhone, FiTruck, FiShield } from "react-icons/fi";

export default function TopBar() {
  return (
    <div className="bg-[#1E3A5F] text-white text-[11px] hidden sm:block">
      <div className="max-w-7xl mx-auto px-6 py-1.5 flex items-center justify-center gap-6">
        <span className="flex items-center gap-1.5">
          <FiPhone className="w-3 h-3" />
          Hotline: (021) 555-0199
        </span>
        <span className="text-white/30">|</span>
        <span className="flex items-center gap-1.5">
          <FiTruck className="w-3 h-3" />
          Trusted for Vehicle Service
        </span>
        <span className="text-white/30">|</span>
        <span className="flex items-center gap-1.5">
          <FiShield className="w-3 h-3" />
          Premium Checklist
        </span>
      </div>
    </div>
  );
}
