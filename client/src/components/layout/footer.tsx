const Footer = () => {
  return (
    <footer className="w-full p-4 bg-indigo-700">
      <div className="flex justify-center">
        <p className="text-white text-sm">
          © {new Date().getFullYear()}{" "}
          <a
            href="https://github.com/avejapl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-200 font-bold hover:text-indigo-400 transition duration-300"
          >
            Avejapl
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
