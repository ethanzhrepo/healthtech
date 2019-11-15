if (!("classList" in document.documentElement)) {
    Object.defineProperty(HTMLElement.prototype, 'classList', {
        get: function() {
            var self = this;
            function update(fn) {
                return function(value) {
                    var classes = self.className.split(/\s+/g),
                        index = classes.indexOf(value);

                    fn(classes, index, value);
                    self.className = classes.join(" ");
                }
            }

            return {
                add: update(function(classes, index, value) {
                    if (!~index) classes.push(value);
                }),

                remove: update(function(classes, index) {
                    if (~index) classes.splice(index, 1);
                }),

                toggle: update(function(classes, index, value) {
                    if (~index)
                        classes.splice(index, 1);
                    else
                        classes.push(value);
                }),

                contains: function(value) {
                    return !!~self.className.split(/\s+/g).indexOf(value);
                },

                item: function(i) {
                    return self.className.split(/\s+/g)[i] || null;
                }
            };
        }
    });
}




var alan = (function(document, undefined) {
    var readyRE = /complete|loaded|interactive/;
    var idSelectorRE = /^#([\w-]+)$/;
    var classSelectorRE = /^\.([\w-]+)$/;
    var tagSelectorRE = /^[\w-]+$/;
    var translateRE = /translate(?:3d)?\((.+?)\)/;
    var translateMatrixRE = /matrix(3d)?\((.+?)\)/;

    var $ = function(selector, context) {
        context = context || document;
        if (!selector)
            return wrap();
        if (typeof selector === 'object')
            if ($.isArrayLike(selector)) {
                return wrap($.slice.call(selector), null);
            } else {
                return wrap([selector], null);
            }
        if (typeof selector === 'function')
            return $.ready(selector);
        if (typeof selector === 'string') {
            try {
                selector = selector.trim();
                if (idSelectorRE.test(selector)) {
                    var found = document.getElementById(RegExp.$1);
                    return wrap(found ? [found] : []);
                }
                return wrap($.qsa(selector, context), selector);
            } catch (e) {}
        }
        return wrap();
    };

    var wrap = function(dom, selector) {
        dom = dom || [];
        Object.setPrototypeOf(dom, $.fn);
        dom.selector = selector || '';
        return dom;
    };

    /**
     * querySelectorAll
     * @param {type} selector
     * @param {type} context
     * @returns {Array}
     */
    $.qsa = function(selector, context) {
        context = context || document;
        return $.slice.call(classSelectorRE.test(selector) ? context.getElementsByClassName(RegExp.$1) : tagSelectorRE.test(selector) ? context.getElementsByTagName(selector) : context.querySelectorAll(selector));
    };


    $.uuid = 0;

    $.data = {};

    $.insertAfter = function(elem,tarElem){
        var parent = tarElem.parentNode;
        if (parent.lastChlid == tarElem) {
            parent.appendChild(elem);
        }else{
            parent.insertBefore(elem,tarElem.nextSibling);
        }
    };

    // æŸ¥æ‰¾å…„å¼Ÿå…ƒç´
    $.getSiblings = function(o){
        var a = [];
        var p = o.previousSibling;
        while(p){
            if(p.nodeType === 1){
                a.push(p);
            }
            p = p.previousSibling;
        }
        a.reverse();

        var n = o.nextSibling;
        while(n){
            if(n.nodeType === 1){
                a.push(n);
            }
            n = n.nextSibling;
        }
        return a;
    };

    $.toggleClass = function( elem, c ) {
        if(elem.classList.contains(c)){
            elem.classList.remove(c);
        }else{
            elem.classList.add(c);
        }
    };

    /* ç§»åŠ¨ç«¯ç‚¹å‡»äº‹ä»¶æ¨¡æ‹ŸPCç«¯hoveräº‹ä»¶
    * class1,é€‰æ‹©åŒ¹é…çš„å…ƒç´
    * class2,åŒ¹é…å…ƒç´ é‡Œçš„aå…ƒç´ ï¼Œé˜»æ­¢å®ƒè·³è½¬
    * */
    $.touchToHover = function (class1,class2) {

        [].slice.call(document.querySelectorAll(class1)).forEach( function( el) {
            el.querySelector(class2).addEventListener( 'touchstart', function(e) {
                console.log(this);
                //e.stopPropagation();
                e.preventDefault();
            }, false );
            el.addEventListener( 'touchstart', function(e) {
                $.toggleClass( this, 'cs-hover' );
            }, false );
        });
    };

    $.getStyle = function(elem,attr){
        return elem.currentStyle ? elem.currentStyle[attr] : window.getComputedStyle(elem,false)[attr];
    };

    $.getElemPosition = function(elem){
        var oPositon = elem.getBoundingClientRect();
        return {
            top:oPositon.top,
            bottom:oPositon.bottom,
            left:oPositon.left,
            right:oPositon.right,
        };
    };

    $.Event = {
        on:function(elem,type,handler){
            if (elem.addEventListener) {
                elem.addEventListener(type,handler,false);
            }else if(elem.attachEvent){
                elem.attachEvent('on'+type,handler);
            }else{
                elem['on'+type] = handler;
            }
        },
        off:function(elem,type,handler){
            if (elem.removeEventListener) {
                elem.removeEventListener(type,handler,false);
            }else if (elem.detachEvent) {
                elem.detachEvent('on'+type,handler);
            }else{
                elem['on'+type] = null;
            }
        },
        getEvent:function(event){ //å°†å®ƒæ”¾åœ¨äº‹ä»¶å¤„ç†ç¨‹åºçš„å¼€å¤´ï¼Œå¯ä»¥ç¡®ä¿èŽ·å–äº‹ä»¶ã€‚
            return event ? event : window.event;
        },
        getTarget:function(event){ //ç›®æ ‡å…ƒç´
            return event.target || event.srcElement;
        },
        preventDefault:function(event){ //å–æ¶ˆé»˜è®¤
            if (event.preventDefault) {
                event.preventDefault();
            }else{
                event.returnValue = false;
            }
        },
        stopPropagation:function(event){ //é˜»æ­¢å†’æ³¡
            if (event.stopPropagation) {
                event.stopPropagation();
            }else{
                event.cancelBubble = true;
            }
        },
        getRelatedTarget:function(event){//èŽ·å¾—ç›¸å…³å…ƒç´
            if (event.relatedTarget) {
                return event.relatedTarget;
            }else if (event.toElement) {
                return event.toElement;
            }else if (event.fromElement) {
                return event.fromElement;
            }else{
                return null;
            }
        },
        getButton:function(event){ //èŽ·å–é¼ æ ‡æŒ‰é’®
            if (alan.isSupported2) {
                return event.button;
            }else{
                switch(event.button){
                    case 0:
                    case 1:
                    case 3:
                    case 5:
                    case 7:
                        return 0;
                    case 2:
                    case 6:
                        return 2;
                    case 4:
                        return 1;
                }
            }
        },
        getWheelDelta:function(event){ //æ»šè½®çš„äº‹ä»¶
            if (event.wheelDelta) {
                return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
            }else{
                return -event.detail * 40;
            }
        },
        getCharCode:function(event){
            if (typeof event.charCode == 'number') {
                return event.charCode;
            }else{
                return event.keyCode;
            }
        }
    };

    /**
     * åœ¨è¿žç»­æ•´æ•°ä¸­å–å¾—ä¸€ä¸ªéšæœºæ•°
     * @param  {number}
     * @param  {number}
     * @param  {string} 'star' || 'end' || 'both'  éšæœºæ•°åŒ…æ‹¬starNum || endNum || both
     * @return ä¸€ä¸ªéšæœºæ•°
     */
    $.mathRandom = function(starNum,endNum,type){
        var num = endNum - starNum;
        switch (type) {
            case 'star' : return parseInt(Math.random()*num + starNum,10);
            case 'end' : return Math.floor(Math.random()*num + starNum) + 1;
            case 'both' : return Math.round(Math.random()*num + starNum);
            default : console.log('æ²¡æœ‰æŒ‡å®šéšæœºæ•°çš„èŒƒå›´');
        }
    };

    // èŽ·å¾—æ•°ç»„ä¸­æœ€å°å€¼
    $.getArrayMin = function(array) {
        /*var min = array[0];
         array.forEach(function (item) {
         if(item < min){
         min = item;
         }
         });
         return min;*/

        return Math.min.apply(Math,array);
    };

    // èŽ·å¾—æ•°ç»„ä¸­æœ€å¤§å€¼
    $.getArrayMax = function (array) {
        return Math.max.apply(Math,array);
    };

    // æ•°ç»„åŽ»é‡å¤
    $.getArrayNoRepeat = function (array) {
        var noRepeat = [];
        var data = {};
        array.forEach(function (item) {
            if(!data[item]){
                noRepeat.push(item);
                data[item] = true;
            }
        });
        return noRepeat;
    };

    $.isArray = function(val){
        return Array.isArray(val) || Object.prototype.toString.call(val) === '[object Array]';
    };
    $.isFunction = function(val){
        return Object.prototype.toString.call(val) == '[object Function]';
    };
    $.isRegExp = function(val){
        return Object.prototype.toString.call(val) == '[object RegExp]';
    };

    $.isMacWebkit = (navigator.userAgent.indexOf("Safari") !== -1 && navigator.userAgent.indexOf("Version") !== -1);
    $.isFirefox = (navigator.userAgent.indexOf("Firefox") !== -1);

    //
    $.fn = {
        each: function(callback) {
            [].every.call(this, function(el, idx) {
                return callback.call(el, idx, el) !== false;
            });
            return this;
        }
    };

    //å…¼å®¹ AMD æ¨¡å—
    if (typeof define === 'function' && define.amd) {
        define('alan', [], function() {
            return $;
        });
    }
    return $;
})(document);

