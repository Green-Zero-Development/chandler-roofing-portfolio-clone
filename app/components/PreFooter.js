'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

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
    .wrapper {
        position: relative;
        max-width: 1258px;
        margin: 0 auto -125px auto;
        z-index: 2;
        .bg-img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
        }
        .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(209, 33, 39, 0.85);
        }
        .content {
            position: relative;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: start;
            gap: 50px;
            padding: 80px 16px 80px 16px;
            @media (min-width: 768px) {
                flex-wrap: nowrap;
            }
            @media (min-width: 1200px) {
                flex-wrap: no-wrap;
                padding: 80px 60px 80px 60px;
                align-items: center;
            }
            z-index: 2;
            h5 {
                font-family: var(--font-bebas-neue),sans-serif;
                font-size: 48px;
                color: #ffffff;
                @media (min-width: 768px) {
                    font-size: 52px;
                }
            }
            .outline-button {
                margin: 0 0 0 auto;
            }
        }
    }
    @media (min-width: 992px) {
        
    }
`;

export default function Page({ preFooter }) {

    let buttonLink = getButtonLink(preFooter[0].acf.button.link_to_where, preFooter[0].acf.button.onsite_link, preFooter[0].acf.button.offsite_link, preFooter[0].acf.button.file_link);

    useEffect(() => {
        
    }, []);
    return (
        <Section>
            <div className="wrapper">
                <Image className="bg-img" src={preFooter[0].acf.background_image.url} alt={preFooter[0].acf.background_image.alt} fill style={{ objectFit: 'cover' }} />
                <div className="overlay" />
                <div className="content">
                    <h5>{preFooter[0].acf.title}</h5>
                    <Link className="outline-button" href={buttonLink}>{preFooter[0].acf.button.text}</Link>
                </div>
            </div>
        </Section>
    );
}
