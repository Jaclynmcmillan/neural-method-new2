import React, { useState } from 'react';
import { Facebook, Linkedin, Instagram, MapPin, Clock, Phone, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Button from './Button';
import Logo from './Logo';
import { ContactFormData } from '../types';

const Footer: React.FC = () => {
  const location = useLocation();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    projectDetails: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Hide footer completely on Contact page
  if (location.pathname === '/contact') {
    return null;
  }

  // Determine page type for conditional rendering
  const isSolutionsPage = location.pathname.startsWith('/solutions/');
  const isAboutPage = location.pathname === '/about';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Prepare JSON payload as requested
    const payload = {
      name: formData.name,
      email: formData.email,
      business: formData.company,
      message: formData.projectDetails
    };

    console.log("Footer Form Submission Payload:", JSON.stringify(payload, null, 2));

    try {
      // Simulate backend API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockResponse = { emailSent: true, message: "Email sent successfully" };

      if (mockResponse.emailSent) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', company: '', projectDetails: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contact" className="bg-primary pt-16 border-t border-secondary scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content - Hidden on Solutions Pages */}
        {!isSolutionsPage && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-16">
            
            {/* Left Column - Contact Form */}
            {/* On About page, this spans full width since info column is hidden */}
            <div className={`bg-secondary/50 p-8 rounded-2xl border border-white/5 ${isAboutPage ? 'mx-auto lg:col-span-2 max-w-2xl w-full' : ''}`}>
              {submitStatus !== 'success' && (
                <>
                  <h3 className="font-montserrat text-2xl font-bold text-white mb-2">Start Your Project</h3>
                  <p className="text-neutral-light/70 mb-6 text-sm">Tell us about your vision. We'll help you build it.</p>
                </>
              )}
              
              {submitStatus === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-fade-in">
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-2">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Message Sent</h3>
                  <p className="text-neutral-light/80 text-sm">
                    Thanks, your message has been sent. I’ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {submitStatus === 'error' && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>Something went wrong. Please try again.</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="footer-name" className="block text-xs font-semibold text-neutral-light/60 uppercase tracking-wider mb-1">Name</label>
                      <input
                        type="text"
                        id="footer-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full bg-primary border border-secondary text-white px-4 py-3 rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors placeholder-neutral-light/30 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="footer-email" className="block text-xs font-semibold text-neutral-light/60 uppercase tracking-wider mb-1">Email</label>
                      <input
                        type="email"
                        id="footer-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full bg-primary border border-secondary text-white px-4 py-3 rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors placeholder-neutral-light/30 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="footer-company" className="block text-xs font-semibold text-neutral-light/60 uppercase tracking-wider mb-1">Company</label>
                    <input
                      type="text"
                      id="footer-company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full bg-primary border border-secondary text-white px-4 py-3 rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors placeholder-neutral-light/30 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Company Name Ltd."
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="footer-projectDetails" className="block text-xs font-semibold text-neutral-light/60 uppercase tracking-wider mb-1">Project Details</label>
                    <textarea
                      id="footer-projectDetails"
                      name="projectDetails"
                      value={formData.projectDetails}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      rows={4}
                      className="w-full bg-primary border border-secondary text-white px-4 py-3 rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors placeholder-neutral-light/30 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="How can we help you scale?"
                    ></textarea>
                  </div>

                  <Button type="submit" fullWidth disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...
                      </span>
                    ) : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>

            {/* Right Column - Info */}
            {/* Hidden on About Page */}
            {!isAboutPage && (
              <div className="flex flex-col justify-between h-full py-4">
                <div>
                  <div className="flex items-center space-x-3 mb-8">
                    <Logo className="w-8 h-8" />
                    <span className="font-montserrat font-bold text-xl tracking-tight text-white">Neural Method</span>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4 group">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-colors">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-sm">Headquarters</h4>
                        <p className="text-neutral-light/60 text-sm mt-1">100 Innovation Drive, Suite 500<br/>San Francisco, CA 94105</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 group">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-colors">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-sm">Office Hours</h4>
                        <p className="text-neutral-light/60 text-sm mt-1">Mon - Fri: 9:00 AM - 6:00 PM PST</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 group">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-colors">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-sm">Contact</h4>
                        <p className="text-neutral-light/60 text-sm mt-1">+1 (555) 123-4567<br/>hello@neuralmethod.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <h5 className="font-montserrat font-bold text-white mb-4">Connect</h5>
                  <div className="flex space-x-4">
                    <a href="https://www.linkedin.com/company/109965142/admin/dashboard/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-secondary flex items-center justify-center text-neutral-light hover:border-accent hover:text-accent hover:shadow-[0_0_15px_rgba(56,182,255,0.3)] transition-all">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="https://x.com/NeuralMethod" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-secondary flex items-center justify-center text-neutral-light hover:border-accent hover:text-accent hover:shadow-[0_0_15px_rgba(56,182,255,0.3)] transition-all">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    <a href="https://www.instagram.com/neuralmethod.ai/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-secondary flex items-center justify-center text-neutral-light hover:border-accent hover:text-accent hover:shadow-[0_0_15px_rgba(56,182,255,0.3)] transition-all">
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=61583954945549" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-secondary flex items-center justify-center text-neutral-light hover:border-accent hover:text-accent hover:shadow-[0_0_15px_rgba(56,182,255,0.3)] transition-all">
                      <Facebook className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bottom Bar */}
        <div className="border-t border-secondary py-8 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-light/40">
          <p>© {new Date().getFullYear()} Neural Method. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
