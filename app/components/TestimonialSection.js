'use client';

import styled from 'styled-components';
import { useState, useRef } from 'react';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';

const TestimonialSlider = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 150px 0 150px 0;
    overflow: hidden;
    z-index: 6;
    .cursor-left {
        cursor: url('https://inside.chandler-roofing.com/wp-content/uploads/2024/04/scroll-left-sm.png'), auto;
    }
    .cursor-right {
        cursor: url('https://inside.chandler-roofing.com/wp-content/uploads/2024/03/Scroll-Button-2.png'), auto;
    }
    .splide {
        width: 100%;
        @media (min-width: 768px) {
            width: auto;
        }
    }
    .inner-slide-box {
        max-width: 1133px;
        background-color: #dfdfdf;
        margin: 0 auto;
        text-align: center;
        padding: 100px 16px 100px 16px;
        border-top: 10px solid #d12127;
        @media (min-width: 768px) {
            padding: 100px 150px 100px 150px;
        }
    }
    p {
        font-size: 16px;
        color: #000000;
        @media (min-width: 516px) {
            font-size: 20px;
        }
    }
    h5 {
        font-family: var(--font-lato),sans-serif;
        color: #000000;
        padding-top: 25px;
        padding-bottom: 5px;
    }
    h6 {
        font-family: var(--font-lato),sans-serif;
        color: #000000;
        opacity: 0.75;
    }
    .splide__pagination__page {
        background: #161616;
    }
    .splide__pagination .is-active {
        background: #d12127 !important;
    
    }
`;

export default function TestimonialSection({ testimonials }) {

    const [cursorClass, setCursorClass] = useState('');
    const divRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!divRef.current) return;
        const { left, width } = divRef.current.getBoundingClientRect();
        const mouseX = e.clientX;
        const isLeftSide = mouseX < left + width / 2;
        setCursorClass(isLeftSide ? 'cursor-left' : 'cursor-right');
    };

    const splideRef = useRef();

    const handleSlideClick = (event) => {
        const splideElement = splideRef.current.splide.root;
        const clickX = event.clientX; // Get the X coordinate of the click
        const elementRect = splideElement.getBoundingClientRect();
        const elementWidth = elementRect.width;

        // Determine if the click was on the left or right half of the Splide component
        if (clickX < elementRect.left + elementWidth / 2) {
            // Clicked on the left side, go to the previous slide
            splideRef.current.splide.go('<');
            console.log('eft')
        } else {
            // Clicked on the right side, go to the next slide
            splideRef.current.splide.go('>');
            console.log('rig')
        }
    };

    return (
        <TestimonialSlider ref={divRef} onMouseMove={handleMouseMove} onClick={handleSlideClick}>
            <Splide hasTrack={ false } ref={splideRef}
                options={ {
                    type: 'loop',
                    perPage: 1,
                    pagination: true,
                    arrows: false,
                    keyboard: 'global',
                    autoplay: false,
                    padding: '30%',
                    gap: '50px',
                    start: 1,
                    breakpoints: {
                        992: {
                            padding: '0%',
                            gap: '0px',
                        }
                    }
                } 
                }
                
                >
                <SplideTrack className={cursorClass}>
                    {testimonials.acf.testimonial.map((item, index) => {
                        return (
                        <SplideSlide key={index} className="splide__slide">
                            <div className="inner-slide-box">
                                <p>&quot;{item.text}&quot;</p>
                                <h5>{item.name}</h5>
                                <h6>{item.job_title}</h6>
                            </div>
                        </SplideSlide>
                        );
                    })}
                    
                </SplideTrack>
            </Splide>
        </TestimonialSlider>
    );
}
