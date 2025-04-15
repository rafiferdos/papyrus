import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import avatar1 from '../../assets/avatar1-test.png'
import avatar2 from '../../assets/avatar2-test.png'
import avatar3 from '../../assets/avatar3-test.png'

export default function Testimonials() {
  return (
    <section className='w-full py-7 md:py-12 lg:py-16 flex items-center justify-center'>
      <div className='container grid max-w-5xl items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10'>
        <div className='space-y-3'>
          <h2 className='text-3xl font-thin tracking-tighter sm:text-4xl md:text-5xl'>
            What Our{' '}
            <span className='font-charm font-bold text-4xl sm:text-5xl md:text-6xl'>
              Customers
            </span>{' '}
            Say
          </h2>
          <p className='mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
            Hear from our satisfied customers about their experience with our
            products and services.
          </p>
        </div>
        <div className='grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          <div className='flex flex-col items-start gap-4 rounded-lg bg-background p-6 shadow-sm transition-all hover:shadow-md'>
            <div className='flex items-center gap-4'>
              <Avatar className='h-12 w-12 border'>
                <AvatarImage src={avatar1} alt='@shadcn' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className='grid gap-0.5'>
                <h4 className='text-lg font-semibold'>Sarah Johnson</h4>
                <p className='text-sm text-muted-foreground'>CEO, Acme Inc</p>
              </div>
            </div>
            <blockquote className='text-sm leading-relaxed text-muted-foreground'>
              &ldquo;The customer service I received was exceptional. The
              support team went above and beyond to address my concerns.&rdquo;
            </blockquote>
          </div>
          <div className='flex flex-col items-start gap-4 rounded-lg bg-background p-6 shadow-sm transition-all hover:shadow-md'>
            <div className='flex items-center gap-4'>
              <Avatar className='h-12 w-12 border'>
                <AvatarImage src={avatar2} alt='@shadcn' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className='grid gap-0.5'>
                <h4 className='text-lg font-semibold'>Alex Smith</h4>
                <p className='text-sm text-muted-foreground'>CTO, Globex Inc</p>
              </div>
            </div>
            <blockquote className='text-sm leading-relaxed text-muted-foreground'>
              &ldquo;The platform has been a game-changer for our business. The
              features and scalability have helped us grow exponentially.&rdquo;
            </blockquote>
          </div>
          <div className='flex flex-col items-start gap-4 rounded-lg bg-background p-6 shadow-sm transition-all hover:shadow-md'>
            <div className='flex items-center gap-4'>
              <Avatar className='h-12 w-12 border'>
                <AvatarImage src={avatar3} alt='@shadcn' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className='grid gap-0.5'>
                <h4 className='text-lg font-semibold'>Emily Parker</h4>
                <p className='text-sm text-muted-foreground'>
                  Head, Stark Industries
                </p>
              </div>
            </div>
            <blockquote className='text-sm leading-relaxed text-muted-foreground'>
              &ldquo;The platform's security and compliance features have given
              us peace of mind, allowing us to focus on building our
              product.&rdquo;
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
