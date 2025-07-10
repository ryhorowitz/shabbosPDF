import React, { createContext, useContext } from "react";
import { StyleSheet } from "@react-pdf/renderer";

const PDFStylesContext = createContext();

const PDFStyles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#f5f6fa",
    padding: 24,
    alignItems: "center",
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 2,
    color: "#333333",
    padding: 0,
    alignItems: "center",
    width: "100%",
  },
  section: {
    margin: 0,
    marginBottom: 8,
    padding: 0,
    flexGrow: 1,
    width: "100%",
    alignItems: "center",
  },
  card: {
    border: "1px solid #e0e0e0",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#ffffff",
    width: "90%",
    maxWidth: 420,
    alignSelf: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  dayTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 2,
    color: "#2c3e50",
    textAlign: "center",
  },
  weatherInfo: {
    fontSize: 9,
    marginBottom: 2,
    color: "#555555",
  },
  temperature: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#e74c3c",
    marginBottom: 4,
  },
  summary: {
    fontSize: 10,
    fontStyle: "italic",
    color: "#6D8196",
    marginTop: 0,
    marginBottom: 5,
  },
  candleSection: {
    border: "1px solid #e0e0e0",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fffbe6",
    width: "90%",
    maxWidth: 420,
    alignSelf: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  candleTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 2,
    color: "#8b4513",
  },
  candleInfo: {
    fontSize: 9,
    fontWeight: 700,
    marginBottom: 2,
    color: "#555555",
    paddingLeft: 8,
  },
  twoColumnContainer: {
    flexDirection: "row",
    marginBottom: 2,
  },
  column: {
    flex: 1,
    marginRight: 4,
  },
  columnRight: {
    flex: 1,
  },
  weatherHeader: {
    textAlign: "center",
  },
  tempTableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
    marginBottom: 2,
  },
  tempTableCol: {
    flex: 1,
    alignItems: "center",
  },
  feelsLikeTemp: {
    fontSize: 8,
    color: "#b0b0b0",
    fontStyle: "italic",
    marginTop: 0,
    marginBottom: 0,
  },
  tempPeriodLabel: {
    fontSize: 10,
    color: "#555",
    fontWeight: "normal",
    marginBottom: 1,
  },
  tempPeriodValue: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "bold",
    marginBottom: 0,
  },
});

export const PDFStylesProvider = ({ children }) => (
  <PDFStylesContext.Provider value={PDFStyles}>
    {children}
  </PDFStylesContext.Provider>
);

export const usePDFStyles = () => useContext(PDFStylesContext);
