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

  return (
    <Table striped bordered hover size="sm">
      <thead style={{ backgroundColor: "#D5D3B7" }}>
        <tr>
          <th>№</th>
          <th>Вилоят</th>
          <th>Туман/шаҳар</th>
          {indicatorNames.map((name, index) => (
            <React.Fragment key={index}>
              <th colSpan={3}>{name}</th>
            </React.Fragment>
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
      <tbody>
        {data.map((rowdata, rowIndex) => (
          <tr key={rowIndex}>
            <td>{rowIndex + 1}</td>
            <td>{rowdata.region_name}</td>
            <td>{rowdata.district_name}</td>
            {indicatorNames.map((indicatorName, index) => {
              const matchingIndicator = rowdata.indicators.find(
                (indicator) => indicator.indicator_name === indicatorName
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
        ))}
      </tbody>
    </Table>
  );
};

export default Tables;
