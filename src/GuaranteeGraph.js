import React from "react";
import "./styles.scss";

import "bootstrap/dist/css/bootstrap.min.css";

import { HorizontalBar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

import Api from "./AjaxHelper";

class GuaranteeGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataHorizontal: {}
    };
  }

  componentDidMount() {
    const backGroundColor = "rgba(98,  182, 239,0.4)";
    const borderColor = "rgb(98,  182, 239)";
    const api = new Api();
    const query = { params: { billing: true } };
    api
      .getResidents(query)
      .then((result) => {
        const dataHorizontal = {
          labels: [""],
          datasets: [
            {
              label: [],
              data: [12, 1],
              fill: false,
              backgroundColor: ["rgba(0, 0,0,0.0)"],
              borderColor: ["rgba(0, 0,0,0.0)"],
              borderWidth: 0
            }
          ]
        };
        result.data.forEach((c) => {
          const dates = new Date(c.transferSatisfiedMonth);
          const month = dates.getMonth() + 1;
          dataHorizontal.labels.push(c.fullName);
          dataHorizontal.datasets[0].data.push(month);
          dataHorizontal.datasets[0].backgroundColor.push(backGroundColor);
          dataHorizontal.datasets[0].borderColor.push(borderColor);
        });

        this.setState({ dataHorizontal: dataHorizontal });
      })
      .catch((error) => {});
  }
  render() {
    return (
      <MDBContainer>
        <HorizontalBar
          data={this.state.dataHorizontal}
          options={{ responsive: true }}
        />
      </MDBContainer>
    );
  }
}

export default GuaranteeGraph;
