const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const sequelize = new Sequelize('vueserver', 'postgres', '123456789', {
  host: 'localhost',
  dialect: 'postgres',
});

const User = sequelize.define('user', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Error creating database tables:', err);
  });

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });

    res.status(200).json({ message: 'Kullanıcı kaydı başarılı', user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Geçersiz şifre' });
    }

    req.session.user = {
      id: user.id,
      username: user.username,
    };

    res.status(200).json({ message: 'Başarıyla giriş yapıldı', user, redirect: '/' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const checkAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ message: 'Yetkisiz erişim: Giriş yapmalısınız' });
  }
};

app.get('/reportissue', checkAuthenticated, (req, res) => {
  res.status(200).json({ message: 'Rapor sayfasına erişim izni var' });
});

app.get('/tickets', checkAuthenticated, (req, res) => {
  res.status(200).json({ message: 'Bilet sayfasına erişim izni var' });
});



app.get('/', checkAuthenticated, (req, res) => {
  if (req.session.user) {
    res.status(200).json({ username: req.session.user.username });
  } else {
    res.status(401).json({ message: 'Oturum açılmamış' });
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(500).json({ error: 'Oturum kapatılamadı' });
    } else {
      res.clearCookie('connect.sid');
      res.status(200).json({ message: 'Oturum kapatıldı' });
    }
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
