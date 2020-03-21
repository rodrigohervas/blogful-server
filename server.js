const app = require('./src/app')
const { PORT } = require('./src/config')

//start HTTP server listening for connections at specified port
app.listen(PORT, () => {
    console.log(`Server listening at port: ${PORT}`)
})
