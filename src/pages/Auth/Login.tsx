import LoginForm from "@/components/forms/LoginForm";
import { TextEffect } from "@/components/ui/text-effect";

const Login: React.FC = () => {
  return (
    <div className="flex items-center justify-center lg:min-h-[calc(100vh-5rem)] flex-col mt-20 shadow-lg">
      <div className="text-center text-4xl font-bold my-8">
        <TextEffect preset="blur" speedReveal={1.1} speedSegment={0.3}>
          Sign In
        </TextEffect>
      </div>
      <div className="max-w-lg mx-auto w-full">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
