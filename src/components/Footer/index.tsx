import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import MountainIcon from "../icons/MountainIcon";
import { motion } from "motion/react";
import { ScrollReveal } from "../ScrollReveal";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <ScrollReveal direction="fade" delay={0.7} distance={50}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <footer className="mt-8 py-8 bg-background">
          <div className="container mx-auto max-w-7xl md:w-10/12 w-11/12">
            <Separator className="mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <MountainIcon className="h-5 w-5" />
                  <h3 className="text-xl font-semibold">Papyrus</h3>
                </div>
                <p className="text-muted-foreground">
                  Your one-stop destination for all your stationery needs.
                  Quality products that inspire creativity and productivity.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/products"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      About Us
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Contact Us</h3>
                <address className="not-italic text-muted-foreground space-y-2">
                  <p>140, School College Road</p>
                  <p>Chapai Nawabganj, Bangladesh</p>
                  <p>Email: rafiferdos@gmail.com</p>
                  <p>Phone: (+880) 1921-479294</p>
                </address>
              </div>
            </div>

            <Separator className="mb-6" />

            <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
              <p>© {currentYear} NoteNest. All rights reserved.</p>

              <div className="flex items-center gap-1 mt-4 md:mt-0">
                Made with{" "}
                <Heart className="h-4 w-4 text-red-500 fill-red-500" /> by{" "}
                <a
                  href="/"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline transition-colors"
                >
                  Super Cluster Team
                </a>
              </div>
            </div>
          </div>
        </footer>
      </motion.div>
    </ScrollReveal>
  );
}
