import React from "react";
import { Container, Row } from "react-bootstrap";

const DailyForecastCard = ({ dayString, periods, loading }) => {
  if (loading) {
    return (
      <Container className="mb-3 p-0 border rounded">
        <div className="bg-secondary text-white p-2 rounded-top">
          <h5 className="mb-0" style={{ fontSize: '1.1rem' }}>{dayString}</h5>
        </div>
        <div className="p-3">
          <span style={{ fontSize: '0.95rem' }}>Loading forecast...</span>
        </div>
      </Container>
    );
  }

  if (!periods || periods.length === 0) {
    return (
      <Container className="mb-3 p-0 border rounded">
        <div className="bg-secondary text-white p-2 rounded-top">
          <h5 className="mb-0" style={{ fontSize: '1.1rem' }}>{dayString}</h5>
        </div>
        <div className="p-3">
          <span style={{ fontSize: '0.95rem' }}>No forecast available</span>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mb-3 p-0 border rounded daily-forecast-card">
      <div className="bg-primary text-white p-2 rounded-top">
        <h5 className="mb-0" style={{ fontSize: '1.1rem' }}>{dayString}</h5>
      </div>
      <div className="p-3">
        {periods.map((period, idx) => (
          <Row key={period?.startTime || idx} className="mb-2 align-items-center" style={{ fontSize: '0.95rem' }}>
            <div className="fw-bold mb-1" style={{ fontSize: '0.95rem' }}>
              {(() => {
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
              <div className="d-flex align-items-center" style={{ gap: 12 }}>
                <div style={{ fontSize: 28, minWidth: 32 }}>
                  {period.icon && (
                    <img src={period.icon} alt={period.shortForecast} style={{ width: 28, height: 28 }} />
                  )}
                </div>
                <div className="fw-bold" style={{ fontSize: '1.1rem', minWidth: 48 }}>
                  {period.temperature}°{period.temperatureUnit}
                </div>
                <div style={{ fontSize: '0.95rem', flex: 1 }}>{period.shortForecast}</div>

              </div>
            ) : (
              <div className="text-muted" style={{ fontSize: '0.95rem' }}>No data</div>
            )}
          </Row>
        ))}
      </div>
    </Container>
  );
};

export default DailyForecastCard;
