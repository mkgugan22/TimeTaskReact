import React from "react";

const TimeDisplay = ({ localTime, selectedTimezone, selectedTime }) => {
  return (
    <div className="time-display">
      <h2>Local Time: {localTime}</h2>
      {selectedTimezone && (
        <>
          <h2>Selected Time in {selectedTimezone}: {selectedTime}</h2>
          {selectedTime.includes("Error fetching time") && (
            <span className="error-message">{selectedTime}</span>
          )}
        </>
      )}
    </div>
  );
};

export default TimeDisplay;
