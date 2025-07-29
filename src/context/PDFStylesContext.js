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
    textAlign: "left",
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
    padding: 6,
    marginBottom: 10,
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
    textAlign: "left",
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
  // New summary styles
  summaryContainer: {
    marginTop: 8,
    padding: 8,
    backgroundColor: "#f8f9fa",
    borderRadius: 6,
    border: "1px solid #e9ecef",
  },
  summaryMainRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  summaryLeft: {
    flex: 1,
    marginRight: 12,
  },
  summaryCenter: {
    flex: 1,
    alignItems: "center",
  },
  summaryRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  summaryTemp: {
    // paddingLeft: 1,
    fontSize: 28,
    fontWeight: "bold",
    color: "#e74c3c",
    marginBottom: 10,
  },
  summaryCondition: {
    fontSize: 12,
    color: "#495057",
    fontStyle: "italic",
    lineHeight: 1.2,
  },
  weatherDetail: {
    alignItems: "flex-end",
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 8,
    color: "#6c757d",
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 1,
  },
  detailValue: {
    fontSize: 9,
    color: "#495057",
    fontWeight: "bold",
  },
  detailedForecastContainer: {
    borderTop: "1px solid #dee2e6",
    paddingTop: 6,
  },
  detailedForecastText: {
    fontSize: 9,
    color: "#6c757d",
    lineHeight: 1.3,
    fontStyle: "italic",
  },
  // Hourly forecast table styles
  hourlyTableHeader: {
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #dee2e6",
    paddingVertical: 2,
    marginBottom: 1,
  },
  hourlyHeaderCell: {
    flex: 1,
    fontSize: 8,
    fontWeight: "bold",
    color: "#495057",
    textAlign: "center",
    paddingHorizontal: 2,
  },
  hourlyTableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #f1f3f4",
    paddingVertical: 1,
    alignItems: "center",
  },
  hourlyCell: {
    flex: 1,
    fontSize: 7,
    color: "#495057",
    textAlign: "center",
    paddingHorizontal: 2,
  },
});

export const PDFStylesProvider = ({ children }) => (
  <PDFStylesContext.Provider value={PDFStyles}>
    {children}
  </PDFStylesContext.Provider>
);

export const usePDFStyles = () => useContext(PDFStylesContext);
