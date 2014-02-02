jcarousel-status
================

PRE-ALPHA VERSION
----------------

That's a plugin for jsor carousel (https://github.com/jsor/jcarousel) that let you have a status of current carousel.


Still missing multipagination and circular status features.

HOW TO - INIT AND CONFIGURATIONS
----------------


    $('.jcarousel')
        .jcarousel({
            // Core configuration goes here
        })
        .jcarouselStatusBar({
            separator: ' / ',
            currentclass: 'current',
            totalclass: 'total',
            statusbarclass: 'elements-status',
            statusbarhtml: function(current, total) {
                return '<span class="' + this.options('statusbarclass') + '"><span class="' + this.options('currentclass') + '">' + current + '</span>' + this.options('separator') + '<span class="' + this.options('totalclass') + '">' + total + '</span></span>';
            }
        });
    });

