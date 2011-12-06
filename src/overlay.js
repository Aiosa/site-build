
(function( $ ){
    
$.Overlay = function(elmt, loc, placement) {
    this.elmt = elmt;
    this.scales = (loc instanceof $.Rect);
    this.bounds = new $.Rect(loc.x, loc.y, loc.width, loc.height);
    this.placement = loc instanceof $.Point ? placement : $.OverlayPlacement.TOP_LEFT;    // rects are always top-left
    this.position = new $.Point(loc.x, loc.y);
    this.size = new $.Point(loc.width, loc.height);
    this.style = elmt.style;
};

$.Overlay.prototype = {

    adjust: function(position, size) {
        switch (this.placement) {
            case $.OverlayPlacement.TOP_LEFT:
                break;
            case $.OverlayPlacement.TOP:
                position.x -= size.x / 2;
                break;
            case $.OverlayPlacement.TOP_RIGHT:
                position.x -= size.x;
                break;
            case $.OverlayPlacement.RIGHT:
                position.x -= size.x;
                position.y -= size.y / 2;
                break;
            case $.OverlayPlacement.BOTTOM_RIGHT:
                position.x -= size.x;
                position.y -= size.y;
                break;
            case $.OverlayPlacement.BOTTOM:
                position.x -= size.x / 2;
                position.y -= size.y;
                break;
            case $.OverlayPlacement.BOTTOM_LEFT:
                position.y -= size.y;
                break;
            case $.OverlayPlacement.LEFT:
                position.y -= size.y / 2;
                break;
            case $.OverlayPlacement.CENTER:
            default:
                position.x -= size.x / 2;
                position.y -= size.y / 2;
                break;
        }
    },
    destroy: function() {
        var elmt = this.elmt;
        var style = this.style;

        if (elmt.parentNode) {
            elmt.parentNode.removeChild(elmt);
        }

        style.top = "";
        style.left = "";
        style.position = "";

        if (this.scales) {
            style.width = "";
            style.height = "";
        }
    },
    drawHTML: function(container) {
        var elmt = this.elmt;
        var style = this.style;
        var scales = this.scales;

        if (elmt.parentNode != container) {
            container.appendChild(elmt);
        }

        if (!scales) {
            this.size = $.Utils.getElementSize(elmt);
        }

        var position = this.position;
        var size = this.size;

        this.adjust(position, size);

        position = position.apply(Math.floor);
        size = size.apply(Math.ceil);

        style.left = position.x + "px";
        style.top = position.y + "px";
        style.position = "absolute";

        if (scales) {
            style.width = size.x + "px";
            style.height = size.y + "px";
        }
    },
    update: function(loc, placement) {
        this.scales = (loc instanceof $.Rect);
        this.bounds = new $.Rect(loc.x, loc.y, loc.width, loc.height);
        this.placement = loc instanceof $.Point ?
                placement : $.OverlayPlacement.TOP_LEFT;    // rects are always top-left
    }

};

}( OpenSeadragon ));