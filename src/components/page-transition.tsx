"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  // When the pathname changes, trigger the transition
  useEffect(() => {
    setIsTransitioning(true);
    
    // After a short delay, update the displayed children
    const timeout = setTimeout(() => {
      setDisplayChildren(children);
      setIsTransitioning(false);
    }, 300); // Match this with the CSS transition duration
    
    return () => clearTimeout(timeout);
  }, [pathname, children]);

  return (
    <div
      className={`page-transition ${
        isTransitioning ? "transitioning-out" : "transitioning-in"
      }`}
    >
      {displayChildren}
    </div>
  );
}
