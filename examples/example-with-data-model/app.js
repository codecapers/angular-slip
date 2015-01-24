
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

	$scope.beforeReorder = function (e, itemIndex) {
		console.log('beforeReorder');
		console.log(itemIndex);
	    if ($scope.myList[itemIndex].noReorder) {
	    	e.preventDefault();
	    }
	};

	$scope.beforeSwipe = function (e, itemIndex) {
		console.log('beforeSwipe');
		console.log(itemIndex);
	    if ($scope.myList[itemIndex].noSwipe) {
	    	console.log('Swipe prevented!');
	    	e.preventDefault();
	    }
	};

	$scope.beforeWait = function (e, itemIndex) {
		console.log('beforeWait');
		console.log(itemIndex);
		console.log(e.target.className);

		if (e.target.className.indexOf('instant') > -1) {
			console.log('Instance reorder allowed!');
			e.preventDefault();
		}

	};

	$scope.afterSwipe = function (e, itemIndex) {
		console.log('afterSwipe');
		console.log(itemIndex);
		$scope.myList.splice(itemIndex, 1);
	};

	$scope.reorder = function (e, spliceIndex, originalIndex) {
		console.log('reorder');
		console.log(e.detail);
		console.log(spliceIndex);
		console.log(originalIndex);
		var listItem = $scope.myList[originalIndex];
		$scope.myList.splice(originalIndex, 1);
		$scope.myList.splice(spliceIndex, 0, listItem);
	    return true;
	};
})
;



