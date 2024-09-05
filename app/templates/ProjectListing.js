'use client';

import React, { useEffect, useState } from 'react';
import useUpdateHeaderClass from '../hooks/useUpdateHeaderClass';
import { motion } from "framer-motion";
import styled from 'styled-components';
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
        padding: 150px 16px 100px 16px;
        h1 {
            font-size: 75px;
            margin: 10px 0 20px 0;
        }
        .filter-buttons {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
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

const ProjectListing = styled.div`
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
        .project {
            position: relative;
            margin-bottom: 30px;
            h4 {
                font-family: var(--font-bebas-neue),sans-serif;
                font-size: 52px;
                margin-bottom: 20px;
            }

            p {
                color: #000000;
                font-size: 20px;
                padding-bottom: 60px;
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
                position: absolute;
                bottom: 0;
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

export default function Page({ pageData, projects }) {

    // #region Logic

    useUpdateHeaderClass();

    const [filter, setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 6;

    const handleFilterChange = (category) => {
        setFilter(category);
        setCurrentPage(1);
        window.scrollTo(0, 0);
    };

    const filteredProjects = projects.filter(project =>
        filter === 'all' || project.categories.includes(filter)
    );

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

    const handlePrevPage = () => {
        setCurrentPage(currentPage => Math.max(1, currentPage - 1));
        window.scrollTo(0, 0);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage => Math.min(totalPages, currentPage + 1));
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const typeParam = params.get('type');
        const residentialFilterbutton = document.getElementById('residential-filter');
        const commercialFilterbutton = document.getElementById('commercial-filter');

        if (typeParam === 'Commercial') {
            commercialFilterbutton.click();
        } else if (typeParam === 'Residential') {
            residentialFilterbutton.click();
        }
    }, []);

    // #endregion

    return (
        <PageWrapper>
            <Hero>
                <div className="wrapper">
                    <h4 className="tag">{pageData.acf.subtitle}</h4>
                    <h1>{pageData.acf.title}</h1>
                    <div className="filter-buttons">
                        <button onClick={() => handleFilterChange('all')} className={filter === 'all' ? 'filled-button active-filter-button' : 'dark-text-button'}>View All Projects</button>
                        <button id="residential-filter" onClick={() => handleFilterChange('Residential')} className={filter === 'Residential' ? 'filled-button active-filter-button' : 'dark-text-button'}>Residential</button>
                        <button id="commercial-filter" onClick={() => handleFilterChange('Commercial')} className={filter === 'Commercial' ? 'filled-button active-filter-button' : 'dark-text-button'}>Commercial</button>
                    </div>
                </div>
            </Hero>
            
            <ProjectListing>
                <div className="wrapper">
                    {currentProjects.map((project, index) => (
                        <Link href={`/projects/${project.slug}`} key={index} className="project">
                            <div className="image">
                                <Image src={project.acf.hero.image.url} alt={project.acf.hero.image.alt} fill style={{ objectFit: 'cover' }} />
                            </div>
                            <ul className="tags">
                                {project.tags.map((tag, index) => (
                                    <li key={index} className="tag">
                                        {tag}{index < project.tags.length - 1 ? ',' : ''}
                                    </li>
                                ))}
                            </ul>
                            <h4>{project.title}</h4>
                            <p>{project.acf.listing_page_excerpt}</p>
                            <div className="text-button">
                                View Full Project
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
            </ProjectListing>

        </PageWrapper>
    );
}
