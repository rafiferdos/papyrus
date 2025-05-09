import { ScrollReveal } from "@/components/ScrollReveal";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TextScramble } from "@/components/ui/text-scramble";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  Clock,
  Globe,
  Headphones,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// Placeholder data for our retail locations
const retailLocations = [
  {
    id: 1,
    name: "Downtown Flagship Store",
    address: "123 Main Street, New York, NY 10001",
    hours: "Mon-Sat: 10am-8pm, Sun: 11am-6pm",
    phone: "+1 (212) 555-7890",
    email: "downtown@papyrus.com",
    image:
      "https://images.unsplash.com/photo-1604754742629-3e0474f58351?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800",
    coordinates: {
      lat: 40.7128,
      lng: -74.006,
    },
  },
  {
    id: 2,
    name: "Westside Gallery Shop",
    address: "456 Creative Avenue, Los Angeles, CA 90001",
    hours: "Mon-Sat: 11am-7pm, Sun: 12pm-5pm",
    phone: "+1 (310) 555-1234",
    email: "westside@papyrus.com",
    image:
      "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800",
    coordinates: {
      lat: 34.0522,
      lng: -118.2437,
    },
  },
  {
    id: 3,
    name: "Artisan Paper Workshop",
    address: "789 Craft Lane, Portland, OR 97201",
    hours: "Mon-Fri: 9am-6pm, Sat: 10am-5pm, Sun: Closed",
    phone: "+1 (503) 555-9876",
    email: "portland@papyrus.com",
    image:
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800",
    coordinates: {
      lat: 45.5152,
      lng: -122.6784,
    },
  },
];

// Frequently asked questions
const faqs = [
  {
    question: "What types of payment do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, and Google Pay. For corporate or bulk orders, we also accept purchase orders and bank transfers.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Domestic shipping typically takes 3-5 business days with our standard shipping option. Express shipping (1-2 business days) and overnight shipping are also available at checkout. International shipping times vary by location, generally taking 7-14 business days.",
  },
  {
    question: "Do you offer custom or personalized products?",
    answer:
      "Yes! We offer a range of personalization services for journals, stationery, and select writing instruments. Please visit our Custom Orders page for more information, or contact our customer service team to discuss your specific needs.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We accept returns within 30 days of purchase for unused items in their original packaging. Custom or personalized items cannot be returned unless they arrive damaged or defective. Please visit our Returns page for detailed instructions.",
  },
  {
    question: "Do you offer corporate or bulk discounts?",
    answer:
      "Yes, we offer special pricing for corporate gifts, bulk orders, and educational institutions. Please contact our business sales team at business@papyrus.com for a custom quote based on your specific requirements.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order ships, you'll receive a tracking number via email. You can also view your order status by logging into your account on our website and visiting the Order History section.",
  },
];

// Support teams
const supportTeams = [
  {
    id: "general",
    name: "General Inquiries",
    description: "Questions about products, orders, or general information",
    icon: <MessageSquare className="h-5 w-5" />,
    email: "help@papyrus.com",
    phone: "+1 (800) 555-1234",
    responseTime: "Within 24 hours",
  },
  {
    id: "orders",
    name: "Order Support",
    description: "Help with existing orders, tracking, or delivery issues",
    icon: <Globe className="h-5 w-5" />,
    email: "orders@papyrus.com",
    phone: "+1 (800) 555-2345",
    responseTime: "Within 12 hours",
  },
  {
    id: "business",
    name: "Business & Wholesale",
    description: "Corporate orders, bulk purchases, and partnership inquiries",
    icon: <Headphones className="h-5 w-5" />,
    email: "business@papyrus.com",
    phone: "+1 (800) 555-3456",
    responseTime: "Within 48 hours",
  },
];

export default function Contact() {
  // Form state management
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Normally would submit to server here

    // Simulate submission success
    setTimeout(() => {
      setSubmitted(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");

      // Reset submitted state after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1000);
  };

  return (
    <div className="pt-20">
      <Helmet>
        <title>Contact Us - Papyrus | Reach Out to Our Team</title>
        <meta
          name="description"
          content="Get in touch with the Papyrus team. We're here to answer your questions about our stationery, writing instruments, and paper products."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-black">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-primary/5 dark:bg-primary/10">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--color-primary-500)/0.15),transparent_70%)]" />
            <AnimatedBackground>
              <motion.div
                data-id="1"
                className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
              />
              <motion.div
                data-id="2"
                className="absolute left-1/3 -bottom-48 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"
              />
              <motion.div
                data-id="3"
                className="absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl"
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
                  Get in Touch
                </TextShimmer>
              </div>
              <TextScramble
                as="p"
                className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 mb-8 max-w-3xl mx-auto"
              >
                We'd love to hear from you. Our team is always ready to assist
                with any questions about our products or services.
              </TextScramble>

              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                <motion.a
                  href="tel:+18005551234"
                  className="flex items-center gap-2 px-5 py-3 rounded-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-900 shadow-md transition-all duration-300"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Phone className="text-primary" size={20} />
                  <span className="font-medium">+1 (800) 555-1234</span>
                </motion.a>

                <motion.a
                  href="mailto:hello@papyrus.com"
                  className="flex items-center gap-2 px-5 py-3 rounded-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-900 shadow-md transition-all duration-300"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Mail className="text-primary" size={20} />
                  <span className="font-medium">hello@papyrus.com</span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="container px-4 py-12 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <ScrollReveal className="lg:col-span-2">
              <Card className="overflow-hidden border-0 shadow-lg bg-white dark:bg-gray-900">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-5">
                    <div className="md:col-span-2 bg-primary p-6 md:p-8 text-white flex flex-col justify-between">
                      <div>
                        <h2 className="text-2xl font-bold mb-6">
                          Contact Information
                        </h2>
                        <p className="mb-8 text-white/80">
                          Fill out the form and our team will get back to you as
                          soon as possible.
                        </p>

                        <div className="space-y-6">
                          <div className="flex items-start gap-4">
                            <div className="p-2 bg-white/10 rounded-full">
                              <Phone size={20} />
                            </div>
                            <div>
                              <p className="text-sm text-white/70">Phone</p>
                              <p className="font-medium">+1 (800) 555-1234</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-4">
                            <div className="p-2 bg-white/10 rounded-full">
                              <Mail size={20} />
                            </div>
                            <div>
                              <p className="text-sm text-white/70">Email</p>
                              <p className="font-medium">hello@papyrus.com</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-4">
                            <div className="p-2 bg-white/10 rounded-full">
                              <MapPin size={20} />
                            </div>
                            <div>
                              <p className="text-sm text-white/70">Address</p>
                              <p className="font-medium">
                                123 Paper Lane, Suite 101
                              </p>
                              <p className="font-medium">New York, NY 10001</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-4">
                            <div className="p-2 bg-white/10 rounded-full">
                              <Clock size={20} />
                            </div>
                            <div>
                              <p className="text-sm text-white/70">Hours</p>
                              <p className="font-medium">
                                Monday-Friday: 9AM-6PM
                              </p>
                              <p className="font-medium">Saturday: 10AM-4PM</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-10">
                        <p className="text-sm text-white/70 mb-3">
                          Connect with us
                        </p>
                        <div className="flex gap-4">
                          <a
                            href="#"
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.719 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
                            </svg>
                          </a>
                          <a
                            href="#"
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                            </svg>
                          </a>
                          <a
                            href="#"
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.441 16.892c-2.102.144-6.784.144-8.883 0-2.276-.156-2.541-1.27-2.558-4.892.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0 2.277.156 2.541 1.27 2.559 4.892-.018 3.629-.285 4.736-2.559 4.892zm-6.441-7.234l4.917 2.338-4.917 2.346v-4.684z" />
                            </svg>
                          </a>
                          <a
                            href="#"
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                            </svg>
                          </a>
                          <a
                            href="#"
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.326 18.266l-4.326-2.314-4.326 2.313.863-4.829-3.537-3.399 4.86-.671 2.14-4.415 2.14 4.415 4.86.671-3.537 3.4.863 4.829z" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-3 p-6 md:p-8">
                      {submitted ? (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="h-full flex flex-col items-center justify-center text-center px-6"
                        >
                          <div className="mb-4 text-primary">
                            <CheckCircle2 size={64} className="mx-auto" />
                          </div>
                          <h3 className="text-2xl font-bold mb-2">
                            Thank You!
                          </h3>
                          <p className="text-muted-foreground mb-8">
                            Your message has been received. We'll get back to
                            you as soon as possible.
                          </p>
                          <Button
                            variant="outline"
                            onClick={() => setSubmitted(false)}
                          >
                            Send Another Message
                          </Button>
                        </motion.div>
                      ) : (
                        <form
                          ref={formRef}
                          onSubmit={handleSubmit}
                          className="space-y-6"
                        >
                          <h2 className="text-2xl font-bold mb-6">
                            Send Us a Message
                          </h2>

                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="name">Your Name</Label>
                              <div className="relative">
                                <Input
                                  id="name"
                                  placeholder="John Smith"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  className="pl-10"
                                  required
                                />
                                <User
                                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                  size={16}
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="email">Your Email</Label>
                              <div className="relative">
                                <Input
                                  id="email"
                                  type="email"
                                  placeholder="john@example.com"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  className="pl-10"
                                  required
                                />
                                <Mail
                                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                  size={16}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input
                              id="subject"
                              placeholder="What's this about?"
                              value={subject}
                              onChange={(e) => setSubject(e.target.value)}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                              id="message"
                              placeholder="Tell us how we can help..."
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              className="min-h-[150px]"
                              required
                            />
                          </div>

                          <div className="pt-4">
                            <Button type="submit" className="w-full" size="lg">
                              Send Message
                            </Button>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Support Teams Sidebar */}
            <ScrollReveal>
              <div className="space-y-6">
                <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Support Teams</h3>

                    <Tabs defaultValue="general">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="orders">Orders</TabsTrigger>
                        <TabsTrigger value="business">Business</TabsTrigger>
                      </TabsList>

                      {supportTeams.map((team) => (
                        <TabsContent
                          value={team.id}
                          key={team.id}
                          className="pt-4"
                        >
                          <div className="mb-2">
                            <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
                              {team.name}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">
                            {team.description}
                          </p>

                          <div className="space-y-3">
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                              <a
                                href={`mailto:${team.email}`}
                                className="text-primary hover:underline"
                              >
                                {team.email}
                              </a>
                            </div>
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                              <a
                                href={`tel:${team.phone}`}
                                className="hover:underline"
                              >
                                {team.phone}
                              </a>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span className="text-sm">
                                Response time: {team.responseTime}
                              </span>
                            </div>
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Operating Hours</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Monday - Friday</span>
                        <span className="text-muted-foreground">
                          9:00 AM - 6:00 PM
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Saturday</span>
                        <span className="text-muted-foreground">
                          10:00 AM - 4:00 PM
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Sunday</span>
                        <span className="text-muted-foreground">Closed</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
                      <p className="text-sm">
                        <strong>Note:</strong> Holiday hours may vary. Please
                        check our social media channels for updates on special
                        hours and closures.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollReveal>
          </div>

          {/* Retail Locations */}
          <div className="my-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Visit Our Stores</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Experience our products in person at one of our retail
                locations. Our knowledgeable staff are ready to assist you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {retailLocations.map((location, index) => (
                <ScrollReveal key={location.id} delay={index * 0.1}>
                  <Card className="overflow-hidden border-0 shadow-lg h-full bg-white dark:bg-gray-900">
                    <div className="h-48 relative overflow-hidden">
                      <motion.img
                        src={location.image}
                        alt={location.name}
                        className="w-full h-full object-cover transition-transform"
                        whileHover={{ scale: 1.05 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                        <h3 className="text-xl font-bold text-white">
                          {location.name}
                        </h3>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                          <p>{location.address}</p>
                        </div>

                        <div className="flex items-start gap-3">
                          <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                          <p>{location.hours}</p>
                        </div>

                        <div className="flex items-start gap-3">
                          <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                          <a
                            href={`tel:${location.phone}`}
                            className="hover:underline"
                          >
                            {location.phone}
                          </a>
                        </div>

                        <div className="flex items-start gap-3">
                          <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                          <a
                            href={`mailto:${location.email}`}
                            className="text-primary hover:underline"
                          >
                            {location.email}
                          </a>
                        </div>
                      </div>

                      <div className="mt-6">
                        <Button variant="outline" className="w-full" asChild>
                          <a
                            href={`https://maps.google.com/?q=${location.coordinates.lat},${location.coordinates.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Get Directions
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Customer Service FAQs */}
          <div className="my-16">
            <div className="bg-muted rounded-xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="p-8 md:p-12">
                  <h2 className="text-3xl font-bold mb-6">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Find quick answers to our most common customer questions. If
                    you can't find what you're looking for, our support team is
                    just a message away.
                  </p>

                  <div className="space-y-4">
                    {faqs.slice(0, 3).map((faq, index) => (
                      <Card
                        key={index}
                        className="bg-white dark:bg-gray-900 border-0 shadow"
                      >
                        <CardContent className="p-5">
                          <h3 className="font-bold mb-2">{faq.question}</h3>
                          <p className="text-sm text-muted-foreground">
                            {faq.answer}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-4">
                    <Button asChild>
                      <Link to="/faqs">View All FAQs</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/blog">Read Our Blog</Link>
                    </Button>
                  </div>
                </div>

                <div className="relative h-full min-h-[400px] hidden md:block">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className="relative w-4/5 max-w-md aspect-square"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600 rounded-full opacity-20 blur-xl"
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.2, 0.3, 0.2],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      />

                      {faqs.slice(3).map((faq, index) => (
                        <motion.div
                          key={index}
                          className="absolute bg-white dark:bg-gray-900 p-5 rounded-lg shadow-xl max-w-xs z-10"
                          initial={{ opacity: 0, x: 100, y: 0 }}
                          whileInView={{ opacity: 1, x: 0, y: 0 }}
                          transition={{
                            delay: 0.2 + index * 0.2,
                            duration: 0.5,
                          }}
                          viewport={{ once: true }}
                          style={{
                            top: `${10 + index * 30}%`,
                            left: index % 2 === 0 ? "10%" : "40%",
                            transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)`,
                          }}
                        >
                          <h3 className="font-bold mb-2 text-sm">
                            {faq.question}
                          </h3>
                          <p className="text-xs text-muted-foreground truncate">
                            {faq.answer.substring(0, 50)}...
                          </p>
                        </motion.div>
                      ))}

                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                        >
                          <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-white">
                            <MessageSquare size={24} />
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subscribe Banner */}
          <ScrollReveal>
            <motion.div
              whileInView={{ y: [10, 0], opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-12 relative rounded-xl overflow-hidden"
            >
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-purple-600/90" />
                <div className="absolute inset-0 opacity-30 mix-blend-overlay">
                  <svg width="100%" height="100%">
                    <defs>
                      <pattern
                        id="dots"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                      >
                        <circle cx="3" cy="3" r="1.5" fill="white" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dots)" />
                  </svg>
                </div>
              </div>

              <div className="relative z-10 px-8 py-12 md:py-16 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">
                  Stay Connected with Papyrus
                </h2>
                <p className="max-w-2xl mx-auto mb-8">
                  Subscribe to our newsletter for exclusive offers, new product
                  announcements, creative inspiration, and stationery tips.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="bg-white/20 border-white/40 text-white placeholder:text-white/60 flex-grow"
                  />
                  <Button className="bg-white text-primary hover:bg-white/90">
                    Subscribe
                  </Button>
                </div>

                <p className="mt-4 text-sm text-white/70">
                  We respect your privacy and won't share your information.
                </p>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
