"use client";

import dynamic from 'next/dynamic';
import { useState, FormEvent, useEffect } from 'react'
import Image from 'next/image'
import grainImage from '@/assets/images/grain.jpg'
import ArrowUpRightIcon from '@/assets/icons/arrow-up-right.svg'

// Separate the contact form into a client-only component
const ContactFormComponent = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        
        if (submitStatus !== 'idle') {
            setIsVisible(true);
            // Show message for 5 seconds before starting fade
            timeoutId = setTimeout(() => {
                setIsVisible(false);
                // Reset status after fade animation completes
                setTimeout(() => {
                    setSubmitStatus('idle');
                    setIsVisible(true);
                }, 500); // Match this with CSS transition duration
            }, 5000);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [submitStatus]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch('/api/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            setSubmitStatus('success');
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div id={"contact"} className={"py-16 pt-12 lg:py-24 lg:pt-20"}>
            <div className="container">
                <div className={"bg-gradient-to-r from-emerald-300 to-sky-400 text-gray-900 py-8 px-10 rounded-3xl md:text-left relative overflow-hidden z-0"}>
                    <div className={"absolute inset-0 opacity-5 -z-10"}>
                        <Image
                            src={grainImage}
                            alt="Background texture"
                            fill
                            style={{ objectFit: 'cover' }}
                            priority
                        />
                    </div>
                    <div className={"flex flex-col gap-8"}>
                        <div className="text-center">
                            <h2 className={"font-serif text-2xl md:text-3xl"}>Let&apos;s create something amazing together</h2>
                            <p className={"text-sm mt-2 md:text-base"}>Ready to bring your next project to life? Fill out the form below and I&apos;ll get back to you soon.</p>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto w-full space-y-4 transition-all duration-500" aria-label="Contact form">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-1">Name <span className="sr-only">(required)</span></label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        className="w-full px-4 py-2 rounded-lg bg-white/90 border border-gray-900/10 focus:outline-none focus:ring-2 focus:ring-gray-900"
                                        aria-required="true"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email <span className="sr-only">(required)</span></label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                        className="w-full px-4 py-2 rounded-lg bg-white/90 border border-gray-900/10 focus:outline-none focus:ring-2 focus:ring-gray-900"
                                        aria-required="true"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone <span className="sr-only">(optional)</span></label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                    className="w-full px-4 py-2 rounded-lg bg-white/90 border border-gray-900/10 focus:outline-none focus:ring-2 focus:ring-gray-900"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-1">Message <span className="sr-only">(required)</span></label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-lg bg-white/90 border border-gray-900/10 focus:outline-none focus:ring-2 focus:ring-gray-900"
                                    aria-required="true"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-gray-900 text-white px-8 h-12 rounded-xl font-semibold inline-flex items-center justify-center gap-2 hover:scale-110 transition duration-300 disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                    {!isSubmitting && <ArrowUpRightIcon className="size-5 mb-1"/>}
                                </button>
                                {submitStatus === 'success' && (
                                    <div className={`text-gray-900 font-medium transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                                        Message sent successfully!
                                    </div>
                                )}
                                {submitStatus === 'error' && (
                                    <div className={`text-red-600 font-medium transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                                        Failed to send message. Please try again.
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Export a client-side only version of the component
export const ContactSection = dynamic(() => Promise.resolve(ContactFormComponent), { ssr: false });
