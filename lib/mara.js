	$.fn.diz = function(gelenler) {
	    var nesneGet = $(this);
	    var defClass = $(this).attr('class');
	    var connesne = nesneGet.parent('div');
	    var he = 0;
	    var durum = true;
	    var varsayilan = {
	        bas: 4,
	        son: 3,
	        xs: 12,
	        sm: 6,
	        md: 6,
	        interv: false,
	        intervLimit: 10,
	        intervalHiz: 1000,
	        animasyon: false,
	        animasyonHiz: 500,
	        maxWidth: 1210,
	        hover: true
	    }

	    var parametreler = $.extend(varsayilan, gelenler);

	    function dizloop(nesne) {
	        connesne.css({
	            position: 'relative',
	            padding: '0',
	            clear: 'both',
	        });
	        if (durum != false) {
	            var mara = new Array();
	            for (var i = 0; i < nesne.length; i++) {
	                mara.push(Math.floor((Math.random() * parametreler.bas) + parametreler.son));
	            }

	            pdeger = 0;
	            for (var i = 0; i < mara.length; i++) {
	                pdeger += mara[i];
	                if (pdeger > 12) {
	                    mara[i] -= pdeger - 12;
	                    if (mara[i] < 3) {
	                        mara[i - 1] += mara[i];
	                        mara[i] = 4;
	                        i--;
	                    };
	                    pdeger = 0;
	                }
	            }


	            var sum = 0;
	            for (var i = 0; i < mara.length; i++) {
	                sum += mara[i];
	            };

	            var hes = Math.ceil(sum / 12);
	            if (sum < (hes * 12)) {
	                mara[mara.length - 1] = ((hes * 12) - sum) + mara[mara.length - 1];
	            } else {
	                mara[mara.length - 1] = (sum - (hes * 12)) + mara[mara.length - 1];
	            }
	            var pos = new Array();
	            var posTwo = 0;
	            for (var i = 0; i < mara.length; i++) {
	                nesne.eq(i).attr('class', 'col-xs-' + parametreler.xs + ' col-sm-' + parametreler.sm + ' col-md-' + parametreler.md + '  ' + defClass + '   col-lg-' + mara[i]);
	            }

	            for (var i = 0; i < mara.length; i++) {
	                pos.push(nesne.eq(i).position().left);
	                if (pos[i] < 50) {
	                    posTwo += nesne.eq(i).outerHeight(true);
	                };
	            }

	            connesne.animate({
	                height: posTwo + 50
	            }, parametreler.animasyonHiz);
	            var topArray = new Array();
	            var leftArray = new Array();
	            for (var i = 0; i < nesne.length; i++) {
	                topArray.push(nesne.eq(i).position().top);
	                leftArray.push(nesne.eq(i).position().left);
	            }
	            nesne.css('position', 'absolute');
	            if (parametreler.animasyon == true) {
	                for (var i = 0; i < nesne.length; i++) {
	                    nesne.eq(i).animate({
	                            left: leftArray[i],
	                            top: topArray[i]
	                        },
	                        parametreler.animasyonHiz,
	                        function() {
	                            nesne.css('position', 'static');


	                        });
	                }
	            } else {
	                for (var i = 0; i < nesne.length; i++) {
	                    nesne.eq(i).animate({
	                            left: leftArray[i],
	                            top: topArray[i]
	                        },
	                        0,
	                        function() {
	                            nesne.css('position', 'static');

	                        });
	                }
	            }
	        } else {
	            /**/
	        }

	    }



	    dizloop(nesneGet);


	    $(window).resize(function(event) {
	        if ($(this).width() < parametreler.maxWidth) {
	            durum = false;
	        } else {
	            durum = true;
	        }
	    });

	    if ($(window).width() < parametreler.maxWidth) {
	        durum = false;
	    } else {
	        durum = true;
	    }


	    var limit = 0;
	    var setFun;
	    if (parametreler.interv == true) {
	        setFun = setInterval(function() {
	            limit++;
	            if (limit < parametreler.intervLimit) {
	                dizloop(nesneGet);
	            } else {
	                clearInterval(setFun);
	            }
	        }, parametreler.intervalHiz);
	    };




	    nesneGet.hover(function() {
	        if (parametreler.hover != false) {
	            clearInterval(setFun);
	        } else {

	        }
	    }, function() {
	        setFun = setInterval(function() {
	            limit++;
	            if (limit < parametreler.intervLimit && parametreler.interv != false && parametreler.hover != false) {
	                dizloop(nesneGet);
	            } else {
	                clearInterval(setFun);
	            }
	        }, parametreler.intervalHiz);
	    });




	}