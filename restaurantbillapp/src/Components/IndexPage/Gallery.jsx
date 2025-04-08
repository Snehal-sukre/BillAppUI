import React, { useEffect, useState } from 'react';
import gallery1 from '../../assets/gallery1.jpg';
import gallery2 from '../../assets/gallery2.jpg';
import gallery3 from '../../assets/gallery3.jpg';
import gallery4 from '../../assets/gallery4.jpg';
import gallery5 from '../../assets/gallery5.jpg';
import gallery6 from '../../assets/gallery6.jpg';

const images = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 3;

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Get current visible images
  const getVisibleImages = () => {
    const visibleImages = [];
    for (let i = 0; i < visibleCount; i++) {
      visibleImages.push(images[(currentIndex + i) % images.length]);
    }
    return visibleImages;
  };

  return (
    <section className="gallery-carousel-section" id="gallery">
      <h3 className="gallery-heading">GALLERY</h3>
      <h2 className="gallery-subheading">Check <span>Our Gallery</span></h2>

      <div className="carousel-container">
        {getVisibleImages().map((img, idx) => (
          <div
            key={idx}
            className={`carousel-image-wrapper ${idx === 1 ? 'active' : ''}`} // center one is active
          >
            <img src={img} alt={`Gallery ${idx}`} className="carousel-image" />
          </div>
        ))}
      </div>

      <div className="dot-container">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === currentIndex ? 'active-dot' : ''}`}
            onClick={() => setCurrentIndex(idx)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
