import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Datas from "./data.json";
import { calculateSum } from "./Calculatesum.jsx";
const Tables = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      setData(Datas);
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

  const regionNames = Array.from(new Set(data.map((row) => row.region_name)));

  return (
    <Table striped bordered hover size="sm">
      <thead style={{ backgroundColor: "#D5D3B7" }}>
        <tr>
          <th rowSpan={4}>№</th>
          <th rowSpan={4}>Вилоят</th>
          <th rowSpan={4}>Туман/шаҳар</th>
          {indicatorNames.map((name, index) => (
            <th key={index} colSpan={3}>
              {name}
            </th>
          ))}
        </tr>
        <tr>
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
            const { sumPlan, sumFact, sumPercent } = calculateSum(
              data
                .flatMap((row) => row.indicators)
                .filter((indicator) => indicator.indicator_name === name)
            );
            return (
              <React.Fragment key={index}>
                <td style={{ width: "100%" }}>{sumPlan}</td>
                <td style={{ width: "100%" }}>{sumFact}</td>
                <td>{sumPercent}</td>
              </React.Fragment>
            );
          })}
        </tr>

        {regionNames.map((regionName, regionIndex) => {
          const regionData = data.filter(
            (rowdata) => rowdata.region_name === regionName
          );
          return (
            <React.Fragment key={regionIndex}>
              {regionData.map((rowdata, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  <tr
                    style={{
                      backgroundColor: rowIndex === 0 ? "#E0CA3C" : undefined,
                    }}
                  >
                    {rowIndex === 0 && <td colSpan={3}>{regionName}</td>}
                    {indicatorNames.map((name, index) => {
                      const { sumPlan, sumFact, sumPercent } = calculateSum(
                        regionData
                          .flatMap((row) => row.indicators)
                          .filter(
                            (indicator) => indicator.indicator_name === name
                          )
                      );
                      return (
                        <React.Fragment key={index}>
                          <td>{sumPlan}</td>
                          <td>{sumFact}</td>
                          <td>{sumPercent}</td>
                        </React.Fragment>
                      );
                    })}
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
                      return (
                        <React.Fragment key={index}>
                          <td>
                            {matchingIndicator ? matchingIndicator.plan : 0}
                          </td>
                          <td>
                            {matchingIndicator ? matchingIndicator.fact : 0}
                          </td>
                          <td>
                            {typeof matchingIndicator?.percent === "string"
                              ? parseFloat(matchingIndicator.percent).toFixed(2)
                              : matchingIndicator?.percent || 0}
                          </td>
                        </React.Fragment>
                      );
                    })}
                  </tr>
                </React.Fragment>
              ))}
            </React.Fragment>
          );
        })}
      </tbody>
    </Table>
  );
};

export default Tables;
