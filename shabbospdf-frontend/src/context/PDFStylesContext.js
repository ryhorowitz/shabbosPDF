import React, { createContext, useContext } from 'react';
import { StyleSheet } from '@react-pdf/renderer';

const PDFStylesContext = createContext();

const PDFStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Helvetica'
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 0,
    color: '#333333'
  },
  section: {
    margin: 10,
    marginBottom: 5,
    padding: 10,
    flexGrow: 1
  },
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 5,
    backgroundColor: '#f9f9f9'
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50'
  },
  weatherInfo: {
    fontSize: 12,
    marginBottom: 5,
    color: '#555555'
  },
  temperature: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 10
  },
  summary: {
    fontSize: 11,
    fontStyle: 'italic',
    color: '#7f8c8d',
    marginTop: 0
  },
  candleSection: {
    border: '1px solid #e0e0e0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff8dc'
  },
  candleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#8b4513'
  },
  candleInfo: {
    fontSize: 12,
    marginBottom: 5,
    color: '#555555'
  },
  twoColumnContainer: {
    flexDirection: 'row',
    marginBottom: 5
  },
  column: {
    flex: 1,
    marginRight: 10
  },
  columnRight: {
    flex: 1
  }
});

export const PDFStylesProvider = ({ children }) => (
  <PDFStylesContext.Provider value={PDFStyles}>
    {children}
  </PDFStylesContext.Provider>
);

export const usePDFStyles = () => useContext(PDFStylesContext); 