import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Datas from "./data.json";

const Tables = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setData(Datas);
      }, 1000);
    };
    fetchData();
  }, []);

  const indicatorNames = Array.from(
    new Set(
      data.flatMap((row) =>
        row.indicators.map((indicator) => indicator.indicator_name)
      )
    )
  );
  const regionNames = Array.from(
    new Set(data.flatMap((row) => row.region_name))
  );
  const totalSum = {
    plan: 0,
    fact: 0,
    percent: 0,
  };

  data.forEach((row) => {
    row.indicators.forEach((indicator) => {
      const { plan, fact, percent, unit_formula } = indicator;
      if (unit_formula === "SUM") {
        totalSum.plan += parseFloat(plan) || 0;
        totalSum.fact += parseFloat(fact) || 0;
        totalSum.percent += parseFloat(percent) || 0;
      }
    });
  });

  return (
    <Table striped bordered hover size="sm">
      <thead style={{ backgroundColor: "#D5D3B7" }}>
        <tr>
          <th>№</th>
          <th>Вилоят</th>
          <th>Туман/шаҳар</th>
          {indicatorNames.map((name, index) => (
            <th key={index} colSpan={3}>
              {name}
            </th>
          ))}
        </tr>
        <tr>
          <th></th>
          <th></th>
          <th></th>
          {indicatorNames.map((name, index) => (
            <React.Fragment key={index}>
              <th>Режа</th>
              <th>Факт</th>
              <th>Бажарилиши</th>
            </React.Fragment>
          ))}
        </tr>
      </thead>
      <tbody style={{ backgroundColor: "#E7CFBC" }}>
        <tr style={{ backgroundColor: "yellow" }}>
          <td colSpan={3}>Республика буйича</td>
          {indicatorNames.map((name, index) => {
            // Filter data to get only indicators with matching names
            const matchingIndicators = data
              .flatMap((row) => row.indicators)
              .filter((indicator) => indicator.indicator_name === name);

            // Initialize counters for sum and count for average calculation
            let sumPlan = 0;
            let sumFact = 0;
            let sumPercent = 0;

            // Iterate over matching indicators to calculate sum or average
            matchingIndicators.forEach((indicator) => {
              if (indicator.unit_formula === "SUM") {
                sumPlan += parseFloat(indicator.plan);
                sumFact += parseFloat(indicator.fact);
                if (indicator.indicator_type === 1) {
                  sumPercent =
                    100 * (1 + (1 - (indicator.fact / indicator.plan) * 1));
                } else {
                  sumPercent = (indicator.fact / indicator.plan) * 100;
                }
              } else if (indicator.unit_formula === "AVG") {
                const planLength = Array.isArray(indicator.plan)
                  ? indicator.plan.length
                  : 1;
                const factLength = Array.isArray(indicator.fact)
                  ? indicator.fact.length
                  : 1;
                sumPlan += parseFloat(indicator.plan) / planLength;
                sumFact += parseFloat(indicator.fact) / factLength;
                if (indicator.indicator_type === 1) {
                  sumPercent =
                    100 * (1 + (1 - (indicator.fact / indicator.plan) * 1));
                } else {
                  sumPercent = (indicator.fact / indicator.plan) * 100;
                }
              }
            });
            if (sumPercent > 100 || sumPercent < -1) {
              sumPercent = 100;
            }
            // Calculate the average if there are indicators with "AVG" unit formula

            // Display the calculated sum or average
            return (
              <React.Fragment key={index}>
                <td>{sumPlan.toFixed(2)}</td>
                <td>{sumFact.toFixed(2)}</td>
                <td>{sumPercent.toFixed(2)}</td>
              </React.Fragment>
            );
          })}
        </tr>

        {regionNames.map((name, index) => (
          <React.Fragment key={index}>
            {data
              .filter((rowdata) => rowdata.region_name === name)
              .map((rowdata, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  <tr style={{ backgroundColor: "grey" }}>
                    {rowIndex === 0 && (
                      <React.Fragment>
                        <td colSpan={3}>{rowdata.region_name}</td>
                        {regionNames.map((name, index) => {
                          // Filter data to get only indicators with matching names
                          const regionData = data.filter(
                            (rowdata) => rowdata.region_name === name
                          );

                          // Initialize counters for sum and count for average calculation
                          let sumPlan = 0;
                          let sumFact = 0;
                          let sumPercent = 0;

                          regionData.forEach((rowdata) => {
                            rowdata.indicators.forEach((indicator) => {
                              if (indicator.unit_formula === "SUM") {
                                sumPlan += parseFloat(indicator.plan);
                                sumFact += parseFloat(indicator.fact);
                                if (indicator.indicator_type === 1) {
                                  sumPercent =
                                    100 *
                                    (1 +
                                      (1 -
                                        (indicator.fact / indicator.plan) * 1));
                                } else {
                                  sumPercent =
                                    (indicator.fact / indicator.plan) * 100;
                                }
                              } else if (indicator.unit_formula === "AVG") {
                                const planLength = Array.isArray(indicator.plan)
                                  ? indicator.plan.length
                                  : 1;
                                const factLength = Array.isArray(indicator.fact)
                                  ? indicator.fact.length
                                  : 1;
                                sumPlan +=
                                  parseFloat(indicator.plan) / planLength;
                                sumFact +=
                                  parseFloat(indicator.fact) / factLength;
                                if (indicator.indicator_type === 1) {
                                  sumPercent =
                                    100 *
                                    (1 +
                                      (1 -
                                        (indicator.fact / indicator.plan) * 1));
                                } else {
                                  sumPercent =
                                    (indicator.fact / indicator.plan) * 100;
                                }
                              }
                            });
                          });
                          // Calculate the average if there are indicators with "AVG" unit formula

                          // Display the calculated sum or average
                          return (
                            <React.Fragment key={index}>
                              <td>{sumPlan.toFixed(2)}</td>
                              <td>{sumFact.toFixed(2)}</td>
                              <td>{sumPercent.toFixed(2)}</td>
                            </React.Fragment>
                          );
                        })}
                      </React.Fragment>
                    )}
                  </tr>
                  <tr>
                    <td>{rowIndex + 1}</td>
                    <td>{rowdata.region_name}</td>
                    <td>{rowdata.district_name}</td>
                    {indicatorNames.map((indicatorName, index) => {
                      const matchingIndicator = rowdata.indicators.find(
                        (indicator) =>
                          indicator.indicator_name === indicatorName
                      );
                      return matchingIndicator ? (
                        <React.Fragment key={index}>
                          <td>{matchingIndicator.plan}</td>
                          <td>{matchingIndicator.fact}</td>
                          <td>
                            {typeof matchingIndicator.percent === "string"
                              ? parseFloat(matchingIndicator.percent).toFixed(2)
                              : matchingIndicator.percent}
                          </td>
                        </React.Fragment>
                      ) : (
                        <React.Fragment key={index}>
                          <td></td>
                          <td></td>
                          <td></td>
                        </React.Fragment>
                      );
                    })}
                  </tr>
                </React.Fragment>
              ))}
          </React.Fragment>
        ))}
      </tbody>
    </Table>
  );
};

export default Tables;
