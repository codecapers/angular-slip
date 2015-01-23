
(function () {

	//
	// Event reponse that calls 'preventDefault'.
	//
	var responsePreventDefault = function (event) {
		event.preventDefault();
	}

	//
	// Defines the slip events that can be handled.
	//
	var eventTypes = [
		{
			eventName: 'beforeReorder',
			slipEventName: 'slip:beforereorder',
			defaultResponse: responsePreventDefault,
		},
		{
			eventName: 'beforeSwipe',
			slipEventName: 'slip:beforeswipe',
			defaultResponse: responsePreventDefault,
		},
		{
			eventName: 'beforeWait',
			slipEventName: 'slip:beforewait',
			defaultResponse: responsePreventDefault,
		},
		{
			eventName: 'afterSwipe',
			slipEventName: 'slip:afterswipe',
			defaultResponse: function (event) {
				event.target.parentNode.appendChild(event.target);
			},
		},
		{
			eventName: 'reorder',
			slipEventName: 'slip:reorder',
			prepLocals: function (event) {
				return {
					$spliceIndex: event.detail.spliceIndex,
					$originalIndex: event.detail.originalIndex,
				};
			},
			defaultResponse: function (event) {
				event.target.parentNode.insertBefore(event.target, event.detail.insertBefore);
			},
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
					self.registerEventHandler = function (handler, eventType, handlerScope) {

						var registered = registeredEventHandlers[eventType.eventName];
						if (typeof registered === 'undefined') {
							registered = []
							registeredEventHandlers[eventType.eventName] = [];
						}

						if (registered.length === 0) {
							
							// Lazily register the event handler when the user defines it.
							self.listElement.addEventListener(eventType.slipEventName, function(event){
								registered.forEach(function (fn) {
									var locals = {
										$event: event,
									};

									if (eventType.prepLocals) {
										// Each event type can add its own locals to the mix if necessary.
										angular.extend(locals, eventType.prepLocals(event));
									}

									handlerScope.$apply(function () {
										if (fn(handlerScope, locals)) {
											// A truthy return value from the user's event handler enables the default event response.
											eventType.defaultResponse(event);
										}
									});

								});

							}, false);
						}

						registered.push(handler);
					};
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
							controller.registerEventHandler(handler, eventType, scope);
						}
					},
				};
			}
		);		
	});	

})();