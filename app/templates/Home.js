'use client';

import { useState } from 'react';
import useUpdateHeaderClass from '../hooks/useUpdateHeaderClass';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import TestimonialSection from "../components/TestimonialSection";
import ServiceAreaSection from "../components/ServiceAreaSection";
import CertificatesAndLicenses from "../components/CertificatesAndLicenses";

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

const Wrapper = styled.div`
    overflow: hidden;
    .padding {
        padding: 500px 0 500px 0;
    }
`;

const Hero = styled.div`
    height: 1000px;
    @media (min-width: 516px) {
        height: 800px;
    }
    video {
        position: absolute;
        width: 100%;
        height: 1000px;
        object-fit: cover;
        top: 0;
        left: 0;
        @media (min-width: 516px) {
            height: 800px;
        }
    }
    .overlay-dark {
        position: absolute;
        width: 100%;
        height: 1000px;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,0.5);
        z-index: 3;
        @media (min-width: 516px) {
            height: 800px;
        }
    }
    .content {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        text-align: center;
        color: #ffffff;
        padding: 320px 16px 0px 16px;
        z-index: 3;
        h1 {
            font-size: 64px;
            @media (min-width: 516px) {
                font-size: 75px;
            }
        }
        p {
            font-size: 20px;
            max-width: 530px;
            margin: 0 auto;
            padding: 0 0 20px 0;
        }
        .buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 25px;
            justify-content: center;
            a {
                width: 100%;
                justify-content: center;
                @media (min-width: 516px) {
                    width: auto;
                }
            }
        }
    }
`;

