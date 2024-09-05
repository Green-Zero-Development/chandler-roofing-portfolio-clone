import { apiUrl, revalidateInterval } from '../../../global-settings.js';
import { notFound } from 'next/navigation';
import ThankYou from "../../../templates/ThankYou.js";
import Residential from "../../../templates/Residential.js";
import Commercial from "../../../templates/Commercial.js";
import ServiceSingle from "../../../templates/ServiceSingle.js";
import ProjectListing from "../../../templates/ProjectListing.js";
import Testimonies from "../../../templates/Testimonies.js";
import BlogListing from "../../../templates/BlogListing.js";
import Financing from "../../../templates/Financing.js";
import Contact from "../../../templates/Contact.js";
import About from "../../../templates/About.js";
import Policy from "../../../templates/Policy.js";
import ServiceAreaListing from "../../../templates/ServiceAreaListing.js";

async function getAllPages() {
  const res = await fetch(apiUrl + `/pages/all`, {next: {revalidate: revalidateInterval}})
  if (!res.ok) {
    throw Error(res.statusText);
  } else {
    return res.json();
  }
}

async function getSinglePage(slug) {
  const res = await fetch(apiUrl + `/pages/all/${slug}`, {next: {revalidate: revalidateInterval}})
  if (!res.ok) {
    return notFound();
  } 
  else if (slug == "home" || slug == "404-2" || res == "404") {
    return notFound();
  } else {
    return res.json();
  }
}

async function getProjects() {
  const res = await fetch(apiUrl + `/projects/all`, {next: {revalidate: revalidateInterval}})
  if (!res.ok) {
    throw Error(res.statusText);
  } else {
    return res.json();
  }
}

async function getBlogPosts() {
  const res = await fetch(apiUrl + `/blog/all`, {next: {revalidate: revalidateInterval}})
  if (!res.ok) {
    throw Error(res.statusText);
  } else {
    return res.json();
  }
}

async function getServiceAreas() {
  const res = await fetch(apiUrl + `/service-areas/all`, {next: {revalidate: revalidateInterval}})
  if (!res.ok) {
    throw Error(res.statusText);
  } else {
    return res.json();
  }
}

export default async function Page({ params: { slug } }) {
  const _page = getSinglePage(slug);
  const page = await _page;

  const _projects = getProjects();
  const projects = await _projects;

  const _blogPosts = getBlogPosts();
  const blogPosts = await _blogPosts;

  const _serviceAreas = getServiceAreas();
  const serviceAreas = await _serviceAreas;

  if (page.response === '404') return notFound();

  if (slug == "thank-you") {
    return (
      <>
        <ThankYou pageData={page} />
      </>
    );
  } else if (page.template == 'templates/residential.php') {
    return (
      <>
        <Residential pageData={page} />
      </>
    );
  } else if (page.template == 'templates/commercial.php') {
    return (
      <>
        <Commercial pageData={page} />
      </>
    );
  } else if (page.template == 'templates/service-single.php') {
    return (
      <>
        <ServiceSingle pageData={page} />
      </>
    );
  } else if (page.template == 'templates/project-listing.php') {
    return (
      <>
        <ProjectListing pageData={page} projects={projects} />
      </>
    );
  } else if (page.template == 'templates/testimonies.php') {
    return (
      <>
        <Testimonies pageData={page} projects={projects} />
      </>
    );
  } else if (page.template == 'templates/blog-listing.php') {
    return (
      <>
        <BlogListing pageData={page} blogPosts={blogPosts} />
      </>
    );
  } else if (page.template == 'templates/financing.php') {
    return (
      <>
        <Financing pageData={page} blogPosts={blogPosts} />
      </>
    );
  } else if (page.template == 'templates/contact.php') {
    return (
      <>
        <Contact pageData={page} />
      </>
    );
  } else if (page.template == 'templates/about.php') {
    return (
      <>
        <About pageData={page} serviceAreas={serviceAreas} />
      </>
    );
  } else if (page.template == 'templates/policy.php') {
    return (
      <>
        <Policy pageData={page} />
      </>
    );
  } else if (page.template == 'templates/service-area-listing.php') {
    return (
      <>
        <ServiceAreaListing pageData={page} serviceAreas={serviceAreas} />
      </>
    );
  } else {
    return (null);
  }
}

export async function generateStaticParams() {
  const _pages = getAllPages();
  const pages = await _pages;
  return pages.map((pageSing) => ({ 
      slug: pageSing.slug 
    }));
}

export async function generateMetadata({ params: { slug } }) {
  const _page = getSinglePage(slug);
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
