import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

export default class PulseLine extends React.Component {
    render() {
        const data = {
            labels: this.props.data_x,
            datasets: [
                {
                    label: 'Average Pulse',
                    fill: false,
                    lineTension: 0.4,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 3,
                    pointHoverRadius: 10,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 5,
                    pointHitRadius: 10,
                    data: this.props.data_y
                }
            ]
        };

        return (
            <div>
                <h2>Average Pulse over Time</h2>
                <Line ref="chart"
                    data={data}
                    width={800}
                    height={400}
                    options={{
                        responsive: true,
                        legend: {
                            display: false
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }],
                            xAxes: [{
                                type: 'time',
                                // time: {
                                //     unit: 'minute'
                                // }
                            }]
                        }
                    }}
                />
            </div>
        );
    }

    componentDidMount() {
        const { datasets } = this.refs.chart.chartInstance.data
        console.log(datasets[0].data);
    }
}