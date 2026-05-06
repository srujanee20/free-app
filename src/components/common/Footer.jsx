const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} FreeAPI Apps. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;