const ServiceTypes = styled.div`
    position: relative;
    margin-top: -90px;
    z-index: 6;
    .toggle {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        background-color: #161616;
        button {
            border-top: 0px;
            border-right: 0px;
            border-left: 0px;
        }
    }
    button {
        position: relative;
        width: 50%;
        font-family: var(--font-bebas-neue),sans-serif;
        font-size: 20px;
        color: #ffffff;
        padding: 10px 0 10px 0;
        border-bottom: 1px solid #ffffff;
        .text {
            position: relative;
            z-index: 6;
        }
    }
    .service-trigger {
        width: 100%;
        @media (min-width: 768px) {
            width: 50%;
        }
        .gradient-1 {
            transform: translate(0, 100%) rotate(0deg);
            pointer-events: none;
            transition: 1s;
            @media (min-width: 768px) {
                transform: translate(0, 100%) rotate(0deg);
            }
        }
        .gradient-2 {
            transform: translate(0%, 0) rotate(0deg);
            pointer-events: none;
            transition: 1s;
            @media (min-width: 768px) {
                transform: translate(0%, 0) rotate(0deg);
            }
        }
        .gradient-3 {
            transform: translate(0, -100%) rotate(0deg);
            pointer-events: none;
            transition: 1s;
            @media (min-width: 768px) {
                transform: translate(0, 100%) rotate(0deg);
            }
        }
        .gradient-4 {
            transform: translate(0%, 0) rotate(0deg);
            pointer-events: none;
            transition: 1s;
            @media (min-width: 768px) {
                transform: translate(0%, 0) rotate(0deg);
            }
        }
    }
    .active-service-trigger {
        width: 100%;
        @media (min-width: 768px) {
            width: 50%;
        }
        .gradient-1 {
            transform: translate(0%, 0);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #d12127;
            pointer-events: none;
            transition: 0.5s;
            z-index: 5;
            @media (min-width: 768px) {
                transform: translate(0%, 0) rotate(0deg);
            }
        }
        .gradient-2 {
            transform: translate(0, 100%);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #323232;
            pointer-events: none;
            z-index: 5;
            @media (min-width: 768px) {
                transform: translate(100%, 0) rotate(0deg);
            }
        }
        .gradient-3 {
            transform: translate(0%, 0);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #d12127;
            pointer-events: none;
            transition: 0.5s;
            z-index: 5;
            @media (min-width: 768px) {
                transform: translate(0%, 0) rotate(0deg);
            }
        }
        .gradient-4 {
            transform: translate(0, -100%);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #323232;
            pointer-events: none;
            z-index: 5;
            @media (min-width: 768px) {
                transform: translate(-100%, 0) rotate(0deg);
            }
        }
    }
    .service-info {
        opacity: 0;
        width: 0;
        height: 0;
        pointer-events: none;
    }
    .active-service-info {
        display: flex;
        flex-wrap: wrap;
        gap: 50px;
        flex-direction: column-reverse;
        opacity: 1;
        width: 100%;
        max-width: 1250px;
        height: 100%;
        margin: 0 auto;
        pointer-events: all;
        transition: opacity 1s;
        @media (min-width: 768px) {
            flex-wrap: nowrap;
            flex-direction: row;
            height: 530px;
        }
        @media (min-width: 992px) {
            gap: 100px;
        }
        @media (min-width: 1200px) {
            height: 500px;
        }
    }
    .service-information {
        position: relative;
        background-color: #161616;
        color: #ffffff;
        padding: 0px 0px 0px 0px;
        border-bottom: 100px solid #ffffff;
        z-index: 5;
        @media (min-width: 768px) {
            padding: 50px 16px 0px 16px;
        }
        .content {
            width: 100%;
            padding: 0 16px 60px 16px;
            text-align: center;
            @media (min-width: 768px) {
                width: 50%;
                padding: 0 0px 0px 0px;
                text-align: left;
            }
            .buttons {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                gap: 20px;
                justify-content: center;
                @media (min-width: 768px) {
                    justify-content: left;
                }
            }
        }
        h2 {
            font-family: var(--font-bebas-neue),sans-serif;
            font-size: 48px;
            padding: 0px 0 20px 0;
            @media (min-width: 768px) {
                font-size: 50px;
                padding: 50px 0 20px 0;
            }
            @media (min-width: 1200px) {
                font-size: 60px;
            }
        }
        p {
            font-size: 20px;
            padding: 0 0 50px 0;
        }
        .image {
            position: relative;
            width: 100%;
            height: 350px;
            @media (min-width: 768px) {
                width: 50%;
                height: 110%;
            }
            @media (min-width: 1200px) {
                height: 110%;
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
        color: #ffffff;
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
            width: auto;
            justify-content: center;
            text-align: center;
            margin: 50px 15px 0 auto;
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

const CommitmentSection = styled.div`
    text-align: center;
    padding: 0 16px 150px 16px;
    h6 {
        position: relative;
        width: 100%;
        text-wrap: nowrap;
        font-family: var(--font-bebas-neue),sans-serif;
        font-size: 200px;
        color: #DFDFDF;
        opacity: 0.25;
        margin: 0 auto 0 -50px;
        line-height: 0.8;
        text-align: center;
        z-index: 2;
    }
    h5 {
        position: relative;
        font-family: var(--font-lato),sans-serif;
        text-transform: uppercase;
        color: #D12127;
        letter-spacing: 1px;
        padding-bottom: 10px;
        margin-top: -40px;
        z-index: 3;
    }
    p {
        font-family: var(--font-lato),sans-serif;
        font-weight: 600;
        font-size: 16px;
        max-width: 1000px;
        margin: 0 auto;
        @media (min-width: 768px) {
            font-size: 25px;
        }
        @media (min-width: 992px) {
            font-size: 30px;
        }
    }
