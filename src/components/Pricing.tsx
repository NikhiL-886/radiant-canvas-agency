import { Check, Star, Zap, Crown } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      icon: Star,
      price: "4500",
      description: "Perfect for small businesses and startups",
      features: [
        // "5-page custom website",
        "Mobile responsive design",
        "Basic SEO optimization",
        "Contact form integration",
        "Social media links",
        "30 days support"
      ],
      highlighted: false,
      timeline: "1 week delivery"
    },
    {
      name: "Professional",
      icon: Zap,
      price: "6,999",
      description: "Ideal for growing businesses",
      features: [
        // "10-page custom website",
        "Advanced animations",
        "CMS integration",
        "Advanced SEO package",
        "Google Analytics setup",
        "E-commerce ready",
        "90 days support",
        "Performance optimization"
      ],
      highlighted: true,
      timeline: "2-3 weeks delivery"
    },
    {
      name: "Enterprise",
      icon: Crown,
      price: "Custom",
      description: "For large-scale applications",
      features: [
        "Unlimited pages",
        "Custom functionality",
        "Advanced integrations",
        "Multi-language support",
        "Advanced security",
        "Priority support",
        "6 months support",
        "Training included",
        "Dedicated project manager"
      ],
      highlighted: false,
      timeline: "4-6 weeks delivery"
    }
  ];

  const addOns = [
    { name: "Logo Design", price: "499" },
    // { name: "Brand Guidelines", price: "799" },
    { name: "Content Writing", price: "299/page" },
    // { name: "Photography", price: "599/day" },
    // { name: "Video Production", price: "1,299" },
    { name: "Social Media Setup", price: "399" }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center glass rounded-full px-6 py-2 mb-6">
            <span className="text-sm font-medium text-accent">PRICING</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Transparent Pricing
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Choose the perfect package for your project. All plans include our commitment to quality, innovation, and your success.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name}
              className={`glass border-border/50 hover-lift relative overflow-hidden animate-scale-in ${
                plan.highlighted ? "border-accent/50 hover-glow" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-accent to-primary-glow text-white text-center py-2 text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <CardHeader className={`text-center ${plan.highlighted ? "pt-12" : "pt-8"}`}>
                <plan.icon className={`w-12 h-12 mx-auto mb-4 ${plan.highlighted ? "text-accent animate-glow" : "text-accent"}`} />
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl md:text-4xl font-bold text-accent">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-foreground/60">/project</span>}
                </div>
                <p className="text-foreground/70">{plan.description}</p>
                <div className="text-sm text-accent font-medium mt-2">{plan.timeline}</div>
              </CardHeader>

              <CardContent className="px-6 pb-8">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${
                    plan.highlighted 
                      ? "bg-gradient-to-r from-accent to-primary-glow hover:scale-105" 
                      : "border-accent/50 text-accent hover:bg-accent/10"
                  } transition-transform duration-300`}
                  variant={plan.highlighted ? "default" : "outline"}
                >
                  {plan.price === "Custom" ? "Contact Us" : "Get Started"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="glass rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Add-on Services
            </h3>
            <p className="text-foreground/80">
              Enhance your project with our additional services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOns.map((addon, index) => (
              <div 
                key={addon.name}
                className="flex justify-between items-center p-4 bg-secondary/30 rounded-lg hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="font-medium">{addon.name}</span>
                <span className="text-accent font-semibold">{addon.price}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-foreground/60 mb-4">
              Need a custom quote? Let's discuss your specific requirements.
            </p>
            <Button 
              variant="outline" 
              className="border-accent/50 text-accent hover:bg-accent/10"
            >
              Request Custom Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;