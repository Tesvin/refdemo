import { useState, useEffect, useRef } from 'react';
import { FaFacebook, FaTwitter, FaGoogle, FaAirbnb, FaUber } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const iconComponents = [FaFacebook, FaTwitter, FaGoogle, FaAirbnb, FaUber];
//const iconRoutes = ['/facebook', '/twitter', '/google', '/airbnb', '/uber'];
//const iconRoutes = ['/facebook', '/twitter', '/google', '/airbnb', '/uber'];

const iconRoutes = [
  'https://www.facebook.com/',
  'https://twitter.com/',
  'https://www.google.com/',
  'https://www.airbnb.com/',
  'https://www.uber.com/',
];

const Footer = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const animateScroll = () => {
      setScrollPosition((prevPosition) => {
        const newPosition = prevPosition + 1;
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

  return (
    <div className="bg-green-900 text-white p-4 text-center">
      <div ref={containerRef} className="icons-wrapper inline-flex" style={{ transform: `translateX(${-scrollPosition}px)` }}>
        {iconComponents.map((Icon, index) => (
          <Link key={index} to={iconRoutes[index]} className="icon-item mx-4">
            <Icon size={32} />
          </Link>
        ))}
      </div>
      <footer>Refitinco Solutions Inc. 2023. All Rights Reserved</footer>
    </div>
  );
};

export default Footer;



// import { FaFacebook } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
// import { FaGoogle } from "react-icons/fa";
// import { FaAirbnb } from "react-icons/fa";
// import { FaUber } from "react-icons/fa";

// // import { AiOutlineCopyrightCircle } from "react-icons/ai";


// export default function Footer() {
//   return (
//     <div className="bg-green-900 text-white p-4 text-center">
//         <FaFacebook />
//         <FaXTwitter />
//         <FaGoogle />
//         <FaAirbnb />
//         <FaUber />
//         <footer>Refitinco Solutions Inc. 2023. All Rights Reserved
//         </footer>
//     </div>
//   )
// }


