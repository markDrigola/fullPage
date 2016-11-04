(function () {
    function FullPage(page) {
        var page = $(page);
        this.pages = function () {
            return page;
        }
    }

    FullPage.prototype.init = function (initPage) {
        // Данные с внешней инициализации
        var initPage = initPage;

        // Возврат обьекта
        //console.log(this.pages());
    };

    function make(page) {
        var tmp = new FullPage(page);
        return tmp;
    }

    window._ = make;
})();