  Chart.defaults.global.animation = 'linear'
  var presets = window.chartColors;
  var utils = Samples.utils;
  $(document).ready(function () {
      //Ammonia
      const configNh3 = {
          type: 'line',
          data: {
              labels: [],
              datasets: [{
                  label: "Ammonia",
                  backgroundColor: utils.transparentize(presets.red),
                  borderColor: presets.red,
                  data: []
              }],
          },
          options: {
              responsive: true,
              legend: {
                  display: false
              },
              title: {
                  display: true,
                  text: 'Ammonia (NH3)'
              },
              tooltips: {
                  mode: 'index',
                  intersect: false,
              },
              hover: {
                  mode: 'nearest',
                  intersect: true
              },
              scales: {
                  xAxes: [{
                      display: true,
                      type: 'time',
                      time: {
                          round: 'minute',
                          distribution: 'linear'
                      }
                  }],
                  yAxes: [{
                      display: true,
                      ticks: {
                          min: 0,
                          max: 60
                      },
                      scaleLabel: {
                          display: true,
                          labelString: ''
                      }
                  }]
              }
          }
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
                  backgroundColor: utils.transparentize(presets.orange),
                  borderColor: presets.orange,
                  data: []
              }],
          },
          options: {
              responsive: true,
              legend: {
                  display: false
              },
              title: {
                  display: true,
                  text: 'Carbon Dioxyde (CO2)'
              },
              tooltips: {
                  mode: 'index',
                  intersect: false,
              },
              hover: {
                  mode: 'nearest',
                  intersect: true
              },
              scales: {
                  xAxes: [{
                      display: true,
                      type: 'time',
                      time: {
                          round: 'minute',
                          distribution: 'linear'
                      }
                  }],
                  yAxes: [{
                      display: true,
                      ticks: {
                          min: 500,
                          max: 3500
                      },
                      scaleLabel: {
                          display: true,
                          labelString: ''
                      }
                  }]
              }
          }
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
                  backgroundColor: presets.blue,
                  borderColor: presets.blue,
                  data: [],
                  fill: false
              },{
                  label: "Outside",
                  backgroundColor: presets.grey,
                  borderColor: presets.grey,
                  data: [],
                  fill: false
              }],
          },
          options: {
              responsive: true,
              legend: {
                  position: 'bottom'
              },
              title: {
                  display: true,
                  text: 'Temperature (C)'
              },
              tooltips: {
                  mode: 'index',
                  intersect: false,
              },
              hover: {
                  mode: 'nearest',
                  intersect: true
              },
              scales: {
                  xAxes: [{
                      display: true,
                      type: 'time',
                      time: {
                          round: 'minute',
                          distribution: 'linear'
                      }
                  }],
                  yAxes: [{
                      display: true,
                      ticks: {
                          min: 0,
                          max: 40
                      },
                      scaleLabel: {
                          display: true,
                          labelString: ''
                      }
                  }]
              }
          }
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
                  backgroundColor: presets.purple,
                  borderColor: presets.purple,
                  data: [],
                  fill: false
              },{
                  label: "Outside",
                  backgroundColor: presets.grey,
                  borderColor: presets.grey,
                  data: [],
                  fill: false
              }],
          },
          options: {
              responsive: true,
              legend: {
                  position: 'bottom'
              },
              title: {
                  display: true,
                  text: 'Humidity'
              },
              tooltips: {
                  mode: 'index',
                  intersect: false,
              },
              hover: {
                  mode: 'nearest',
                  intersect: true
              },
              scales: {
                  xAxes: [{
                      display: true,
                      type: 'time',
                      time: {
                          round: 'minute',
                          distribution: 'linear'
                      }
                  }],
                  yAxes: [{
                      display: true,
                      ticks: {
                          min: 40,
                          max: 100
                      },
                      scaleLabel: {
                          display: true,
                          labelString: ''
                      }
                  }]
              }
          }
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
                  document.getElementById('nh3-alert').className = "alert alert-dark";
                  document.getElementById('nh3-alert').innerHTML = "Ammonia data unavailable, is sensor on?";
                  break;
              case 0:
                  document.getElementById('nh3-alert').className = "alert alert-success";
                  document.getElementById('nh3-alert').innerHTML = "Ammonia level is OK";
                  break;
              case 1:
                  document.getElementById('nh3-alert').className = "alert alert-warning";
                  document.getElementById('nh3-alert').innerHTML = "Ammonia level is moderate";
                  break;
              case 2:
                  document.getElementById('nh3-alert').className = "alert alert-danger";
                  document.getElementById('nh3-alert').innerHTML = "Ammonia level is high, check it out!";
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
                  document.getElementById('co2-alert').className = "alert alert-dark";
                  document.getElementById('co2-alert').innerHTML = "CO2 data unavailable, is sensor on?";
                  break;
              case 0:
                  document.getElementById('co2-alert').className = "alert alert-success";
                  document.getElementById('co2-alert').innerHTML = "CO2 level is OK";
                  break;
              case 1:
                  document.getElementById('co2-alert').className = "alert alert-warning";
                  document.getElementById('co2-alert').innerHTML = "CO2 level is moderate";
                  break;
              case 2:
                  document.getElementById('co2-alert').className = "alert alert-danger";
                  document.getElementById('co2-alert').innerHTML = "CO2 level is high, check it out!";
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
          switch(data.status.temperature) {
              case -1:
                  document.getElementById('temperature-alert').className = "alert alert-dark";
                  document.getElementById('temperature-alert').innerHTML = "Inside temperature data unavailable, is sensor on?";
                  break;
              case 0:
                  document.getElementById('temperature-alert').className = "alert alert-success";
                  document.getElementById('temperature-alert').innerHTML = "Inside temperature is OK";
                  break;
              case 1:
                  document.getElementById('temperature-alert').className = "alert alert-warning";
                  document.getElementById('temperature-alert').innerHTML = "Inside temperature is moderate";
                  break;
              case 2:
                  document.getElementById('temperature-alert').className = "alert alert-danger";
                  document.getElementById('temperature-alert').innerHTML = "Inside temperature is high, check it out!";
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