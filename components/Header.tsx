import React from 'react';

const Header: React.FC = () => {

  const handleSmoothScroll = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      // Calculate the position to scroll to, accounting for the fixed header height
      const headerHeight = 80; // Approximate height of the header (adjust if needed)
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-black bg-opacity-70 backdrop-filter backdrop-blur-lg z-50 transition-all duration-300 ease-in-out">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Site Title or Logo (Optional - can be a subtle glyph or text) */}
        <div className="text-xl font-bold text-gray-300 font-mono">&lbrace; Umbra &rbrace;</div>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#" onClick={(e) => handleSmoothScroll(e, '')} className="text-gray-400 hover:text-white transition-colors duration-300 font-mono text-sm">Trace Start</a></li>
            <li><a href="#experience" onClick={(e) => handleSmoothScroll(e, 'experience')} className="text-gray-400 hover:text-white transition-colors duration-300 font-mono text-sm">Data Trace</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 