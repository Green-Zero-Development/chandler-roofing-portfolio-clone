'use client';

import React, { useEffect, useState } from 'react';
import useUpdateHeaderClass from '../hooks/useUpdateHeaderClass';
import { motion } from "framer-motion";
import styled from 'styled-components';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
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

const PageWrapper = styled.div`
    background-color: #fcfdfe;
    @media (min-width: 992px) {
        
    }
`;

const Hero = styled.div`
    .wrapper {
        max-width: 1200px;
        margin: 0 auto;
        text-align: center;
        padding: 150px 0px 10px 0px;
        h1 {
            font-size: 75px;
            margin: 10px 0 20px 0;
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
        padding: 100px 16px 150px 16px;
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

const Benefits = styled.div`
    background-color: #323232;
    .wrapper {
        max-width: 1200px;
        padding: 50px 16px 250px 16px;
        margin: 0 auto -350px auto;
        h2 {
            color: #fff;
            font-family: var(--font-bebas-neue),sans-serif;
            font-size: 45px;
            padding: 0px 0 50px 0;
            text-align: center;
        }
        ul {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 50px;
            text-align: center;
            @media (min-width: 768px) {
                grid-template-columns: repeat(3, 1fr);
                text-align: left;
            }
            li {
                max-width: 300px;
                margin: 0 auto;
            }
            img {
                margin: 0 auto;
                @media (min-width: 768px) {
                    margin: 0;
                }
            }
        }
        h4 {
            color: #fff;
            font-family: var(--font-bebas-neue),sans-serif;
            font-size: 32px;
            padding: 20px 0 8px 0;
        }
        p {
            color: #fff;
            font-size: 16px;
            line-height: 1.4;
        }
    }
`;

const Faqs = styled.div`
    .wrapper {

        align-items: flex-start;
        gap: 50px;
        max-width: 1200px;
        padding: 0 16px 150px 16px;
        margin: 0 auto;
        @media (min-width: 768px) {
            display: flex;
        }
        .content {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            padding-bottom: 100px;
            @media (min-width: 768px) {
                width: 40%;
                padding-bottom: 0px;
            }
            h2 {
                width: 100%;
                font-family: var(--font-bebas-neue),sans-serif;
                font-size: 45px;
                padding: 0px 0 20px 0;
            }
            p {
                width: 100%;
                font-size: 20px;
                padding: 0 0 20px 0;
            }
            
        }
        ul {
            width: 100%;
            border-top: 2px solid #7e7f7f;
            @media (min-width: 768px) {
                width: 60%;
            }
            li {
                border-bottom: 2px solid #7e7f7f;
                padding: 20px 0;
            }
            .question {
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: pointer;
                font-size: 20px;
            }
            .answer {
                display: none;
                padding: 10px 8px 0px 8px;
                font-size: 16px;
            }
            .active-icon {
                transform: rotate(180deg);
            }
        }
        @media (min-width: 768px) {
            
        }
    }
