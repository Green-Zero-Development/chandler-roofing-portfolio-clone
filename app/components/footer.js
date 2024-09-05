'use client';

import Link from 'next/link';
import styled from 'styled-components';

function getYear() {
    return new Date().getFullYear();
}

const FooterStyle = styled.footer`
    
    @media (min-width: 992px) {
        
    }
    .footer-section {
        background-color: #161616;
        color: #FFFFFF;
        padding: 200px 16px 100px 16px;
        .wrapper {
            max-width: 1258px;
            margin: 0 auto;
            @media (min-width: 768px) {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
            }
            @media (min-width: 1200px) {
                grid-template-columns: repeat(5, 1fr);
            }
            address {
                font-style: normal;
                font-weight: 700;
                line-height: 1.5;
                margin-top: 32px;
                margin-bottom: 50px;
                @media (min-width: 1200px) {
                    margin-bottom: 0px;
                }
            }
            h6 {
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 2px;
                padding-bottom: 8px;
            }
            li {
                font-size: 16px;
                a {
                    width: 100%;
                    &:hover {
                        color: #D12127;
                        text-decoration: underline;
                    }
                }
            }
            .footer-service-areas {
                grid-column: 2 / 4;
                ul {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    list-style: none;
                    padding: 0;
                    margin-bottom: 50px;
                    @media (min-width: 516px) {
                        grid-template-columns: repeat(3, 1fr);
                    }
                    @media (min-width: 1200px) {
                        margin-bottom: 0px;
                    }
                    li {
                        margin-bottom: 4px;
                    }
                }
            }
            .first-menu {
                margin-bottom: 50px;
                @media (min-width: 1200px) {
                    margin-bottom: 0px;
                }
            }
            .dropdown {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                a {
                    font-size: 16px;
                    margin-bottom: 4px;
                    &:hover {
                        color: #D12127;
                        text-decoration: underline;
                    }
                }
            }
            .contact-section {
                display: flex;
                flex-wrap: wrap;
                a {
                    width: 100%;
                    font-size: 16px;
                    margin-bottom: 4px;
                    &:hover {
                        color: #D12127;
                        text-decoration: underline;
                        svg {
                            fill: #D12127;
                            transition: fill 0.3s;
                        }
                    }
                }
                .social {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding-top: 8px;
                    svg {
                        fill: #ffffff;
                        transition: fill 0.3s;
                    }
                }
            }
        }
    }
    .post-footer {
        .wrapper {
            max-width: 1258px;
            margin: 0 auto;
            padding: 16px 8px 200px 8px;
            font-size: 12px;
            @media (min-width: 992px) {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                padding: 16px 8px 16px 8px;
            }
            .text {
                color: #FFFFFF;
                text-align: center;
                padding: 15px 0 50px 0;
                @media (min-width: 992px) {
                    text-align: left;
                    padding: 0;
                }
            }
            .links {
                display: flex;
                align-items: center;
                justify-content: center;
                @media (min-width: 992px) {
                    justify-content: flex-end;
                }
                li {
                    margin-left: 16px;
                    a {
                        color: #FFFFFF;
                        &:hover {
                            text-decoration: underline;
                        }
                    }
                }
            }
        }
        background-color: #323232;
    }
`;

