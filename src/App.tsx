import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

// Define the Service types
interface Service {
  icon: string
  title: string
  desc: string
  tag: string
  category: string
  details: string[]
}

const SERVICES: Service[] = [
  {
    icon: 'videocam',
    title: 'Camera Installation',
    desc: 'High-definition security surveillance systems with remote monitoring capabilities and intelligent analytics.',
    tag: 'Security',
    category: 'Hardware',
    details: [
      '4K UHD IP Cameras & NVR Systems',
      'AI-Powered Motion & Facial Detection',
      'Mobile App Access & Cloud Backups',
      'Intrusion Alerts & Night Vision'
    ]
  },
  {
    icon: 'support_agent',
    title: 'IT Support',
    desc: '24/7 technical assistance, proactive maintenance, and rapid troubleshooting to minimize downtime.',
    tag: 'Maintenance',
    category: 'Operations',
    details: [
      '24/7 Helpdesk & Desktop Support',
      'Proactive Server & Device Monitoring',
      'Patch Management & Security Audits',
      'SLA-Backed Response Times'
    ]
  },
  {
    icon: 'router',
    title: 'Network Installation',
    desc: 'Enterprise-grade networking solutions ensuring high-speed connectivity and ironclad data security.',
    tag: 'Infrastructure',
    category: 'Connectivity',
    details: [
      'Structured Cabling (Cat6/Fiber)',
      'Enterprise Wi-Fi & Firewall Security',
      'SD-WAN & VPN Site-to-Site Setup',
      'Managed Switch & Router Configurations'
    ]
  },
  {
    icon: 'web',
    title: 'Web-Site Development',
    desc: 'Custom, performant web applications and digital platforms built for scale and optimal user experience.',
    tag: 'Digital',
    category: 'Software',
    details: [
      'React/Next.js Single Page Applications',
      'Responsive, Modern UI/UX Designs',
      'SEO & Performance Optimization',
      'API Integrations & Secure Databases'
    ]
  }
]

