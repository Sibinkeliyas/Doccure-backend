const { default: mongoose } = require('mongoose');
const doctorMessageShema = require('../../model/chat/message')
const doctorShema = require('../../model/doctor/doctorSchema')

module.exports = {
    doFindAllMessages : ({doctorId , search = ''}) => {
        return new Promise((resolve, reject) => {
            doctorMessageShema.aggregate([
                {
                    $match : {
                        doctorId : mongoose.Types.ObjectId(doctorId)
                    }
                } ,
                {
                    $lookup : {
                        from : 'users' ,
                        foreignField : '_id' ,
                        localField : 'userId' ,
                        as : 'userData'
                    }
                },
                {
                    $unwind : '$userData'
                } ,
                {
                    $match : {
                        'userData.name' : {
                                $regex: search ,
                                $options: "i"
                                    }
                            }
                    
                } ,
            ]).then((data) => {
                resolve(data)
            }).catch((err) => {
                console.log(err);
                reject(err)
            })
        })
    } ,
    doFindAllDoctorMessages : ({ search}) => {
        return new Promise((resolve, reject) => {
            doctorShema.find({
                doctorName : {
                    $regex: search ,
                    $options: "i"
                    }
            }).then((data) => {
                resolve(data)
            }).catch((err) => {
                console.log(err);
                reject(err)
            })
        })
    } ,
    doCreateMessage : ({doctorId , userId , to} ) => {
        return new Promise((resolve, reject) => {
            doctorMessageShema.findOne({doctorId : doctorId , userId : userId}).then((data) => {
                if(data) {
                    if(to === 'doctor') {
                        doctorMessageShema.updateOne({
                            doctorId : doctorId , userId : userId
                        } , {
                            $set : 
                            {
                                user : 0 
                            }
                        }).then((res) => {
                            resolve(data)
                        }).catch((err) => {
                            reject(err)
                        })
                    } else {
                        doctorMessageShema.updateOne({
                            doctorId : doctorId , userId : userId
                            } , {
                                $set : 
                                    {
                                        'doctor' : 0 
                                    }
                            }).then((res) => {
                                resolve(data)
                            }).catch((err) => {
                                reject(err)
                            })
                    }
                } else {
                    const message = {
                        doctorId : doctorId ,
                        userId,
                        message : [] ,
                        user : 0 ,
                        doctor : 0
                    }
                    doctorMessageShema.create(message).then((data) => {
                        resolve(data)
                    }).catch((err) => {
                        reject(err)
                    })
                }
            }).catch((err) => {
                reject(err)
            })
        })
    } ,
    doAddMessage : ({userId , doctorId , message , from}) => {
        return new Promise((resolve, reject) => {
            if(from === 'doctor') {
                doctorMessageShema.findOne({doctorId : mongoose.Types.ObjectId(doctorId) , 
                    userId : mongoose.Types.ObjectId(userId)}).then((data) => {
                        if(data?.user) {
                                doctorMessageShema.updateOne(
                                {
                                    doctorId : mongoose.Types.ObjectId(doctorId) , userId : mongoose.Types.ObjectId(userId)
                                } ,
                                {
                                    $push : {
                                        message : message
                                    } ,
                                    $inc : {
                                        'user' : 1
                                    } ,
                                    $set : {
                                        'doctor' : 0
                                    }
                                },{upsert : true}).then((data) => {
                                    resolve(data)
                                }).catch((err) => {
                                    console.log(err);
                                    reject(err)
                                })
                        } else {
                            doctorMessageShema.updateOne(
                                {
                                    doctorId : mongoose.Types.ObjectId(doctorId) , userId : mongoose.Types.ObjectId(userId)
                                } ,
                                {
                                    $push : {
                                        message : message
                                    } ,
                                    $set : {
                                        'user' : 1 ,
                                        'doctor' : 0
                                    }
                                }, {upsert : true}).then((data) => {
                                    resolve(data)
                                }).catch((err) => {
                                    console.log(err);
                                    reject(err)
                                })
                        }
                    })
            } else {
                doctorMessageShema.findOne({doctorId : mongoose.Types.ObjectId(doctorId) , 
                    userId : mongoose.Types.ObjectId(userId)}).then((data) => {
                        if(data?.doctor) {
                            doctorMessageShema.updateOne(
                                {
                                    doctorId : mongoose.Types.ObjectId(doctorId) , userId : mongoose.Types.ObjectId(userId)
                                } ,
                                {
                                    $push : {
                                        message : message
                                    } ,
                                    $inc : {
                                        'doctor' : 1
                                    } ,
                                    $set : {
                                        'user' : 0
                                    }
                                } , {upsert : true}).then((data) => {
                                    resolve(data)
                                }).catch((err) => {
                                    console.log(err);
                                    reject(err)
                                })
                        } else {
                            doctorMessageShema.updateOne(
                                {
                                    doctorId : mongoose.Types.ObjectId(doctorId) , userId : mongoose.Types.ObjectId(userId)
                                } ,
                                {
                                    $push : {
                                        message : message
                                    } ,
                                    $set : {
                                        'doctor' : 1 ,
                                        'user' : 0
                                    } 
                                } , {upsert : true}).then((data) => {
                                    resolve(data)
                                }).catch((err) => {
                                    console.log(err);
                                    reject(err)
                                })
                        }
                    })
            }
        })
    } ,
    doIncreaseUserMessageCount : ({doctorId , userId}) => {
        return new Promise((resolve, reject) => {
            doctorShema.findOne({_id : doctorId}).then((data) => {
                let userData = data.count?.findIndex((user) => user.id === userId)
                if(userData !== -1) {
                    doctorShema.updateOne({_id : doctorId , 'count.id' : userId} , 
                    {
                        $inc : {
                        'count.$.count' : 1
                    }}).then((data) => {
                        resolve(data)
                    }).catch((err) => {
                        reject(err)
                    })
                } else {
                    let count = {
                        id : userId ,
                        count : 1
                    }
                    doctorShema.updateOne(
                        {
                            _id : doctorId 
                        } , 
                        {
                            $push : 
                                {
                                    count 
                                }
                        }, {upsert : true}).then((data) => {
                        resolve(data)
                    }).catch((err) => {
                        reject(err)
                    })
                }
            })
        })
    } ,
    doDecreaseUserMessageCount : ({doctorId , userId}) => {
        return new Promise((resolve, reject) => {
            doctorShema.findOne({_id : doctorId}).then((data) => {
                let userData = data.count?.findIndex((user) => user.id === userId)
                if(userData !== -1) {
                    doctorShema.updateOne({_id : doctorId , 'count.id' : userId} , 
                    {
                        $set : {
                        'count.$.count' : 0
                    }}).then((data) => {
                        resolve(data)
                    }).catch((err) => {
                        reject(err)
                    })
                } 
            })
        })
    }
}