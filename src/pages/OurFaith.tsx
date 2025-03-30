
import React from 'react';
import { Book, BookOpen, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const OurFaith = () => {
  const faithStatements = [
    "We believe all 66 books making up the Old and New Testaments are infallible and inspired by God. They are of supreme and final authority in matters of faith and life (II Tim. 3:16; II Peter 1:19-2; Isaiah 40:8; Matthew 24:35).",
    "We believe in one God, eternally existing in three persons: Father, Son and Holy Spirit (I Timothy 2:5; I Corinthians 8:6; Exodus 20:2-3; Deuteronomy 6:4; John 14:16, 18,23,26: I John 5:7).",
    "We believe that Jesus Christ was begotten by the Holy Spirit, was born of the Virgin Mary, and is both true God and true man (Matthew 1:18, 23-25; Luke 1:35; I Timothy 2:5; Philippians 2:6-8).",
    "We believe that the Lord Jesus Christ died for our sins, according to the Scriptures, as a representative and substitutionary sacrifice; and that all who believe in Him are justified on the basis of His shed blood (Romans 3:24-26; Galatians 2:16; Romans 5:1,9; I Peter 2:24; I Corinthians 15:3).",
    "We believe in the resurrection of the crucified body of our Lord Jesus Christ, in His ascension into Heaven, and in His present life there for us, as our High Priest and Advocate (John 11:25; Philippians 3:10; Matthew 28:6-7; Acts 1:9; I Corinthians 15:4; Hebrews 4:14-15; I John 2:1).",
    "We believe that man was created in the image of God; that he sinned and thereby incurred, not only physical death, but also that spiritual death which is separation from God; and that all human beings are born with a sinful nature, and sin in thought, word and deed (Genesis 1:26-27; Romans 3:23; I John 1:8, 10; Psalms 51:5).",
    "We believe that all who receive by faith the Lord Jesus Christ are born again of the Holy Spirit and thereby become children of God (John 3:3-5; II Corinthians 5:17; Ephesians 2:1-10; II Peter 1:4; Titus 3:5-7; John 1:12-13).",
    "We believe in the Church in its universal aspect comprising the whole body of those who have been born of the Spirit; and its local expression established for mutual edification and witness (Ephesians 1:22-23; 5:25-32; Acts 15:41; 16:5).",
    "We believe in the baptism of believers by immersion and the celebration of the Lord's supper (Acts 22:16; Matthew 28:19-20; I Corinthians 11:23-26; Acts 8:38: Matthew 3:16).",
    "We believe in the Holy Spirit, the Baptism of the Holy Spirit and the gifts of the Holy Spirit (Joel 2:28-32; Acts 2; Ephesians 5:18; 1Corinthians 12-14).",
    "We believe in the Spirit-filled life for victorious Christian living and effective service, and in worldwide evangelization through missionary activity (Ephesians 5:18; Acts 6:3; Matthew 28:19; Acts 1:8; John 10:27-29; Ephesians 1:13-14).",
    "We believe in the presence of Satan, who is also called the devil. He, with his demons, is in continual warfare with the workings of God. His activities among men began at the fall and will continue until his final doom (Matthew 4:1-11; 25:31; Revelation 20:2, 10; II Corinthians 11:3f.).",
    "We believe in the bodily resurrection of the just and the unjust, the eternal blessedness of the saved and the everlasting punishment of the lost (I Corinthians 15:21-23; II Thessalonians 1:7-10; Revelation 20:11-15; Matthew 25:34).",
    "We believe in the imminent return of our Lord and Savior Jesus Christ (John 14:3; Acts 1:19-21; I Thessalonians 4:16-17; James 5:8; Hebrews 9:28; Titus 2:13)"
  ];

  return (
    <div>
      {/* Hero Section with the uploaded image */}
      <section className="relative bg-eecfin-navy overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/lovable-uploads/01e779b2-ee2a-4a84-a799-ad97fdc1319f.png" 
            alt="Statement of Faith" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-custom text-center relative z-10 py-24">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-eecfin-gold">
            EECFIN
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            STATEMENT OF FAITH
          </h2>
        </div>
      </section>

      {/* Faith Statements Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-eecfin-navy text-center mb-12">
              Our Beliefs
            </h2>
            
            <div className="space-y-8">
              {faithStatements.map((statement, index) => (
                <Card key={index} className="overflow-hidden border-l-4 border-eecfin-navy shadow-md hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-8 h-8 rounded-full bg-eecfin-navy/10 flex items-center justify-center text-eecfin-navy">
                          {index % 3 === 0 ? <Book size={18} /> : index % 3 === 1 ? <BookOpen size={18} /> : <Check size={18} />}
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-700 leading-relaxed">
                          {statement}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scripture Foundation Section */}
      <section className="py-16 bg-eecfin-navy/5">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-eecfin-navy mb-6">
              Founded on Scripture
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Our statement of faith is rooted in the Holy Scriptures, the infallible and inspired Word of God.
            </p>
            <div className="flex items-center justify-center">
              <Separator className="w-24 bg-eecfin-accent h-0.5" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurFaith;
