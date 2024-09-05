'use client';

import React, { useState } from 'react';
import useUpdateHeaderClass from '../hooks/useUpdateHeaderClass';
import { motion } from "framer-motion";
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
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
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 50px;
    max-width: 1284px;
    padding: 5px 16px 100px 16px;
    margin: 0 auto;
    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        padding: 0px 0px 100px 16px;
    }
    .content {
        padding: 0px 0 0px 0;
        order: 2;
        @media (min-width: 768px) {
            order: 1;
            padding: 100px 0 0px 0;
        }
        h1 {
            width: 100%;
            font-size: 55px;
            padding: 10px 0 30px 0;
            @media (min-width: 516px) {
                font-size: 65px;
            }
            @media (min-width: 992px) {
                font-size: 75px;
            }
        }
        ul {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 25px;
            padding: 0 0px 0 0;
            @media (min-width: 516px) {
                grid-template-columns: repeat(2, 1fr);
            }
            @media (min-width: 992px) {
                padding: 0 100px 0 0;
            }
            @media (min-width: 1200px) {
                padding: 0 150px 0 0;
            }
            .tag {
                color: #000000;
                padding: 0 0 5px 0;
            }
            h6 {
                font-family: var(--font-bebas-neue),sans-serif;
                font-size: 24px;
            }
        }
    }
    .image {
        position: relative;
        height: 350px;
        order: 1;
        @media (min-width: 768px) {
            order: 2;
            height: 500px;
        }
    }
    @media (min-width: 992px) {
        
    }
`;

const Testimonial = styled.div`
    max-width: 780px;
    padding: 0px 16px 100px 16px;
    margin: 0 auto;
    text-align: center;
    p {
        font-size: 24px;
        padding: 0 0 30px 0;
    }
    @media (min-width: 992px) {
        
    }
`;

const Images = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);;
    max-width: 1284px;
    padding: 0px 16px 0px 16px;
    margin: 0 auto;
    @media (min-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(0, 50%));
        gap: 25px;
    }
    .image {
        position: relative;
        height: 315px;
        margin-bottom: 20px;
        @media (min-width: 516px) {
            height: 415px;
        }
        @media (min-width: 768px) {
            height: 615px;
            margin: 0;
        }
    }
    @media (min-width: 992px) {
        
    }
`;

const ProjectShowcase = styled.div`
    .project-showcase {
        max-width: 1250px;
        margin: 0 auto 0 auto;
        padding: 100px 0px 50px 16px;
        overflow: hidden;
        @media (min-width: 768px) {
            padding: 100px 16px 50px 16px;
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
        }
        
    }
`;

// #endregion

export default function Page({ pageData, projects }) {

    // #region Logic

    useUpdateHeaderClass();

    const scheduleEstimateCta = pageData.global_sections[2];

    const address = pageData.site_data[2].acf.value_list[0];

    const phone = pageData.site_data[3].acf.value_list[0];

    const email = pageData.site_data[1].acf.value_list[0];

    const currentTitle = pageData.acf.hero.title;
    const currentCategory = pageData.acf.hero.subtitle;

    const residentialProjects = projects.filter(project =>
        project.categories.includes('Residential') && project.title !== currentTitle
    );

    const commercialProjects = projects.filter(project =>
        project.categories.includes('Commercial') && project.title !== currentTitle
    );

    // Function to determine if there's a matching tag and it's not the current project
    function isSuitableProject(project, currentProjectId, currentProjectTags) {
        return project.id != currentProjectId && project.tags.some(tag => currentProjectTags.includes(tag));
    }

    // Fisher-Yates shuffle function
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // ES6 destructuring swap
        }
    }

    // Conditional assignment based on category, with filtering based on tags and exclusion of current project
    let displayProjects = (currentCategory === 'Residential' ? residentialProjects : commercialProjects)
        .filter(project => isSuitableProject(project, pageData.id, pageData.tags));

    // Check if displayProjects is empty and revert to all projects in the category if so
    if (displayProjects.length === 0) {
        displayProjects = currentCategory === 'Residential' ? residentialProjects : commercialProjects;
    }

    // Shuffle the displayProjects array
    shuffleArray(displayProjects);

    // #endregion

    return (
        <PageWrapper>
            <Hero>
                <div className="content">
                    <h3 className="tag">{pageData.acf.hero.subtitle}</h3>
                    <h1>{pageData.acf.hero.title}</h1>
                    <ul>
                        {pageData.acf.hero.info_pairing.map((item, index) => (
                            <li key={index} className="">
                                <h5 className="tag">{item.title}</h5>
                                <h6>{item.description}</h6>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="image">
                    <Image src={pageData.acf.hero.image.url} alt={pageData.acf.hero.image.alt} fill style={{ objectFit: 'cover' }} />
                </div>
            </Hero>

            {pageData.acf.testimonial.text && pageData.acf.testimonial.text.trim() !== '' && (
                <Testimonial>
                    <div className="wrapper">
                        <p>&quot;{pageData.acf.testimonial.text}&quot;</p>
                        <h6 className="tag">{pageData.acf.testimonial.name}</h6>
                    </div>
                </Testimonial>
            )}

            <Images>
                {pageData.acf.images.map((item, index) => (
                    <div key={index} style={{ gridColumn: ((index + 1) % 3 === 0) ? 'span 2' : 'span 1' }} className="image">
                        <Image src={item.url} alt={item.alt} fill style={{ objectFit: 'cover', width: '100%', height: '100%' }} placeholder="blur" blurDataURL={item.sizes.thumbnail} />
                    </div>
                ))}
            </Images>

            <ProjectShowcase>
                <div className="project-showcase">
                    <div className="title-section">
                        <h2>Related Projects</h2>
                        <Link className="filled-button" href='/projects/'>View more</Link>
                    </div>
                    <div className={`desktop-projects res-projects`}>
                        <div className="highlight">
                            {displayProjects.map((item, index) => {
                                if (index < 1) {
                                    return (
                                        <Link key={index} href={`${item.slug}`} className="box">
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
                            {displayProjects.map((item, index) => {
                                if (index > 0 && index < 3) {
                                    return (
                                        <Link key={index} href={`${item.slug}`} className="box">
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
                                {displayProjects.map((item, index) => {
                                    if (index < 3) {
                                    return (
                                    <SplideSlide key={index} className="splide__slide">
                                        <Link key={index} href={`${item.slug}`} className="box">
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
                        <Link className="filled-button" href='/projects/'>View more</Link>
                    </div>
                </div>
            </ProjectShowcase>

            <ScheduleEstimateCta scheduleEstimateCta={scheduleEstimateCta} address={address} phone={phone} email={email} />

        </PageWrapper>
    );
}
