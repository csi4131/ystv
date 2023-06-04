import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="text-white hover:text-gray-400">고객센터</a>
            </li>
            <li>
              <a href="/about" className="text-white hover:text-gray-400">About</a>
            </li>
            <li>
              <a href="/contact" className="text-white hover:text-gray-400">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
