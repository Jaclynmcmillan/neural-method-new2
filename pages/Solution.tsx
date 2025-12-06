import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Palette, Layers, Code, Smartphone, Cpu, Workflow, Briefcase, ArrowRight, CheckCircle2, Zap, Layout as LayoutIcon, ExternalLink } from 'lucide-react';
import Button from '../components/Button';

// Solution Data
const solutionsData: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  features: string[];
  process: { title: string; desc: string }[];
  featuredWork?: {
    title: string;
    description: string;
    image: string;
    link: string;
  };
}> = {
  'brand-identity': {
    title: 'Brand Identity',
    subtitle: 'Visual Systems That Define Authority',
    description: 'We build cohesive, adaptable brand identities that communicate your core values instantly. From logo design to comprehensive visual guidelines, we ensure your brand stands out in a crowded digital landscape.',
    icon: Palette,
    features: [
      'Strategic Logo Design',
      'Typography & Color Systems',
      'Brand Voice & Tone Guidelines',
      'Marketing Collateral',
      'Design Systems for UI/UX'
    ],
    process: [
      { title: 'Discovery', desc: 'Deep dive into your market, competitors, and core values.' },
      { title: 'Concept', desc: 'Exploration of visual directions and metaphors.' },
      { title: 'Refinement', desc: 'Polishing the chosen direction into a scalable system.' },
      { title: 'Delivery', desc: 'Handover of all assets and usage guidelines.' }
    ]
  },
  'web-design': {
    title: 'Web Design',
    subtitle: 'Immersive Digital Experiences',
    description: 'We design high-converting landing pages and marketing sites that merge aesthetics with usability. Our designs are built to engage users, reduce bounce rates, and drive clear action.',
    icon: LayoutIcon,
    features: [
      'High-Fidelity UI/UX Design',
      'Interactive Prototyping',
      'Conversion Rate Optimization',
      'Responsive Layouts',
      'Micro-animations & Interactions'
    ],
    process: [
      { title: 'Wireframing', desc: 'Structuring the user journey and information architecture.' },
      { title: 'Visual Design', desc: 'Applying brand aesthetics with modern UI trends.' },
      { title: 'Interaction', desc: 'Adding motion and behavior to bring the interface to life.' },
      { title: 'Handoff', desc: 'Pixel-perfect specs for development teams.' }
    ],
    featuredWork: {
      title: "Vanguard Architecture Portfolio",
      description: "A minimal, high-impact portfolio site for an award-winning architecture firm, featuring immersive WebGL transitions and a custom CMS.",
      image: "https://picsum.photos/1600/900?random=1",
      link: "#"
    }
  },
  'web-app-development': {
    title: 'Web App Development',
    subtitle: 'Scalable Full-Stack Engineering',
    description: 'We engineer robust, scalable web applications using modern stacks like React, TypeScript, and Node.js. Our focus is on performance, security, and maintainability.',
    icon: Code,
    features: [
      'Single Page Applications (SPA)',
      'SaaS Platform Development',
      'API Development & Integration',
      'Real-time Functionality',
      'Cloud Infrastructure Setup'
    ],
    process: [
      { title: 'Architecture', desc: 'Defining the tech stack and database schema.' },
      { title: 'Development', desc: 'Agile sprints with regular code reviews.' },
      { title: 'Testing', desc: 'Automated and manual testing for bug-free deployment.' },
      { title: 'Launch', desc: 'CI/CD pipeline setup and production release.' }
    ],
    featuredWork: {
      title: "FinStream Analytics Dashboard",
      description: "A real-time financial data visualization platform handling millions of data points with sub-second latency.",
      image: "https://picsum.photos/1600/900?random=2",
      link: "#"
    }
  },
  'app-development': {
    title: 'App Development',
    subtitle: 'Native & Cross-Platform Solutions',
    description: 'We build high-performance mobile applications for iOS and Android. Whether native or cross-platform, we ensure a seamless, native-feeling experience for your users.',
    icon: Smartphone,
    features: [
      'React Native / Flutter Development',
      'Native iOS (Swift) & Android (Kotlin)',
      'App Store Optimization',
      'Offline Functionality',
      'Push Notifications & Analytics'
    ],
    process: [
      { title: 'UX Mobile Strategy', desc: 'Optimizing flows for touch interfaces.' },
      { title: 'Development', desc: 'Building the app with performance in mind.' },
      { title: 'Beta Testing', desc: 'Testflight/Play Console distribution for feedback.' },
      { title: 'Publishing', desc: 'Handling submission and approval processes.' }
    ],
    featuredWork: {
      title: "Aura Health Companion",
      description: "A cross-platform wellness application with biometric integration, personalized AI coaching, and social features.",
      image: "https://picsum.photos/1600/900?random=3",
      link: "#"
    }
  },
  'custom-ai-platform': {
    title: 'Custom AI Platform',
    subtitle: 'Intelligence Tailored to Your Data',
    description: 'We develop bespoke AI platforms that leverage your unique data to solve specific business problems. From predictive analytics to generative content engines, we build secure, private AI infrastructure.',
    icon: Cpu,
    features: [
      'Custom LLM Fine-tuning',
      'RAG (Retrieval-Augmented Generation)',
      'Secure Data Pipelines',
      'Internal AI Tools & Dashboards',
      'Enterprise-grade Security'
    ],
    process: [
      { title: 'Data Audit', desc: 'Assessing your data readiness and quality.' },
      { title: 'Model Selection', desc: 'Choosing the right foundation models for the task.' },
      { title: 'Integration', desc: 'Embedding the AI into your existing workflows.' },
      { title: 'Optimization', desc: 'Continuous learning and performance tuning.' }
    ]
  },
  'ai-integrations': {
    title: 'AI Integrations',
    subtitle: 'Automate & Accelerate',
    description: 'We integrate powerful AI capabilities into your existing software ecosystem. Automate repetitive tasks, enhance customer support with chatbots, and unlock insights from your unstructured data.',
    icon: Workflow,
    features: [
      'Intelligent Chatbots & Assistants',
      'Workflow Automation Agents',
      'Voice & Image Processing',
      'CRM & ERP AI Augmentation',
      'API-first Integration'
    ],
    process: [
      { title: 'Opportunity Map', desc: 'Identifying high-ROI automation targets.' },
      { title: 'Prototyping', desc: 'Quick proof-of-concept implementation.' },
      { title: 'Deployment', desc: 'Rolling out integration with monitoring.' },
      { title: 'Scaling', desc: 'Expanding capabilities based on usage data.' }
    ]
  },
  'fractional-talent': {
    title: 'Fractional Talent',
    subtitle: 'On-Demand Senior Expertise',
    description: 'Access top-tier engineering and AI talent without the overhead of full-time hires. Our fractional experts integrate seamlessly with your team to lead projects, audit code, or accelerate roadmaps.',
    icon: Briefcase,
    features: [
      'Senior Full-Stack Engineers',
      'AI/ML Specialists',
      'Product Managers & Designers',
      'Technical Leadership (CTO-as-a-Service)',
      'Code Audits & Architecture Reviews'
    ],
    process: [
      { title: 'Needs Assessment', desc: 'Understanding your technical gaps.' },
      { title: 'Matching', desc: 'Pairing you with the right expert for the job.' },
      { title: 'Onboarding', desc: 'Rapid integration into your communication channels.' },
      { title: 'Execution', desc: 'Immediate impact on your deliverables.' }
    ]
  },
};

