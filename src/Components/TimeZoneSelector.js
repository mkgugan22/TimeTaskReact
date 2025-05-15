import React from "react";

const TimezoneSelector = ({ timezones, selectedTimezone, onSelect }) => {
  return (
    <div>
      <label htmlFor="timezones">Select Timezone:</label>
      <select
        id="timezones"
        value={selectedTimezone}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">--Select--</option>
        {timezones.map((tz) => (
          <option key={tz} value={tz}>
            {tz}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimezoneSelector;
