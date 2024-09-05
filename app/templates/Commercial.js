'use client';

import useUpdateHeaderClass from '../hooks/useUpdateHeaderClass';
import { motion } from "framer-motion";
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import TestimonialSection from "../components/TestimonialSection";

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

const Hero = styled.div`
    position: relative;
    margin-top: -90px;
    @media (min-width: 992px) {
        
    }
    .overlay-dark {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,0.5);
        z-index: 3;
        @media (min-width: 516px) {
           
        }
    }
    .wrapper {
        position: relative;
        padding: 80px 0 80px 0;
        .content {
            position: relative;
            display: flex;
            flex-wrap: wrap;
            max-width: 780px;
            padding: 150px 16px 150px 16px;
            margin: 0 auto;
            z-index: 4;
            h2 {
                width: 100%;
                font-family: var(--font-lato),sans-serif;
                text-transform: uppercase;
                font-size: 14px;
                color: #D12127;
                letter-spacing: 2px;
                text-align: center;
            }
            h1 {
                width: 100%;
                font-size: 65px;
                color: #ffffff;
                text-align: center;
                padding: 6px 0 10px 0;
                @media (min-width: 768px) {
                    font-size: 75px;
                }
            }
            p {
                width: 100%;
                font-size: 20px;
                color: #ffffff;
                text-align: center;
                padding: 0 0 40px 0;
            }
            .filled-button {
                width: auto;
                margin: 0 auto;
            }
        }
    }
`;

const PostHero = styled.div`
    .wrapper {
        position: relative;
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 15px;
        max-width: 1440px;
        margin: -100px auto 0 auto;
        padding: 0px 16px 80px 16px;
        z-index: 4;
        @media (min-width: 992px) {
            grid-template-columns: repeat(4, 1fr);
        }
        .link-box {
            background-color: #ffffff;
            border-top: 8px solid #D12127;
            padding: 25px; 
            box-shadow: 0px 2px 12px 0px rgba(0,0,0,0.15);
            transition: 0.25s;
            &:hover  {
                background-color: #d12127;
                transform: translateY(-5px);
                transition: 0.25s;
                h3 {
                    color: #ffffff;
                }
                p {
                    color: #ffffff;
                }
            }
            h3 {
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-family: var(--font-bebas-neue),sans-serif;
                font-size: 32px;
                color: #000000;
                padding: 0 0 5px 0;
                svg {
                    margin-top: -5px;
                }
            }
            p {
                font-size: 16px;
            }
        }
    }
`;

const ServicesList = styled.div`
    .wrapper {
        max-width: 1400px;
        padding: 50px 16px 0px 16px;
        margin: 0 auto;
        @media (min-width: 992px) {
            
        }
        .box {
            gap: 40px;
            @media (min-width: 768px) {
                display: grid;
                grid-template-columns: repeat(12, 1fr);
            }
            h2 {
                grid-column: span 12 / span 12;
                font-size: 45px;
                color: #000000;
                padding: 0 0 25px 0;
                @media (min-width: 768px) {
                    grid-column: span 4 / span 4;
                    padding: 0 0 0px 0;
                }
                @media (min-width: 992px) {
                    font-size: 60px;
                }
            }
            .content {
                grid-column: span 12 / span 12;
                @media (min-width: 768px) {
                    grid-column: span 8 / span 8;
                }
                .page-p {
                    font-size: 20px;
                    color: #000000;
                    padding: 0 0 40px 0;
                }
                .services-list {
                    display: grid;
                    grid-template-columns: repeat(1, 1fr);
                    gap: 30px;
                    @media (min-width: 516px) {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    @media (min-width: 768px) {
                        grid-template-columns: repeat(1, 1fr);
                    }
                    @media (min-width: 992px) {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    a {
                        &:hover  {
                            h3 {
                                color: #D12127;
                                svg {
                                    visibility: visible;
                                    transform: translateX(0px);
                                    transition: 0.25s;
                                }
                            }
                        }
                    }
            
                    h3 {
                        display: flex;
                        align-items: center;
                        gap: 20px;
                        font-family: var(--font-bebas-neue),sans-serif;
                        font-size: 32px;
                        color: #000000;
                        padding: 0 0 5px 0;
                        @media (min-width: 1200px) {
                            font-size: 45px;
                        }
                        svg {
                            visibility: hidden;
                            margin-top: -5px;
                            transform: translateX(-2px);
                        }
                    }
                    p {
                        font-size: 16px;
                        line-height: 1.5;
                    }
                }
            }
        }
    }
`;

