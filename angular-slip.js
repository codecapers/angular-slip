
(function () {

	//
	// Defines the slip events that can be handled.
	//
	var eventTypes = [
		{
			eventName: 'slipBeforeReorder',
			slipEventName: 'slip:beforereorder'
		},
		{
			eventName: 'slipBeforeSwipe',
			slipEventName: 'slip:beforeswipe'
		},
		{
			eventName: 'slipBeforeWait',
			slipEventName: 'slip:beforewait',
		},
		{
			eventName: 'slipAfterSwipe',
			slipEventName: 'slip:afterswipe',
		},
		{
			eventName: 'slipTap',
			slipEventName: 'slip:tap',
		},
		{
			eventName: 'slipCancelSwipe',
			slipEventName: 'slip:cancelswipe',
		},
		{
			eventName: 'slipReorder',
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
		'slipList', 
		[
			'$parse',
			function ($parse) {

				return {
					restrict: 'AC',

					controller: [
						"$scope",
						function ($scope) {

							var self = this;
							var registeredEventHandlers = {};

							//
							// Walk up the DOM to find the list item that owns the particular child.
							// 
							var findListItem = function (childElement)  {

								var element = childElement;
								while (element && element.parentNode != self.listElement) {
									element = element.parentNode;
								}

								return element;
							};

							//
							// Determine the index of an element relative to its parent.
							//
							var determineElementIndex = function (listItemElement) {

								var itemIndex = 0;
								while (listItemElement) {
									if (listItemElement.nodeType === 1) {
										++itemIndex;
									}
									listItemElement = listItemElement.previousSibling;
								}

								return itemIndex-1;
							};

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

										var itemIndex = -1;
										var listItemElement = findListItem(event.target);
										if (listItemElement) {
											itemIndex = determineElementIndex(listItemElement);
										}

										registered.forEach(function (fn) {
											var locals = {
												$event: event,
												$index: itemIndex,
											};

											if (eventType.prepLocals) {
												// Each event type can add its own locals to the mix if necessary.
												angular.extend(locals, eventType.prepLocals(event));
											}

											handlerScope.$apply(function () {
												if (fn(handlerScope, locals)) {
													if (eventType.defaultResponse) {
														// A truthy return value from the user's event handler enables the default event response.
														eventType.defaultResponse(event);
													}
												}
											});

										});

									}, false);
								}

								registered.push(handler);
							};
						},
					],

					link: function (scope, element, attrs, controller) {

						var el = element[0];
						controller.listElement = el;

						new Slip(el);					

						eventTypes.forEach(function (eventType) {
							if (attrs[eventType.eventName]) {
								var handler = $parse(attrs[eventType.eventName], null, true);
								controller.registerEventHandler(handler, eventType, scope);
							}
						});
					},
				};
			}
		]
	);

})();
