import React from "react";

const getDaysArray = (start, end) => {
  const arr = [];
  let dt = new Date(start);
  while (dt <= end) {
    arr.push(new Date(dt));
    dt.setDate(dt.getDate() + 1);
  }
  return arr;
};

export default function Calender({
  periodStart,
  periodEnd,
  hours,
  setHours,
  className = "",
}) {
  const days = getDaysArray(periodStart, periodEnd);

  const handleHourChange = (date, value) => {
    setHours({
      ...hours,
      [date]: {
        hours: Number(value),
        minutes: hours[date]?.minutes || 0,
      },
    });
  };

  const handleMinuteChange = (date, value) => {
    setHours({
      ...hours,
      [date]: {
        hours: hours[date]?.hours || 0,
        minutes: Number(value),
      },
    });
  };

  return (
    <div className={`calendar ${className}`}>
      <h3>Indtast timer og minutter for hver dag</h3>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>Dato</th>
              <th>Timer</th>
              <th>Minutter</th>
            </tr>
          </thead>
          <tbody>
            {days.map((day) => {
              const dateStr = day.toISOString().slice(0, 10);
              return (
                <tr key={dateStr}>
                  <td>{dateStr}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      max="24"
                      value={hours[dateStr]?.hours ?? ""}
                      onChange={(e) =>
                        handleHourChange(dateStr, e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={hours[dateStr]?.minutes ?? ""}
                      onChange={(e) =>
                        handleMinuteChange(dateStr, e.target.value)
                      }
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