// æ»šåŠ¨åŠ¨ç”»
(function ($) {
    /*
    * éœ€è¦åœ¨cssæ–‡ä»¶é‡Œæ·»åŠ  .scroll-animate.animated {visibility: hidden;} æ ·å¼ï¼Œè§£å†³"é—ªä¸€ä¸‹"çš„bug
    * .disable-hover {pointer-events: none;} ä¹Ÿéœ€è¦åŠ åœ¨æ ·å¼è¡¨ä¸­
    * å¦‚æžœæ»šåŠ¨äº‹ä»¶å¤±æ•ˆï¼ŒæŸ¥çœ‹bodyå…ƒç´ æ˜¯å¦è®¾ç½®äº† {height:100%}ï¼Œå®ƒä¼šå½±å“æ»šåŠ¨äº‹ä»¶ã€‚
    * å¦‚æžœä¸å¸Œæœ›åŠ¨ç”»æ¯æ¬¡æ»šåŠ¨éƒ½å‡ºçŽ°ï¼Œå¯ä»¥ç»™åŠ¨ç”»å…ƒç´ åŠ  no-show-again ç±»åã€‚
    * */

    var ScrollAnimate = function (opt) {
        this.opt = opt || {};
        this.className = this.opt.className || '.scroll-animate'; // èŽ·å–é›†åˆçš„class
        this.animateClass = this.opt.animateClass || 'animated';  // åŠ¨ç”»ä¾èµ–çš„class
        this.elem = document.querySelectorAll(this.className);    // éœ€è¦æ»šåŠ¨å±•ç¤ºçš„å…ƒç´
        this.position = [];                                       // æ‰€æœ‰å…ƒç´ çš„offsetTopè·ç¦»æ•°ç»„
        this.windowHeight = ('innerHeight' in window) ? window.innerHeight : document.documentElement.clientHeight;
        this.time = null;
        this.body = document.body;
        this.init();
    };
    ScrollAnimate.prototype = {
        getPosition:function () {
            var self = this;
            self.position.length = 0;  // é‡ç½®æ•°ç»„
            [].slice.call(self.elem).forEach(function (elem) {
                if(elem.classList.contains('father')){
                    var children = elem.querySelectorAll(elem.getAttribute('data-child'));
                    var delay = parseFloat(elem.getAttribute("data-delay"));
                    [].slice.call(children).forEach(function (obj,index) {
                        obj.classList.add('animated');
                        obj.style.visibility = 'hidden';

                        if(obj.getAttribute("data-delay")){
                            obj.style.animationDelay = obj.getAttribute("data-delay") + 's';
                        }else{
                            obj.style.animationDelay = delay * index + 's';
                        }
                    })
                }else if(elem.classList.contains('font-fadeIn')){
                    elem.style.visibility = 'hidden';
                }else{
                    elem.classList.add('animated');
                }
                self.position.push(self.getOffsetTop(elem));
            });
        },
        getOffsetTop:function(element){
            var top;
            while (element.offsetTop === void 0) {
                element = element.parentNode;
            }
            top = element.offsetTop;
            while (element = element.offsetParent) {
                top += element.offsetTop;
            }
            return top;
        },
        scrollEvent:function () {
            var self = this;

            self.body.classList.add('disable-hover');
            clearTimeout(self.time);
            self.time = setTimeout(function () {
                self.body.classList.remove('disable-hover');
            },100);

            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

            //console.log('æ»šåŠ¨äº‹ä»¶è§¦å‘ï¼Œæ»šåŠ¨è·ç¦»æ˜¯' + scrollTop)
            self.position.forEach(function (item,index) {

                var currentElem = self.elem[index];
                var effect = currentElem.getAttribute("data-effect") || 'fadeInUp';
                var flag = (scrollTop + self.windowHeight >item) ? true : false;

                // åˆ¤æ–­å½“å‰å…ƒç´ æ˜¯å¦æœ‰fatherï¼Œå¾—çŸ¥å°†åŠ¨ç”»åº”ç”¨åˆ°å½“å‰å…ƒç´ è¿˜æ˜¯å½“å‰å…ƒç´ åˆ°å­å…ƒç´ ã€‚
                if(currentElem.classList.contains('father')){
                    var children = currentElem.querySelectorAll(currentElem.getAttribute("data-child"));

                    if(flag){
                        [].slice.call(children).forEach(function (item) {

                            if(item.style.visibility == 'hidden'){
                                item.style.visibility = 'visible';

                                // åˆ¤æ–­æ˜¯å¦ä¸ºæ»šåŠ¨æ•°å­—æ•ˆæžœçš„å…ƒç´
                                // æ•°å­—æ»šåŠ¨çš„æ•ˆæžœï¼Œé»˜è®¤éƒ½æ”¾åœ¨fatherçš„å®¹å™¨é‡Œï¼Œå› ä¸ºè¿™ä¸ªæ•ˆæžœä¸€èˆ¬éƒ½æ˜¯å¤šä¸ªåŒæ—¶å‡ºçŽ°ã€‚
                                if(item.classList.contains('count-up')){
                                    //self.countUp(item,true);
                                }else{
                                    if(item.getAttribute("data-effect")){
                                        item.classList.add(item.getAttribute("data-effect"));
                                    }else{
                                        item.classList.add(effect);
                                    }
                                }

                            }
                        })
                    }else{
                        [].slice.call(children).forEach(function (item) {
                            if(item.style.visibility == 'visible' && !item.classList.contains('no-show-again')){
                                /*if(item.classList.contains('count-up')){
                                    self.countUp(item,false);      // ä¼ å…¥falseï¼Œå‘Šè¯‰å‡½æ•°æ¸…ç©ºè®¡æ—¶å™¨ã€‚
                                }*/

                                if(item.getAttribute("data-effect")){
                                    item.classList.remove(item.getAttribute("data-effect"));
                                }else{
                                    item.classList.remove(effect);
                                }

                                if(!item.classList.contains('no-show-again')){
                                    item.style.visibility = 'hidden';
                                }
                            }
                        });
                    }
                }else if(currentElem.classList.contains('font-fadeIn')){  // æ–‡å­—æ·¡å…¥åˆ°æ•ˆæžœ
                    if(flag && currentElem.style.visibility == 'hidden'){
                        self.fontEffect(currentElem);
                    }else if(!flag && currentElem.style.visibility == 'visible' && !currentElem.classList.contains('no-show-again')){
                        currentElem.style.visibility = 'hidden';
                    }
                }else{
                    if(flag){
                        currentElem.style.visibility = 'visible';
                        currentElem.classList.add(effect);
                        currentElem.style.animationDelay = currentElem.getAttribute("data-delay") + 's';

                    }else{
                        if(currentElem.style.visibility == 'visible' && !currentElem.classList.contains('no-show-again')){
                            currentElem.classList.remove(effect);
                            currentElem.style.visibility = 'hidden';
                        }
                    }
                }
            })
        },
        countUp:function (elem,isTrue) {
            // æ•ˆæžœä¸ç†æƒ³ï¼Œæ”¾å¼ƒäº†ã€‚

            if(isTrue){
                elem.innerHtml = '';

                var time = elem.dataset.time;
                var sum = elem.getAttribute("data-text");
                var speed = Math.ceil(time / 100);
                var increment = Math.round(sum / speed);
                var number = 1;
                elem.timer = setInterval(function () {
                    if(number < sum){
                        number += increment;
                        elem.innerText = number;
                    }else{
                        elem.innerText = sum;
                        clearInterval(elem.timer);
                    }
                },100);

                console.log(speed);
            }else{
                console.log('æ¸…ç©ºå®šæ—¶å™¨');
                clearInterval(elem.timer);

            }

        },
        fontEffect:function (elem) {
            var array = elem.getAttribute("data-text").split('');
            //var array = elem.innerText.split('');
            var delay = elem.getAttribute("data-delay");
            var effect = elem.getAttribute("data-effect") || 'fadeIn';
            elem.innerHTML = '';
            var Fragment = document.createDocumentFragment();
            array.forEach(function (item,i) {
                var span = document.createElement("font");
                span.className='animated';
                span.classList.add(effect);
                if(delay){
                    span.style.animationDelay = delay * i + 's';
                }else{
                    span.style.animationDelay = 0.1 * i + 's';
                }
                span.innerText = item;
                Fragment.appendChild(span);
            });
            elem.style.visibility = 'visible';
            elem.appendChild(Fragment);
        },
        init:function () {
            var self = this;

            if(navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE","")) < 10){
                console.log("æ‚¨çš„æµè§ˆå™¨ç‰ˆæœ¬è¿‡ä½Žï¼Œè¯·ä¸‹è½½IE9åŠä»¥ä¸Šç‰ˆæœ¬");
                //return;
            }

            if(self.elem.length < 1){
                console.log('æ»šåŠ¨åŠ¨ç”»å¯¹è±¡é›†åˆä¸ºé›¶');
                return;
            }

            self.scrollEvent = self.scrollEvent.bind(this);

            setTimeout(function () {
                self.getPosition(); // èŽ·å–æ¯ä¸ªå…ƒç´ çš„ä½ç½®ï¼Œå­˜æ”¾åœ¨ä¸€ä¸ªæ•°ç»„ã€‚
                self.scrollEvent();

                var _scrollEvent = throttlePro(self.scrollEvent,100,300);


                document.addEventListener('scroll',_scrollEvent,false);

                // æ”¹å˜çª—å£å¤§å°ï¼Œé‡æ–°åˆå§‹åŒ–ä¸€äº›æ•°æ®
                window.onresize = function () {
                    //console.log('resize the window');
                    throttle(function () {
                        self.windowHeight = ('innerHeight' in window) ? window.innerHeight : document.documentElement.clientHeight;
                        self.getPosition();
                        self.scrollEvent();
                    })
                };
            },0);

        }
    };

    $.scrollAnimate = ScrollAnimate;

})(alan);

