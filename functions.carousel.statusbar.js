/*! jCarousel - v0.3.0 - 2014-01-23
 * http://sorgalla.com/jcarousel
 * Copyright (c) 2013 Jan Sorgalla; Licensed MIT 
 * 
 * code from Zoccarato Francesco (aka fzoccara): https://github.com/fzoccara
 * */
(function($) {
    'use strict';

    $.jCarousel.plugin('jcarouselStatusBar', {
        _options: {
            separator: ' / ',
            currentclass: 'current',
            totalclass: 'total',
            statusbarclass: 'elements-status',
            statusbarhtml: function(current, total) {
                return '<span class="' + this.options('statusbarclass') + '"><span class="' + this.options('currentclass') + '">' + current + '</span>' + this.options('separator') + '<span class="' + this.options('totalclass') + '">' + total + '</span></span>';
            }
        },
        _statusBar: null,
        _currentPage: null,
        _pages: null,
        _init: function() {
            this.onDestroy = $.proxy(function() {
                this._destroy();
                this.carousel()
                        .one('jcarousel:createend', $.proxy(this._create, this));
            }, this);
            this.onReload = $.proxy(this._reload, this);
            this.onScroll = $.proxy(this._update, this);
        },
        _create: function() {
            this.carousel()
                    .one('jcarousel:destroy', this.onDestroy)
                    .on('jcarousel:reloadend', this.onReload)
                    .on('jcarousel:scrollend', this.onScroll);

            this._reload();
        },
        _destroy: function() {
            this._clear();

            this.carousel()
                    .off('jcarousel:destroy', this.onDestroy)
                    .off('jcarousel:reloadend', this.onReload)
                    .off('jcarousel:scrollend', this.onScroll);
        },
        _reload: function() {
            this._clear();
            var self = this,
                    carousel = this.carousel().data('jcarousel'),
                    element = this._element,
                    statusbarhtml = this.options('statusbarhtml');
            
            if (!carousel.circular) {
                this._pages = this._calculatePages();
                this._currentPage = 1;
                this._statusBar = $(statusbarhtml.call(self, this._currentPage, this._pages));

                element.append(this._statusBar);

                this._update();
            }
            else{
                // do something for circular current calculation
            }
        },
        _update: function() {
            var target = this.carousel().jcarousel('target');

            this._currentPage = target.index() + 1;

            $('.' + this.options('statusbarclass') + ' .' + this.options('currentclass'), this._element).text(this._currentPage);
        },
        _clear: function() {
            this._currentPage = null;
            this._pages = null;
            this._statusBar = null;
            $('.' + this.options('statusbarclass'), this._element).remove();
        },
        _calculatePages: function() {
            var carousel = this.carousel().data('jcarousel'),
                    items = carousel.items(),
                    clip = carousel.clipping(),
                    wh = 0,
                    idx = 0,
                    page = 0,
                    pages = {},
                    curr;

            while (true) {
                curr = items.eq(idx++);

                if (curr.length === 0) {
                    break;
                }

                if (!pages[page]) {
                    pages[page] = curr;
                } else {
                    pages[page] = pages[page].add(curr);
                }

                wh += carousel.dimension(curr);

                if (wh >= clip) {
                    page++;
                    wh = 0;
                }
            }

            return page;
        }

    });
}(jQuery));
