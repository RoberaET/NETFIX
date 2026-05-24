import { useEffect } from 'react';
import { motion } from 'framer-motion';

const servicesList = [
  {
    title: 'Camera Installation',
    icon: 'videocam',
    desc: 'Modern security solutions designed to protect your physical assets. We deploy high-definition, IP-based surveillance networks with intelligent analytics and remote cloud access, ensuring your premises are monitored with absolute clarity.',
    features: [
      '4K IP Camera Networks',
      'Cloud Storage & Remote Access',
      'AI-driven Motion Analytics'
    ],
    image: '/camera_service.png',
    imagePosition: 'right'
  },
  {
    title: 'IT Support',
    icon: 'support_agent',
    desc: 'Uninterrupted operations through elite managed services. Our 24/7 technical support team acts as an extension of your business, resolving complex technical hurdles before they impact your workflow.',
    features: [
      '24/7 Helpdesk & Remote Assistance',
      'Proactive System Monitoring',
      'Cybersecurity Protocol Management'
    ],
    image: '/server_rack_service.png',
    imagePosition: 'left'
  },
  {
    title: 'Network Installation',
    icon: 'router',
    desc: 'Scalable, high-bandwidth network architectures built for latency-sensitive environments. From structured cabling to enterprise Wi-Fi deployment, we establish the central nervous system of your digital operations.',
    features: [
      'Enterprise Fiber & Copper Cabling',
      'High-Density Wi-Fi Solutions',
      'VLAN Configuration & Routing'
    ],
    image: '/network_installation.png',
    imagePosition: 'right'
  },
  {
    title: 'Web-Site Development',
    icon: 'web',
    desc: 'High-performance digital storefronts tailored for SMEs. We engineer responsive, lightweight, and secure web applications that convert visitors into clients while seamlessly integrating with your backend systems.',
    features: [
      'Custom Frontend Engineering',
      'CMS & API Integrations',
      'Technical SEO & Performance Optimization'
    ],
    image: '/website_development.png',
    imagePosition: 'left'
  }
];

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-surface dark:bg-[#0c0f17] min-h-screen pt-32 pb-24 relative transition-colors duration-500">
      <div className="absolute inset-0 z-0 opacity-[0.85] dark:opacity-40 circuit-bg pointer-events-none"></div>

      <div className="max-w-container-max mx-auto px-gutter relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-24 max-w-4xl mx-auto space-y-6 pt-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center bg-secondary-container dark:bg-secondary-fixed text-on-secondary-container dark:text-on-secondary-fixed-variant px-4 py-1.5 rounded-full font-label-sm uppercase tracking-widest text-xs font-bold mb-4"
          >
            Elite Technical Partnership
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display-lg text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface dark:text-white tracking-tight leading-tight md:leading-tight lg:leading-tight"
          >
            Architecting robust ecosystems<br className="hidden md:block" /> for modern SMEs.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-body-lg text-lg md:text-xl text-on-surface-variant dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            We deliver high-performance technical infrastructure designed specifically for growth-focused businesses. Minimal downtime, maximum efficiency.
          </motion.p>
        </div>

        {/* Services List */}
        <div className="space-y-32">
          {servicesList.map((service) => {
            const isImageRight = service.imagePosition === 'right';
            
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className={`flex flex-col ${isImageRight ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 lg:gap-24`}
              >
                {/* Text Content */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim text-4xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}>
                      {service.icon}
                    </span>
                    <h2 className="font-headline-md text-3xl font-extrabold text-on-surface dark:text-white tracking-tight">
                      {service.title}
                    </h2>
                  </div>
                  
                  <p className="font-body-md text-base text-on-surface-variant dark:text-gray-300 leading-relaxed max-w-lg">
                    {service.desc}
                  </p>
                  
                  <ul className="space-y-4 pt-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-[2px] shrink-0 flex items-center justify-center text-primary dark:text-primary-fixed-dim p-0.5 rounded-full border border-primary dark:border-primary-fixed-dim/60 bg-transparent">
                           <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                        </div>
                        <span className="font-body-md text-sm text-on-surface-variant dark:text-gray-300 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Image Content */}
                <div className="flex-1 w-full">
                  <div className="relative group rounded-lg overflow-hidden shadow-lg border border-soft-blue-gray dark:border-slate-800 bg-white">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-auto object-cover object-center aspect-video mix-blend-multiply dark:mix-blend-normal transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