// å‡½æ•°æˆªæµ
function throttle(method,context){
    clearTimeout(method.tId);
    method.tId = setTimeout(function(){
        method.call(context);
    },500);
}
function throttlePro(fn, delay, mustRunDelay){
    var timer = null;
    var t_start;
    return function(){
        var context = this, args = arguments, t_curr = +new Date();
        clearTimeout(timer);
        if(!t_start){
            t_start = t_curr;
        }
        if(t_curr - t_start >= mustRunDelay){
            fn.apply(context, args);
            t_start = t_curr;
        }
        else {
            timer = setTimeout(function(){
                fn.apply(context, args);
            }, delay);
        }
    };
}


//èœå•æ·»åŠ æ¿€æ´»æ¡
(function($) {
    $.fn.lavaLamp = function(o) {
        o = $.extend({
            fx: "linear",
            speed: 500,
            li:'li',
            click: function() {}
        }, o || {});
        return this.each(function() {
            var b = $(this),
                noop = function() {},
                $back = $('<div class="back"><div></div></div>').appendTo(b),
                $li = $(o.li, this),
                curr = $("li.on", this)[0] || $($li[0]).addClass("on")[0];
            $li.not(".back").hover(function() {
                move(this)
            }, noop);
            $(this).hover(noop, function() {
                move(curr)
            });
            $li.click(function(e) {
                setCurr(this);
                return o.click.apply(this, [e, this])
            });
            setCurr(curr);

            function setCurr(a) {
                $back.css({
                    "left": a.offsetLeft + "px",
                    "width": a.offsetWidth + "px"
                });
                curr = a
            }

            function move(a) {
                $back.each(function() {
                    $(this).dequeue()
                }).animate({
                    width: a.offsetWidth,
                    left: a.offsetLeft
                }, o.speed, o.fx)
            }
        })
    }
})(jQuery);


// æ–°é—»æ ‡é¢˜æ»šåŠ¨æ•ˆæžœ
;(function ($) {
    var Marqueen = function (opt) {
        this.opt = opt || {};
        this.elem = document.querySelector(this.opt.className);

        if(!this.elem){
            console.log('æ‰¾ä¸åˆ°éœ€è¦æ»šåŠ¨çš„å¯¹è±¡å…ƒç´ ');
            return;
        }

        this.speed = this.opt.speed || 20;
        this.isStep = this.opt.isStep;
        this.ul = this.elem.querySelector('ul');
        this.liHeight = this.elem.querySelector('li').offsetHeight;
        this.ulHeight = this.ul.offsetHeight *  -1;
        this.y = 0;
        this.interval = null;
        this.timeout = null;
        this.reg=/\-?[0-9]+/g;
        //this.reg2=/\-?[0-9]+\.?[0-9]*/g;  //å¯èƒ½åŒ…å«å°æ•°ç‚¹çš„
        this.init();
    };
    Marqueen.prototype = {
        move:function () {
            var self = this;
            self.y --;
            self.ul.style.webkitTransform='translateY('+self.y+'px)';
            var nowY = self.ul.style.webkitTransform.match(self.reg)[0];

            if(self.isStep && ((-nowY) % (-self.liHeight) ===0)){
                clearInterval(self.interval);
                self.interval = null;
                self.timeout = setTimeout(function(){
                    self.interval = setInterval(self.move,self.speed);
                },2000);
            }


            if(nowY == self.ulHeight){
                self.y = 0;
                self.ul.style.transform='translateY(0px)';

            }

        },
        init:function () {
            var self = this;


            self.move = self.move.bind(self);
            self.ul.innerHTML += self.ul.innerHTML;
            self.interval = setInterval(self.move,self.speed);

            self.elem.onmouseover = function(){
                clearInterval(self.interval);
                self.interval = null;
                clearTimeout(self.timeout);
            };
            self.elem.onmouseout = function(){
                if(self.interval == null){
                    self.interval = setInterval(self.move,self.speed)
                }
            };
            console.log(88)

        }
    };
    $.Marqueen = Marqueen;
})(alan);

// ç‹¬ç«‹å‡ºæ¥çš„æ–‡å­—å±•ç¤ºæ•ˆæžœï¼Œç»å¸¸è¿ç”¨åœ¨è½®æ’­æ•ˆæžœçš„å›žè°ƒå‡½æ•°é‡Œã€‚
function font_effect(elems) {
    [].slice.call(elems).forEach(function (elem) {
        elem.style.visibility = 'visible';
        var array = elem.getAttribute('data-text').split('');
        var delay = elem.getAttribute('data-delay');
        var effect = elem.getAttribute('data-effect') || 'fadeIn';
        elem.innerHTML = '';
        var Fragment = document.createDocumentFragment();
        array.forEach(function (item,i) {
            var span = document.createElement("font");
            span.className='animated';
            span.classList.add(effect);
            if(delay){
                span.style.animationDelay = delay * i + 's';
            }else{
                span.style.animationDelay = 0.1 * i + 's';
            }
            span.innerText = item;
            Fragment.appendChild(span);
        });
        elem.style.visibility = 'visible';
        elem.appendChild(Fragment);
    })
}


function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

/*

 var ScrollBar = new alan.ScrollBar({
    elem:'.scroll-box',
    showBar:true,
    direction:vertical,landscape
 });

*/



