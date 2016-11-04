(function () {
    var self;
    function FullPage(page) {
        this.page = $(page);
        self = this;
        this.pages = function () {
            page = $(page);
            return page;
        };
    }

    FullPage.prototype.init = function (data) {
        // Данные с внешней инициализации
        var initPage = data;
        // Возврат обьекта
        var elem = this.pages();
        this.createdOverflow(initPage,elem);
        this.createdFullSlide(initPage,elem);
    };

    FullPage.prototype.createdOverflow = function (initPage,elem) {
        var overflow = initPage.scrollOverflow;

        if(initPage.scrollOverflow == false) {
            overflow = 'visible';
        } else {
            overflow = 'hidden';
        }
        elem.closest('html').css({
            'height':'100%',
            'overflow': overflow
        });
        elem.closest('body').css({
            'overflow': overflow
        });
    };

    FullPage.prototype.createdFullSlide = function (initPage,elem) {
        $('body').addClass('fullPageBody');
        elem.css({
            'width':'100%',
            'height': '100%'
        })
    };

    // Добавляем обработчики
    /* Gecko */
    addHandler(window, 'DOMMouseScroll', wheel);
    /* Opera */
    addHandler(window, 'mousewheel', wheel);
    /* IE */
    addHandler(document, 'mousewheel', wheel);

    // Функция для добавления обработчика событий
    function addHandler(object, event, handler) {
        if (object.addEventListener) {
            object.addEventListener(event, handler);
        } else if (object.attachEvent) {
            object.attachEvent('on' + event, handler);
        } else alert("Add handler is not supported");
    }
var flag = 0;
    // Обработчик события
    function wheel(event) {
        if(flag === 0) {
            flag = 1;
            var delta; // Направление скролла
            // -1 - скролл вниз
            // 1  - скролл вверх
            event = event || window.event;
            // Opera и IE работают со свойством wheelDelta
            if (event.wheelDelta) {
                delta = event.wheelDelta / 120;
                // В Опере значение wheelDelta такое же, но с противоположным знаком
                if (window.opera) delta = -delta;
                // В реализации Gecko получим свойство detail
            } else if (event.detail) {
                delta = -event.detail / 3;
            }
            // Запрещаем обработку события браузером по умолчанию
            if (event.preventDefault)  event.preventDefault();
            event.returnValue = false;

            if(delta <= -1) {
                animateSlideBottom();
            }
            console.log(delta);
            return delta;
        } else {
            return false
        }
    }
var indexes = 1;
    function animateSlideTop() {
        var heightWindow = $(window).height();
        indexes--;
        $('html,body').animate({'scrollTop': - heightWindow + 'px'},'slow');
    };

    function animateSlideBottom() {
        var heightWindow = $(window).height();
        indexes++;
        $('html,body').animate({'scrollTop':heightWindow + 'px'},'slow');
    };

    function make(page) {
        var tmp = new FullPage(page);
        return tmp;
    }

    window._ = make;
})();
