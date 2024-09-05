import { baseUrl, apiUrl } from './global-settings.js';
import './styles/global.css';
import Header from "./components/header.js";
import Footer from "./components/footer.js";
import StyledComponentsRegistry from '../lib/registry';
import { HeaderProvider } from '../lib/HeaderContext';
import Script from 'next/script';
import { Bebas_Neue, Lato } from 'next/font/google'
import PreFooter from './components/PreFooter.js';

const bebasNeue = Bebas_Neue({
    variable: '--font-bebas-neue',
    weight: '400',
    subsets: ['latin'],
})

const lato = Lato({
    variable: '--font-lato',
    weight: ['100', '300', '400', '700', '900'],
    subsets: ['latin'],
})

async function getSiteData() {
    const res = await fetch(apiUrl + `/site-data/all`)
    if (!res.ok) {
        throw Error(res.statusText);
    } else {
        return res.json();
    }
}

async function getGlobalSections() {
    const res = await fetch(apiUrl + `/global-sections/all`)
    if (!res.ok) {
        throw Error(res.statusText);
    } else {
        return res.json();
    }
}

async function getMenu() {
    const res = await fetch(apiUrl + `/menus/all`)
    if (!res.ok) {
        throw Error(res.statusText);
    } else {
        return res.json();
    }
}

async function getSiteInfo() {
    const res = await fetch(apiUrl + `/site/all`)
    if (!res.ok) {
        throw Error(res.statusText);
    } else {
        return res.json();
    }
}

async function getServiceAreas() {
    const res = await fetch(apiUrl + `/service-areas/all`)
    if (!res.ok) {
        throw Error(res.statusText);
    } else {
        return res.json();
    }
}

export default async function RootLayout({ children, page }) {

    const _siteInfo = getSiteInfo();
    const siteInfo = await _siteInfo;

    const _siteData = getSiteData();
    const siteData = await _siteData;

    const logos = [];
    const socialMedia = [];
    const physicalAddresses = [];
    const phoneNumbers = [];
    const emails = [];
    const postFooterLinks = [];

    const _serviceAreas = getServiceAreas();
    const serviceAreas = await _serviceAreas;

    {siteData.map((item) => {
        if (item.title === "Logos") {
            logos.push(
                {"acf": item.acf },
            )
        } else if (item.title === "Social Media Links") {
            socialMedia.push(
                {"acf": item.acf },
            )
        } else if (item.title === "Physical Addresses") {
            physicalAddresses.push(
                {"values": item.acf.value_list},
            ) 
        } else if (item.title === "Contact Numbers") {
            phoneNumbers.push(
                {"values": item.acf.value_list},
            ) 
        } else if (item.title === "Emails") {
            emails.push(
                {"values": item.acf.value_list},
            ) 
        } else if (item.title === "Post Footer Links") {
            postFooterLinks.push(
                {"acf": item.acf},
            ) 
        } else {};
    })}

    const _globalSections = getGlobalSections();
    const globalSections = await _globalSections;

    const preFooter = [];

    {globalSections.map((item) => {
        if (item.title === "Prefooter") {
            preFooter.push(
            {"acf": item.acf},
        )
        } else {};
    })}

    const _menu = getMenu();
    const menu = await _menu;

    const mainMenu = [];
    const footerMenu = [];

    {Object.keys(menu).map((key) => {
        if (menu[key].menu == "main-menu") {
            mainMenu.push(
                {"id": menu[key].id, "parent_id": menu[key].parent_id, "title": menu[key].title, "url": menu[key].url, "children": menu[key].children, "position": menu[key].position},
            )
        }
    })}

    {Object.keys(menu).map((key) => {
    if (menu[key].menu == "footer-menu") {
        footerMenu.push(
            {"id": menu[key].id, "parent_id": menu[key].parent_id, "title": menu[key].title, "url": menu[key].url, "children": menu[key].children, "position": menu[key].position},
        )
    }
    })}

    mainMenu.sort((a, b) => a.position - b.position);
    footerMenu.sort((a, b) => a.position - b.position);

    return (
        <html className={`${lato.variable} ${bebasNeue.variable}`}>
            <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            {page}
            <link rel="apple-touch-icon" sizes="76x76" href="/favi/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favi/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favi/favicon-16x16.png" />
            <link rel="manifest" href="/favi/site.webmanifest" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="theme-color" content="#ffffff" />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.0.7/dist/css/splide.min.css"></link>
            <Script
                src="https://services.cognitoforms.com/s/IG83lPQs7UKU2FDeP--HlA"
                strategy="beforeInteractive" // Load after page is interactive (default)
            />
            <Script id="google-tag-manager" strategy="afterInteractive">
                {`
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${process.env.GTM_ID}');
                `}
            </Script>
            </head>
            <StyledComponentsRegistry>
                <HeaderProvider>
                    <body>
                        <Header logos={logos} socialMedia={socialMedia} mainMenu={mainMenu} />
                        {children}
                        <PreFooter preFooter={preFooter} />
                        <Footer siteName={siteInfo.site_name} socialMedia={socialMedia} footerMenu={footerMenu} logos={logos} physicalAddresses={physicalAddresses} serviceAreas={serviceAreas} phoneNumbers={phoneNumbers} emails={emails} postFooterLinks={postFooterLinks} />
                        <noscript
                        dangerouslySetInnerHTML={{
                            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;" />`,
                        }}
                        />
                    </body>
                </HeaderProvider>
            </StyledComponentsRegistry>
        </html>
    )
}

export async function generateMetadata() {

  const _siteInfo = getSiteInfo();
  const siteInfo = await _siteInfo;

  return {
    generator: 'Next.js',
    metadataBase: new URL(`${baseUrl}`),
    title: {
      template: `%s | ${siteInfo.site_name}`,
      default: `${siteInfo.site_name}`
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true
      },
    }
  }
}
