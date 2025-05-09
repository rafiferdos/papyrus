import { motion } from "motion/react";

interface ResourceHeaderProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
}

export default function ResourceHeader({
  title,
  subtitle,
  imageSrc,
  imageAlt,
}: ResourceHeaderProps) {
  return (
    <div className="relative mb-10 overflow-hidden rounded-2xl">
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-full h-64 md:h-80 object-cover"
      />
      <div className="absolute inset-0 z-20 flex flex-col justify-center p-6 md:p-10">
        <motion.h1
          className="text-3xl md:text-5xl font-bold text-white mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="text-lg text-gray-200 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
}
