'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type FormState = 'idle' | 'sending' | 'success' | 'error';

const inputBase =
  'w-full bg-white/[0.04] border border-white/10 text-white placeholder-gray-600 font-sans text-sm px-5 py-4 rounded-sm focus:outline-none focus:border-amberGold/60 focus:bg-white/[0.07] transition-all duration-300 resize-none';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (data: FormData) => {
    const e: Record<string, string> = {};
    if (!data.get('name')?.toString().trim()) e.name = 'Name is required.';
    const email = data.get('email')?.toString().trim() ?? '';
    if (!email) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email address.';
    if (!data.get('subject')?.toString().trim()) e.subject = 'Subject is required.';
    if (!data.get('message')?.toString().trim()) e.message = 'Message is required.';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const errs = validate(data);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setFormState('sending');

    // Build mailto link as fallback — opens default email client
    // For a real send, replace with your API endpoint or emailjs/formspree integration
    const name = data.get('name');
    const email = data.get('email');
    const subject = data.get('subject');
    const message = data.get('message');
    const emailAddress = "barclaygabrielsickgamer@gmail.com"

    const body = `From: ${name} <${email}>\n\n${message}`;
    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject as string)}&body=${encodeURIComponent(body)}`;

    // Simulate async (replace with real fetch to API if needed)
    await new Promise((r) => setTimeout(r, 800));
    window.open(mailtoLink, '_blank');
    setFormState('success');
    formRef.current?.reset();
    setTimeout(() => setFormState('idle'), 5000);
  };

  const fieldError = (name: string) =>
    errors[name] ? (
      <p className="mt-1.5 text-xs font-sans text-red-400/80">{errors[name]}</p>
    ) : null;

  return (
    <section id="contact" className="relative w-full py-32 px-4 sm:px-8 lg:px-24 bg-void border-t border-white/5 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amberGold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <span className="font-sans text-xs tracking-[0.3em] text-amberGold uppercase mb-4 block">
            Acquisitions &amp; Inquiries
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl text-white mb-6">Contact the Artist</h2>
          <p className="font-sans text-gray-400 text-sm sm:text-base leading-relaxed font-light max-w-2xl mx-auto">
            For private viewings, commission requests, or inquiries about available works — reach out below. All messages are answered personally.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left — info panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-2 flex flex-col gap-8"
          >
            <div className="glass-panel p-8 rounded-sm">
              <h3 className="font-serif text-xl text-white mb-6">Artist Details</h3>
              <ul className="flex flex-col gap-6">
                <li className="flex items-start gap-4">
                  <span className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-full bg-amberGold/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-amberGold" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-sans text-xs uppercase tracking-widest text-amberGold/70 mb-1">Email</p>
                    <a href="mailto:inquiries@gabrielbarclay.com" className="font-sans text-sm text-gray-300 hover:text-white transition-colors">
                     barclaygabrielsickgamer@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="#25D366" className="w-4 h-4">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </span>
                  <div>
                    <p className="font-sans text-xs uppercase tracking-widest text-[#25D366]/70 mb-1">WhatsApp</p>
                    <a
                      href="https://wa.me/231880158739"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-sm text-gray-300 hover:text-[#25D366] transition-colors"
                    >
                      +231 880 158 739
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-full bg-amberGold/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-amberGold" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-sans text-xs uppercase tracking-widest text-amberGold/70 mb-1">Response Time</p>
                    <p className="font-sans text-sm text-gray-300">Within 24–48 hours</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* WhatsApp CTA card */}
            <a
              href="https://wa.me/231880158739?text=Hello!%20I%20am%20inquiring%20about%20an%20acquisition%20from%20the%20atelier."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 glass-panel p-6 rounded-sm border border-[#25D366]/20 hover:border-[#25D366]/50 hover:bg-[#25D366]/5 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(37,211,102,0.3)] group-hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] transition-shadow">
                <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <p className="font-sans text-sm text-white font-medium group-hover:text-[#25D366] transition-colors">Chat on WhatsApp</p>
                <p className="font-sans text-xs text-gray-500 mt-0.5">Fastest way to reach the artist</p>
              </div>
              <svg className="w-4 h-4 text-gray-600 group-hover:text-[#25D366] ml-auto transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="glass-panel p-8 sm:p-10 rounded-sm relative overflow-hidden">
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-amberGold/20 rounded-sm pointer-events-none" />

              <h3 className="font-serif text-2xl text-white mb-8">Send a Message</h3>

              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 gap-5 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-amberGold/10 border border-amberGold/30 flex items-center justify-center">
                      <svg className="w-8 h-8 text-amberGold" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-serif text-xl text-white mb-2">Message Sent</p>
                      <p className="font-sans text-sm text-gray-400">Thank you for reaching out. Your email client should have opened. We will be in touch shortly.</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    noValidate
                  >
                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="contact-name" className="block font-sans text-xs uppercase tracking-widest text-gray-500 mb-2">
                          Name <span className="text-amberGold">*</span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          placeholder="Your full name"
                          className={inputBase}
                          onChange={() => setErrors((p) => ({ ...p, name: '' }))}
                        />
                        {fieldError('name')}
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="block font-sans text-xs uppercase tracking-widest text-gray-500 mb-2">
                          Email <span className="text-amberGold">*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          placeholder="you@example.com"
                          className={inputBase}
                          onChange={() => setErrors((p) => ({ ...p, email: '' }))}
                        />
                        {fieldError('email')}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="contact-subject" className="block font-sans text-xs uppercase tracking-widest text-gray-500 mb-2">
                        Subject <span className="text-amberGold">*</span>
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        name="subject"
                        placeholder="Commission request / Acquisition inquiry…"
                        className={inputBase}
                        onChange={() => setErrors((p) => ({ ...p, subject: '' }))}
                      />
                      {fieldError('subject')}
                    </div>

                    {/* Inquiry type */}
                    <div>
                      <label htmlFor="contact-type" className="block font-sans text-xs uppercase tracking-widest text-gray-500 mb-2">
                        Inquiry Type
                      </label>
                      <select
                        id="contact-type"
                        name="type"
                        className={`${inputBase} appearance-none cursor-pointer`}
                        defaultValue=""
                      >
                        <option value="" disabled className="bg-[#0B0B0C] text-gray-500">Select an option</option>
                        <option value="acquisition" className="bg-[#0B0B0C]">Artwork Acquisition</option>
                        <option value="commission" className="bg-[#0B0B0C]">Custom Commission</option>
                        <option value="viewing" className="bg-[#0B0B0C]">Private Viewing</option>
                        <option value="curation" className="bg-[#0B0B0C]">Curation & Placement</option>
                        <option value="press" className="bg-[#0B0B0C]">Press & Media</option>
                        <option value="other" className="bg-[#0B0B0C]">Other</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="contact-message" className="block font-sans text-xs uppercase tracking-widest text-gray-500 mb-2">
                        Message <span className="text-amberGold">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        placeholder="Tell us about the artwork you are interested in, your vision for a commission, or any questions you have…"
                        className={inputBase}
                        onChange={() => setErrors((p) => ({ ...p, message: '' }))}
                      />
                      {fieldError('message')}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                      <button
                        id="contact-submit"
                        type="submit"
                        disabled={formState === 'sending'}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 bg-amberGold/90 hover:bg-amberGold text-[#0B0B0C] font-sans text-xs uppercase tracking-widest font-medium transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                      >
                        {formState === 'sending' ? (
                          <>
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                            </svg>
                            Sending…
                          </>
                        ) : (
                          <>
                            Send Message
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                            </svg>
                          </>
                        )}
                      </button>
                      <a
                        href="https://wa.me/231880158739?text=Hello!%20I%20am%20inquiring%20about%20an%20acquisition%20from%20the%20atelier."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 hover:border-[#25D366]/60 text-[#25D366] font-sans text-xs uppercase tracking-widest transition-all duration-300"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        WhatsApp
                      </a>
                    </div>

                    <p className="font-sans text-xs text-gray-600 mt-1">
                      * Required fields. Your email client will open to send the message directly.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
