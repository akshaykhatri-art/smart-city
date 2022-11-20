const mongoose = require('mongoose');
const cities = require('./cities')
const City = require('../models/city');

mongoose.connect('mongodb://localhost:27017/smart-city');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    await City.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const cit = new City({
            cityname: cities[i].city,
            state: cities[i].admin_name,
            population: cities[i].population,
            image: 'https://source.unsplash.com/collection/4458868',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt nihil consequuntur quia repellendus libero architecto nisi, esse aspernatur iusto ullam laudantium quisquam recusandae. Rerum distinctio harum minus voluptatibus atque sequi.'
        })
        await cit.save();
    }
    // for (const element of cities) {
    //     const cit = new City({
    //         cityname: element.city,
    //         state: element.admin_name
    //     })
    //     await cit.save();
    // }
}



seedDB().then(() => {
    mongoose.connection.close()
});