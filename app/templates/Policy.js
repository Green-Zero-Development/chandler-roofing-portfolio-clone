'use client';

import useUpdateHeaderClass from '../hooks/useUpdateHeaderClass';
import { motion } from "framer-motion";
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

const ContentSection = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px 200px 16px;
    .html-content {
        white-space: pre-wrap;
    }
    @media (min-width: 992px) {
        
    }
`;

// #endregion

export default function Page({ pageData }) {

    useUpdateHeaderClass();

    return (
        <>
        <Hero>
            <div className="wrapper">
                <h4 className="tag">{pageData.acf.hero.subtitle}</h4>
                <h1>{pageData.acf.hero.title}</h1>
                <p>Updated on: {pageData.acf.hero.updated_on}</p>
            </div>
        </Hero>
        <ContentSection>
            <div className="html-content" dangerouslySetInnerHTML={{ __html: pageData.acf.policy_text }}>
                
            </div>
        </ContentSection>
        </>
    );
}
