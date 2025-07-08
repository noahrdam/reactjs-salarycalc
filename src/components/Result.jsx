import React from "react";

export default function Result({
  totalHours,
  hourlyRate,
  taxRate,
  laborMarketContribution,
  className = "",
}) {
  const grossSalary = totalHours * hourlyRate;
  const amBidrag = grossSalary * (laborMarketContribution / 100);
  const taxable = grossSalary - amBidrag;
  const tax = taxable * (taxRate / 100);
  const netSalary = taxable - tax;

  return (
    <div className={`result ${className}`}>
      <h3>Resultat</h3>
      <p>
        Samlede timer: <strong>{totalHours}</strong>
      </p>
      <p>
        Bruttoløn: <strong>{grossSalary.toFixed(2)} DKK</strong>
      </p>
      <p>
        Arbejdsmarkedsbidrag ({laborMarketContribution}%): -
        <strong>{amBidrag.toFixed(2)} DKK</strong>
      </p>
      <p>
        Skattepligtig løn: <strong>{taxable.toFixed(2)} DKK</strong>
      </p>
      <p>
        Skat ({taxRate}%): -<strong>{tax.toFixed(2)} DKK</strong>
      </p>
      <h4>Nettoløn: {netSalary.toFixed(2)} DKK</h4>
    </div>
  );
}