// è‡ªå®šä¹‰æ»šåŠ¨æ¡
(function($,$$){
    function ScrollBar(opt){
        this.opt = opt || {};
        this.speed = this.opt.speed || 20;
        this.direction = this.opt.direction || 'vertical';          // é»˜è®¤ä¸ºåž‚ç›´
        this.scrollBox = document.querySelector(this.opt.elem);     // æ»šåŠ¨ä¸»å®¹å™¨

        // å®¹å™¨çš„é«˜åº¦  å¦‚æžœæ»šåŠ¨æ–¹å‘æ˜¯æ°´å¹³çš„ï¼Œå°±å–å®¹å™¨çš„å®½åº¦
        this.scrollBoxHeight = (this.direction == 'vertical') ? this.scrollBox.offsetHeight : this.scrollBox.offsetWidth;

        // æ˜¯å¦æ˜¾ç¤º è‡ªå®šä¹‰çš„æ»šåŠ¨æ¡
        if(this.opt.showBar){
            this.scrollBar = this.scrollBox.querySelector('.scroll-bar');
            this.scrollBtn = this.scrollBox.querySelector('.scroll-btn');

            this.scrollBtnHeight = this.scrollBtn.offsetHeight;         // æŒ‰é’®çš„é«˜åº¦
            this.scrollBarHeight = this.scrollBar.offsetHeight;         // æ»šåŠ¨æ¡çš„é«˜åº¦

            this.MAXDIS = this.scrollBarHeight - this.scrollBtnHeight;  // å¯æ‹–åŠ¨æœ€å¤§è·ç¦»
            this.scrollBarPosition = this.scrollBar.getBoundingClientRect().top; // æ»šåŠ¨æ¡åŸºäºŽæ–‡æ¡£çš„Yè·ç¦»
        }

        this.scrollCon = this.scrollBox.querySelector('.scroll-con');

        // æ–‡ç« å¯ä»¥æ»šåŠ¨å†…å®¹é«˜åº¦ or å®½åº¦
        if(this.direction == 'vertical'){
            this.scrollConHeight = this.scrollCon.scrollHeight - this.scrollBoxHeight;
        }else{
            this.scrollConHeight = this.scrollCon.scrollWidth - this.scrollBoxHeight;
        }


        this.mouseClickPosition;                                    // é¼ æ ‡ç‚¹å‡»åœ¨æŒ‰é’®çš„è·ç¦»
        this.init();
    }
    ScrollBar.prototype = {
        scrollTheBox:function(dis){

            var self = this;
            var _scrollTop = dis * self.scrollConHeight / self.MAXDIS;

            if(self.direction == 'vertical'){
                self.scrollCon.scrollTop = _scrollTop;
            }

            if(self.direction == 'landscape'){
                self.scrollCon.scrollLeft = _scrollTop;
            }

        },
        makeBtnMove:function(scrollDis){
            var self = this;
            if(!self.opt.showBar){
                return;  // å¦‚æžœä¸æ˜¾ç¤ºæ»šåŠ¨æ¡ï¼Œç›´æŽ¥è·³å‡ºã€‚
            }

            var _moveY = scrollDis * self.MAXDIS / self.scrollConHeight;

            if(self.direction == 'vertical'){
                self.scrollBtn.style.top = _moveY + 'px';
            }

            if(self.direction == 'landscape'){
                self.scrollBtn.style.left = _moveY + 'px';
            }

        },
        mouseMoveEvent:function(event){
            var self = this;
            var dis = event.clientY - self.scrollBarPosition - self.mouseClickPosition;

            // é™åˆ¶èŒƒå›´
            dis > self.MAXDIS && (dis = self.MAXDIS);
            dis < 0 && (dis = 0);

            self.scrollBtn.style.top = dis + 'px';

            self.scrollTheBox(dis);
        },
        mouseUpEvent:function(event){
            var self = this;
            self.scrollCon.classList.remove('scrolling');
            document.removeEventListener('mousemove',self._MoveEvent,false);
            document.removeEventListener('mouseup',self._UpEvent,false);

        },
        wheelEvent:function(event){
            var self = this;
            var e = event || window.event;

            e.preventDefault();
            e.stopPropagation();

            var deltaY = e.deltaY * -30  ||    // wheel äº‹ä»¶
                e.wheelDeltaY/4 ||    // mousewheel äº‹ä»¶  chrome
                (e.wheelDeltaY === undefined &&    // å¦‚æžœæ²¡æœ‰2Då±žæ€§
                    e.wheelDelta/4) ||    // é‚£ä¹ˆå°±ç”¨1Dçš„æ»šè½®å±žæ€§
                e.detail * -10 ||    // firefoxçš„DOMMouseScrolläº‹ä»¶
                0 ;     // å±žæ€§æœªå®šä¹‰
            if ($.isMacWebkit) {
                deltaY /= 30;
            }

            if ($.isFirefox && e.type !== "DOMMouseScroll") {
                self.scrollCon.removeEventListener('DOMMouseScroll',self._wheelEvent,false);
            }



            if(self.direction == 'vertical' && !e.ctrlKey){
                if(deltaY > 0){
                    self.scrollCon.scrollTop -= self.speed;
                }else{
                    self.scrollCon.scrollTop += self.speed;
                }
                self.makeBtnMove(self.scrollCon.scrollTop);
            }


            if(self.direction == 'landscape' && !e.ctrlKey){
                if(deltaY > 0){
                    //self.scrollCon.scrollLeft -= self.speed;

                    $$(self.scrollCon).stop().animate({
                        scrollLeft : self.scrollCon.scrollLeft - self.speed
                    },500,'linear');
                }else{
                    //self.scrollCon.scrollLeft += self.speed;

                    $$(self.scrollCon).stop().animate({
                        scrollLeft : self.scrollCon.scrollLeft + self.speed
                    },500,'linear');
                }
                self.makeBtnMove(self.scrollCon.scrollLeft);
            }

        },
        init:function(){
            this._MoveEvent = this.mouseMoveEvent.bind(this);
            this._UpEvent = this.mouseUpEvent.bind(this);
            this._wheelEvent = this.wheelEvent.bind(this);

            var self = this;


            if(self.opt.showBar){
                // æ‹–åŠ¨æ»šè½®çš„äº‹ä»¶
                self.scrollBtn.onmousedown = function(event){
                    var e = event || window.event;

                    // æ¯æ¬¡ç‚¹å‡»éƒ½èŽ·å–ä¸€æ¬¡æŒ‰é’®ä½ç½®ï¼Œä»¥å¾—åˆ°é¼ æ ‡ä¸ŽæŒ‰é’®é¡¶éƒ¨çš„è·ç¦»
                    var scrollBtnPosition = this.offsetTop;
                    self.mouseClickPosition = e.clientY - self.scrollBarPosition - scrollBtnPosition;

                    self.scrollCon.classList.add('scrolling'); // é˜²æ­¢æ‹–åŠ¨çš„æ—¶å€™é€‰ä¸­æ–‡å­—

                    document.addEventListener('mousemove',self._MoveEvent,false);
                    document.addEventListener('mouseup',self._UpEvent,false);
                };
            }



            // ç›‘å¬é¼ æ ‡æ»šè½®çš„äº‹ä»¶
            self.scrollCon.addEventListener('mousewheel',self._wheelEvent,false);

            if ($.isFirefox) {
                self.scrollCon.addEventListener('DOMMouseScroll',self._wheelEvent,false);
            }
        }
    };
    $.ScrollBar = ScrollBar;
})(alan,jQuery);






// å¼¹çª—
var sharonTips = {
    toast:function(message) {
        var toast = document.createElement('div');
        toast.className = 'sharonTips-toast anim-bounceInOut';
        toast.innerHTML = message;
        document.body.appendChild(toast);
        toast.style.marginLeft = -parseInt(toast.offsetWidth/2) + 'px';

        toast.addEventListener('webkitAnimationEnd', function() {
            toast.parentNode && toast.parentNode.removeChild(toast);
        });
    },
    createBox:function(exclusiveClass,opt){
        sharonTips.createShade();

        // å¼¹çª—
        var sharonTipBox = document.createElement('div');
        sharonTipBox.className = exclusiveClass +' sharonTips anim-bounceIn';

        // æ ‡é¢˜
        var titleTxt = opt.title || 'ä¿¡æ¯';
        var title = '<div class="sharonTips-title">'+titleTxt+'</div>';
        sharonTipBox.innerHTML = title;


        // å†…å®¹
        var content = document.createElement('div');
        content.className = 'sharonTips-content';

        // è¯´æ˜Žæ˜¯è¯¢é—®å¼¹çª—
        if(exclusiveClass === 'sharonTips-confirm'){
            opt.message && (content.innerHTML = opt.message);
        }

        // è¯´æ˜Žæ˜¯è¾“å…¥å¼¹çª—
        if (exclusiveClass === 'sharonTips-prompt') {
            var _input = document.createElement('input');
            if (opt.inputType) {
                _input.type = opt.inputType;
            }else{
                _input.type = 'text';
                _input.value = '';
            }
            content.appendChild(_input);
        }

        // è¯´æ˜Žæ˜¯æ™®é€šå¼¹çª—
        if (exclusiveClass === 'sharonTips-alert') {

            content.innerHTML = opt.html;
        }

        sharonTipBox.appendChild(content);

        // å…³é—­æŒ‰é’®
        var closeBtn = '<span class="sharonTips-closeBtn"><a class="sharonTips-close" href="javascript:;"></a></span>';
        sharonTipBox.innerHTML += closeBtn;

        // æ“ä½œæŒ‰é’®
        if(opt.btn){
            var yesBtn = opt.btn[0] || 'ç¡®å®š';
            var noBtn = opt.btn[1] || 'å–æ¶ˆ';
            var btn = '<div class="sharonTips-btn"><a class="yesBtn">'+yesBtn+'</a><a class="noBtn">'+noBtn+'</a></div>';
            sharonTipBox.innerHTML += btn;
        }

        // ä½ç½®
        document.body.appendChild(sharonTipBox);
        if(opt.width){
            sharonTipBox.style.width = opt.width + 'px';
            sharonTipBox.style.marginLeft = -(opt.width / 2) + 'px';
        }

        sharonTipBox.style.marginTop = -parseInt(sharonTipBox.offsetHeight/2) + 'px';

        // äº‹ä»¶

        sharonTipBox.addEventListener('click',function(event){
            var elem = event.target;
            if(elem.classList.contains('yesBtn')){

                if (exclusiveClass === 'sharonTips-prompt') {
                    // è¾“å…¥å¼¹çª—éœ€è¦éªŒè¯
                    var _val = sharonTipBox.querySelector('input').value;
                    if(_val && opt.Reg.test(_val)){
                        sharonTips.closeSharonTips(elem);
                        opt.yes && opt.yes();
                        return true;
                    }else{
                        sharonTips.toast('è¾“å…¥æ ¼å¼ä¸æ­£ç¡®ï¼');
                    }
                    return false;
                }

                sharonTips.closeSharonTips(elem);
                opt.yes && opt.yes();
            }
            if(elem.classList.contains('noBtn')){

                sharonTips.closeSharonTips(elem);
                opt.no && opt.no();
            }
            if(elem.classList.contains('sharonTips-close')){
                sharonTips.closeSharonTips(elem);
                opt.close && opt.close();
            }
            event.preventDefault();
            event.stopPropagation();
        });
    },
    confirm:function(opt){
        sharonTips.createBox('sharonTips-confirm',opt);
    },
    prompt:function(opt){
        sharonTips.createBox('sharonTips-prompt',opt);
    },
    alert:function(opt){
        sharonTips.createBox('sharonTips-alert',opt);
    },
    closeSharonTips:function(elem){
        //å…³é—­çª—å£
        var SharonTips = elem.parentNode;
        while (!SharonTips.classList.contains('sharonTips')) {
            SharonTips = SharonTips.parentNode;
        }
        SharonTips.parentNode && SharonTips.parentNode.removeChild(SharonTips);

        sharonTips.removeShade();
    },
    createShade:function(){
        // åˆ›å»ºé®ç½©
        if(!document.querySelector('.sharonTips-shade')){
            var shade = document.createElement('div');
            shade.className = 'sharonTips-shade';
            document.body.appendChild(shade);
        }
    },
    removeShade:function(){
        // å…³é—­é®ç½©
        var shade = document.querySelector('.sharonTips-shade');
        shade && shade.parentNode && shade.parentNode.removeChild(shade);
    }
};


