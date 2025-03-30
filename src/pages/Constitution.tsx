
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

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
        </div>
      </section>

      {/* Constitution Text Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2 className="text-3xl font-bold text-eecfin-navy text-center mb-8">
              የኢትዮጵያ ወንጌላዊት ቤተክርስቲያን በፊንላንድ መሰረተ እምነት እና መተዳደሪያ ደንብ
            </h2>
            
            <div className="space-y-4 text-gray-700">
              <p>
                የኢትዮጵያ ወንጌላዊት ቤተክርስቲያን በፊንላንድ በ 1993 የመተዳደሪያ ድንብ አዘጋጅታ የኢትዮጵያ ወንጌላዊት ቤተክርስቲያን በሔልሲንኪ በሚል ስም አገልግሎት ብትጀምርም ትተዳደር የነበረው በወንድማማች ፍቅር እና በመንፈስ አንድነት ላይ በተመስረተ መግባባት እና ምክክር ነበር።
              </p>
              
              <p>
                በ2000 አጋማሽ ላይ የሽማግሌዎች ጉባኤ ቤተክርስቲያኒቷ በፊንላንድ ውስጥ እንደ እግዚአብሔር ፈቃድ ወደ ፊት ለሚመሠረቱ አጥቢያ ቤተክርስቲያኖች እናት ትሆናለች በሚል እምነት የኢትዮጵያ ወንጌላዊት ቤተክርስቲያን በፊንላንድ ተብላ ተሰይማለች።
              </p>
              
              <p>
                በ2011 የ1993 ቱ መተዳደሪያ ደንብ ተሻሽሎ በጠቅላላ ጉባኤ ጸድቆ የቤተክርስቲያኒቷ መተዳደሪያ ህግ ሆኖ እስከ 2016 አገልግሏል። በመተዳደሪያ ደንቡ ውስጥ ደንቦች ፣የእምነት አንቀጾች እና ተደራጊ ስርዓቶች በተደራረበ እና ግልጽ ባልሆነ ሁኔታ ስለተቀመጡ ተሻሸሽሎ እንዲቀርብ በሽማግሌዎች ጉባኤ በመወሰኑ ይህ በድጋሚ የተሻሻለው መተዳደሪያ ደንብ ተዘጋጅቷል። ይህ የኢትዮጵያ ወንጌላዊት ቤተክርስቲያን በፊንላንድ መተዳደሪያ ደንብ ሁለት ክፍሎች ሲኖሩት፤ የመጀመሪያው ክፍል የቤተክርስቲያኒቱ መሰረተ እምነት ላይ ያተኮረ ሲሆን ሁለተኛው ክፍል ደግሞ የልዩ ልዩ አገልግሎት
                ክፍሎች መመሪያዎች እና ተፈጻሚ ስርአቶችን ያካትታል።
              </p>
              
              <p>
                የመተዳደሪያ ደንቡ በቤተክርስቲያኒቷ ሊነሱ ለሚችሉ መንፍሳዊ እና አስተዳደራዊ ጥያቄዎች መልስ ለመስጠት ያሚረዳ ነው። ሊነሱ የሚችሉ ጥያቄዎች ሁሉ የሚመለሱት በእውነትና በፍቅር በመነጋገር እና አብሮ በመጸለይ እንዲሁም እግዚአብሔርን ፈቃድ በመረዳት ነው።
              </p>
              
              <p>
                በመጀመሪያ በዚ ሁሉ የረዳንን እግዚአብሔርን እጅግ እናመሰግናለን። በመቀጠልም በአንድም ሆነ በሌላ መንገድ ለዚህ መተዳደርያ ደንብ ተፅፎ እና ታርሞ መውጣት አስተዋፆ ያደረጋችሁትን ቤተክርስቲያን እግዚአብሔር አምላክ ይባርካቹ ትላለች።
              </p>
            </div>

            <div className="mt-12 text-center">
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
