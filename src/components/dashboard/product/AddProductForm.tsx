/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useAddProductMutation } from '@/redux/features/products/productApi'
import { toast } from 'sonner'
import { productFormValidationSchema } from './productFormValidation'
import { motion } from 'motion/react'
import { useState } from 'react'

const AddProductForm = () => {
  const [createProduct] = useAddProductMutation()
  const [activeSection, setActiveSection] = useState('basic') // basic, details, availability

  // form validation
  const form = useForm({
    resolver: zodResolver(productFormValidationSchema),
  })

  // Destructure form value
  const {
    formState: { isSubmitting },
  } = form

  // submit handler function
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const newData = {
        name: data.name,
        image: data.image,
        brand: data.brand,
        price: parseInt(data.price),
        category: data.category,
        description: data.description,
        quantity: parseInt(data.quantity),
        inStock: Boolean(data.inStock),
      }

      const res = await createProduct(newData)

      if (res?.data?.success == true) {
        toast.success(res?.data?.message)
        form.reset()
        setActiveSection('basic')
      } else {
        toast.error(res?.data?.message)
      }
    } catch (error: any) {
      console.error(error)
      toast.error('Failed to add product')
    }
  }

  const formSections = {
    basic: (
      <>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-medium'>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter product name'
                  {...field}
                  value={field.value || ''}
                  className='transition-all duration-300 focus:border-indigo-500'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-medium'>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter product description'
                  {...field}
                  value={field.value || ''}
                  className='transition-all duration-300 focus:border-indigo-500'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='image'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-medium'>Image URL</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter image URL'
                  {...field}
                  value={field.value || ''}
                  className='transition-all duration-300 focus:border-indigo-500'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </>
    ),

    details: (
      <>
        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-medium'>Price</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter price'
                  type='number'
                  {...field}
                  value={field.value || ''}
                  className='transition-all duration-300 focus:border-indigo-500'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='quantity'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-medium'>Quantity</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter quantity'
                  type='number'
                  {...field}
                  value={field.value || ''}
                  className='transition-all duration-300 focus:border-indigo-500'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='brand'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-medium'>Brand</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter brand name'
                  {...field}
                  value={field.value || ''}
                  className='transition-all duration-300 focus:border-indigo-500'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </>
    ),

    availability: (
      <>
        <FormField
          control={form.control}
          name='inStock'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-medium'>
                Availability
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className='flex flex-wrap gap-4'
                >
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='true' id='instock' />
                    <label htmlFor='instock' className='text-sm cursor-pointer'>
                      In Stock
                    </label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='false' id='outofstock' />
                    <label
                      htmlFor='outofstock'
                      className='text-sm cursor-pointer'
                    >
                      Out of Stock
                    </label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='category'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-medium'>Category</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className='grid grid-cols-1 sm:grid-cols-2 gap-3'
                >
                  {[
                    'Writing Instruments',
                    'Paper Products',
                    'Art Supplies',
                    'Educational',
                  ].map((category) => (
                    <div
                      key={category}
                      className='flex items-center space-x-2 border rounded-md p-2 hover:border-indigo-400 transition-colors'
                    >
                      <RadioGroupItem
                        value={category}
                        id={category.replace(/\s+/g, '')}
                      />
                      <label
                        htmlFor={category.replace(/\s+/g, '')}
                        className='text-sm cursor-pointer'
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </>
    ),
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='w-full max-w-xl mx-auto px-4 py-6'
    >
      <Card className='overflow-hidden border-none shadow-lg rounded-xl bg-white dark:bg-gray-900'>
        <CardContent className='p-6'>
          <motion.h2
            className='text-2xl font-bold mb-6 text-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Add New Product
          </motion.h2>

          <div className='flex justify-between mb-8'>
            {['basic', 'details', 'availability'].map((section, index) => (
              <motion.button
                key={section}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveSection(section)}
                className={`flex-1 text-sm py-2 mx-1 capitalize rounded-md ${
                  activeSection === section
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-100 text-gray-500 dark:bg-gray-800'
                } transition-all duration-300`}
              >
                {index + 1}. {section}
              </motion.button>
            ))}
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className='space-y-4'
              >
                {formSections[activeSection as keyof typeof formSections]}
              </motion.div>

              <div className='flex justify-between mt-10'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type='button'
                  onClick={() => {
                    if (activeSection === 'details') setActiveSection('basic')
                    if (activeSection === 'availability')
                      setActiveSection('details')
                  }}
                  className={`px-4 py-2 border border-gray-300 rounded-md ${
                    activeSection === 'basic' ? 'invisible' : ''
                  }`}
                >
                  Back
                </motion.button>

                {activeSection !== 'availability' ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type='button'
                    onClick={() => {
                      if (activeSection === 'basic') setActiveSection('details')
                      if (activeSection === 'details')
                        setActiveSection('availability')
                    }}
                    className='px-4 py-2 bg-indigo-500 text-white rounded-md'
                  >
                    Continue
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type='submit'
                    disabled={isSubmitting}
                    className='px-4 py-2 bg-green-500 text-white rounded-md flex items-center gap-2'
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className='h-4 w-4 animate-spin' />
                        <span>Adding...</span>
                      </>
                    ) : (
                      <span>Add Product</span>
                    )}
                  </motion.button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default AddProductForm
