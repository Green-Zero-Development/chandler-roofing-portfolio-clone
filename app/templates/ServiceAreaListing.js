'use client';

import useUpdateHeaderClass from '../hooks/useUpdateHeaderClass';
import { motion } from "framer-motion";
import styled from 'styled-components';
import Image from 'next/image';
import ServiceAreaSection from "../components/ServiceAreaSection";

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

// #endregion

export default function Page({ pageData, serviceAreas }) {

    useUpdateHeaderClass();

    const serviceAreaSectionData = pageData.global_sections[4];

    return (
        <>
        <Hero>
            <div className="wrapper">
                <h4 className="tag">{pageData.acf.hero.subtitle}</h4>
                <h1>{pageData.acf.hero.title}</h1>
                <p>{pageData.acf.hero.paragraph}</p>
            </div>
        </Hero>

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
        </>
    );
}
