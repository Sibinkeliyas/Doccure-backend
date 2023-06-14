const { default: mongoose } = require('mongoose')
const appointments = require('../../model/user/bookings')
const { convertIntoIsoDate, TodaysDate } = require('../commonHelpers/date')

module.exports ={
    doFindAllAppointments : ({page , perPage ,appointmentStatus = 'accepted', payment = '', doctorSearch = '', userSearch = ''}) => {
        return new Promise(async(resolve, reject) => {
            let count 
            try {
                count = await appointments.aggregate([
                {
                    $match : {
                        date : {
                            $gte : new Date()
                        }
                    } 
                } ,
                {
                    $match : {
                        appointmentStatus : {
                            $regex : appointmentStatus ,
                            $options : 'i'
                        }
                    }
                } ,
                {
                    $match : {
                        paymentMethod : {
                            $regex : payment ,
                            $options : 'i'
                        }
                    }
                } ,
                {
                    $lookup : {
                        from : 'users' ,
                        localField : 'userId' ,
                        foreignField :'_id' ,
                        as : 'userData'
                    }
                } ,
                {
                    $lookup : {
                        from : 'doctors',
                        localField :"doctorId",
                        foreignField :'_id' ,
                        as : 'doctorData'
                    }
                },
                {
                    $match: {
                        userData: {
                            $elemMatch: {
                                'name' : {
                                    $regex: userSearch ,
                                    $options: "i"
                                }
                            }
                        }
                    }  
                } ,
                  {
                    $match: {
                        doctorData: {
                            $elemMatch: {
                                'doctorName' : {
                                    $regex: doctorSearch ,
                                    $options: "i"
                                }
                            }
                        }
                    }  
                } ,
            ])
            } catch (err) {
                console.log(err);
                reject(err)
            }
            appointments.aggregate([
                {
                    $match : {
                        date : {
                            $gte : new Date()
                        }
                    } 
                } ,
                {
                    $match : {
                        appointmentStatus : {
                            $regex : appointmentStatus ,
                            $options : 'i'
                        }
                    }
                } ,
                {
                    $match : {
                        paymentMethod : {
                            $regex : payment ,
                            $options : 'i'
                        }
                    }
                } ,
                {
                    $lookup : {
                        from : 'users' ,
                        localField : 'userId' ,
                        foreignField :'_id' ,
                        as : 'userData'
                    }
                } ,
                {
                    $lookup : {
                        from : 'doctors',
                        localField :"doctorId",
                        foreignField :'_id' ,
                        as : 'doctorData'
                    }
                },
                {
                    $match: {
                        userData: {
                            $elemMatch: {
                                'name' : {
                                    $regex: userSearch ,
                                    $options: "i"
                                }
                            }
                        }
                    }  
                } ,
                  {
                    $match: {
                        doctorData: {
                            $elemMatch: {
                                'doctorName' : {
                                    $regex: doctorSearch ,
                                    $options: "i"
                                }
                            }
                        }
                    }  
                } ,
                {
                    $skip : (page - 1) * perPage
                } ,
                {
                    $limit : perPage
                }
            ]).then((data) => {
                resolve({data , count : count.length})
            }).catch((err) => {
                console.log(err);
                reject(err)
            })
        })
    } ,
   
    doFindAllTransactions : ({page , perPage , appointmentStatus = 'accepted', payment = '', doctorSearch = '', userSearch = ''}) => {
        return new Promise(async(resolve, reject) => {
            let count 
            try {
               count = await appointments.aggregate([
                        {
                            $match : {
                                appointmentStatus : {
                                    $regex : appointmentStatus ,
                                    $options : 'i'
                                }
                            }
                        } ,
                        {
                            $match : {
                                paymentMethod : {
                                    $regex : payment ,
                                    $options : 'i'
                                }
                            }
                        } ,
                        {
                            $lookup : {
                                from : 'users' ,
                                localField : 'userId' ,
                                foreignField :'_id' ,
                                as : 'userData'
                            }
                        } ,
                        {
                            $lookup : {
                                from : 'doctors',
                                localField :"doctorId",
                                foreignField :'_id' ,
                                as : 'doctorData'
                            }
                        },
                         {
                            $match: {
                                userData: {
                                    $elemMatch: {
                                        'name' : {
                                            $regex: userSearch ,
                                            $options: "i"
                                        }
                                    }
                                }
                            }  
                        } ,
                        {
                            $match: {
                                doctorData: {
                                    $elemMatch: {
                                        'doctorName' : {
                                            $regex: doctorSearch ,
                                            $options: "i"
                                        }
                                    }
                                }
                            }  
                        } 
                ])
            } catch (err) {
                reject(err)
            }
                 appointments.aggregate([
                        {
                            $match : {
                                appointmentStatus : {
                                    $regex : appointmentStatus ,
                                    $options : 'i'
                                }
                            }
                        } ,
                        {
                            $match : {
                                paymentMethod : {
                                    $regex : payment ,
                                    $options : 'i'
                                }
                            }
                        } ,
                        {
                            $lookup : {
                                from : 'users' ,
                                localField : 'userId' ,
                                foreignField :'_id' ,
                                as : 'userData'
                            }
                        } ,
                        {
                            $lookup : {
                                from : 'doctors',
                                localField :"doctorId",
                                foreignField :'_id' ,
                                as : 'doctorData'
                            }
                        },
                         {
                            $match: {
                                userData: {
                                    $elemMatch: {
                                        'name' : {
                                            $regex: userSearch ,
                                            $options: "i"
                                        }
                                    }
                                }
                            }  
                        } ,
                        {
                            $match: {
                                doctorData: {
                                    $elemMatch: {
                                        'doctorName' : {
                                            $regex: doctorSearch ,
                                            $options: "i"
                                        }
                                    }
                                }
                            }  
                        } ,
                        {
                            $skip : (page - 1) * perPage
                        } ,
                        {
                            $limit : perPage
                        }
                ]).then((data) => {
                    resolve({data , count : count.length})
                }).catch((err) => {
                    console.log(err);
                    reject(err)
                })
            })
        } ,
        doFindOrder : (orderId) => {
            return new Promise((resolve, reject) => {
                appointments.aggregate([
                    {
                        $match : {
                            _id : mongoose.Types.ObjectId(orderId)
                            }
                    } ,{
                        $lookup : {
                            from : 'users' ,
                            localField : 'userId' ,
                            foreignField : '_id' ,
                            as : 'userData'
                        }
                    } ,
                    {
                        $lookup : {
                            from : 'doctors' ,
                            localField : 'doctorId' ,
                            foreignField : '_id' ,
                            as : 'doctorData'
                        }
                    } , {
                        $unwind : '$userData' ,
                    } ,{
                        $unwind : '$doctorData' ,
                    }
                ]).then((data) => {
                    resolve(data[0])
                }).catch((err) => {
                    reject(err)
                })
            })
        }
}