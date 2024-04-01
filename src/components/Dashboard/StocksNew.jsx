import { useState, useEffect } from "react";
import getStocksNews from "../../api/getStocksNews";
import "./Dashboard.css";
const StockNews = () => {
  const [stocksNews, setStocksNews] = useState([]);

  const paragraphParser = (htmlString) => {
    // const htmlString = "<p><a href='https://financialmodelingprep.com/financial-summary/PLTR'>Palantir Technologies (NYSE:PLTR)</a> stock plunged more than 6% on Thursday after Monness, Crespi, Hardt analysts downgraded the company to Sell from Neutral, setting a price target of $20. </p> <p>The analysts attributed the downgrade to Palantir's significant surge amid the generative AI hype, which in their opinion, led to an overly inflated valuation. Despite recognizing Palantir's potential to benefit from long-term AI trends and geopolitical volatility, the analysts noted concerns over the inconsistency in government contract revenues, uneven execution, and an excessive valuation. They also suggested that the most challenging times of the current economic downturn may still lie ahead.</p>";

    // Use DOMParser to parse the HTML string
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    // Extract text from each paragraph
    const paragraphs = Array.from(doc.querySelectorAll("p")).map(
      (p) => p.textContent
    );
    return paragraphs;
  };
  const loadStocksList = async () => {
    try {
      const result = await getStocksNews();
      console.log("result", result);
      setStocksNews(result.content);
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    }
  };
  useEffect(() => {
    loadStocksList();
  }, []);
  return (
    <div className="stock-news">
      <div class="news-section">
        <h2>Latest Stock News</h2>
        <div class="news-list">
          {stocksNews.map((content) => (
            <article class="news-item">
              <img src={content.image} alt="News" class="news-image" />
              <div class="news-content">
                <h3 class="news-title">
                  <a href={content.link}>{content.title}</a>
                </h3>
                <p class="news-summary">
                  {paragraphParser(content.content)[0]}
                </p>
                <a href={content.link} class="news-link">
                  Read More
                </a>
                <span class="news-date">{content.date}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
export default StockNews;
