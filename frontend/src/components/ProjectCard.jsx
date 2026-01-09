import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

const ProjectCard = ({ project, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
      >
        <Card 
          className="bg-[#1a1a1a] border-gray-800 hover:border-cyan-500/50 transition-all duration-300 group overflow-hidden cursor-pointer h-full"
          onClick={() => setIsOpen(true)}
        >
          <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-teal-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl font-bold text-gray-700 group-hover:text-gray-600 transition-colors">
                {project.title.charAt(0)}
              </div>
            </div>
          </div>
          
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-3">
              <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/50">
                {project.category}
              </Badge>
            </div>
            
            <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
              {project.title}
            </h3>
            
            <p className="text-gray-400 mb-4 line-clamp-2">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 3).map((tech) => (
                <Badge 
                  key={tech}
                  variant="outline"
                  className="text-xs bg-gray-800 text-gray-300 border-gray-700"
                >
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 3 && (
                <Badge 
                  variant="outline"
                  className="text-xs bg-gray-800 text-gray-300 border-gray-700"
                >
                  +{project.technologies.length - 3} more
                </Badge>
              )}
            </div>

            <Button 
              variant="ghost" 
              className="w-full text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
            >
              View Details
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Project Details Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-[#1a1a1a] border-gray-800 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-semibold text-white mb-2">
              {project.title}
            </DialogTitle>
            <Badge className="w-fit bg-cyan-500/20 text-cyan-400 border-cyan-500/50">
              {project.category}
            </Badge>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Problem Statement */}
            <div>
              <h4 className="text-xl font-semibold text-cyan-400 mb-2">Problem Statement</h4>
              <p className="text-gray-300 leading-relaxed">{project.problem}</p>
            </div>

            {/* Solution */}
            <div>
              <h4 className="text-xl font-semibold text-cyan-400 mb-2">Solution</h4>
              <p className="text-gray-300 leading-relaxed">{project.solution}</p>
            </div>

            {/* Key Highlights */}
            <div>
              <h4 className="text-xl font-semibold text-cyan-400 mb-3">Key Highlights</h4>
              <ul className="space-y-2">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-teal-400 mt-1">•</span>
                    <span className="text-gray-300">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="text-xl font-semibold text-cyan-400 mb-3">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge 
                    key={tech}
                    className="px-3 py-1 bg-gray-800 text-gray-300 border-gray-700"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-teal-400/10 border border-cyan-500/30 rounded-lg p-4">
              <h4 className="text-xl font-semibold text-cyan-400 mb-2">Results</h4>
              <p className="text-gray-300">{project.results}</p>
            </div>

            {/* Links */}
            {(project.liveLink || project.githubLink) && (
              <div className="flex gap-4 pt-4">
                {project.liveLink && (
                  <Button className="bg-cyan-500 hover:bg-cyan-600 text-black">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
                )}
                {project.githubLink && (
                  <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10">
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </Button>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectCard;