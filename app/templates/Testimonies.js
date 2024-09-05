'use client';

import React, { useState } from 'react';
import useUpdateHeaderClass from '../hooks/useUpdateHeaderClass';
import { motion } from "framer-motion";
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import TestimonialSection from "../components/TestimonialSection";
import ScheduleEstimateCta from "../components/ScheduleEstimateCta";

function getButtonLink(linkToWhere, onSiteLink, offSiteLink, fileLink) {
    switch (linkToWhere) {
        case "A page on this site":
            return (onSiteLink);
        case "Another site":
            return (offSiteLink);
        case "A file":
            return (fileLink);
        default:
            return ('/');
    }
}

// #region Styles

const PageWrapper = styled.div`
    background-color: #fcfdfe;
    @media (min-width: 992px) {
        
    }
`;

const Hero = styled.div`
    .wrapper {
        max-width: 780px;
        margin: 0 auto;
        text-align: center;
        padding: 150px 16px 100px 16px;
        h1 {
            font-size: 65px;
            margin: 10px 0 10px 0;
            @media (min-width: 768px) {
                font-size: 75px;
            }
        }
    }
    @media (min-width: 992px) {
        
    }
`;

const WhyUs = styled.div`
    .wrapper {
        grid-template-columns: repeat(2, 1fr);
        gap: 25px;
        max-width: 1400px;
        margin: 0 auto;
        padding: 50px 16px 0px 16px;
        @media (min-width: 768px) {
            display: grid;
        }
        @media (min-width: 992px) {
            gap: 50px;
        }
        h2 {
            font-family: var(--font-bebas-neue),sans-serif;
            font-size: 45px;
            @media (min-width: 992px) {
                font-size: 60px;
            }
        }
        .image {
            height: 400px;
            margin: 0 0 25px 0;
            @media (min-width: 768px) {
                height: auto;
                margin: 0 0 0px 0;
            }
        }
        .content {
            h4 {
                font-family: var(--font-bebas-neue),sans-serif;
                font-size: 32px;
                @media (min-width: 992px) {
                    font-size: 45px;
                }
            }
            ul {
                padding: 30px 0 0 0;
            }
            li {
                padding: 0 0 30px 0;
                .li-content {
                    transition: padding 0.25s;
                }
                &:hover .li-content {
                    border-left: 2px solid #D12127;
                    padding-left: 15px;
                    transition: 0.25s;
                }
            }
        }
        .image {
            position: relative;
            margin: 0 0 80px 0;
            @media (min-width: 768px) {
                margin: 0 0 0px 0;
            }
        }
    }
`;

