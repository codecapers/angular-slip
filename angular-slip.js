
(function () {

	angular
	.module('slip', [])
	.directive(
		'slippyList', 
		function ($parse) {

			return {
				restrict: 'C',

				link: function (scope, element, attrs) {

					var el = element[0];

					if (attrs.beforeReorder) {
						var beforeReorder = $parse(attrs.beforeReorder, null, true);

						el.addEventListener('slip:beforereorder', function(e){
							beforeReorder(scope, { $event: e });
						}, false);
					}

					if (attrs.beforeSwipe) {
						var beforeSwipe = $parse(attrs.beforeSwipe, null, true);

						el.addEventListener('slip:beforeswipe', function(e){
							beforeSwipe(scope, { $event: e });
						}, false);
					}

					if (attrs.beforeWait) {
						var beforeWait = $parse(attrs.beforeWait, null, true);

						el.addEventListener('slip:beforewait', function(e){
							beforeWait(scope, { $event: e });						    
						}, false);
					}

					if (attrs.afterSwipe) {
						var afterSwipe = $parse(attrs.afterSwipe, null, true);

						el.addEventListener('slip:afterswipe', function(e){
							afterSwipe(scope, { $event: e });					    
						}, false);
					}

					if (attrs.reorder) {
						var reorder = $parse(attrs.reorder, null, true);

						el.addEventListener('slip:reorder', function(e){
							reorder(scope, { $event: e });
						}, false);
					}

					new Slip(el);
				},
			};
		}
	);

})();