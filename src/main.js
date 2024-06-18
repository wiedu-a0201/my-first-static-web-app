d3.csv('https://raw.githubusercontent.com/ryanchung403/dataset/main/harry_potter.csv').then(
    res => {
        console.log('Local CSV:',res);
        drawLineChart(res);
    }
);

function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
}

function drawLineChart(res) {
    x = unpack(res, 'release_year');
    y = unpack(res, 'budget');
    z = unpack(res, 'revenue');

    let trace1 = {};
    trace1.mode = 'lines+markers';
    trace1.type = 'scatter';
    trace1.name = 'Budget';
    trace1.x = [];
    trace1.y = [];
    trace1.text = unpack(res, 'title');
    trace1.marker={
        size: 10,
        color:"red"
    }
    trace1.textposition = 'center right';
    trace1.textfont = {
        family:  'Raleway, sans-serif',
        size: 15,
        color: 'red'
    };

    // 
    for (let i = 0; i < x.length; i++) {
        trace1.x.push(x[i]);
        trace1.y.push(y[i]);
        //trace1.text.push('budget');
    }

    let trace2 = {
        mode : 'lines+markers',
        type : 'scatter',
        name : 'Revenue',
        x : unpack(res, 'release_year'),
        y : unpack(res, 'revenue'),
        text : unpack(res, 'title')
    };

    // for (let i = 0; i < x.length; i++) {
    //     trace2.x.push(x[i]);
    //     trace2.y.push(z[i]);
    //     trace2.text.push('revenue');
    // }
    
    let data = [];
    data.push(trace1);
    data.push(trace2);

    let layout = {
        margin: { t: 50 },
        xaxis: { 
            //range:[0,6],
            title: 'X 軸'
        },
        yaxis: { 
            //range:[0,25],
            title: 'y 軸'
        },
        title:'Harry Potter Movies'
    };

    Plotly.newPlot('myGraph', data, layout);
}