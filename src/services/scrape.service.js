import axios from "axios";
// if amazon services blocks the request use the local file for tests
// import { readFileSync } from "node:fs";
// import { join } from "node:path";
import { load } from "cheerio";
import {
  BadRequestErrorException,
  InternalServerErrorException,
} from "../errors/http.errors.js";

export async function amazonScrapeProductsService({ keyword }) {
  if (!keyword) {
    throw new BadRequestErrorException(
      "Please insert a valid value for keyword query param on url"
    );
  }

  const searchUrl = `https://www.amazon.com.br/s?k=${encodeURIComponent(
    keyword
  )}`;

  try {
    const response = await axios.get(searchUrl);
    const html = response.data;

    // if amazon services blocks the request use the local file for tests
    // const workdir = process.cwd();
    // const html = readFileSync(join(workdir, "html.txt")).toString();

    const $ = load(html);
    const products = [];

    $('div[data-component-type="s-search-result"]').each((index, element) => {
      const titleSpan = $(element).find(
        $('div[data-cy="title-recipe"] h2 span')
      );
      const title = titleSpan.text();

      const starsSpan = $(element).find(
        $('span[data-csa-c-type="widget"] a i span')
      );
      const stars = starsSpan.text();

      const reviewsSpan = $(element).find(
        $('div[data-cy="title-recipe"]').next().find("span").next().find("span")
      );
      const reviews = reviewsSpan.text();

      const img = $(element).find(
        $('span[data-component-type="s-product-image"]').find("img")
      );
      const imgUrl = img.attr("src");

      const product = {
        title,
        stars,
        reviews,
        imgUrl,
      };

      products.push(product);
    });

    return {
      products,
    };
  } catch (error) {
    console.log(error.response);

    throw new InternalServerErrorException(
      "Cannot connect with amazon services"
    );
  }
}
