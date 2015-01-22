
(function () {

	//
	// Defines the slip events that can be handled.
	//
	var eventTypes = [
		{
			eventName: 'beforeReorder',
			slipEventName: 'slip:beforereorder',
		},
		{
			eventName: 'beforeSwipe',
			slipEventName: 'slip:beforeswipe',
		},
		{
			eventName: 'beforeWait',
			slipEventName: 'slip:beforewait',
		},
		{
			eventName: 'afterSwipe',
			slipEventName: 'slip:afterswipe',
		},
		{
			eventName: 'reorder',
			slipEventName: 'slip:reorder',
		},
	];

	var module = angular
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
					var registeredEventHandlers = {};

					//
					// Functions to register event handlers.
					//
					var registerEventHandler = function (handler, eventName, slipEventName) {

						var registered = registeredEventHandlers[eventName];
						if (typeof registered === 'undefined') {
							registered = []
							registeredEventHandlers[eventName] = [];
						}

						if (registered.length === 0) {
							
							// Lazily register the event handler when the user defines it.
							self.listElement.addEventListener(slipEventName, function(e){
								registered.forEach(function (fn) {
									fn($scope, { $event: e });
								});

							}, false);
						}

						registered.push(handler);
					};

					var defineEventType = function (eventName, slipEventName) {
						self['register' + eventName] = function (handler) {
							registerEventHandler(handler, eventName, slipEventName);
						};
					};

					eventTypes.forEach(function (eventType) {
						defineEventType(eventType.eventName, eventType.slipEventName);
					});
				},

				link: function (scope, element, attrs, controller) {

					var el = element[0];
					controller.listElement = el;

					new Slip(el);					
				},
			};
		}
	);


	//
	// Directives for event handling.
	//
	eventTypes.forEach(function (eventType) {
		module.directive(
			eventType.eventName,
			function ($parse) {
				return {
					restrict: 'A',
					require: 'slippyList',
					link: function (scope, element, attrs, controller) {

						if (attrs[eventType.eventName]) {
							var handler = $parse(attrs[eventType.eventName], null, true);
							controller['register' + eventType.eventName](handler);
						}
					},
				};
			}
		);		
	});	

})();