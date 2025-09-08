import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Palette, Rocket } from "lucide-react";
import { Link } from "react-router-dom";


const Hero = () => {
  const clients = [
    { name: "TechCorp", logo: "/assets/hero-mockups.jpg" },
    { name: "InnovateIO", logo: "/assets/hero-mockups-1.jpg" },
    { name: "DataFlow", logo: "/assets/hero-mockups-2.jpg" },
    { name: "CloudBase", logo: "/assets/hero-mockups-3.jpg" },
    { name: "FutureTech", logo: "/assets/hero-mockups-4.jpg" },
    { name: "DigitalPro", logo: "/assets/hero-mockups-5.png" },
    { name: "WebSolutions", logo: "/assets/hero-mockups-6.png" },
    { name: "AppMakers", logo: "/assets/hero-mockups-7.png" },
    { name: "Motherfuckers", logo: "/assets/hero-mockups-8.png" },
  ];

  // First randomized array
  const clients1 = [
    { name: "FutureTech", logo: "/assets/hero-mockups-4.jpg" },
    { name: "CloudBase", logo: "/assets/hero-mockups-3.jpg" },
    { name: "Motherfuckers", logo: "/assets/hero-mockups-8.png" },
    { name: "DataFlow", logo: "/assets/hero-mockups-2.jpg" },
    { name: "AppMakers", logo: "/assets/hero-mockups-7.png" },
    { name: "TechCorp", logo: "/assets/hero-mockups.jpg" },
    { name: "WebSolutions", logo: "/assets/hero-mockups-6.png" },
    { name: "DigitalPro", logo: "/assets/hero-mockups-5.png" },
    { name: "InnovateIO", logo: "/assets/hero-mockups-1.jpg" },
  ];

  // Second randomized array
  const clients2 = [
    { name: "AppMakers", logo: "/assets/hero-mockups-7.png" },
    { name: "TechCorp", logo: "/assets/hero-mockups.jpg" },
    { name: "WebSolutions", logo: "/assets/hero-mockups-6.png" },
    { name: "FutureTech", logo: "/assets/hero-mockups-4.jpg" },
    { name: "Motherfuckers", logo: "/assets/hero-mockups-8.png" },
    { name: "CloudBase", logo: "/assets/hero-mockups-3.jpg" },
    { name: "InnovateIO", logo: "/assets/hero-mockups-1.jpg" },
    { name: "DigitalPro", logo: "/assets/hero-mockups-5.png" },
    { name: "DataFlow", logo: "/assets/hero-mockups-2.jpg" },
  ];


  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden pt-20"
    >
      {/* Background Animated Elements */} 
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>

        {/* 3 Carousels Side by Side */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 grid-flow-row lg:flex gap-6">

          {/* Carousel 2 (reverse direction) */}
          <div className="w-72 h-144 overflow-hidden rotate-12">
            <div className="animate-vertical-scroll-reverse">
              {[...clients2, ...clients].map((client, index) => (
                <div
                  key={`c2-${client.name}-${index}`}
                  className="flex justify-center py-4"
                >
                  <img src={client.logo} alt={client.name} className="w-72 h-auto" />
                </div>
              ))}
            </div>
          </div>

          {/* Carousel 1 (original) */}
          <div className="w-72 h-144 overflow-hidden rotate-12">
            <div className="animate-vertical-scroll">
              {[...clients1, ...clients2].map((client, index) => (
                <div
                  key={`c1-${client.name}-${index}`}
                  className="flex justify-center py-4"
                >
                  <img src={client.logo} alt={client.name} className="w-72 h-auto" />
                </div>
              ))}
            </div>
          </div>

          {/* Carousel 3 (reverse direction) */}
          <div className="w-72 h-144 overflow-hidden rotate-12">
            <div className="animate-vertical-scroll-reverse">
              {[...clients, ...clients2].map((client, index) => (
                <div
                  key={`c3-${client.name}-${index}`}
                  className="flex justify-center py-4"
                >
                  <img src={client.logo} alt={client.name} className="w-72 h-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Content (left aligned) */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-left max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center glass rounded-full px-6 py-2 mb-8 animate-slide-up">
            <Rocket className="w-4 h-4 mr-2 text-accent" />
            <span className="text-sm font-medium">
              Premium Web Development Agency
            </span>
          </div>

          {/* Heading */}
          <h1
            className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            We Build{" "}
            <span className="bg-gradient-to-r from-accent to-primary-glow bg-clip-text text-transparent">
              Digital Experiences
            </span>
            <br />
            That Drive Results
          </h1>

          {/* Subtitle */}
          <p
            className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            Custom websites, brands & digital marketing solutions that transform
            your vision into a powerful online presence. Built with love,
            integrity, and cutting-edge technology.
          </p>

          {/* CTA */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-start mb-12 animate-slide-up"
            style={{ animationDelay: "0.6s" }}
          >
            <Link to='/form'>
            <Button
              size="lg"
              className="bg-gradient-to-r from-accent to-primary-glow hover:scale-105 transition-transform duration-300 group"
            >
              Start Your Project
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            </Link>
            <Link to='/portfolio'>
            <Button
              size="lg"
              variant="outline"
              className="border-accent/50 text-accent hover:bg-accent/10 hover-lift"
            >
              View Our Work
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
