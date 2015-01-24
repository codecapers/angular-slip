
//
// Define the 'app' module.
//
angular.module('app', [ 'slip' ])

//
// Application controller.
//
.controller('AppCtrl', function AppCtrl ($scope) {

	//
	// Setup the data model.
	//
	$scope.myList = [
		'iOS Safari',
		'Mobile Chrome',
		'Android Firefox',
		'Opera Presto and Blink',
		'No dependencies',
	];

	$scope.beforeWait = function (e, itemIndex) {
		if (e.target.className.indexOf('instant') > -1) {
			e.preventDefault();
		}
	};

	$scope.afterSwipe = function (e, itemIndex) {
		$scope.myList.splice(itemIndex, 1);
	};

	$scope.reorder = function (e, spliceIndex, originalIndex) {
		var listItem = $scope.myList[originalIndex];
		$scope.myList.splice(originalIndex, 1);
		$scope.myList.splice(spliceIndex, 0, listItem);
	    return true;
	};
})
;



