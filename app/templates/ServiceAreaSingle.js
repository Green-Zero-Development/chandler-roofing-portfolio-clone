'use client';

import { useEffect, useState } from 'react';
import useUpdateHeaderClass from '../hooks/useUpdateHeaderClass';
import { motion } from "framer-motion";
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
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
    background-color: #EEF1F5;
    margin-bottom: -90px;
    padding-bottom: 150px;
`;

const Hero = styled.div`
    position: relative;
    margin-top: -90px;
    border-bottom: 8px solid #d12127;
    @media (min-width: 992px) {
        
    }
    .overlay-light {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(255,255,255,0.7);
        z-index: 3;
    }
    .wrapper {
        position: relative;
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        align-items: start;
        gap: 25px;
        max-width: 1440px;
        margin: 0 auto;
        padding: 90px 16px 0px 16px;
        z-index: 5;
        @media (min-width: 768px) {
            grid-template-columns: repeat(2, 1fr);
            padding: 90px 0px 0px 16px;
        }
        @media (min-width: 992px) {
            gap: 50px;
        }
        .content {
            display: flex;
            flex-wrap: wrap;
            padding: 100px 0px 100px 0px;
            text-align: center;
            @media (min-width: 768px) {
                text-align: left;
                padding: 100px 0px 0px 16px;
            }
            h1 {
                width: 100%;
                font-size: 55px;
                @media (min-width: 516px) {
                    font-size: 65px;
                }
                @media (min-width: 992px) {
                    font-size: 75px;
                }
            }
            h5 {
                width: 100%;
                font-family: var(--font-lato),sans-serif;
                text-transform: uppercase;
                color: #D12127;
                letter-spacing: 1px;
                padding-bottom: 10px;
            }
            p {
                width: 100%;
                font-size: 18px;
                padding-bottom: 20px;
                @media (min-width: 768px) {
                    max-width: 90%;
                }
            }
            a {
                margin: 0 auto;
            }
            @media (min-width: 768px) {
                a {
                    margin-left: 0;
                }
            }
        }
        .image {
            display: none;
            position: relative;
            height: 610px;
            margin-bottom: -30px;
            @media (min-width: 768px) {
                display: block;
            }
            @media (min-width: 992px) {
                height: 510px;
            }
        }
    }
`;

const ContentSection = styled.div`
    
    @media (min-width: 992px) {
        
    }
    .padding {
        padding-top: 100px;
    }
    .wrapper {
        max-width: 1140px;
        margin: 0 auto;
        padding: 50px 16px 50px 16px;
        white-space: pre-line;
        blockquote {
            font-size: 20px;
            font-weight: 700;
            padding: 0 0px 0 20px;
            border-left: 4px solid #D12127;
        
        }
    }
`;

const ServiceTypes = styled.div`

    position: relative;
    z-index: 6;
    .toggle {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        background-color: #161616;
        
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
        z-index: 5;
        @media (min-width: 768px) {
            padding: 50px 16px 150px 16px;
            margin: 0 0 -300px 0;
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
            }
        }
    }
`;

// #endregion

export default function Page({ pageData }) {

    // #region Logic

    useUpdateHeaderClass();

    let heroButtonLink = getButtonLink(pageData.acf.hero.button.link_to_where, pageData.acf.hero.button.onsite_link, pageData.acf.hero.button.offsite_link, pageData.acf.hero.button.file_link);

    let residentialButtonOne = getButtonLink(pageData.acf.residential_services.filled_button.link_to_where, pageData.acf.residential_services.filled_button.onsite_link, pageData.acf.residential_services.filled_button.offsite_link, pageData.acf.residential_services.filled_button.file_link);

    let residentialButtonTwo = getButtonLink(pageData.acf.residential_services.text_button.link_to_where, pageData.acf.residential_services.text_button.onsite_link, pageData.acf.residential_services.text_button.offsite_link, pageData.acf.residential_services.text_button.file_link);

    let commercialButtonOne = getButtonLink(pageData.acf.commercial_services.filled_button.link_to_where, pageData.acf.commercial_services.filled_button.onsite_link, pageData.acf.commercial_services.filled_button.offsite_link, pageData.acf.commercial_services.filled_button.file_link);

    let commercialButtonTwo = getButtonLink(pageData.acf.commercial_services.text_button.link_to_where, pageData.acf.commercial_services.text_button.onsite_link, pageData.acf.commercial_services.text_button.offsite_link, pageData.acf.commercial_services.text_button.file_link);

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

    const scheduleEstimateCta = pageData.global_sections[2];

    const address = pageData.site_data[2].acf.value_list[0];

    const phone = pageData.site_data[3].acf.value_list[0];

    const email = pageData.site_data[1].acf.value_list[0];

    // #endregion

    return (
        <PageWrapper>
        <Hero>
            <Image src={pageData.acf.hero.image.url} alt={pageData.acf.hero.image.alt} fill style={{ objectFit: 'cover' }} />
            <div className="overlay-light"></div>
            <div className="wrapper">
                <div className="content">
                    <h5>{pageData.acf.hero.subtitle}</h5>
                    <h1>{pageData.acf.hero.title}</h1>
                    <p>{pageData.acf.hero.paragraph}</p>
                    <a href={heroButtonLink}>
                        <div className="filled-button">{pageData.acf.hero.button.text}</div>
                    </a>
                </div>
                <div className="image">
                    <Image src={pageData.acf.hero.image.url} alt={pageData.acf.hero.image.alt} fill style={{ objectFit: 'cover' }} />
                </div>
            </div>
        </Hero>

        <ContentSection>
            <div className="padding"></div>
            <div className="html-content wrapper" dangerouslySetInnerHTML={{ __html: pageData.acf.content_block }}>
                
            </div>
        </ContentSection>

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
                        <Image src={pageData.acf.residential_services.image.url} alt={pageData.acf.residential_services.image.alt} fill style={{ objectFit: 'cover' }} />
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
                            <Image src={pageData.acf.commercial_services.image.url} alt={pageData.acf.commercial_services.image.alt} fill style={{ objectFit: 'cover' }} />
                        </div>
                </div>
            </div>
        </ServiceTypes>

        <TestimonialSection testimonials={testimonials} />

        <ScheduleEstimateCta scheduleEstimateCta={scheduleEstimateCta} address={address} phone={phone} email={email} />

        </PageWrapper>
    );
}
