require("dotenv").config();
const functions = require("firebase-functions");
const ax = require("axios");

const axios = ax.create({
  baseURL: `${process.env.API_URL}`,
  timeout: 1500,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

exports.seo = functions.https.onRequest(async (req, res) => {
  const websiteURL = `${req.headers["x-forwarded-proto"]}://${req.headers["x-forwarded-host"]}`;

  const { data: html } = await ax.get(websiteURL);

  const { data: meta } = await axios.get(`/seo`, {
    params: {
      url: websiteURL + req.url,
    },
  });

  html = getFilledWithTags(html, meta);
  res.send(html);
});

const getFilledWithTags = (html, { title, desc, image }) => {
  return html.replace(
    `<head>`,
    `<head>
          <meta property="og:title" content="${title.replace(/["|']/g, '`')}" />
          <meta property="og:description" content="${desc.replace(/["|']/g, '`')}" />
          <meta property="og:image" content=${image || '/'} />
          <meta property="og:url" content="${websiteURL + req.url}" />
          <meta name="twitter:title" content="${title.replace(/["|']/g, '`')}" />
          <meta name="twitter:description" content="${desc.replace(/["|']/g, '`')}" />
          <meta name="twitter:image" content=${image || '/'} />
          <title>${title.replace(/["|']/g, '`')}</title>
        `
  );
};
