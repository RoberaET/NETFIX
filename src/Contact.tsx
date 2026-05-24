import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interest: '',
    details: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    alert("Inquiry submitted successfully!");
  };

  return (
    <div className="bg-surface dark:bg-[#0c0f17] min-h-screen pt-32 pb-24 relative transition-colors duration-500 font-body-md text-on-surface dark:text-gray-100">
      
      <div className="max-w-container-max mx-auto px-gutter relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display-lg-mobile md:font-display-lg text-4xl md:text-5xl font-extrabold text-on-surface dark:text-white tracking-tight leading-tight"
          >
            Let's Build <span className="text-secondary dark:text-secondary-fixed-dim">Something Great</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-body-md text-base text-on-surface-variant dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Whether you need elite technical partnership, network installation, or comprehensive IT support, our team is ready to engineer your solution.
          </motion.p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-5xl mx-auto">
          
          {/* Left Column (Contact Info + Map) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Contact Info Card */}
            <div className="bg-surface-container-lowest dark:bg-[#161c2d] border border-outline-variant/30 dark:border-slate-800/80 rounded-lg p-8 relative overflow-hidden shadow-sm">
              <div className="absolute inset-0 z-0 opacity-[0.85] dark:opacity-20 circuit-bg pointer-events-none"></div>
              
              <div className="relative z-10 space-y-8">
                
                {/* Headquarters */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 bg-surface-container dark:bg-slate-800 rounded flex items-center justify-center text-on-surface-variant dark:text-gray-400 border border-outline-variant/20 dark:border-slate-700">
                    <span className="material-symbols-outlined text-[20px]">location_on</span>
                  </div>
                  <div>
                    <h3 className="font-label-sm text-[11px] font-bold text-on-surface-variant dark:text-gray-400 uppercase tracking-widest mb-1.5">Headquarters</h3>
                    <p className="font-body-md text-[13px] text-on-surface dark:text-gray-200 leading-relaxed">
                      1280 Tech Hub Boulevard<br />
                      Suite 400<br />
                      Innovation District, CA 94103
                    </p>
                  </div>
                </div>

                {/* Phone Support */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 bg-surface-container dark:bg-slate-800 rounded flex items-center justify-center text-on-surface-variant dark:text-gray-400 border border-outline-variant/20 dark:border-slate-700">
                    <span className="material-symbols-outlined text-[20px]">call</span>
                  </div>
                  <div>
                    <h3 className="font-label-sm text-[11px] font-bold text-on-surface-variant dark:text-gray-400 uppercase tracking-widest mb-1.5">Phone Support</h3>
                    <p className="font-body-md text-[13px] font-semibold text-on-surface dark:text-white mb-0.5">
                      +1 (800) 555-0199
                    </p>
                    <p className="font-body-md text-[11px] text-on-surface-variant dark:text-gray-400">
                      Mon-Fri, 8am - 6pm EST
                    </p>
                  </div>
                </div>

                {/* Direct Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 bg-surface-container dark:bg-slate-800 rounded flex items-center justify-center text-on-surface-variant dark:text-gray-400 border border-outline-variant/20 dark:border-slate-700">
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                  </div>
                  <div>
                    <h3 className="font-label-sm text-[11px] font-bold text-on-surface-variant dark:text-gray-400 uppercase tracking-widest mb-1.5">Direct Email</h3>
                    <a href="mailto:solutions@netfix.com" className="font-body-md text-[13px] font-semibold text-on-surface dark:text-white hover:text-primary dark:hover:text-primary-fixed-dim transition-colors">
                      solutions@netfix.com
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Map Image */}
            <div className="rounded-lg overflow-hidden border border-outline-variant/30 dark:border-slate-800/80 shadow-sm relative h-48 md:h-56 w-full">
              <img 
                src="/contact_map.png" 
                alt="Office Location Map" 
                className="w-full h-full object-cover"
              />
            </div>

          </motion.div>

          {/* Right Column (Form) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-7 bg-[#fbfcfd] dark:bg-[#121826] border border-outline-variant/30 dark:border-slate-800/80 rounded-lg p-8 md:p-10 shadow-sm h-full"
          >
            <h2 className="font-body-lg text-[15px] font-bold text-on-surface dark:text-white mb-8 tracking-tight">
              Send us a message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block font-label-sm text-[11px] font-bold text-on-surface-variant dark:text-gray-400 uppercase tracking-widest">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Jane"
                    required
                    className="w-full bg-surface-container-lowest dark:bg-[#161c2d] border border-outline-variant/50 dark:border-slate-700/80 text-on-surface dark:text-white rounded px-4 py-2.5 font-body-md text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-professional-blue dark:focus:border-primary-fixed-dim transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="block font-label-sm text-[11px] font-bold text-on-surface-variant dark:text-gray-400 uppercase tracking-widest">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    required
                    className="w-full bg-surface-container-lowest dark:bg-[#161c2d] border border-outline-variant/50 dark:border-slate-700/80 text-on-surface dark:text-white rounded px-4 py-2.5 font-body-md text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-professional-blue dark:focus:border-primary-fixed-dim transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="block font-label-sm text-[11px] font-bold text-on-surface-variant dark:text-gray-400 uppercase tracking-widest">
                    Work Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@company.com"
                    required
                    className="w-full bg-surface-container-lowest dark:bg-[#161c2d] border border-outline-variant/50 dark:border-slate-700/80 text-on-surface dark:text-white rounded px-4 py-2.5 font-body-md text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-professional-blue dark:focus:border-primary-fixed-dim transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="block font-label-sm text-[11px] font-bold text-on-surface-variant dark:text-gray-400 uppercase tracking-widest">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 000-0000"
                    className="w-full bg-surface-container-lowest dark:bg-[#161c2d] border border-outline-variant/50 dark:border-slate-700/80 text-on-surface dark:text-white rounded px-4 py-2.5 font-body-md text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-professional-blue dark:focus:border-primary-fixed-dim transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="interest" className="block font-label-sm text-[11px] font-bold text-on-surface-variant dark:text-gray-400 uppercase tracking-widest">
                  Primary Interest
                </label>
                <div className="relative">
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    required
                    className="w-full appearance-none bg-surface-container-lowest dark:bg-[#161c2d] border border-outline-variant/50 dark:border-slate-700/80 text-on-surface dark:text-white rounded px-4 py-2.5 font-body-md text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-professional-blue dark:focus:border-primary-fixed-dim transition-all pr-10"
                  >
                    <option value="" disabled>Select a technical service...</option>
                    <option value="camera">Camera Installation</option>
                    <option value="support">IT Support</option>
                    <option value="network">Network Installation</option>
                    <option value="web">Web-Site Development</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-on-surface-variant dark:text-gray-400">
                    <span className="material-symbols-outlined text-[20px]">expand_more</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="details" className="block font-label-sm text-[11px] font-bold text-on-surface-variant dark:text-gray-400 uppercase tracking-widest">
                  Project Details
                </label>
                <textarea
                  id="details"
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your infrastructure goals..."
                  required
                  className="w-full bg-surface-container-lowest dark:bg-[#161c2d] border border-outline-variant/50 dark:border-slate-700/80 text-on-surface dark:text-white rounded px-4 py-3 font-body-md text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-professional-blue dark:focus:border-primary-fixed-dim transition-all resize-y"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-primary hover:opacity-90 text-on-primary dark:bg-primary-fixed-dim dark:text-on-primary-fixed font-semibold px-6 py-2.5 rounded text-[13px] transition-all shadow-sm flex items-center gap-2"
                >
                  Submit Inquiry
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>

            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
