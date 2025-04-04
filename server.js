const express = require('express');
const path = require('path');
const url = require('url');
const fs = require('fs');
const Router = express.Router();
const util = require('util');

/*
const {exec} = require("child_process");
exec("./back_end/exec", (error, stdout, stderr) =>{
    if(error){
        console.log(error);
    }
    console.log(stdout);
    if(stderr){
        console.log(stderr);
    }
});*/
const run_c = require('./back_end/build/Release/search_2');
const { channel } = require('diagnostics_channel');
console.log("Preparing dictionary... ", run_c.initialize_dictionary());


const port = 8000
const app = express();
app.set('views', path.join(__dirname, '/front_end/src/views'))
app.set('view engine', 'ejs');

app.listen(port, () =>{
    console.log("app is started on port", port);
});

app.get('/Snow/Search',  (req, res) => {
    console.log("DefaultView");

    res.render('search', {search: ""});
    app.use(express.static(path.join(__dirname, '/front_end/src/search')));
    app.use(express.static(path.join(__dirname, '/front_end/src/Fonts')));
});

app.get('/Snow/Search/:searchquery', (req, res) => {
    console.log("ResultView");
    const searchKeyValue = req.query;

    res.render('search', {search: searchKeyValue.search});
    app.use(express.static(path.join(__dirname, '/front_end/src/search')));
    app.use(express.static(path.join(__dirname, '/front_end/src/Fonts')));
    
});

app.get('/Snow/Search/:request',  (req, res) => {
    //req.params.request;
    res.sendFile(path.join(__dirname, '/front_end/src/search.html'));
    app.use(express.static(path.join(__dirname, '/front_end/src/search')));
    app.use(express.static(path.join(__dirname, '/front_end/src/Fonts')));
    console.log(req.params.request);
});

app.get('/Snow/Login',  (req, res) => {
    res.sendFile(path.join(__dirname, '/front_end/src/UserAuth/Login.html'));
    app.use(express.static(path.join(__dirname, '/front_end/src/UserAuth')));
    app.use(express.static(path.join(__dirname, '/front_end/src/Fonts')));
});

app.get('/Snow/CreateAccount',  (req, res) => {
    res.sendFile(path.join(__dirname, '/front_end/src/UserAuth/Account.html'));
    app.use(express.static(path.join(__dirname, '/front_end/src/UserAuth')));
    app.use(express.static(path.join(__dirname, '/front_end/src/Fonts')));
});

app.get('/api/usersLinks/', (req, res) => {
    res.sendFile(path.join(__dirname, '/front_end/src/search/userSavedLinks.txt'));
})

app.use(express.json());

app.post('/api/returnsearch/', (req, res) => {
    const new_query = req.body;
    //check if querry is duplicate
    console.log("Preparing serach for...");
    console.log(new_query.data.search);

    //process.stdout.write('\x1Bc'); 
    //run search algorithm
    const search_results = run_c.create_return_JSON(new_query.data.search);
    //send json back to front end
    console.log(util.inspect(search_results, false, null, true));
    res.json(search_results);
})




app.post('/api/fetchUsersLinks/', (req, res) => {
    //implement user checks
    res.sendFile(path.join(__dirname, '/front_end/src/search/userSavedLinks.json'));
})

app.post('/api/sendUsersLinks/', (req, res) => {
    //implement user checks
    const saved_Links = JSON.stringify(req.body, null, '  ');
    const filePath = path.join(__dirname, '/front_end/src/search/userSavedLinks.json');

    console.log("trying to write to file");
    fs.writeFile(filePath, saved_Links, (err) => {
         if(err) {
            console.error('An error occurred:', err);
            res.json({'return':'Recieved, Fail'});
        } else {
            console.log('File written successfully!');
            res.json({'return':'Recieved, success'});
        }
    });
})