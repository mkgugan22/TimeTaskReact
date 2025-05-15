import React, { useEffect, useState } from "react";
import "./App.css";
import TimezoneSelector from "./Components/TimeZoneSelector.js";
import TimeDisplay from "./Components/TimeDisplay.js";

const App = () => {
  const [timezones, setTimezones] = useState([]);
  const [selectedTimezone, setSelectedTimezone] = useState("");
  const [localTime, setLocalTime] = useState(new Date().toLocaleString());
  const [selectedTime, setSelectedTime] = useState("");

  // Fetch all timezones (countries / regions) from the backend
  const fetchTimezones = async () => {
    try {
      const res = await fetch("https://time.runasp.net/api/time/timezones");
      const data = await res.json();
      setTimezones(data);
    } catch (err) {
      console.error("Error loading timezones", err);
    }
  };

  // Fetch selected country's (timezone's) current time
  const updateSelectedTime = async (tz) => {
    try {
      const res = await fetch(`https://time.runasp.net/api/time?timezone=${tz}`);
      const data = await res.json();
      setSelectedTime(new Date(data.selectedTime).toLocaleString());
    } catch (err) {
      setSelectedTime("Error fetching time: " + err.message);
    }
  };

  useEffect(() => {
    fetchTimezones();
    const localInterval = setInterval(() => {
      setLocalTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(localInterval);
  }, []);

  useEffect(() => {
    if (!selectedTimezone) return;

    const selectedInterval = setInterval(() => {
      updateSelectedTime(selectedTimezone);
    }, 1000);

    return () => clearInterval(selectedInterval);
  }, [selectedTimezone]);

  const handleTimezoneSelect = (tz) => {
    setSelectedTimezone(tz);
    updateSelectedTime(tz);
  };

  return (
    <div className="time-container">
      <h1>Time Zone Converter</h1>
      <TimezoneSelector
        timezones={timezones}
        selectedTimezone={selectedTimezone}
        onSelect={handleTimezoneSelect}
      />
      <TimeDisplay
        localTime={localTime}
        selectedTimezone={selectedTimezone}
        selectedTime={selectedTime}
      />
    </div>
  );
};

export default App;
