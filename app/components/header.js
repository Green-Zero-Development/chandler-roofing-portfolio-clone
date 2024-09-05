'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { useHeaderContext } from '../../lib/HeaderContext';

function toggleDropdown(dropTrig) {
  dropTrig.target.nextSibling.classList.toggle("desktop-menu-toggle");
}

function toggleMobileDropdown(dropTrig) {
    dropTrig.target.nextSibling.classList.toggle("mobile-menu-toggle");
    dropTrig.target.querySelector('.mobile-menu-dropdown-icon').classList.toggle('mobile-menu-dropdown-icon-flipped');
}

function toggleDropdownOn(dropTrig) {
    dropTrig.target.nextSibling.classList.add("desktop-menu-toggle");
    dropTrig.target.querySelector('.arrow').classList.add("dropdown-arrow-toggle");
}
  
function toggleDropdownOff(dropTrig) {
    const desktopDropdowns = document.querySelectorAll('.dropdown');
    const dropdownArrows = document.querySelectorAll('.arrow');
    for (let i = 0; i < desktopDropdowns.length; i++) {
        desktopDropdowns[i].classList.remove("desktop-menu-toggle");
    }
    for (let i = 0; i < dropdownArrows.length; i++) {
        dropdownArrows[i].classList.remove("dropdown-arrow-toggle");
    }
}

const mobiletoggle = () => {
  document.getElementById("mobile-menu").classList.toggle("mobile-menu-active");
  document.getElementById("mobile-menu-close").classList.toggle("mobile-menu-toggle-icon");
}

// #region Styles

const HeaderStyle = styled.header`
    position: sticky;
    top: 0;
    width: 100%;
    background-color: transparent;
    padding: 6px 1.5em 6px 1.5em;
    z-index: 50;
    transition: .25s;
    @media (min-width: 992px) {
        padding: 8px 16px 8px 16px;
    }
    .light-logo {
        width: 100%;
        visibility: hidden;
        opacity: 0;
        img {
            width: 135px;
            margin: 0 auto;
        }
    }
    .dark-logo {
        width: 100%;
        margin-top: 6px;
        img {
            width: 135px;
            margin: 0 auto;
        }
    }
    .transparent-header {
        .light-logo {
            visibility: visible;
            opacity: 1;
        }
        .dark-logo {
            visibility: hidden;
        }
        li {
            color: #ffffff;
            a {
                color: #ffffff;
            }
        }
        svg {
            fill: #ffffff;
        }
    }
    .color-header {
        .light-logo {
            visibility: hidden;
        }
        .dark-logo {
            visibility: visible;
            opacity: 1;
        }
        li {
            color: #000000;
            a {
                color: #000000;
            }
        }
        svg {
            fill: #000000;
        }
    }
    .header-wrapper {
        max-width: 1408px;
        margin: auto;
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        align-items: center;
        justify-content: center;
    }
    .desktop-menu-toggle {
        opacity: 1 !important;
        pointer-events: auto !important;
    }
    .mobile-menu-toggle {
        opacity: 1 !important;
        height: 100% !important;
        padding-top: 8px !important;
        padding-bottom: 8px !important;
    }
    .mobile-menu-active {
        pointer-events: initial !important;
        opacity: 1 !important;
        transform: scale(1.0) !important;
        z-index: 999;
        transition: .25s;
    }
    .active-menu-toggle {
        opacity: 1 !important;
        width: 100% !important;
        height: 100% !important;
        padding: 10px !important;
    }
    .mobile-menu-active {
        pointer-events: initial !important;
        opacity: 1 !important;
        transform: scale(1.0) !important;
        transition: .25s;
        .mobile-menu-toggle {
            pointer-events: auto !important;
        }
    }
`;

const DesktopLogoLink = styled.div`
    position: relative;
    grid-column: span 12 / span 12;
    margin: 0 auto;
    width: 100%;
    height: 55px;
    @media (min-width: 768px) {
        grid-column: span 1 / span 1;
        margin-left: 0px;
    }
    a {
        position: absolute;
        top: 0;
        left: 0;
    }
`;

const MobileMenuOpen = styled.div`
    position: fixed;
    bottom: 5px;
    left: auto;
    right: auto;
    width: 100%;
    z-index: 999;
    svg {
        margin: auto;
    }
    @media (min-width: 992px) {
        display: none;
    }
`

