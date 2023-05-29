module.exports=(subjects,id)=>{
console.log(id,"IDDDD");
    const result=subjects?.filter(el=>{
       return el._id==id;
        console.log(el._id==id);
    })

    console.log(result);
    return result;

} 