import React from 'react';
import Hero from '../sections/Hero';
import Demos from '../sections/Process';
import Features from '../sections/Features';
import Stats from '../sections/Stats';
import InnerPages from '../sections/Testimonials';
import ResponsiveShowcase from '../sections/CTA';

const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <Demos />
            <InnerPages />
            <Stats />
            <ResponsiveShowcase />
            <Features />
        </>
    );
};

export default Home;