const MobileMenuClose = styled.div`
    display: none;
    position: fixed;
    bottom: 40px;
    left: auto;
    right: auto;
    width: 100%;
    z-index: 999;
    svg {
        background-color: #d31f25;
        border: 3px solid #ffffff;
        padding: 14px;
        margin: auto;
    }
`

const MainNavi = styled.div`
    grid-column: span 11 / span 11;
    display: flex;
    align-items: center;
    font-family: var(--font-lato),sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
    ul {
        display: none;
        font-size: 11px;
        align-items: center;
        margin-left: auto;
        @media (min-width: 768px) {
            display: flex;
            font-size: 13px;
        }
        @media (min-width: 992px) {
            font-size: 13px;
        }
        @media (min-width: 1200px) {
            font-size: 16px;
        }
        li {
            display: none;
            a {
                
                &:hover {
                    color: #d12127;
                }
            }
            @media (min-width: 992px) {
                display: block;
                margin-left: 15px;
            }
            @media (min-width: 1200px) {
                margin-left: 27px;
            }
            @media (min-width: 1440px) {
                margin-left: 48px;
            }
            .dropdown-trigger {
                display: flex;
                align-items: center;
                gap: 4px;
                padding: 8px 8px 8px 8px;
                @media (min-width: 992px) {
                    padding: 22px 8px 20px 8px;
                }
                @media (min-width: 1200px) {
                    padding: 26px 8px 24px 8px;
                }
                .arrow {
                    transition: .25s;
                }
                .dropdown-arrow-toggle {
                    transform: rotate(180deg);
                    transition: .25s;
                }
                &:hover {
                    color: #d12127;
                }
            }
            .dropdown {
                font-size: 14px;
                font-weight: 600;
                opacity: 0;
                pointer-events: none;
                position: absolute;
                display: flex;
                flex-wrap: wrap;
                max-width: 350px;
                background-color: #ffffff;
                padding: 25px 25px 25px 25px;
                border-top: 7px solid #D12127;
                letter-spacing: 2px;
                a {
                    width: 100%;
                    color: #222222;
                    padding: 2px 0 2px 0;
                    &:hover {
                        text-decoration: underline;
                        text-decoration-color: #d12127;
                    }
                }
            }
        }
        > * {
            &:last-child {
                display: block;
                a {
                    display: flex;
                    background-color: #d12127;
                    border: 1px solid #d12127;
                    font-family: var(--font-bebas-neue),sans-serif;
                    color: #ffffff;
                    padding: 13px 30px 8px 30px;
                    margin-left: 0px;
                    margin-right: 0px;
                    transition: 0.25s;
                    &:hover {
                        background-color: #a91831;
                        color: #ffffff;
                        border-color: #ffffff;
                        transition: 0.25s;
                    }
                    &:last-child::after {
                        content: url('https://inside.chandler-roofing.com/wp-content/uploads/2024/03/arrow-right-sharp-regular.svg');
                        width: 20px;
                        height: 20px;
                        margin-top: -1px;
                        margin-left: 8px;
                        margin-right: -20px;
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                      
                    &:last-child:hover::after  {
                        opacity: 1;
                        transform: translateX(0px);
                        transition: 0.25s;
                    }
                }
                @media (min-width: 1440px) {
                   
                }
            }
        }
    }
`

const MobileMenu = styled.div`
    position: fixed;
    inset: 0;
    overflow-y: scroll;
    pointer-events: none;
    opacity: 0;
    transform: scale(1.1);
    background-color: #d31f25;
    font-family: var(--font-bebas-neue),sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 8px 0px 0px 0px;
    z-index: -1;
    transition: .25s;
    .mobile-items {
        position: relative;
        padding-bottom: 200px;
    }
    .mobile-menu-header {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        align-items: center;
        justify-content: center;
        padding: 6px 1.5em 6px 1.5em;
    }
    ul {
        padding-top: 3rem;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        li {
            width: 100%;
            font-size: 50px;
            color: #ffffff;
            a {
                display: flex;
                width: 100%;
            }
        }
        .mobile-single-drop {
            width: 100%;
            font-size: 50px;
            color: #ffffff;
            .dropdown-trigger {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            svg {
                pointer-events: none;
            }
            .dropdown {
                opacity: 0;
                height: 0;
                pointer-events: none;
                display: flex;
                flex-wrap: wrap;
                font-size: 25px;
                margin-left: 8px;
                a {
                    width: 100%;
                }
            }
            .drop-title {
                pointer-events: none;
            }
        }
    }
    .social {
        display: flex;
        padding: 1.5rem;
        a {
            margin-right: 1rem;
        }
    }
    .after-menu {
        padding: 1.5rem;
        h6 {
            font-family: franklin-gothic-urw,sans-serif;
            color: #fef4ea;
            display: flex;
            flex-wrap: wrap;
            padding-bottom: 1.5rem;
            b {
                width: 100%;
            }
        }
    }
`

