import { apiUrl, revalidateInterval } from '../../../../global-settings.js';
import { notFound } from 'next/navigation';
import ServiceAreaSingle from "../../../../templates/ServiceAreaSingle.js";

async function getAllServiceAreas() {
  const res = await fetch(apiUrl + `/service-areas/all`, {next: {revalidate: revalidateInterval }})
  if (!res.ok) {
    throw Error(res.statusText);
  } else {
    return res.json();
  }
}

async function getSingleServiceArea(slug) {
  const res = await fetch(apiUrl + `/service-areas/all/${slug}`, {next: {revalidate: revalidateInterval }});
  if (!res.ok) {
    return notFound();
  } else {
    return res.json();
  }
}

export default async function Page({ params: { slug } }) {

  const _serviceArea = getSingleServiceArea(slug);
  const serviceArea = await _serviceArea;
  
  if (serviceArea.response === '404') return notFound();

  return (
    <>
      <ServiceAreaSingle pageData={serviceArea} />
    </>
  );
}

export async function generateStaticParams() {
  const _serviceAreas = getAllServiceAreas();
  const serviceAreas = await _serviceAreas;

  return serviceAreas.map((postSing) => ({ 
      slug: postSing.slug 
    }));
}

export async function generateMetadata({ params: { slug } }) {
  const _page = getSingleServiceArea(slug);
  const page = await _page;
  if (page.response !== '404') {
    return {
      title: page.acf.seo.meta_title,
      description: page.acf.seo.meta_description,
      alternates: {
        canonical: page.acf.seo.canonical
      },
      openGraph: {
        title: page.acf.seo.og_title,
        description: page.acf.seo.og_description,
        locale: 'en_US',
        type: 'website',
        images: [
          {
            url: page.acf.seo.social_image_url
          }
        ]
      },
      twitter: {
        title: page.acf.seo.twitter_title,
        description: page.acf.seo.twitter_description,
      }
    }
  } else {
    return {
        title: '404: Page Not Found',
        description: 'This page does not exist on this website.',
      }
  }
}
