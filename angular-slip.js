
(function () {

	angular
	.module('slip', [])
	.directive('slippyList', function () {

		return {
			restrict: 'C',

			link: function (scope, element, attrs) {

				new Slip(element[0]);
			},
		};
	});

})();