// ScrollingIcons.js
import { useState, useEffect, useRef } from 'react';
import { FaStar, FaMeteor, FaRegStar, FaRegSun, FaRocket, FaFacebook, FaGoogle, FaAirbnb, FaUber } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const iconComponents = [FaUber, FaAirbnb, FaGoogle, FaXTwitter, FaFacebook, FaStar, FaMeteor, FaRegStar, FaRegSun, FaRocket];

const ScrollingIcons = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const animateScroll = () => {
      setScrollPosition((prevPosition) => {
        const newPosition = prevPosition + 0.2;
        if (newPosition >= container.scrollWidth - container.clientWidth) {
          // Reset scroll position to create infinite scrolling effect
          return 0;
        }
        return newPosition;
      });

      requestAnimationFrame(animateScroll);
    };

    const animationId = requestAnimationFrame(animateScroll);

    return () => cancelAnimationFrame(animationId);
  }, []);

  const handleClick = (index) => {
    // Handle click event for the icon at the given index
    console.log(`Icon at index ${index} clicked`);
  };

  return (
    <div ref={containerRef} className="scrolling-icons-container overflow-hidden">
      <div className="icons-wrapper inline-flex" style={{ transform: `translateX(${-scrollPosition}px)` }}>
        {iconComponents.map((Icon, index) => (
          <div key={index} className="icon-item mx-4" onClick={() => handleClick(index)}>
            <Icon size={32} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingIcons;