`;

// #endregion

export default function Page({ pageData, projects, serviceAreas }) {

    // #region Logic
    
    useUpdateHeaderClass();

    let heroButtonOne = getButtonLink(pageData.acf.hero_section.filled_button.link_to_where, pageData.acf.hero_section.filled_button.onsite_link, pageData.acf.hero_section.filled_button.offsite_link, pageData.acf.hero_section.filled_button.file_link);

    let heroButtonTwo = getButtonLink(pageData.acf.hero_section.outline_button.link_to_where, pageData.acf.hero_section.outline_button.onsite_link, pageData.acf.hero_section.outline_button.offsite_link, pageData.acf.hero_section.outline_button.file_link);

    let residentialButtonOne = getButtonLink(pageData.acf.residential_services.filled_button.link_to_where, pageData.acf.residential_services.filled_button.onsite_link, pageData.acf.residential_services.filled_button.offsite_link, pageData.acf.residential_services.filled_button.file_link);

    let residentialButtonTwo = getButtonLink(pageData.acf.residential_services.text_button.link_to_where, pageData.acf.residential_services.text_button.onsite_link, pageData.acf.residential_services.text_button.offsite_link, pageData.acf.residential_services.text_button.file_link);

    let commercialButtonOne = getButtonLink(pageData.acf.commercial_services.filled_button.link_to_where, pageData.acf.commercial_services.filled_button.onsite_link, pageData.acf.commercial_services.filled_button.offsite_link, pageData.acf.commercial_services.filled_button.file_link);

    let commercialButtonTwo = getButtonLink(pageData.acf.commercial_services.text_button.link_to_where, pageData.acf.commercial_services.text_button.onsite_link, pageData.acf.commercial_services.text_button.offsite_link, pageData.acf.commercial_services.text_button.file_link);

    let ourProjectsButton = getButtonLink(pageData.acf.our_projects.button.link_to_where, pageData.acf.our_projects.button.onsite_link, pageData.acf.our_projects.button.offsite_link, pageData.acf.our_projects.button.file_link);

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

    const [postHeadSection, setPostHeadSection] = useState('div1');

    const togglePostHeadSection = (divId) => {
        setPostHeadSection(divId);
    };

    const [projectFilterBox, setProjectFilterBox] = useState(false);

    const toggleProjectFilterBox = () => {
        setProjectFilterBox(currentState => !currentState);
    };

    const [projectFilter, setProjectFilter] = useState('div1');

    const toggleProjectFilter = (divId) => {
        setProjectFilter(divId);
    };

    const testimonials = pageData.global_sections[3];

    const serviceAreaSectionData = pageData.global_sections[4];

    const badgeInfo = pageData.global_sections[5];

    // #endregion

    return (
        <Wrapper>
            <Hero>
                <video playsInline autoPlay muted loop>
                    <source src={pageData.acf.hero_section.background_video.url} poster="https://inside.chandler-roofing.com/wp-content/uploads/2024/03/Image-1.jpg" type="video/mp4" />
                    Your browser does not support the video tag. I suggest you upgrade your browser.
                </video>
                <div className="overlay-dark"></div>
                <div className="content">
                    <h1>{pageData.acf.hero_section.title}</h1>
                    <p>{pageData.acf.hero_section.paragraph}</p>
                    <div className="buttons">
                        <Link className="filled-button" href={heroButtonOne}>
                            {pageData.acf.hero_section.filled_button.text}
                        </Link>
                        <Link className="white-outline-button" href={heroButtonTwo}>{pageData.acf.hero_section.outline_button.text}</Link>
                    </div>
                </div>
            </Hero>
            <ServiceTypes>
                <div className="toggle">
                    <button className={postHeadSection === 'div1' ? 'active-service-trigger' : 'service-trigger'} onClick={() => togglePostHeadSection('div1')}>
                        <div className="gradient-1"></div>
                        <div className="gradient-2"></div>
                        <div className="text">Residential Services</div>
                    </button>
                    <button className={postHeadSection === 'div2' ? 'active-service-trigger' : 'service-trigger'} onClick={() => togglePostHeadSection('div2')}>
                        <div className="gradient-3"></div>
                        <div className="gradient-4"></div>
                        <div className="text">Commercial Services</div>
                    </button>
                </div>
                <div className="service-information">
                    <div className={postHeadSection === 'div1' ? 'active-service-info' : 'service-info'} onClick={() => togglePostHeadSection('div1')}>
                        <div className="content">
                            <h2>{pageData.acf.residential_services.title}</h2>
                            <p>{pageData.acf.residential_services.paragraph}</p>
                            <div className="buttons">
                                <Link className="filled-button" href={residentialButtonOne}>{pageData.acf.residential_services.filled_button.text}</Link>
                                <Link className="text-button" href={residentialButtonTwo}>{pageData.acf.residential_services.text_button.text}</Link>
                            </div>
                        </div>
                        <div className="image">
                            <Image src={pageData.acf.residential_services.image.url} alt={pageData.acf.residential_services.image.alt} fill style={{ objectFit: 'cover' }} placeholder="blur" blurDataURL={pageData.acf.residential_services.image.sizes.thumbnail} />
                        </div>
                    </div>
                    <div className={postHeadSection === 'div2' ? 'active-service-info' : 'service-info'} onClick={() => togglePostHeadSection('div2')}>
                        <div className="content">
                                <h2>{pageData.acf.commercial_services.title}</h2>
                                <p>{pageData.acf.commercial_services.paragraph}</p>
                                <div className="buttons">
                                    <Link className="filled-button" href={commercialButtonOne}>{pageData.acf.commercial_services.filled_button.text}</Link>
                                    <Link className="text-button" href={commercialButtonTwo}>{pageData.acf.commercial_services.text_button.text}</Link>
                                </div>
                            </div>
                            <div className="image">
                                <Image src={pageData.acf.commercial_services.image.url} alt={pageData.acf.commercial_services.image.alt} fill style={{ objectFit: 'cover' }} placeholder="blur" blurDataURL={pageData.acf.commercial_services.image.sizes.thumbnail} />
                            </div>
                    </div>
                </div>
            </ServiceTypes>
            <ProjectShowcase>
                <div className="title-section">
                    <h2>{pageData.acf.our_projects.title}</h2>
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
                        <Link className="filled-button" href={ourProjectsButton}>{pageData.acf.our_projects.button.text}</Link>
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
                                            <Image src={item.acf.hero.image.url} alt={item.acf.hero.image.alt} fill style={{ objectFit: 'cover' }} placeholder="blur" blurDataURL={item.acf.hero.image.sizes.thumbnail} />
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
                                            <Image src={item.acf.hero.image.url} alt={item.acf.hero.image.alt} fill style={{ objectFit: 'cover' }} placeholder="blur" blurDataURL={item.acf.hero.image.sizes.thumbnail} />
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
                                            <Image src={item.acf.hero.image.url} alt={item.acf.hero.image.alt} fill style={{ objectFit: 'cover' }} placeholder="blur" blurDataURL={item.acf.hero.image.sizes.thumbnail} />
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
                        <Link className="filled-button" href={ourProjectsButton}>{pageData.acf.our_projects.button.text}</Link>
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
                                                <Image src={item.acf.hero.image.url} alt={item.acf.hero.image.alt} fill style={{ objectFit: 'cover' }} placeholder="blur" blurDataURL={item.acf.hero.image.sizes.thumbnail} />
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
                                                <Image src={item.acf.hero.image.url} alt={item.acf.hero.image.alt} fill style={{ objectFit: 'cover' }} placeholder="blur" blurDataURL={item.acf.hero.image.sizes.thumbnail} />
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
                                            <Image src={item.acf.hero.image.url} alt={item.acf.hero.image.alt} fill style={{ objectFit: 'cover' }} placeholder="blur" blurDataURL={item.acf.hero.image.sizes.thumbnail} />
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
                        <Link className="filled-button" href={ourProjectsButton}>{pageData.acf.our_projects.button.text}</Link>
                    </div>
                    </>
                )}
            </ProjectShowcase>

            <TestimonialSection testimonials={testimonials} />

            <CertificatesAndLicenses badgeInfo={badgeInfo} />

            <ServiceAreaSection serviceAreaSectionData={serviceAreaSectionData} serviceAreas={serviceAreas} />

            <CommitmentSection>
                <div className="wrapper">
                    <h6>{pageData.acf.commitment_to_you.transparent_title}</h6>
                    <div className="content">
                        <h5>{pageData.acf.commitment_to_you.title}</h5>
                        <p>{pageData.acf.commitment_to_you.paragraph}</p>
                    </div>
                </div>
            </CommitmentSection>

        </Wrapper>
    );
}
