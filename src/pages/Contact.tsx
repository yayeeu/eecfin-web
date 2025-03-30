
import React from 'react';
import ContactHero from '@/components/contact/ContactHero';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactForm from '@/components/contact/ContactForm';
import MapSection from '@/components/contact/MapSection';

const Contact = () => {
  return (
    <div>
      {/* Hero Section */}
      <ContactHero />

      {/* Contact Information and Form */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Map Section */}
      <MapSection />
    </div>
  );
};

export default Contact;
