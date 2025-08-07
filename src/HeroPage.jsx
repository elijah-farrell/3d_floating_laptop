import {
  ChartBarIcon,
  CursorClickIcon,
  ShieldCheckIcon,
  ViewGridIcon,
  RefreshIcon,
  CheckIcon,
  StarIcon,
  UserGroupIcon
} from '@heroicons/react/outline'

const features = [
  {
    name: 'Advanced Analytics',
    href: '#',
    description: 'Get deep insights into your business performance with real-time analytics and customizable dashboards.',
    icon: ChartBarIcon
  },
  {
    name: 'Smart Engagement',
    href: '#',
    description: 'Connect with your customers through intelligent automation and personalized experiences.',
    icon: CursorClickIcon
  },
  { 
    name: 'Enterprise Security', 
    href: '#', 
    description: "Bank-level security with end-to-end encryption and compliance with industry standards.", 
    icon: ShieldCheckIcon 
  },
  {
    name: 'Seamless Integrations',
    href: '#',
    description: "Connect with 100+ third-party tools and APIs to streamline your workflow.",
    icon: ViewGridIcon
  },
  {
    name: 'AI-Powered Automation',
    href: '#',
    description: 'Let artificial intelligence handle repetitive tasks and optimize your operations.',
    icon: RefreshIcon
  },
  {
    name: 'Team Collaboration',
    href: '#',
    description: 'Work together seamlessly with real-time collaboration tools and shared workspaces.',
    icon: UserGroupIcon
  }
]

const testimonials = [
  {
    content: "This platform transformed our business operations. The analytics are incredible and the automation saves us hours every day.",
    author: "Sarah Johnson",
    role: "CEO, TechFlow Inc.",
    rating: 5
  },
  {
    content: "The security features give us peace of mind, and the integration capabilities are exactly what we needed.",
    author: "Michael Chen",
    role: "CTO, DataSecure",
    rating: 5
  },
  {
    content: "Customer support is outstanding and the platform is incredibly intuitive. Highly recommended!",
    author: "Emily Rodriguez",
    role: "Marketing Director, GrowthCo",
    rating: 5
  }
]

