const fs = require('fs');
const bcrypt = require('bcrypt');
const usersFile = './secure_data/users.json';

const jwt = require('jsonwebtoken');

function loadUsers() {
  return JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
}

function saveUsers(users){
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

async function registerUser(username, password) {
  const users = loadUsers();

  const existing = users.find(u => u.username === username);
  if (existing) throw new Error('User already exists');

  const hash = await bcrypt.hash(password, 10); // 10 is cost factor
  users.push({ username, passwordHash: hash });

  saveUsers(users);
  console.log('User registered.');
}

async function authenticateUser(username, password) {
  const users = loadUsers();
  const user = users.find(u => u.username === username);
  if(!user){
    throw new Error('User not found');
  }
  
  const isValid = await bcrypt.compare(password, user.passwordHash);
  if(!isValid){
    throw new Error('Invalid password');
  }
  console.log('User authenticated!');
  return true;
}



async function retrieveAuthToken(){
    const token = jwt.sign(
        { userId: user.id, username: user.username }, 
          process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
}

res.json({ token });

async function getSensitive(AuthToken){
    //const token = req.headers['authorization']?.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Now you know who is calling
      next();
    } catch (e) {
      res.sendStatus(403); // Forbidden
    }
}