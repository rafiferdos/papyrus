
import Banner from '@/components/Home/Banner'
import FeaturedProducts from '@/components/Home/FeaturedProducts'
import NewsletterSignup from '@/components/Home/NewsletterSignup'
import Testimonials from '@/components/Home/Testimonials'
import { ScrollReveal } from '@/components/ScrollReveal'
import { motion } from 'motion/react'

const Home = () => {
  return (
    <div className='lg:space-y-16 space-y-8'>
      {/* Banner section - appears immediately */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Banner />
      </motion.section>
      {/* Featured Products - appears on scroll */}
      <ScrollReveal direction='up' distance={40}>
        <FeaturedProducts />
      </ScrollReveal>
      {/* Testimonials - appears on scroll */}
      <ScrollReveal direction='up' distance={40} delay={0.2}>
        <Testimonials />
      </ScrollReveal>
      {/* NewsletterSignup - appears on scroll */}
      <NewsletterSignup></NewsletterSignup>
    </div>
  )
}

export default Home
