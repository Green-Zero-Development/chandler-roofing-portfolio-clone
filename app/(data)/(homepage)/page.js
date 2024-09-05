import { apiUrl, revalidateInterval } from '../../global-settings.js';
import Home from '../../templates/Home';

async function getPage() {
  const res = await fetch(apiUrl + `/pages/all/home`, {next: {revalidate: revalidateInterval}})
  if (!res.ok) {
    throw Error(res.statusText);
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

async function getServiceAreas() {
  const res = await fetch(apiUrl + `/service-areas/all`, {next: {revalidate: revalidateInterval}})
  if (!res.ok) {
    throw Error(res.statusText);
  } else {
    return res.json();
  }
}

export default async function Page() {
  const _page = getPage();
  const page = await _page;

  const _projects = getProjects();
  const projects = await _projects;

  const _serviceAreas = getServiceAreas();
  const serviceAreas = await _serviceAreas;
  
  return (
    <>
      <Home pageData={page} projects={projects} serviceAreas={serviceAreas} />
    </>
  );
}

export async function generateMetadata() {
  const _page = getPage();
  const page = await _page;

  return {
    title: page.acf.seo.meta_title,
    description: page.acf.seo.meta_description,
    alternates: {
      canonical: page.acf.seo.canonical
    },
    openGraph: {
      title: page.acf.seo.og_title,
      description: page.acf.seo.og_description,
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
}
