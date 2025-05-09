import { ScrollReveal } from "@/components/ScrollReveal";
import ResourceCard from "@/components/resources/ResourceCard";
import ResourceHeader from "@/components/resources/ResourceHeader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  GraduationCap,
  Lightbulb,
  PenTool,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function CalligraphyBasics() {
  return (
    <>
      <Helmet>
        <title>Calligraphy for Beginners - Papyrus</title>
        <meta
          name="description"
          content="Learn the fundamentals of calligraphy with our beginner-friendly guide to tools, techniques, and practice exercises."
        />
      </Helmet>

      <div className="container py-8 mx-auto">
        <ResourceHeader
          title="Calligraphy for Beginners"
          subtitle="Start your journey into the beautiful art of hand lettering"
          imageSrc="https://images.unsplash.com/photo-1576375659821-5476d5ccc8e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          imageAlt="Calligraphy pen and writing"
        />

        <div className="mb-10">
          <motion.p
            className="text-xl text-center max-w-3xl mx-auto text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Calligraphy transforms ordinary writing into art. Whether you're
            looking to address wedding invitations, create beautiful journal
            headers, or simply develop a new creative skill, our beginner's
            guide will help you get started.
          </motion.p>
        </div>

        <Tabs defaultValue="tools" className="mb-12">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 max-w-3xl mx-auto">
            <TabsTrigger value="tools">Essential Tools</TabsTrigger>
            <TabsTrigger value="basics">Basic Strokes</TabsTrigger>
            <TabsTrigger value="styles">Calligraphy Styles</TabsTrigger>
            <TabsTrigger value="practice">Practice Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="tools" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ScrollReveal>
                <ResourceCard
                  title="Choosing Your First Calligraphy Pen"
                  icon={<PenTool size={24} />}
                  delay={0.1}
                >
                  <p>
                    The right tools make learning calligraphy much easier. Here
                    are the main types of calligraphy pens for beginners:
                  </p>

                  <div className="mt-4 space-y-5">
                    <div className="flex gap-4 items-start">
                      <img
                        src="https://images.unsplash.com/photo-1599167557773-2a2b9e8c003e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                        alt="Brush pens"
                        className="rounded-md w-20 h-20 object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">Brush Pens</h3>
                        <p className="text-sm text-muted-foreground">
                          Perfect for beginners with a flexible tip that creates
                          thick and thin strokes. More forgiving than
                          traditional nibs.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <img
                        src="https://images.unsplash.com/photo-1523510468197-976021e9d585?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                        alt="Dip pens"
                        className="rounded-md w-20 h-20 object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">Dip Pens & Nibs</h3>
                        <p className="text-sm text-muted-foreground">
                          Traditional tools with greater versatility. A nib
                          holder with interchangeable nibs lets you create
                          various styles.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <img
                        src="https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                        alt="Fountain pens"
                        className="rounded-md w-20 h-20 object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">
                          Calligraphy Fountain Pens
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          A middle ground with built-in ink cartridges and
                          flexible nibs. Convenient for practice and everyday
                          use.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <h3 className="font-semibold mb-2">
                      Beginner Recommendation
                    </h3>
                    <p className="text-sm">
                      For absolute beginners, we recommend starting with brush
                      pens like the Tombow Fudenosuke or Pentel Sign Pen.
                      They're affordable, portable, and allow you to practice
                      pressure techniques without the learning curve of dip
                      pens.
                    </p>
                    <Button
                      variant="link"
                      className="text-primary p-0 mt-2"
                      asChild
                    >
                      <Link to="/products/calligraphy-starter-kit">
                        Shop Our Beginner Kits →
                      </Link>
                    </Button>
                  </div>
                </ResourceCard>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <ResourceCard
                  title="Essential Supplies"
                  icon={<Lightbulb size={24} />}
                  delay={0.2}
                >
                  <p className="mb-4">
                    Beyond pens, these additional supplies will set you up for
                    success:
                  </p>

                  <div className="space-y-3">
                    <div className="border-l-4 border-primary/40 pl-3">
                      <h3 className="font-semibold">Paper</h3>
                      <p className="text-sm text-muted-foreground">
                        Use smooth, high-quality paper that won't cause your ink
                        to bleed or feather. Marker paper, Bristol paper, or HP
                        Premium32 printer paper are excellent options for
                        practice.
                      </p>
                    </div>

                    <div className="border-l-4 border-primary/40 pl-3">
                      <h3 className="font-semibold">Ink</h3>
                      <p className="text-sm text-muted-foreground">
                        For dip pens, start with sumi ink or India ink. These
                        flow well and are opaque. Avoid waterproof inks until
                        you're more experienced.
                      </p>
                    </div>

                    <div className="border-l-4 border-primary/40 pl-3">
                      <h3 className="font-semibold">Guidelines</h3>
                      <p className="text-sm text-muted-foreground">
                        Use graph paper or print guidelines to help maintain
                        consistent letter heights. A light box can be useful for
                        tracing guidelines onto final pieces.
                      </p>
                    </div>

                    <div className="border-l-4 border-primary/40 pl-3">
                      <h3 className="font-semibold">Cleaning Supplies</h3>
                      <p className="text-sm text-muted-foreground">
                        Keep paper towels, water container, and pen cleaner
                        handy to maintain your tools between sessions.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-5">
                    <div className="bg-muted rounded-lg p-3 text-center">
                      <h4 className="text-sm font-semibold">Must-Have</h4>
                      <ul className="text-xs space-y-1 mt-2">
                        <li>• Quality paper</li>
                        <li>• Practice sheets</li>
                        <li>• Pen/nib holder</li>
                        <li>• Ink</li>
                      </ul>
                    </div>
                    <div className="bg-muted rounded-lg p-3 text-center">
                      <h4 className="text-sm font-semibold">Nice-to-Have</h4>
                      <ul className="text-xs space-y-1 mt-2">
                        <li>• Light box</li>
                        <li>• Cleaning solution</li>
                        <li>• Nib collection</li>
                        <li>• Ink palette</li>
                      </ul>
                    </div>
                  </div>
                </ResourceCard>
              </ScrollReveal>
            </div>
          </TabsContent>

          <TabsContent value="basics" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ScrollReveal>
                <ResourceCard
                  title="Foundational Strokes"
                  icon={<PenTool size={24} />}
                  delay={0.1}
                >
                  <p className="mb-4">
                    Master these basic strokes and you'll be able to form any
                    letter. The key is to apply pressure on downstrokes (thick
                    lines) and ease pressure on upstrokes (thin lines).
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="border rounded-lg p-3 text-center">
                      <div className="mb-2 flex justify-center">
                        <svg
                          width="50"
                          height="50"
                          viewBox="0 0 100 100"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-primary"
                        >
                          <path
                            d="M30 20 L30 80"
                            stroke="currentColor"
                            strokeWidth="12"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-sm">Downstroke</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Apply pressure for a thick line
                      </p>
                    </div>

                    <div className="border rounded-lg p-3 text-center">
                      <div className="mb-2 flex justify-center">
                        <svg
                          width="50"
                          height="50"
                          viewBox="0 0 100 100"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-primary"
                        >
                          <path
                            d="M30 80 L30 20"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-sm">Upstroke</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Light pressure for a thin line
                      </p>
                    </div>

                    <div className="border rounded-lg p-3 text-center">
                      <div className="mb-2 flex justify-center">
                        <svg
                          width="50"
                          height="50"
                          viewBox="0 0 100 100"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-primary"
                        >
                          <path
                            d="M20 50 C40 20, 60 80, 80 50"
                            stroke="currentColor"
                            strokeWidth="6"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-sm">Curve</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Varying pressure through the curve
                      </p>
                    </div>

                    <div className="border rounded-lg p-3 text-center">
                      <div className="mb-2 flex justify-center">
                        <svg
                          width="50"
                          height="50"
                          viewBox="0 0 100 100"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-primary"
                        >
                          <path
                            d="M30 20 L70 80"
                            stroke="currentColor"
                            strokeWidth="8"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-sm">Diagonal</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Pressure on downward diagonals
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 bg-muted p-4 rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">Practice Tip</h3>
                    <p className="text-xs">
                      Fill an entire page with each basic stroke before moving
                      to letters. This builds muscle memory and control. Start
                      slowly and focus on consistency rather than speed.
                    </p>
                  </div>

                  <div className="mt-4 flex justify-center">
                    <Button variant="outline" size="sm" asChild>
                      <a href="/resources/downloads/basic-strokes-worksheet.pdf">
                        Download Practice Sheet
                      </a>
                    </Button>
                  </div>
                </ResourceCard>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <ResourceCard
                  title="Hand Position & Technique"
                  icon={<GraduationCap size={24} />}
                  delay={0.2}
                >
                  <div className="mb-5">
                    <img
                      src="https://images.unsplash.com/photo-1603570618135-929f9781edc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                      alt="Proper hand position for calligraphy"
                      className="rounded-lg mb-4 w-full h-48 object-cover"
                    />
                  </div>

                  <h3 className="font-semibold mb-2">Proper Grip & Posture</h3>
                  <ul className="space-y-2 mb-5">
                    <li className="flex items-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary mt-1"
                      >
                        <polyline points="9 11 12 14 22 4"></polyline>
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                      </svg>
                      <span>
                        Hold the pen at a <strong>45-degree angle</strong> to
                        the paper
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary mt-1"
                      >
                        <polyline points="9 11 12 14 22 4"></polyline>
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                      </svg>
                      <span>
                        Grip the pen lightly – avoid a tight, cramped hold
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary mt-1"
                      >
                        <polyline points="9 11 12 14 22 4"></polyline>
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                      </svg>
                      <span>
                        Write with your entire arm, not just your fingers
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary mt-1"
                      >
                        <polyline points="9 11 12 14 22 4"></polyline>
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                      </svg>
                      <span>
                        Position your paper at approximately 45 degrees
                      </span>
                    </li>
                  </ul>

                  <h3 className="font-semibold mb-2">
                    Common Beginner Mistakes
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 flex items-center justify-center flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Gripping too tightly
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Causes hand fatigue and rigid lettering
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 flex items-center justify-center flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Inconsistent pressure
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Creates uneven line weights and messy letters
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 flex items-center justify-center flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Writing too quickly
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Leads to poor letter formation and wobbling
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-3 border border-primary/20 rounded-lg bg-primary/5">
                    <p className="text-sm">
                      <span className="font-bold">Remember:</span> Calligraphy
                      is not about writing faster—it's about deliberate,
                      controlled movements. Start slowly and build speed as your
                      muscle memory develops.
                    </p>
                  </div>
                </ResourceCard>
              </ScrollReveal>
            </div>
          </TabsContent>

          <TabsContent value="styles" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              <ScrollReveal>
                <ResourceCard
                  title="Major Calligraphy Styles"
                  icon={<BookOpen size={24} />}
                  delay={0.1}
                >
                  <p className="mb-6">
                    There are many calligraphy styles to explore, each with its
                    own history and characteristics. Here are some popular
                    styles for beginners to consider:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                        alt="Modern calligraphy example"
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-1">
                          Modern Calligraphy
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Free-flowing style with fewer rules and more creative
                          freedom. Ideal for beginners as it's more forgiving
                          and adaptable to personal expression.
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded">
                            Beginner-Friendly
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs"
                            asChild
                          >
                            <Link to="/products/category/modern-calligraphy">
                              View Tools
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1544656376-a35f9814f767?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                        alt="Copperplate calligraphy example"
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-1">Copperplate</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Elegant script with precise slant angles and graceful
                          curves. Requires a pointed nib and careful attention
                          to line contrast.
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded">
                            Intermediate
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs"
                            asChild
                          >
                            <Link to="/products/category/copperplate-calligraphy">
                              View Tools
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1595583035436-8e98f4fdc0dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                        alt="Gothic calligraphy example"
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-1">
                          Gothic / Blackletter
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Bold, angular style with strong vertical strokes. Uses
                          broad-edged nibs and follows structured rules for
                          spacing and proportions.
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded">
                            Intermediate
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs"
                            asChild
                          >
                            <Link to="/products/category/gothic-calligraphy">
                              View Tools
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1596494456493-7d10e925957a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                        alt="Italic calligraphy example"
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-1">Italic</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Clean, readable style with a slight slant. Versatile
                          for both formal and casual applications, using a
                          broad-edged nib for consistent widths.
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded">
                            Beginner-Friendly
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs"
                            asChild
                          >
                            <Link to="/products/category/italic-calligraphy">
                              View Tools
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </ResourceCard>
              </ScrollReveal>
            </div>
          </TabsContent>

          <TabsContent value="practice" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ScrollReveal>
                <ResourceCard
                  title="Structured Practice Guide"
                  icon={<Sparkles size={24} />}
                  delay={0.1}
                >
                  <p className="mb-4">
                    Consistent practice is the key to improvement in
                    calligraphy. Here's a step-by-step approach to building your
                    skills:
                  </p>

                  <div className="space-y-5 mt-6">
                    <div className="relative pl-8">
                      <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                        1
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          Basic Strokes (10-15 minutes)
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Begin each practice session with basic strokes. Focus
                          on consistent pressure, smooth transitions, and clean
                          lines.
                        </p>
                      </div>
                    </div>

                    <div className="relative pl-8">
                      <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                        2
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          Individual Letters (15-20 minutes)
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Practice each letter multiple times, focusing on
                          problem areas. Group similar letters (like 'a', 'c',
                          'd') that share basic shapes.
                        </p>
                      </div>
                    </div>

                    <div className="relative pl-8">
                      <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                        3
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          Letter Connections (15 minutes)
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Practice connecting letters in common combinations.
                          Focus on smooth transitions and consistent spacing
                          between letters.
                        </p>
                      </div>
                    </div>

                    <div className="relative pl-8">
                      <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                        4
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          Words & Short Phrases (10 minutes)
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Practice complete words that incorporate the letters
                          you've worked on. Focus on spacing and rhythm between
                          letters.
                        </p>
                      </div>
                    </div>

                    <div className="relative pl-8">
                      <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                        5
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          Reflection & Analysis (5 minutes)
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Review your practice, note improvements and areas to
                          work on next time. Circle your best examples for
                          reference.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <h4 className="font-semibold">
                      Recommended Practice Schedule
                    </h4>
                    <p className="text-sm mt-1">
                      15-20 minutes daily is more effective than several hours
                      once a week. Consistent, focused practice yields better
                      results than sporadic, lengthy sessions.
                    </p>
                  </div>
                </ResourceCard>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <ResourceCard
                  title="Creative Practice Ideas"
                  icon={<Lightbulb size={24} />}
                  delay={0.2}
                >
                  <p className="mb-4">
                    Keep your practice engaging and avoid monotony with these
                    creative exercises:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-3 hover:border-primary/40 transition-colors">
                      <h3 className="font-semibold text-sm mb-1">
                        Alphabet Challenge
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Write words from A to Z (apple, butterfly, cat...) with
                        extra attention to the initial letter.
                      </p>
                    </div>

                    <div className="border rounded-lg p-3 hover:border-primary/40 transition-colors">
                      <h3 className="font-semibold text-sm mb-1">
                        Quote of the Day
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Write a short inspirational quote each practice session,
                        focusing on overall composition.
                      </p>
                    </div>

                    <div className="border rounded-lg p-3 hover:border-primary/40 transition-colors">
                      <h3 className="font-semibold text-sm mb-1">
                        Character Maps
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Create a grid with variations of a single letter,
                        experimenting with serifs, slants, and flourishes.
                      </p>
                    </div>

                    <div className="border rounded-lg p-3 hover:border-primary/40 transition-colors">
                      <h3 className="font-semibold text-sm mb-1">
                        Faux Calligraphy
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Practice with regular pens by writing letters and
                        manually thickening downstrokes.
                      </p>
                    </div>

                    <div className="border rounded-lg p-3 hover:border-primary/40 transition-colors">
                      <h3 className="font-semibold text-sm mb-1">
                        Word Meditation
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Repeatedly write a single word, focusing on improving
                        each iteration.
                      </p>
                    </div>

                    <div className="border rounded-lg p-3 hover:border-primary/40 transition-colors">
                      <h3 className="font-semibold text-sm mb-1">
                        Style Mimicking
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Find a calligrapher you admire and analyze/practice
                        their distinctive style elements.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">
                      Practical Projects for Beginners
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary mt-1"
                        >
                          <polyline points="9 11 12 14 22 4"></polyline>
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                        <span>Gift tags or place cards</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary mt-1"
                        >
                          <polyline points="9 11 12 14 22 4"></polyline>
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                        <span>Greeting cards with simple messages</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary mt-1"
                        >
                          <polyline points="9 11 12 14 22 4"></polyline>
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                        <span>Journal headings and quotes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary mt-1"
                        >
                          <polyline points="9 11 12 14 22 4"></polyline>
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                        <span>Small framed quotes (5-10 words)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold">Remember</h4>
                    <p className="text-sm mt-1">
                      Calligraphy is an art of patience. Even the most
                      accomplished calligraphers continue to practice basic
                      strokes regularly. Embrace imperfections as part of your
                      learning journey.
                    </p>
                  </div>
                </ResourceCard>
              </ScrollReveal>
            </div>
          </TabsContent>
        </Tabs>

        <div className="my-16">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">
                Take Your Calligraphy Further
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Ready to deepen your skills? Explore our workshops, resources,
                and community support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-40 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1553029230-2be4f5c23de5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                    alt="Calligraphy workshops"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2">
                    In-Person Workshops
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Join our monthly calligraphy sessions with expert
                    instructors. All materials provided.
                  </p>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/events/workshops">View Schedule</Link>
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-40 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600497900863-2dfdef0a514a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                    alt="Calligraphy kits"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2">
                    Premium Starter Kits
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Everything you need to begin your calligraphy journey,
                    curated by our experts.
                  </p>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/products/calligraphy-kits">Shop Kits</Link>
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-40 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                    alt="Online courses"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2">Online Course</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Learn at your own pace with our comprehensive video
                    tutorials and assignments.
                  </p>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/courses/calligraphy-fundamentals">
                      Explore Courses
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="my-12 p-8 bg-primary/10 rounded-xl border border-primary/20">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/3">
                  <img
                    src="https://images.unsplash.com/photo-1611034540516-665df2bbdade?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Calligraphy starter kit"
                    className="rounded-lg shadow-lg"
                  />
                </div>
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold mb-4">
                    Join Our Calligraphy Community
                  </h2>
                  <p className="mb-4 text-muted-foreground">
                    Connect with fellow enthusiasts, share your progress, and
                    get feedback on your work. Our supportive community welcomes
                    calligraphers of all levels.
                  </p>
                  <div className="flex flex-wrap gap-3 mb-5">
                    <div className="flex items-center gap-2 bg-background px-3 py-1 rounded-full text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <polyline points="9 11 12 14 22 4"></polyline>
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                      </svg>
                      Monthly Challenges
                    </div>
                    <div className="flex items-center gap-2 bg-background px-3 py-1 rounded-full text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <polyline points="9 11 12 14 22 4"></polyline>
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                      </svg>
                      Feedback Sessions
                    </div>
                    <div className="flex items-center gap-2 bg-background px-3 py-1 rounded-full text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <polyline points="9 11 12 14 22 4"></polyline>
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                      </svg>
                      Resource Sharing
                    </div>
                    <div className="flex items-center gap-2 bg-background px-3 py-1 rounded-full text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <polyline points="9 11 12 14 22 4"></polyline>
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                      </svg>
                      Q&A with Experts
                    </div>
                  </div>
                  <Button asChild>
                    <Link to="/community/calligraphy">Join Community</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </>
  );
}
