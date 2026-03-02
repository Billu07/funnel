import { motion } from "framer-motion";

/**
 * ProblemsSection Component
 * 
 * Design Philosophy: Modern, Bold B2B SaaS with Personal Touch
 * - Three problem cards with professional icons
 * - Brand accent colors (red for urgency, blue for highlights)
 * - Smooth hover animations and transitions
 * - Responsive 3-column grid layout
 * - Strategic typography hierarchy
 * - Consistent with hero section aesthetic
 * - Flows seamlessly into next section
 */

interface Problem {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const problems: Problem[] = [
  {
    id: "burnout",
    number: "01",
    title: "Agent Burnout",
    description:
      "Frustration grows when top talent is forced to dial for hours without a single meaningful connection.",
    icon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663292946022/6qHHoDcVYXYWiN6jgpme4z/icon-burnout-6iBeMsZMwqiG4t2cMRDFgV.webp",
    color: "from-red-50 to-red-100",
  },
  {
    id: "guesswork",
    number: "02",
    title: "Expensive Guesswork",
    description:
      "Scaling a brokerage without verified intent data is an expensive gamble with your marketing budget.",
    icon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663292946022/6qHHoDcVYXYWiN6jgpme4z/icon-guesswork-acxpqzfQAtWMeqiy3KnBcM.webp",
    color: "from-orange-50 to-orange-100",
  },
  {
    id: "decay",
    number: "03",
    title: "Lead Decay",
    description:
      "Opportunities rot when they aren't contacted immediately. Speed to lead is the only metric that matters.",
    icon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663292946022/6qHHoDcVYXYWiN6jgpme4z/icon-lead-decay-6iBeMsZMwqiG4t2cMRDFgV.webp",
    color: "from-red-50 to-pink-100",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function ProblemsSection( ) {
  return (
    <section className="w-full pt-24 lg:pt-32 pb-12 lg:pb-16 bg-white relative overflow-hidden">
      {/* Decorative Left Accent - Brick Pattern */}
      <img
        src="https://d2xsxph8kpxj0f.cloudfront.net/310519663063245286/4NbDCkjGg5zEcuxt8PVxUE/svg-accent-brick-pattern-5Zc85zQmGUB8whjirStcYx.webp"
        alt="Decorative brick pattern"
        className="absolute top-0 -left-10 opacity-30 pointer-events-none z-0 w-64 h-64 md:w-96 md:h-96 animate-[breathe_7s_ease-in-out_infinite_alternate]"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20 lg:mb-24"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm lg:text-base font-semibold text-red-600 uppercase tracking-wider mb-3">
            The Core Challenge
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            Real estate teams dial{" "}
            <span className="text-blue-600">50+ numbers</span> to find just{" "}
            <span className="text-red-600">3 prospects</span>
          </h2>
        </motion.div>

        {/* Problems Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {problems.map((problem) => (
            <motion.div
              key={problem.id}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className={`group relative bg-gradient-to-br ${problem.color} rounded-2xl p-8 lg:p-12 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden`}
            >
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-3 rounded-full -mr-20 -mt-20 group-hover:scale-125 transition-transform duration-700" />

              {/* Problem Number */}
              <div className="relative z-10 mb-8">
                <span className="text-6xl lg:text-7xl font-bold text-gray-150 group-hover:text-gray-200 transition-colors duration-300">
                  {problem.number}
                </span>
              </div>

              {/* Icon */}
              <div className="relative z-10 mb-10 h-20 lg:h-24 flex items-center">
                <img
                  src={problem.icon}
                  alt={problem.title}
                  className="h-full w-auto object-contain opacity-85 group-hover:opacity-95 transition-opacity duration-300"
                />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">
                  {problem.title}
                </h3>
                <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                  {problem.description}
                </p>
              </div>

              {/* Subtle accent line */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-red-500 to-transparent transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Subtle spacing divider */}
        <div className="mt-12 lg:mt-16 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>
    </section>
  );
}