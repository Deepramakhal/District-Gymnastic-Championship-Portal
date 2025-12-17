/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../apiConfig";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Header from "./Header";

const MAG_COLUMNS = [
  { label: "H/BAR", key: "horizontalBar" },
  { label: "P/BAR", key: "parallelBars" },
  { label: "P/HORSE", key: "pommelHorse" },
  { label: "VAULT", key: "tableVault" },
  { label: "FL.EX", key: "floorExercise" },
  { label: "R/RING", key: "rings" },
];

const WAG_COLUMNS = [
  { label: "BEAM", key: "balancingBeam" },
  { label: "VAULT", key: "tableVault" },
  { label: "FL.EX", key: "floorExercise" },
  { label: "U/BAR", key: "unevenBars" },
];

function ConsolidatedSheet() {
  const { ageGroup, type } = useParams();
  const [data, setData] = useState([]);
  const pdfRef = useRef(null);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    api
      .get(`/getConsolidated/${ageGroup}/${type}`)
      .then((res) => setData(res.data))
      .catch(() => alert("Failed to load consolidated result"));
  }, [ageGroup, type]);

  /* ================= PDF ================= */
  const downloadPDF = async () => {
    const canvas = await html2canvas(pdfRef.current, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Consolidated_${ageGroup}_${type}.pdf`);
  };

  const columns = type === "MAG" ? MAG_COLUMNS : WAG_COLUMNS;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">
            Consolidated Score Sheet – {ageGroup} ({type})
          </h1>

          <button
            onClick={downloadPDF}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Download PDF
          </button>
        </div>

        {/* ================= PDF CONTENT ================= */}
        <div ref={pdfRef} className="bg-white p-6 border">

          {/* TITLE */}
          <div className="text-center mb-4">
            <h2 className="font-bold text-lg">
              HOWRAH DISTRICT GYMNASTIC ASSOCIATION
            </h2>
            <p className="text-sm">District Gymnastic Championship</p>
            <p className="font-semibold underline mt-1">
              CONSOLIDATED SCORE SHEET
            </p>
            <p className="mt-1">
              Group – <b>{ageGroup}</b> &nbsp;&nbsp; {type}
            </p>
          </div>

          {/* TABLE */}
          <table className="w-full border-collapse text-xs text-center">
            <thead>
              <tr>
                <Th>SL</Th>
                <Th>Name of Participant</Th>
                <Th>Unit</Th>
                {columns.map((c) => (
                  <Th key={c.key}>{c.label}</Th>
                ))}
                <Th>TOTAL</Th>
                <Th>RANK</Th>
              </tr>
            </thead>

            <tbody>
              {data.map((p, idx) => (
                <tr key={idx}>
                  <Td>{idx + 1}</Td>
                  <Td className="text-left">{p.playerName}</Td>
                  <Td>{p.clubName}</Td>

                  {columns.map((c) => (
                    <Td key={c.key}>{p[c.key] ?? ""}</Td>
                  ))}

                  <Td className="font-semibold">{p.totalScore}</Td>
                  <Td className="font-bold">{p.rank}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ================= REUSABLE ================= */

const Th = ({ children }) => (
  <th className="border px-2 py-1 font-semibold">{children}</th>
);

const Td = ({ children, className = "" }) => (
  <td className={`border px-2 py-1 ${className}`}>{children}</td>
);

export default ConsolidatedSheet;
