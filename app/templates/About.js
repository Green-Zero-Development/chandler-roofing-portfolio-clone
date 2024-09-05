'use client';

import useUpdateHeaderClass from '../hooks/useUpdateHeaderClass';
import { motion } from "framer-motion";
import styled from 'styled-components';
import Image from 'next/image';
import TestimonialSection from "../components/TestimonialSection";
import ServiceAreaSection from "../components/ServiceAreaSection";
import ScheduleEstimateCta from "../components/ScheduleEstimateCta";
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

const AboutSection = styled.div`
    padding: 0 16px 0 16px;
    .img-wrapper {
        .image {
            position: relative;
            max-width: 1260px;
            width: 100%;
            height: 200px;
            margin: 0 auto;
            @media (min-width: 516px) {
                height: 400px;
            }
            @media (min-width: 768px) {
                height: 600px;
            }
        }
    }
    .content-wrapper {
        max-width: 1140px;
        padding: 100px 0 50px 0;
        margin: 0 auto;
        text-align: center;
        @media (min-width: 768px) {
            text-align: left;
        }
        h2 {
            font-size: 45px;
            margin: 0px 0 20px 0;
            @media (min-width: 768px) {
                font-size: 55px;
            }
        }
        .html-content {
            white-space: pre-line;
        }
    }
    @media (min-width: 992px) {
        
    }
`;

const TeamAnchor = styled.div`
    transform: translateY(-100px);
`;

const TeamSection = styled.div`
    .wrapper {
        max-width: 1260px;
        padding: 0 16px 0 16px;
        margin: 0 auto;
        h2 {
            font-size: 65px;
            margin: 10px 0 10px 0;
            text-align: center;
        }
        h5 {
            font-size: 20px;
            text-align: center;
            padding: 0 0 50px 0;
        }
        ul {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 25px;
            padding: 0 0 100px 0;
            @media (min-width: 516px) {
                grid-template-columns: repeat(2, 1fr);
            }
            @media (min-width: 768px) {
                grid-template-columns: repeat(3, 1fr);
            }
            li {
                box-shadow: 0px 2px 12px 0px rgba(0,0,0,0.15);
                .content {
                    padding: 20px;
                    h3 {
                        font-family: var(--font-bebas-neue),sans-serif;
                        font-size: 32px;
                        margin: 0 0 0px 0;
                        color: #000000;
                    }
                    p {
                        font-family: var(--font-lato),sans-serif;
                        color: #000000;
                    }
                }
            }
        }
        .image {
            position: relative;
            height: 400px;
            @media (min-width: 516px) {
                height: 300px;
            }
            @media (min-width: 992px) {
                height: 400px;
            }
        }
        .content {
            background-color: #ffffff;
            border-top: 8px solid #D12127;
        }
    }
    @media (min-width: 992px) {
        
    }
`;

const Badges = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0px 16px 170px 16px;
    h2 {
        font-size: 55px;
        margin: 10px 0 80px 0;
        text-align: center;
    }
    ul {
        display: flex;
        flex-wrap: wrap;
        gap: 30px;
        .badge {
            position: relative;
            width: 185px;
            height: 156px;
            margin: 0 auto;
            text-align: center;
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

// #endregion

export default function Page({ pageData, serviceAreas }) {

    // #region Logic

    useUpdateHeaderClass();

    const testimonials = pageData.global_sections[3];

    const serviceAreaSectionData = pageData.global_sections[4];

    const scheduleEstimateCta = pageData.global_sections[2];

    const address = pageData.site_data[2].acf.value_list[0];

    const phone = pageData.site_data[3].acf.value_list[0];

    const email = pageData.site_data[1].acf.value_list[0];
    
    const badgeInfo = pageData.global_sections[5];

    // #endregion

    return (
        <>
        <Hero>
            <div className="wrapper">
                <h4 className="tag">{pageData.acf.hero_section.pretitle}</h4>
                <h1>{pageData.acf.hero_section.title}</h1>
                <p>{pageData.acf.hero_section.paragraph}</p>
            </div>
        </Hero>

        <AboutSection>
            <div className="img-wrapper">
                <div className="image">
                    <Image src={pageData.acf.about_section.image.url} alt={pageData.acf.about_section.image.alt} fill style={{ objectFit: 'cover' }} />
                </div>
            </div>
            <div className="content-wrapper">
                <h2>{pageData.acf.about_section.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: pageData.acf.about_section.paragraph }} className="html-content" >

                </div>
            </div>
        </AboutSection>

        <TeamAnchor id="team"></TeamAnchor>

        <TeamSection>
            <div className="wrapper">
                <h2>{pageData.acf.team_section.title}</h2>
                <h5>{pageData.acf.team_section.subtitle}</h5>
                <ul>
                    {pageData.acf.team_section.team_member.map((teamMember, index) => (
                        <li key={index}>
                            <div className="image">
                                <Image src={teamMember.headshot.url} alt={teamMember.headshot.alt} fill style={{ objectFit: 'cover' }} />
                            </div>
                            <div className="content">
                                <h3>{teamMember.name}</h3>
                                <p>{teamMember.job_title}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </TeamSection>

        <Badges>
            <h2>{pageData.acf.certifications_section.title}</h2>
            <CertificatesAndLicenses badgeInfo={badgeInfo} />
        </Badges>

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

        <ServiceAreaSection serviceAreaSectionData={serviceAreaSectionData} serviceAreas={serviceAreas} />

        <ScheduleEstimateCta scheduleEstimateCta={scheduleEstimateCta} address={address} phone={phone} email={email} />

        </>
    );
}
