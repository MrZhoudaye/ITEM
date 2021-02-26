Function.prototype.myBind = function (context, ...args) {
    if (typeof this !== "function") {
        throw new Error("this is must be a function")
    }
    var self = this
    var fbonud = function () {
        self.apply(this instanceof self ? this : context,
            args.concat(Array.prototype.slice.call(arguments)))
    }
    if (this.prototype) {
        fbonud.prototype = Object.create(this.prototype)
    }
    return fbonud
}
