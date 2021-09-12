const express = require(`express`)
const path = require(`path`)
const app = express()
const appPort = 3000

app.use(express.static(`${__dirname}/demo`, { extensions: [`html`] }))
app.use(`/src`, express.static(path.join(`${__dirname}/../src/`)))
app.use(`/`, express.static(path.join(__dirname, `/`)))

app.listen(appPort, () => {
  console.log(`Server started at localhost:${appPort}`)
})