// MAIN SECTOR HOVER GRADIENT
function main_hover_gradient(elem){

    var x, y, xy, radialGradientWebKit, radialGradient;
    var lightColor ="88,159,195";
    var gradientSize = 300;
    var bg = "#364975";

    if($(window).width() > 960) {

        elem.on({
            mousemove : function(e) {
                x  = e.pageX - $(this).offset().left;
                y  = e.pageY - $(this).offset().top;
                xy = x + " " + y;

                radialGradientWebKit = "-webkit-gradient(radial, " + xy + ", 0, " + xy + ", "+gradientSize+", from(rgba("+lightColor+",0.8)), to(rgba("+lightColor+",0.0))), " + bg;
                //radialGradient = "radial-gradient(" + x + "px " + y + "px 45deg, circle, " + lightColor + " 0%, " + bg+ " " + gradientSize + "px)";

                $(this).css({ background: radialGradientWebKit });
                //$(this).css({ background: radialGradient });
            },
            mouseleave : function() {
                $(this).css('background','#fff');
            }
        });

    }

}



// è§†é¢‘æ’­æ”¾æŒ‰é’®  åœ¨æŒ‰é’®å…ƒç´ åŠ ä¸Š data-video='id'
function playPause(btn) {
    var id = btn.dataset.video;
    var video = document.getElementById(id);

    if(btn.dataset.hide == 'true'){
        btn.classList.add('hide');
    }

    if (video.paused){
        video.play();
        video.controls = true;
    }else{
        video.pause();
        video.controls = false;
    }
}

// è¦†ç›–åŽå°ç¼–è¾‘å·¥å…·å¼ºåˆ¶åŠ ç»™imgçš„æ ·å¼
// $(function () {
//     if($(window).width() < 800){
//         $('.news-box').find('img').height('auto').css('max-width','100%');
//     }
// });


var fullscreenElement = document.fullscreenElement || document.mozFullscreenElement || document.webkitFullscreenElement;
var fullscreenEnabled = document.fullscreenEnabled || document.mozFullscreenEnabled || document.webkitFullscreenEnabled;

