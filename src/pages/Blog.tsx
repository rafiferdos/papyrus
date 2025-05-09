import { ScrollReveal } from "@/components/ScrollReveal";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GlowEffect } from "@/components/ui/glow-effect";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TextShimmer } from "@/components/ui/text-shimmer";
import {
  Bookmark,
  BookOpen,
  Calendar,
  ChevronRight,
  Heart,
  MessageCircle,
  Search,
  Tag,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// Static blog data
const featuredPosts = [
  {
    id: 1,
    title: "10 Creative Ways to Use Washi Tape in your Journal",
    excerpt:
      "Discover innovative ways to decorate your journals and planners with washi tape techniques.",
    category: "Journaling",
    date: "May 5, 2025",
    author: {
      name: "Sophia Chen",
      avatar: "https://i.pravatar.cc/150?img=37",
    },
    coverImage:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800",
    likes: 254,
    comments: 43,
    tags: ["Creative", "DIY", "Journaling"],
  },
  {
    id: 2,
    title: "The History of Fountain Pens: From Luxury to Everyday Writing",
    excerpt:
      "Explore the fascinating evolution of fountain pens and how they transformed from status symbols to beloved writing instruments.",
    category: "Writing Instruments",
    date: "April 28, 2025",
    author: {
      name: "Marcus Williams",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    coverImage:
      "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800",
    likes: 187,
    comments: 29,
    tags: ["History", "Fountain Pens", "Stationery"],
  },
  {
    id: 3,
    title: "Mindfulness Through Paper Crafting: Finding Peace in Creativity",
    excerpt:
      "Learn how the tactile experience of paper crafting can become a mindfulness practice for greater well-being.",
    category: "Wellness",
    date: "May 1, 2025",
    author: {
      name: "Elena Rodriguez",
      avatar: "https://i.pravatar.cc/150?img=28",
    },
    coverImage:
      "https://i0.wp.com/mindfulstoic.net/wp-content/uploads/2024/02/An-animation-of-a-woman-watering-a-garden-on-top-of-her-hear-to-represent-an-article-on-mindfulness.jpg?fit=1080%2C608&ssl=1",
    likes: 310,
    comments: 52,
    tags: ["Mindfulness", "Paper Crafting", "Wellness"],
  },
];

const recentPosts = [
  {
    id: 4,
    title: "5 Essential Notebooks for Different Writing Styles",
    excerpt:
      "Find the perfect notebook for your specific writing needs, from bullet journaling to creative writing.",
    category: "Notebooks",
    date: "May 7, 2025",
    author: {
      name: "Thomas Wright",
      avatar: "https://i.pravatar.cc/150?img=53",
    },
    coverImage:
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800",
    likes: 127,
    comments: 18,
    tags: ["Notebooks", "Writing", "Stationery"],
  },
  {
    id: 5,
    title: "The Psychology of Color in Your Workspace",
    excerpt:
      "How your stationery and workspace colors affect your mood, productivity, and creativity.",
    category: "Productivity",
    date: "May 6, 2025",
    author: {
      name: "Julia Kim",
      avatar: "https://i.pravatar.cc/150?img=44",
    },
    coverImage:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800",
    likes: 198,
    comments: 37,
    tags: ["Psychology", "Workspace", "Colors"],
  },
  {
    id: 6,
    title: "Digital vs. Analog Notes: Finding Your Perfect Balance",
    excerpt:
      "Explore the benefits of both digital and analog note-taking systems and how to integrate them effectively.",
    category: "Productivity",
    date: "May 3, 2025",
    author: {
      name: "David Chen",
      avatar: "https://i.pravatar.cc/150?img=61",
    },
    coverImage:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800",
    likes: 216,
    comments: 45,
    tags: ["Digital", "Analog", "Note-taking"],
  },
  {
    id: 7,
    title:
      "Sustainable Stationery: Eco-Friendly Choices for the Conscious Writer",
    excerpt:
      "Discover environmentally responsible stationery options that don't compromise on quality or aesthetics.",
    category: "Sustainability",
    date: "April 29, 2025",
    author: {
      name: "Olivia Green",
      avatar: "https://i.pravatar.cc/150?img=26",
    },
    coverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa3zVDVi8vJYw9--64RC2GQdY-WTBZWwzMQw&s",
    likes: 279,
    comments: 31,
    tags: ["Sustainability", "Eco-Friendly", "Stationery"],
  },
  {
    id: 8,
    title: "The Art of Letter Writing in a Digital Age",
    excerpt:
      "Why handwritten letters still matter and how to revive this meaningful form of communication.",
    category: "Writing",
    date: "April 25, 2025",
    author: {
      name: "Robert Johnson",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    coverImage: "https://www.edx.org/_next/image?url=https%3A%2F%2Fprod-discovery.edx-cdn.org%2Fmedia%2Fprograms%2Fcard_images%2F5d09c09e-f70b-4100-b4dd-0a8e36fcc194-73483eb3b0c4.jpg&w=640&q=75",
    likes: 183,
    comments: 42,
    tags: ["Letters", "Handwriting", "Communication"],
  },
];

const trendingTopics = [
  { name: "Fountain Pens", count: 42 },
  { name: "Bullet Journaling", count: 38 },
  { name: "Calligraphy", count: 35 },
  { name: "Eco-Friendly", count: 29 },
  { name: "Leather Journals", count: 24 },
  { name: "Mindfulness", count: 21 },
  { name: "Washi Tape", count: 19 },
  { name: "Productivity", count: 17 },
];

const categories = [
  { name: "Stationery", count: 86 },
  { name: "Journaling", count: 64 },
  { name: "Writing", count: 57 },
  { name: "Productivity", count: 49 },
  { name: "Art Supplies", count: 43 },
  { name: "Wellness", count: 38 },
  { name: "Sustainability", count: 31 },
  { name: "Calligraphy", count: 28 },
];

export default function Blog() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="pt-20">
      <Helmet>
        <title>
          Blog - Papyrus | Insights on Writing, Stationery & Creativity
        </title>
        <meta
          name="description"
          content="Explore articles, guides, and insights about stationery, writing, journaling, and creative expression at Papyrus."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-black">
        {/* Hero Section */}
        <div
          ref={headerRef}
          className="relative overflow-hidden bg-primary/5 dark:bg-primary/10"
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--color-primary-500)/0.15),transparent_70%)]" />
            <AnimatedBackground>
              <motion.div
                data-id="1"
                className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
              />
              <motion.div
                data-id="2"
                className="absolute left-1/3 -top-48 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"
              />
              <motion.div
                data-id="3"
                className="absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl"
              />
            </AnimatedBackground>
          </div>

          <div className="container relative z-10 px-4 py-16 md:py-24 lg:py-32 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6 inline-block">
                <TextShimmer
                  as="h1"
                  className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-purple-600 dark:from-primary dark:to-purple-400 inline-block text-transparent bg-clip-text"
                >
                  The Papyrus Journal
                </TextShimmer>
              </div>

              <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
                Stories, insights, and inspiration for those who appreciate the
                art of writing and the beauty of stationery.
              </p>

              <div className="relative max-w-xl mx-auto">
                <div className="absolute inset-0 -z-10">
                  <GlowEffect
                    colors={["#91F, #90F", "#0CF, #5F9", "#FC0, #F90"]}
                    mode="colorShift"
                    blur="soft"
                    scale={1.1}
                    duration={15}
                  />
                </div>
                <div className="relative flex rounded-lg shadow-lg overflow-hidden bg-white dark:bg-gray-900">
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    className="flex-grow border-0 focus-visible:ring-0"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button size="sm" className="m-1">
                    <Search size={18} />
                    <span className="ml-2">Search</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="container px-4 py-12 mx-auto">
          {/* Featured Posts */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div className="relative">
                <h2 className="text-3xl font-bold">Featured Articles</h2>
                <div className="h-1 w-24 bg-primary rounded-full mt-2"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <ScrollReveal key={post.id}>
                  <Link to={`/blog/${post.id}`}>
                    <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300 border-0 bg-white dark:bg-gray-900 shadow">
                      <div className="relative h-48 overflow-hidden">
                        <motion.img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5 }}
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-primary hover:bg-primary/90">
                            {post.category}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-5">
                        <div className="flex items-center text-sm text-muted-foreground mb-3">
                          <Calendar size={14} className="mr-1" />
                          <span>{post.date}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage
                                src={post.author.avatar}
                                alt={post.author.name}
                              />
                              <AvatarFallback>
                                {post.author.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">
                              {post.author.name}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-muted-foreground">
                            <div className="flex items-center">
                              <Heart size={14} className="mr-1" />
                              <span className="text-xs">{post.likes}</span>
                            </div>
                            <div className="flex items-center">
                              <MessageCircle size={14} className="mr-1" />
                              <span className="text-xs">{post.comments}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Blog posts */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <Tabs defaultValue="recent">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Latest Articles</h2>
                    <TabsList>
                      <TabsTrigger value="recent">Recent</TabsTrigger>
                      <TabsTrigger value="popular">Popular</TabsTrigger>
                      <TabsTrigger value="trending">Trending</TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="recent" className="space-y-6">
                    {recentPosts.map((post) => (
                      <ScrollReveal key={post.id}>
                        <Link to={`/blog/${post.id}`}>
                          <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 bg-white dark:bg-gray-900 border-0 shadow-sm">
                            <div className="grid md:grid-cols-3 gap-4">
                              <div className="relative h-40 md:h-full overflow-hidden">
                                <motion.img
                                  src={post.coverImage}
                                  alt={post.title}
                                  className="w-full h-full object-cover"
                                  whileHover={{ scale: 1.05 }}
                                  transition={{ duration: 0.5 }}
                                />
                                <div className="absolute top-3 left-3">
                                  <Badge
                                    variant="secondary"
                                    className="bg-black/70 text-white dark:bg-white/80 dark:text-black hover:bg-black/70 dark:hover:bg-white/80"
                                  >
                                    {post.category}
                                  </Badge>
                                </div>
                              </div>
                              <div className="md:col-span-2 p-4 md:p-6 flex flex-col justify-between">
                                <div>
                                  <h3 className="text-xl font-bold mb-2">
                                    {post.title}
                                  </h3>
                                  <p className="text-muted-foreground line-clamp-2 mb-3">
                                    {post.excerpt}
                                  </p>
                                  <div className="flex flex-wrap gap-2 mb-3">
                                    {post.tags.map((tag) => (
                                      <Badge
                                        key={tag}
                                        variant="outline"
                                        className="bg-muted/50"
                                      >
                                        #{tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                  <div className="flex items-center">
                                    <Avatar className="h-7 w-7 mr-2">
                                      <AvatarImage
                                        src={post.author.avatar}
                                        alt={post.author.name}
                                      />
                                      <AvatarFallback>
                                        {post.author.name.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <span className="text-sm font-medium block">
                                        {post.author.name}
                                      </span>
                                      <span className="text-xs text-muted-foreground">
                                        {post.date}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-3 text-muted-foreground">
                                    <div className="flex items-center">
                                      <Heart size={14} className="mr-1" />
                                      <span className="text-xs">
                                        {post.likes}
                                      </span>
                                    </div>
                                    <div className="flex items-center">
                                      <MessageCircle
                                        size={14}
                                        className="mr-1"
                                      />
                                      <span className="text-xs">
                                        {post.comments}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Card>
                        </Link>
                      </ScrollReveal>
                    ))}
                  </TabsContent>

                  <TabsContent value="popular" className="space-y-6">
                    {[...recentPosts]
                      .sort((a, b) => b.likes - a.likes)
                      .map((post) => (
                        <ScrollReveal key={post.id}>
                          <Link to={`/blog/${post.id}`}>
                            <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 bg-white dark:bg-gray-900 border-0 shadow-sm">
                              <div className="grid md:grid-cols-3 gap-4">
                                <div className="relative h-40 md:h-full overflow-hidden">
                                  <motion.img
                                    src={post.coverImage}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.5 }}
                                  />
                                  <div className="absolute top-3 left-3">
                                    <Badge
                                      variant="secondary"
                                      className="bg-black/70 text-white dark:bg-white/80 dark:text-black hover:bg-black/70 dark:hover:bg-white/80"
                                    >
                                      {post.category}
                                    </Badge>
                                  </div>
                                </div>
                                <div className="md:col-span-2 p-4 md:p-6 flex flex-col justify-between">
                                  <div>
                                    <h3 className="text-xl font-bold mb-2">
                                      {post.title}
                                    </h3>
                                    <p className="text-muted-foreground line-clamp-2 mb-3">
                                      {post.excerpt}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                      {post.tags.map((tag) => (
                                        <Badge
                                          key={tag}
                                          variant="outline"
                                          className="bg-muted/50"
                                        >
                                          #{tag}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center">
                                      <Avatar className="h-7 w-7 mr-2">
                                        <AvatarImage
                                          src={post.author.avatar}
                                          alt={post.author.name}
                                        />
                                        <AvatarFallback>
                                          {post.author.name.charAt(0)}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <span className="text-sm font-medium block">
                                          {post.author.name}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                          {post.date}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-3 text-muted-foreground">
                                      <Badge
                                        variant="outline"
                                        className="bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800"
                                      >
                                        <Heart
                                          size={14}
                                          className="mr-1 fill-red-600 dark:fill-red-400"
                                        />
                                        <span className="text-xs">
                                          {post.likes}
                                        </span>
                                      </Badge>
                                      <div className="flex items-center">
                                        <MessageCircle
                                          size={14}
                                          className="mr-1"
                                        />
                                        <span className="text-xs">
                                          {post.comments}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </Link>
                        </ScrollReveal>
                      ))}
                  </TabsContent>

                  <TabsContent value="trending" className="space-y-6">
                    {[...recentPosts]
                      .sort((a, b) => b.comments - a.comments)
                      .map((post) => (
                        <ScrollReveal key={post.id}>
                          <Link to={`/blog/${post.id}`}>
                            <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 bg-white dark:bg-gray-900 border-0 shadow-sm">
                              <div className="grid md:grid-cols-3 gap-4">
                                <div className="relative h-40 md:h-full overflow-hidden">
                                  <motion.img
                                    src={post.coverImage}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.5 }}
                                  />
                                  <div className="absolute top-3 left-3">
                                    <Badge
                                      variant="outline"
                                      className="bg-gradient-to-r from-orange-500 to-pink-500 text-white border-none"
                                    >
                                      <TrendingUp size={12} className="mr-1" />
                                      Trending
                                    </Badge>
                                  </div>
                                </div>
                                <div className="md:col-span-2 p-4 md:p-6 flex flex-col justify-between">
                                  <div>
                                    <h3 className="text-xl font-bold mb-2">
                                      {post.title}
                                    </h3>
                                    <p className="text-muted-foreground line-clamp-2 mb-3">
                                      {post.excerpt}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                      {post.tags.map((tag) => (
                                        <Badge
                                          key={tag}
                                          variant="outline"
                                          className="bg-muted/50"
                                        >
                                          #{tag}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center">
                                      <Avatar className="h-7 w-7 mr-2">
                                        <AvatarImage
                                          src={post.author.avatar}
                                          alt={post.author.name}
                                        />
                                        <AvatarFallback>
                                          {post.author.name.charAt(0)}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <span className="text-sm font-medium block">
                                          {post.author.name}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                          {post.date}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-3 text-muted-foreground">
                                      <div className="flex items-center">
                                        <Heart size={14} className="mr-1" />
                                        <span className="text-xs">
                                          {post.likes}
                                        </span>
                                      </div>
                                      <Badge
                                        variant="outline"
                                        className="bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                                      >
                                        <MessageCircle
                                          size={14}
                                          className="mr-1"
                                        />
                                        <span className="text-xs">
                                          {post.comments}
                                        </span>
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </Link>
                        </ScrollReveal>
                      ))}
                  </TabsContent>
                </Tabs>
              </div>

              <div className="flex justify-center mt-8">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex items-center gap-2"
                >
                  Load More Articles
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Newsletter */}
              <Card className="overflow-hidden border-0 shadow bg-gradient-to-br from-primary/80 to-purple-600/80 text-white">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-center">
                    {" "}
                    <div className="relative">
                      <div className="absolute inset-0">
                        <GlowEffect
                          colors={["#fff"]}
                          blur="soft"
                          scale={1.2}
                          mode="pulse"
                        />
                      </div>
                      <div className="relative p-3 rounded-full bg-white/10 backdrop-blur-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">
                    Subscribe to Our Newsletter
                  </h3>
                  <p className="text-white/80 text-center mb-4 text-sm">
                    Get the latest articles, resources, and inspiration
                    delivered to your inbox.
                  </p>
                  <div className="space-y-3">
                    <Input
                      placeholder="Your email address"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                    <Button className="w-full bg-white text-primary hover:bg-white/90 hover:text-primary">
                      Subscribe
                    </Button>
                  </div>
                  <p className="text-xs text-white/60 text-center mt-3">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </CardContent>
              </Card>

              {/* Trending Topics */}
              <Card className="border-0 shadow bg-white dark:bg-gray-900">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Trending Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {trendingTopics.map((topic) => (
                      <Badge
                        key={topic.name}
                        variant="outline"
                        className="flex items-center gap-1.5 text-sm py-1.5 px-3 hover:bg-muted cursor-pointer"
                      >
                        <Tag size={12} />
                        <span>{topic.name}</span>
                        <span className="text-xs opacity-70">
                          ({topic.count})
                        </span>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Categories */}
              <Card className="border-0 shadow bg-white dark:bg-gray-900">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div
                        key={category.name}
                        className="flex items-center justify-between py-2 hover:bg-accent rounded px-2 transition-colors cursor-pointer"
                      >
                        <span className="font-medium">{category.name}</span>
                        <Badge variant="secondary">{category.count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Featured Authors */}
              <Card className="border-0 shadow bg-white dark:bg-gray-900">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Featured Authors</h3>
                  <div className="space-y-4">
                    {[
                      ...new Set(
                        featuredPosts
                          .concat(recentPosts)
                          .map((post) => post.author.name)
                      ),
                    ]
                      .slice(0, 4)
                      .map((name, index) => {
                        const author = [...featuredPosts, ...recentPosts].find(
                          (post) => post.author.name === name
                        )?.author;
                        return (
                          <div key={name} className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={author?.avatar} />
                              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium">{name}</h4>
                              <p className="text-xs text-muted-foreground">
                                {
                                  [
                                    "Stationery Expert",
                                    "Senior Editor",
                                    "Paper Craftsman",
                                    "Writing Coach",
                                  ][index]
                                }
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Featured Post With Background */}
          <div className="my-16">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2068"
                  alt="Writing and creativity"
                  className="w-full h-full object-cover mix-blend-overlay opacity-50"
                />
              </div>
              <div className="relative z-10 grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
                <div>
                  <Badge className="mb-4 bg-white/20 hover:bg-white/30 text-white border-none">
                    Featured Post
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    The Creative's Guide to Overcoming Writer's Block
                  </h2>
                  <p className="text-white/80 mb-6">
                    Practical strategies, exercises, and mindset shifts to help
                    you break through creative barriers and rediscover your
                    writing flow.
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-10 w-10 border-2 border-white">
                      <AvatarImage src="https://i.pravatar.cc/150?img=5" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">James Davis</div>
                      <div className="text-xs text-white/70">
                        Creative Writing Coach
                      </div>
                    </div>
                  </div>
                  <Button className="bg-white text-primary hover:bg-white/90">
                    Read Article
                  </Button>
                </div>
                <div className="relative">
                  <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-xl border border-white/20"
                  >
                    <h3 className="text-xl font-bold mb-4">In This Article</h3>
                    <ul className="space-y-3">
                      {[
                        "Understanding Writer's Block",
                        "Mindfulness Techniques",
                        "Creative Exercises",
                        "Environmental Adjustments",
                        "Daily Writing Habits",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-white"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Separator className="my-4 bg-white/30" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar size={14} />
                        <span>May 8, 2025</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Heart size={14} />
                          <span className="text-sm">423</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle size={14} />
                          <span className="text-sm">87</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Topic Collections */}
          <div className="my-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Explore By Topic</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Dive into our curated collections of articles organized by
                popular topics and interests.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Journaling Guides",
                  icon: <BookOpen />,
                  color: "from-blue-500 to-teal-400",
                  count: 24,
                  image:
                    "https://images.unsplash.com/photo-1598618589929-b1433d05cdb3?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800",
                },
                {
                  title: "Productivity Tips",
                  icon: <Calendar />,
                  color: "from-orange-500 to-red-400",
                  count: 17,
                  image:
                    "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800",
                },
                {
                  title: "Stationery Reviews",
                  icon: <Tag />,
                  color: "from-violet-500 to-purple-400",
                  count: 32,
                  image:
                    "https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800",
                },
                {
                  title: "Creative Writing",
                  icon: <Bookmark />,
                  color: "from-green-500 to-emerald-400",
                  count: 19,
                  image:
                    "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800",
                },
              ].map((topic, i) => (
                <ScrollReveal key={topic.title} delay={0.1 * i}>
                  <Card className="overflow-hidden border-0 shadow-md h-full">
                    <div className="relative h-40">
                      <img
                        src={topic.image}
                        alt={topic.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                        <div>
                          <Badge
                            variant="outline"
                            className="bg-white/20 text-white border-none mb-2"
                          >
                            {topic.count} Articles
                          </Badge>
                          <h3 className="text-xl font-bold text-white">
                            {topic.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className={`p-2 rounded-full bg-gradient-to-r ${topic.color} text-white mr-3`}
                          >
                            {topic.icon}
                          </div>
                          <span className="font-medium">Browse Collection</span>
                        </div>
                        <ChevronRight
                          size={18}
                          className="text-muted-foreground"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="my-16">
            <div className="bg-muted rounded-lg overflow-hidden shadow-md">
              <div className="grid md:grid-cols-2 items-center">
                <div className="p-8 md:p-12">
                  <motion.h2
                    className="text-3xl font-bold mb-4"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    Want to Share Your Knowledge?
                  </motion.h2>
                  <motion.p
                    className="text-muted-foreground mb-6"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    Join our community of writers and share your expertise on
                    stationery, writing techniques, or creative processes. We
                    welcome guest contributions from passionate enthusiasts.
                  </motion.p>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-4"
                  >
                    {" "}
                    <Button>Become a Contributor</Button>
                    <Button variant="outline">View Guidelines</Button>
                    <Button variant="secondary" asChild>
                      <Link to="/contact">Contact Us</Link>
                    </Button>
                  </motion.div>
                </div>
                <div className="relative h-full min-h-[300px]">
                  <img
                    src="https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800"
                    alt="Writing scene"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
