'use client';

import React, { useState } from 'react';
import useUpdateHeaderClass from '../hooks/useUpdateHeaderClass';
import { motion } from "framer-motion";
import styled from 'styled-components';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
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
        .filter-buttons {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            padding: 50px 0 50px 0;
            button {
                margin: 10px 10px;
                transition: 0s;
            }
            .filled-button::after {
                content: '';
            }
            .filled-button {
                transition: 0s;
            }
            .filled-button:hover {
                background-color: #d12127;
                transition: 0s;
            }
            .dark-text-button {
                text-decoration: none;
            }
        }
    }
    @media (min-width: 992px) {
        
    }
`;

const BlogListing = styled.div`
    .wrapper {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 30px;
        max-width: 1284px;
        margin: 0 auto;
        padding: 0 16px 0 16px;
        @media (min-width: 768px) {
            grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 992px) {
            grid-template-columns: repeat(3, 1fr);
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
    .pagination {
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--font-bebas-neue),sans-serif;
        text-align: center;
        padding: 50px 0 150px 0;
        button {
            border-width: 0px;
        }
        button:disabled {
            opacity: 0.5;
        }
    }
    @media (min-width: 992px) {
        
    }
`;

// #endregion

export default function Page({ pageData, blogPosts }) {

    // #region Logic

    useUpdateHeaderClass();

    const [filter, setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    const allTags = [...new Set(blogPosts.flatMap(post => post.tags))];

    const handleFilterChange = (tag) => {
        setFilter(tag);
        setCurrentPage(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const filteredBlogPosts = blogPosts.filter(post =>
        filter === 'all' || post.categories.includes(filter)
    );

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentBlogPosts = filteredBlogPosts.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(filteredBlogPosts.length / postsPerPage);

    const handlePrevPage = () => {
        setCurrentPage(currentPage => Math.max(1, currentPage - 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage => Math.min(totalPages, currentPage + 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // #endregion

    return (
        <PageWrapper>
            <Hero>
                <div className="wrapper">
                    <h4 className="tag">{pageData.acf.hero_section.pretitle}</h4>
                    <h1>{pageData.acf.hero_section.title}</h1>
                    <p>{pageData.acf.hero_section.paragraph}</p>
                    <div className="filter-buttons">
                        <button onClick={() => handleFilterChange('all')} className={filter === 'all' ? 'filled-button active-filter-button' : 'dark-text-button'}>View All Posts</button>
                        <button id="residential-filter" onClick={() => handleFilterChange('Residential')} className={filter === 'Residential' ? 'filled-button active-filter-button' : 'dark-text-button'}>Residential</button>
                        <button id="commercial-filter" onClick={() => handleFilterChange('Commercial')} className={filter === 'Commercial' ? 'filled-button active-filter-button' : 'dark-text-button'}>Commercial</button>
                    </div>
                    {/* <div className="filter-buttons">
                        <Splide hasTrack={ false }
                            options={ {
                                type: 'slide',
                                perPage: 3,
                                arrows: true,
                                pagination: false,
                                rewind: false,
                                keyboard: 'global',
                                breakpoints: {
                                    416: {
                                        perPage: 1,
                                    },
                                    516: {
                                        perPage: 1,
                                    },
                                    768: {
                                        perPage: 2,
                                    },
                                    1440: {
                                        perPage: 3,
                                    }
                                }
                            } 
                            }
                            
                            >
                            <SplideTrack>
                                <SplideSlide key='0' className="splide__slide">
                                    <button onClick={() => handleFilterChange('all')} className={filter === 'all' ? 'filled-button active-filter-button' : 'dark-text-button'}>View All</button>
                                </SplideSlide>
                                {allTags.map((tag, index) => (
                                    <SplideSlide key={index} className="splide__slide">
                                        <button key={index} onClick={() => handleFilterChange(tag)} className={filter === tag ? 'filled-button active-filter-button' : 'dark-text-button'}>
                                            {tag}
                                        </button>
                                    </SplideSlide>
                                ))}
                            </SplideTrack>
                        </Splide>
                    </div> */}
                </div>
            </Hero>

            <BlogListing>
                <div className="wrapper">
                    {currentBlogPosts.map((post, index) => (
                        <Link href={`/blog/${post.slug}`} key={index} className="project">
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
                <div className="pagination">
                    <button className="dark-text-button" onClick={handlePrevPage} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button className="dark-text-button" onClick={handleNextPage} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            </BlogListing>

        </PageWrapper>
    );
}
