import React from "react";

export default function SalaryInput({
  hourlyRate,
  setHourlyRate,
  taxRate,
  setTaxRate,
  laborMarketContribution,
  setLaborMarketContribution,
  className = "",
}) {
  return (
    <div className={`salary-input ${className}`}>
      <h3>Lønindstillinger</h3>
      <label>
        Timeløn (DKK):{" "}
        <input
          type="number"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(Number(e.target.value))}
        />
      </label>
      <label>
        Skatteprocent (%):{" "}
        <input
          type="number"
          value={taxRate}
          onChange={(e) => setTaxRate(Number(e.target.value))}
        />
      </label>
    </div>
  );
}
