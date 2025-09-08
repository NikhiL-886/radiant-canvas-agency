import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, Users, TrendingUp } from "lucide-react";

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Design" },
    { id: "ecommerce", label: "E-commerce" },
    { id: "mobile", label: "Mobile Apps" },
    { id: "branding", label: "Branding" }
  ];

  const projects = [
    {
      id: 1,
      title: "TechCorp Enterprise",
      category: "web",
      description: "Enterprise web application with advanced analytics dashboard",
      image: "/src/assets/tech-corp.jpg",
      tags: ["React", "Node.js", "PostgreSQL"],
      metrics: { users: "50K+", conversion: "+85%", rating: 4.9 }
    },
    {
      id: 2,
      title: "Fashion Store",
      category: "ecommerce",
      description: "Modern e-commerce platform with seamless checkout experience",
      image: "/src/assets/fashion-store.jpg",
      tags: ["Shopify", "React", "Stripe"],
      metrics: { users: "25K+", conversion: "+120%", rating: 4.8 }
    },
    {
      id: 3,
      title: "FinTech Mobile App",
      category: "mobile",
      description: "Secure financial mobile application with real-time transactions",
      image: "/src/assets/mobile-app.jpg",
      tags: ["React Native", "Firebase", "Banking API"],
      metrics: { users: "100K+", conversion: "+95%", rating: 4.7 }
    },
    {
      id: 4,
      title: "Creative Agency",
      category: "branding",
      description: "Complete brand identity and website for digital creative agency",
      image: "/src/assets/creative-agency.jpg",
      tags: ["Brand Design", "Web Design", "Marketing"],
      metrics: { users: "15K+", conversion: "+150%", rating: 5.0 }
    },
    {
      id: 5,
      title: "Restaurant Chain",
      category: "web",
      description: "Multi-location restaurant website with online ordering system",
      image: "/src/assets/restaurant-chain.jpg",
      tags: ["WordPress", "WooCommerce", "POS Integration"],
      metrics: { users: "30K+", conversion: "+200%", rating: 4.6 }
    },
    {
      id: 6,
      title: "Healthcare Platform",
      category: "web",
      description: "HIPAA-compliant healthcare platform for patient management",
      image: "/src/assets/healthcare-platform.jpg",
      tags: ["HIPAA", "React", "Healthcare APIs"],
      metrics: { users: "40K+", conversion: "+75%", rating: 4.9 }
    }
  ];

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center glass rounded-full px-6 py-2 mb-6">
            <span className="text-sm font-medium text-accent">OUR WORK</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Showcasing our latest work across web development, e-commerce, mobile apps, and branding projects that delivered exceptional results.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className={`${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-accent to-primary-glow"
                  : "border-accent/50 text-accent hover:bg-accent/10"
              } transition-all duration-300`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Card 
              key={project.id}
              className="glass border-border/50 overflow-hidden hover-lift group animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Button
                  size="sm"
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-accent/90 hover:bg-accent"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>

              <CardContent className="p-6">
                {/* Project Info */}
                <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-foreground/70 mb-4">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-accent/20 text-accent rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
                  <div className="text-center">
                    <Users className="w-4 h-4 text-accent mx-auto mb-1" />
                    <div className="text-sm font-semibold">{project.metrics.users}</div>
                    <div className="text-xs text-foreground/60">Users</div>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="w-4 h-4 text-accent mx-auto mb-1" />
                    <div className="text-sm font-semibold">{project.metrics.conversion}</div>
                    <div className="text-xs text-foreground/60">Growth</div>
                  </div>
                  <div className="text-center">
                    <Star className="w-4 h-4 text-accent mx-auto mb-1" />
                    <div className="text-sm font-semibold">{project.metrics.rating}</div>
                    <div className="text-xs text-foreground/60">Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="outline" 
            className="border-accent/50 text-accent hover:bg-accent/10 hover-lift"
          >
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;