// #endregion

export default function Page({ logos, mainMenu, socialMedia }) {

    const { headerClass } = useHeaderContext();

    const [scrolledHeader, setScrolledHeader] = useState(false);
    const [transparentHeader, setTransparentHeader] = useState(false);
    const [colorHeader, setColorHeader] = useState(false);

    const checkScroll = () => {
        if (window.scrollY > 0 && !scrolledHeader) {
            setScrolledHeader(true);
        } else if (window.scrollY <= 0 && scrolledHeader) {
            setScrolledHeader(false);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('scroll', checkScroll);
        return () => {
            window.removeEventListener('scroll', checkScroll);
        };
    }, [scrolledHeader]);

    // useEffect(() => {
    //     let heroDarkOverlay = document.querySelector('.overlay-dark');
    //     let heroLightOverlay = document.querySelector('.overlay-light');
    //     if (heroDarkOverlay) {
    //         setTransparentHeader(true);
    //     }
    //     if (heroLightOverlay) {
    //         setColorHeader(true);
    //     }
    // }, []);

    const lightLogo = logos[0].acf.light_logo.url;
    const lightLogoAlt = logos[0].acf.light_logo.alt;

    const darkLogo = logos[0].acf.dark_logo.url;
    const darkLogoAlt = logos[0].acf.dark_logo.alt;

    const instagram = socialMedia[0].acf.value_list[1].value;
    const facebook = socialMedia[0].acf.value_list[0].value;

    return (
        <>
        <HeaderStyle className={`${scrolledHeader ? 'sticky-header' : ''}`}>
            <div className={`header-wrapper ${headerClass}`}>
                <DesktopLogoLink href="/">
                    <a href="/" className="light-logo">
                        <Image src={`${lightLogo}`} alt={`${lightLogoAlt}`} width={250} height={58} />
                    </a>
                    <a href="/" className="dark-logo">
                        <Image src={`${darkLogo}`} alt={`${darkLogoAlt}`} width={250} height={58} />
                    </a>
                </DesktopLogoLink>
                <MainNavi>
                    <ul>
                        {mainMenu.map((item) => {
                            if (item.children) {
                                return (
                                    <li key={item.id} onMouseLeave={toggleDropdownOff}>
                                        <Link href={item.url} id="dropdown-trigger" onMouseOver={toggleDropdownOn} className="dropdown-trigger">
                                            {item.title}
                                            <svg className="arrow" width="10" height="6" viewBox="0 0 10 7" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 1.28516L5 5.28516L9 1.28516" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </Link>
                                        <div id="dropdown" className="dropdown" onMouseLeave={toggleDropdownOff}>
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
                </MainNavi>
                <MobileMenu id="mobile-menu">
                    <div id="mobile-items" className="mobile-items">
                        <div className="mobile-menu-header">
                            <DesktopLogoLink>
                                <a href="/">
                                    <Image src={`${lightLogo}`} alt={`${lightLogoAlt}`} width={192} height={68} />
                                </a>
                            </DesktopLogoLink>
                        </div>
                        <ul>
                            {mainMenu.map((item) => {
                                if (item.children) {
                                    return (
                                        <div key={item.id} className="mobile-single-drop">
                                            <div id="dropdown-trigger" className="dropdown-trigger" onClick={toggleMobileDropdown}>
                                                <div className="drop-title">{item.title}</div>
                                                <svg className="mobile-menu-dropdown-icon" width="22" height="22" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 1.28516L5 5.28516L9 1.28516" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                            </div>
                                            <div className="dropdown">
                                                {Object.keys(item.children).map((key, index) => {
                                                    return (
                                                        <Link key={index} href={item.children[key].url} onClick={mobiletoggle}>{item.children[key].title}</Link>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <li key={item.id}>
                                            <Link href={item.url} onClick={mobiletoggle}>{item.title}</Link>
                                        </li>
                                    )
                                }
                            })}
                        </ul>
                        <div className="social">
                            <a href={facebook}>
                                <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M38.3763 21.4289C38.3763 11.7514 30.5789 3.90625 20.9601 3.90625C11.3413 3.90625 3.54382 11.7514 3.54382 21.4289C3.54382 30.1748 9.91267 37.4242 18.2388 38.7388V26.4941H13.8167V21.4289H18.2388V17.5685C18.2388 13.1769 20.839 10.751 24.8171 10.751C26.7228 10.751 28.7157 11.0933 28.7157 11.0933V15.4055H26.5197C24.3563 15.4055 23.6814 16.7563 23.6814 18.1421V21.4289H28.5116L27.7395 26.4941H23.6814V38.7388C32.0076 37.4242 38.3763 30.1752 38.3763 21.4289Z" fill="white"/>
                                </svg>
                            </a>
                            <a href={instagram}>
                                <svg width="43" height="42" viewBox="0 0 43 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M28.6251 5.64746H14.6921C9.88272 5.64746 5.98395 9.54623 5.98395 14.3556V28.2886C5.98395 33.0979 9.88272 36.9967 14.6921 36.9967H28.6251C33.4344 36.9967 37.3332 33.0979 37.3332 28.2886V14.3556C37.3332 9.54623 33.4344 5.64746 28.6251 5.64746ZM34.2854 28.2886C34.2758 31.4106 31.7471 33.9393 28.6251 33.9489H14.6921C11.57 33.9393 9.04135 31.4106 9.03179 28.2886V14.3556C9.04135 11.2335 11.57 8.70487 14.6921 8.69531H28.6251C31.7471 8.70487 34.2758 11.2335 34.2854 14.3556V28.2886ZM29.9313 14.791C30.8932 14.791 31.6729 14.0112 31.6729 13.0494C31.6729 12.0875 30.8932 11.3077 29.9313 11.3077C28.9694 11.3077 28.1897 12.0875 28.1897 13.0494C28.1897 14.0112 28.9694 14.791 29.9313 14.791ZM21.6586 13.4848C17.3302 13.4848 13.8213 16.9937 13.8213 21.3221C13.8213 25.6506 17.3302 29.1594 21.6586 29.1594C25.987 29.1594 29.4959 25.6506 29.4959 21.3221C29.5006 19.2421 28.6763 17.2459 27.2055 15.7752C25.7347 14.3044 23.7386 13.4801 21.6586 13.4848ZM16.8691 21.3221C16.8691 23.9673 19.0134 26.1116 21.6586 26.1116C24.3038 26.1116 26.4481 23.9673 26.4481 21.3221C26.4481 18.6769 24.3038 16.5326 21.6586 16.5326C19.0134 16.5326 16.8691 18.6769 16.8691 21.3221Z" fill="white"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </MobileMenu>
            </div>
            
        </HeaderStyle>
        <MobileMenuOpen id="mobile-menu-open" onClick={mobiletoggle}>
            <svg width="79" height="92" viewBox="0 0 79 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_dddd_3737_22498)">
                <rect width="58" height="54" transform="translate(10.5303 2)" fill="#D12127"/>
                <path d="M30.5303 29H48.5303M30.5303 23H48.5303M30.5303 35H48.5303" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                <filter id="filter0_dddd_3737_22498" x="0.530273" y="0" width="78" height="92" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="2"/>
                <feGaussianBlur stdDeviation="2"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3737_22498"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="6"/>
                <feGaussianBlur stdDeviation="3"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0"/>
                <feBlend mode="normal" in2="effect1_dropShadow_3737_22498" result="effect2_dropShadow_3737_22498"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="14"/>
                <feGaussianBlur stdDeviation="4.5"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
                <feBlend mode="normal" in2="effect2_dropShadow_3737_22498" result="effect3_dropShadow_3737_22498"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="26"/>
                <feGaussianBlur stdDeviation="5"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.01 0"/>
                <feBlend mode="normal" in2="effect3_dropShadow_3737_22498" result="effect4_dropShadow_3737_22498"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect4_dropShadow_3737_22498" result="shape"/>
                </filter>
                </defs>
            </svg>
        </MobileMenuOpen>
        <MobileMenuClose id="mobile-menu-close" onClick={mobiletoggle}>
            <svg width="55" height="55" viewBox="0 0 33 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6.2146" y="0.147461" width="32.0001" height="2.9253" transform="rotate(45 6.2146 0.147461)" fill="white"/>
                <rect x="4.146" y="22.7744" width="32.0001" height="2.9253" transform="rotate(-45 4.146 22.7744)" fill="white"/>
            </svg>
        </MobileMenuClose>
        </>
    );
}
