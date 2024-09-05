'use client';

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
    .residential-hero {
        .overlay {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-color: rgba(255,255,255,0.7);
            z-index: 3;
        }
        h1 {
            color: #000000;
        }
        p {
            color: #000000;
        }
    }
    .commercial-hero {
        .overlay {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-color: rgba(0,0,0,0.7);
            z-index: 3;
        }
        h1 {
            color: #ffffff;
        }
        p {
            color: #ffffff;
        }
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

const PageImages = styled.div`
    
    @media (min-width: 992px) {
        
    }
    .images-two {
        padding-bottom: 100px !important;
    }
    .wrapper {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 20px;
        max-width: 1310px;
        margin: 0 auto;
        padding: 0px 16px 0px 16px;
        @media (min-width: 768px) {
            grid-template-columns: repeat(2, 1fr);
        }
        & .image:nth-child(2){
            @media (min-width: 768px) {
                margin-top: 100px;
            }
        }
        .image {
            position: relative;
            width: 100%;
            height: 200px;
            @media (min-width: 516px) {
                height: 250px;
            }
            @media (min-width: 768px) {
                height: 365px;
            }
        }
    }
`;

const ProjectShowcase = styled.div`
    .project-showcase {
        max-width: 1250px;
        margin: 0 auto 0 auto;
        padding: 0 0px 0 16px;
        overflow: hidden;
        @media (min-width: 768px) {
            padding: 0 16px 0 16px;
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

    const residentialProjects = [];
    const commercialProjects = [];

    {projects.map((item, index) => {
        if (item.categories.includes('Residential')) {
            residentialProjects.push(item);
        } else if (item.categories.includes('Commercial')) {
            commercialProjects.push(item);
        }
        else{
            
        }
    })}

    let heroButtonLink = getButtonLink(pageData.acf.hero.button.link_to_where, pageData.acf.hero.button.onsite_link, pageData.acf.hero.button.offsite_link, pageData.acf.hero.button.file_link);

    const scheduleEstimateCta = pageData.global_sections[2];

    const address = pageData.site_data[2].acf.value_list[0];

    const phone = pageData.site_data[3].acf.value_list[0];

    const email = pageData.site_data[1].acf.value_list[0];

    const projectsToDisplay = pageData.parent === 'Residential' ? residentialProjects : commercialProjects;

    // #endregion

    return (
        <PageWrapper>
        <Hero>
            <div className={pageData.parent === 'Residential' ? 'residential-hero' : 'commercial-hero'}>
                <Image src={pageData.acf.hero.image.url} alt={pageData.acf.hero.image.alt} fill style={{ objectFit: 'cover' }} />
                <div className={pageData.parent === 'Residential' ? 'overlay overlay-light' : 'overlay overlay-dark'}></div>
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
                        <Image src={pageData.acf.hero.image.url} alt={pageData.acf.hero.image.alt} fill style={{ objectFit: 'cover' }} placeholder="blur" blurDataURL={pageData.acf.hero.image.sizes.thumbnail} />
                    </div>
                </div>
            </div>
        </Hero>

        <ContentSection>
            <div className="padding"></div>
            <div className="html-content wrapper" dangerouslySetInnerHTML={{ __html: pageData.acf.first_content_block }}>
                
            </div>
        </ContentSection>
        <PageImages>
            <div className="wrapper">
                {pageData.acf.page_images.map((item, index) => {
                    return (
                        <div key={index} className="image">
                            <Image src={item.url} alt={item.alt} fill style={{ objectFit: 'cover' }} />
                        </div>
                    );
                })}
            </div>
        </PageImages>
        <ContentSection>
            <div className="html-content wrapper" dangerouslySetInnerHTML={{ __html: pageData.acf.second_content_block }}>
                
            </div>
        </ContentSection>

        {
            pageData.acf.page_images_two && pageData.acf.page_images_two.length > 0 && (
                <PageImages>
                    <div className="wrapper images-two">
                        {pageData.acf.page_images_two.map((item, index) => (
                            <div key={index} className="image">
                                <Image src={item.url} alt={item.alt} fill style={{ objectFit: 'cover' }} />
                            </div>
                        ))}
                    </div>
                </PageImages>
            )
        }


        <ProjectShowcase>
            <div className="project-showcase">
                <div className="title-section">
                    <h2>Related Projects</h2>
                    <Link className="filled-button" href={`/projects?type=${pageData.parent}`}>View more {pageData.parent} projects</Link>
                </div>
                <div className={`desktop-projects ${pageData.parent.toLowerCase()}-projects`}>
                    <div className="highlight">
                        {projectsToDisplay.map((item, index) => {
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
                        {projectsToDisplay.map((item, index) => {
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
                    <Splide hasTrack={false}
                        options={{
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
                                416: {},
                                516: {},
                                768: {}
                            }
                        }}
                    >
                        <SplideTrack>
                            {projectsToDisplay.map((item, index) => {
                                if (index < 3) {
                                    return (
                                        <SplideSlide key={index} className="splide__slide">
                                            <Link href={`${item.slug}`} className="box">
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
                                }
                            })}
                        </SplideTrack>
                    </Splide>
                    <Link className="filled-button" href={`/projects?type=${pageData.parent}`}>View more</Link>
                </div>
            </div>
        </ProjectShowcase>
        
        <ScheduleEstimateCta scheduleEstimateCta={scheduleEstimateCta} address={address} phone={phone} email={email} />

        </PageWrapper>
    );
}
