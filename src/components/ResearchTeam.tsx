import React from 'react';
import { GraduationCap, Award, BookOpen, ShieldCheck } from 'lucide-react';
import payalPhoto from '../assets/images/payal_gupta.jpeg';
import nehaPhoto from '../assets/images/neha_gautam.jpeg';

interface ResearchTeamProps {
  lightMode?: boolean;
}

export default function ResearchTeam({ lightMode = false }: ResearchTeamProps) {
  const team = [
    {
      name: "Neha Gautam",
      role: "Senior Research Fellow, Department of Education",
      institution: "University of Lucknow, Lucknow, Uttar Pradesh, India",
      degrees: ["M.Com.", "M.Ed.", "UGC NET JRF (Education & Commerce)", "P.G. Diploma in Higher Education"],
      bio: "Holding dual master's degrees in Commerce and Education. Her expertise is uniquely validated by earning the UGC NET JRF in both Education and Commerce, a rare multidisciplinary achievement. An active contributor to the field, she has authored several research papers in peer-reviewed journals and presented research papers in different National and International Conferences, focusing on Educational Technology and AI. By examining Inclusive Higher Education settings, she seeks to modernize institutional practices through data-driven and equitable strategies, ensuring the digital evolution of learning remains accessible to all.",
      image: nehaPhoto,
      tags: ["Lead Researcher", "Educational Technology Expert"]
    },
    {
      name: "Prof. Payal Gupta",
      role: "Professor & Head of the Department of B.Ed.",
      institution: "Shri Jai Narain Misra P.G. (KKC) College, University of Lucknow, Lucknow, U.P., India",
      degrees: ["PhD", "M.Ed.", "M.A. (Political Science)", "M.A. (Hindi)"],
      bio: "A highly qualified academic with multiple master's and a PhD. With more than 25 yeras of experience as a teacher educator, she is a dedicated contributor to academic research. She has published various research paper in National and International, peer-reviewed journals and presented her work at numerous National and Intennational conferences. Her research specialization in centered on learning disabilities, possessing specialized knowledge in identifying and supporting diverse learning needs. Her work focuses on bridging the gap between general and Special Education, promoting Inclusive Education where every student has the resources to succeed.",
      image: payalPhoto,
      tags: ["Research Supervisor", "Inclusive Education Expert", "Educational Technology Expert", "Special Education Expert"]
    }

  ];

  return (
    <section 
      id="research-team-section" 
      className={`py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-colors duration-200 ${
        lightMode ? 'text-slate-800' : 'text-white'
      }`}
    >
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase mb-3 border ${
          lightMode 
            ? 'bg-indigo-50 border-indigo-100 text-indigo-600' 
            : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
        }`}>
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>The Minds Behind the Programme</span>
        </div>
        <h2 className={`text-2xl sm:text-3xl font-extrabold font-sans tracking-tight mb-4 ${
          lightMode ? 'text-slate-900' : 'text-white'
        }`}>
          Meet the Advisory Panel
        </h2>
        <p className={`text-xs sm:text-sm leading-relaxed ${
          lightMode ? 'text-slate-500' : 'text-slate-400'
        }`}>
          Our localized, evidence-based cognitive training modules are guided by distinguished academic minds and educational researchers specializing in Inclusive Education and Educational Technology.
        </p>
      </div>

      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        {team.map((member, idx) => (
          <div 
            key={idx}
            className={`flex flex-col md:flex-row gap-6 p-6 sm:p-8 rounded-2xl border transition-all duration-300 hover:shadow-xl ${
              lightMode 
                ? 'bg-white border-slate-100 shadow-sm hover:border-slate-200' 
                : 'bg-slate-900/40 border-slate-800/80 backdrop-blur-md hover:border-slate-700/50'
            }`}
          >
            {/* Left/Top side: Image and quick info */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left shrink-0">
              <div className="relative mb-4 group">
                <div className={`absolute -inset-0.5 rounded-2xl blur opacity-30 transition duration-300 group-hover:opacity-50 ${
                  idx === 0 ? 'bg-gradient-to-r from-pink-500 to-rose-500' : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                }`} />
                <img 
                  src={member.image} 
                  alt={member.name}
                  referrerPolicy="no-referrer"
                  className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl object-cover object-center shadow-md border border-slate-100/10"
                />
                {/* <span className={`absolute bottom-2 right-2 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-sm ${
                  idx === 0 
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' 
                    : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                }`}>
                  {member.tag}
                </span> */}
              </div>

              {/* Degrees tags */}
              <div className="flex flex-wrap gap-1.5 justify-center md:justify-start max-w-[160px]">
                {member.degrees.map((deg, dIdx) => (
                  <span 
                    key={dIdx} 
                    className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-wide border ${
                      lightMode 
                        ? 'bg-slate-50 border-slate-200/60 text-slate-600' 
                        : 'bg-slate-800/60 border-slate-700/50 text-slate-300'
                    }`}
                  >
                    {deg}
                  </span>
                ))}
              </div>
            </div>

            {/* Right/Bottom side: Details */}
            <div className="flex-grow flex flex-col justify-between">
              <div>
                <h3 className={`text-lg sm:text-xl font-extrabold font-sans tracking-tight mb-1 ${
                  lightMode ? 'text-slate-900' : 'text-white'
                }`}>
                  {member.name}
                </h3>
                
                <p className={`text-xs font-bold font-sans tracking-tight mb-1 flex items-start gap-1.5 ${
                  lightMode ? 'text-indigo-600' : 'text-indigo-400'
                }`}>
                  <GraduationCap className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{member.role}</span>
                </p>

                <p className={`text-[11px] font-medium leading-relaxed mb-4 ${
                  lightMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {member.institution}
                </p>

                <p className={`text-xs sm:text-[13px] leading-relaxed mb-4 ${
                  lightMode ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  {member.bio}
                </p>
              </div>

               <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
                {member.tags.map((deg, dIdx) => (
                  <span 
                    key={dIdx} 
                    className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-wide border ${
                      lightMode 
                        ? 'bg-slate-50 border-slate-200/60 text-slate-600' 
                        : 'bg-slate-800/60 border-slate-700/50 text-slate-300'
                    }`}
                  >
                    {deg}
                  </span>
                ))}
              </div>

              {/* Badges footer */}
            
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
