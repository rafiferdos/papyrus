import { ScrollReveal } from "@/components/ScrollReveal";
import ResourceCard from "@/components/resources/ResourceCard";
import ResourceHeader from "@/components/resources/ResourceHeader";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  DownloadCloud,
  FileText,
  Info,
  Leaf,
  Scale,
} from "lucide-react";
import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";

export default function PaperGuide() {
  return (
    <>
      <Helmet>
        <title>Guide to Paper Types - Papyrus</title>
        <meta
          name="description"
          content="Learn about different paper types, weights, and finishes for writing, drawing, and more."
        />
      </Helmet>

      <div className="container py-8 mx-auto">
        <ResourceHeader
          title="Guide to Paper Types"
          subtitle="Understanding the right paper for your creative needs"
          imageSrc="https://images.unsplash.com/photo-1455611602647-a29e1e78cbd8?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2070"
          imageAlt="Various paper types and textures"
        />

        <div className="mb-10">
          <motion.p
            className="text-xl text-center max-w-3xl mx-auto text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Choosing the right paper can make all the difference in your
            creative projects. From weight and texture to finish and
            composition, this guide will help you understand everything you need
            to know about paper types.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <ScrollReveal>
            <ResourceCard
              title="Understanding Paper Weight"
              icon={<Scale size={24} />}
              delay={0.1}
            >
              <p>Paper weight is measured in two main systems:</p>
              <ul>
                <li>
                  <strong>GSM (Grams per Square Meter)</strong> - The most
                  universal measurement
                </li>
                <li>
                  <strong>Pounds (#)</strong> - Common in North America, varies
                  by paper type
                </li>
              </ul>

              <h3 className="text-lg font-semibold mt-4">
                Common Paper Weights:
              </h3>
              <div className="overflow-x-auto mt-2">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left">Type</th>
                      <th className="py-2 text-left">GSM</th>
                      <th className="py-2 text-left">Common Uses</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">Copy Paper</td>
                      <td className="py-2">75-90 GSM</td>
                      <td className="py-2">Everyday printing</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Premium Writing</td>
                      <td className="py-2">90-120 GSM</td>
                      <td className="py-2">Correspondence, stationery</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Journal Paper</td>
                      <td className="py-2">80-160 GSM</td>
                      <td className="py-2">Notebooks, journals</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Drawing Paper</td>
                      <td className="py-2">130-250 GSM</td>
                      <td className="py-2">Sketching, illustrations</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Watercolor Paper</td>
                      <td className="py-2">300+ GSM</td>
                      <td className="py-2">Painting, wet media</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ResourceCard>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <ResourceCard
              title="Paper Textures & Finishes"
              icon={<FileText size={24} />}
              delay={0.2}
            >
              <p>
                The surface texture of paper impacts how it feels and how media
                performs on it:
              </p>

              <h3 className="text-lg font-semibold mt-4">Common Textures:</h3>
              <ul>
                <li>
                  <strong>Smooth/Vellum</strong> - Low texture, great for
                  detailed work and fine writing
                </li>
                <li>
                  <strong>Cold Press</strong> - Medium texture, versatile for
                  many applications
                </li>
                <li>
                  <strong>Hot Press</strong> - Very smooth, ideal for detailed
                  illustrations
                </li>
                <li>
                  <strong>Rough</strong> - High texture, excellent for
                  watercolor and expressive work
                </li>
              </ul>

              <h3 className="text-lg font-semibold mt-4">Paper Finishes:</h3>
              <ul>
                <li>
                  <strong>Matte</strong> - Non-reflective, reduces glare, good
                  for readability
                </li>
                <li>
                  <strong>Glossy</strong> - Shiny finish, enhances color
                  vibrancy, best for photos
                </li>
                <li>
                  <strong>Satin/Silk</strong> - Middle ground between matte and
                  glossy
                </li>
                <li>
                  <strong>Coated vs. Uncoated</strong> - Affects ink absorption
                  and color representation
                </li>
              </ul>
            </ResourceCard>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <ResourceCard
            title="Eco-Friendly Paper Options"
            icon={<Leaf size={24} />}
            delay={0.3}
            className="mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Sustainable Paper Types:
                </h3>
                <ul>
                  <li>
                    <strong>Recycled Paper</strong> - Made from post-consumer
                    waste
                  </li>
                  <li>
                    <strong>FSC-Certified</strong> - Sourced from responsibly
                    managed forests
                  </li>
                  <li>
                    <strong>Tree-Free Paper</strong> - Made from alternative
                    fibers like bamboo, cotton, or hemp
                  </li>
                  <li>
                    <strong>Stone Paper</strong> - Made from calcium carbonate
                    and non-toxic resin
                  </li>
                </ul>

                <h3 className="text-lg font-semibold mt-4 mb-2">
                  Environmental Benefits:
                </h3>
                <ul>
                  <li>Reduces deforestation and habitat destruction</li>
                  <li>Decreases water and energy consumption</li>
                  <li>Lowers carbon footprint and pollution</li>
                  <li>Minimizes waste in landfills</li>
                </ul>
              </div>

              <div className="bg-primary/10 p-5 rounded-lg border border-primary/20">
                <h4 className="font-bold text-lg mb-3 text-primary">
                  Did You Know?
                </h4>
                <p className="mb-3">
                  Making recycled paper produces 74% less air pollution and 35%
                  less water pollution than making new paper.
                </p>
                <p>
                  At Papyrus, we prioritize eco-friendly options and clearly
                  label all sustainable products with our green leaf icon.
                </p>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm" asChild>
                    <a href="/products/eco-friendly">
                      Shop Eco-Friendly Options
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </ResourceCard>
        </ScrollReveal>

        <ScrollReveal>
          <ResourceCard
            title="Choosing Paper for Different Applications"
            icon={<BookOpen size={24} />}
            delay={0.4}
            className="mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-bold text-center mb-3 pb-2 border-b">
                  Writing & Journaling
                </h3>
                <ul className="space-y-1">
                  <li>
                    <strong>Fountain Pens:</strong> 90-100 GSM, slight texture
                  </li>
                  <li>
                    <strong>Ballpoint:</strong> 70-90 GSM, smooth finish
                  </li>
                  <li>
                    <strong>Journaling:</strong> 100-120 GSM, minimal
                    bleed-through
                  </li>
                  <li>
                    <strong>Daily Notes:</strong> 70-90 GSM, smooth or lined
                  </li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-bold text-center mb-3 pb-2 border-b">
                  Art & Illustration
                </h3>
                <ul className="space-y-1">
                  <li>
                    <strong>Sketching:</strong> 80-130 GSM, slightly textured
                  </li>
                  <li>
                    <strong>Ink Drawing:</strong> 150-200 GSM, smooth finish
                  </li>
                  <li>
                    <strong>Watercolor:</strong> 300+ GSM, cold press
                  </li>
                  <li>
                    <strong>Mixed Media:</strong> 200-300 GSM, medium texture
                  </li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-bold text-center mb-3 pb-2 border-b">
                  Business & Printing
                </h3>
                <ul className="space-y-1">
                  <li>
                    <strong>Stationery:</strong> 90-120 GSM, smooth finish
                  </li>
                  <li>
                    <strong>Business Cards:</strong> 300-350 GSM, coated
                  </li>
                  <li>
                    <strong>Presentations:</strong> 100-120 GSM, matte
                  </li>
                  <li>
                    <strong>Marketing:</strong> 170-250 GSM, glossy or silk
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-accent p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Expert Tip</h4>
              <p>
                Always test a small sample of paper before committing to a large
                project. Consider factors like ink drying time, bleed-through,
                and how the paper handles your specific tools and techniques.
              </p>
            </div>
          </ResourceCard>
        </ScrollReveal>

        <div className="my-12 p-6 bg-primary/10 rounded-xl border border-primary/20 text-center">
          <ScrollReveal>
            <motion.div
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-3">
                Download Our Complete Paper Guide
              </h2>
              <p className="max-w-2xl mx-auto mb-6 text-muted-foreground">
                Get our comprehensive PDF guide with paper comparison charts,
                sample applications, and a shopping guide to help you choose the
                perfect paper for any project.
              </p>
              <Button className="gap-2">
                <DownloadCloud size={18} />
                Download Paper Guide PDF
              </Button>
            </motion.div>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-muted p-6 rounded-lg border">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Info size={20} className="text-primary" />
                Have More Questions?
              </h3>
              <p className="mb-4">
                Our paper experts are available to help you choose the right
                products for your specific needs.
              </p>
              <Button variant="outline" asChild>
                <a href="/contact">Contact Our Experts</a>
              </Button>
            </div>

            <div className="bg-muted p-6 rounded-lg border">
              <h3 className="text-xl font-bold mb-4">Related Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/resources/ink-guide"
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-droplet"
                    >
                      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
                    </svg>
                    Complete Guide to Inks
                  </a>
                </li>
                <li>
                  <a
                    href="/resources/notebook-buying-guide"
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-book"
                    >
                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                    </svg>
                    Notebook Buying Guide
                  </a>
                </li>
                <li>
                  <a
                    href="/resources/calligraphy-basics"
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-pen"
                    >
                      <path d="M17 22h-1a4 4 0 0 1-4-4V6a2 2 0 0 1 2-2h1" />
                      <path d="M17 4v4" />
                      <path d="M17 14v2" />
                      <path d="M21 4v16a2 2 0 0 1-2 2h-2" />
                      <path d="M21 14h-4" />
                    </svg>
                    Calligraphy for Beginners
                  </a>
                </li>
                <li>
                  <a
                    href="/blog/conservation"
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-recycle"
                    >
                      <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
                      <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />
                      <path d="m14 16-3 3 3 3" />
                      <path d="M8.293 13.596 4.5 9.5l1.413-1.414" />
                      <path d="M7.196 9.5 8.5 5.5l4 .5" />
                      <path d="m14.5 5-1 2.5-5.101 2.132" />
                      <path d="M16 21h-4" />
                    </svg>
                    Paper Conservation Tips
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </>
  );
}
