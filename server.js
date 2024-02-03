const express = require('express')
const app = express()

app.use(express.static(__dirname + "/dist/ps-angular"))

app.get("/**", (req, res) => {
  res.sendFile(__dirname + "/dist/ps-angular/index.html")
})

const port = process.env.PORT || 4200

app.listen(port, () => {
  console.log("Iniciou na porta: " + port)
})
