import React, { useState, useEffect } from "react";
// import { Document, Page, pdfjs } from "react-pdf";

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);
      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return windowSize;
};

export default function Commute({ data }) {
  // const [numPages, setNumPages] = useState(null); // 총 페이지수
  // const [pageNumber, setPageNumber] = useState(1); // 현재 페이지
  // const [pageScale, setPageScale] = useState(1); // 페이지 스케일

  // const windowSize = useWindowSize();
  // const [numPages, setNumPages] = useState(0);
  // const [pageNumber, setPageNumber] = useState(1);

  // function onDocumentLoadSuccess({ numPages }) {
  //   console.log("numPages", numPages);
  //   setNumPages(numPages);
  //   setPageNumber(1);
  // }

  return (
    <div>
      <h1>Commute</h1>
    </div>
    // <Document
    //   file="/doc/step1_contract_202203080628053.pdf"
    //   // file="/doc/sample.pdf"
    //   onLoadSuccess={onDocumentLoadSuccess}
    // >
    //   {Array.from(new Array(numPages), (_, index) => (
    //     <Page
    //       width={windowSize.width - 600}
    //       height={windowSize.height}
    //       key={index}
    //       pageNumber={index + 1}
    //       renderAnnotationLayer={false}
    //       renderTextLayer={false}
    //     />
    //   ))}
    // </Document>
  );
}

// export async function getServerSideProps({ params: { params } }) {
// try {
//   console.log(params);
//   const [enterprise, userId, yyyymm] = params || [];
//   const response = await fetch(
//     `${process.env.API_URL}/v2/entpr/${enterprise}/users/${userId}/payrolls/${yyyymm}/commute`
//   );
//   if (!response.ok) {
//     return {
//       props: {
//         data: [],
//       },
//     };
//   }
//   // console.log("<==================================================>");
//   const { result } = data;
//   console.log(result);
//   return {
//     props: {
//       result: [result],
//     },
//   };
// } catch (error) {
//   console.log("error", error);
// }
// }
