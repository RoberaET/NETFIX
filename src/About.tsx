import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Animated counter hook
function useCounter(end: number, duration: number = 2000, suffix: string = '') {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!isInView || !ref.current) return
    let startTime: number | null = null
    const startVal = 0

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out-cubic
      const current = Math.floor(eased * (end - startVal) + startVal)

      if (ref.current) {
        ref.current.textContent = current + suffix
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else if (ref.current) {
        ref.current.textContent = end + suffix
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, end, duration, suffix])

  return ref
}

// Stats component
function StatCard({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const countRef = useCounter(value, 2000, suffix)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center justify-center py-8 px-6 border border-outline-variant/40 rounded-lg bg-surface-container-lowest"
    >
      <span
        ref={countRef}
        className="font-display-lg text-4xl md:text-5xl font-bold text-primary dark:text-primary-fixed-dim"
      >
        0{suffix}
      </span>
      <span className="font-label-sm text-xs uppercase tracking-widest text-on-surface-variant dark:text-gray-400 mt-2 text-center">
        {label}
      </span>
    </motion.div>
  )
}

// Team member card
function TeamCard({
  name,
  role,
  bio,
  initials,
  delay
}: {
  name: string
  role: string
  bio: string
  initials: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className="bg-surface-container-lowest dark:bg-[#161c2d] border border-soft-blue-gray/10 dark:border-slate-800 rounded-lg p-6 flex flex-col items-center text-center group"
    >
      {/* Avatar */}
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-container to-primary/20 dark:from-primary-fixed-dim/20 dark:to-lime-900/30 flex items-center justify-center mb-4 text-primary dark:text-primary-fixed-dim font-display-lg font-bold text-xl ring-4 ring-primary/10 dark:ring-primary-fixed-dim/10 group-hover:ring-primary/25 transition-all duration-300">
        {initials}
      </div>
      <h3 className="font-headline-md text-lg font-bold text-on-surface dark:text-white">{name}</h3>
      <span className="font-label-sm text-xs uppercase tracking-widest text-primary dark:text-primary-fixed-dim mt-1 mb-3">
        {role}
      </span>
      <p className="font-body-md text-sm text-on-surface-variant dark:text-gray-400 leading-relaxed">{bio}</p>
    </motion.div>
  )
}

// Value proposition card
function ValueCard({
  icon,
  title,
  description,
  delay
}: {
  icon: string
  title: string
  description: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -3, boxShadow: '0 20px 40px -15px rgba(68,105,0,0.10)' }}
      className="bg-surface-container-lowest dark:bg-[#161c2d] border border-soft-blue-gray/10 dark:border-slate-800 rounded-lg p-6 flex flex-col gap-4 transition-all duration-300"
    >
      <div className="w-12 h-12 bg-light-gray dark:bg-slate-800 rounded-lg flex items-center justify-center text-primary dark:text-primary-fixed-dim">
        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          {icon}
        </span>
      </div>
      <h3 className="font-body-lg text-lg font-bold text-on-surface dark:text-white">{title}</h3>
      <p className="font-body-md text-sm text-on-surface-variant dark:text-gray-400 leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}

