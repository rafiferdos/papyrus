import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'motion/react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { TextScramble } from '@/components/ui/text-scramble'
import { TextLoop } from '@/components/ui/text-loop'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Button } from '@/components/ui/button'
import { ParallaxText } from '@/components/ui/parallaxtext'
import confetti from 'canvas-confetti'
import { cn } from '@/lib/utils'
import { useTheme } from '@/providers/theme-provider'

// Import icons (assuming you're using Lucide icons)
import { 
  Star, 
  ChevronsDown, 
  Share2, 
  Sparkles, 
  Leaf, 
  Users, 
  Heart, 
  RotateCw, 
  PenTool,
  Sun,
  Moon,
  Settings,
  X,
  Check,
} from 'lucide-react'

// Define theme types
type AccentColor = 'blue' | 'emerald' | 'purple' | 'amber' | 'rose'

const themeColorMap = {
  blue: {
    primary: 'hsl(221.2 83.2% 53.3%)',
    primaryDark: 'hsl(217.2 91.2% 59.8%)',
    gradientFrom: 'from-blue-400',
    gradientTo: 'to-blue-600',
    accentLight: 'bg-blue-50',
    accentDark: 'bg-blue-900/20',
    textColor: 'text-blue-500',
    textColorDark: 'dark:text-blue-300',
    borderColor: 'border-blue-200',
    borderColorDark: 'dark:border-blue-700/30',
  },
  emerald: {
    primary: 'hsl(142.1 70.6% 45.3%)',
    primaryDark: 'hsl(142.1 70.6% 45.3%)',
    gradientFrom: 'from-emerald-400',
    gradientTo: 'to-green-600',
    accentLight: 'bg-emerald-50',
    accentDark: 'bg-emerald-900/20',
    textColor: 'text-emerald-500',
    textColorDark: 'dark:text-emerald-300',
    borderColor: 'border-emerald-200',
    borderColorDark: 'dark:border-emerald-700/30',
  },
  purple: {
    primary: 'hsl(262.1 83.3% 57.8%)',
    primaryDark: 'hsl(263.4 70% 50.4%)',
    gradientFrom: 'from-purple-400',
    gradientTo: 'to-indigo-600',
    accentLight: 'bg-purple-50',
    accentDark: 'bg-purple-900/20',
    textColor: 'text-purple-500',
    textColorDark: 'dark:text-purple-300',
    borderColor: 'border-purple-200',
    borderColorDark: 'dark:border-purple-700/30',
  },
  amber: {
    primary: 'hsl(45.4 93.4% 47.5%)',
    primaryDark: 'hsl(48 96.5% 53.1%)',
    gradientFrom: 'from-amber-400',
    gradientTo: 'to-orange-600',
    accentLight: 'bg-amber-50',
    accentDark: 'bg-amber-900/20',
    textColor: 'text-amber-500',
    textColorDark: 'dark:text-amber-300',
    borderColor: 'border-amber-200',
    borderColorDark: 'dark:border-amber-700/30',
  },
  rose: {
    primary: 'hsl(346.8 77.2% 49.8%)',
    primaryDark: 'hsl(346.8 77.2% 49.8%)',
    gradientFrom: 'from-rose-400',
    gradientTo: 'to-pink-600',
    accentLight: 'bg-rose-50',
    accentDark: 'bg-rose-900/20',
    textColor: 'text-rose-500',
    textColorDark: 'dark:text-rose-300',
    borderColor: 'border-rose-200',
    borderColorDark: 'dark:border-rose-700/30',
  }
}

