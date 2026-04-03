import { useState, useEffect } from "react";

const useResponsiveCount = () => {
  const [count, setCount] = useState(2);

  useEffect(() => {
    const updateCount = () => {
      const width = window.innerWidth;

      if (width >= 1024) {
        setCount(6); // desktop
      } else if (width >= 768) {
        setCount(4); // tablet
      } else {
        setCount(2); // mobile
      }
    };

    updateCount();
    window.addEventListener("resize", updateCount);

    return () => window.removeEventListener("resize", updateCount);
  }, []);

  return count;
};

export default useResponsiveCount;
