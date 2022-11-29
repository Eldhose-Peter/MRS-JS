const express = require('express')
const app = express()

const PORT = 3001

//middleware for request logger
const requestLogger = (req,res,next)=>{
    console.log('Method:',req.method)
    console.log('Path:',req.path)
    console.log('Body:',req.body)
    console.log('-----')
    next()
}

app.use(requestLogger)

app.get('/',(req,res)=>{
    res.send('<h1>Hello World!</h1>')
});




app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
