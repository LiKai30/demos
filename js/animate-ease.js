function animate(obj, target , callback) {
    // 如果多次点击按钮，就会添加多个定时器，速度会越来越快
    // 所以先清除定时器,保证只有一个定时器执行

    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        // js中尽量避免小数,向上取整
        // var step = Math.ceil((target - obj.offsetLeft)/10);
        // 需要考虑到负值
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);

        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            if(callback){
                callback();
            }
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);
}