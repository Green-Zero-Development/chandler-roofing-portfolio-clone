'use client';

import useUpdateHeaderClass from '../hooks/useUpdateHeaderClass';
import { motion } from "framer-motion";
import styled from 'styled-components';
import Image from 'next/image';
import { useEffect } from 'react';

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
    position: relative;
    margin: -90px 0 -90px 0;
    .overlay-dark {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,0.75);
        z-index: 2;
    }
    @media (min-width: 992px) {
        
    }
`;

const Hero = styled.div`
    position: relative;
    padding: 200px 16px 200px 16px;
    z-index: 5;
    .wrapper {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 100px;
        max-width: 1400px;
        margin: 0 auto;
        @media (min-width: 768px) {
            grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 992px) {
            gap: 150px;
        }
        .content {
            color: #fff;
            h1 {
                font-family: var(--font-bebas-neue),sans-serif;
                font-size: 60px;
                margin-bottom: 1rem;
            }
            p {
                font-family: var(--font-lato),sans-serif;
                font-size: 20px;
                margin-bottom: 2rem;
            }
            .contact-group {
                margin-bottom: 2rem;
                h6 {
                  font-family: var(--font-lato),sans-serif;
                  font-size: 14px;
                  font-weight: 700;
                  text-transform: uppercase;
                  color: #D12127;
                  letter-spacing: 1px;
                  padding-bottom: 8px;
                }
                address {
                  font-family: var(--font-bebas-neue),sans-serif;
                  font-size: 24px;
                  text-decoration: none;
                  font-style: unset;
                  line-height: 1;
                }
                a {
                  font-family: var(--font-bebas-neue),sans-serif;
                  font-size: 24px;
                  text-decoration: none;
                }
            }
            ul {
                display: flex;
                align-items: center;
                gap: 2rem;
            }
        }
        .form {
            background-color: #eef1f5;
            border-top: 8px solid #D12127;
            padding: 25px;
        }
    }
    @media (min-width: 992px) {
        
    }
`;

// #endregion

export default function Page({ pageData }) {

    // #region Logic

    useUpdateHeaderClass();

    const address = pageData.site_data[2].acf.value_list[0];

    const phone = pageData.site_data[3].acf.value_list[0];

    const email = pageData.site_data[1].acf.value_list[0];

    useEffect(() => {
        Cognito.load("forms", { id: "80" });
    }, []);

    // #endregion

    return (
        <PageWrapper>
            <Image src={pageData.acf.background_image.url} alt={pageData.acf.background_image.alt} fill style={{ objectFit: 'cover' }} />
            <div className="overlay-dark"></div>
            <Hero>
                <div className="wrapper">
                    <div className="content">
                        <h1>{pageData.acf.hero.title}</h1>
                        <p>{pageData.acf.hero.paragraph}</p>
                        <div className="">
                            <div className="contact-group">
                                <h6>Address</h6>
                                <address>{address.street}, {address.city}, {address.state} {address.zip}</address>
                                </div>
                                <div className="contact-group">
                                <h6>Phone</h6>
                                <a href={`tel:${phone.value}`}>{phone.value}</a>
                                </div>
                                <div className="contact-group">
                                <h6>Email</h6>
                                <a href={`mailto:${email.value}`}>{email.value}</a>
                            </div>
                        </div>
                        <ul>
                            {pageData.acf.badges.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <Image src={item.url} alt={item.alt} width={150} height={150} />
                                        </li>
                                    );
                            })}
                        </ul>
                    </div>
                    <div className="form">
                        <div className="cognito">
                            <div className="loader">Form loading...</div>
                        </div>
                    </div>
                </div>
            </Hero>
        </PageWrapper>
    );
}
