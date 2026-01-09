import React from 'react';
import { motion } from 'framer-motion';
import { Code, Smartphone, Server, Brain, Sparkles } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { skills } from '../data/mock';

const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Programming",
      icon: Code,
      skills: skills.programming,
      color: "from-cyan-500 to-blue-500"
    },
    {
      title: "Mobile & Frontend",
      icon: Smartphone,
      skills: skills.mobile,
      color: "from-teal-400 to-cyan-500"
    },
    {
      title: "Backend & APIs",
      icon: Server,
      skills: skills.backend,
      color: "from-cyan-400 to-teal-500"
    },
    {
      title: "AI & Data",
      icon: Brain,
      skills: skills.aiData,
      color: "from-teal-500 to-cyan-400"
    }
  ];

  return (
    <section id="skills" className="py-24 px-6 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-400/5 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-light text-white mb-6">
            Skills & Expertise
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-teal-400 mx-auto" />
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-[#1a1a1a] border-gray-800 hover:border-cyan-500/50 transition-all duration-300 h-full group">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-black" />
                      </div>
                      <h3 className="text-2xl font-semibold text-white">
                        {category.title}
                      </h3>
                    </div>
                    
                    <div className="space-y-4">
                      {category.skills.map((skill) => (
                        <div key={skill.name}>
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-300">{skill.name}</span>
                            <span className="text-cyan-400">{skill.level}%</span>
                          </div>
                          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full bg-gradient-to-r ${category.color}`}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.2 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Core Strengths */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-cyan-400" />
            <h3 className="text-2xl font-semibold text-white">Core Strengths</h3>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {skills.strengths.map((strength, index) => (
              <motion.div
                key={strength}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Badge 
                  className="px-6 py-3 text-base bg-gradient-to-r from-cyan-500/20 to-teal-400/20 border-cyan-500/50 text-cyan-400 hover:from-cyan-500/30 hover:to-teal-400/30 transition-all"
                >
                  {strength}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;