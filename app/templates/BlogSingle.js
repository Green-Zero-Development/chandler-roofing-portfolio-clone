'use client';

import useUpdateHeaderClass from '../hooks/useUpdateHeaderClass';
import { motion } from "framer-motion";
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
  } from "react-share";

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
        max-width: 1200px;
        margin: 0 auto;
        text-align: center;
        padding: 150px 0px 10px 0px;
        h1 {
            font-size: 55px;
            margin: 10px 0 20px 0;
            padding: 0px 16px 0px 16px;
            @media (min-width: 768px) {
                font-size: 65px;
            }
            @media (min-width: 992px) {
                font-size: 75px;
            }
        }
        .feat-img {
            position: relative;
            width: 100%;
            height: 600px;
            margin: 50px 0 50px 0;
        }
    }
    @media (min-width: 992px) {
        
    }
`;

const Content = styled.div`
    max-width: 1200px;
    padding: 0 16px 100px 16px;
    margin: 0 auto;
    white-space: pre-line;
    @media (min-width: 992px) {
        
    }
`;

const ShareButtons = styled.div`
    max-width: 1200px;
    padding: 0 16px 100px 16px;
    margin: 0 auto;
    h6 {
        font-family: var(--font-lato),sans-serif;
        font-size: 18px;
        font-weight: 700;
    }
    .icons {
        display: flex;
        item-align: center;
        gap: 10px;
        padding: 20px 0 0 0;
        .icon {
            display: flex;
            width: 40px;
            height: 40px;
            background-color: #f4f4f4;
            border-radius: 6em;
            button {
                width: 100%;
                height: 40px;
                margin: 0 auto;
            }
            svg {
                margin: auto;
                width: 20px;
                height: 20px;
            }
            &:hover {
                background-color: #e0e0e0;
                svg path {
                   fill: #d12127 !important;
                }
            }
        }
    }
    @media (min-width: 992px) {
        
    }
`;

const RelatedPosts = styled.div`
    max-width: 1250px;
    margin: 0 auto 0 auto;
    padding: 0px 16px 100px 16px;
    .related-posts {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 20px;
        @media (min-width: 768px) {
            grid-template-columns: repeat(2, 1fr);
        }
    }
    .project {

        margin-bottom: 30px;
        h4 {
            font-family: var(--font-bebas-neue),sans-serif;
            font-size: 32px;
            margin-bottom: 20px;
            @media (min-width: 992px) {
                font-size: 40px;
            }
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
`;

// #endregion

export default function Page({ pageData, posts }) {

    useUpdateHeaderClass();

    return (
        <>
        <Hero>
            <div className="wrapper">
                <h4 className="tag"><span><a href="/blog">Blog</a></span> / {pageData.categories[0]}</h4>
                <h1>{pageData.title}</h1>
                <div className="feat-img">
                    <Image src={pageData.acf.featured_image.url} alt={pageData.acf.featured_image.alt} fill style={{ objectFit: 'cover' }} />
                </div>
            </div>
        </Hero>
        <Content dangerouslySetInnerHTML={{ __html: pageData.acf.article }} className="html-content">
            
        </Content>
        <ShareButtons>
            <h6>Share this post</h6>
            <div className="icons">
                <div className="icon">
                    <EmailShareButton url={pageData.permalink}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#000000" d="M0 64H512v80L256 320 0 144V64zM0 448V182.8L237.9 346.4 256 358.8l18.1-12.5L512 182.8V448H0z"/></svg></EmailShareButton>
                </div>
                <div className="icon">
                    <LinkedinShareButton url={pageData.permalink}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#000000" d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg></LinkedinShareButton>
                </div>
                <div className="icon">
                    <TwitterShareButton url={pageData.permalink}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#000000" d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg></TwitterShareButton>
                </div>
                <div className="icon">
                    <FacebookShareButton url={pageData.permalink}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#000000" d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/></svg></FacebookShareButton>
                </div>
            </div>
        </ShareButtons>

        <RelatedPosts>
            <div className="wrapper">
                <div className="title-section">
                    <h2>Related Posts</h2>
                    <Link className="filled-button" href='/blog/'>Keep reading</Link>
                </div>
                <div className="related-posts">
                    {posts.filter(post => post.slug !== pageData.slug).map((post, index) => (
                        <Link href={`${post.slug}`} key={index} className="project">
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
                            <div className="text-button">
                                View Full Post
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </RelatedPosts>

        </>
    );
}