// è§†é¢‘å…¨å±äº‹ä»¶
function launchFullScreen(element) {
    if(element.requestFullscreen) {
        element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

function makeVideoFull(elem,videoWidth,videoHeight) {
    var _w = $(window).width();
    var _h = $(window).height();
    if( _w/_h > videoWidth/videoHeight ) {
        elem.css({
            width: _w,
            height: videoHeight * _w / videoWidth,
            marginTop: 0 - (videoHeight * _w / videoWidth - _h) / 2
        });
    }else {
        elem.css({
            height: _h,
            width: videoWidth * _h / videoHeight,
            marginLeft: 0 - (videoWidth * _h / videoHeight - _w) / 2
        });
    }
}

function goTop() {
    $('html,body').animate({scrollTop:0},500);
}

// 判断是本地开发环境还是线上环境 需要做的事情
(function () {

    // 本地
    if(window.location.host.indexOf("0.0.0.0") >= 0 || window.location.host.indexOf("localhost") >= 0){
        var href = window.location.href;
        var a = document.querySelectorAll('.nav-ul .nav-li > a');
        if(!a || a.length <= 0){
            return;
        }

        [].slice.call(a).forEach(function (o) {
            var curr = o.getAttribute('href');
            if(href.indexOf(curr) > 0){
                o.parentNode.classList.add('current');
            }
        });

        document.title = document.body.getAttribute('data-title');
        console.log('当前是本地环境！')
    }else{

        // 线上
        var ul = document.querySelector('.nav-ul');
        if(ul){
            var _index = parseInt(ul.dataset.current);
            var navs = ul.querySelectorAll('.nav-li');
            for(var i = 0;i < navs.length;i++){
                if(_index === i){
                    navs[i].classList.add('current');
                }
            }
        }
    }

})();




// 跟随鼠标运动的线条
function move_line() {
    // mask
    var _current = 1;
    var _delay = void 0;
    var _delayTime = 120;
    var _padd = 150;
    var ul_offset = $('.nav-ul').offset().left;


    $('.nav-ul .nav-li').on('mouseenter',function() {
        _delay && clearTimeout(_delay);

        var _current2 = $(this).index();

        var _left = $(this).offset().left - ul_offset;
        var _width = $(this).outerWidth();
        var _right = $('.nav-ul').outerWidth() - _left - _width;
        if(_current2<_current) {
            $('.move-line').css({
                left: _left
            });
            _delay = setTimeout(function() {
                $('.move-line').css({
                    right: _right
                })
            },_delayTime);
        }else{
            $('.move-line').css({
                right: _right
            });
            _delay = setTimeout(function() {
                $('.move-line').css({
                    left: _left
                })
            },_delayTime);
        }
        _current = _current2;
    });

}

(function( $ ){
    'use strict';
    $.fn.toTop = function(opt){
        var elem = this;
        var doc = $('html, body');
        var options = $.extend({
            autoHide: true,
            offset: 420,
            speed: 500,
            position: true,
            right: 15,
            bottom: 30
        }, opt);
        elem.css({
            'cursor': 'pointer'
        });
        if(options.autohide){
            elem.css('display', 'none');
        }
        if(options.position){
            elem.css({
                'position': 'fixed',
                'right': options.right,
                'bottom': options.bottom
            });
        }
        elem.click(function(){
            doc.animate({scrollTop: 0}, options.speed);
        });
        $(window).scroll(function(){  //绐楀彛婊氬姩鏃惰Е鍙戜簨浠�
            var scrolling = $(window).scrollTop();

            if(options.autohide){  //濡傛灉鑷姩闅愯棌涓簍rue锛屽垯褰撴粴鍔ㄩ珮搴﹀皬浜�420鐨勬椂鍊欙紝灏遍殣钘廡OP
                if(scrolling > options.offset){
                    elem.fadeIn(options.speed);
                }
                else elem.fadeOut(options.speed);
            }
        });
    };
})(jQuery);



/*
* 常用的js插件都直接放在这里，减少请求 方便引用
*
* */


/**
 * 绘制SVG-path路径的动画插件
 * segment - A little JavaScript class (without dependencies) to draw and animate SVG path strokes
 * @version v1.0.8
 * @link https://github.com/lmgonzalves/segment
 * @license MIT
 */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('9 S(i,e,t,n){4.K=i,4.7=i.W(),4.K.P.1e=2*4.7,4.5="F"!=x e?4.k(e):0,4.6="F"!=x t?4.k(t):4.7,4.8="F"!=x n?n:!1,4.y=p,4.B=p,4.v(4.5,4.6,0,{8:4.8})}!9(){Y(f i=0,e=["18","19","1d","o"],t=0;t<e.7&&!b.z;++t)b.z=b[e[t]+"Z"],b.A=b[e[t]+"12"]||b[e[t]+"17"];b.z||(b.z=9(e,t){f n=(G I).1g(),s=1f.V(0,16-(n-i)),h=b.R(9(){e(n+s)},s);j i=n+s,h}),b.A||(b.A=9(i){Q(i)})}(),S.11={v:9(i,e,t,n){w(4.8=n&&n.E("8")?n.8:!1,t){f s=n&&n.E("J")?O*m(n.J):0,h=n&&n.E("U")?n.U:p,r=n&&n.E("M")?n.M:p,a=4;w(4.N(),s)j X n.J,4.y=R(9(){a.v(i,e,t,n)},s),4.y;f l=G I,o=4.5,g=4.6,c=4.k(i),u=4.k(e);!9 d(){f i=G I,e=(i-l)/O,n=e/m(t),s=n;j"9"==x h&&(s=h(s)),n>1?s=1:a.B=b.z(d),a.5=o+(c-o)*s,a.6=g+(u-g)*s,a.5=a.5<0&&!a.8?0:a.5,a.5=a.5>a.7&&!a.8?a.7:a.5,a.6=a.6<0&&!a.8?0:a.6,a.6=a.6>a.7&&!a.8?a.7:a.6,a.6-a.5<=a.7&&a.6-a.5>0?a.v(a.5,a.6,0,{8:a.8}):a.8&&a.6-a.5>a.7?a.v(0,a.7,0,{8:a.8}):a.v(a.5+(a.6-a.5),a.6-(a.6-a.5),0,{8:a.8}),n>1&&"9"==x r?r.13(a):14 0}()}15 4.K.P.H=4.H(i,e)},H:9(i,e){w(4.5=4.k(i),4.6=4.k(e),4.8){f t=4.5>4.6||4.5<0&&4.5<-1*4.7?D(4.5/D(4.7)):D(4.6/D(4.7));0!==t&&(4.5=4.5-4.7*t,4.6=4.6-4.7*t)}w(4.6>4.7){f n=4.6-4.7;j[4.7,4.7,n,4.5-n,4.6-4.5].C(" ")}w(4.5<0){f s=4.7+4.5;j 4.6<0?[4.7,4.7+4.5,4.6-4.5,s-4.6,4.6-4.5,4.7].C(" "):[4.7,4.7+4.5,4.6-4.5,s-4.6,4.7].C(" ")}j[4.7,4.7+4.5,4.6-4.5].C(" ")},k:9(i){f e=m(i);w(("1a"==x i||i 1b 1c)&&~i.L("%")){f t;~i.L("+")?(t=i.T("+"),e=4.q(t[0])+m(t[1])):~i.L("-")?(t=i.T("-"),e=3===t.7?-4.q(t[1])-m(t[2]):t[0]?4.q(t[0])-m(t[1]):-4.q(t[1])):e=4.q(i)}j e},N:9(){b.A(4.B),4.B=p,Q(4.y),4.y=p},q:9(i){j m(i)/10*4.7}};',62,79,'||||this|begin|end|length|circular|function||window||||var||||return|valueOf||parseFloat|||null|percent|||||draw|if|typeof|timer|requestAnimationFrame|cancelAnimationFrame|animationTimer|join|parseInt|hasOwnProperty|undefined|new|strokeDasharray|Date|delay|path|indexOf|callback|stop|1e3|style|clearTimeout|setTimeout|Segment|split|easing|max|getTotalLength|delete|for|RequestAnimationFrame|100|prototype|CancelAnimationFrame|call|void|else||CancelRequestAnimationFrame|ms|moz|string|instanceof|String|webkit|strokeDashoffset|Math|getTime'.split('|'),0,{}))

/**
 js 动画库 anime.js
 2017 Julian Garnier
 Released under the MIT license
 */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('12 $35$1H=1H;(8(v,p){"8"===1G 2z&&2z.5L?2z([],p):"2y"===1G 2x&&2x.2K?2x.2K=p():v.5D=p()})(1H,8(){8 v(a){13(!g.1J(a))5v{o 3k.5t(a)}5s(b){}}8 p(a){o a.2Q(8(a,d){o a.5l(g.1h(d)?p(d):d)},[])}8 w(a){13(g.1h(a))o a;g.2u(a)&&(a=v(a)||a);o a 2t 5c||a 2t 57?[].54.2F(a):[a]}8 F(a,b){o a.52(8(a){o a===b})}8 A(a){12 b={},d;18(d 1g a)b[d]=a[d];o b}8 G(a,b){12 d=A(a),c;18(c 1g a)d[c]=b.2r(c)?b[c]:a[c];o d}8 B(a,b){12 d=A(a),c;18(c 1g b)d[c]=g.1D(a[c])?b[c]:a[c];o d}8 S(a){a=a.2p(/^#?([a-f\\d])([a-f\\d])([a-f\\d])$/i,8(a,b,d,h){o b+b+d+d+h+h});12 b=/^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.1A(a);a=1x(b[1],16);12 d=1x(b[2],16),b=1x(b[3],16);o"1u("+a+","+d+","+b+")"}8 T(a){8 b(a,b,c){0>c&&(c+=1);1<c&&--c;o c<1/6?a+6*(b-a)*c:.5>c?b:c<2/3?a+(b-a)*(2/3-c)*6:a}12 d=/1z\\((\\d+),\\s*([\\d.]+)%,\\s*([\\d.]+)%\\)/g.1A(a);a=1x(d[1])/4Y;12 c=1x(d[2])/1B,d=1x(d[3])/1B;13(0==c)c=d=a=d;1m{12 e=.5>d?d*(1+c):d+c-d*c,l=2*d-e,c=b(l,e,a+1/3),d=b(l,e,a);a=b(l,e,a-1/3)}o"1u("+2l*c+","+2l*d+","+2l*a+")"}8 x(a){13(a=/([\\+\\-]?[0-9#\\.]+)(%|2O|4Q|4L|4J|1g|4H|4F|4C|4A|4h|4g|2Y|4e|4d)?/.1A(a))o a[2]}8 U(a){13(-1<a.1o("42"))o"2O";13(-1<a.1o("3c")||-1<a.1o("3L"))o"2Y"}8 H(a,b){o g.1Q(a)?a(b.1r,b.2h,b.3n):a}8 C(a,b){13(b 1g a.1N)o 3J(a).3I(b.2p(/([a-z])([A-Z])/g,"$1-$2").3H())||"0"}8 I(a,b){13(g.1T(a)&&F(V,b))o"1k";13(g.1T(a)&&(a.2N(b)||g.27(a)&&a[b]))o"2e";13(g.1T(a)&&"1k"!==b&&C(a,b))o"2B";13(2R!=a[b])o"2y"}8 W(a,b){12 d=U(b),d=-1<b.1o("2S")?1:0+d;a=a.1N.1k;13(!a)o d;18(12 c=[],e=[],l=[],h=/(\\w+)\\((.+?)\\)/g;c=h.1A(a);)e.1w(c[1]),l.1w(c[2]);a=l.1K(8(a,c){o e[c]===b});o a.1a?a[0]:d}8 J(a,b){2c(I(a,b)){1j"1k":o W(a,b);1j"2B":o C(a,b);1j"2e":o a.2N(b)}o a[b]||0}8 K(a,b){12 d=/^(\\*=|\\+=|-=)/.1A(a);13(!d)o a;b=1L(b);a=1L(a.2p(d[0],""));2c(d[0][0]){1j"+":o b+a;1j"-":o b-a;1j"*":o b*a}}8 D(a){o g.1M(a)&&a.2r("2b")}8 X(a,b){8 d(c){c=1l 0===c?0:c;o a.37.3G(1<=b+c?b+c:0)}12 c=d(),e=d(-1),l=d(1);2c(a.1O){1j"x":o c.x;1j"y":o c.y;1j"3F":o 3E*17.3D(l.y-e.y,l.x-e.x)/17.2i}}8 L(a,b){12 d=/-?\\d*\\.?\\d+/g;a=D(a)?a.2b:a;13(g.1J(a))b=g.1u(a)?a:g.2k(a)?S(a):g.1z(a)?T(a):1l 0;1m{12 c=x(a);a=c?a.3C(0,a.1a-c.1a):a;b=b?a+b:a}b+="";o{2q:b,2s:b.3p(d)?b.3p(d).1d(3B):[0],3t:b.2w(d)}}8 Y(a,b){o b.2Q(8(b,c,e){o b+a[e-1]+c})}8 M(a){o(a?p(g.1h(a)?a.1d(w):w(a)):[]).1K(8(a,d,c){o c.1o(a)===d})}8 Z(a){12 b=M(a);o b.1d(8(a,c){o{1r:a,2h:c,3n:b.1a}})}8 2D(a,b){12 d=A(b);13(g.1h(a)){12 c=a.1a;2!==c||g.1M(a[0])?g.1Q(b.14)||(d.14=b.14/c):a={1R:a}}o w(a).1d(8(a,c){c=c?0:b.1c;a=g.1M(a)&&!D(a)?a:{1R:a};g.1D(a.1c)&&(a.1c=c);o a}).1d(8(a){o B(a,d)})}8 2H(a,b){12 d={},c;18(c 1g a){12 e=H(a[c],b);g.1h(e)&&(e=e.1d(8(a){o H(a,b)}),1===e.1a&&(e=e[0]));d[c]=e}d.14=1L(d.14);d.1c=1L(d.1c);o d}8 2I(a){o g.1h(a)?y.2a(1H,a):N[a]}8 2L(a,b){12 d;o a.1I.1d(8(c){c=2H(c,b);12 e=c.1R,l=J(b.1r,a.1U),h=d?d.1V.2q:l,h=g.1h(e)?e[0]:h,m=K(g.1h(e)?e[1]:e,h),l=x(m)||x(h)||x(l);c.1s=D(e);c.26=L(h,l);c.1V=L(m,l);c.2f=d?d.1W:a.1i;c.1W=c.2f+c.1c+c.14;c.1X=2I(c.1X);c.1Y=(2j-17.1Z(17.20(c.1Y,1),3A))/2j;g.1J(c.26.2q)&&(c.1f=1);o d=c})}8 2X(a,b){o p(a.1d(8(a){o b.1d(8(b){12 c=I(a.1r,b.1U);13(c){12 d=2L(b,a);b={1n:c,1O:b.1U,2m:a,1I:d,14:d[d.1a-1].1W,1c:d[0].1c}}1m b=1l 0;o b})})).1K(8(a){o!g.1D(a)})}8 O(a,b,d){12 c="1c"===a?17.1Z:17.20;o b.1a?c.2a(17,b.1d(8(b){o b[a]})):d[a]}8 31(a){12 b=G(j,a),d=G(33,a),c=Z(a.34),e=[],g=B(b,d),h;18(h 1g a)g.2r(h)||"34"===h||e.1w({1U:h,1i:g.1i,1I:2D(a[h],d)});a=2X(c,e);o B(b,{1p:[],3h:c,2n:a,14:O("14",a,d),1c:O("1c",a,d)})}8 n(a){8 b(){o 36.2o&&38 2o(8(a){o Q=a})}8 d(a){o f.1q?f.14-a:a}8 c(a){18(12 b=0,c={},d=f.2n,e={};b<d.1a;){12 g=d[b],h=g.2m,m=g.1I;e.1b=m.1K(8(b){o a<b.1W})[0]||m[m.1a-1];e.1s$1=e.1b.1s;e.1f=e.1b.1f;e.21=e.1b.1X(17.1Z(17.20(a-e.1b.2f-e.1b.1c,0),e.1b.14)/e.1b.14,e.1b.1Y);m=Y(e.1b.1V.2s.1d(8(a){o 8(b,c){c=a.1s$1?0:a.1b.26.2s[c];b=c+a.21*(b-c);a.1s$1&&(b=X(a.1b.1R,b));a.1f&&(b=17.1f(b*a.1f)/a.1f);o b}}(e)),e.1b.1V.3t);3e[g.1n](h.1r,g.1O,m,c,h.2h);g.3z=m;b++;e={1s$1:e.1s$1,1b:e.1b,21:e.21,1f:e.1f}}13(c)18(12 k 1g c)E||(E=C(3k.3y,"1k")?"1k":"-4I-1k"),f.3h[k].1r.1N[E]=c[k].3x(" ");f.1v=a;f.3m=a/f.14*1B}8 e(a){13(f[a])f[a](f)}8 g(){f.1C&&!0!==f.1C&&f.1C--}8 h(a){12 h=f.14,l=f.1i,n=f.1c,P=f.1v,q=f.1q,r=d(a),r=17.1Z(17.20(r,0),h);13(f.1p){12 p=f.1p;13(r>=f.1v)18(12 u=0;u<p.1a;u++)p[u].1t(r);1m 18(u=p.1a;u--;)p[u].1t(r)}r>l&&r<h?(c(r),!f.1y&&r>=n&&(f.1y=!0,e("3r")),e("3s")):(r<=l&&0!==P&&(c(0),q&&g()),r>=h&&P!==h&&(c(h),q||g()));a>=h&&(f.1C?(t=m,"3u"===f.2A&&(f.1q=!f.1q)):(f.1F(),"2o"1g 36&&(Q(),R=b()),f.24||(f.24=!0,e("3i"))),k=0);e("3f")}a=1l 0===a?{}:a;12 m,t,k=0,Q=2R,R=b(),f=31(a);f.1E=8(){12 a=f.2A,b=f.3q;f.1v=0;f.3m=0;f.1P=!0;f.1y=!1;f.24=!1;f.1q="3j"===a;f.1C="3u"===a&&1===b?2:b;18(a=f.1p.1a;a--;)b=f.1p[a],b.1t(b.1i),b.1E()};f.3g=8(a){m=a;t||(t=m);h((k+m-t)*n.3d)};f.1t=8(a){h(d(a))};f.1F=8(){12 a=q.1o(f);-1<a&&q.3a(a,1);f.1P=!0};f.29=8(){f.1P&&(f.1P=!1,t=0,k=d(f.1v),q.1w(f),z||2C())};f.3j=8(){f.1q=!f.1q;t=0;k=d(f.1v)};f.3v=8(){f.1F();f.1E();f.29()};f.3K=R;f.1E();f.1S&&f.29();o f}12 j={3f:1l 0,3r:1l 0,3s:1l 0,3i:1l 0,3q:1,2A:"3M",1S:!0,1i:0},33={14:2j,1c:0,1X:"3N",1Y:3O,1f:0},V="3P 3Q 3R 3c 3S 3T 3U 2S 3V 3W 3X 3Y 3Z".2w(" "),E,g={1h:8(a){o 40.41(a)},1M:8(a){o-1<3b.43.48.2F(a).1o("3b")},27:8(a){o a 2t 49},1T:8(a){o a.4a||g.27(a)},2u:8(a){o"4b"===1G a},1Q:8(a){o"8"===1G a},1D:8(a){o"4c"===1G a},2k:8(a){o/(^#[0-30-F]{6}$)|(^#[0-30-F]{3}$)/i.2d(a)},1u:8(a){o/^1u/.2d(a)},1z:8(a){o/^1z/.2d(a)},1J:8(a){o g.2k(a)||g.1u(a)||g.1z(a)}},y=8(){8 a(a,d,c){o(((1-3*c+3*d)*a+(3*c-6*d))*a+3*d)*a}o 8(b,d,c,e){13(0<=b&&1>=b&&0<=c&&1>=c){12 g=38 4f(11);13(b!==d||c!==e)18(12 h=0;11>h;++h)g[h]=a(.1*h,b,c);o 8(h){13(b===d&&c===e)o h;13(0===h)o 0;13(1===h)o 1;18(12 m=0,k=1;10!==k&&g[k]<=h;++k)m+=.1;--k;12 k=m+(h-g[k])/(g[k+1]-g[k])*.1,l=3*(1-3*c+3*b)*k*k+2*(3*c-6*b)*k+3*b;13(.4i<=l){18(m=0;4>m;++m){l=3*(1-3*c+3*b)*k*k+2*(3*c-6*b)*k+3*b;13(0===l)4j;12 n=a(k,b,c)-h,k=k-n/l}h=k}1m 13(0===l)h=k;1m{12 k=m,m=m+.1,f=0;4k n=k+(m-k)/2,l=a(n,b,c)-h,0<l?m=n:k=n;4l(1e-7<17.4m(l)&&10>++f);h=n}o a(h,d,e)}}}}(),N=8(){8 a(a,b){o 0===a||1===a?a:-17.4n(2,10*(a-1))*17.4o(2*(a-1-b/(2*17.2i)*17.4p(1))*17.2i/b)}12 b="4q 4r 4s 4t 4u 4v 4w 4x 4y".2w(" "),d={4z:[[.55,.4B,.2U,.53],[.55,.4D,.4E,.19],[.4G,.2T,.3w,.22],[.4K,.2g,.4M,.4N],[.47,0,.4O,.4P],[.2P,.2g,.4R,.4S],[.6,.4T,.4U,.4V],[.6,-.28,.4W,.2M],a],4X:[[.25,.46,.45,.4Z],[.50,.51,.2J,1],[.2E,.56,.44,1],[.23,1,.32,1],[.39,.58,.59,1],[.19,1,.22,1],[.5a,.5b,.2E,1],[.3o,.5d,.32,1.5e],8(b,c){o 1-a(1-b,c)}],5f:[[.5g,.2T,.5h,.5i],[.5j,.2M,.2J,1],[.5k,0,.3o,1],[.2W,0,.5m,1],[.5n,.2g,.55,.2P],[1,0,0,1],[.5o,.5p,.15,.2W],[.2U,-.55,.5q,1.55],8(b,c){o.5>b?a(2*b,c)/2:1-a(-2*b+2,c)/2}]},c={5r:y(.25,.25,.2G,.2G)},e={},l;18(l 1g d)e.1n=l,d[e.1n].2v(8(a){o 8(d,e){c["5u"+a.1n+b[e]]=g.1Q(d)?d:y.2a($35$1H,d)}}(e)),e={1n:e.1n};o c}(),3e={2B:8(a,b,d){o a.1N[b]=d},2e:8(a,b,d){o a.2Z(b,d)},2y:8(a,b,d){o a[b]=d},1k:8(a,b,d,c,e){c[e]||(c[e]=[]);c[e].1w(b+"("+d+")")}},q=[],z=0,2C=8(){8 a(){z=5w(b)}8 b(b){12 c=q.1a;13(c){18(12 d=0;d<c;)q[d]&&q[d].3g(b),d++;a()}1m 5x(z),z=0}o a}();n.5y="2.0.2";n.3d=1;n.5z=q;n.5A=8(a){a=M(a);18(12 b=q.1a;b--;)18(12 d=q[b],c=d.2n,e=c.1a;e--;)F(a,c[e].2m.1r)&&(c.3a(e,1),c.1a||d.1F())};n.5B=J;n.5C=8(a,b){12 d=g.2u(a)?v(a)[0]:a,c=b||1B;o 8(a){o{37:d,1O:a,2b:d.2V()*(c/1B)}}};n.5E=8(a){12 b=a.2V();a.2Z("5F-5G",b);o b};n.5H=y;n.5I=N;n.5J=8(a){12 b=n(a);b.1F();b.14=0;b.5K=8(a){b.1p.2v(8(a){a.1y=!0;a.24=!0});w(a).2v(8(a){12 c=b.14,d=a.1i;a.1S=!1;a.1i=g.1D(d)?c:K(d,c);b.1t(a.1i);a=n(a);a.14>c&&(b.14=a.14);a.1y=!0;b.1p.1w(a)});b.1E();b.1t(0);b.1S&&b.3v();o b};o b};n.3l=8(a,b){o 17.5M(17.3l()*(b-a+1))+a};o n});',62,359,'||||||||function||||||||||||||||return||||||||||||||||||||||||||||||||||||||||var|if|duration|||Math|for||length|tween|delay|map||round|in|arr|offset|case|transform|void|else|type|indexOf|children|reversed|target|isPath|seek|rgb|currentTime|push|parseInt|began|hsl|exec|100|remaining|und|reset|pause|typeof|this|tweens|col|filter|parseFloat|obj|style|property|paused|fnc|value|autoplay|dom|name|to|end|easing|elasticity|min|max|eased|||completed||from|svg||play|apply|totalLength|switch|test|attribute|start|05|id|PI|1E3|hex|255|animatable|animations|Promise|replace|original|hasOwnProperty|numbers|instanceof|str|forEach|split|module|object|define|direction|css|ja|aa|165|call|75|ba|ca|355|exports|da|045|getAttribute|px|95|reduce|null|scale|03|68|getTotalLength|86|ea|deg|setAttribute|9A|fa||ha|targets|jscomp|window|el|new||splice|Object|rotate|speed|ia|update|tick|animatables|complete|reverse|document|random|progress|total|175|match|loop|begin|run|strings|alternate|restart|685|join|body|currentValue|999|Number|substr|atan2|180|angle|getPointAtLength|toLowerCase|getPropertyValue|getComputedStyle|finished|skew|normal|easeOutElastic|500|translateX|translateY|translateZ|rotateX|rotateY|rotateZ|scaleX|scaleY|scaleZ|skewX|skewY|Array|isArray|translate|prototype|||||toString|SVGElement|nodeType|string|undefined|turn|rad|Float32Array|vh|vw|001|break|do|while|abs|pow|sin|asin|Quad|Cubic|Quart|Quint|Sine|Expo|Circ|Back|Elastic|In|pc|085|ex|055|675|mm|895|cm|webkit|rem|755|em|855|06|745|715|pt|795|035|04|98|335|735|Out|360|94|215|61|some||slice||84|HTMLCollection|575|565|075|82|NodeList|885|275|InOut|455|515|955|645|77|concat|07|445|785|135|265|linear|catch|querySelectorAll|ease|try|requestAnimationFrame|cancelAnimationFrame|version|running|remove|getValue|path|anime|setDashoffset|stroke|dasharray|bezier|easings|timeline|add|amd|floor'.split('|'),0,{}))



