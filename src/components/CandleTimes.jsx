import React from "react";
import { useShabbos } from "../context/shabbosContext.js";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Spinner,
  Alert,
} from "react-bootstrap";
import { extractCandleItems } from "../utils/candleDataUtils.js";

const CandleTimes = () => {
  const {
    candleData,
    geoData,
    candleLoading: loading,
    candleError: error,
  } = useShabbos();

  if (loading) {
    return (
      <Container className="candle-times">
        <Row className="justify-content-center py-3">
          <Col xs="auto">
            <Spinner animation="border" role="status" />
            <span className="ms-2">Loading candle times...</span>
          </Col>
        </Row>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="candle-times">
        <Row className="justify-content-center">
          <Col md={8}>
            <Alert variant="danger" className="text-center">
              Error loading candle times: {error}
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  // Extract parsha, candle, and havdalah items
  const { candleItem, parshaItem, havdalahItem } =
    extractCandleItems(candleData);

  return (
    <Container className="candle-times my-4">
      {parshaItem && (
        <div className="mb-3">
          <Row className="justify-content-center mb-3">
            <Col xs="auto" className="text-center">
              <span className="display-4 fw-bold">{parshaItem.title}</span>
              <span className="ms-3 display-4 fw-bold">
                {parshaItem.hebrew}
              </span>
            </Col>
          </Row>
          <Row className="justify-content-center mb-3">
            <Col xs="auto" className="text-center">
              {parshaItem.date ? (
                <span style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                  {parshaItem.hdate}
                </span>
              ) : (
                <div className="text-muted">No Hebrew Date found.</div>
              )}
            </Col>
          </Row>
          <Row className="justify-content-center mb-3">
            <Col
              xs="auto"
              className="text-center fs-3 fw-bold"
              // style={{ fontSize: "1.25rem", fontWeight: 600 }}
            >
              {geoData.city}, {geoData.region}
            </Col>
          </Row>
        </div>
      )}
      <Row className="justify-content-center">
        <Col md={6}>
          <ListGroup className="shadow-sm mb-3" style={{ textAlign: "left" }}>
            <ListGroup.Item className="">
              {candleItem.title ? (
                <div className="mb-2 d-flex justify-content-between align-items-center">
                  <strong>{candleItem.title}</strong>
                  <span>
                    {new Date(candleItem.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              ) : (
                <div className="text-muted">
                  No candle lighting times found.
                </div>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              {havdalahItem.title ? (
                <div className="mb-2 d-flex justify-content-between align-items-center">
                  <strong>{havdalahItem.title}</strong>
                  <span>
                    {new Date(havdalahItem.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              ) : (
                <div className="text-muted">No havdalah times found.</div>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default CandleTimes;
