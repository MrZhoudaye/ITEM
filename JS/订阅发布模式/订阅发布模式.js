let event = {
    list:{},
    // 订阅
    on(key,fn){
        // 缓存
        if(!this.list[key]){
            this.list[key] = []
        }
        this.list[key].push(fn)
        // console.log(this.list)
    },
    // 发布
    emit(){
        let key = [].shift.call(arguments),
        fns = this.list[key]

        // 缓存列表中没有函数就返回false
        if(!fns || fns.length === 0){
            return false
        }

        fns.forEach(fn => {
            fn.apply(this,arguments)
        });
    },
    // 移除
    remove(key,fn){
        let fns = this.list[key]
        if(!fns)return false
        if(!fn){
            fns && (fns.length = 0)
        }else{
            fns.forEach((cb,i) =>{
                if(cb === fn){
                    fns.splice(i,1)
                }
            })
        }
    }
}

function cat(){
    console.log("miao")
}

function dog(){
    console.log("wang")
}

event.on('pet',data=>{
    console.log('接收数据')
    console.log(data)
})

event.on('pet',cat)
event.on('pet',dog)

event.emit('pet',['二哈','波斯猫'])


console.log("111")