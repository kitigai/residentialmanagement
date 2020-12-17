import React, { useState, useEffect } from "react";
import Api from "./AjaxHelper";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import "./styles.scss";

const colorTableRGBA = [
  "rgba(255, 134,159,0.4)",
  "rgba(98,  182, 239,0.4)",
  "rgba(255, 218, 128,0.4)",
  "rgba(113, 205, 205,0.4)",
  "rgba(170, 128, 252,0.4)",
  "rgba(255, 177, 101,0.4)"
];
const colorTableRGB = [
  "rgb(255, 134,159)",
  "rgb(98,  182, 239)",
  "rgb(255, 218, 128)",
  "rgb(113, 205, 205)",
  "rgb(170, 128, 252",
  "rgb(255, 177, 101)"
];
const makeSummaryChart = (
  setChartData,
  setSummaryChartData,
  setIncomes,
  setApartmentData
) => {
  const api = new Api();
  const today = new Date();
  const month = today.getMonth() + 1; //Becourse fucking zero padding
  const year = today.getFullYear();
  const span = 12;
  const delta = [];
  const query = {
    params: { startMonth: month, startYear: year, span: span }
  };
  for (var i = span - 1; i >= 0; i--) {
    const deltaday = new Date();
    deltaday.setMonth(deltaday.getMonth() - i);
    delta.push(deltaday.getMonth() + 1);
  }
  let datasets = {
    labels: delta,
    datasets: []
  };
  let summarydatasets = JSON.parse(JSON.stringify(datasets));
  let incomes = [];
  api.getApartments(query).then((res) => {
    setApartmentData(res.data);
    const summed = Array.apply(null, Array(span)).map((i) => 0);
    datasets.datasets = res.data.map((apartment, idx) => {
      // culclate total summary dataset
      apartment.transferSummary.forEach((element, idx) => {
        summed[idx] += element;
      });
      // calculate income summary
      incomes.push({
        name: apartment.name,
        thisMonth:
          apartment.transferSummary[apartment.transferSummary.length - 1],
        lastMonth:
          apartment.transferSummary[apartment.transferSummary.length - 2]
      });
      const r = Math.random() * 256;
      const g = Math.random() * 256;
      const b = Math.random() * 256;
      let colorRGB = "";
      let colorRGBA = "";
      if (idx < colorTableRGB.length) {
        colorRGB = colorTableRGB[idx];
        colorRGBA = colorTableRGBA[idx];
      } else {
        colorRGB = "rgb(" + r + "," + g + "," + b + ")";
        colorRGBA = "rgba(" + r + "," + g + "," + b + ", .3)";
      }
      return {
        label: apartment.name,
        fill: true,
        lineTension: 0.3,
        backgroundColor: colorRGBA,
        borderColor: colorRGB,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(205, 130,1 58)",
        pointBackgroundColor: "rgb(255, 255, 255)",
        pointBorderWidth: 10,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(0, 0, 0)",
        pointHoverBorderColor: "rgba(220, 220, 220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: apartment.transferSummary
      };
    });
    incomes.push({
      name: "合計",
      thisMonth: summed[summed.length - 1],
      lastMonth: summed[summed.length - 2]
    });
    summarydatasets.datasets.push({
      label: "summary",
      fill: true,
      lineTension: 0.3,
      backgroundColor: "rgba(184, 185, 210, .3)",
      borderColor: "rgb(35, 26, 136)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgb(205, 130,1 58)",
      pointBackgroundColor: "rgb(255, 255, 255)",
      pointBorderWidth: 10,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgb(0, 0, 0)",
      pointHoverBorderColor: "rgba(220, 220, 220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: summed
    });
    setIncomes(incomes);
    setSummaryChartData(summarydatasets);
    setChartData(datasets);
  });
};
const CustomTable = ({ data }) => {
  const row = data.map((d) => {
    return (
      <tr key={d.id}>
        <td>
          <Link to={"/apartment?id=" + d.id}>{d.name}</Link>
        </td>
      </tr>
    );
  });
  return (
    <div className="fixed-table">
      <Table hover>
        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>
        <tbody>{row}</tbody>
      </Table>
    </div>
  );
};
const CustomLineChart = ({ data }) => {
  return (
    <MDBContainer>
      <Line data={data} options={{ responsive: true }} />
    </MDBContainer>
  );
};
const CustomSummary = ({ target, data }) => {
  let title = target === "thisMonth" ? "今月収入" : "先月収入";
  const targetdata = data.map((d, idx) => {
    return (
      <div className="d-flex justify-content-between" key={idx}>
        <p>{d.name}</p>
        <p className="text-secondary ">{"¥" + d[target].toLocaleString()}</p>
      </div>
    );
  });
  return (
    <>
      <h5>{title}</h5>
      <div className="border-bottom mt-3">
        {targetdata.slice(0, targetdata.length - 1)}
      </div>
      <div>{targetdata.slice(-1)[0]}</div>
    </>
  );
};
const HomePage = () => {
  const { user } = useAuth0();
  console.log(user);
  const [chartData, setChartData] = useState({});
  const [summaryData, setSummaryData] = useState({});
  const [incomes, setIncomes] = useState([
    { name: "test", thisMonth: 999, lastMonth: 999 }
  ]);
  const [apartmentData, setApartmentData] = useState([]);
  useEffect(() => {
    makeSummaryChart(
      setChartData,
      setSummaryData,
      setIncomes,
      setApartmentData
    );
  }, []);
  return (
    <>
      <CardDeck>
        <Card className="col-sm-6 m-2">
          <Card.Body>
            <Card.Title>
              <h5>物件別売上</h5>
            </Card.Title>
            <CustomLineChart data={chartData} />
          </Card.Body>
        </Card>
        <Card className="col-sm-6 m-2">
          <Card.Body>
            <Card.Title>
              <h5>合計売上</h5>
            </Card.Title>
            <CustomLineChart data={summaryData} />
          </Card.Body>
        </Card>
      </CardDeck>
      <CardDeck>
        <Card className="col-sm-6 m-2">
          <Card.Body>
            {" "}
            <CustomSummary target="thisMonth" data={incomes} />
          </Card.Body>
        </Card>
        <Card className="col-sm-6 m-2">
          <Card.Body>
            <CustomSummary target="lastMonth" data={incomes} />
          </Card.Body>
        </Card>
      </CardDeck>
      <CardDeck>
        <Card className="col-sm-6 m-2">
          <Card.Body>
            <Card.Title className="mb-3 d-flex flex-row">
              <h5 className="col-sm-11">物件一覧</h5>
              <Button variant="light" className="float-right">
                <Link to="/apartment" className="link">
                  <FaPlus />
                </Link>
              </Button>
            </Card.Title>
            <CustomTable data={apartmentData} />
          </Card.Body>
        </Card>
      </CardDeck>
    </>
  );
};

export default HomePage;