export default function Page({siteName, footerMenu, socialMedia, logos, physicalAddresses, serviceAreas, phoneNumbers, emails, postFooterLinks}) {

    const instagram = socialMedia[0].acf.value_list[1].value;
    const facebook = socialMedia[0].acf.value_list[0].value;

    const footerLogo = logos[0].acf.footer_logo.url;
    const footerLogoAlt = logos[0].acf.footer_logo.alt;

    const street = physicalAddresses[0].values[0].street;
    const city = physicalAddresses[0].values[0].city;
    const state = physicalAddresses[0].values[0].state;
    const zip = physicalAddresses[0].values[0].zip;

    const phone = phoneNumbers[0].values[0].value;
    const email = emails[0].values[0].value;

    const postFooterLinkList = postFooterLinks[0].acf.link;

    return (
        <FooterStyle className="">
            <div className="footer-section">
                <div className="wrapper">
                    <div className="logo-section">
                        <a href="/">
                            <img src={footerLogo} alt={footerLogoAlt} />
                        </a>
                        <address>
                            {street}<br />
                            {city}, {state} {zip}
                        </address>
                    </div>
                    <div className="footer-service-areas">
                        <h6>Service Areas</h6>
                        <ul>
                            {serviceAreas.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <a href={`/service-areas/${item.slug}`}>
                                            {item.title.replace('County', '').replace(' ,', ',')}
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <ul className="first-menu">
                        {footerMenu.map((item) => {
                            if (item.children) {
                                return (
                                    <li key={item.id}>
                                        <h6 id="dropdown-trigger" className="footer-title dropdown-trigger">{item.title}</h6>
                                        <div id="dropdown" className="dropdown">
                                        {Object.keys(item.children).map((key, index) => {
                                            return (
                                                <Link key={index} href={item.children[key].url}>{item.children[key].title}</Link>
                                            );
                                        })}
                                        </div>
                                    </li>
                                )
                            } else {
                                return (
                                    <li key={item.id}>
                                        <Link href={item.url}>{item.title}</Link>
                                    </li>
                                )
                            }
                        })}
                    </ul>
                    <div className="contact-section">
                        <h6>Contact Us</h6>
                        <a href={`tel:${phone}`}>{phone}</a>
                        <a href={`mailto:${email}`}>Email Us</a>
                        <a href="/contact">Schedule an Estimate</a>
                        <div className="social">
                            <a href={facebook}>
                                <svg width="32" height="32" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">
                                <path d="M38.3763 21.4289C38.3763 11.7514 30.5789 3.90625 20.9601 3.90625C11.3413 3.90625 3.54382 11.7514 3.54382 21.4289C3.54382 30.1748 9.91267 37.4242 18.2388 38.7388V26.4941H13.8167V21.4289H18.2388V17.5685C18.2388 13.1769 20.839 10.751 24.8171 10.751C26.7228 10.751 28.7157 11.0933 28.7157 11.0933V15.4055H26.5197C24.3563 15.4055 23.6814 16.7563 23.6814 18.1421V21.4289H28.5116L27.7395 26.4941H23.6814V38.7388C32.0076 37.4242 38.3763 30.1752 38.3763 21.4289Z"/>
                                </svg>
                            </a>
                            <a href={instagram}>
                                <svg width="33" height="32" viewBox="0 0 43 42" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M28.6251 5.64746H14.6921C9.88272 5.64746 5.98395 9.54623 5.98395 14.3556V28.2886C5.98395 33.0979 9.88272 36.9967 14.6921 36.9967H28.6251C33.4344 36.9967 37.3332 33.0979 37.3332 28.2886V14.3556C37.3332 9.54623 33.4344 5.64746 28.6251 5.64746ZM34.2854 28.2886C34.2758 31.4106 31.7471 33.9393 28.6251 33.9489H14.6921C11.57 33.9393 9.04135 31.4106 9.03179 28.2886V14.3556C9.04135 11.2335 11.57 8.70487 14.6921 8.69531H28.6251C31.7471 8.70487 34.2758 11.2335 34.2854 14.3556V28.2886ZM29.9313 14.791C30.8932 14.791 31.6729 14.0112 31.6729 13.0494C31.6729 12.0875 30.8932 11.3077 29.9313 11.3077C28.9694 11.3077 28.1897 12.0875 28.1897 13.0494C28.1897 14.0112 28.9694 14.791 29.9313 14.791ZM21.6586 13.4848C17.3302 13.4848 13.8213 16.9937 13.8213 21.3221C13.8213 25.6506 17.3302 29.1594 21.6586 29.1594C25.987 29.1594 29.4959 25.6506 29.4959 21.3221C29.5006 19.2421 28.6763 17.2459 27.2055 15.7752C25.7347 14.3044 23.7386 13.4801 21.6586 13.4848ZM16.8691 21.3221C16.8691 23.9673 19.0134 26.1116 21.6586 26.1116C24.3038 26.1116 26.4481 23.9673 26.4481 21.3221C26.4481 18.6769 24.3038 16.5326 21.6586 16.5326C19.0134 16.5326 16.8691 18.6769 16.8691 21.3221Z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="post-footer">
                <div className="wrapper">
                    <div className="text">
                        &copy; {getYear()} {siteName.replace("&#039;", "'")}, All Rights Reserved
                    </div>
                    <ul className="links">
                        {postFooterLinkList.map((item, index) => {
                            return (
                                <li key={index}>
                                    <a href={item.link}>
                                        {item.text}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </FooterStyle>
    );
}
