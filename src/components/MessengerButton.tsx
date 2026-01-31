import { MessageCircle } from "lucide-react";

export const MessengerButton = () => {
  return (
    <a
      href="https://m.me/61583964994641"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#0084FF] hover:bg-[#0073E6] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      aria-label="Chat with us on Messenger"
    >
      <svg
        viewBox="0 0 36 36"
        fill="currentColor"
        className="w-7 h-7"
      >
        <path d="M18 0C7.8 0 0 7.2 0 16.5c0 5.2 2.5 9.8 6.5 12.8V36l6.3-3.5c1.7.5 3.4.7 5.2.7 10.2 0 18-7.2 18-16.5S28.2 0 18 0zm1.8 22.2l-4.6-4.9-8.9 4.9 9.8-10.4 4.7 4.9 8.8-4.9-9.8 10.4z" />
      </svg>
    </a>
  );
};
