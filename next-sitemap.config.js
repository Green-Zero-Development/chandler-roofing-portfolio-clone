module.exports = {
    siteUrl: 'https://www.chandler-roofing.com',
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    exclude: ["/home", "/404-2", "/thank-you"],
    transform: async (config, path) => {
    // custom function to ignore the path
        if (path.includes('%2F')) {
            return {
                loc: path.replace('%2F', '/'),
                changefreq: config.changefreq,
                priority: config.priority,
                lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
                alternateRefs: config.alternateRefs ?? [],
            }
        } else {
            return {
                loc: path,
                changefreq: config.changefreq,
                priority: config.priority,
                lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
                alternateRefs: config.alternateRefs ?? [],
            }
        }
    },
}
