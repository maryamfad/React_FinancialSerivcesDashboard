import { useState, useEffect } from "react";
import getStocksNews from "../../../api/getStocksNews";
import "./StockNews.css";
const StockNews = ({ symbol }) => {
  const [stocksNews, setStocksNews] = useState([]);

  const loadStocksList = async (stockSymbol) => {
    try {
      const result = await getStocksNews(stockSymbol);
      console.log(result.feed);
      setStocksNews(result.feed);
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    }
  };
  useEffect(() => {
    loadStocksList(symbol);
  }, [symbol]);
  return (
    // <div className="stock-news">
      <div class="news-section">
        <div className="news-section-header">Latest Stock News</div>
        <div class="news-list">
          {stocksNews ? (
            stocksNews.map((feed, index) => (
              <article class="news-item" key={index}>
                <img src={feed.banner_image} alt="News" class="news-image" />
                <div class="news-feed">
                  <div class="news-title">
                    <a
                      href={feed.url}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {feed.title}
                    </a>
                  </div>
                  <p class="news-summary">{feed.summary}</p>
                  <a
                    href={feed.url}
                    rel="noopener noreferrer"
                    target="_blank"
                    class="news-link"
                  >
                    Read More
                  </a>
                  <span class="news-date">{feed.time_published}</span>
                </div>
              </article>
            ))
          ) : (
            <div className="stock-news-placeholder">
              <div className="placeholder-message">
                Sorry there is no feed for this stock right now.
              </div>
            </div>
          )}
        </div>
      </div>
  
  );
};
export default StockNews;
