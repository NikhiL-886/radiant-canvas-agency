import { FaWhatsapp } from "react-icons/fa";

const FloatingWhatsAppButton = () => {
  const phoneNumber = "917701907676"; // your full number with country code
  const message = "Hi, I have a query about your services";

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-30 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

export default FloatingWhatsAppButton;