export default function About() {
  return (
    <div className="flex flex-col">

      {/* Hero Section */}
      <section className="relative pt-16 md:pt-24 pb-16 md:pb-20 overflow-hidden bg-gradient-to-b from-[#ffffff] to-[#f8fafc] dark:from-[#0b0f19] dark:to-[#0f172a] transition-colors duration-500">
        <div className="absolute inset-0 circuit-bg opacity-30 dark:opacity-10 pointer-events-none" />

        <div className="max-w-container-max mx-auto px-gutter relative z-10 text-center">
          {/* Kicker */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary-fixed-dim/10 border border-primary/20 dark:border-primary-fixed-dim/20 mb-6"
          >
            <span className="font-label-sm text-xs uppercase tracking-widest font-bold text-primary dark:text-primary-fixed-dim">
              Our Mission
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display-lg text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface dark:text-white tracking-tight leading-tight max-w-3xl mx-auto"
          >
            Empowering SMEs through{' '}
            <span className="bg-gradient-to-r from-primary to-lime-600 dark:from-primary-fixed-dim dark:to-lime-400 bg-clip-text text-transparent">
              elite technical partnership.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-body-lg text-lg text-on-surface-variant dark:text-gray-300 max-w-2xl mx-auto mt-6 leading-relaxed"
          >
            We bridge the gap between complex IT infrastructure and business growth,
            providing scalable, secure, and robust solutions designed for the modern enterprise.
          </motion.p>
        </div>
      </section>

      {/* Team Photo */}
      <section className="py-10 md:py-16 bg-surface-container-low dark:bg-[#0f1422]">
        <div className="max-w-container-max mx-auto px-gutter">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-xl overflow-hidden border border-outline-variant/30 dark:border-slate-800 shadow-xl"
          >
            <img
              src="/team.png"
              alt="NETFIX IT Solution team collaborating"
              className="w-full h-auto max-h-[500px] object-cover object-center"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-surface dark:bg-[#0b0f19] transition-colors duration-500">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <StatCard value={10} suffix="+" label="Years Experience" delay={0} />
            <StatCard value={500} suffix="+" label="Projects Delivered" delay={0.1} />
            <StatCard value={99.9} suffix="%" label="Uptime Guaranteed" delay={0.2} />
          </div>
        </div>
      </section>

      {/* Why Choose NETFIX */}
      <section className="py-20 md:py-28 bg-surface-container-low dark:bg-[#0f1422] transition-colors duration-500">
        <div className="max-w-container-max mx-auto px-gutter">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-left"
          >
            <h2 className="font-headline-md text-3xl md:text-4xl font-bold text-on-surface dark:text-white tracking-tight">
              Why Choose NETFIX
            </h2>
            <div className="w-14 h-1 bg-primary dark:bg-primary-fixed-dim rounded-full mt-4" />
            <p className="font-body-lg text-lg text-on-surface-variant dark:text-gray-300 mt-4 max-w-xl leading-relaxed">
              We don't just fix problems; we architect solutions that drive your business forward
              with unwavering reliability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ValueCard
              icon="verified_user"
              title="Absolute Reliability"
              description="Enterprise-grade security and redundancy ensure your operations run seamlessly, 24/7/365. Our infrastructure is built to the highest standards of resilience."
              delay={0}
            />
            <ValueCard
              icon="school"
              title="Elite Expertise"
              description="Our certified engineers bring decades of specialized knowledge in network architecture, cloud infrastructure, and cybersecurity to every engagement."
              delay={0.1}
            />
            <ValueCard
              icon="support_agent"
              title="Proactive Support"
              description="We monitor, detect, and resolve issues before they impact your business, acting as an extension of your team with guaranteed SLA-backed response times."
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 md:py-28 bg-surface dark:bg-[#0b0f19] transition-colors duration-500">
        <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Story text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-left"
          >
            <div>
              <span className="font-label-sm text-xs uppercase tracking-widest text-primary dark:text-primary-fixed-dim font-bold">
                Our Story
              </span>
              <h2 className="font-headline-md text-3xl md:text-4xl font-bold text-on-surface dark:text-white tracking-tight mt-2">
                Founded on a mission to level the playing field.
              </h2>
            </div>

            <p className="font-body-lg text-base text-on-surface-variant dark:text-gray-300 leading-relaxed">
              NETFIX IT SOLUTION was founded with a single, clear goal: to give small and medium enterprises access
              to the same enterprise-grade IT infrastructure as Fortune 500 companies — at a fraction of the cost.
            </p>
            <p className="font-body-md text-sm text-on-surface-variant dark:text-gray-400 leading-relaxed">
              Too often, SMEs are left behind by IT providers who focus only on large corporations. We saw this gap
              and built a team of elite engineers, architects, and support specialists dedicated entirely to helping
              growing businesses thrive in a digital-first world.
            </p>

            {/* Values list */}
            <ul className="space-y-3 pt-2">
              {[
                'Client-first approach in everything we do',
                'Transparency and clear communication',
                'Continuous innovation and skill development',
                'Accountability backed by iron-clad SLAs'
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.4 }}
                  className="flex items-start gap-3 text-sm text-on-surface-variant dark:text-gray-300"
                >
                  <span
                    className="material-symbols-outlined text-primary dark:text-primary-fixed-dim text-lg mt-0.5 shrink-0"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Decorative metric card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-primary-container/10 dark:bg-primary-fixed-dim/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-sm space-y-4">
              {/* Timeline milestones */}
              {[
                { year: '2014', event: 'Founded in Addis Ababa, serving 5 local SMEs' },
                { year: '2017', event: 'Expanded to 50+ clients across East Africa' },
                { year: '2020', event: 'Launched 24/7 managed IT support offering' },
                { year: '2024', event: '500+ projects delivered, 99.9% uptime maintained' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.4 }}
                  className="flex gap-4 items-start bg-surface-container-lowest dark:bg-[#161c2d] border border-outline-variant/20 dark:border-slate-800 rounded-lg px-5 py-4"
                >
                  <span className="font-label-sm text-xs font-bold text-primary dark:text-primary-fixed-dim pt-0.5 whitespace-nowrap">
                    {item.year}
                  </span>
                  <span className="font-body-md text-sm text-on-surface-variant dark:text-gray-300 leading-relaxed">
                    {item.event}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-28 bg-surface-container-low dark:bg-[#0f1422] transition-colors duration-500">
        <div className="max-w-container-max mx-auto px-gutter">

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-headline-md text-3xl md:text-4xl font-bold text-on-surface dark:text-white tracking-tight">
              Meet the Team
            </h2>
            <div className="w-14 h-1 bg-primary dark:bg-primary-fixed-dim rounded-full mt-4 mx-auto" />
            <p className="font-body-lg text-lg text-on-surface-variant dark:text-gray-300 max-w-xl mx-auto mt-4 leading-relaxed">
              A collective of certified engineers, architects, and strategists — each bringing elite expertise to your infrastructure.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <TeamCard
              initials="AK"
              name="Abebe Kebede"
              role="Founder & CTO"
              bio="10+ years in enterprise network architecture and cybersecurity. Cisco CCIE certified."
              delay={0}
            />
            <TeamCard
              initials="ST"
              name="Sara Tekeste"
              role="Head of IT Support"
              bio="Expert in managed services and SLA management. Dedicated to zero-downtime operations."
              delay={0.1}
            />
            <TeamCard
              initials="DM"
              name="Dawit Mulugeta"
              role="Lead Network Engineer"
              bio="Specialist in structured cabling, SD-WAN deployments, and enterprise Wi-Fi design."
              delay={0.2}
            />
            <TeamCard
              initials="HG"
              name="Hana Girma"
              role="Web Solutions Lead"
              bio="Full-stack developer with expertise in React, Node.js, and scalable cloud architecture."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 md:py-24 bg-surface dark:bg-[#0b0f19] transition-colors duration-500">
        <div className="max-w-container-max mx-auto px-gutter">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-primary to-lime-600 dark:from-primary dark:to-lime-700 rounded-2xl p-12 md:p-16 text-center relative overflow-hidden"
          >
            {/* Decorative dots pattern */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            />
            <div className="relative z-10 space-y-6">
              <h2 className="font-display-lg text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Ready to upgrade your IT infrastructure?
              </h2>
              <p className="font-body-lg text-lg text-white/80 max-w-xl mx-auto">
                Get a free consultation with our engineering team and discover how NETFIX can transform your operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href="/"
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-surface-container-lowest transition-all duration-300 shadow-md"
                >
                  Get a Free Quote
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href="/"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  View Our Services
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
