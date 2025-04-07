import React, { useState, useEffect } from 'react';
import gallery1 from '../../assets/gallery1.jpg';
import gallery2 from '../../assets/gallery2.jpg';
import gallery3 from '../../assets/gallery3.jpg';
import gallery4 from '../../assets/gallery4.jpg';
import gallery5 from '../../assets/gallery5.jpg';
import gallery6 from '../../assets/gallery6.jpg';

const images = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

const Gallery = () => {
  const [current, setCurrent] = useState(0);

  // Autoplay logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clear interval on unmount
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <section className="gallery-section" id="gallery">
      <h2 className="section-title">Our <span>Gallery</span></h2>
      <p className="gallery-subtitle">A peek into our ambience and dishes</p>

      <div className="slider-container">
        <button className="nav-button left" onClick={prevSlide}>&#10094;</button>
        <img src={images[current]} alt={`Gallery ${current + 1}`} className="slide-image" />
        <button className="nav-button right" onClick={nextSlide}>&#10095;</button>
      </div>

      <div className="thumbnail-row">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            className={`thumbnail ${current === index ? 'active' : ''}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Gallery;
