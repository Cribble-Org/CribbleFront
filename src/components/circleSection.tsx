// import { useEffect, useRef } from 'react';
// import ConnectedLines from "./ui/lines";
// import smallCircle1 from "../assets/Images/1faf463076b49467528fe2ce109c4d2d 4.webp";
// import smallCircle2 from "../assets/Images/1faf463076b49467528fe2ce109c4d2d 1.webp";
// import smallCircle3 from "../assets/Images/1faf463076b49467528fe2ce109c4d2d 3.webp";
// import smallCircle4 from "../assets/Images/1faf463076b49467528fe2ce109c4d2d 2.webp";
// import gif from "../assets/video/video.gif"

// export default function CirclePage() {
//   const videoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.play().catch(error => {
//         console.error("Error attempting to play video:", error);
//       });
//     }
//   }, []);

//   const steps = [
//     { id: 1, label: "LISTEN", image: smallCircle1 },
//     { id: 2, label: "UNDERSTAND", image: smallCircle2 },
//     { id: 3, label: "ACT", image: smallCircle3 },
//     { id: 4, label: "RESPOND", image: smallCircle4 },
//   ];

//   return (
//     <div className="min-h-screen bg-black text-white">
//       <div className="container mx-auto px-4 ">
//         <div className="flex flex-col items-center ">

//             <img src={gif} alt="Preview" className='w-[200px] h-[200px] md:w-[350px] md:h-[350px]'/>

//        <div className='-mt-[60px]'>
//           {/* Connected lines animation */}
//           <ConnectedLines />
//           </div>
//           {/* Small circles with labels */}
//           <div className="flex justify-between w-full max-w-3xl gap-4">
//             {steps.map((step) => (
//               <div key={step.id} className="flex flex-col items-center mx-4 ">
//                 {/* Small circle with image */}
//                   <img
//                     src={step.image}
//                     alt={step.label}
//                     className="w-full h-full object-cover "
//                   />
//                 <span className="text-sm font-medium tracking-wider">
//                   {step.label}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import smallCircle1 from "../assets/Images/1faf463076b49467528fe2ce109c4d2d 4.webp";
import smallCircle2 from "../assets/Images/1faf463076b49467528fe2ce109c4d2d 1.webp";
import smallCircle3 from "../assets/Images/1faf463076b49467528fe2ce109c4d2d 3.webp";
import smallCircle4 from "../assets/Images/1faf463076b49467528fe2ce109c4d2d 2.webp";
import gif from "../assets/video/video.gif";

export default function CirclePage() {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const [_hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
          setHasAnimated(true);
        } else {
          controls.start("hidden");
          setHasAnimated(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls]);

  const circles = [
    { text: "LISTEN", image: smallCircle1 },
    { text: "UNDERSTAND", image: smallCircle2 },
    { text: "ACT", image: smallCircle3 },
    { text: "RESPOND", image: smallCircle4 },
  ];

  return (
    <div className="min-h-screen text-white py-8 md:py-6 relative overflow-hidden">
      {/* Main large circle */}
      <div className="flex justify-center mb-6 md:mb-8 relative">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut"  // Changed this line
          }}
          className="relative"
        >
          <div className="main-circle relative h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full overflow-hidden">
            <motion.img
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 1.5,
                ease: "easeOut"
              }}
              src={gif}
              alt="Main Circle Animation"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </div>

      <motion.h3
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1 }}
      className="text-xl md:text-3xl font-semibold text-center mb-6"
    >
      Voice of a Message
    </motion.h3>

      {/* Animated smaller circles */}
      <div
        ref={ref}
        className="mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 px-6 max-w-7xl"
      >

{circles.map((circle, index) => (
  <motion.div
    key={circle.text}
    initial="hidden"
    animate={controls}
    variants={{
      hidden: {
        opacity: 0,
        y: -400,
        rotate: -360,
      },
      visible: {
        opacity: 1,
        y: 0,
        rotate: 0,
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 20,
          delay: index * 0.2,
          duration: 1.2,
        },
      }
    }}
    whileHover={{ 
      scale: 1.05,
      transition: { 
        duration: 0.3,
        type: "tween",
        ease: "easeInOut"
      }
    }}
    className="flex flex-col items-center gap-4 md:gap-6"
  >
    <motion.div 
      className="relative h-[150px] w-[150px] md:h-[250px] md:w-[250px] rounded-full overflow-hidden"
      whileHover={{ 
        scale: 1.05,
        transition: { 
          duration: 0.3,
          type: "tween",
          ease: "easeInOut"
        }
      }}
    >
      <motion.img
        src={circle.image}
        alt={circle.text}
        className="h-full w-full object-cover"
        whileHover={{ 
          scale: 1.1,
          transition: { 
            duration: 0.3,
            type: "tween",
            ease: "easeInOut"
          }
        }}
      />
    </motion.div>
    <motion.span 
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { 
            delay: index * 0.2 + 0.3,
            duration: 0.5
          }
        }
      }}
      className="text-lg md:text-2xl font-bold tracking-wider"
    >
      {circle.text}
    </motion.span>
  </motion.div>
))}
      </div>
    </div>
  );
}