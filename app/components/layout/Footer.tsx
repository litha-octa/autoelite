import Link from "next/link";

const footerLinks = [
  {
    title: "Company",
    links: ["About Us", "Careers", "Press", "Blog"],
  },
  {
    title: "Services",
    links: ["Financing", "Insurance", "Warranty", "Maintenance"],
  },
  {
    title: "Support",
    links: ["Help Center", "Contact", "Privacy Policy", "Terms"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0B1829] text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">A</span>
              </div>
              <span className="text-sm font-bold text-white tracking-tight">
                AutoElite
              </span>
            </div>
            <p className="text-xs leading-relaxed text-gray-500">
              Your trusted destination for premium pre-owned vehicles.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
                {col.title}
              </p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="/"
                      className="text-xs text-gray-500 hover:text-white transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-gray-600">
            &copy; {new Date().getFullYear()} AutoElite. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Home", "Inventory", "Financing", "Blog", "FAQ", "Contact"].map(
              (l) => (
                <Link
                  key={l}
                  href="/"
                  className="text-[11px] text-gray-600 hover:text-gray-400 transition-colors"
                >
                  {l}
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
