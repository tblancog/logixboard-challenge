import { useState, useEffect } from "react";
import config from "../config";

const { MIN_ROWS, NAV_HEIGHT, HEADER_HEIGHT, ROW_HEIGHT, PAGINATOR_HEIGHT } =
  config;

export default function useDynamicHeightRow(): number {
  // Get the minimum possible
  const minHeight =
    NAV_HEIGHT + HEADER_HEIGHT + ROW_HEIGHT * MIN_ROWS + PAGINATOR_HEIGHT;

  function caculateNumberOfRows(): number {
    const remainingHeight = window.innerHeight - minHeight;
    const num =
      remainingHeight > 0
        ? Math.trunc(remainingHeight / ROW_HEIGHT) + MIN_ROWS
        : MIN_ROWS;
    return num;
  }

  const recalc = (): void => {
    setNumberOfRows(caculateNumberOfRows())
  };
  const [numberOfRows, setNumberOfRows] = useState(caculateNumberOfRows());
  useEffect(() => {
    window.addEventListener("resize", recalc);

    return () => {
      window.removeEventListener("resize", recalc);
    };
    // eslint-disable-next-line
  }, []);

  return numberOfRows;
}
