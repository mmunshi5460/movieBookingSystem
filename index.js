// import dependencies you will use
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// set up variables to use packages
var myApp = express();
myApp.use(express.urlencoded({extended:false})); 

//set up validation packages
const {check, validationResult} = require('express-validator'); 

// set path to public folders and view folders
myApp.set('views', path.join(__dirname,'views'));
//use public folder for CSS etc.
myApp.use(express.static(__dirname + '/public'));
myApp.set('view engine', 'ejs');

//set up Database
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const { time } = require('console');
const { render } = require('ejs');

const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCElsou48nFsnwZWrNFHndT0zVcN9qiPjo'
  });



mongoose.connect('mongodb://localhost:27017/MovieBookingSystem', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//set up models
const Theatre = mongoose.model('theatres',
{
    name: String,
    TheatreId: Number,
    address: String,
    city: String,
    helpline: Number,
});

const TwoFactorAuth = mongoose.model('TwoFactorAuth',
{
    userid: Number,
    securityQuestion: String,
    securityAnswer: String
});

const User = mongoose.model('User',
{
    userid: Number,
    userName: String,
    password: String,
    badPasswordCount: Number,
});

const MovieDetails = mongoose.model('MovieDetails',
{
    movieId: Number,
    movieCast: String,
    movieDescription: String,
    //moviePoster: Image,
    //movieDuration: ,
});

const Movie = mongoose.model('movies',
{
    movieId: Number,
    name: String,
    theatre : String,
    cast: String,   
    city: String,
    poster: String,
    duration: Number,
    description: String
});

const MovieCalendar = mongoose.model('MovieCalendar',
{
});

const Invoice = mongoose.model('Invoice',
{

});

const Customer = mongoose.model('Customer',
{

});

const FoodItems = mongoose.model('FoodItems',{

});

const Seat = mongoose.model('Seat',{

});

const Booking = mongoose.model('Booking',{

});

myApp.use(function (req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});

//1 render the process page
myApp.get('/',function(req, res){
    res.render('homePage'); // will render views/home.ejs
});

//2
myApp.get('/TheatreSelection',function(req, res){
    Theatre.find({}).exec(function (err, theatre) {
        res.render('theatrePage', { theatre : theatre});
    });
   // res.render('theatrePage'); // will render views/home.ejs
});

//3
myApp.get('/movieSelection',function(req, res){
    res.render('movieSelection'); // will render views/home.ejs
});

//4
myApp.get('/calendarPage',function(req, res){
    res.render('calendarPage'); // will render views/home.ejs
});

//5
myApp.get('/seatSelection',function(req, res){
    res.render('seatSelection'); // will render views/home.ejs
});

//6
myApp.get('/foodSelection',function(req, res){
    res.render('foodSelection'); // will render views/home.ejs
});

//7
myApp.get('/paymentSummary',function(req, res){
    res.render('paymentSummary'); // will render views/home.ejs
});
//8
myApp.get('/Login',function(req, res){
    res.render('loginPage'); // will render views/home.ejs
});
//9
myApp.get('/Register',function(req, res){
    res.render('registrationPage'); // will render views/home.ejs
});
//10
myApp.get('/twoFactorAuthentication',function(req, res){
    res.render('2Fa'); // will render views/home.ejs
});
//11
myApp.get('/paymentInformation',function(req, res){
    res.render('paymentInformation'); // will render views/home.ejs
});
//12
myApp.get('/paymentConfirmation',function(req, res){
    res.render('paymentConfirmation'); // will render views/home.ejs
});
//13
myApp.get('/ContactUs',function(req, res){
    res.render('contactUs'); // will render views/home.ejs
});
//14
myApp.get('/Policy',function(req, res){
    res.render('policyPage'); // will render views/home.ejs
});
//15
myApp.get('/AboutUs',function(req, res){
    res.render('aboutUsPage'); // will render views/home.ejs
});
//16
myApp.get('/TermOfUse',function(req, res){
    res.render('termOfUse'); // will render views/home.ejs
});


myApp.get('/TicketPage',function(req, res){
    res.render('ticketPage'); // will render views/home.ejs
});

myApp.post('/TheatreSelection', function (req, res) {
    //creating constant for the error message
    const errors = validationResult(req);
    console.log(req.body);
    //condition to check of the error message field is not empty
    if (!errors.isEmpty()) {
        //fecthing the page products and errors
        res.render('theatrePage', {
            errors: errors.array()
        })
    }
    else {
        var City = req.body.city_Selected;
        console.log(req.body.city_Selected);
        Theatre.find({ city: City }).exec(function (err, City) {
            console.log('Error:' + err);
            console.log('Theatre:' + City)
            if (City) {
                res.render('movieSelection', { City: City })
            }
            else {
                res.render('theatrePage', { message: "Could not any movies in this city" })
            }
        })
    }
});

//connecting to the port 8080
myApp.listen(8080);

//checking if everything works fine
console.log('Website at port 8080....');