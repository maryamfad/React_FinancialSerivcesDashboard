import { useState, useEffect } from "react";
import "./Dashboard.css";
import getLatestQuoteForStock from "../../api/getLatestQuoteForAStock";
import getLatestBarForAStock from "../../api/getLatestBarForAStock";
import getStockLogo from "../../api/getStockLogo";

const Scroller = ({ setSymbol }) => {
  const [closePrice, setClosePrice] = useState(0);
  const [bidPrice, setBidPrice] = useState(0);
  let stocksAndDuplicates = [
    { symbol: "NKLA", price: 0, change: 0 },
    { symbol: "IBIO", price: 0, change: 0 },
    { symbol: "VERB", price: 0, change: 0 },
    { symbol: "GMDA", price: 0, change: 0 },
    { symbol: "SOXS", price: 0, change: 0 },
    { symbol: "CCL", price: 0, change: 0 },
    { symbol: "SQQQ", price: 0, change: 0 },
    { symbol: "CISS", price: 0, change: 0 },
    { symbol: "NIO", price: 0, change: 0 },
    { symbol: "NKLA", price: 0, change: 0 },
    { symbol: "IBIO", price: 0, change: 0 },
    { symbol: "VERB", price: 0, change: 0 },
    { symbol: "GMDA", price: 0, change: 0 },
    { symbol: "SOXS", price: 0, change: 0 },
    { symbol: "CCL", price: 0, change: 0 },
    { symbol: "SQQQ", price: 0, change: 0 },
    { symbol: "CISS", price: 0, change: 0 },
    { symbol: "NIO", price: 0, change: 0 },
  ];

  const loadLatestBidPrice = async (symbol) => {
    try {
      const result = await getLatestQuoteForStock(symbol);

      return result.quote.bp;
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    }
  };
  const loadStockLogo = async (symbol) => {
    try {
      const result = await getStockLogo(symbol);
      return result;
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    }
  };

  const loadLatestClosePrice = async (symbol) => {
    try {
      const result = await getLatestBarForAStock(symbol);
      return result.bar.c;
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    }
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const priceDiv = entry.target.querySelector(".stock-price");
        if (!priceDiv) {
          let symbol = entry.target
            .querySelector(".stock-name")
            .innerText.toString();
          // console.log(symbol);
          fetchDataAndUpdateArray(symbol, entry.target);
        }
      }
    });
  };

  async function fetchDataAndUpdateArray(symbol, divElement) {
    try {
      const [bidPrice, closePrice, stockLogo] = await Promise.all([
        loadLatestBidPrice(symbol),
        loadLatestClosePrice(symbol),
        loadStockLogo(symbol),
      ]);

      const priceDifference = closePrice - bidPrice;

      stocksAndDuplicates = stocksAndDuplicates.map((item) => {
        if (item.symbol === symbol) {
          return {
            ...item,
            symbol: symbol,
            price: closePrice.toFixed(4),
            change: priceDifference.toFixed(4),
          };
        }
        return item;
      });
      // console.log(stocksAndDuplicates);
      const stockChangeHtml =
        priceDifference < 0
          ? `<div class="stock-change" style="color: red;">
    <span style="color: red;">▼</span> ${priceDifference.toFixed(4)} (${(
              priceDifference * 0.1
            ).toFixed(2)} %)
  </div>`
          : `<div class="stock-change" style="color: green;">
    <span style="color: green;">▲</span> ${priceDifference.toFixed(4)} (${(
              priceDifference * 0.1
            ).toFixed(2)} %)
  </div>`;

      const html = `
      
      <div class="d-flex justify-content-between">
        <div class="d-flex flex-column col-12">
          <div class="stock-price">
            ${closePrice} $
          </div>
            ${stockChangeHtml}
        </div>

      </div>
      <img src=${stockLogo} alt="logo" class="scroller-stock-logo"/>
`;

      divElement.querySelector(".stock-change-value").innerHTML += html;
    } catch (error) {
      console.error("Error fetching data or updating array:", error);
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback);
    const elements = document.querySelectorAll(".box");

    elements.forEach((el) => {
      observer.observe(el);
    });

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div
      className="scroller"
      data-animated={
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "true"
          : "false"
      }
    >
      <div className="scroller_inner">
        {stocksAndDuplicates.map((stock, index) => (
          <div className="box" key={index}>
            <div className="d-flex justify-content-between">
              <div>
                <div class="stock-name" onClick={() => setSymbol(stock.symbol)}>
                  {stock.symbol}
                </div>

                <div
                  className="stock-change-value"
                  // style={{ width: "250px" }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scroller;
