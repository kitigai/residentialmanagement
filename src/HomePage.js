import React, { useState, useEffect } from "react";
import Api from "./AjaxHelper";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import CustomToast from "./CustomToast";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

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
const makeSummaryChart = (setChartData, setSummaryChartData) => {
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
  api.getApartments(query).then((res) => {
    const summed = Array.apply(null, Array(span)).map((i) => 0);
    datasets.datasets = res.data.map((apartment, idx) => {
      // culcrate summary
      apartment.transferSummary.forEach((element, idx) => {
        summed[idx] += element;
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
    setSummaryChartData(summarydatasets);
    setChartData(datasets);
  });
};
const CustomLineChart = ({ data }) => {
  return (
    <MDBContainer>
      <Line data={data} options={{ responsive: true }} />
    </MDBContainer>
  );
};
const HomePage = () => {
  const [chartData, setChartData] = useState({});
  const [summaryData, setSummaryData] = useState({});
  useEffect(() => {
    makeSummaryChart(setChartData, setSummaryData);
  }, []);
  return (
    <CardDeck>
      <Card className="col-sm-9 m-2">
        <Card.Body>
          <CustomLineChart data={chartData} />
        </Card.Body>
      </Card>
      <Card className="col-sm-9 m-2">
        <Card.Body>
          <CustomLineChart data={summaryData} />
        </Card.Body>
      </Card>
    </CardDeck>
  );
};

export default HomePage;
