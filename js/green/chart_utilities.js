function chartThat(data, _canvas) {

  var canvas = _canvas;
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.innerHTML = '';
  var config = {
    type: 'line',
    data: {
      datasets: constructChartDatasetsFromData(data)
    },
    options: {
      responsive: true,
      title: {
        display: true,
        // text: 'Overview'
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
          type: 'time',

          distribution: 'linear',
          parser: 'string',
          bounds: 'data',
          display: true,
          scaleLabel: {
            display: false,
            labelString: 'Date'
          },
          ticks: {
            source: 'auto',
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'value'
          }
        }]
      }
    }
  };
  return new Chart(ctx, config);
}

let constructChartLabelsFromData = function(data) {
  let stats = JSON.parse(data);
  let statsKey = Object.keys(stats);
  let labels = [];
  for (var i = 0; i < statsKey.length; i++) {
    let key = statsKey[i]
    // console.log('key:', key)
    labels.push(stats.time_infos)
  }
  return labels;
}
let constructChartDatasetsFromData = function(data) {
  console.log(JSON.parse(data))
  let stats = JSON.parse(data);
  let statsKey = Object.keys(stats)
  // console.log('statsKey', statsKey)
  let datasets = [];
  for (var i = 0; i < statsKey.length; i++) {
    let key = statsKey[i]
    // console.log('key:', key)
    if (key === "time_infos") continue;
    // console.log('chartColors', chartColors)
    let dataset = {};
    dataset.label = key;
    dataset.backgroundColor = window.chartColors[Object.keys(window.chartColors)[i]];
    dataset.borderColor = window.chartColors[Object.keys(window.chartColors)[i]];
    dataset.data = [];
    for (var j = 0; j < stats[key].length; j++) {
      dataset.data.push({
        x: stats["time_infos"][j],
        y: stats[key][j]
      })
    };
    dataset.fill = false;
    datasets.push(dataset);
  }
  // console.log("datasets", datasets)
  return datasets
}
