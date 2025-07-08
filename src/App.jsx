import React, { useState, useEffect } from "react";
import Calender from "./components/Calender";
import SalaryInput from "./components/SalaryInput";
import Result from "./components/Result";
import "./App.css";

function getSalaryPeriod(today = new Date()) {
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();

  let start, end;
  if (day >= 21) {
    start = new Date(year, month, 22);
    end = new Date(year, month + 1, 22);
  } else {
    start = new Date(year, month - 1, 22);
    end = new Date(year, month, 22);
  }
  return { start, end };
}

function getPeriodKey(start, end) {
  // Unik nøgle for perioden, fx "2024-06-22_2024-07-22"
  return `${start.toISOString().slice(0, 10)}_${end
    .toISOString()
    .slice(0, 10)}`;
}

function App() {
  const { start, end } = getSalaryPeriod();
  const periodKey = getPeriodKey(start, end);

  // Hent timer fra localStorage ved load
  const [hours, setHours] = useState(() => {
    const saved = localStorage.getItem(`hours_${periodKey}`);
    return saved ? JSON.parse(saved) : {};
  });

  const [hourlyRate, setHourlyRate] = useState(145);
  const [taxRate, setTaxRate] = useState(38);
  const [laborMarketContribution, setLaborMarketContribution] = useState(8);

  // Gem timer i localStorage når de ændres
  useEffect(() => {
    localStorage.setItem(`hours_${periodKey}`, JSON.stringify(hours));
  }, [hours, periodKey]);

  // Hvis perioden skifter, hent timer for den nye periode
  useEffect(() => {
    const saved = localStorage.getItem(`hours_${periodKey}`);
    setHours(saved ? JSON.parse(saved) : {});
  }, [periodKey]);

  const totalHours = Object.values(hours).reduce(
    (sum, entry) => sum + ((entry?.hours || 0) + (entry?.minutes || 0) / 60),
    0
  );

  return (
    <div className="app-container">
      <h2>Lønberegner</h2>
      <p className="salary-period">
        Lønperiode: {start.toLocaleDateString()} - {end.toLocaleDateString()}
      </p>
      <div className="main-layout">
        <div className="left-col">
          <Calender
            periodStart={start}
            periodEnd={end}
            hours={hours}
            setHours={setHours}
            className="calendar"
          />
        </div>
        <div className="right-col">
          <SalaryInput
            hourlyRate={hourlyRate}
            setHourlyRate={setHourlyRate}
            taxRate={taxRate}
            setTaxRate={setTaxRate}
            laborMarketContribution={laborMarketContribution}
            setLaborMarketContribution={setLaborMarketContribution}
            className="salary-input"
          />
          <Result
            totalHours={totalHours}
            hourlyRate={hourlyRate}
            taxRate={taxRate}
            laborMarketContribution={laborMarketContribution}
            className="result"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
