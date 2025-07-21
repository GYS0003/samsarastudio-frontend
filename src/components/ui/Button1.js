"use client";

import Link from "next/link";
import clsx from "clsx";

export default function Button1({
  href = "#",
  children,
  className = "",
  variant = "outline", // 'outline' or 'filled'
}) {
  const isOutline = variant === "outline";

  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex items-center justify-center min-w-[150px] font-semibold text-sm sm:text-base px-5 py-2 rounded-full transition-all duration-300 relative overflow-hidden group",
        isOutline
          ? "text-[#b500b9] hover:text-white"
          : "text-white",
        className
      )}
    >
      {/* Background gradient - shown by default for filled, on hover for outline */}
      <span
        className={clsx(
          "absolute inset-0 rounded-full bg-gradient-to-r from-[#352f93] to-[#b500b9] transition-opacity duration-300",
          isOutline
            ? "opacity-0 group-hover:opacity-100"
            : "opacity-100 group-hover:opacity-0"
        )}
        aria-hidden="true"
      />

    
    
        {children}
    </Link>
  );
}