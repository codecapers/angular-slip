
(function () {

	angular
	.module('slip', [])
	//
	// Directive that identifies the list.
	//
	.directive(
		'slippyList', 
		function ($parse) {

			return {
				restrict: 'C',

				controller: function ($scope) {

					var self = this;
					var beforeReorder = [];

					//
					// Functions to register event handlers.
					//

					this.registerBeforeReorder = function (handler) {

						if (beforeReorder.length === 0) {
							
							// Lazily register the event handler.
							self.listElement.addEventListener('slip:beforereorder', function(e){

								beforeReorder.forEach(function (fn) {
									fn($scope, { $event: e });
								});

							}, false);
						}

						beforeReorder.push(handler);
					};
				},

				link: function (scope, element, attrs, controller) {

					var el = element[0];
					controller.listElement = el;

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
	)
	
	//
	// Directives for event handling.
	//
	.directive(
		'beforeReorder',
		function ($parse) {
			return {
				restrict: 'A',
				require: 'slippyList',
				link: function (scope, element, attrs, controller) {

					if (attrs.beforeReorder) {
						var beforeReorder = $parse(attrs.beforeReorder, null, true);
						controller.registerBeforeReorder(beforeReorder);
					}
				},
			};
		}
	);

})();