const ProjectShowcase = styled.div`
    max-width: 1250px;
    margin: 0 auto 0 auto;
    padding: 0 0px 0 16px;
    @media (min-width: 768px) {
        padding: 0 16px 0 16px;
    }
    .filter-button {
        display: flex;
        align-items: center;
        background-color: #ffffff;
        font-family: var(--font-bebas-neue),sans-serif;
        font-size: 20px;
        color: #000000;
        border: 1px solid #000000;
        padding: 13px 32px 10px 32px;
        line-height: 1em;
        white-space: nowrap;
        transition: 0.25s;
    }

    .filter-button:hover {
        background-color: #d12127;
        transition: 0.25s;
    }
    .desktop-projects {
        display: none;
        grid-template-columns: repeat(2, 1fr);
        gap: 30px;
        @media (min-width: 768px) {
            display: grid;
        }
        .highlight {
            .box {
                position: relative;
                display: flex;
                height: 730px;
                &:hover .hover {
                    visibility: visible;
                    opacity: 1;
                    transition: 0.25s;
                }
            }
        }
        .highlight-secondary {
            height: 700px;
            .box {
                position: relative;
                display: flex;
                height: 50%;
                &:hover .hover {
                    visibility: visible;
                    opacity: 1;
                    transition: 0.25s;
                }
            }
            .box:first-child {
            margin-bottom: 30px;
            }
        }
        .hover {
            visibility: hidden;
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            transition: 0.25s;
            .overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.5);
            }
            .title {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                padding: 32px;
                h2 {
                    font-size: 24px;
                    color: #ffffff;
                }
            
            }
        }
    }
    .mobile-projects {
        display: block;
        @media (min-width: 768px) {
            display: none;
        }
        .splide {
            margin: 0 auto 0 -30px;
        }
        .splide__slide {
            position: relative;
            width: 100%;
            height: 400px;
            @media (min-width: 516px) {
                height: 500px;
            }
        }
        .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
        }
        .title {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 15px;
            h2 {
                font-size: 24px;
                color: #ffffff;
            }
        }
        .filled-button {
            display: flex;
            justify-content: center;
            text-align: center;
            margin: 50px 16px 0 auto;
        }
    }
    .title-section {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        padding: 50px 16px 30px 0;
        @media (min-width: 768px) {
            padding: 50px 0 30px 0;
        }
        h2 {
            font-size: 45px;
            padding-top: 10px;
        }
        .filled-button {
            display: none;
            @media (min-width: 768px) {
                display: flex;
            }
        }
        .filter-icon {
            @media (min-width: 768px) {
                display: none;
            }
        }
        .filter-wrapper {
            display: flex;
            gap: 20px;
            align-items: center;
            width: 100%;
            @media (min-width: 768px) {
                width: auto;
            }
            .filter-box {
                display: flex;
                gap: 20px;
                align-items: center;
                width: 100%;
                @media (min-width: 768px) {
                    width: auto;
                }
                p {
                    display: none;
                    @media (min-width: 768px) {
                        display: block;
                    }
                }
            }
        }
    }
    .filters {
        position: relative;
        width: 100%;
        height: 45px;
        cursor: pointer;
        margin-top: 25px;
        z-index: 5;
        @media (min-width: 768px) {
            width: 160px;
            margin-top: 0px;
        }
        button {
            position: absolute;
            top: 0;
            right: 0;
            visibility: hidden;
            opacity: 0;
            height: 0px;
            transform: translate(0, 100%);
            display: flex;
            align-items: center;
            justify-content: space-between;
            pointer-events: none;
            svg {
                margin-top: -3px;
            }
        }
        .active-filter-button {
            visibility: visible;
            opacity: 1;
            width: 100%;
            height: 100%;
            transform: translate(0, 0);
        }
        .select-filter-button {
            visibility: visible;
            opacity: 1;
            width: 100%;
            height: 100%;
            pointer-events: all;
        }
    }
`;

// #endregion

