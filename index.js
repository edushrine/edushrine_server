const express = require("express");
const connectDB = require("./config/db");
const dotenv =  require('dotenv')
const morgan = require('morgan');
const cors = require('cors')
const cookieSession = require('cookie-session');
const path = require('path')
const admin = require('./server/router/admin')
const blog = require('./server/router/blog')
const banner = require('./server/router/banner')
const user = require('./server/router/user')
const news = require('./server/router/news')
const student = require('./server/router/student')
const teacher = require('./server/router/teacher')
const course = require('./server/router/course')
const testimonial= require('./server/router/testinomial')
const crm = require('./server/router/crm')
const location = require('./server/router/location')
const result = require('./server/router/result')
const campus = require('./server/router/campus')
const branch = require('./server/router/branch')
const PTB = require('./server/router/PTB')
const PTE = require('./server/router/PTE')
const GTB = require('./server/router/GTB')
const GTE = require('./server/router/GTE')
const MobileBanner = require('./server/router/mobileBanner')
const contactUs = require('./server/router/contact')
const marketingManager = require('./server/router/marketingManager')
const broadcast = require('./server/router/broadcast')
 
 


dotenv.config();
connectDB();
const app = express();
app.use(express.json()); 
app.use(cors())



if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }
app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[process.env.COOKEY_KEY] 
   }))

    app.use('/static', express.static(path.join(__dirname, './server/uploads')))

    app.use('/api',admin)
    app.use('/api',banner)
    app.use('/api',blog)
    app.use('/api',user)
    app.use('/api',news)
    app.use('/api',student)
    app.use('/api',teacher)
    app.use('/api',course)
    app.use('/api',testimonial)
    app.use('/api',crm)
    app.use('/api',result)
    app.use('/api',campus)
    app.use('/api',branch)
    app.use('/api',PTB)
    app.use('/api',PTE)
    app.use('/api',GTE)
    app.use('/api',GTB)
    app.use('/api',location)
    app.use('/api',MobileBanner)
    app.use('/api',contactUs)
    app.use('/api',marketingManager)
    app.use('/api',broadcast)




    
   

  const PORT = process.env.PORT||5000;

  const server = app.listen(PORT,
  console.log(`Server running on PORT ${PORT}...`)
);

const io = require('./socket').init(server);

io.on('connection', socket =>{



  socket.emit("message", {msg:"welcome to chat bot"})

//   socket.on('message', (data)=>{
        
//             io.emit(data.orderid, data)
//  }) 

//  socket.on('vendormsg', (data)=>{
 
//       io.emit(data.orderid, data)
// })

})

// }).catch(err=>console.log(err)) 


// }