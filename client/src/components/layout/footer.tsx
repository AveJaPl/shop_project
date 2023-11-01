const Footer = () => {
  return (
    <footer className="w-full p-2 bg-cyan-200">
      <div className="flex justify-center">
        <p className="text-black text-sm">
          © {new Date().getFullYear()}{" "}
          <a
            href="https://github.com/avejapl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black font-bold"
          >
            {" "}
            Avejapl
          </a>
        </p>
      </div>
    </footer>
  );
};


export default Footer;