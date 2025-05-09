import { ScrollReveal } from "@/components/ScrollReveal";
import ResourceCard from "@/components/resources/ResourceCard";
import ResourceHeader from "@/components/resources/ResourceHeader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bookmark,
  BookOpen,
  Calendar,
  Heart,
  Lightbulb,
  Newspaper,
  PenTool,
  Rocket,
  Sparkles,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function JournalIdeas() {
  return (
    <>
      <Helmet>
        <title>Creative Journal Ideas - Papyrus</title>
        <meta
          name="description"
          content="Explore creative journal ideas, prompts, and techniques to inspire your daily writing practice."
        />
      </Helmet>

      <div className="container py-8 mx-auto">
        <ResourceHeader
          title="Creative Journal Ideas"
          subtitle="Inspiration to fill your pages with meaning and creativity"
          imageSrc="https://images.unsplash.com/photo-1519682577862-22b62b24e493?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2070"
          imageAlt="Open journal with writing accessories"
        />

        <div className="mb-10">
          <motion.p
            className="text-xl text-center max-w-3xl mx-auto text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Journaling is more than just recording daily events—it's a gateway
            to self-discovery, creativity, and mindfulness. Explore our
            collection of journaling ideas to start or revitalize your practice.
          </motion.p>
        </div>

        <Tabs defaultValue="popular" className="mb-12">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 max-w-3xl mx-auto">
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="creative">Creative</TabsTrigger>
            <TabsTrigger value="mindfulness">Mindfulness</TabsTrigger>
            <TabsTrigger value="personal">Personal Growth</TabsTrigger>
            <TabsTrigger value="themed">Themed</TabsTrigger>
          </TabsList>

          <TabsContent value="popular" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ScrollReveal>
                <ResourceCard
                  title="Daily Gratitude"
                  icon={<Heart size={24} />}
                  delay={0.1}
                >
                  <p>
                    Start or end each day by writing down 3-5 things you're
                    grateful for. This simple practice can transform your
                    mindset and outlook.
                  </p>

                  <h3 className="text-lg font-semibold mt-4">
                    Prompts to Try:
                  </h3>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>What made me smile today?</li>
                    <li>What's something beautiful I noticed?</li>
                    <li>Who am I grateful to have in my life right now?</li>
                    <li>What opportunity am I thankful for?</li>
                    <li>What's a small comfort I often take for granted?</li>
                  </ul>

                  <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm italic">
                      "Gratitude turns what we have into enough." — Anonymous
                    </p>
                  </div>
                </ResourceCard>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <ResourceCard
                  title="Morning Pages"
                  icon={<PenTool size={24} />}
                  delay={0.2}
                >
                  <p>
                    Popularized by Julia Cameron in "The Artist's Way," morning
                    pages involve writing three pages of stream-of-consciousness
                    thoughts immediately upon waking up.
                  </p>

                  <h3 className="text-lg font-semibold mt-4">How It Works:</h3>
                  <ul className="space-y-2 mt-1">
                    <li>
                      • Write first thing in the morning before your inner
                      critic wakes up
                    </li>
                    <li>• Fill three pages with whatever comes to mind</li>
                    <li>
                      • Don't edit, censor, or worry about grammar or spelling
                    </li>
                    <li>• Keep writing until you complete three pages</li>
                  </ul>

                  <p className="mt-4">
                    This practice helps clear mental clutter, spark creativity,
                    and provides clarity for the day ahead. Many writers and
                    artists credit morning pages for breakthrough ideas and
                    overcoming creative blocks.
                  </p>
                </ResourceCard>
              </ScrollReveal>
            </div>
          </TabsContent>

          <TabsContent value="creative" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ScrollReveal>
                <ResourceCard
                  title="Visual Journaling"
                  icon={<Sparkles size={24} />}
                  delay={0.1}
                >
                  <p>
                    Combine words with drawings, collage, colors, and other
                    visual elements to express thoughts and feelings that might
                    be difficult to put into words alone.
                  </p>

                  <h3 className="text-lg font-semibold mt-4">Ideas to Try:</h3>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Color-code your emotions throughout a journal entry</li>
                    <li>
                      Collect and paste items that represent your day (tickets,
                      leaves, etc.)
                    </li>
                    <li>Draw simple illustrations alongside your writing</li>
                    <li>Create a visual mind map to explore a concept</li>
                    <li>
                      Use watercolors to create a background for your words
                    </li>
                  </ul>

                  <div className="mt-4 flex justify-center">
                    <img
                      src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                      alt="Visual journal example"
                      className="rounded-lg shadow-md max-h-36 object-cover"
                    />
                  </div>
                </ResourceCard>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <ResourceCard
                  title="Fictional Dialogues"
                  icon={<BookOpen size={24} />}
                  delay={0.2}
                >
                  <p>
                    Create conversations between characters, real or imagined,
                    to explore perspectives and ideas from different viewpoints.
                  </p>

                  <h3 className="text-lg font-semibold mt-4">
                    Try These Conversations:
                  </h3>
                  <ul className="space-y-2 mt-2">
                    <li>• Between your present self and your future self</li>
                    <li>• With a historical figure you admire</li>
                    <li>• Between two sides of your personality</li>
                    <li>• With a challenge or problem you're facing</li>
                    <li>
                      • Between two characters from different books or stories
                    </li>
                  </ul>

                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm">
                      <strong>Writing tip:</strong> Format your dialogue like a
                      script or play to make it easier to follow the
                      conversation as it unfolds.
                    </p>
                  </div>
                </ResourceCard>
              </ScrollReveal>
            </div>
          </TabsContent>

          <TabsContent value="mindfulness" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ScrollReveal>
                <ResourceCard
                  title="Sensory Observations"
                  icon={<Star size={24} />}
                  delay={0.1}
                >
                  <p>
                    Focus on your five senses to ground yourself in the present
                    moment and develop greater awareness of your surroundings.
                  </p>

                  <div className="mt-4 space-y-3">
                    <div className="p-2 border-l-4 border-primary/50">
                      <strong>5 things you can see</strong>
                      <p className="text-sm text-muted-foreground">
                        Describe colors, shapes, movements, and details
                      </p>
                    </div>

                    <div className="p-2 border-l-4 border-primary/50">
                      <strong>4 things you can touch</strong>
                      <p className="text-sm text-muted-foreground">
                        Describe textures, temperatures, and physical sensations
                      </p>
                    </div>

                    <div className="p-2 border-l-4 border-primary/50">
                      <strong>3 things you can hear</strong>
                      <p className="text-sm text-muted-foreground">
                        Note ambient sounds, volume, pitch, and patterns
                      </p>
                    </div>

                    <div className="p-2 border-l-4 border-primary/50">
                      <strong>2 things you can smell</strong>
                      <p className="text-sm text-muted-foreground">
                        Describe fragrances and their associations or memories
                      </p>
                    </div>

                    <div className="p-2 border-l-4 border-primary/50">
                      <strong>1 thing you can taste</strong>
                      <p className="text-sm text-muted-foreground">
                        Note flavors, their complexity, and your response
                      </p>
                    </div>
                  </div>
                </ResourceCard>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <ResourceCard
                  title="Mindful Reflection"
                  icon={<Bookmark size={24} />}
                  delay={0.2}
                >
                  <p>
                    Set aside time for intentional reflection on your inner
                    state and experiences without judgment.
                  </p>

                  <h3 className="text-lg font-semibold mt-4">
                    Mindful Prompts:
                  </h3>
                  <ul className="list-disc pl-6 mt-2 space-y-3">
                    <li>
                      What emotions am I experiencing right now? Where do I feel
                      them in my body?
                    </li>
                    <li>
                      What thoughts keep arising today? Can I observe them
                      without attachment?
                    </li>
                    <li>What am I resisting or avoiding in this moment?</li>
                    <li>
                      When did I feel most peaceful today? What contributed to
                      that feeling?
                    </li>
                    <li>
                      What would complete acceptance of this moment feel like?
                    </li>
                  </ul>

                  <div className="mt-5 p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm">
                      Try to write without stopping for 5-10 minutes. If you get
                      stuck, simply note what's happening: "I notice I'm feeling
                      stuck" or "My mind is wandering to my to-do list."
                    </p>
                  </div>
                </ResourceCard>
              </ScrollReveal>
            </div>
          </TabsContent>

          <TabsContent value="personal" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ScrollReveal>
                <ResourceCard
                  title="Goal Setting & Reflection"
                  icon={<Rocket size={24} />}
                  delay={0.1}
                >
                  <p>
                    Use your journal to set intentions, track progress, and
                    reflect on your personal development journey.
                  </p>

                  <h3 className="text-lg font-semibold mt-4">
                    Structured Approach:
                  </h3>
                  <div className="mt-2 space-y-4">
                    <div className="border rounded-md p-3">
                      <h4 className="font-semibold">1. Set Clear Intentions</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        What do I want to achieve? Why is this important to me?
                        What will it look like when I succeed?
                      </p>
                    </div>

                    <div className="border rounded-md p-3">
                      <h4 className="font-semibold">2. Create Action Steps</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        What specific actions will move me toward my goal? What
                        small step can I take today?
                      </p>
                    </div>

                    <div className="border rounded-md p-3">
                      <h4 className="font-semibold">3. Track Progress</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        What's working? What challenges am I facing? How am I
                        feeling about my progress?
                      </p>
                    </div>

                    <div className="border rounded-md p-3">
                      <h4 className="font-semibold">4. Reflect & Adjust</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        What have I learned? How have I grown? What adjustments
                        would help me going forward?
                      </p>
                    </div>
                  </div>
                </ResourceCard>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <ResourceCard
                  title="Self-Discovery Questions"
                  icon={<Lightbulb size={24} />}
                  delay={0.2}
                >
                  <p>
                    Deep, thought-provoking questions can lead to greater
                    self-awareness and personal insights.
                  </p>

                  <div className="mt-4 space-y-4">
                    <div className="bg-muted p-3 rounded-md">
                      <p className="font-medium">Values & Purpose</p>
                      <ul className="text-sm mt-1 space-y-1">
                        <li>• What matters most to me in life right now?</li>
                        <li>• When do I feel most alive and purposeful?</li>
                        <li>• What would I regret not doing or becoming?</li>
                      </ul>
                    </div>

                    <div className="bg-muted p-3 rounded-md">
                      <p className="font-medium">Growth & Learning</p>
                      <ul className="text-sm mt-1 space-y-1">
                        <li>
                          • What challenged me recently and what did I learn?
                        </li>
                        <li>• What limiting belief is holding me back?</li>
                        <li>
                          • What would I attempt if I knew I couldn't fail?
                        </li>
                      </ul>
                    </div>

                    <div className="bg-muted p-3 rounded-md">
                      <p className="font-medium">Relationships & Connection</p>
                      <ul className="text-sm mt-1 space-y-1">
                        <li>• Who brings out the best in me and why?</li>
                        <li>• How do I show love to myself and others?</li>
                        <li>• What relationship needs more of my attention?</li>
                      </ul>
                    </div>
                  </div>

                  <p className="mt-4 text-sm italic">
                    Choose one question that resonates with you and explore it
                    deeply rather than trying to answer many questions
                    superficially.
                  </p>
                </ResourceCard>
              </ScrollReveal>
            </div>
          </TabsContent>

          <TabsContent value="themed" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ScrollReveal>
                <ResourceCard
                  title="Specialized Journal Ideas"
                  icon={<Newspaper size={24} />}
                  delay={0.1}
                >
                  <p>
                    Themed journals can help you focus on specific aspects of
                    your life or interests.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="border rounded-lg p-3 hover:border-primary/50 transition-colors">
                      <h4 className="font-bold">Travel Journal</h4>
                      <p className="text-sm">
                        Document adventures, include tickets, maps, and local
                        phrases
                      </p>
                    </div>

                    <div className="border rounded-lg p-3 hover:border-primary/50 transition-colors">
                      <h4 className="font-bold">Reading Log</h4>
                      <p className="text-sm">
                        Track books, favorite quotes, and personal reflections
                      </p>
                    </div>

                    <div className="border rounded-lg p-3 hover:border-primary/50 transition-colors">
                      <h4 className="font-bold">Food Journal</h4>
                      <p className="text-sm">
                        Record recipes, restaurant experiences, and culinary
                        experiments
                      </p>
                    </div>

                    <div className="border rounded-lg p-3 hover:border-primary/50 transition-colors">
                      <h4 className="font-bold">Dream Journal</h4>
                      <p className="text-sm">
                        Capture dreams, recurring themes, and potential meanings
                      </p>
                    </div>

                    <div className="border rounded-lg p-3 hover:border-primary/50 transition-colors">
                      <h4 className="font-bold">Fitness Log</h4>
                      <p className="text-sm">
                        Track workouts, progress, and wellness goals
                      </p>
                    </div>

                    <div className="border rounded-lg p-3 hover:border-primary/50 transition-colors">
                      <h4 className="font-bold">Nature Journal</h4>
                      <p className="text-sm">
                        Document observations, seasonal changes, and wildlife
                        sightings
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-sm">
                      <strong>Pro tip:</strong> Consider using different
                      journals for different themes, or create clear sections
                      within one journal using tabs, color coding, or symbols.
                    </p>
                  </div>
                </ResourceCard>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <ResourceCard
                  title="Seasonal & Time-Based Journals"
                  icon={<Calendar size={24} />}
                  delay={0.2}
                >
                  <p>
                    Organize your journaling practice around specific timeframes
                    or seasons for focused reflection.
                  </p>

                  <h3 className="text-lg font-semibold mt-4">
                    Seasonal Reflections:
                  </h3>
                  <div className="mt-2 space-y-3">
                    <div className="flex items-start gap-3 border-b pb-2">
                      <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">🍂</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Autumn Reflections</h4>
                        <p className="text-sm text-muted-foreground">
                          What am I harvesting from earlier efforts? What needs
                          to be released?
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 border-b pb-2">
                      <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">❄️</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Winter Introspection</h4>
                        <p className="text-sm text-muted-foreground">
                          How am I finding rest and renewal? What's gestating
                          beneath the surface?
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 border-b pb-2">
                      <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">🌱</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Spring Beginnings</h4>
                        <p className="text-sm text-muted-foreground">
                          What new ideas are sprouting? What am I ready to
                          nurture?
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">☀️</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Summer Abundance</h4>
                        <p className="text-sm text-muted-foreground">
                          What's flourishing in my life? Where am I directing my
                          energy?
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mt-6">
                    Time-Based Journal Ideas:
                  </h3>
                  <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
                    <li>Five-year journal with one line per day</li>
                    <li>Birthday reflections on each year of your life</li>
                    <li>Monthly reviews and intention setting</li>
                    <li>New moon/full moon reflection cycles</li>
                    <li>Annual word of the year exploration</li>
                  </ul>
                </ResourceCard>
              </ScrollReveal>
            </div>
          </TabsContent>
        </Tabs>

        <div className="my-16">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">
                Getting Started: Creating a Journaling Habit
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The most important aspect of journaling is consistency. Here are
                some tips to help you establish and maintain a rewarding
                journaling practice.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-muted p-6 rounded-lg border">
                <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                    1
                  </div>
                  Set Up for Success
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
                    <span>
                      Choose a journal that feels inspiring and inviting
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
                      Find pens that flow well and are enjoyable to use
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
                      Create a dedicated journaling space that's comfortable
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
                      Gather inspiring supplies (stickers, washi tape, etc.)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-muted p-6 rounded-lg border">
                <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                    2
                  </div>
                  Establish a Routine
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
                    <span>
                      Choose a consistent time (morning, lunch break, before
                      bed)
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
                    <span>Start small: 5-10 minutes is enough to begin</span>
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
                      Link journaling to an existing habit (after coffee, before
                      yoga)
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
                      Set a timer to stay focused and create boundaries
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-muted p-6 rounded-lg border">
                <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                    3
                  </div>
                  Keep it Going
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
                    <span>
                      Keep a list of prompts for when you're feeling stuck
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
                    <span>Be compassionate when you miss a day</span>
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
                      Periodically review past entries to see patterns and
                      growth
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
                      Mix up your approach when it starts feeling stale
                    </span>
                  </li>
                </ul>
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
                    src="https://images.unsplash.com/photo-1598520106830-8c45c2035460?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Journal starter kit"
                    className="rounded-lg shadow-lg"
                  />
                </div>
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold mb-4">
                    Need a Fresh Start? Try Our Journal Starter Kit
                  </h2>
                  <p className="mb-4 text-muted-foreground">
                    Everything you need to begin your journaling practice: a
                    premium journal, two fine-tip pens, a prompt card deck, and
                    our exclusive "Getting Started" guide with 30 days of
                    prompts.
                  </p>
                  <div className="flex flex-wrap gap-3">
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
                      Premium Journal
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
                      Archival Ink Pens
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
                      52 Prompt Cards
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
                      Getting Started Guide
                    </div>
                  </div>
                  <Button className="mt-5" asChild>
                    <Link to="/products/journal-starter-kit">
                      Shop Starter Kit
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="my-12">
          <ScrollReveal>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold">
                Connect with Fellow Journal Enthusiasts
              </h2>
              <p className="text-muted-foreground">
                Join our community events to share ideas and get inspired
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Monthly journaling workshop"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">
                    Monthly Journaling Circle
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Join us on the first Tuesday of each month for prompts,
                    sharing, and community.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    View Schedule
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Online journaling course"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">
                    10-Day Journal Challenge
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Our popular guided experience to jump-start your journaling
                    practice.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Join Next Challenge
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Social media community"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">
                    #PapyrusJournals Community
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Share your journal pages and get inspired on Instagram and
                    Facebook.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Follow Us
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}
