import Chart from 'chart.js'

class Graph{
  private chart: Chart;
  private values?: number[];
  private labels?: number[];

  constructor(public context){
    this.chart = new Chart(this.context, this.configuration)
    this.values = []
    this.labels = []
  }

  private get configuration(){
    return {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Notes',
          data: this.values
        }]
      }
    }
  }

  addPoint(x: number, y: number): void{
    this.chart.data.labels.push(x)
    this.chart.data.datasets[0].data.push(y)
    this.chart.update()
  }
}

export default Graph