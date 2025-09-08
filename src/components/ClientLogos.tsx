const ClientLogos = () => {
  const clients = [
    { name: "TechCorp", logo: "/assets/brands-1.png" },
    { name: "InnovateIO", logo: "/assets/brands-2.png" },
    { name: "DataFlow", logo: "/assets/brands-3.png" },
    { name: "CloudBase", logo: "/assets/brands-4.png" },
    { name: "FutureTech", logo: "/assets/brands-5.png" },
  ];

  return (
    <section className="py-16 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-foreground/60 mb-6">Trusted by industry leaders worldwide</p>
        </div>
        
        {/* Scrolling Logos */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll space-x-0">
            {[...clients, ...clients].map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="flex-shrink-0 transition-opacity duration-300"
              >
                <img
                  src={client.logo} 
                  alt={client.name}
                  className="h-16 w-auto transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;