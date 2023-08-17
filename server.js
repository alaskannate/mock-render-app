const express = require('express')
const { spawn } = require('child_process')
const app = express()
const port = 3000


// sorce to child_process article... https://medium.com/swlh/run-python-script-from-node-js-and-send-data-to-browser-15677fcf199f
app.get('/', (req, res) => {
  let dataToSend
  let largeDataSet = []
  // spawn new child process to call the python script
  const python = spawn('python3', ['script3.py', 'node.js', 'python'])

  // collect data from script
  python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...')
    //dataToSend =  data;
    largeDataSet.push(data)
  })

  // in close event we are sure that stream is from child process is closed
  python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`)
    // send data to browser
    res.send(largeDataSet.join(''))
  })
})

app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})