import { ScrollReveal } from "@/components/ScrollReveal";
import ResourceCard from "@/components/resources/ResourceCard";
import ResourceHeader from "@/components/resources/ResourceHeader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArchiveRestore,
  Boxes,
  FileBox,
  LampDesk,
  Layers,
  Lightbulb,
  ListChecks,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function WorkspaceOrganization() {
  return (
    <>
      <Helmet>
        <title>Workspace Organization Tips - Papyrus</title>
        <meta
          name="description"
          content="Create an inspiring and organized stationery workspace with our practical tips, storage solutions, and desk setup ideas."
        />
      </Helmet>

      <div className="container py-8 mx-auto">
        <ResourceHeader
          title="Workspace Organization"
          subtitle="Create a productive and inspiring creative environment"
          imageSrc="https://images.unsplash.com/photo-1554232456-8727aae0cfa4?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2070"
          imageAlt="Organized desk workspace with stationery items"
        />

        <div className="mb-10">
          <motion.p
            className="text-xl text-center max-w-3xl mx-auto text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            An organized workspace isn't just aesthetically pleasing—it can
            boost your creativity and productivity. Discover ideas for creating
            a functional and inspiring creative space with our organization tips
            and solutions.
          </motion.p>
        </div>

        <Tabs defaultValue="desk-setup" className="w-full mb-12">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
            <TabsTrigger value="desk-setup" className="flex items-center gap-2">
              <LampDesk size={18} />
              <span>Desk Setup</span>
            </TabsTrigger>
            <TabsTrigger value="storage" className="flex items-center gap-2">
              <Boxes size={18} />
              <span>Storage Solutions</span>
            </TabsTrigger>
            <TabsTrigger value="supplies" className="flex items-center gap-2">
              <Layers size={18} />
              <span>Organizing Supplies</span>
            </TabsTrigger>
            <TabsTrigger
              value="maintenance"
              className="flex items-center gap-2"
            >
              <ListChecks size={18} />
              <span>Maintenance Tips</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="desk-setup" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ScrollReveal>
                <ResourceCard
                  title="Ergonomic Arrangement"
                  icon={<SlidersHorizontal size={24} />}
                  delay={0.1}
                >
                  <p>
                    Creating an ergonomic workspace improves comfort and
                    prevents strain during long creative sessions.
                  </p>

                  <h3 className="text-lg font-semibold mt-4">
                    Key Considerations:
                  </h3>
                  <ul>
                    <li>Position your desk at elbow height when seated</li>
                    <li>
                      Place your monitor at eye level, about an arm's length
                      away
                    </li>
                    <li>Use an adjustable chair with proper lumbar support</li>
                    <li>Keep frequently used items within arm's reach</li>
                    <li>Ensure proper lighting to reduce eye strain</li>
                  </ul>

                  <div className="mt-4 rounded-md overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800"
                      alt="Ergonomic desk setup"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </ResourceCard>
              </ScrollReveal>

              <ScrollReveal>
                <ResourceCard
                  title="Lighting Solutions"
                  icon={<Lightbulb size={24} />}
                  delay={0.2}
                >
                  <p>
                    Proper lighting in your creative space reduces eye strain
                    and creates a positive atmosphere for productivity.
                  </p>

                  <h3 className="text-lg font-semibold mt-4">
                    Lighting Types:
                  </h3>
                  <ul>
                    <li>
                      <strong>Natural light</strong> - Position your desk near a
                      window when possible
                    </li>
                    <li>
                      <strong>Task lighting</strong> - Adjustable desk lamps for
                      detailed work
                    </li>
                    <li>
                      <strong>Ambient lighting</strong> - Even, diffused light
                      to reduce harsh shadows
                    </li>
                    <li>
                      <strong>Adjustable options</strong> - Dimmer switches or
                      smart bulbs to customize intensity
                    </li>
                  </ul>

                  <p className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-900 rounded-md">
                    <strong>Pro Tip:</strong> Choose lightbulbs with a color
                    temperature of 5000-6500K for daylight simulation, ideal for
                    color accuracy in creative work.
                  </p>
                </ResourceCard>
              </ScrollReveal>
            </div>
          </TabsContent>

          <TabsContent value="storage" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ScrollReveal>
                <ResourceCard
                  title="Vertical Storage Solutions"
                  icon={<ArchiveRestore size={24} />}
                  delay={0.1}
                >
                  <p>
                    Maximize your workspace by utilizing vertical space for
                    storage and organization.
                  </p>

                  <h3 className="text-lg font-semibold mt-4">
                    Vertical Storage Ideas:
                  </h3>
                  <ul>
                    <li>
                      Wall-mounted shelves for books, supplies, and inspiration
                    </li>
                    <li>Pegboards for frequently used tools and accessories</li>
                    <li>
                      Stackable organizers for paper, notebooks, and materials
                    </li>
                    <li>Hanging organizers for smaller items and stationery</li>
                  </ul>

                  <div className="mt-4 rounded-md overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800"
                      alt="Vertical storage solutions"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </ResourceCard>
              </ScrollReveal>

              <ScrollReveal>
                <ResourceCard
                  title="Paper Storage & Organization"
                  icon={<FileBox size={24} />}
                  delay={0.2}
                >
                  <p>
                    Keeping paper supplies organized and accessible protects
                    your materials while making them easy to find.
                  </p>

                  <h3 className="text-lg font-semibold mt-4">
                    Paper Storage Solutions:
                  </h3>
                  <ul>
                    <li>
                      <strong>Flat files</strong> - Ideal for larger sheets and
                      preventing bends
                    </li>
                    <li>
                      <strong>Document boxes</strong> - Perfect for organizing
                      by type, color, or weight
                    </li>
                    <li>
                      <strong>Paper trays</strong> - For daily use materials and
                      works-in-progress
                    </li>
                    <li>
                      <strong>Magazine files</strong> - Great for notebooks,
                      journals, and sketchbooks
                    </li>
                  </ul>

                  <p className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-md">
                    <strong>Preservation tip:</strong> Store high-quality papers
                    in acid-free containers away from direct sunlight to prevent
                    yellowing and degradation.
                  </p>
                </ResourceCard>
              </ScrollReveal>
            </div>
          </TabsContent>

          <TabsContent value="supplies" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ScrollReveal>
                <ResourceCard
                  title="Writing Instruments"
                  delay={0.1}
                  className="h-full"
                >
                  <p>
                    Keep pens, pencils, and markers accessible yet organized for
                    quick use.
                  </p>

                  <h3 className="text-lg font-semibold mt-3">
                    Organization Ideas:
                  </h3>
                  <ul>
                    <li>Desktop pen holders for daily use items</li>
                    <li>Drawer dividers for categorizing by type or color</li>
                    <li>Brush holders for art supplies and calligraphy pens</li>
                    <li>
                      Pen rolls for portable organization of special collections
                    </li>
                  </ul>
                </ResourceCard>
              </ScrollReveal>

              <ScrollReveal>
                <ResourceCard
                  title="Small Accessories"
                  delay={0.2}
                  className="h-full"
                >
                  <p>
                    Keep clips, tapes, sticky notes, and small accessories tidy
                    and within reach.
                  </p>

                  <h3 className="text-lg font-semibold mt-3">
                    Storage Solutions:
                  </h3>
                  <ul>
                    <li>Small divided trays for paperclips and staples</li>
                    <li>Magnetic strips for metal accessories</li>
                    <li>Clear jars for colorful items like washi tape</li>
                    <li>Drawer organizers with adjustable compartments</li>
                  </ul>
                </ResourceCard>
              </ScrollReveal>

              <ScrollReveal>
                <ResourceCard
                  title="Digital Integration"
                  delay={0.3}
                  className="h-full"
                >
                  <p>
                    Balance digital and analog tools in your workspace for
                    optimal productivity.
                  </p>

                  <h3 className="text-lg font-semibold mt-3">
                    Digital Solutions:
                  </h3>
                  <ul>
                    <li>Cable management systems to reduce desktop clutter</li>
                    <li>Tablet and device stands for convenient reference</li>
                    <li>Charger stations integrated into desk organization</li>
                    <li>Digital inventory systems for tracking supplies</li>
                  </ul>
                </ResourceCard>
              </ScrollReveal>
            </div>
          </TabsContent>

          <TabsContent value="maintenance" className="mt-6">
            <ScrollReveal>
              <ResourceCard
                title="Workspace Maintenance Routine"
                icon={<Sparkles size={24} />}
              >
                <p className="mb-4">
                  Maintaining your organized workspace is just as important as
                  setting it up. A regular maintenance routine keeps your
                  creative environment functional and inspiring.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Daily Habits</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="inline-block p-1 bg-primary/20 text-primary rounded-full mt-0.5">
                          ✓
                        </span>
                        <span>
                          Clear your desk at the end of each work session
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="inline-block p-1 bg-primary/20 text-primary rounded-full mt-0.5">
                          ✓
                        </span>
                        <span>
                          Return tools and materials to their designated spots
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="inline-block p-1 bg-primary/20 text-primary rounded-full mt-0.5">
                          ✓
                        </span>
                        <span>
                          Sort papers between active projects and archives
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Weekly Tasks</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="inline-block p-1 bg-primary/20 text-primary rounded-full mt-0.5">
                          ✓
                        </span>
                        <span>Dust surfaces and clean desk accessories</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="inline-block p-1 bg-primary/20 text-primary rounded-full mt-0.5">
                          ✓
                        </span>
                        <span>Review and file loose papers or notes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="inline-block p-1 bg-primary/20 text-primary rounded-full mt-0.5">
                          ✓
                        </span>
                        <span>
                          Check supplies and note items that need restocking
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <h3 className="text-lg font-semibold">Seasonal Refresh</h3>
                  <p>
                    Every 3-4 months, schedule a deeper organization session:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="inline-block p-1 bg-primary/20 text-primary rounded-full mt-0.5">
                        ✓
                      </span>
                      <span>
                        Reassess your organization system and adjust as needed
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="inline-block p-1 bg-primary/20 text-primary rounded-full mt-0.5">
                        ✓
                      </span>
                      <span>
                        Sort through accumulated materials and declutter
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="inline-block p-1 bg-primary/20 text-primary rounded-full mt-0.5">
                        ✓
                      </span>
                      <span>
                        Deep clean storage containers and workspace surfaces
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="inline-block p-1 bg-primary/20 text-primary rounded-full mt-0.5">
                        ✓
                      </span>
                      <span>
                        Update your inspiration elements to stay motivated
                      </span>
                    </li>
                  </ul>
                </div>
              </ResourceCard>
            </ScrollReveal>
          </TabsContent>
        </Tabs>

        <div className="my-12 bg-primary/5 border border-primary/20 rounded-xl p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Shop Organization Essentials
              </h2>
              <p className="text-muted-foreground mb-6">
                Discover our collection of desk organizers, storage solutions,
                and workspace accessories designed to help you create your
                perfect creative environment.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link to="/products/category/desk-organization">
                    Browse Organizers
                  </Link>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <Link to="/blog/workspace-inspiration">Get Inspiration</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1547480053-7d174f67b557?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=1000"
                alt="Desk organization products"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
