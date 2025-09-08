import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ClientLogos from "@/components/ClientLogos";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <ClientLogos />
      <Portfolio />
      <Pricing />
      <ContactForm/>
      <Footer />
    </div>
  );
};

export default Index;
