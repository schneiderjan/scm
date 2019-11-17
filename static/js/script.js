// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';
$(document).ready(function () {
  var chartOptions = function(sMin, sMax, showLegend) {
      return {
          responsive: true,
          animation: false,
          showTooltips: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              left: 10,
              right: 25,
              top: 25,
              bottom: 0
            }
          },
          legend: {
              display: showLegend,
              position: 'bottom'
          },
          tooltips: {
              backgroundColor: "rgb(255,255,255)",
              bodyFontColor: "#858796",
              titleMarginBottom: 10,
              titleFontColor: '#6e707e',
              titleFontSize: 14,
              borderColor: '#dddfeb',
              borderWidth: 1,
              xPadding: 15,
              yPadding: 15,
              displayColors: false,
              intersect: false,
              mode: 'index',
              caretPadding: 10
          },
          scales: {
              xAxes: [{
                  display: true,
                  type: 'time',
                  time: {
                      round: 'minute',
                      distribution: 'linear'
                  },
                  gridLines: {
                    display: false,
                    drawBorder: false
                  }
              }],
              yAxes: [{
                  display: true,
                  ticks: {
                      maxTicksLimit: 5,
                      padding: 10,
                      suggestedMin: sMin,
                      suggestedMax: sMax
                  },
                  gridLines: {
                    color: "rgb(234, 236, 244)",
                    zeroLineColor: "rgb(234, 236, 244)",
                    drawBorder: false,
                    borderDash: [2],
                    zeroLineBorderDash: [2]
                  }
              }]
          }
      };
  }

  //Ammonia
  const configNh3 = {
      type: 'line',
      data: {
          labels: [],
          datasets: [{
              label: "Ammonia",
              lineTension: 0.3,
              backgroundColor: "rgba(78, 115, 223, 0.05)",
              borderColor: "rgba(78, 115, 223, 1)",
              pointRadius: 3,
              pointBackgroundColor: "rgba(78, 115, 223, 1)",
              pointBorderColor: "rgba(78, 115, 223, 1)",
              pointHoverRadius: 3,
              pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
              pointHoverBorderColor: "rgba(78, 115, 223, 1)",
              pointHitRadius: 10,
              pointBorderWidth: 2,
              data: []
          }],
      },
      options: chartOptions(0, 50, false)
  };
  const contextNh3 = document.getElementById('canvas-nh3').getContext('2d');
  const lineChartNh3 = new Chart(contextNh3, configNh3);

  //CO2
  const configCo2 = {
      type: 'line',
      data: {
          labels: [],
          datasets: [{
              label: "Carbon Dioxyde",
              lineTension: 0.3,
              backgroundColor: "rgba(54, 185, 204, 0.05)",
              borderColor: "rgba(54, 185, 204, 1)",
              pointRadius: 3,
              pointBackgroundColor: "rgba(54, 185, 204, 1)",
              pointBorderColor: "rgba(54, 185, 204, 1)",
              pointHoverRadius: 3,
              pointHoverBackgroundColor: "rgba(54, 185, 204, 1)",
              pointHoverBorderColor: "rgba(54, 185, 204, 1)",
              pointHitRadius: 10,
              pointBorderWidth: 2,
              data: []
          }],
      },
      options: chartOptions(1000, 3000, false)
  };
  const contextCo2 = document.getElementById('canvas-co2').getContext('2d');
  const lineChartCo2 = new Chart(contextCo2, configCo2);

  //Temperature
  const configTemperature = {
      type: 'line',
      data: {
          labels: [],
          datasets: [{
              label: "Inside",
              lineTension: 0.3,
              backgroundColor: "rgba(43, 179, 216, 1)",
              borderColor: "rgba(43, 179, 216, 0.5)",
              pointRadius: 3,
              pointBackgroundColor: "rgba(43, 179, 216, 1)",
              pointBorderColor: "rgba(43, 179, 216, 1)",
              pointHoverRadius: 3,
              pointHoverBackgroundColor: "rgba(43, 179, 216, 1)",
              pointHoverBorderColor: "rgba(43, 179, 216, 1)",
              pointHitRadius: 10,
              pointBorderWidth: 2,
              data: [],
              fill: false
          },{
              label: "Outside",
              backgroundColor: "rgba(93, 115, 126, 0.05)",
              borderColor: "rgba(93, 115, 126, 0.5)",
              pointRadius: 3,
              pointBackgroundColor: "rgba(93, 115, 126, 0.5)",
              pointBorderColor: "rgba(93, 115, 126, 0.5)",
              pointHoverRadius: 3,
              pointHoverBackgroundColor: "rgba(93, 115, 126, 0.5)",
              pointHoverBorderColor: "rgba(93, 115, 126, 0.5)",
              pointHitRadius: 10,
              pointBorderWidth: 2,
              data: [],
              fill: false
          }],
      },
      options: chartOptions(0, 40, true)
  };
  const contextTemperature = document.getElementById('canvas-temperature').getContext('2d');
  const lineChartTemperature = new Chart(contextTemperature, configTemperature);

  //Humidity
  const configHumidity = {
      type: 'line',
      data: {
          labels: [],
          datasets: [{
              label: "Inside",
              backgroundColor: "rgba(62, 130, 247, 1)",
              borderColor: "rgba(62, 130, 247, 0.5)",
              pointRadius: 3,
              pointBackgroundColor: "rgba(62, 130, 247, 1)",
              pointBorderColor: "rgba(62, 130, 247, 1)",
              pointHoverRadius: 3,
              pointHoverBackgroundColor: "rgba(62, 130, 247, 1)",
              pointHoverBorderColor: "rgba(62, 130, 247, 1)",
              pointHitRadius: 10,
              pointBorderWidth: 2,
              data: [],
              fill: false
          },{
              label: "Outside",
              backgroundColor: "rgba(93, 115, 126, 0.05)",
              borderColor: "rgba(93, 115, 126, 0.5)",
              pointRadius: 3,
              pointBackgroundColor: "rgba(93, 115, 126, 1)",
              pointBorderColor: "rgba(93, 115, 126, 0.5)",
              pointHoverRadius: 3,
              pointHoverBackgroundColor: "rgba(93, 115, 126, 0.5)",
              pointHoverBorderColor: "rgba(93, 115, 126, 0.5)",
              pointHitRadius: 10,
              pointBorderWidth: 2,
              data: [],
              fill: false
          }],
      },
      options: chartOptions(40, 100, true)
  };
  const contextHumidity = document.getElementById('canvas-humidity').getContext('2d');
  const lineChartHumidity = new Chart(contextHumidity, configHumidity);

  //Handle sensor data
  const source = new EventSource("/chart-data");

  source.onmessage = function (event) {
      const data = JSON.parse(event.data);

      //Ammonia
      if (configNh3.data.labels.length === 20) {
          configNh3.data.labels.shift();
          configNh3.data.datasets[0].data.shift();
      }
      configNh3.data.labels.push(new Date(data.time));
      configNh3.data.datasets[0].data.push(data.sensor_data.nh3);
      switch(data.status.nh3) {
          case -1:
          case 0:
              if ($("#cardAmmonia").hasClass("border-all-warning")) {
                $("#cardAmmonia").removeClass("border-all-warning");
              }
              if ($("#cardAmmonia").hasClass("border-all-danger")) {
                $("#cardAmmonia").removeClass("border-all-danger");
              }
              if (!$("#cardTitleAmmonia").hasClass("text-primary")) {
                $("#cardAmmonia").addClass("text-primary");
              }
              if ($("#cardTitleAmmonia").hasClass("text-warning")) {
                $("#cardTitleAmmonia").removeClass("text-warning");
              }
              if ($("#cardTitleAmmonia").hasClass("text-danger")) {
                $("#cardAmmonia").removeClass("text-danger");
              }
              break;
          case 1:
              if (!$("#cardAmmonia").hasClass("border-all-warning")) {
                $("#cardAmmonia").addClass("border-all-warning");
              }
              if ($("#cardAmmonia").hasClass("border-all-danger")) {
                $("#cardAmmonia").removeClass("border-all-danger");
              }
              if (!$("#cardTitleAmmonia").hasClass("text-warning")) {
                $("#cardTitleAmmonia").addClass("text-warning");
              }
              if ($("#cardTitleAmmonia").hasClass("text-primary")) {
                $("#cardTitleAmmonia").removeClass("text-primary");
              }
              if ($("#cardTitleAmmonia").hasClass("text-danger")) {
                $("#cardTitleAmmonia").removeClass("text-danger");
              }
              break;
          case 2:
              if ($("#cardAmmonia").hasClass("border-all-warning")) {
                $("#cardAmmonia").removeClass("border-all-warning");
              }
              if (!$("#cardAmmonia").hasClass("border-all-danger")) {
                $("#cardAmmonia").addClass("border-all-danger");
              }
              if (!$("#cardTitleAmmonia").hasClass("text-danger")) {
                $("#cardTitleAmmonia").addClass("text-danger");
              }
              if ($("#cardTitleAmmonia").hasClass("text-primary")) {
                $("#cardTitleAmmonia").removeClass("text-primary");
              }
              if ($("#cardTitleAmmonia").hasClass("text-warning")) {
                $("#cardTitleAmmonia").removeClass("text-warning");
              }
              break;
      }

      //Carbon Dioxyde
      if (configCo2.data.labels.length === 20) {
          configCo2.data.labels.shift();
          configCo2.data.datasets[0].data.shift();
      }
      configCo2.data.labels.push(new Date(data.time));
      configCo2.data.datasets[0].data.push(data.sensor_data.co2);
      switch(data.status.co2) {
          case -1:
          case 0:
              if ($("#cardCo2").hasClass("border-all-warning")) {
                $("#cardCo2").removeClass("border-all-warning");
              }
              if ($("#cardCo2").hasClass("border-all-danger")) {
                $("#cardCo2").removeClass("border-all-danger");
              }
              if (!$("#cardTitleCo2").hasClass("text-primary")) {
                $("#cardCo2").addClass("text-primary");
              }
              if ($("#cardTitleCo2").hasClass("text-warning")) {
                $("#cardTitleCo2").removeClass("text-warning");
              }
              if ($("#cardTitleCo2").hasClass("text-danger")) {
                $("#cardCo2").removeClass("text-danger");
              }
              break;
          case 1:
              if (!$("#cardCo2").hasClass("border-all-warning")) {
                $("#cardCo2").addClass("border-all-warning");
              }
              if ($("#cardCo2").hasClass("border-all-danger")) {
                $("#cardCo2").removeClass("border-all-danger");
              }
              if (!$("#cardTitleCo2").hasClass("text-warning")) {
                $("#cardTitleCo2").addClass("text-warning");
              }
              if ($("#cardTitleCo2").hasClass("text-primary")) {
                $("#cardTitleCo2").removeClass("text-primary");
              }
              if ($("#cardTitleCo2").hasClass("text-danger")) {
                $("#cardTitleCo2").removeClass("text-danger");
              }
              break;
          case 2:
              if ($("#cardCo2").hasClass("border-all-warning")) {
                $("#cardCo2").removeClass("border-all-warning");
              }
              if (!$("#cardCo2").hasClass("border-all-danger")) {
                $("#cardCo2").addClass("border-all-danger");
              }
              if (!$("#cardTitleCo2").hasClass("text-danger")) {
                $("#cardTitleCo2").addClass("text-danger");
              }
              if ($("#cardTitleCo2").hasClass("text-primary")) {
                $("#cardTitleCo2").removeClass("text-primary");
              }
              if ($("#cardTitleCo2").hasClass("text-warning")) {
                $("#cardTitleCo2").removeClass("text-warning");
              }
              break;
      }

      //Temperature
      if (configTemperature.data.labels.length === 20) {
          configTemperature.data.labels.shift();
          configTemperature.data.datasets[0].data.shift();
          configTemperature.data.datasets[1].data.shift();
      }
      configTemperature.data.labels.push(new Date(data.time));
      configTemperature.data.datasets[0].data.push(data.sensor_data.in_temp);
      configTemperature.data.datasets[1].data.push(data.sensor_data.out_temp);
      switch(data.status.in_temp) {
          case -1:
          case 0:
              if ($("#cardTemperature").hasClass("border-all-warning")) {
                $("#cardTemperature").removeClass("border-all-warning");
              }
              if ($("#cardTemperature").hasClass("border-all-danger")) {
                $("#cardTemperature").removeClass("border-all-danger");
              }
              if (!$("#cardTitleTemperature").hasClass("text-primary")) {
                $("#cardTemperature").addClass("text-primary");
              }
              if ($("#cardTitleTemperature").hasClass("text-warning")) {
                $("#cardTitleTemperature").removeClass("text-warning");
              }
              if ($("#cardTitleTemperature").hasClass("text-danger")) {
                $("#cardTemperature").removeClass("text-danger");
              }
              break;
          case 1:
              if (!$("#cardTemperature").hasClass("border-all-warning")) {
                $("#cardTemperature").addClass("border-all-warning");
              }
              if ($("#cardTemperature").hasClass("border-all-danger")) {
                $("#cardTemperature").removeClass("border-all-danger");
              }
              if (!$("#cardTitleTemperature").hasClass("text-warning")) {
                $("#cardTitleTemperature").addClass("text-warning");
              }
              if ($("#cardTitleTemperature").hasClass("text-primary")) {
                $("#cardTitleTemperature").removeClass("text-primary");
              }
              if ($("#cardTitleTemperature").hasClass("text-danger")) {
                $("#cardTitleTemperature").removeClass("text-danger");
              }
              break;
          case 2:
              if ($("#cardTemperature").hasClass("border-all-warning")) {
                $("#cardTemperature").removeClass("border-all-warning");
              }
              if (!$("#cardTemperature").hasClass("border-all-danger")) {
                $("#cardTemperature").addClass("border-all-danger");
              }
              if (!$("#cardTitleTemperature").hasClass("text-danger")) {
                $("#cardTitleTemperature").addClass("text-danger");
              }
              if ($("#cardTitleTemperature").hasClass("text-primary")) {
                $("#cardTitleTemperature").removeClass("text-primary");
              }
              if ($("#cardTitleTemperature").hasClass("text-warning")) {
                $("#cardTitleTemperature").removeClass("text-warning");
              }
              break;
      }

      //Humidity
      if (configHumidity.data.labels.length === 20) {
          configHumidity.data.labels.shift();
          configHumidity.data.datasets[0].data.shift();
          configHumidity.data.datasets[1].data.shift();
      }
      configHumidity.data.labels.push(new Date(data.time));
      configHumidity.data.datasets[0].data.push(data.sensor_data.in_humidity);
      configHumidity.data.datasets[1].data.push(data.sensor_data.out_humidity);

      //update all charts
      lineChartNh3.update();
      lineChartCo2.update();
      lineChartTemperature.update();
      lineChartHumidity.update();
  }

});
