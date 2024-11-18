"use client";

import { useState, FormEvent } from 'react'
import Image from 'next/image'
import grainImage from '@/assets/images/grain.jpg'
import ArrowUpRightIcon from '@/assets/icons/arrow-up-right.svg'

export const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
                        
                        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto w-full space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-1">Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        className="w-full px-4 py-2 rounded-lg bg-white/90 border border-gray-900/10 focus:outline-none focus:ring-2 focus:ring-gray-900"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                        className="w-full px-4 py-2 rounded-lg bg-white/90 border border-gray-900/10 focus:outline-none focus:ring-2 focus:ring-gray-900"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number (Optional)</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                    className="w-full px-4 py-2 rounded-lg bg-white/90 border border-gray-900/10 focus:outline-none focus:ring-2 focus:ring-gray-900"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-1">Message *</label>
                                <textarea
                                    id="message"
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                    className="w-full px-4 py-2 rounded-lg bg-white/90 border border-gray-900/10 focus:outline-none focus:ring-2 focus:ring-gray-900"
                                />
                            </div>
                            
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={"text-white bg-gray-900 inline-flex items-center px-6 h-12 rounded-xl gap-2 w-max border border-gray-900 hover:scale-110 transition duration-300 disabled:opacity-50 disabled:hover:scale-100"}>
                                    <span className={"font-semibold"}>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                                    <ArrowUpRightIcon className="size-4"/>
                                </button>
                            </div>
                            
                            {submitStatus === 'success' && (
                                <p className="text-center text-sm text-emerald-900 font-medium">Message sent successfully! I&apos;ll get back to you soon.</p>
                            )}
                            {submitStatus === 'error' && (
                                <p className="text-center text-sm text-red-600 font-medium">There was an error sending your message. Please try again.</p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
