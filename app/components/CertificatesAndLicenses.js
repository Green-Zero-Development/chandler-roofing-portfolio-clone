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
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0px 16px 170px 16px;
    .badge {
        position: relative;
        width: 185px;
        height: 156px;
        margin: 0 auto;
        text-align: center;
        filter: grayscale(100%);
        transition: 0.25s;
        &:hover {
            filter: grayscale(0%);
            transition: 0.25s;
        }
    }
`;

export default function Page({ badgeInfo }) {

    return (
        <Section>
            {badgeInfo.acf.badge.map((item, index) => {
                return (
                    <div key={index} className="badge">
                        <Image src={item.image.url} alt={item.image.alt} fill style={{ objectFit: 'contain' }} />
                    </div>
                );
            })}
        </Section>
    );
}
