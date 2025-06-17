
import React from 'react';
import { BookOpen } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const OurFaith = () => {
  const faithStatements = [
    {
      title: "The Holy Scriptures",
      content: "We believe all 66 books making up the Old and New Testaments are infallible and inspired by God. They are of supreme and final authority in matters of faith and life (II Tim. 3:16; II Peter 1:19-2; Isaiah 40:8; Matthew 24:35)."
    },
    {
      title: "One God in Three Persons",
      content: "We believe in one God, eternally existing in three persons: Father, Son and Holy Spirit (I Timothy 2:5; I Corinthians 8:6; Exodus 20:2-3; Deuteronomy 6:4; John 14:16, 18,23,26: I John 5:7)."
    },
    {
      title: "Jesus Christ",
      content: "We believe that Jesus Christ was begotten by the Holy Spirit, was born of the Virgin Mary, and is both true God and true man (Matthew 1:18, 23-25; Luke 1:35; I Timothy 2:5; Philippians 2:6-8)."
    },
    {
      title: "Christ's Sacrifice",
      content: "We believe that the Lord Jesus Christ died for our sins, according to the Scriptures, as a representative and substitutionary sacrifice; and that all who believe in Him are justified on the basis of His shed blood (Romans 3:24-26; Galatians 2:16; Romans 5:1,9; I Peter 2:24; I Corinthians 15:3)."
    },
    {
      title: "Resurrection and Ascension",
      content: "We believe in the resurrection of the crucified body of our Lord Jesus Christ, in His ascension into Heaven, and in His present life there for us, as our High Priest and Advocate (John 11:25; Philippians 3:10; Matthew 28:6-7; Acts 1:9; I Corinthians 15:4; Hebrews 4:14-15; I John 2:1)."
    },
    {
      title: "Human Nature and Sin",
      content: "We believe that man was created in the image of God; that he sinned and thereby incurred, not only physical death, but also that spiritual death which is separation from God; and that all human beings are born with a sinful nature, and sin in thought, word and deed (Genesis 1:26-27; Romans 3:23; I John 1:8, 10; Psalms 51:5)."
    },
    {
      title: "Salvation by Faith",
      content: "We believe that all who receive by faith the Lord Jesus Christ are born again of the Holy Spirit and thereby become children of God (John 3:3-5; II Corinthians 5:17; Ephesians 2:1-10; II Peter 1:4; Titus 3:5-7; John 1:12-13)."
    },
    {
      title: "The Church",
      content: "We believe in the Church in its universal aspect comprising the whole body of those who have been born of the Spirit; and its local expression established for mutual edification and witness (Ephesians 1:22-23; 5:25-32; Acts 15:41; 16:5)."
    },
    {
      title: "Baptism and Communion",
      content: "We believe in the baptism of believers by immersion and the celebration of the Lord's supper (Acts 22:16; Matthew 28:19-20; I Corinthians 11:23-26; Acts 8:38: Matthew 3:16)."
    },
    {
      title: "The Holy Spirit",
      content: "We believe in the Holy Spirit, the Baptism of the Holy Spirit and the gifts of the Holy Spirit (Joel 2:28-32; Acts 2; Ephesians 5:18; 1Corinthians 12-14)."
    },
    {
      title: "Spirit-Filled Life",
      content: "We believe in the Spirit-filled life for victorious Christian living and effective service, and in worldwide evangelization through missionary activity (Ephesians 5:18; Acts 6:3; Matthew 28:19; Acts 1:8; John 10:27-29; Ephesians 1:13-14)."
    },
    {
      title: "Satan and Spiritual Warfare",
      content: "We believe in the presence of Satan, who is also called the devil. He, with his demons, is in continual warfare with the workings of God. His activities among men began at the fall and will continue until his final doom (Matthew 4:1-11; 25:31; Revelation 20:2, 10; II Corinthians 11:3f.)."
    },
    {
      title: "Resurrection and Judgment",
      content: "We believe in the bodily resurrection of the just and the unjust, the eternal blessedness of the saved and the everlasting punishment of the lost (I Corinthians 15:21-23; II Thessalonians 1:7-10; Revelation 20:11-15; Matthew 25:34)."
    },
    {
      title: "Christ's Return",
      content: "We believe in the imminent return of our Lord and Savior Jesus Christ (John 14:3; Acts 1:19-21; I Thessalonians 4:16-17; James 5:8; Hebrews 9:28; Titus 2:13)"
    }
  ];

  return (
    <div>
      {/* Hero Section with the uploaded image */}
      <section className="relative bg-eecfin-navy overflow-hidden h-64">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/our-faith-hero.png" 
            alt="Statement of Faith" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-eecfin-navy/50"></div>
        </div>
        <div className="container-custom text-center relative z-10 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Statement of Faith
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90 mb-4">
            Our statement of faith is rooted in the Holy Scriptures, the infallible and inspired Word of God. 
            We hold these truths as foundational to our Christian walk and practice.
          </p>
          <div className="flex items-center justify-center mt-6">
            <Separator className="w-24 bg-eecfin-gold h-0.5" />
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container-custom">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/who-we-are">Who We Are</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Statement of Faith</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Main Content Section with Large Left Image */}
      <section className="bg-white">
        <div className="flex min-h-screen">
          {/* Large Left Side Image */}
          <div className="w-2/5 relative overflow-hidden">
            <img 
              src="/images/our-faith-hero.png?w=1200&h=800&fit=crop" 
              alt="Bible study and faith community"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20"></div>
          </div>
          
          {/* Right Content Area */}
          <div className="w-3/5 py-12">
            <div className="container-custom max-w-4xl">
              <h2 className="text-3xl font-bold text-eecfin-navy text-center mb-8">
                Our Beliefs
              </h2>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <Accordion type="single" collapsible className="w-full">
                  {faithStatements.map((statement, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left font-medium text-eecfin-navy hover:text-eecfin-accent transition-colors py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 mr-3 rounded-full bg-eecfin-navy/10 flex items-center justify-center text-eecfin-navy flex-shrink-0">
                            <BookOpen size={16} />
                          </div>
                          {statement.title}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 leading-relaxed pl-11">
                        {statement.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurFaith;
