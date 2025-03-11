

import { motion } from "framer-motion";

export default function ConnectedLines() {
  const width = 700;
  const height = 400;
  const count = 4; // Number of lines to match the 4 circles
  const startY = 0; // Starting point Y coordinate
  const endY = height -0; // Ending point Y coordinate

  return (
    <div className="w-full h-[400px] flex items-center justify-center bg-black">
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <mask id="curveMask">
            {Array.from({ length: count }).map((_, i) => {
              const x = i * (width / (count - 1)); // Spread evenly along x-axis
              return (
                <path
                  key={i}
                  d={`M${width / 2},${startY} C${width / 2},${
                    height / 2 - 100
                  } ${x},${height / 2 + 100} ${x},${endY}`}
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
              );
            })}
          </mask>
          <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
            <motion.stop
              stopColor="rgba(255,255,255,0.1)"
              offset="0%"
              animate={{ offset: ["0%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.stop
              stopColor="white"
              offset="50%"
              animate={{ offset: ["50%", "150%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.stop
              stopColor="rgba(255,255,255,0.1)"
              offset="100%"
              animate={{ offset: ["100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </linearGradient>
        </defs>
        <g mask="url(#curveMask)">
          <rect x="0" y="0" width={width} height={height} fill="#111" />
          <rect x="0" y="0" width={width} height={height} fill="url(#gradient)" />
        </g>
      </svg>
    </div>
  );
}
