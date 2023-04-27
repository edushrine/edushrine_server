const mongoose = require('mongoose')

const Schema = mongoose.Schema



const studentSchema = new Schema({

    role:{
        type:String,
        trim:true,
        default:""
    },

    admission_no:{
        type:String,
        trim:true,
        default:"",
    },

    admission_date:{
        type:Date,
     },

    photo:{
        type:String,
        trim:true,
     },

    student_name:{
        type:String,
        trim:true,
        required:[true,'is required']
    },

    gender:{
        type:String,
        trim:true,
        required:[true,'is required']
    },

    campus_address:{
        type:String,
        trim:true,
     },
    teaching_required_for:{
        course:{
            type:String,
            trim:true,
            required:[true,'is required']
        },
        subjects:{
            type:String,
            trim:true,
            required:[true,'is required']
        },
    },

    batch_type:{
        type:String,
        trim:true,
        required:[true,'is required']
    },
    batch_preferred:{
        type:String,
        trim:true,
        required:[true,'is required']
    },
    // class:{
    //     type:Number,
    //     trim:true
    // },
    // section:{
    //     type:String,
    //     trim:true
    // },
    register_no:{
        type:String,
        trim:true
    },    
    prev_school:{
        school_name:{
            type:String,
            trim:true,
            required:[true,'is required']
        },
        area:{
            type:String,
            trim:true,
         },

    },

    student_numb:{
        type:Number,
        required:[true,'is required']
    },
    parent_numb:{
        type:Number,
        required:[true,'is required']
    },
    mob_num3:{
        type:Number,
        default:''
    },


    student_details:{
        exam_name_passed: String,
        total_marks:Number,
        percentage:Number,
        dob:Date,
        mother_tongue:String,
        extra_activities:String,
        awards:String,
    },

    student_email:{
        type:String,
        trim:true,
        
    },
    student_password:{
        type:String,
        trim:true,
        required:[true,'is required']
    },
    parent_password:{
        type:String,
        trim:true,
        required:[true,'is required']
    },

    parents_details:{
        father_name:String,
        father_occupation:String,
        mother_name:String,
        mother_occupation:String,
        home_address:{
            door:String,
            street:String,
            area:String,
            city:String,
            pincode:Number
        },
        
    },
     

    father_email:{
        type:String,
        trim:true,
     },
    mother_email:{
        type:String,
        trim:true,
     },

    office_details:{

        remaining_amount:{
            type:Number,
            default:0
        },
        
        total_course_fee:{
            type:Number,
            trim:true,
            default:0,
        },
        concession:{
            type:Number,
            default:0
        },
        total_fee:{
            type:Number,
            default:0,
        },
        reference:{
            type:String,
            trim:true,
            default:""
        },
        remarks:{
            type:String,
            trim:true,
            default:""
        },
        installment_details:{
            installment1:{
                installment1_date:{
                    type:Date,
                },
                amount1:{
                    type:Number,
                    default:0
                }, 
                payment_mode_1:{
                    type:String,
                    trim:true,
                    default:""
                }   
 
            },
            installment2:{
                installment2_date:{
                    type:Date,
                },
                amount2:{
                    type:Number,
                    default:0
                },
                payment_mode_2:{
                    type:String,
                    trim:true,
                    default:""
                }   
            },
            installment3:{
                installment3_date:{
                    type:Date,
                },
                amount3:{
                    type:Number,
                    default:0
                },
                payment_mode_3:{
                    type:String,
                    trim:true,
                    default:""
                }   
 
            },

        },
        
    },
    register_no:{
        type:String,
        trim:true,
        
    },
    campus:{
        type: Schema.Types.ObjectId, 
        ref: 'Campus'
    },

    board:{
        type:String,
        trim:true,
        required:[true,'is required']
    },
    
    batch:{
        type: Schema.Types.ObjectId, 
        ref: 'Branch'
    },

    ptb_results:[{
        type:Schema.Types.ObjectId,
        ref:'PTB'
     
    }],
    pte_results:[{
        type:Schema.Types.ObjectId,
        ref:'PTE'
    }],

    gtb_results:[{
            type:Schema.Types.ObjectId,
            ref:'GTB'    
     }],
    gte_results:[{
            type:Schema.Types.ObjectId,
            ref:'GTE'
    }],

    course_materials:[
     {
        comments:String,
         material:{
            type:Schema.Types.ObjectId,
            ref:'Course',
        }
    }],



    notifications:[{
        msg:String,
        subject:String,
        notify_on:String,
        date:Date,
    }],
    

    

},{timestamps:true})



module.exports = mongoose.model('Student',studentSchema)