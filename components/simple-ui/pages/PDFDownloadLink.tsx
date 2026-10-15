"use client";
import dynamic from "next/dynamic";

// react-pdf's PDFDownloadLink is browser-only; rendering it during SSR throws
// "PDFDownloadLink is a web specific API". Load it on the client only.
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

export default PDFDownloadLink;
