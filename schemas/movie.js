var mongoose=require('mongoose');

var MovieSchema=new mongoose.Schema({
	title:String,	
	doctor:String,
	language:String,
	country:String,
	year:Number,
	summary:String,
	flash:String,
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
});

MovieSchema.pre('save',function(next){
	if (this.isNew) {
		this.meta.createAt=this.meta.updateAt=Date.now()
	}else{
		this.meta.updateAt=Date.now()
	}
	next()
});

MovieSchema.statics={
	fetch:function(cb){
		return this
		.find({})
		.sort('meta.updateAt')
		.exec(cb)
	},
	findById:function(id,cb){
		return this 
			.findOne({
				_id:id
			})
			.exec(cb)
	}
};

module.exports=MovieSchema;