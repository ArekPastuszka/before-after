var BeforeAfter = (function () {
    function BeforeAfter(handler) {
        this.handler = handler;

        if(this.checkHandlerExist() && this.checkImagesExist()){
            this.init();
            this.bindEvents();
        }
    }

    BeforeAfter.prototype.init = function () {
        this.wrapHandler();
        this.wrapImages();
        this.createHandler();
    };

    BeforeAfter.prototype.wrapHandler = function () {
        var html = this.getHandler().innerHTML;
        var container = document.createElement('div');
        container.className = 'before-after';
        container.innerHTML = html;

        this.getHandler().innerHTML = container.outerHTML;
    };

    BeforeAfter.prototype.wrapImages = function () {
        var images = this.getImages();

        for(var i = 0, l = images.length; i < l; i++) {
            images[i].outerHTML = this.getWrappedImage(images[i].outerHTML, i);
        }
    };

    BeforeAfter.prototype.getWrappedImage = function (image, index) {
        var photo = document.createElement('div');
        photo.className = 'photo';
        photo.innerHTML = image;

        if(index === 0){
            photo.className += ' before';
        }
        else{
            photo.className += ' after';
        }

        return photo.outerHTML;
    };

    BeforeAfter.prototype.createHandler = function () {
        var beforeAfterHandler = this.getHandler().querySelector('.before-after');

        var dragHandler = document.createElement('div');
        dragHandler.className = 'drag-handler';
        dragHandler.draggable = true;
        var dragElement = document.createElement('div');
        dragElement.className = 'drag-element';
        dragHandler.appendChild(dragElement);

        beforeAfterHandler.innerHTML += dragHandler.outerHTML;
    };

    BeforeAfter.prototype.checkHandlerExist = function () {
        return this.getHandler() !== undefined;
    };

    BeforeAfter.prototype.checkImagesExist = function () {
        return this.getImages().length === 2;
    };

    BeforeAfter.prototype.getImages = function () {
        return this.getHandler().querySelectorAll('img');
    };

    BeforeAfter.prototype.bindEvents = function () {
        var self = this;

        this.getDragHandler().addEventListener('mousedown', function (e) {
            e.preventDefault();
            e.stopPropagation();
            self.markDragStart();
        });

        document.addEventListener('mouseup', function () {
            self.markDragStop();
        });

        this.getContainer().addEventListener('mousemove', function (e) {
            if(self.isDragStart()){
                self.update(e.screenX);
            }
        });
    };

    BeforeAfter.prototype.getHandler = function () {
        return this.handler;
    };

    BeforeAfter.prototype.getContainer = function () {
        return this.getHandler().querySelector('.before-after');
    };

    BeforeAfter.prototype.getDragHandler = function () {
        return this.getHandler().querySelector('.drag-handler');
    };

    BeforeAfter.prototype.getDragHandlerOffsetX = function () {
        return this.getDragHandler().offsetLeft;
    };

    BeforeAfter.prototype.getPositionByOffset = function (offsetX) {
        var prePosition = offsetX * 100 / this.getImagesWidth();
        var position = null;
        if(prePosition < 0){
            position = 0;
        }
        else if(prePosition > 100){
            position = 100;
        }
        else {
            position = prePosition;
        }

        return position
    };

    BeforeAfter.prototype.update = function (offsetX) {
        var position = this.getPositionByOffset(offsetX);
        this.updateDragHandlerPosition(position);
        this.updatePhotoBefore(position);
    };

    BeforeAfter.prototype.updateDragHandlerPosition = function (position) {
        this.getDragHandler().style.left = position + '%';
    };

    BeforeAfter.prototype.updatePhotoBefore = function (position) {
        var photoBefore = this.getPhotoBefore();
        var photoBeforeImage = this.getPhotoBeforeImage();
        var translateValue = 100 - position;
        photoBefore.style.transform = 'translate(' + (-1 * translateValue) + '%)';
        photoBeforeImage.style.transform = 'translate(' + translateValue + '%)';
    };

    BeforeAfter.prototype.getPhotoBefore = function () {
        return this.getHandler().querySelector('.photo.before');
    };

    BeforeAfter.prototype.getPhotoBeforeImage = function () {
        return this.getPhotoBefore().querySelector('img');
    };

    BeforeAfter.prototype.getImagesWidth = function () {
        return this.getHandler().querySelector('.before-after').offsetWidth;
    };

    BeforeAfter.prototype.markDragStart = function () {
        this.dragStart = true;
    };

    BeforeAfter.prototype.markDragStop = function () {
        this.dragStart = false;
    };

    BeforeAfter.prototype.isDragStart = function () {
        return this.dragStart === true;
    };

    return BeforeAfter;
})();