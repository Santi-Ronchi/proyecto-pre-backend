const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const passport = require('passport');
const dotenv = require('dotenv').config();
const LocalStrategy = require('passport-local').Strategy;
const User = require('./container/userCont');
const user = new User();
const Cart = require('./container/cartCont');
const cart = new Cart();
const { isValidPassword , createHash } = require('./funciones/funcBcrypt');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const config = require('./config');

/* SERVER */
if (config.MODO == 'CLUSTER' && cluster.isPrimary){
    console.log(`Master ${process.pid} is running`)
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork()
    }
    cluster.on('exit', (worker) => {
      cluster.fork()
      console.log(`worker ${worker.process.pid} died`)
    })
    
} else {

/* APP */
  const app = express() 
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

/* SESSION */
  app.use(cookieParser())
  app.use(
    session({
      secret: "1234567890!@#$%^&*()",
      cookie:{
        httpOnly: false,
        secure:false,
        maxAge: 700000
      },
      rolling:true,
      resave: true,
      saveUninitialized: false,
    })
  )



/* PASSPORT */
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(
    'register',
    new LocalStrategy(
      { passReqToCallback: true },
      async (req, username, password, done) => {
        const existe = await user.buscarUsuario(username)
        if (existe) {
          return done(null, false)
        } else {
          const userCart = await cart.createCart();
          console.log(userCart);
          const usuarioExistente = {nombre: req.body.nombre, email: username, password: createHash(password),direccion: req.body.direccion, edad: req.body.edad, telefono: req.body.telefono , foto: req.body.foto, cartID: userCart}
          const data = await user.createUsuario(usuarioExistente)
          done(null, { email: data.email })
        }
      }
    )
  )

  passport.use(
    'login',
    new LocalStrategy( async (username, password, done) => {
      const existe = await user.buscarUsuario(username)
      if (!existe) {
        return done(null, false)
      }

      if (!isValidPassword(existe, password)){
        return done(null, false)
      } 
      return done(null, {nombre:existe.nombre,email:existe.email})
    })
  )

  passport.serializeUser((user, done) => {
    done(null, user.email)
  })

  passport.deserializeUser(async (email, done) => {
    const usuarioDz = await user.buscarUsuario(email)
    done(null, usuarioDz)
  })

  /* PLANTILLAS */
  app.set('views', './src/views')

  app.engine(
    '.hbs',
    hbs.engine({
      defaultLayout: 'main',
      layoutsDir: './src/views/layouts',
      partialsDir: './src/views/partials',
      extname: '.hbs',
    })
  )
  app.set('view engine', '.hbs')

  /* ROUTERS */
  const loginRouter = require('./routes/login')
  const homeRouter = require('./routes/home')
  const infoRouter = require('./routes/info')
  const randomsRouter = require('./routes/randoms')
  const cartRouter = require('./routes/routeCart')

  app.use('/api', loginRouter);
  app.use('/api/home', homeRouter);
  app.use('/info', infoRouter);
  app.use('/api/randoms', randomsRouter);
  app.use('/api/cart', cartRouter)

  app.use('/',(req, res) => {
    try {
        res.redirect('/api/login')
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  })

  /* PORT */
  app.listen(config.PORT, () => {
    console.log(`servidor levantado en  en PORT:${config.PORT} y numero de processo:${numCPUs}`)
  })
}



