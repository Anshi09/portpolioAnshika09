import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo, socialLinks } from '../data/mock';

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Name & Copyright */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-semibold text-white mb-2">
              {personalInfo.name}
            </h3>
            <p className="text-gray-400">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${socialLinks.email}`}
              className="w-12 h-12 rounded-full bg-gray-800 hover:bg-cyan-500 flex items-center justify-center transition-all group"
              aria-label="Email"
            >
              <Mail className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
            </a>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-gray-800 hover:bg-cyan-500 flex items-center justify-center transition-all group"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-gray-800 hover:bg-cyan-500 flex items-center justify-center transition-all group"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
            </a>
          </div>

          {/* Email */}
          <div className="text-center md:text-right">
            <p className="text-gray-400 mb-1">Get in touch</p>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {personalInfo.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;