const pricingPlans = [
  {
    name: 'Starter',
    price: '$29',
    period: '/month',
    description: 'Perfect for small teams and startups',
    features: [
      'Up to 5 team members',
      'Basic analytics',
      'Email support',
      '10 integrations',
      '1GB storage'
    ]
  },
  {
    name: 'Professional',
    price: '$99',
    period: '/month',
    description: 'Ideal for growing businesses',
    features: [
      'Up to 25 team members',
      'Advanced analytics',
      'Priority support',
      'Unlimited integrations',
      '100GB storage',
      'Custom branding'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: '$299',
    period: '/month',
    description: 'For large organizations',
    features: [
      'Unlimited team members',
      'Custom analytics',
      '24/7 phone support',
      'Custom integrations',
      'Unlimited storage',
      'Dedicated account manager'
    ]
  }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

// Smooth scroll function
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  const wrapper = document.querySelector('.laptop-content .wrapper')
  if (element && wrapper) {
    const elementTop = element.offsetTop
    // Account for sticky navbar height (approximately 80px)
    wrapper.scrollTo({
      top: elementTop - 80,
      behavior: 'smooth'
    })
  }
}

export default function LandingPage() {
  return (
    <div className="relative bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
                    <nav className="relative bg-white shadow-lg sticky top-0 z-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6">
           <div className="flex justify-between items-center py-6">
             <div className="flex justify-start">
               <a href="#" className="flex items-center">
                 <span className="sr-only">Your Brand</span>
                 <div className="flex items-center">
                   <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                     <span className="text-white font-bold text-sm">Y</span>
                   </div>
                   <span className="ml-2 text-xl font-bold text-gray-900">Your Brand</span>
                 </div>
               </a>
             </div>
             <div className="flex space-x-10">
                                       <a onClick={() => scrollToSection('platform-preview')} className="text-lg font-medium text-gray-500 hover:text-gray-900 cursor-pointer">
                 About
               </a>
               <a onClick={() => scrollToSection('features')} className="text-lg font-medium text-gray-500 hover:text-gray-900 cursor-pointer">
                 Features
               </a>
               <a onClick={() => scrollToSection('testimonials')} className="text-lg font-medium text-gray-500 hover:text-gray-900 cursor-pointer">
                 Testimonials
               </a>
               <a onClick={() => scrollToSection('pricing')} className="text-lg font-medium text-gray-500 hover:text-gray-900 cursor-pointer">
                 Pricing
               </a>
            </div>
             <div className="flex items-center justify-end space-x-4">
                                  <a href="#" className="whitespace-nowrap text-lg font-medium text-gray-500 hover:text-gray-900">
                 Sign in
               </a>
                                   <a
                  href="#"
                  className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700">
                 Sign up
               </a>
             </div>
           </div>
         </div>
       </nav>

      <main className="overflow-y-auto">
        {/* Hero Section */}
        <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center">
          <div className="px-4 sm:px-8">
            <div className="flex justify-center mb-6">
                             <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full">
                 <span className="text-white font-bold text-2xl">Y</span>
               </div>
             </div>
             <h1 className="text-5xl tracking-tight font-extrabold text-gray-900 sm:text-6xl md:text-7xl">
               <span className="block">Transform your business</span>
               <span className="block text-blue-600">with intelligent solutions</span>
             </h1>
            <p className="mt-3 max-w-md mx-auto text-xl text-gray-500 sm:text-2xl md:mt-5 md:max-w-3xl">
              Empower your team with cutting-edge analytics, automation, and collaboration tools. 
              Join thousands of businesses that trust our platform to drive growth and efficiency.
            </p>
            <div className="mt-10 flex justify-center space-x-4">
              <div className="rounded-md shadow">
                                 <a
                   href="#"
                                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                    Get started
                  </a>
                </div>
                <div className="rounded-md shadow">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-lg font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50">
                    Live demo
                  </a>
              </div>
            </div>
          </div>
        </div>

                 {/* Hero Image Section */}
         <div id="platform-preview" className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center">
                                 <span className="px-3 bg-white text-xl font-medium text-gray-900">Platform Preview</span>
              </div>
            </div>
            <div className="mt-8">
              <div className="relative rounded-lg shadow-xl overflow-hidden">
                                 <div className="w-full h-64 bg-gradient-to-br from-blue-600 to-gray-800 flex items-center justify-center">
                   <div className="text-center text-white">
                     <h3 className="text-2xl font-bold mb-2">Analytics Dashboard</h3>
                     <p className="text-lg opacity-90">Real-time business metrics</p>
                   </div>
                 </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                 <div className="absolute bottom-4 left-4 text-white">
                   <h3 className="text-xl font-semibold">Real-time Analytics Dashboard</h3>
                   <p className="text-base opacity-90">Monitor your business metrics in real-time</p>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
                             <h2 className="text-lg text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
              <p className="mt-2 text-4xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                Everything you need to succeed
              </p>
              <p className="mt-4 max-w-2xl text-2xl text-gray-500 lg:mx-auto">
                Our comprehensive platform provides all the tools and insights you need to grow your business, 
                streamline operations, and delight your customers.
              </p>
            </div>

            <div className="mt-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                {features.map((feature) => (
                  <div key={feature.name} className="relative">
                    <dt>
                                             <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                         <feature.icon className="h-6 w-6" aria-hidden="true" />
                       </div>
                      <p className="ml-16 text-xl leading-6 font-medium text-gray-900">{feature.name}</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-lg text-gray-500">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div id="testimonials" className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
                             <h2 className="text-lg text-blue-600 font-semibold tracking-wide uppercase">Testimonials</h2>
              <p className="mt-2 text-4xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                Trusted by thousands of businesses
              </p>
              <p className="mt-4 max-w-2xl text-2xl text-gray-500 lg:mx-auto">
                See what our customers have to say about our platform.
              </p>
            </div>

            <div className="mt-10">
              <div className="grid gap-8 md:grid-cols-3">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4 text-lg">"{testimonial.content}"</p>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">{testimonial.author}</p>
                      <p className="text-base text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
                             <h2 className="text-lg text-blue-600 font-semibold tracking-wide uppercase">Pricing</h2>
              <p className="mt-2 text-4xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                Choose the perfect plan for your business
              </p>
              <p className="mt-4 max-w-2xl text-2xl text-gray-500 lg:mx-auto">
                Start free and scale as you grow. All plans include our core features.
              </p>
            </div>

            <div className="mt-10">
              <div className="grid gap-8 md:grid-cols-3">
                {pricingPlans.map((plan, index) => (
                                     <div key={plan.name} className={classNames(
                     plan.popular ? 'ring-2 ring-blue-500' : '',
                     'bg-white rounded-lg shadow-lg p-6 relative'
                   )}>
                     {plan.popular && (
                       <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                         <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                           Most Popular
                         </span>
                       </div>
                     )}
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                      <div className="mt-4">
                        <span className="text-5xl font-extrabold text-gray-900">{plan.price}</span>
                        <span className="text-gray-500 text-lg">{plan.period}</span>
                      </div>
                      <p className="mt-2 text-gray-500 text-lg">{plan.description}</p>
                    </div>
                    <ul className="mt-6 space-y-4">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                          <span className="text-gray-600 text-lg">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <a
                        href="#"
                                                                          className={classNames(
                            plan.popular
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'bg-gray-100 text-gray-900 hover:bg-gray-200',
                            'w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-lg font-medium'
                          )}
                      >
                        Get started
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
                 <div className="py-12 bg-blue-600">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="text-center">
               <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
                 Ready to get started?
               </h2>
               <p className="mt-4 text-xl text-blue-100">
                 Join thousands of businesses that trust our platform to drive growth and efficiency.
               </p>
               <div className="mt-8 flex justify-center space-x-4">
                 <a
                   href="#"
                   className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50"
                 >
                   Start free trial
                 </a>
                 <a
                   href="#"
                   className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700"
                 >
                   Contact sales
                 </a>
               </div>
             </div>
           </div>
         </div>
      </main>
    </div>
  )
} 