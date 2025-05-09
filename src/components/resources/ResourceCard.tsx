import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";

interface ResourceCardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function ResourceCard({
  title,
  children,
  icon,
  delay = 0,
  className = "",
}: ResourceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <Card
        className={`overflow-hidden border shadow-md hover:shadow-lg transition-shadow ${className}`}
      >
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            {icon && <div className="text-primary">{icon}</div>}
            <h2 className="text-2xl font-bold">{title}</h2>
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {children}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
