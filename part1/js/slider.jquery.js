(function($){
 $.fn.slider = function(options) {
    var defaults = {                   // Настройки по умолчанию
        visible: 3,                    //количество отображаемых елементов 3
        speed: 400                     //скорость прокрутки
       };
    var settings = $.extend(defaults, options);

    var sliderWrapper = this;                           //обьявляем главную обертку
    var sliderList    = this.find(".slider-list");      //обьявляем контейнер с елементами
    var sliderItems   = this.find(".slider-item");      //обьявляем елементы
    var arrowLeft     = this.find(".arrow-left");       //стрелки
    var arrowRight    = this.find(".arrow-right");

    var itemsMargin = parseInt(sliderItems.css("margin-right")); //высчитываем общую длину отступов
    var itemsSize   = (sliderWrapper.width() - itemsMargin * (settings.visible - 1)) / settings.visible; //высчитываем размер елемента

    sliderItems.css({                           //задаем размер елемента
        "width" : itemsSize,
        "height": itemsSize
    })

    var appendSelectorLeft  = ".slider-item:gt(" + (settings.visible - 1) + ")";   //для переставки елементов при подходе к левому краю
    var appendSelectorRight = ".slider-item:lt(" + (sliderItems.length - settings.visible) + ")";  //для переставки елементов при подходе к правому краю

    var step      = sliderItems.width() + itemsMargin;        //сновной "шаг" слайдера
    var sliderPos = parseInt(sliderList.css("left"));         // текущая позиция слайдера

    function sliderMoveRight() {
        if (Math.abs(sliderPos) == (sliderItems.length - settings.visible) * step ) {  //если подошли к правому краю
            sliderList
                .append(sliderList.children(appendSelectorRight)) //переставляем начальные елементы в конец слайдера
                .css("left", 0);                     //ставим слайдер на нужное место
            sliderPos = 0;
        }

        sliderList.animate(                         // стандартный шаг направо
            { left : sliderPos - step + "px" },
            { duration: settings.speed, queue: false });

        sliderPos -= step;
    }

    function sliderMoveLeft() {
        if (sliderPos == 0 ) {                    // если подошли к левому краю
            var leftElements = sliderList.children(appendSelectorLeft);
            sliderList.find(".slider-item:first").before(leftElements); //переставляем последние елементы в начало
            sliderList.css("left", -(step * leftElements.length));  //ставим слайдер на нужное место
            sliderPos = -(step * leftElements.length);
        }
        sliderList.animate(
            { left : sliderPos + step + "px" },
            { duration: settings.speed, queue: false } );

        sliderPos += step;
    }
    arrowLeft.on("click", sliderMoveLeft);
    arrowRight.on("click", sliderMoveRight);

 }
})(jQuery);
