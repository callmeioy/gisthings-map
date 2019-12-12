class A{
	publicProps = '公开属性'
	static staticProps = '静态属性'
	#privateProps = '私有属性'
	constructor(name){
		 this.name = name
		 this.instance =undefined
	}

	static instance(name) {
		if(!this.instance){
			this.instance = new A(name)
		}
		return this.instance

	}
	static staticFunc(){
		console.log('staticfun')

	}
	getPrivateProps(){
		return this.#privateProps
	}
	get nameCn(){
		return '名字：'+this.publicProps
	}

	set nameCn(name){
		this.publicProps ='名字：' + publicProps
	}

}