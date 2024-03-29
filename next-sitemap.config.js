/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://blog.yonshan.dev',
  generateRobotsTxt: true, // (optional)
  // ...other options
};
