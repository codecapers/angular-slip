
//
// Define the 'app' module.
//
angular.module('app', [ 'slip' ])

//
// Application controller.
//
.controller('AppCtrl', function AppCtrl ($scope) {

	$scope.beforeReorder = function (e) {
	    return !/demo-no-reorder/.test(e.target.className);
	};

	$scope.beforeSwipe = function (e) {
	    return !(e.target.nodeName == 'INPUT' || /demo-no-swipe/.test(e.target.className));
	};

	$scope.beforeWait = function (e) {
		return !(e.target.className.indexOf('instant') > -1);
	};

	$scope.afterSwipe = function (e) {
		return true;
	};

	$scope.reorder = function (e) {
	    return true;
	};
})
;