const About = () => {
  // Use the theme provider instead of local state
  const { theme, setTheme } = useTheme()
  
  // State
  const [direction, setDirection] = useState(-1)
  const [accentColor, setAccentColor] = useState<AccentColor>('blue')
  const [hasLaunched, setHasLaunched] = useState(false)
  const [showThemeSettings, setShowThemeSettings] = useState(false)
  
  // Refs for intersection observers
  const storyRef = useRef(null)
  const headingRef = useRef(null)
  const timelineRef = useRef(null)
  const isStoryInView = useInView(storyRef, { once: true, amount: 0.3 })
  const isHeadingInView = useInView(headingRef, { once: false, amount: 0.5 })
  const isTimelineInView = useInView(timelineRef, { once: true, amount: 0.3 })
  
  // Scroll animations
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  
  // Parallax effect for hero section
  const y = useTransform(scrollYProgress, [0, 1], [0, -150])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
  
  // Load accent color from localStorage on mount
  useEffect(() => {
    const savedAccent = localStorage.getItem('papyrus-accent') as AccentColor || 'blue'
    setAccentColor(savedAccent)
    
    // Apply CSS variables for accent color
    applyAccentColor(savedAccent)
  }, [])
  
  
  // Change accent color
  const changeAccentColor = (color: AccentColor) => {
    setAccentColor(color)
    localStorage.setItem('papyrus-accent', color)
    applyAccentColor(color)
  }
  
  // Apply CSS variables for accent color
  const applyAccentColor = (color: AccentColor) => {
    document.documentElement.style.setProperty('--primary', themeColorMap[color].primary)
    document.documentElement.style.setProperty('--primary-dark', themeColorMap[color].primaryDark)
  }
  
  // Confetti effect
  const launchConfetti = () => {
    if (!hasLaunched) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: [themeColorMap[accentColor].primary, '#ffffff', '#000000'],
      })
      setHasLaunched(true)
      setTimeout(() => setHasLaunched(false), 3000)
    }
  }

  // Timeline data
  const timelineEvents = [
    { year: 2015, title: 'Humble Beginnings', description: 'Papyrus founded as a small corner shop in downtown.', icon: PenTool },
    { year: 2017, title: 'First Expansion', description: 'Opened our second location and launched online store.', icon: RotateCw },
    { year: 2019, title: 'Sustainable Initiative', description: 'Introduced our line of eco-friendly stationery products.', icon: Leaf },
    { year: 2021, title: 'Community Building', description: 'Started the Creative Hub for local artists and workshops.', icon: Users },
    { year: 2023, title: 'Global Recognition', description: 'Featured in "Best Stationery Shops" by Design Magazine.', icon: Star },
  ]

  // Team members with enhanced data
  const teamMembers = [
    {
      name: 'Emmah Johnson',
      role: 'Founder & CEO',
      image: 'https://i.pravatar.cc/300?img=48',
      bio: 'Stationery enthusiast with 15 years in retail experience',
      quote: 'Great stationery sparks creativity and productivity.',
      socialLinks: ['twitter', 'linkedin']
    },
    {
      name: 'David Chen',
      role: 'Creative Director',
      image: 'https://i.pravatar.cc/300?img=12',
      bio: 'Artist and designer with a passion for paper goods',
      quote: 'Design is about solving problems beautifully.',
      socialLinks: ['instagram', 'behance']
    },
    {
      name: 'Aisha Patel',
      role: 'Product Manager',
      image: 'https://i.pravatar.cc/300?img=28',
      bio: 'Former teacher who ensures educational value in our products',
      quote: 'The right tools can transform the learning experience.',
      socialLinks: ['linkedin', 'twitter']
    },
    {
      name: 'Michael Torres',
      role: 'Customer Experience',
      image: 'https://i.pravatar.cc/300?img=68',
      bio: 'Dedicated to creating delightful shopping experiences',
      quote: 'Every customer interaction is an opportunity to delight.',
      socialLinks: ['facebook', 'instagram']
    },
  ]

  return (
    <div className={`${theme === 'dark' ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-500`}>
      {/* Progress bar */}
      <motion.div 
        className={`fixed top-0 left-0 right-0 h-1 z-50 ${themeColorMap[accentColor].textColor}`}
        style={{ scaleX, background: `var(--primary)` }}
      />

      <div className='container py-12 mx-auto mt-20 relative'>
        {/* Theme settings - floating */}
        <div className="fixed top-24 right-4 md:right-8 z-40 flex flex-col gap-2">
          <Button 
            onClick={() => setShowThemeSettings(!showThemeSettings)} 
            variant="outline"
            size="icon"
            className="rounded-full w-12 h-12 shadow-lg hover:shadow-xl transition-shadow"
          >
            <Settings className={cn("h-5 w-5", showThemeSettings && "text-primary")} />
          </Button>
          
          <AnimatePresence>
            {showThemeSettings && (
              <motion.div 
                className={`absolute top-0 right-14 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-4 w-64`}
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: 20 }}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Appearance</h3>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => setShowThemeSettings(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Theme</p>
                  <div className="flex gap-2">
                    <Button 
                      variant={theme === 'light' ? 'default' : 'outline'} 
                      size="sm" 
                      className="flex items-center gap-2 w-full"
                      onClick={() => setTheme('light')}
                    >
                      <Sun className="h-4 w-4" />
                      Light
                      {theme === 'light' && <Check className="h-3 w-3 ml-auto" />}
                    </Button>
                    <Button 
                      variant={theme === 'dark' ? 'default' : 'outline'} 
                      size="sm" 
                      className="flex items-center gap-2 w-full"
                      onClick={() => setTheme('dark')}
                    >
                      <Moon className="h-4 w-4" />
                      Dark
                      {theme === 'dark' && <Check className="h-3 w-3 ml-auto" />}
                    </Button>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Accent Color</p>
                  <div className="grid grid-cols-5 gap-2">
                    {['blue', 'emerald', 'purple', 'amber', 'rose'].map((color) => (
                      <Button 
                        key={color} 
                        variant="outline" 
                        size="icon" 
                        className={cn(
                          "rounded-full h-8 w-8 p-0 bg-gradient-to-br",
                          themeColorMap[color as AccentColor].gradientFrom,
                          themeColorMap[color as AccentColor].gradientTo,
                          accentColor === color && "ring-2 ring-offset-2 ring-offset-background"
                        )}
                        style={{
                          color: '#fff',
                          boxShadow: accentColor === color ? `0 0 0 2px var(--primary)` : 'none',
                        }}
                        onClick={() => changeAccentColor(color as AccentColor)}
                      >
                        {accentColor === color && <Check className="h-4 w-4 text-white" />}
                      </Button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Hero Section */}
        <motion.div
          style={{ y, opacity }}
          className='relative text-center mb-32 py-16'
        >
          <motion.div
            animate={{ 
              opacity: [0, 1],
              scale: [0.9, 1]
            }}
            transition={{ duration: 1 }}
            className={`absolute inset-0 -z-10 bg-gradient-to-b ${themeColorMap[accentColor].gradientFrom}/10 to-transparent rounded-3xl`}
          />
          
          <motion.div 
            className="absolute inset-0 -z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <div className="grid grid-cols-5 h-full">
              {[...Array(10)].map((_, i) => (
                <div key={i} className={`border-r ${themeColorMap[accentColor].textColor}/5 h-full`}></div>
              ))}
            </div>
            <div className="grid grid-rows-5 w-full absolute top-0">
              {[...Array(10)].map((_, i) => (
                <div key={i} className={`border-b ${themeColorMap[accentColor].textColor}/5 w-full`}></div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <Badge 
              variant="outline" 
              className="mb-4 px-4 py-2 text-sm backdrop-blur-sm bg-background/50 border-primary/20"
              style={{ borderColor: `var(--primary)` }}
            >
              Est. 2015 • Crafting Creativity
            </Badge>
          </motion.div>

          <motion.h1 
            className='text-4xl md:text-8xl font-bold mb-6 font-charm relative inline-block'
            ref={headingRef}
          >
            <span className="inline-block">
              <TextLoop
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 19,
                  mass: 1.2,
                }}
                interval={2.5}
                onIndexChange={(index) => {
                  setDirection(index === 0 ? -1 : 1)
                }}
                variants={{
                  initial: {
                    y: -direction * 20,
                    rotateX: -direction * 90,
                    opacity: 0,
                    filter: 'blur(4px)',
                  },
                  animate: {
                    y: 0,
                    rotateX: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                  },
                  exit: {
                    y: -direction * 20,
                    rotateX: -direction * 90,
                    opacity: 0,
                    filter: 'blur(4px)',
                  },
                }}
              >
                <span>Our Story</span>
                <span>Our Mission</span>
                <span>Our Values</span>
                <span>Our Team</span>
                <span>Our Legacy</span>
              </TextLoop>
            </span>
            {isHeadingInView && (
              <motion.div 
                className="absolute -right-6 -top-6 text-primary"
                animate={{ 
                  rotate: [0, 15, 0, 15, 0],
                  scale: [1, 1.2, 1, 1.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                style={{ color: `var(--primary)` }}
              >
                <Sparkles size={30} />
              </motion.div>
            )}
          </motion.h1>

          <motion.p 
            className='text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl leading-relaxed'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Your premier destination for quality stationery and office supplies since 2015,
            where creativity meets functionality and elegance.
          </motion.p>

          <motion.div 
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <a href="#story" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors" style={{ color: `var(--primary)` }}>
              <span>Explore our journey</span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ChevronsDown size={20} />
              </motion.div>
            </a>
          </motion.div>
        </motion.div>

        {/* Decorative text strip */}
        <div className="relative py-8 my-16 overflow-hidden">
          <ParallaxText baseVelocity={-2}>
            Quality • Creativity • Community • Sustainability • Innovation
          </ParallaxText>
        </div>

        {/* Our Story */}
        <div id="story" ref={storyRef} className="scroll-mt-24">
          <ScrollReveal direction='up' distance={40} delay={0.2}>
            <motion.section
              className='mb-24'
            >
              <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-xl rounded-xl overflow-hidden border-0`}>
                <CardHeader className="relative pb-0">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent -z-10"
                    initial={{ x: '-100%' }}
                    animate={{ x: isStoryInView ? '0%' : '-100%' }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    style={{ background: `linear-gradient(to right, var(--primary, ${themeColorMap[accentColor].primary})20 0%, transparent 100%)` }}
                  />
                  <CardTitle className={`text-3xl md:text-4xl font-bold pl-4 border-l-4`} style={{ borderColor: `var(--primary)` }}>
                    The Papyrus Journey
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 pb-8">
                  <div className='flex flex-col md:flex-row gap-12 items-center'>
                    <div className='md:w-1/2'>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.3 }}
                      >
                        <p className='mb-6 text-muted-foreground leading-relaxed text-lg'>
                          <span className="text-2xl font-serif" style={{ color: `var(--primary)` }}>P</span>
                          apyrus began with a simple passion: to create a haven for
                          stationery enthusiasts and professionals alike. Founded in
                          2015, our journey started in a small corner shop with
                          carefully curated collections of notebooks, pens, and art
                          supplies.
                        </p>
                        <motion.blockquote 
                          className={`border-l-4 pl-4 italic my-8`}
                          style={{ borderColor: `var(--primary)70` }}
                          initial={{ opacity: 0 }}
                          animate={isStoryInView ? { opacity: 1 } : {}}
                          transition={{ duration: 0.7, delay: 0.8 }}
                        >
                          "We dreamed of creating a space where creativity could flourish, where the right tools would inspire greatness in everyone."
                          <footer className="text-right text-sm mt-2">— Emmah Johnson, Founder</footer>
                        </motion.blockquote>
                        <p className='mb-6 text-muted-foreground leading-relaxed'>
                          What sets us apart is our unwavering commitment to quality
                          and customer satisfaction. Each product in our inventory is
                          handpicked to ensure it meets our stringent standards for
                          durability, functionality, and aesthetic appeal.
                        </p>
                        <p className='text-muted-foreground leading-relaxed'>
                          Today, Papyrus has grown into a beloved destination for
                          students, professionals, artists, and anyone who appreciates
                          the tactile pleasure of premium stationery products.
                        </p>
                        
                        <Button 
                          className="mt-6 group"
                          variant="outline"
                          onClick={launchConfetti}
                          disabled={hasLaunched}
                        >
                          <span>Celebrate with us</span>
                          <motion.span 
                            className="ml-2 inline-block" 
                            animate={hasLaunched ? { rotate: 360, scale: [1, 1.5, 1] } : {}}
                            transition={{ duration: 0.5 }}
                          >
                            🎉
                          </motion.span>
                        </Button>
                      </motion.div>
                    </div>
                    <div className='md:w-1/2'>
                      <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.5 }}
                      >
                        <div className="absolute -top-4 -left-4 w-24 h-24 -z-10" style={{ background: `var(--primary)10` }} />
                        <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full -z-10" style={{ background: `var(--primary)10` }} />
                        <img
                          src='https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80'
                          alt='Stationery collection'
                          className='rounded-xl shadow-2xl w-full h-auto object-cover aspect-[4/3]'
                        />
                        
                        <motion.div 
                          className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm p-3 rounded-lg shadow-lg"
                          style={{ borderColor: `var(--primary)20` }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.5, delay: 1.2 }}
                        >
                          <div className="flex items-center gap-2">
                            <Heart className="text-rose-500" size={18} />
                            <span className="text-sm font-medium">From a small shop to a beloved brand</span>
                          </div>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.section>
          </ScrollReveal>
        </div>

        {/* Timeline Section */}
        <div ref={timelineRef} className="my-24">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-2" style={{ borderColor: `var(--primary)40` }}>Our Journey</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">The Papyrus Timeline</h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div 
              className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 z-0"
              style={{ background: `var(--primary)20` }}
            ></div>

            {/* Timeline events */}
            {timelineEvents.map((event, index) => (
              <motion.div 
                key={index}
                className={`relative z-10 flex items-center mb-16 ${index % 2 === 0 ? 'justify-start md:justify-end' : 'justify-start'} md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:self-end md:ml-auto' : 'md:pl-12'}`}
                initial={{ opacity: 0, y: 50 }}
                animate={isTimelineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                {/* Content */}
                <div 
                  className={`relative p-6 rounded-xl shadow-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-l-4 max-w-md`}
                  style={{ borderColor: `var(--primary)` }}
                >
                  <div 
                    className="absolute w-12 h-12 rounded-full flex items-center justify-center -left-6 top-6 transform -translate-x-1/2 border-4 border-background"
                    style={{ background: `var(--primary)10` }}
                  >
                    <event.icon style={{ color: `var(--primary)` }} size={20} />
                  </div>
                  <div className="ml-2">
                    <span 
                      className="inline-block px-3 py-1 mb-2 text-xs font-semibold rounded-full text-primary"
                      style={{ 
                        background: `var(--primary)10`, 
                        color: `var(--primary)` 
                      }}
                    >
                      {event.year}
                    </span>
                    <h3 className="text-xl font-bold mb-1">{event.title}</h3>
                    <p className="text-muted-foreground">{event.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Our Mission with 3D cards */}
        <ScrollReveal direction='up' distance={40} delay={0.4}>
          <motion.section
            className='mb-24'
          >
            <Card className={`${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50'} backdrop-blur-sm shadow-lg rounded-xl border relative overflow-hidden`}>
              <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-grid-pattern-light dark:bg-grid-pattern-dark opacity-[0.15]" />
              </div>
              
              <CardHeader className="text-center">
                <CardTitle className='text-3xl md:text-4xl font-bold'>Our Mission</CardTitle>
                <CardDescription className="text-lg">What drives us every day</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                  {[
                    {
                      title: 'Quality',
                      description: 'We source only the finest stationery products from around the world, ensuring durability and performance.',
                      icon: Star,
                      color: 'bg-amber-500',
                      delay: 0.2
                    },
                    {
                      title: 'Sustainability',
                      description: 'We are committed to offering eco-friendly options and reducing our environmental footprint with every decision.',
                      icon: Leaf,
                      color: 'bg-emerald-500',
                      delay: 0.4
                    },
                    {
                      title: 'Community',
                      description: 'We foster creativity and connection by supporting local artists and educational initiatives throughout the year.',
                      icon: Users,
                      color: 'bg-blue-500',
                      delay: 0.6
                    }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="perspective-1000"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: item.delay }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <motion.div 
                        className={`text-center p-6 rounded-xl h-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg border`}
                        style={{ borderColor: `var(--primary)10` }}
                        whileHover={{ 
                          rotateX: 5,
                          rotateY: 10,
                          scale: 1.05,
                          transition: { duration: 0.3 }
                        }}
                      >
                        <div 
                          className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg`}
                          style={{ background: `var(--primary)` }}
                        >
                          <item.icon className="text-white" size={28} />
                        </div>
                        <h3 className='text-2xl font-bold mb-3'>{item.title}</h3>
                        <p className='text-muted-foreground leading-relaxed'>
                          {item.description}
                        </p>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-12 text-center">
                  <Badge variant="outline" className="mb-4" style={{ borderColor: `var(--primary)40` }}>
                    Our Goal
                  </Badge>
                  <blockquote className="text-xl md:text-2xl italic max-w-3xl mx-auto">
                    "To inspire creativity and productivity by providing exceptional stationery products that bring joy to everyday tasks."
                  </blockquote>
                </div>
              </CardContent>
            </Card>
          </motion.section>
        </ScrollReveal>

        {/* Team Section - Completely Reimagined */}
        <ScrollReveal direction='up' distance={40} delay={0.6}>
          <motion.section
            className='mb-24'
          >
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-3" style={{ borderColor: `var(--primary)40` }}>
                The People Behind Papyrus
              </Badge>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>Meet Our Passionate Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our dedicated professionals bring diverse talents and a shared passion for quality stationery
              </p>
            </div>
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                >
                  <Card className={`overflow-hidden border-0 shadow-lg h-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="relative">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full aspect-square object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <div className="p-4 w-full">
                          <Badge className="mb-2" variant="secondary">{member.role}</Badge>
                          <h3 className='text-xl font-bold text-white'>{member.name}</h3>
                        </div>
                      </div>
                    </div>
                    <div className='p-6'>
                      <blockquote 
                        className="italic text-sm mb-4 border-l-2 pl-3" 
                        style={{ borderColor: `var(--primary)50` }}
                      >
                        "{member.quote}"
                      </blockquote>
                      <p className='text-muted-foreground text-sm'>{member.bio}</p>
                      
                      <div className="mt-4 flex justify-end gap-2">
                        {member.socialLinks.map((idx) => (
                          <Button 
                            key={idx} 
                            variant="ghost" 
                            size="sm" 
                            className="rounded-full w-8 h-8 p-0 hover:text-primary hover:bg-primary/10"
                            style={{ '--hover-color': `var(--primary)` } as React.CSSProperties}
                          >
                            <Share2 size={16} />
                          </Button>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </ScrollReveal>

        {/* Testimonials - Reimagined */}
        <ScrollReveal direction='up' distance={40} delay={0.8}>
          <motion.section
            className='mb-24'
          >
            <div className="mb-12 text-center">
              <Badge variant="outline" className="mb-3" style={{ borderColor: `var(--primary)40` }}>Testimonials</Badge>
              <h2 className='text-3xl md:text-4xl font-bold relative inline-block'>
                What Our Customers Say
                <div 
                  className="absolute -bottom-2 left-0 w-full h-1" 
                  style={{ background: `var(--primary)30` }}
                ></div>
              </h2>
            </div>
            
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {[
                {
                  text: 'Papyrus has been my go-to for stationery needs for years. Their selection and quality are unmatched!',
                  author: 'Jamie L.',
                  role: 'Graphic Designer',
                  image: 'https://i.pravatar.cc/150?img=32',
                  delay: 0.2
                },
                {
                  text: 'As a teacher, I appreciate the educational supplies that Papyrus offers. They truly understand what students need.',
                  author: 'Robert M.',
                  role: 'High School Teacher',
                  image: 'https://i.pravatar.cc/150?img=58',
                  delay: 0.4
                },
                {
                  text: 'The eco-friendly options at Papyrus allow me to indulge my stationery addiction without the guilt. Love it!',
                  author: 'Priya S.',
                  role: 'Environmental Consultant',
                  image: 'https://i.pravatar.cc/150?img=45',
                  delay: 0.6
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: testimonial.delay }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <Card className={`border ${theme === 'dark' ? 'bg-gray-800/70 hover:bg-gray-800' : 'bg-white hover:bg-gray-50'} h-full transition-colors duration-300 overflow-hidden`}>
                    <CardContent className='p-8 relative'>
                      {/* Quote mark */}
                      <div 
                        className="absolute top-3 left-4 text-6xl font-serif"
                        style={{ color: `var(--primary)10` }}
                      >❝</div>
                      
                      <div className="relative z-10">
                        <div className='flex mb-6'>
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <Star
                                key={i}
                                size={18}
                                fill="currentColor"
                                className='mr-1 text-amber-500'
                              />
                            ))}
                        </div>
                        
                        <p className='italic mb-6 leading-relaxed'>"{testimonial.text}"</p>
                        
                        <div className="flex items-center gap-4">
                          <Avatar className="w-12 h-12 border-2" style={{ borderColor: `var(--primary)20` }}>
                            <AvatarImage src={testimonial.image} alt={testimonial.author} />
                            <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{testimonial.author}</p>
                            <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </ScrollReveal>

        {/* Values Section - Reimagined */}
        <ScrollReveal direction='up' distance={40} delay={1}>
          <motion.section>
            <Card className={`border-0 shadow-xl ${theme === 'dark' ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm`}>
              <CardHeader className="text-center pb-2">
                <Badge 
                  variant="outline" 
                  className="mb-2 mx-auto"
                  style={{ borderColor: `var(--primary)40` }}
                >
                  Our Principles
                </Badge>
                <CardTitle className='text-3xl md:text-4xl font-bold'>Core Values</CardTitle>
              </CardHeader>
              <CardContent className="px-6 py-8">
                <motion.div 
                  className='grid grid-cols-1 md:grid-cols-2 gap-12'
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true, amount: 0.3 }}
                      className="group"
                    >
                      <h3 className='text-xl font-semibold mb-3 flex items-center'>
                        <motion.span 
                          className="w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-colors"
                          style={{ 
                            background: `var(--primary)10`,
                            color: `var(--primary)`,
                          }}
                          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          1
                        </motion.span>
                        <span className="group-hover:text-primary transition-colors" style={{ '--hover-color': `var(--primary)` } as React.CSSProperties}>
                          Customer Satisfaction
                        </span>
                      </h3>
                      <p className='text-muted-foreground pl-14 leading-relaxed'>
                        We go above and beyond to ensure our customers have an
                        exceptional experience with every interaction, meeting their needs with personalized service.
                      </p>
                      <Separator className='my-8' />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      viewport={{ once: true, amount: 0.3 }}
                      className="group"
                    >
                      <h3 className='text-xl font-semibold mb-3 flex items-center'>
                        <motion.span 
                          className="w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-colors"
                          style={{ 
                            background: `var(--primary)10`,
                            color: `var(--primary)`,
                          }}
                          whileHover={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.5 }}
                        >
                          2
                        </motion.span>
                        <span className="group-hover:text-primary transition-colors" style={{ '--hover-color': `var(--primary)` } as React.CSSProperties}>
                          Innovation
                        </span>
                      </h3>
                      <p className='text-muted-foreground pl-14 leading-relaxed'>
                        We continuously seek out new and exciting products that
                        inspire creativity and productivity, staying at the forefront of stationery trends.
                      </p>
                    </motion.div>
                  </div>
                  
                  <div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      viewport={{ once: true, amount: 0.3 }}
                      className="group"
                    >
                      <h3 className='text-xl font-semibold mb-3 flex items-center'>
                        <motion.span 
                          className="w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-colors"
                          style={{ 
                            background: `var(--primary)10`,
                            color: `var(--primary)`,
                          }}
                          whileHover={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          3
                        </motion.span>
                        <span className="group-hover:text-primary transition-colors" style={{ '--hover-color': `var(--primary)` } as React.CSSProperties}>
                          Integrity
                        </span>
                      </h3>
                      <p className='text-muted-foreground pl-14 leading-relaxed'>
                        We operate with honesty and transparency in all our business
                        practices and relationships, earning trust through consistent ethical behavior.
                      </p>
                      <Separator className='my-8' />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      viewport={{ once: true, amount: 0.3 }}
                      className="group"
                    >
                      <h3 className='text-xl font-semibold mb-3 flex items-center'>
                        <motion.span 
                          className="w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-colors"
                          style={{ 
                            background: `var(--primary)10`,
                            color: `var(--primary)`,
                          }}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.7 }}
                        >
                          4
                        </motion.span>
                        <span className="group-hover:text-primary transition-colors" style={{ '--hover-color': `var(--primary)` } as React.CSSProperties}>
                          Sustainability
                        </span>
                      </h3>
                      <p className='text-muted-foreground pl-14 leading-relaxed'>
                        We are dedicated to reducing waste and offering products
                        that are kind to our planet, making environmentally responsible choices at every step.
                      </p>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div 
                  className="mt-16 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <Button variant="default" size="lg" className="group">
                    <span>Learn more about our approach</span>
                    <motion.span 
                      className="ml-2"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >→</motion.span>
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.section>
        </ScrollReveal>

        {/* Join Us CTA - Reimagined */}
        <ScrollReveal direction='up' distance={40} delay={1.2}>
          <motion.section
            className='mt-24 text-center py-16 px-8 relative rounded-2xl overflow-hidden'
          >
            {/* Background elements */}
            <motion.div 
              className="absolute inset-0 -z-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div 
                className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-br to-gray-900' : 'bg-gradient-to-br to-background'}`}
                style={{ 
                  backgroundImage: `linear-gradient(to bottom right, var(--primary)20, ${theme === 'dark' ? '#111827' : '#ffffff'})`
                }}
              ></div>
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className='text-3xl md:text-5xl font-bold mb-4 inline-block relative'>
                <TextScramble>Join the Papyrus Community</TextScramble>
                <motion.div
                  className="absolute -right-8 -top-8"
                  animate={{ 
                    rotate: [0, 15, 0, 15, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  <span className="text-4xl">✨</span>
                </motion.div>
              </h2>
            </motion.div>

            <motion.p 
              className='text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              Follow us on social media to stay updated on new products,
              promotions, and creative inspiration.
            </motion.p>
            
            <motion.div 
              className='flex flex-wrap justify-center gap-6'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {[
                { name: 'Facebook', icon: 'facebook' },
                { name: 'Instagram', icon: 'instagram' },
                { name: 'Twitter', icon: 'twitter' },
                { name: 'YouTube', icon: 'youtube' }
              ].map((platform, index) => (
                <motion.a 
                  key={index} 
                  href='#' 
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} shadow-lg transition-colors`}
                >
                  <span className="text-lg font-medium">{platform.name}</span>
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              className="mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <form className="max-w-md mx-auto">
                <h3 className="text-xl font-semibold mb-4">Subscribe to our newsletter</h3>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className={`flex-1 px-4 py-3 rounded-l-lg outline-none ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} border focus:border-primary`}
                    style={{ borderColor: `var(--primary)20` }}
                  />
                  <Button 
                    className="rounded-r-lg" 
                    style={{ background: `var(--primary)` }}
                  >
                    Subscribe
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.section>
        </ScrollReveal>
      </div>
      
      {/* Custom CSS for grid patterns */}
      <style>{`
        :root {
          --primary: ${themeColorMap[accentColor].primary};
          --primary-dark: ${themeColorMap[accentColor].primaryDark};
        }

        .dark {
          --primary: ${themeColorMap[accentColor].primaryDark};
        }

        .bg-grid-pattern-light {
          background-image: linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .bg-grid-pattern-dark {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .bg-grid-pattern {
          background-image: linear-gradient(to right, var(--primary) 1px, transparent 1px),
                            linear-gradient(to bottom, var(--primary) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        /* Override default button colors */
        .button[data-variant="default"] {
          background-color: var(--primary);
          color: white;
        }
        
        .button[data-variant="default"]:hover {
          background-color: var(--primary-hover);
        }
        
        .group:hover .group-hover\\:text-primary {
          color: var(--primary);
        }
        
        .hover\\:text-primary:hover {
          color: var(--primary);
        }
        
        .hover\\:bg-primary\\/10:hover {
          background-color: color-mix(in srgb, var(--primary) 10%, transparent);
        }
        
        .text-primary {
          color: var(--primary);
        }
        
        .border-primary {
          border-color: var(--primary);
        }
        
        .bg-primary {
          background-color: var(--primary);
        }
      `}</style>
    </div>
  )
}

export default About