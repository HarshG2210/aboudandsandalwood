import { useSelector } from "react-redux";
import { selectCurrency } from "../store/slices/userSlice";

const currencySymbols = {
  INR: "₹",
  USD: "$",
  AED: "AED ",
  SAR: "SAR ",
  JPY: "¥",
  CNY: "¥",
  QAR: "QAR ",
};

export const useCurrency = () => {
  const currency = useSelector(selectCurrency);
  const symbol = currencySymbols[currency] || " ";

  const format = (prices) => {
    const amount = prices?.[currency] || prices?.INR || 0;
    return `${symbol}${amount.toLocaleString()}`;
  };

  return { currency, symbol, format };
};

export const CURRENCIES = [
  { code: "INR", label: "₹ INR — India", region: "IN" },
  { code: "USD", label: "$ USD — USA", region: "US" },
  { code: "AED", label: "AED — UAE", region: "AE" },
  { code: "SAR", label: "SAR — Saudi Arabia", region: "SA" },
  { code: "QAR", label: "QAR — Qatar", region: "QA" },
  { code: "JPY", label: "¥ JPY — Japan", region: "JP" },
  { code: "CNY", label: "¥ CNY — China", region: "CN" },
];
