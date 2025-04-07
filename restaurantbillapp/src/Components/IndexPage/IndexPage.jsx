import React from 'react';
import Navigationbar from './Navigationbar';
import Home from './Home';
import About from './About';
import Menu from './Menu';
import Chefs from './Chefs';
import Gallery from './Gallery';
import Contact from './Contact';

const IndexPage = () => {
  return (
    <>
      <Navigationbar />
      <section id="home"><Home /></section>
      <section id="about"><About /></section>
      <section id="menu"><Menu /></section>
      <section id="chefs"><Chefs /></section>
      <section id="gallery"><Gallery /></section>
      <section id="contact"><Contact /></section>
    </>
  );
};

export default IndexPage;
