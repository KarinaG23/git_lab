
const Appeal=require("../models/Appeal")
module.exports = async function (req) {
    const newAppeal=new Appeal({...req})
    try{
        await newAppeal.save()
        console.log("Form Function");
        return true
        }
        catch(er){
        
            console.log(er)
            return false
        }

}
  