
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactForm = () => {
  return (
    <div>
      <h2 className="section-title mb-8">Send a Message</h2>
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <Input
              type="text"
              id="name"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <Input
              type="email"
              id="email"
              placeholder="Your email"
            />
          </div>
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <Input
            type="text"
            id="subject"
            placeholder="Message subject"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <Textarea
            id="message"
            rows={5}
            placeholder="Your message"
          />
        </div>
        <Button type="submit" className="bg-eecfin-navy hover:bg-eecfin-navy/80">
          Send Message
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
