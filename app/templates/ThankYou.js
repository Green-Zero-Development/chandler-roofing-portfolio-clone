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

const Content = styled.div`
    padding: 200px 16px 400px 16px;
    text-align: center;
    .wrapper {
        display: flex;
        flex-wrap: wrap;
    }
    h1 {
        width: 100%;
        font-size: 72px;
        @media (min-width: 992px) {
            font-size: 96px;
        }
    }
    p {
        width: 100%;
        font-size: 22px;
        padding: 25px 0px 42px 0px;
    }
    a {
        margin: 0 auto;
       
    }
    @media (min-width: 992px) {
        
    }
`;

export default function Page({ pageData }) {

    let heroButtonLink = getButtonLink(pageData.acf.hero_section.button.link_to_where, pageData.acf.hero_section.button.onsite_link, pageData.acf.hero_section.button.offsite_link, pageData.acf.hero_section.button.file_link);

    return (
        <>
        <Content>
            <div className="wrapper">
              <h1>{pageData.acf.hero_section.title}</h1>
              <p>{pageData.acf.hero_section.description}</p>
              <a href={heroButtonLink}>
                  <div className="filled-button">{pageData.acf.hero_section.button.text}</div>
              </a>
            </div>
        </Content>
        </>
    );
}
