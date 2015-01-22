
//
// Define the 'app' module.
//
angular.module('app', [ 'slip' ])

//
// Application controller.
//
.controller('AppCtrl', function AppCtrl ($scope) {

	$scope.beforeReorder = function (e) {
	    if (/demo-no-reorder/.test(e.target.className)) {
	        e.preventDefault();
	    }
	    return false;
	};

	$scope.beforeSwipe = function (e) {
	    if (e.target.nodeName == 'INPUT' || /demo-no-swipe/.test(e.target.className)) {
	        e.preventDefault();
	    }
	    return false;
	};

	$scope.beforeWait = function (e) {
		if (e.target.className.indexOf('instant') > -1) {
			e.preventDefault();
		}

		return false;
	};

	$scope.afterSwipe = function (e) {
		e.target.parentNode.appendChild(e.target);
		return false;
	};

	$scope.reorder = function (e) {
	    e.target.parentNode.insertBefore(e.target, e.detail.insertBefore);
	    return false;
	};
})
;



