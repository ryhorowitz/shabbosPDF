import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const timeLabels = ["Afternoon (4pm)", "Evening (8pm)", "Night (12am)", "Morning (8am)", "Day (12pm)"];

const DailyForecastCard = ({ dayString, periods, loading }) => {
  if (loading) {
    return (
      <Container className="mb-3 p-0 border rounded">
        <div className="bg-secondary text-white p-2 rounded-top">
          <h5 className="mb-0">{dayString}</h5>
        </div>
        <div className="p-3">
          <span>Loading forecast...</span>
        </div>
      </Container>
    );
  }

  if (!periods || periods.length === 0) {
    return (
      <Container className="mb-3 p-0 border rounded">
        <div className="bg-secondary text-white p-2 rounded-top">
          <h5 className="mb-0">{dayString}</h5>
        </div>
        <div className="p-3">
          <span>No forecast available</span>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mb-3 p-0 border rounded daily-forecast-card">
      <div className="bg-primary text-white p-2 rounded-top">
        <h5 className="mb-0">{dayString}</h5>
      </div>
      <div className="p-3">
        <Row>
          {periods.map((period, idx) => (
            <Col key={period?.startTime || idx} md={periods.length > 3 ? 3 : 4} className="mb-2 text-center">
              <div className="fw-bold mb-1">
                {(() => {
                  // Label by index and day
                  if (dayString === "Friday") {
                    if (idx === 0) return "Afternoon (4pm)";
                    if (idx === 1) return "Evening (8pm)";
                    if (idx === 2) return "Night (12am)";
                  } else if (dayString === "Saturday") {
                    if (idx === 0) return "Morning (8am)";
                    if (idx === 1) return "Day (12pm)";
                    if (idx === 2) return "Afternoon (4pm)";
                    if (idx === 3) return "Evening (8pm)";
                  }
                  return period?.name || "";
                })()}
              </div>
              {period ? (
                <>
                  <div style={{ fontSize: 48 }}>
                    {period.icon && (
                      <img src={period.icon} alt={period.shortForecast} style={{ width: 48, height: 48 }} />
                    )}
                  </div>
                  <div className="fw-bold fs-4 mb-1">
                    {period.temperature}°{period.temperatureUnit}
                  </div>
                  <div className="mb-1">{period.shortForecast}</div>
                </>
              ) : (
                <div className="text-muted">No data</div>
              )}
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default DailyForecastCard;
