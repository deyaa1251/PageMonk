import React from 'react';
import { FileText, Upload, Settings, Brain, Zap, Shield } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-hex-primary/5 via-hex-secondary/5 to-hex-accent/5"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-hex-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-hex-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          {/* Hero content */}
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-hex-text mb-6">
              Make every
              <span className="gradient-text"> document </span>
              intelligent
            </h1>
            <p className="text-xl text-hex-text-secondary max-w-3xl mx-auto mb-8 leading-relaxed">
              PageMonk transforms your documents into structured, searchable data using advanced OCR and AI. 
              Extract insights, create schemas, and unlock the hidden value in your documents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-hex-primary hover:bg-hex-primary/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-hex-lg">
                Get started for free
              </button>
              <button className="border border-hex-border hover:border-hex-primary text-hex-text px-8 py-4 rounded-lg font-semibold transition-all duration-200">
                See how it works
              </button>
            </div>
          </div>

          {/* Features grid */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="w-8 h-8" />,
                title: "AI-Powered OCR",
                description: "Advanced document processing with intelligent text extraction and structure recognition"
              },
              {
                icon: <Settings className="w-8 h-8" />,
                title: "Custom Schemas",
                description: "Define extraction patterns that match your specific business needs and workflows"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Instant Processing",
                description: "Get structured markdown and extracted data in seconds, not hours"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-hex-card p-8 rounded-xl card-shadow hover:card-shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-hex-primary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-hex-text mb-2">{feature.title}</h3>
                <p className="text-hex-text-secondary">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Trusted by section */}
          <div className="mt-24">
            <p className="text-hex-text-secondary font-medium mb-8">TRUSTED BY LEADING TEAMS</p>
            <div className="flex justify-center items-center space-x-12 opacity-50">
              {/* Placeholder for company logos */}
              <div className="w-24 h-8 bg-hex-border rounded"></div>
              <div className="w-24 h-8 bg-hex-border rounded"></div>
              <div className="w-24 h-8 bg-hex-border rounded"></div>
              <div className="w-24 h-8 bg-hex-border rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;