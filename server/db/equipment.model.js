const mongoose=require("mongoose");
const EquipmentSchema=new mongoose.Schema(
    {
        name:String,
        type:String,
        amount:Number
    }
)
module.exports = mongoose.model("Equipment", EquipmentSchema);