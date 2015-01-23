
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
		{
			txt: 'Swipeable, but not reorderable',
			noReorder: true,
		},
		{
			txt: 'Reorderable, but not swipeable',
			noSwipe: true,
		},
		{
			txt: 'Not Swipeable, not reorderable',
			noSwipe: true,
			noReorder: true,
		},
		{
			txt: 'Mobile Chrome',
		},
		{
			txt: 'iOS Safari',
		},
		{
			txt: 'Mobile Chrome',
		},
		{
			txt: 'Android Firefox',
		},
		{
			txt: 'Opera Presto and Blink',
		},
		{
			txt: 'No dependencies',
		},
	];

	$scope.beforeReorder = function (listItem, e) {
		console.log('beforeReorder');
		console.log(listItem);
	    return /demo-no-reorder/.test(e.target.className);
	};

	$scope.beforeSwipe = function (listItem, e) {
		console.log('beforeSwipe');
		console.log(listItem);
	    return e.target.nodeName == 'INPUT' || /demo-no-swipe/.test(e.target.className);
	};

	$scope.beforeWait = function (listItem, e) {
		console.log('afterSwipe');
		console.log(listItem);
		return e.target.className.indexOf('instant') > -1;
	};

	$scope.afterSwipe = function (listItem, e) {
		console.log('afterSwipe');
		console.log(listItem);
		return true;
	};

	$scope.reorder = function (listItem, e, spliceIndex, originalIndex) {
		console.log('reorder');
		console.log(listItem);
		console.log(spliceIndex);
		console.log(originalIndex);
	    return true;
	};
})
;



