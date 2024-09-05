'use client';

import styled from 'styled-components';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

const Section = styled.div`
    position: relative;
    .wrapper {
        
        grid-template-columns: repeat(12, 1fr);
        gap: 50px;
        align-items: start;
        max-width: 1200px;
        margin: 0 auto;
        padding: 150px 16px 150px 16px;
        font-family: var(--font-bebas-neue),sans-serif;
        color: #ffffff;
        @media (min-width: 768px) {
            display: grid;
        }
        .overlay-dark-alt {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-color: rgba(0,0,0,0.5);
            z-index: 3;
        }
        .content {
            position: relative;
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            padding-bottom: 60px;
            z-index: 4;
            @media (min-width: 768px) {
                grid-column: span 4 / span 4;
                padding-bottom: 0px;
            }
            @media (min-width: 992px) {
                grid-column: span 3 / span 3;
            }
            h4 {
                width: 100%;
                font-size: 52px;
                padding-right: 50px;
            }
            .filled-button {
                width: 100%;
                justify-content: center;
                text-align: center;
                margin: 30px 0 25px 0;
                @media (min-width: 516px) {
                    width: auto;
                }
            }
            .text-button {
                width: 100%;
            
            }
        }
        .list {
            position: relative;
            grid-template-columns: repeat(2, 1fr);
            width: 100%;
            z-index: 4;
            @media (min-width: 516px) {
                display: grid;
            }
            @media (min-width: 768px) {
                grid-column: span 8 / span 8;
            }
            @media (min-width: 992px) {
                grid-template-columns: repeat(3, 1fr);
                grid-column: span 9 / span 9;
            }
            li {
                position: relative;
                display: flex;
                align-items: center;
                gap: 0px;
                height: 95%;
                font-size: 40px;
                line-height: 1;
                margin: 30px 0 30px 0;
                transition: 0.25s;
                @media (min-width: 516px) {
                    margin: 0 0 30px 0;
                }
                @media (min-width: 768px) {
                    gap: 15px;
                }
                @media (min-width: 1200px) {
                    font-size: 52px;
                }
                .active {
                    width: 4px;
                    height: 100%;
                    background-color: #d12127;
                    margin-left: 25px;
                    transition: 0.25s;
                }
                .not-active {
                    width: 4px;
                    height: 100%;
                    background-color: transparent;
                    transition: 0.25s;
                }
            }
        }
    }
`;

export default function Page({ serviceAreaSectionData, serviceAreas }) {

    let filledButtonLink = getButtonLink(serviceAreaSectionData.acf.filled_button.link_to_where, serviceAreaSectionData.acf.filled_button.onsite_link, serviceAreaSectionData.acf.filled_button.offsite_link, serviceAreaSectionData.acf.filled_button.file_link);

    let textButtonLink = getButtonLink(serviceAreaSectionData.acf.text_button.link_to_where, serviceAreaSectionData.acf.text_button.onsite_link, serviceAreaSectionData.acf.text_button.offsite_link, serviceAreaSectionData.acf.text_button.file_link);

    const [hoverServiceArea, setHoverServiceArea] = useState(null);

    return (
        <Section>
            <div className="wrapper">
                <Image src={serviceAreaSectionData.acf.background_image.url} alt={serviceAreaSectionData.acf.background_image.alt} fill style={{ objectFit: 'cover' }} />
                <div className="overlay-dark-alt"></div>
                <div className="content">
                    <h4>{serviceAreaSectionData.acf.title}</h4>
                    <Link className="filled-button" href={filledButtonLink}>{serviceAreaSectionData.acf.filled_button.text}</Link>
                    <Link className="text-button" href={textButtonLink}>{serviceAreaSectionData.acf.text_button.text}</Link>
                </div>
                <ul className="list">
                    {serviceAreas.map((item, index) => {
                        return (
                            <Link key={index} href={`/service-areas/${item.slug}`}>
                                <li onMouseEnter={() => setHoverServiceArea(index)} onMouseLeave={() => setHoverServiceArea(null)}>
                                    <div className={hoverServiceArea === index ? 'active' : 'not-active'}></div>
                                    {item.title.replace(' County', '')}
                                </li>
                            </Link>
                        );
                    })}
                </ul>
            </div>
        </Section>
    );
}