`;

const BlogListing = styled.div`
    .wrapper {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 16px 100px 16px;
        @media (min-width: 768px) {
            
        }
        .title-section {
            position: relative;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            width: 100%;
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
        .post-wrapper {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 30px;
            @media (min-width: 768px) {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        .project {
            margin-bottom: 30px;
            h4 {
                font-family: var(--font-bebas-neue),sans-serif;
                font-size: 40px;
                margin-bottom: 20px;
            }

            .tags {
                display: flex;
                flex-wrap: wrap;
                margin-bottom: 5px;
                .tag {
                    color: #000000;
                    margin-right: 5px;
                }
            }

            .image {
                position: relative;
                height: 365px;
                margin-bottom: 20px;
            }

            .text-button {
                display: flex;
                align-items: center;
                font-family: var(--font-bebas-neue),sans-serif;
                font-size: 20px;
                color: #000000;
                line-height: 1em;
                text-decoration: underline;
                transition: 0.25s;
            }

            .text-button:hover {
                color: #d12127;
                transition: 0.25s;
            }
            
            .text-button::after {
                content: url('https://inside.chandler-roofing.com/wp-content/uploads/2024/03/arrow-right-sharp-regular-1.svg');
                width: 20px;
                height: 20px;
                margin-top: -5px;
                margin-left: 8px;
                margin-right: -20px;
                opacity: 0;
                transform: translateX(-20px);
            }

            .text-button:hover::after  {
                opacity: 1;
                transform: translateX(0px);
                transition: 0.25s;
            }
        }
    }
    @media (min-width: 992px) {
        
    }
`;

const PreQualified = styled.div`
    .wrapper {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 50px;
        max-width: 1400px;
        padding: 0px 16px 150px 16px;
        margin: 0 auto;
        @media (min-width: 768px) {
            grid-template-columns: repeat(2, 1fr);
        }
        h2 {
            font-family: var(--font-bebas-neue),sans-serif;
            font-size: 45px;
            padding: 0px 0 20px 0;
        }
        p {
            font-size: 20px;
            padding: 0 0 20px 0;
        
        }
        form {
            width: 100% !important;
        }
    }
    @media (min-width: 992px) {
        
    }
`;

// #endregion

export default function Page({ pageData, blogPosts }) {

    // #region Logic

    useUpdateHeaderClass();
    
    const testimonials = pageData.global_sections[3];

    let faqsButton = getButtonLink(pageData.acf.faqs_section.button.link_to_where, pageData.acf.faqs_section.button.onsite_link, pageData.acf.faqs_section.button.offsite_link, pageData.acf.faqs_section.button.file_link);

    const [clickedFaq, setClickedFaq] = useState(0);

    const handleItemClick = (index) => {
        setClickedFaq(clickedFaq === index ? null : index);
    };

    useEffect(() => {
        Cognito.load("forms", { id: "81" });
    }, []);

    // #endregion

    return (
        <PageWrapper>
            <Hero>
                <div className="wrapper">
                    <h4 className="tag">{pageData.acf.hero.subtitle}</h4>
                    <h1>{pageData.acf.hero.title}</h1>
                    <p>{pageData.acf.hero.paragraph}</p>
                </div>
            </Hero>

            <WhyUs>
                <div className="wrapper">
                    <div className="image">
                        <Image src={pageData.acf.payment_options.image.url} alt={pageData.acf.payment_options.image.alt} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <div className="content">
                        <h2>{pageData.acf.payment_options.title}</h2>
                        <ul>
                            {pageData.acf.payment_options.info_box.map((item, index) => {
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

            <Benefits>
                <div className="wrapper">
                    <h2>{pageData.acf.benefits.title}</h2>
                    <ul>
                        {pageData.acf.benefits.icon_box.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Image src={item.icon.url} alt={item.icon.alt} width={62} height={55} />
                                    <h4>{item.title}</h4>
                                    <p>{item.paragraph}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </Benefits>

            <TestimonialSection testimonials={testimonials} />

            <Faqs>
                <div className="wrapper">
                    <div className="content">
                        <h2>{pageData.acf.faqs_section.title}</h2>
                        <p>{pageData.acf.faqs_section.paragraph}</p>
                        <Link className="red-outline-button" href={faqsButton}>
                            {pageData.acf.faqs_section.button.text}
                        </Link>
                    </div>
                    <ul>
                        {pageData.acf.faqs_section.faq.map((item, index) => {
                            return (
                                <li key={index}>
                                    <div className="question" onClick={() => handleItemClick(index)}>
                                        <h4>{item.question}</h4>
                                        <svg className={`${clickedFaq === index ? 'active-icon' : ''}`} width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5283 20.919C16.2354 21.2119 15.7606 21.2119 15.4677 20.919L7.82123 13.2725C7.52834 12.9796 7.52834 12.5048 7.82123 12.2119L8.17479 11.8583C8.46768 11.5654 8.94255 11.5654 9.23545 11.8583L15.998 18.6209L22.7606 11.8583C23.0535 11.5654 23.5283 11.5654 23.8212 11.8583L24.1748 12.2119C24.4677 12.5048 24.4677 12.9796 24.1748 13.2725L16.5283 20.919Z" fill="black"/>
                                        </svg>
                                    </div>
                                    <div className="answer" style={{ display: clickedFaq === index ? 'block' : 'none' }}>
                                        <p>{item.answer}</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </Faqs>

            <BlogListing>
                <div className="wrapper">
                    <div className="title-section">
                        <h2>Recent Blog Posts</h2>
                        <Link className="filled-button" href='/blog/'>View more</Link>
                    </div>
                    <div className="post-wrapper">
                        {blogPosts.map((post, index) => {
                            if (index < 2) {
                                return (
                                <div key={index} className="project">
                                    <div className="image">
                                        <Image src={post.acf.featured_image.url} alt={post.acf.featured_image.alt} fill style={{ objectFit: 'cover' }} />
                                    </div>
                                    <ul className="tags">
                                        {post.tags.map((tag, index) => (
                                            <li key={index} className="tag">
                                                {tag}{index < post.tags.length - 1 ? ',' : ''}
                                            </li>
                                        ))}
                                    </ul>
                                    <h4>{post.title}</h4>
                                    <Link href={`/blog/${post.slug}`} className="text-button">
                                        View Full Post
                                    </Link>
                                </div>
                                )
                            }
                        }
                        )}
                    </div>
                </div>
            </BlogListing>

            <PreQualified>
                <div className="wrapper">
                    <div className="content">
                        <h2>{pageData.acf.prequalified.title}</h2>
                        <p>{pageData.acf.prequalified.paragraph}</p>
                    </div>
                    <div className="cognito">
                        <div className="loader">Form loading...</div>
                    </div>
                </div>
            </PreQualified>

        </PageWrapper>
    );
}
