const mongoose = require('mongoose');
const Location = require('./models/Location');

async function main() {
    try {
        await mongoose.connect('mongodb://localhost:27017/campus-navigation');

        const locations = [
            { name: 'Canteen', latitude: 51.505, longitude: -0.09 },
            { name: 'Auditorium', latitude: 51.507, longitude: -0.08 },
            { name: 'Library', latitude: 51.509, longitude: -0.07 }
        ];

        const docs = await Location.insertMany(locations);
        console.log('Locations added:', docs);
    } catch (err) {
        console.error('Error adding locations:', err);
    } finally {
        await mongoose.connection.close();
    }
}

main();
