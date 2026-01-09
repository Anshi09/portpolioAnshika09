import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { experience } from '../data/mock';

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 px-6 bg-[#111] relative overflow-hidden">
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
            Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-teal-400 mx-auto" />
        </motion.div>

        {experience.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Card className="bg-[#1a1a1a] border-gray-800 hover:border-cyan-500/50 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Icon & Timeline */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Briefcase className="w-10 h-10 text-black" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h3 className="text-3xl font-semibold text-white mb-2">
                          {exp.role}
                        </h3>
                        <p className="text-xl text-cyan-400 mb-3">
                          {exp.company}
                        </p>
                      </div>
                      <Badge className="w-fit bg-cyan-500/20 text-cyan-400 border-cyan-500/50 text-sm px-4 py-1">
                        {exp.type}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-4 text-gray-400 mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-4">Key Achievements:</h4>
                      <ul className="space-y-3">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <Badge 
                            key={tech}
                            className="px-3 py-1 bg-gray-800 text-gray-300 border-gray-700 hover:border-cyan-500/50 transition-all"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;