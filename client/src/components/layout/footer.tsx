// Updated Footer component with a more modern design
const Footer = () => {
  return (
    <footer className="w-full bg-indigo-700">
      <div className="max-w-screen-xl mx-auto px-4 py-6 flex justify-between items-center flex-col sm:flex-row">
        <div className="text-white text-sm text-center sm:text-left flex flex-col sm:flex-row sm:items-center gap-2">
          <span>© {new Date().getFullYear()} Avejapl.</span>
          <a
            href="https://github.com/avejapl"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold hover:text-indigo-400 transition duration-300"
          >
            GitHub
          </a>
          <span>| All rights reserved.</span>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-4">
          <a href="#" className="text-indigo-200 hover:text-white transition duration-300">Privacy Policy</a>
          <a href="#" className="text-indigo-200 hover:text-white transition duration-300">Terms of Service</a>
          <a href="#" className="text-indigo-200 hover:text-white transition duration-300">Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
