require([
	'/_thirdparty/jquery-2.1.1.js',
	], function() {

		function slideToggeChildLists(element) {
			if (shouldNotSlide(element))
				return;
			var children = $(element).children('ul');
			$(children).slideToggle();
		}

		function disableSliding(element) {
			$(element).data('shouldSlide', 'false');
		}

		function enableSliding(element) {
			$(element).data('shouldSlide', 'true');
		}

		function shouldNotSlide(element) {
			return $(element).data('shouldSlide') === 'false';
		}

		$('header#pageHeader nav ul.menulevel1>li').click(function(){
			window.setTimeout(enableSliding, 300, this);
			window.setTimeout(slideToggeChildLists, 100, this);
		});

		$('header#pageHeader nav ul.menulevel2>li').click(function(){
			var menulevel1 = $(this).parent().parent();
			disableSliding(menulevel1);
			slideToggeChildLists(this);
		});
	}
);
