import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { personalInfo, education } from '../data/mock';

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6 bg-[#111] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-light text-white mb-6">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-teal-400 mx-auto" />
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-20"
        >
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            {personalInfo.description}
          </p>
          <p className="text-lg text-gray-400 leading-relaxed">
            I specialize in building mobile applications that combine beautiful design with robust functionality. 
            My approach focuses on clean code, optimal performance, and creating solutions that make a real-world impact.
          </p>
        </motion.div>

        {/* Education Timeline */}
        <div className="space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="bg-[#1a1a1a] border-gray-800 hover:border-cyan-500/50 transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-teal-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <GraduationCap className="w-8 h-8 text-black" />
                      </div>
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="text-2xl font-semibold text-white mb-2">
                        {edu.degree}
                      </h3>
                      <p className="text-cyan-400 text-lg mb-4">
                        {edu.institution}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 text-gray-400 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{edu.period}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{edu.location}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-300">
                        <span className="text-teal-400 font-medium">Focus:</span> {edu.focus}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;