const WhyUs = styled.div`
    .wrapper {
        grid-template-columns: repeat(2, 1fr);
        gap: 25px;
        max-width: 1400px;
        margin: 0 auto;
        padding: 50px 16px 200px 16px;
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

const ProjectsCta = styled.div`
    background-color: #eef1f5;
    margin-bottom: -100px;
    padding-bottom: 220px;
    @media (min-width: 992px) {
        
    }
    .wrapper {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column-reverse;
        gap: 50px;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0px 16px 0 16px;
        @media (min-width: 768px) {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
        }
        .content {
            padding: 60px 0 0 0;
            h5 {
                width: 100%;
                font-family: var(--font-lato),sans-serif;
                text-transform: uppercase;
                font-size: 14px;
                color: #D12127;
                letter-spacing: 2px;
            }
            h4 {
                width: 100%;
                font-family: var(--font-bebas-neue),sans-serif;
                font-size: 56px;
                color: #000000;
                padding: 6px 0 10px 0;
                @media (min-width: 992px) {
                    font-size: 65px;
                }
            }
            p {
                width: 100%;
                font-size: 20px;
                color: #000000;
                padding: 0 0 40px 0;
            }
            .buttons {
                display: flex;
                flex-wrap: wrap;
                gap: 20px;
                @media (min-width: 768px) {
                    
                }
            }
        }
        .image {
            position: relative;
            width: 100%;
            height: 250px;
            margin-top: -50px;
            @media (min-width: 516px) {
                height: 400px;
            }
            @media (min-width: 768px) {
                height: 500px;
            }
        }
    }
`;

// #endregion

export default function Page({ pageData }) {

    // #region Logic

    useUpdateHeaderClass();

    let heroButtonLink = getButtonLink(pageData.acf.hero.button.link_to_where, pageData.acf.hero.button.onsite_link, pageData.acf.hero.button.offsite_link, pageData.acf.hero.button.file_link);

    const testimonials = pageData.global_sections[3];

    let projectsCtaButtonOne = getButtonLink(pageData.acf.projects.filled_button.link_to_where, pageData.acf.projects.filled_button.onsite_link, pageData.acf.projects.filled_button.offsite_link, pageData.acf.projects.filled_button.file_link);

    let projectsCtaButtonTwo = getButtonLink(pageData.acf.projects.outline_button.link_to_where, pageData.acf.projects.outline_button.onsite_link, pageData.acf.projects.outline_button.offsite_link, pageData.acf.projects.outline_button.file_link);

    // #endregion

    return (
        <>
        <Hero>
            <div className="wrapper">
                <Image src={pageData.acf.hero.background_image.url} alt={pageData.acf.hero.background_image.alt} fill style={{ objectFit: 'cover' }} />
                <div className="overlay-dark"></div>
                <div className="wrapper">
                    <div className="content">
                        <h2>{pageData.acf.hero.subtitle}</h2>
                        <h1>{pageData.acf.hero.title}</h1>
                        <p>{pageData.acf.hero.paragraph}</p>
                        <Link className="filled-button" href={heroButtonLink}>
                            {pageData.acf.hero.button.text}
                        </Link>
                    </div>
                </div>
            </div>
        </Hero>
        <PostHero>
            <div className="wrapper">
                {pageData.acf.post_hero_box.map((item, index) => {
                    return (
                        <a key={index} className="link-box" href={item.link}>
                            <h3>
                                {item.title}
                                <svg width="25" height="17" viewBox="0 0 25 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.0861 0.285156L14.7509 1.62977L20.4157 7.33441H0.0302734V9.23602L20.4155 9.23608L14.7509 14.9405L16.0861 16.2852L24.0303 8.28516L16.0861 0.285156Z" fill="white"/>
                                </svg>
                            </h3>
                            <p>{item.paragraph}</p>
                        </a>
                    );
                })}
            </div>
        </PostHero>
        <ServicesList>
            <div className="wrapper">
                <div className="box">
                    <h2>{pageData.acf.services.title}</h2>
                    <div className="content">
                        <p className="page-p">{pageData.acf.services.paragraph}</p>
                        <div className="services-list">
                        {pageData.acf.services.Service.map((item, index) => {
                            return (
                                <a key={index} className="" href={item.link}>
                                    <h3>
                                        {item.title}
                                        <svg width="25" height="17" viewBox="0 0 25 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.0861 0.285156L14.7509 1.62977L20.4157 7.33441H0.0302734V9.23602L20.4155 9.23608L14.7509 14.9405L16.0861 16.2852L24.0303 8.28516L16.0861 0.285156Z" fill="#D12127"/>
                                        </svg>
                                    </h3>
                                    <p>{item.paragraph}</p>
                                </a>
                            );
                        })}

                        </div>
                    </div>
                </div>
            </div>
        </ServicesList>

        <TestimonialSection testimonials={testimonials} />

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
        <ProjectsCta>
            <div className="wrapper">
                <div className="content">
                    <h5>{pageData.acf.projects.subtitle}</h5>
                    <h4>{pageData.acf.projects.title}</h4>
                    <p>{pageData.acf.projects.paragraph}</p>
                    <div className="buttons">
                        <Link className="filled-button" href={projectsCtaButtonOne}>
                            {pageData.acf.projects.filled_button.text}
                        </Link>
                        <Link className="dark-outline-button" href={projectsCtaButtonTwo}>{pageData.acf.projects.outline_button.text}</Link>
                    </div>
                </div>
                <div className="image">
                    <Image src={pageData.acf.projects.image.url} alt={pageData.acf.projects.image.alt} fill style={{ objectFit: 'cover' }} />
                </div>
            </div>
        </ProjectsCta>
        </>
    );
}