export default function Page({ pageData, projects }) {

    // #region Logic

    useUpdateHeaderClass();

    const testimonials = pageData.global_sections[3];

    const residentialProjects = [];
    const commercialProjects = [];

    {projects.map((item, index) => {
        if (item.categories.includes('Residential')) {
            residentialProjects.push(item);
        }
        else if (item.categories.includes('Commercial')) {
            commercialProjects.push(item);
        }
    })}

    const [projectFilterBox, setProjectFilterBox] = useState(false);

    const toggleProjectFilterBox = () => {
        setProjectFilterBox(currentState => !currentState);
    };

    const [projectFilter, setProjectFilter] = useState('div1');

    const toggleProjectFilter = (divId) => {
        setProjectFilter(divId);
    };

    const scheduleEstimateCta = pageData.global_sections[2];

    const address = pageData.site_data[2].acf.value_list[0];

    const phone = pageData.site_data[3].acf.value_list[0];

    const email = pageData.site_data[1].acf.value_list[0];

    // #endregion

    return (
        <PageWrapper>

            <Hero>
                <div className="wrapper">
                    <h4 className="tag">{pageData.acf.hero.subtitle}</h4>
                    <h1>{pageData.acf.hero.title}</h1>
                    <p>{pageData.acf.hero.paragraph}</p>
                </div>
            </Hero>

            <WhyUs>
                <div className="wrapper">
                    <div className="image">
                        <Image src={pageData.acf.why_us.image.url} alt={pageData.acf.why_us.image.alt} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <div className="content">
                        <h2>{pageData.acf.why_us.title}</h2>
                        <ul>
                            {pageData.acf.why_us.info_box.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <div className="li-content">
                                            <h4>{item.title}</h4>
                                            <p>{item.paragraph}</p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </WhyUs>

            <TestimonialSection testimonials={testimonials} />

            <ProjectShowcase>
                <div className="title-section">
                    <h2>Related Projects</h2>
                    <Image className="filter-icon" src={'https://inside.chandler-roofing.com/wp-content/uploads/2024/03/filter.svg'} width={25} height={25} />
                    <div className="filter-wrapper">
                        <div className="filter-box">
                            <p>Filter By:</p>
                            <div className={`filters ${projectFilterBox ? 'active-filters' : ''}`} onClick={() => toggleProjectFilterBox()}>
                                <button onClick={() => toggleProjectFilter('div1')} className={`filter-button ${projectFilterBox ? 'select-filter-button' : ''} ${projectFilter === 'div1' ? 'active-filter-button' : ''}`}>
                                    <span>Residential</span>
                                    <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.0303 10.8908L9.18989 10.0504L5.62449 13.6158L5.62449 0.785156L4.43598 0.785156L4.43595 13.6157L0.870657 10.0504L0.030273 10.8908L5.03027 15.8908L10.0303 10.8908Z" fill="black"/>
                                    </svg>
                                </button>
                                <button onClick={() => toggleProjectFilter('div2')} className={`filter-button ${projectFilterBox ? 'select-filter-button' : ''} ${projectFilter === 'div2' ? 'active-filter-button' : ''}`}>
                                    <span>Commercial</span>
                                    <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.0303 10.8908L9.18989 10.0504L5.62449 13.6158L5.62449 0.785156L4.43598 0.785156L4.43595 13.6157L0.870657 10.0504L0.030273 10.8908L5.03027 15.8908L10.0303 10.8908Z" fill="black"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <Link className="filled-button" href='/projects'>View More</Link>
                    </div>
                </div>
                {projectFilter === 'div1' && (
                    <>
                   <div className={`desktop-projects res-projects`}>
                        <div className="highlight">
                            {residentialProjects.map((item, index) => {
                                if (index < 1) {
                                    return (
                                        <Link key={index} href={`/projects/${item.slug}`} className="box">
                                            <Image src={item.acf.hero.image.url} alt={item.acf.hero.image.alt} fill style={{ objectFit: 'cover' }} />
                                            <div className="hover">
                                                <Image src={item.acf.images[0].url} alt={item.acf.images[0].alt} fill style={{ objectFit: 'cover' }} />
                                                <div className="overlay"></div>
                                                <div className="title">
                                                    <h2>{item.acf.hero.title}</h2>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                }
                            })}
                        </div>
                        <div className="highlight-secondary">
                            {residentialProjects.map((item, index) => {
                                if (index > 0 && index < 3) {
                                    return (
                                        <Link key={index} href={`/projects/${item.slug}`} className="box">
                                            <Image src={item.acf.hero.image.url} alt={item.acf.hero.image.alt} fill style={{ objectFit: 'cover' }} />
                                            <div className="hover">
                                                <Image src={item.acf.images[0].url} alt={item.acf.images[0].alt} fill style={{ objectFit: 'cover' }} />
                                                <div className="overlay"></div>
                                                <div className="title">
                                                    <h2>{item.acf.hero.title}</h2>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                }
                            })}
                        </div>
                    </div>
                    <div className="mobile-projects">
                        <Splide hasTrack={ false }
                            options={ {
                                type: 'slide',
                                perPage: 1,
                                arrows: false,
                                pagination: false,
                                rewind: false,
                                noDrag: true,
                                keyboard: 'global',
                                padding: '30px',
                                gap: '10px',
                                breakpoints: {
                                    416: {
                                        
                                    },
                                    516: {
                                        
                                    },
                                    768: {
                                        
                                    }
                                }
                            } 
                            }
                            
                            >
                            <SplideTrack>
                                {residentialProjects.map((item, index) => {
                                    if (index < 3) {
                                    return (
                                    <SplideSlide key={index} className="splide__slide">
                                        <Link key={index} href={`/projects/${item.slug}`} className="box">
                                            <div>
                                            <Image src={item.acf.hero.image.url} alt={item.acf.hero.image.alt} fill style={{ objectFit: 'cover' }} />
                                                <div className="overlay"></div>
                                                <div className="title">
                                                    <h2>{item.acf.hero.title}</h2>
                                                </div>
                                            </div>
                                        </Link>
                                    </SplideSlide>
                                    );
                                    };
                                })}
                            </SplideTrack>
                        </Splide>
                        <Link className="filled-button" href='/projects'>View More</Link>
                    </div>
                    </>
                )}
                {projectFilter === 'div2' && (
                    <>
                    <div className="desktop-projects com-projects">
                        <div className="highlight">
                                {commercialProjects.map((item, index) => {
                                    if (index < 1) {
                                        return (
                                            <Link key={index} href={`/projects/${item.slug}`} className="box">
                                                <Image src={item.acf.hero.image.url} alt={item.acf.hero.image.alt} fill style={{ objectFit: 'cover' }} />
                                                <div className="hover">
                                                    <Image src={item.acf.images[0].url} alt={item.acf.images[0].alt} fill style={{ objectFit: 'cover' }} />
                                                    <div className="overlay"></div>
                                                    <div className="title">
                                                        <h2>{item.acf.hero.title}</h2>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    }
                                })}
                            </div>
                            <div className="highlight-secondary">
                                {commercialProjects.map((item, index) => {
                                    if (index > 0 && index < 3) {
                                        return (
                                            <Link key={index} href={`/projects/${item.slug}`} className="box">
                                                <Image src={item.acf.hero.image.url} alt={item.acf.hero.image.alt} fill style={{ objectFit: 'cover' }} />
                                                <div className="hover">
                                                    <Image src={item.acf.images[0].url} alt={item.acf.images[0].alt} fill style={{ objectFit: 'cover' }} />
                                                    <div className="overlay"></div>
                                                    <div className="title">
                                                        <h2>{item.acf.hero.title}</h2>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    }
                                })}
                            </div>
                    </div>
                    <div className="mobile-projects">
                        <Splide hasTrack={ false }
                            options={ {
                                type: 'slide',
                                perPage: 1,
                                arrows: false,
                                pagination: false,
                                rewind: false,
                                noDrag: true,
                                keyboard: 'global',
                                padding: '30px',
                                gap: '10px',
                                breakpoints: {
                                    416: {
                                        
                                    },
                                    516: {
                                        
                                    },
                                    768: {
                                        
                                    }
                                }
                            } 
                            }
                            
                            >
                            <SplideTrack>
                                {commercialProjects.map((item, index) => {
                                    if (index < 3) {
                                    return (
                                    <SplideSlide key={index} className="splide__slide">
                                        <Link key={index} href={`/projects/${item.slug}`} className="box">
                                            <div>
                                            <Image src={item.acf.hero.image.url} alt={item.acf.hero.image.alt} fill style={{ objectFit: 'cover' }} />
                                                <div className="overlay"></div>
                                                <div className="title">
                                                    <h2>{item.acf.hero.title}</h2>
                                                </div>
                                            </div>
                                        </Link>
                                    </SplideSlide>
                                    );
                                    };
                                })}
                            </SplideTrack>
                        </Splide>
                        <Link className="filled-button" href='/projects'>View More</Link>
                    </div>
                    </>
                )}
            </ProjectShowcase>

            <ScheduleEstimateCta scheduleEstimateCta={scheduleEstimateCta} address={address} phone={phone} email={email} />

        </PageWrapper>
    );
}