export default function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'All' | 'Hardware' | 'Operations' | 'Connectivity' | 'Software'>('All')
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  
  // Quote form state
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'General Query',
    message: '',
    budget: '1000'
  })

  // System Uptime stats simulation
  const [uptime, setUptime] = useState(0)
  const [pings, setPings] = useState<{ id: number; server: string; time: string; ping: number; status: string }[]>([])
  
  const uptimeRef = useRef(null)
  const isUptimeInView = useInView(uptimeRef, { once: true, margin: '-100px' })

  // Initialize Dark Mode based on system or local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      setDarkMode(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setDarkMode(false)
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setDarkMode(true)
    }
  }

  // Animate uptime counter
  useEffect(() => {
    if (isUptimeInView) {
      let start = 0
      const end = 99.99
      const duration = 2000 // 2 seconds
      const increment = end / (duration / 30)
      
      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setUptime(end)
          clearInterval(timer)
        } else {
          setUptime(Number(start.toFixed(2)))
        }
      }, 30)
      
      return () => clearInterval(timer)
    }
  }, [isUptimeInView])

  // Simulate Live Server Pings
  useEffect(() => {
    const servers = ['HQ Firewall', 'CCTV DVR Node 1', 'SME Web Portal', 'Internal NAS Server', 'Edge Gateway']
    let idCounter = 0

    const createPing = () => {
      const server = servers[Math.floor(Math.random() * servers.length)]
      const ping = Math.floor(Math.random() * 25) + 5 // 5ms - 30ms
      const now = new Date()
      const time = now.toTimeString().split(' ')[0]
      const status = Math.random() > 0.005 ? 'OK' : 'DEGRADED'
      
      return { id: idCounter++, server, time, ping, status }
    }

    // Seed initial pings
    setPings([createPing(), createPing(), createPing()])

    const interval = setInterval(() => {
      setPings(prev => [createPing(), ...prev.slice(0, 4)])
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      setIsQuoteModalOpen(false)
      setFormSubmitted(false)
      // reset form
      setFormData({
        name: '',
        email: '',
        service: 'General Query',
        message: '',
        budget: '1000'
      })
    }, 2500)
  }

  const filteredServices = activeTab === 'All' 
    ? SERVICES 
    : SERVICES.filter(s => s.category === activeTab)

  return (
    <div className={`min-h-screen bg-surface dark:bg-[#0b0f19] text-on-surface dark:text-gray-100 flex flex-col font-body-md transition-colors duration-300`}>
      
      {/* TopNavBar */}
      <nav className="bg-surface/90 dark:bg-[#0b0f19]/90 backdrop-blur-md w-full top-0 sticky border-b border-outline-variant/30 dark:border-outline/20 z-50 transition-colors duration-300">
        <div className="flex justify-between items-center max-w-container-max mx-auto px-gutter py-4">
          <a 
            className="font-display-lg text-2xl md:text-3xl font-extrabold text-primary dark:text-primary-fixed-dim tracking-tight flex items-center gap-2 hover:opacity-90 transition-opacity" 
            href="/"
          >
            <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              settings_ethernet
            </span>
            NETFIX IT SOLUTION
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-on-surface-variant dark:text-gray-300 hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200 font-medium">Services</a>
            <a href="#why-netfix" className="text-on-surface-variant dark:text-gray-300 hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200 font-medium">Why Us</a>
            <a href="#metrics" className="text-on-surface-variant dark:text-gray-300 hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200 font-medium">Performance</a>
            <a href="#contact-footer" className="text-on-surface-variant dark:text-gray-300 hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200 font-medium">Contact</a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-surface-container dark:hover:bg-slate-800 text-on-surface-variant dark:text-gray-300 transition-colors duration-300"
              aria-label="Toggle dark mode"
            >
              <span className="material-symbols-outlined flex items-center justify-center">
                {darkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            
            <button 
              onClick={() => setIsQuoteModalOpen(true)}
              className="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-full font-bold hover:bg-primary hover:text-on-primary transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
            >
              Get a Quote
            </button>
          </div>

          {/* Mobile Menu & Theme Controls */}
          <div className="flex items-center space-x-2 md:hidden">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-surface-container dark:hover:bg-slate-800 text-on-surface-variant dark:text-gray-300 transition-colors duration-300"
              aria-label="Toggle dark mode"
            >
              <span className="material-symbols-outlined flex items-center justify-center">
                {darkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-primary dark:text-primary-fixed-dim focus:outline-none hover:bg-surface-container dark:hover:bg-slate-800 rounded-full"
              aria-label="Toggle mobile menu"
            >
              <span className="material-symbols-outlined flex items-center justify-center">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden border-t border-outline-variant/20 dark:border-outline/10 bg-surface-container-lowest dark:bg-[#0f1422] overflow-hidden"
            >
              <div className="flex flex-col px-gutter py-6 space-y-4">
                <a 
                  href="#services" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-on-surface-variant dark:text-gray-300 hover:text-primary dark:hover:text-primary-fixed-dim text-lg font-semibold flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">construction</span>
                  Services
                </a>
                <a 
                  href="#why-netfix" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-on-surface-variant dark:text-gray-300 hover:text-primary dark:hover:text-primary-fixed-dim text-lg font-semibold flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">verified_user</span>
                  Why Us
                </a>
                <a 
                  href="#metrics" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-on-surface-variant dark:text-gray-300 hover:text-primary dark:hover:text-primary-fixed-dim text-lg font-semibold flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">monitoring</span>
                  Performance
                </a>
                <a 
                  href="#contact-footer" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-on-surface-variant dark:text-gray-300 hover:text-primary dark:hover:text-primary-fixed-dim text-lg font-semibold flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">mail</span>
                  Contact
                </a>
                
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    setIsQuoteModalOpen(true)
                  }}
                  className="w-full bg-primary text-on-primary dark:bg-primary-fixed-dim dark:text-on-primary-fixed py-3 rounded-xl font-bold hover:opacity-90 transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">request_quote</span>
                  Get a Quote
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow">
        
        {/* Hero Section */}
        <section className="relative pt-12 md:pt-20 pb-20 md:pb-28 overflow-hidden bg-gradient-to-b from-[#ffffff] to-[#f8fafc] dark:from-[#0b0f19] dark:to-[#0f172a] transition-colors duration-500">
          {/* Subtle overlay decorative lines */}
          <div className="absolute inset-0 circuit-bg opacity-30 dark:opacity-20 pointer-events-none"></div>
          
          <div className="max-w-container-max mx-auto px-gutter relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="lg:col-span-7 space-y-8 text-left"
            >
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary dark:bg-primary-fixed-dim/10 dark:text-primary-fixed-dim border border-primary/20"
              >
                <span className="material-symbols-outlined text-sm mr-2 animate-bounce" style={{ fontVariationSettings: "'FILL' 1" }}>
                  rocket_launch
                </span>
                <span className="font-label-sm text-xs uppercase tracking-widest font-bold font-label-sm">Empowering SMEs</span>
              </motion.div>

              <h1 className="font-display-lg text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-on-surface dark:text-white leading-tight">
                Elite IT Solutions for <span className="text-primary dark:text-primary-fixed-dim bg-gradient-to-r from-primary to-lime-600 dark:from-primary-fixed-dim dark:to-lime-400 bg-clip-text text-transparent">Growing SMEs</span>
              </h1>

              <p className="font-body-lg text-lg text-on-surface-variant dark:text-gray-300 max-w-xl">
                We provide robust, scalable, and secure technological infrastructures designed to accelerate your business growth, automate operations, and defend your assets.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="bg-primary text-on-primary dark:bg-primary-fixed-dim dark:text-on-primary-fixed px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  Get a Quote
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'wght' 600" }}>arrow_forward</span>
                </motion.button>
                <motion.a 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  href="#services"
                  className="border-2 border-outline/30 dark:border-outline-variant/20 text-on-surface dark:text-white px-8 py-4 rounded-xl font-bold hover:bg-surface-variant/30 dark:hover:bg-slate-800/50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  View Services
                </motion.a>
              </div>
            </motion.div>

            {/* Right Graphic Column */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="lg:col-span-5 relative flex items-center justify-center overflow-visible"
            >
              {/* Blur gradient behind globe */}
              <div className="absolute w-[120%] h-[120%] bg-primary-container/10 dark:bg-primary-fixed-dim/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

              {/* Interactive 3D Globe Model */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="relative z-10 w-full h-[400px] md:h-[500px] flex items-center justify-center"
              >
                <model-viewer
                  src="/globe.glb"
                  alt="Interactive 3D IT Infrastructure Globe"
                  auto-rotate=""
                  camera-controls=""
                  shadow-intensity="1"
                  interaction-prompt="none"
                  auto-rotate-delay="0"
                  rotation-per-second="10deg"
                  className="w-full h-full cursor-grab active:cursor-grabbing outline-none"
                  style={{ width: '100%', height: '100%', outline: 'none' }}
                ></model-viewer>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Expertise Section */}
        <section id="services" className="py-20 md:py-28 bg-surface-container-low dark:bg-[#0f1422] transition-colors duration-500">
          <div className="max-w-container-max mx-auto px-gutter">
            
            <div className="text-center mb-16 space-y-4">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-headline-md text-3xl md:text-4xl font-extrabold text-on-surface dark:text-white tracking-tight">Our Expertise</h2>
                <div className="w-16 h-1 bg-primary dark:bg-primary-fixed-dim mx-auto mt-4 rounded-full"></div>
              </motion.div>
              <p className="font-body-lg text-lg text-on-surface-variant dark:text-gray-300 max-w-2xl mx-auto">
                Comprehensive IT services tailored to meet the exacting demands of modern enterprise environments and scaling businesses.
              </p>
              
              {/* Category Filter Tabs */}
              <div className="flex flex-wrap justify-center gap-2 pt-6">
                {(['All', 'Hardware', 'Operations', 'Connectivity', 'Software'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer ${
                      activeTab === tab 
                        ? 'bg-primary text-on-primary dark:bg-primary-fixed-dim dark:text-on-primary-fixed shadow-sm'
                        : 'bg-surface dark:bg-slate-800 text-on-surface-variant dark:text-gray-300 hover:bg-surface-variant/40 dark:hover:bg-slate-700/60'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Services Grid */}
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredServices.map((service, index) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    key={service.title}
                    className="bg-surface-container-lowest dark:bg-[#161c2d] border border-soft-blue-gray/10 dark:border-slate-800/80 rounded-2xl p-6 tech-glow flex flex-col h-full group relative overflow-hidden shadow-sm"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 dark:bg-primary-fixed-dim/5 rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-150 duration-500"></div>
                    
                    {/* Icon Container */}
                    <div className="w-14 h-14 bg-light-gray dark:bg-slate-800 rounded-xl flex items-center justify-center mb-6 text-primary dark:text-primary-fixed-dim group-hover:scale-110 transition-transform duration-300">
                      <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {service.icon}
                      </span>
                    </div>

                    <h3 className="font-body-lg text-xl font-bold text-on-surface dark:text-white mb-3">
                      {service.title}
                    </h3>
                    
                    <p className="font-body-md text-sm text-on-surface-variant dark:text-gray-300 mb-6 flex-grow leading-relaxed">
                      {service.desc}
                    </p>

                    {/* Collapsible Action Details */}
                    <button 
                      onClick={() => setSelectedService(service)}
                      className="text-left text-primary dark:text-primary-fixed-dim text-sm font-bold flex items-center gap-1 mb-4 hover:underline cursor-pointer group/btn"
                    >
                      Explore features
                      <span className="material-symbols-outlined text-xs group-hover/btn:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </button>

                    <div className="mt-auto pt-2 border-t border-slate-100 dark:border-slate-800/50 flex justify-between items-center">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary dark:bg-primary-fixed-dim/10 dark:text-primary-fixed-dim font-label-sm text-xs font-semibold rounded-full">
                        {service.tag}
                      </span>
                      <span className="text-xs text-slate-400 dark:text-slate-500 font-label-sm">
                        {service.category}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us & Trust Indicators */}
        <section id="why-netfix" className="py-20 md:py-28 bg-surface dark:bg-[#0b0f19] transition-colors duration-500">
          <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 space-y-8 text-left"
            >
              <div className="space-y-4">
                <h2 className="font-headline-md text-3xl md:text-4xl font-extrabold text-on-surface dark:text-white tracking-tight">Why Choose NETFIX?</h2>
                <div className="w-16 h-1 bg-primary dark:bg-primary-fixed-dim rounded-full"></div>
              </div>
              
              <p className="font-body-lg text-lg text-on-surface-variant dark:text-gray-300 leading-relaxed">
                We do not just patch IT problems; we architect robust, proactive digital environments that scale alongside your operations. Our expert consultants ensure zero bottlenecking.
              </p>

              {/* Enhanced Interactive List */}
              <ul className="space-y-6 pt-4">
                {[
                  {
                    title: 'Rapid Adherence SLA',
                    desc: 'Instant ticket logging with standard 15-minute response times for critical network outages.',
                    icon: 'flash_on'
                  },
                  {
                    title: 'Highly Certified Engineers',
                    desc: 'Our staff maintain certifications in Cisco Networking, AWS architecture, and cyber defense.',
                    icon: 'verified'
                  },
                  {
                    title: 'Proactive Infrastructure Defense',
                    desc: '24/7 endpoint vulnerability shielding to lock out threats before they reach your network.',
                    icon: 'security'
                  }
                ].map((item) => (
                  <motion.li 
                    whileHover={{ x: 6 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    key={item.title} 
                    className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/40 transition-colors duration-200"
                  >
                    <div className="w-10 h-10 bg-primary/10 dark:bg-primary-fixed-dim/10 rounded-full flex items-center justify-center text-primary dark:text-primary-fixed-dim shrink-0">
                      <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {item.icon}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-body-lg text-lg font-bold text-on-surface dark:text-white">{item.title}</h4>
                      <p className="font-body-md text-sm text-on-surface-variant dark:text-gray-400 mt-1">{item.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Right Live Uptime Monitor Column */}
            <motion.div 
              id="metrics"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 flex flex-col justify-center"
            >
              <div 
                ref={uptimeRef} 
                className="bg-surface-container-high dark:bg-[#121826] rounded-2xl p-8 border border-outline-variant/35 dark:border-slate-800/50 relative overflow-hidden h-[420px] shadow-sm flex flex-col justify-between"
              >
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDIwaDQwTTIwIDB2NDAiIHN0cm9rZT0icmdiYSgxNDgsMTYzLDE4NCwwLjA4KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] opacity-60"></div>
                
                {/* Uptime Header Card */}
                <div className="bg-surface-container-lowest dark:bg-[#192134] p-5 rounded-xl border border-soft-blue-gray/5 dark:border-slate-700/30 max-w-sm relative z-10 tech-glow shadow-md">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-10 h-10 bg-primary/10 text-primary dark:bg-primary-fixed-dim/10 dark:text-primary-fixed-dim rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>monitoring</span>
                    </div>
                    <div className="text-left">
                      <div className="font-body-md text-sm font-extrabold text-on-surface dark:text-white">System Uptime</div>
                      <div className="font-label-sm text-xs text-on-surface-variant dark:text-gray-400">Last 30 Days</div>
                    </div>
                    
                    {/* Live indicator dot */}
                    <div className="ml-auto flex items-center gap-1.5 bg-green-500/10 px-2 py-0.5 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                      <span className="font-label-sm text-[10px] text-green-500 font-extrabold uppercase">LIVE</span>
                    </div>
                  </div>
                  
                  <div className="text-left font-headline-md text-4xl font-extrabold text-primary dark:text-primary-fixed-dim">
                    {uptime}%
                  </div>
                  
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 mt-4 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={isUptimeInView ? { width: '99.99%' } : { width: 0 }}
                      transition={{ duration: 2, ease: 'easeOut' }}
                      className="bg-primary dark:bg-primary-fixed-dim h-full"
                    ></motion.div>
                  </div>
                </div>

                {/* Simulated Live Diagnostic Terminal Feed */}
                <div className="relative z-10 w-full mt-6 bg-[#090b10] border border-slate-800/80 rounded-xl p-4 font-label-sm text-[11px] text-lime-400/90 text-left overflow-hidden h-44 flex flex-col justify-end">
                  <div className="absolute top-2 left-4 text-slate-500 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-500 animate-pulse"></span>
                    Terminal Log Diagnostics
                  </div>
                  
                  <div className="space-y-1.5 mt-4 select-none">
                    <AnimatePresence>
                      {pings.map((ping) => (
                        <motion.div 
                          key={ping.id}
                          initial={{ opacity: 0, x: -10, height: 0 }}
                          animate={{ opacity: 1, x: 0, height: 'auto' }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="flex justify-between items-center whitespace-nowrap"
                        >
                          <span className="text-slate-400 font-mono">[{ping.time}]</span>
                          <span className="text-white font-mono shrink-0 mx-2">{ping.server}</span>
                          <span className="text-slate-500 font-mono flex-grow border-b border-dotted border-slate-800 mx-1"></span>
                          <span className="font-mono text-right shrink-0">
                            {ping.ping}ms - <span className={ping.status === 'OK' ? 'text-green-400' : 'text-amber-400 font-bold'}>{ping.status}</span>
                          </span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact-footer" className="bg-surface-container-low dark:bg-[#0c0f17] border-t border-outline-variant/20 dark:border-slate-800/60 w-full mt-auto transition-colors duration-500">
        <div className="max-w-container-max mx-auto px-gutter py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4 text-left">
            <a href="/" className="font-display-lg text-xl md:text-2xl font-extrabold text-primary dark:text-primary-fixed-dim hover:opacity-95 tracking-tight flex items-center gap-2">
              <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                settings_ethernet
              </span>
              NETFIX IT SOLUTION
            </a>
            <p className="font-body-md text-sm text-on-surface-variant dark:text-gray-400 leading-relaxed max-w-sm">
              © 2026 NETFIX IT SOLUTION. Empowering small and medium enterprises through premium technical partnerships and high-grade system architecture.
            </p>
          </div>

          {/* Links: Services */}
          <div className="md:col-span-3 space-y-4 text-left">
            <h4 className="font-body-lg text-base font-bold text-on-surface dark:text-white uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5">
              {SERVICES.map(s => (
                <li key={s.title}>
                  <a href="#services" className="font-body-md text-sm text-on-surface-variant dark:text-gray-400 hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links: Legal */}
          <div className="md:col-span-2 space-y-4 text-left">
            <h4 className="font-body-lg text-base font-bold text-on-surface dark:text-white uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2.5">
              <li>
                <a className="font-body-md text-sm text-on-surface-variant dark:text-gray-400 hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200" href="#">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="font-body-md text-sm text-on-surface-variant dark:text-gray-400 hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200" href="#">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 space-y-4 text-left">
            <h4 className="font-body-lg text-base font-bold text-on-surface dark:text-white uppercase tracking-wider">Contact</h4>
            <div className="space-y-3">
              <a 
                href="mailto:info@netfix.com" 
                className="font-body-md text-sm text-on-surface-variant dark:text-gray-400 flex items-center hover:text-primary dark:hover:text-primary-fixed-dim transition-colors"
              >
                <span className="material-symbols-outlined mr-2 text-primary dark:text-primary-fixed-dim text-lg">mail</span>
                info@netfix.com
              </a>
              <div className="font-body-md text-sm text-on-surface-variant dark:text-gray-400 flex items-center">
                <span className="material-symbols-outlined mr-2 text-primary dark:text-primary-fixed-dim text-lg">call</span>
                +1 (555) 234-IT-FIX
              </div>
              <div className="font-body-md text-sm text-on-surface-variant dark:text-gray-400 flex items-start">
                <span className="material-symbols-outlined mr-2 text-primary dark:text-primary-fixed-dim text-lg mt-0.5">location_on</span>
                100 Tech Corridor, Suite 400<br/>San Francisco, CA 94107
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Interactive Lead Form Quote Modal */}
      <AnimatePresence>
        {isQuoteModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.93, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.93, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-white dark:bg-[#121826] border border-slate-200 dark:border-slate-800/80 rounded-2xl max-w-lg w-full p-8 relative shadow-2xl text-left"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsQuoteModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
                aria-label="Close modal"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.div
                    key="quote-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="font-display-lg text-2xl font-extrabold text-on-surface dark:text-white">
                        Request a Free Quote
                      </h3>
                      <p className="font-body-md text-sm text-on-surface-variant dark:text-gray-400 mt-1">
                        Complete this form, and our engineering team will follow up within 2 hours.
                      </p>
                    </div>

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Your Name</label>
                        <input 
                          type="text" 
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleFormChange}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-on-surface dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 dark:focus:ring-primary-fixed-dim/40 focus:border-primary transition-all"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Corporate Email</label>
                        <input 
                          type="email" 
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleFormChange}
                          placeholder="j.doe@company.com"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-on-surface dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 dark:focus:ring-primary-fixed-dim/40 focus:border-primary transition-all"
                        />
                      </div>

                      {/* Service Dropdown */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Select Service Needed</label>
                        <select 
                          name="service"
                          value={formData.service}
                          onChange={handleFormChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-on-surface dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 dark:focus:ring-primary-fixed-dim/40 focus:border-primary transition-all"
                        >
                          <option value="Camera Installation">Camera Surveillance Installation</option>
                          <option value="IT Support">24/7 Managed IT Support</option>
                          <option value="Network Installation">Enterprise Network Deployment</option>
                          <option value="Web-Site Development">Custom Website/App Development</option>
                          <option value="General Query">General IT Consultation</option>
                        </select>
                      </div>

                      {/* Budget Slider */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Estimated Project Budget</label>
                          <span className="text-sm font-bold text-primary dark:text-primary-fixed-dim">${formData.budget}+</span>
                        </div>
                        <input 
                          type="range" 
                          name="budget"
                          min="500" 
                          max="25000" 
                          step="500"
                          value={formData.budget}
                          onChange={handleFormChange}
                          className="w-full accent-primary dark:accent-primary-fixed-dim"
                        />
                      </div>

                      {/* Brief description */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Brief Project Brief</label>
                        <textarea 
                          name="message"
                          rows={3}
                          value={formData.message}
                          onChange={handleFormChange}
                          placeholder="Outline your requirements..."
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-on-surface dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 dark:focus:ring-primary-fixed-dim/40 focus:border-primary transition-all"
                        ></textarea>
                      </div>

                      {/* Submit */}
                      <button 
                        type="submit"
                        className="w-full bg-primary text-on-primary dark:bg-primary-fixed-dim dark:text-on-primary-fixed py-3.5 rounded-xl font-bold hover:shadow-lg transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2 mt-2"
                      >
                        <span className="material-symbols-outlined text-lg">send</span>
                        Submit Request
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                  >
                    <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-4xl animate-bounce" style={{ fontVariationSettings: "'wght' 600" }}>
                        check_circle
                      </span>
                    </div>
                    <h3 className="font-display-lg text-2xl font-extrabold text-on-surface dark:text-white">
                      Quote Request Received!
                    </h3>
                    <p className="font-body-md text-sm text-on-surface-variant dark:text-gray-400 max-w-sm">
                      Thank you for contacting us, <span className="font-bold text-on-surface dark:text-white">{formData.name}</span>. An IT Solutions Engineer will reach out to you at <span className="font-bold text-on-surface dark:text-white">{formData.email}</span> shortly.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feature Explorer Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.93, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.93, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-white dark:bg-[#121826] border border-slate-200 dark:border-slate-800/80 rounded-2xl max-w-lg w-full p-8 relative shadow-2xl text-left"
            >
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
                aria-label="Close modal"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary/10 text-primary dark:bg-primary-fixed-dim/10 dark:text-primary-fixed-dim rounded-xl flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {selectedService.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display-lg text-2xl font-extrabold text-on-surface dark:text-white">
                      {selectedService.title}
                    </h3>
                    <span className="inline-block px-3 py-1 mt-1 bg-primary/10 text-primary dark:bg-primary-fixed-dim/10 dark:text-primary-fixed-dim font-label-sm text-xs font-semibold rounded-full">
                      {selectedService.tag}
                    </span>
                  </div>
                </div>

                <p className="font-body-md text-sm text-on-surface-variant dark:text-gray-300 leading-relaxed">
                  {selectedService.desc}
                </p>

                <div className="space-y-3">
                  <h4 className="font-body-lg text-sm font-bold text-on-surface dark:text-white uppercase tracking-wider">
                    Core Technical Features
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedService.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-on-surface-variant dark:text-gray-300">
                        <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim text-lg">check_circle</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 flex gap-4">
                  <button 
                    onClick={() => {
                      setSelectedService(null)
                      setIsQuoteModalOpen(true)
                    }}
                    className="flex-grow bg-primary text-on-primary dark:bg-primary-fixed-dim dark:text-on-primary-fixed py-3 rounded-xl font-bold hover:opacity-90 transition-all duration-300 shadow-md text-center cursor-pointer"
                  >
                    Request Service Installation
                  </button>
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="px-6 py-3 border border-slate-200 dark:border-slate-800 text-on-surface dark:text-white rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
