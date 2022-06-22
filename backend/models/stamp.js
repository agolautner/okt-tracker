const mongoose = require("mongoose");
const oktStamps = require("./stamp_data");


const stampSchema = new mongoose.Schema({
    name: { type: String, required: true }, //empty string NONO!
    id: { type: Number, required: true },
    img: { type: String, required: false, default: null }, //we assume that all stamps are collected between the start and end
    coordinates: { 
        lat: { type: String, required: true },
        lng: { type: String, required: true }
    },
    sections: [{type: Number}]
});

const Stamp = mongoose.model("stamp", stampSchema);

// console.log(oktStamps);
// oktStamps.map(stamp => {
//     const newStamp = new Stamp({
//         name: stamp.name,
//         id: stamp.id,
//         img: stamp.img,
//         coordinates: {
//             lat: stamp.coordinates.latitude,
//             lng: stamp.coordinates.longitude
//         },
//         sections: stamp.sections
//     });
//     newStamp.save();
// })

module.exports = Stamp;