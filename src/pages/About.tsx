import { motion } from 'motion/react'
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
import { useState } from 'react'
import { ScrollReveal } from '@/components/ScrollReveal'

const About = () => {
  const [direction, setDirection] = useState(-1)
  return (
    <div className='container py-12 mx-auto mt-20'>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-center mb-16'
      >
        <h1 className='text-4xl md:text-7xl font-bold mb-4 font-charm'>
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
            <span>Our Community</span>
          </TextLoop>
        </h1>
        <p className='text-muted-foreground max-w-2xl mx-auto text-lg'>
          Your premier destination for quality stationery and office supplies
          since 2015
        </p>
      </motion.div>

      {/* Our Story */}
      <ScrollReveal direction='up' distance={40} delay={0.2}>
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='mb-16'
        >
          <Card className='border shadow-md'>
            <CardHeader>
              <CardTitle className='text-2xl'>Our Story</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col md:flex-row gap-8 items-center'>
                <div className='md:w-1/2'>
                  <p className='mb-4 text-muted-foreground leading-relaxed'>
                    NoteNest began with a simple passion: to create a haven for
                    stationery enthusiasts and professionals alike. Founded in
                    2015, our journey started in a small corner shop with
                    carefully curated collections of notebooks, pens, and art
                    supplies.
                  </p>
                  <p className='mb-4 text-muted-foreground leading-relaxed'>
                    What sets us apart is our unwavering commitment to quality
                    and customer satisfaction. Each product in our inventory is
                    handpicked to ensure it meets our stringent standards for
                    durability, functionality, and aesthetic appeal.
                  </p>
                  <p className='text-muted-foreground leading-relaxed'>
                    Today, NoteNest has grown into a beloved destination for
                    students, professionals, artists, and anyone who appreciates
                    the tactile pleasure of premium stationery products.
                  </p>
                </div>
                <div className='md:w-1/2'>
                  <img
                    src='https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                    alt='Stationery collection'
                    className='rounded-lg shadow-lg w-full h-auto object-cover'
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </ScrollReveal>

      {/* Our Mission */}
      <ScrollReveal direction='up' distance={40} delay={0.4}>
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='mb-16'
        >
          <Card className='border shadow-md bg-primary/5'>
            <CardHeader className='text-center'>
              <CardTitle className='text-2xl'>Our Mission</CardTitle>
              <CardDescription>What drives us every day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='text-center p-4'>
                  <div className='bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='text-primary'
                    >
                      <path d='M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z'></path>
                    </svg>
                  </div>
                  <h3 className='text-xl font-semibold mb-2'>Quality</h3>
                  <p className='text-muted-foreground'>
                    We source only the finest stationery products from around
                    the world, ensuring durability and performance.
                  </p>
                </div>
                <div className='text-center p-4'>
                  <div className='bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='text-primary'
                    >
                      <path d='M7 10v12'></path>
                      <path d='M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z'></path>
                    </svg>
                  </div>
                  <h3 className='text-xl font-semibold mb-2'>Sustainability</h3>
                  <p className='text-muted-foreground'>
                    We are committed to offering eco-friendly options and
                    reducing our environmental footprint.
                  </p>
                </div>
                <div className='text-center p-4'>
                  <div className='bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='text-primary'
                    >
                      <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'></path>
                      <circle cx='9' cy='7' r='4'></circle>
                      <path d='M22 21v-2a4 4 0 0 0-3-3.87'></path>
                      <path d='M16 3.13a4 4 0 0 1 0 7.75'></path>
                    </svg>
                  </div>
                  <h3 className='text-xl font-semibold mb-2'>Community</h3>
                  <p className='text-muted-foreground'>
                    We foster creativity and connection by supporting local
                    artists and educational initiatives.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </ScrollReveal>

      {/* Team Section */}
      <ScrollReveal direction='up' distance={40} delay={0.6}>
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='mb-16'
        >
          <h2 className='text-3xl font-semibold mb-8 text-center'>
            Meet Our Team
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {[
              {
                name: 'Sarah Johnson',
                role: 'Founder & CEO',
                image: 'https://i.pravatar.cc/150?img=48',
                bio: 'Stationery enthusiast with 15 years in retail experience',
              },
              {
                name: 'David Chen',
                role: 'Creative Director',
                image: 'https://i.pravatar.cc/150?img=12',
                bio: 'Artist and designer with a passion for paper goods',
              },
              {
                name: 'Aisha Patel',
                role: 'Product Manager',
                image: 'https://i.pravatar.cc/150?img=28',
                bio: 'Former teacher who ensures educational value in our products',
              },
              {
                name: 'Michael Torres',
                role: 'Customer Experience',
                image: 'https://i.pravatar.cc/150?img=68',
                bio: 'Dedicated to creating delightful shopping experiences',
              },
            ].map((member, index) => (
              <Card key={index} className='overflow-hidden border'>
                <div className='p-6 text-center'>
                  <Avatar className='w-24 h-24 mx-auto mb-4'>
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className='text-xl font-medium'>{member.name}</h3>
                  <Badge variant='secondary' className='mt-2 mb-3'>
                    {member.role}
                  </Badge>
                  <p className='text-muted-foreground text-sm'>{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </motion.section>
      </ScrollReveal>

      {/* Testimonials */}
      <ScrollReveal direction='up' distance={40} delay={0.8}>
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className='mb-16'
        >
          <h2 className='text-3xl font-semibold mb-8 text-center'>
            What Our Customers Say
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {[
              {
                text: 'NoteNest has been my go-to for stationery needs for years. Their selection and quality are unmatched!',
                author: 'Jamie L., Graphic Designer',
              },
              {
                text: 'As a teacher, I appreciate the educational supplies that NoteNest offers. They truly understand what students need.',
                author: 'Robert M., High School Teacher',
              },
              {
                text: 'The eco-friendly options at NoteNest allow me to indulge my stationery addiction without the guilt. Love it!',
                author: 'Priya S., Environmental Consultant',
              },
            ].map((testimonial, index) => (
              <Card key={index} className='border'>
                <CardContent className='pt-6'>
                  <div className='flex mb-4'>
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <svg
                          key={i}
                          xmlns='http://www.w3.org/2000/svg'
                          width='20'
                          height='20'
                          viewBox='0 0 24 24'
                          fill='hsl(var(--primary))'
                          className='mr-1'
                        >
                          <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'></polygon>
                        </svg>
                      ))}
                  </div>
                  <p className='italic mb-4'>"{testimonial.text}"</p>
                  <p className='text-sm text-muted-foreground text-right'>
                    — {testimonial.author}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>
      </ScrollReveal>

      {/* Values Section */}
      <ScrollReveal direction='up' distance={40} delay={1}>
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className='border'>
            <CardHeader>
              <CardTitle className='text-2xl text-center'>Our Values</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div>
                  <h3 className='text-xl font-semibold mb-3 flex items-center'>
                    <span className='bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-primary'>
                      1
                    </span>
                    Customer Satisfaction
                  </h3>
                  <p className='text-muted-foreground pl-11'>
                    We go above and beyond to ensure our customers have an
                    exceptional experience with every interaction.
                  </p>
                  <Separator className='my-6' />
                  <h3 className='text-xl font-semibold mb-3 flex items-center'>
                    <span className='bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-primary'>
                      2
                    </span>
                    Innovation
                  </h3>
                  <p className='text-muted-foreground pl-11'>
                    We continuously seek out new and exciting products that
                    inspire creativity and productivity.
                  </p>
                </div>
                <div>
                  <h3 className='text-xl font-semibold mb-3 flex items-center'>
                    <span className='bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-primary'>
                      3
                    </span>
                    Integrity
                  </h3>
                  <p className='text-muted-foreground pl-11'>
                    We operate with honesty and transparency in all our business
                    practices and relationships.
                  </p>
                  <Separator className='my-6' />
                  <h3 className='text-xl font-semibold mb-3 flex items-center'>
                    <span className='bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-primary'>
                      4
                    </span>
                    Sustainability
                  </h3>
                  <p className='text-muted-foreground pl-11'>
                    We are dedicated to reducing waste and offering products
                    that are kind to our planet.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </ScrollReveal>

      {/* Join Us CTA */}
      <ScrollReveal direction='up' distance={40} delay={1.2}>
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className='mt-16 text-center'
        >
          <h2 className='text-3xl font-bold mb-4'>
            <TextScramble>Join the NoteNest Community</TextScramble>
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto mb-6'>
            Follow us on social media to stay updated on new products,
            promotions, and creative inspiration.
          </p>
          <div className='flex justify-center gap-4 text-2xl'>
            <a href='#' className='hover:text-primary transition-colors'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className=''
              >
                <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z'></path>
              </svg>
            </a>
            <a href='#' className='hover:text-primary transition-colors'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className=''
              >
                <rect width='20' height='20' x='2' y='2' rx='5' ry='5'></rect>
                <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z'></path>
                <line x1='17.5' x2='17.51' y1='6.5' y2='6.5'></line>
              </svg>
            </a>
            <a href='#' className='hover:text-primary transition-colors'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className=''
              >
                <path d='M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z'></path>
              </svg>
            </a>
            <a href='#' className='hover:text-primary transition-colors'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className=''
              >
                <path d='M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z'></path>
                <polygon points='9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02'></polygon>
              </svg>
            </a>
          </div>
        </motion.section>
      </ScrollReveal>
    </div>
  )
}

export default About
