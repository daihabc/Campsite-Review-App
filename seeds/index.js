const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6232dd0a778da1145c1b3d81',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            geometry: {
                "type": "Point",
                "coordinates": [
                    cities[random1000].longitude, 
                    cities[random1000].latitude
                ]
            },
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/yelp-cloud/image/upload/v1647732568/YelpCamp/campground_zht6de.jpg',
                    filename: 'campground_zht6de'
                },
                {
                    url: 'https://res.cloudinary.com/yelp-cloud/image/upload/v1647732568/YelpCamp/campground--2_wamowt.jpg',
                    filename: 'campground--2_wamowt'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})