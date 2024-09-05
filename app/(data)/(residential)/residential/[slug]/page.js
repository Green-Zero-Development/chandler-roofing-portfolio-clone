import { apiUrl, revalidateInterval } from '../../../../global-settings.js';
import { notFound } from 'next/navigation';
import ServiceSingle from "../../../../templates/ServiceSingle.js";

async function getAllPosts() {
  const res = await fetch(apiUrl + `/residential/all`, {next: {revalidate: revalidateInterval }})
  if (!res.ok) {
    throw Error(res.statusText);
  } else {
    return res.json();
  }
}

async function getSinglePost(slug) {
  const res = await fetch(apiUrl + `/residential/all/${slug}`, {next: {revalidate: revalidateInterval }});
  if (!res.ok) {
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

export default async function Page({ params: { slug } }) {
  const _post = getSinglePost(slug);
  const post = await _post;

  const _projects = getProjects();
  const projects = await _projects;
  
  if (post.response === '404') return notFound();

  return (
    <>
      <ServiceSingle pageData={post} projects={projects} />
    </>
  );
}

export async function generateStaticParams() {
  const _posts = getAllPosts();
  const posts = await _posts;
  return posts.map((postSing) => ({ 
      slug: postSing.slug 
    }));
}

export async function generateMetadata({ params: { slug } }) {
  const _page = getSinglePost(slug);
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
