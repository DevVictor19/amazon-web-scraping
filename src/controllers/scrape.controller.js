import {
  HttpErrorException,
  InternalServerErrorException,
} from "../errors/http.errors.js";
import { amazonScrapeProductsService } from "../services/scrape.service.js";
import { parseError } from "../utils/parse-error.js";

export async function scrapeController(request, response) {
  const { keyword } = request.query;

  try {
    const { products } = await amazonScrapeProductsService({ keyword });

    return response.json(products);
  } catch (error) {
    if (error instanceof HttpErrorException) {
      return response.status(error.status).json(parseError(error));
    }

    const internalError = new InternalServerErrorException(
      "Internal Server Error, please try again later..."
    );

    return response.status(internalError.status).json(parseError(error));
  }
}
