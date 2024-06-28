const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

const auth = (req, res, next) => {
    const auth = {login: 'user', password: 'pass'};
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');
    
    if (login && password && login === auth.login && password === auth.password) {
        return next();
    }
    
    res.set('WWW-Authenticate', 'Basic realm="401"');
    res.status(401).send('Authentication required.');
};

app.use(auth);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
