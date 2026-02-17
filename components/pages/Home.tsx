import React from 'react';
import { Page } from '../../types';
import Hero from '../sections/Hero';
import Demos from '../sections/Process';
import Features from '../sections/Features';
import Stats from '../sections/Stats';
import InnerPages from '../sections/Testimonials';
import ResponsiveShowcase from '../sections/CTA';

interface HomeProps {
    onNavigate: (page: Page) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
    return (
        <>
            <Hero onNavigate={onNavigate} />
            <Demos />
            <InnerPages />
            <Stats />
            <ResponsiveShowcase onNavigate={onNavigate} />
            <Features />
        </>
    );
};

export default Home;
