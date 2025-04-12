import RegisterForm from '@/components/forms/RegisterForm'
import { TextEffect } from '@/components/ui/text-effect'

const Register = () => {
  return (
    <div className='flex items-center justify-center lg:min-h-[calc(100vh-5rem)] flex-col mt-20 shadow-lg'>
      <div className='text-center text-4xl font-bold my-8'>
        <TextEffect preset='blur' speedReveal={1.1} speedSegment={0.3}>
          Sign Up
        </TextEffect>
      </div>
      <div className='max-w-lg mx-auto w-full'>
        <RegisterForm />
      </div>
    </div>
  )
}

export default Register