// 平滑滚动
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('3 1F={1G:2c,1l:3g,1o:C,28:s,27:8,Y:1,26:20,1b:1,24:s,R:2f,23:s,2p:s,1v:""};3 6=1F;3 22=v;3 1d=v;3 J={x:0,y:0};3 1y=v;3 S=t.21;3 N;3 L;3 z=[C,C,C];3 u={1Z:37,1Y:38,1X:39,1W:2F,Z:32,1U:33,1R:34,1O:35,1N:36};19();5 19(){3 a=v;4(t.1L.1f("1K.1J/2J/2L")>-1){a=s}4(6.1v){3 b=6.1v.2N(/[,\\n] ?/);b.U("2a.1K.1J");1p(3 i=b.T;i--;){4(t.1L.1f(b[i])>-1){L&&L.2d();1r("1I",1u);a=s;22=s;A}}}4(a){1r("M",M)}4(6.24&&!a){P("M",M)}}5 1z(){4(!t.Q){7}3 a=t.Q;3 b=t.21;3 c=w.29;3 d=a.G;S=(t.2O.1f("2Q")>=0)?b:a;N=a;19();1y=s;4(2Y!=3a){1d=s}I{4(d>c&&(a.1c<=c||b.1c<=c)){3 e=v;3 f=5(){4(!e&&b.G!=t.16){e=s;1g(5(){b.1h.16=t.16+"2e";e=v},3h)}};b.1h.16="1S";1g(f,10);3 g={2j:s,2k:s,2l:v};L=H 1n(f);L.2n(a,g);4(S.1c<=c){3 h=t.2u("2v");h.1h.2w="2A";a.2B(h)}}}}3 E=[];3 W=v;3 X=+H O;5 1s(j,k,l,m){m||(m=1x);1E(k,l);4(6.1b!=1){3 n=+H O;3 o=n-X;4(o<6.26){3 p=(1+(30/o))/2;4(p>1){p=D.2b(p,6.1b);k*=p;l*=p}}X=+H O}E.U({x:k,y:l,1C:(k<0)?0.13:-0.13,1j:(l<0)?0.13:-0.13,F:+H O});4(W){7}3 q=(j===t.Q);3 r=5(a){3 b=+H O;3 c=0;3 d=0;1p(3 i=0;i<E.T;i++){3 e=E[i];3 f=b-e.F;3 g=(f>=6.1l);3 h=(g)?1:f/6.1l;4(6.28){h=1H(h)}3 x=(e.x*h-e.1C)>>0;3 y=(e.y*h-e.1j)>>0;c+=x;d+=y;e.1C+=x;e.1j+=y;4(g){E.2g(i,1);i--}}4(q){w.2h(c,d)}I{4(c){j.2i+=c}4(d){j.1t+=d}}4(!k&&!l){E=[]}4(E.T){1k(r,j,(m/6.1G+1))}I{W=v}};1k(r,j,0);W=s}5 1u(a){4(!1y){1z()}3 b=a.1i;3 c=1e(b);4(!c||a.1M||14(N,"17")||(14(b,"17")&&/\\.2o/i.1P(b.2q))){7 s}3 d=a.2r||0;3 e=a.2s||0;4(!d&&!e){e=a.2t||0}4(!6.23&&1Q(e)){7 s}4(D.1B(d)>1.2){d*=6.1o/C}4(D.1B(e)>1.2){e*=6.1o/C}1s(c,-d,-e);a.1D()}5 M(a){3 b=a.1i;3 c=a.2x||a.2y||a.2z||(a.1T&&a.1A!==u.Z);4(/2C|2D|2E|17/i.1P(b.1V)||b.2G||a.1M||c){7 s}4(14(b,"2H")&&a.1A===u.Z){7 s}3 d,x=0,y=0;3 e=1e(N);3 f=e.1w;4(e==t.Q){f=w.29}2I(a.1A){B u.1Y:y=-6.R;A;B u.1W:y=6.R;A;B u.Z:d=a.1T?1:-1;y=-d*f*0.9;A;B u.1U:y=-f*0.9;A;B u.1R:y=f*0.9;A;B u.1N:y=-e.1t;A;B u.1O:3 g=e.G-e.1t-f;y=(g>0)?g+10:0;A;B u.1Z:x=-6.R;A;B u.1X:x=6.R;A;2K:7 s}1s(e,x,y);a.1D()}5 1q(a){N=a.1i}3 V={};2M(5(){V={}},10*1x);3 K=(5(){3 i=0;7 5(a){7 a.K||(a.K=i++)}})();5 11(a,b){1p(3 i=a.T;i--;){V[K(a[i])]=b}7 b}5 1e(a){3 b=[];3 c=S.G;2P{3 d=V[K(a)];4(d){7 11(b,d)}b.U(a);4(c===a.G){4(!1d||S.1w+10<c){7 11(b,t.Q)}}I{4(a.1w+10<a.G){12=2R(a,"").2S("12-y");4(12==="2T"||12==="1S"){7 11(b,a)}}}}2U(a=a.2V)}5 P(a,b,c){w.2W(a,b,(c||v))}5 1r(a,b,c){w.2X(a,b,(c||v))}5 14(a,b){7(a.1V||"").25()===b.25()}5 1E(x,y){x=(x>0)?1:-1;y=(y>0)?1:-1;4(J.x!==x||J.y!==y){J.x=x;J.y=y;E=[];X=0}}3 2Z;5 1Q(a){4(!a){7}a=D.1B(a);z.U(a);z.31();3 b=(z[0]==z[1]&&z[1]==z[2]);3 c=(15(z[0],C)&&15(z[1],C)&&15(z[2],C));7!(b||c)}5 15(n,a){7(D.3b(n/a)==n/a)}3 1k=(5(){7 w.3c||w.3d||5(a,b,c){w.1g(a,c||(1x/3e))}})();3 1n=w.1n||w.3f;5 1m(x){3 a,F,1a;x=x*6.27;4(x<1){a=x-(1-D.18(-x))}I{F=D.18(-1);x-=1;1a=1-D.18(-x);a=F+(1a*(1-F))}7 a*6.Y}5 1H(x){4(x>=1){7 1}4(x<=0){7 0}4(6.Y==1){6.Y/=1m(1)}7 1m(x)}P("1q",1q);P("1I",1u);P("2m",1z);',62,204,'|||var|if|function|options|return|||||||||||||||||||||true|document|key|false|window|||deltaBuffer|break|case|120|Math|que|start|scrollHeight|new|else|direction|uniqueID|observer|keydown|activeElement|Date|addEvent|body|arrowScroll|root|length|push|cache|pending|lastScroll|pulseNormalize|spacebar||setCache|overflow|99|isNodeName|isDivisible|height|embed|exp|initTest|expx|accelerationMax|offsetHeight|isFrame|overflowingAncestor|indexOf|setTimeout|style|target|lastY|requestFrame|animationTime|pulse_|MutationObserver|stepSize|for|mousedown|removeEvent|scrollArray|scrollTop|wheel|excluded|clientHeight|1000|initDone|init|keyCode|abs|lastX|preventDefault|directionCheck|defaultOptions|frameRate|pulse|mousewheel|com|google|URL|defaultPrevented|home|end|test|isTouchpad|pagedown|auto|shiftKey|pageup|nodeName|down|right|up|left||documentElement|isExcluded|touchpadSupport|keyboardSupport|toLowerCase|accelerationDelta|pulseScale|pulseAlgorithm|innerHeight|mail|min|150|disconnect|px|50|splice|scrollBy|scrollLeft|attributes|childList|characterData|load|observe|pdf|fixedBackground|src|wheelDeltaX|wheelDeltaY|wheelDelta|createElement|div|clear|ctrlKey|altKey|metaKey|both|appendChild|input|textarea|select|40|isContentEditable|button|switch|reader|default|view|setInterval|split|compatMode|do|CSS|getComputedStyle|getPropertyValue|scroll|while|parentNode|addEventListener|removeEventListener|top|deltaBufferTimer||shift|||||||||self|floor|requestAnimationFrame|webkitRequestAnimationFrame|60|WebKitMutationObserver|800|500'.split('|'),0,{}))
