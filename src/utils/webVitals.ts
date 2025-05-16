/**
 * Web Vitals reporting utility
 * This file sets up monitoring for Core Web Vitals metrics
 */

import { Metric, getCLS, getFID, getLCP, getTTFB, getFCP } from 'web-vitals';

type ReportHandler = (metric: Metric) => void;

const reportWebVitals = (onPerfEntry?: ReportHandler): void => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    getCLS(onPerfEntry); // Cumulative Layout Shift
    getFID(onPerfEntry); // First Input Delay
    getLCP(onPerfEntry); // Largest Contentful Paint
    getTTFB(onPerfEntry); // Time to First Byte
    getFCP(onPerfEntry); // First Contentful Paint
  }
};

export default reportWebVitals;
