
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Constitution = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-eecfin-navy overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/lovable-uploads/54e6cd73-6658-4990-b0c6-d369f39e1cb9.png" 
            alt="Church background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-sky-800/50"></div>
        </div>
        <div className="container-custom text-center relative z-10 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Constitution</h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            The founding principles and bylaws of our church
          </p>
          <div className="flex items-center justify-center mt-6">
            <Separator className="w-24 bg-eecfin-gold h-0.5" />
          </div>
        </div>
      </section>

      {/* Constitution Text Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-eecfin-navy text-center mb-8">
              Constitution / መተዳደሪያ ደንብ
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* English Card */}
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-eecfin-navy mb-4">Ethiopian Evangelical Church in Finland Constitution</h3>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      The Ethiopian Evangelical Church in Finland (EECFIN) was established in 1993 with a set of governing principles, initially operating as the Ethiopian Evangelical Church in Helsinki. The church was guided by a spirit of brotherly love and unity through mutual understanding and consultation.
                    </p>
                    
                    <p>
                      In mid-2000, the Council of Elders, believing that according to God's will the church would become a mother church to future branch churches in Finland, renamed it the Ethiopian Evangelical Church in Finland.
                    </p>
                    
                    <p>
                      In 2011, the 1993 constitution was revised and approved by the General Assembly, serving as the church's governing law until 2016. As the constitution contained articles of faith, bylaws, and procedures in an intermingled and unclear manner, the Council of Elders decided to revise it, resulting in this updated constitution.
                    </p>
                    
                    <p>
                      This constitution of the Ethiopian Evangelical Church in Finland has two sections: the first focusing on the church's statement of faith, and the second covering guidelines and procedures for various ministry departments.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Amharic Card */}
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-eecfin-navy mb-4">የኢትዮጵያ ወንጌላዊት ቤተክርስቲያን በፊንላንድ መሰረተ እምነት እና መተዳደሪያ ደንብ</h3>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      የኢትዮጵያ ወንጌላዊት ቤተክርስቲያን በፊንላንድ በ 1993 የመተዳደሪያ ድንብ አዘጋጅታ የኢትዮጵያ ወንጌላዊት ቤተክርስቲያን በሔልሲንኪ በሚል ስም አገልግሎት ብትጀምርም ትተዳደር የነበረው በወንድማማች ፍቅር እና በመንፈስ አንድነት ላይ በተመስረተ መግባባት እና ምክክር ነበር።
                    </p>
                    
                    <p>
                      በ2000 አጋማሽ ላይ የሽማግሌዎች ጉባኤ ቤተክርስቲያኒቷ በፊንላንድ ውስጥ እንደ እግዚአብሔር ፈቃድ ወደ ፊት ለሚመሠረቱ አጥቢያ ቤተክርስቲያኖች እናት ትሆናለች በሚል እምነት የኢትዮጵያ ወንጌላዊት ቤተክርስቲያን በፊንላንድ ተብላ ተሰይማለች።
                    </p>
                    
                    <p>
                      በ2011 የ1993 ቱ መተዳደሪያ ደንብ ተሻሽሎ በጠቅላላ ጉባኤ ጸድቆ የቤተክርስቲያኒቷ መተዳደሪያ ህግ ሆኖ እስከ 2016 አገልግሏል። በመተዳደሪያ ደንቡ ውስጥ ደንቦች ፣የእምነት አንቀጾች እና ተደራጊ ስርዓቶች በተደራረበ እና ግልጽ ባልሆነ ሁኔታ ስለተቀመጡ ተሻሸሽሎ እንዲቀርብ በሽማግሌዎች ጉባኤ በመወሰኑ ይህ በድጋሚ የተሻሻለው መተዳደሪያ ደንብ ተዘጋጅቷል።
                    </p>
                    
                    <p>
                      ይህ የኢትዮጵያ ወንጌላዊት ቤተክርስቲያን በፊንላንድ መተዳደሪያ ደንብ ሁለት ክፍሎች ሲኖሩት፤ የመጀመሪያው ክፍል የቤተክርስቲያኒቱ መሰረተ እምነት ላይ ያተኮረ ሲሆን ሁለተኛው ክፍል ደግሞ የልዩ ልዩ አገልግሎት ክፍሎች መመሪያዎች እና ተፈጻሚ ስርአቶችን ያካትታል።
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button 
                asChild 
                className="bg-eecfin-navy hover:bg-eecfin-navy/90"
                size="lg"
              >
                <a 
                  href="/constitution.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center"
                >
                  <FileText className="mr-2" size={20} />
                  Continue Reading Full Constitution
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Constitution;
