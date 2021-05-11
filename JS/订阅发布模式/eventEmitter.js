// 在浏览器端实现一个EventEmitter
// 初始化
function EventEmitter(){
    this._events = {}
}
EventEmitter.VERSION = '1.0.0'

EventEmitter.prototype.on = function(evnetName,listener){
    if(!evnetName || !listener) return

    if(!isValidListener(listener)){
        throw new TypeError("listener must be a function")
    }
    var events = this._events
    var listeners = events[evnetName] = events[evnetName] || []
    var listenerIsWrapped = typeof listener === 'object'

    // 不重复添加事件
    if(indexOf(listeners,listener) === -1){
        listeners.push(listenerIsWrapped ? listener : {
            listener:listener,
            once:false
        })
    }
    return this
}

function isValidListener(listener){
    if(typeof listener === 'function'){
        return true
    }else if(listener && typeof listener === 'object'){
        isValidListener(listener.listener)
    }else{
        return false
    }
}

function indexOf(array,item){
    var result = -1
    item = typeof item === 'object' ? item.listener :item
    for(var i=0,len = array.length;i<len;i++){
        if(array[i].listener === item){
            result = i
            break
        }
    }
    return result
}

EventEmitter.prototype.emit = function(evnetName,args){
    var listeners = this._events[evnetName]
    if(!listeners) return

    // 多个listener
    for(var i=0;i<listeners.length;i++){
        var listener = listeners[i]
        if(listener){
            listener.listener.apply(this,[args]||[])
            // 如果有once的
            if(listener.once){
                this.off(evnetName,listener.listener)
            }
        }
    }
    return this
}

EventEmitter.prototype.off = function(evnetName,listener){
    var listeners = this._events[evnetName]
    if(!listeners) return
    var index
    for(var i=0;i<listeners.length;i++){
        if(listeners[i] && listeners[i].listener === listener){
            index = i
            break
        }
    }
    // 
    if(typeof index !== undefined){
        listeners.splice(index,1,null)
    }
    return this
}

EventEmitter.prototype.once = function(evnetName,listener){
    return this.on(evnetName,{
        listener:listener,
        once:true
    })
}

EventEmitter.prototype.allOff = function(evnetName){
    if(evnetName && this._events[evnetName]){
        this._events[evnetName] = []
    }else{
        this._events = {}
    }
}