const Solution: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Scroll to top on mount/change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!slug || !solutionsData[slug]) {
    return <Navigate to="/" replace />;
  }

  const data = solutionsData[slug];
  const Icon = data.icon;

  return (
    <div className="bg-primary min-h-screen">
      {/* Hero */}
      <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 border-b border-secondary/50 overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-3 bg-secondary/50 rounded-xl mb-6 text-accent border border-white/5 shadow-lg">
              <Icon className="w-8 h-8" />
            </div>
            <h1 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              {data.title}
            </h1>
            <p className="font-montserrat font-medium text-lg md:text-2xl text-accent mb-6">
              {data.subtitle}
            </p>
            <p className="text-base sm:text-lg text-neutral-light/80 leading-relaxed max-w-2xl mx-auto mb-8">
              {data.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" fullWidth className="sm:w-auto">Start a Project</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Section - Only renders if featuredWork exists */}
      {data.featuredWork && (
        <section className="py-24 bg-secondary/20 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-montserrat font-bold text-3xl text-white mb-12 flex items-center gap-3">
              <Briefcase className="w-6 h-6 text-accent" />
              Featured Project
            </h2>
            
            <a 
              href={data.featuredWork.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative block rounded-2xl overflow-hidden border border-white/5 hover:border-accent/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-60 z-10 transition-opacity duration-300 group-hover:opacity-40"></div>
              
              <img 
                src={data.featuredWork.image} 
                alt={data.featuredWork.title} 
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              
              <div className="absolute bottom-0 left-0 p-6 md:p-12 z-20 w-full">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-accent text-primary text-xs font-bold uppercase tracking-wider mb-4">
                      Recent Work
                    </span>
                    <h3 className="font-montserrat font-bold text-2xl md:text-4xl text-white mb-3 group-hover:text-accent transition-colors">
                      {data.featuredWork.title}
                    </h3>
                    <p className="text-base md:text-lg text-neutral-light/90 max-w-2xl">
                      {data.featuredWork.description}
                    </p>
                  </div>
                  
                  <div className="hidden md:flex bg-white/10 backdrop-blur-md p-4 rounded-full text-white group-hover:bg-accent group-hover:text-primary transition-all duration-300 shrink-0">
                    <ExternalLink className="w-8 h-8" />
                  </div>
                </div>
              </div>
            </a>
            
            <p className="text-center text-neutral-light/50 text-sm mt-6">
              * Click the image to view the live project.
            </p>
          </div>
        </section>
      )}

      {/* Features & Process */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Features */}
            <div>
              <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-white mb-8 flex items-center gap-3">
                <Zap className="w-6 h-6 text-accent" />
                Capabilities
              </h2>
              <div className="grid gap-4">
                {data.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30 border border-white/5 hover:border-accent/30 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <span className="text-neutral-light font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div>
              <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-white mb-8 flex items-center gap-3">
                <Layers className="w-6 h-6 text-accent" />
                Our Process
              </h2>
              <div className="space-y-8 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-secondary">
                {data.process.map((step, idx) => (
                  <div key={idx} className="relative pl-12">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-primary border-2 border-accent text-accent flex items-center justify-center font-bold text-sm z-10">
                      {idx + 1}
                    </div>
                    <h3 className="font-montserrat font-bold text-xl text-white mb-2">{step.title}</h3>
                    <p className="text-neutral-light/60">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary/30 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-montserrat font-bold text-2xl sm:text-3xl text-white mb-6">Ready to scale your vision?</h2>
          <p className="text-lg text-neutral-light/70 mb-8">
            Let's discuss how our {data.title.toLowerCase()} expertise can accelerate your growth.
          </p>
          <Link to="/contact">
            <Button size="lg" className="w-full sm:w-auto">
              Get in Touch <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Solution;
