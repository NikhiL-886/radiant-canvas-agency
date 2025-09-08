import { Monitor, Smartphone, ShoppingCart, Search, PenTool, BarChart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      icon: Monitor,
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies for optimal performance.",
      features: ["React & Next.js", "Custom CMS", "E-commerce Solutions", "API Integration"]
    },
    {
      icon: Smartphone,
      title: "Mobile Development", 
      description: "Native and cross-platform mobile apps that provide seamless user experiences.",
      features: ["iOS & Android", "React Native", "UI/UX Design", "App Store Optimization"]
    },
    {
      icon: PenTool,
      title: "Brand Identity",
      description: "Complete brand identity design including logos, guidelines, and visual assets.",
      features: ["Logo Design", "Brand Guidelines", "Marketing Materials", "Print Design"]
    },
    {
      icon: ShoppingCart,
      title: "E-commerce",
      description: "Powerful online stores with integrated payment processing and inventory management.",
      features: ["Shopify & WooCommerce", "Payment Integration", "Inventory Management", "Analytics"]
    },
    {
      icon: Search,
      title: "SEO & Marketing",
      description: "Strategic digital marketing campaigns to increase visibility and drive conversions.",
      features: ["SEO Optimization", "Google Ads", "Social Media", "Content Marketing"]
    },
    {
      icon: BarChart,
      title: "Analytics & Insights",
      description: "Data-driven insights and analytics to optimize performance and ROI.",
      features: ["Google Analytics", "Performance Tracking", "A/B Testing", "Conversion Optimization"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center glass rounded-full px-6 py-2 mb-6">
            <span className="text-sm font-medium text-accent">OUR SERVICES</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Complete Digital Solutions
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            From concept to launch, we provide end-to-end digital services that transform your business and drive measurable results.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.title}
              className="glass border-border/50 hover-lift group animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className="mb-6">
                  <service.icon className="w-12 h-12 text-accent group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-4 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-foreground/70 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-foreground/60">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="glass rounded-2xl p-8 md:p-12 hover-glow">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
              Let's discuss how we can help transform your digital presence and achieve your business goals.
            </p>
            <Link to='/form'>
            <Button className="bg-gradient-to-r from-accent to-primary-glow px-8 py-4 rounded-lg font-semibold hover:scale-105 transition-transform duration-300">
              Get Free Consultation
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;