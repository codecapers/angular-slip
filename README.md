# angular-slip

A simple [AngularJS](https://angularjs.org/) wrapper for the [slipjs](https://github.com/pornel/slip) library.

This is a wrapper for Slip.js, original library (and documentation) available here: [https://github.com/pornel/slip](https://github.com/pornel/slip).

Thanks so much to [Kornel](https://github.com/pornel) for this great library.

This library has minimal [dependencies](#dependencies) and requires no specific CSS.

Looking at the [live examples](#live-examples) is a great way to get started with this. 

## Install

Install via [Bower](http://bower.io/) (or clone/download the github repo).

	bower install --save angular-slip


## Usage

Include dependencies in your HTML:

    <script src="bower_components/slip/slip.js" type="text/javascript"></script>
    <script src="bower_components/angular/angular.js" type="text/javascript"></script>
    <script src="bower_components/angular-slip/angular-slip.js" type="text/javascript"></script>

When you define your AngularJS app [module](https://docs.angularjs.org/guide/module), make a dependency on *slip*:

	angular.module('app', [ 'slip' ])

In your AngularJS controller define your data model and attach it to the controller's [scope](https://docs.angularjs.org/guide/scope):

	$scope.myList = [
		"Item 1",
		"Item 2",
		"Item 3",
	];

Add the *slip-list* class to your list:

	<ol class="slip-list">
		...
	</ol>

As an alternative use the *slip-list* attribute:

	<ol slip-list>
		...
	</ol>

Use [ng-repeat](https://docs.angularjs.org/api/ng/directive/ngRepeat) to populate the list from your data model:
 
	<ol class="slip-list">
		<li ng-repeat="item in myList">
            {{item}}
        </li>
	</ol>

Lastly you need to add various event handlers to update your data model in response to swipes and reorders.

Event handlers are specified as attributes on your list element as follows:

	<ol 
		class="slip-list"
        slip-after-swipe="afterSwipe($event, $index)"
        slip-reorder="reorder($event, $spliceIndex, $originalIndex)"
		>
		<li ng-repeat="item in myList">
            {{item}}
        </li>
	</ol>

You'll to define functions on your controller's scope to handle the events.

*afterSwipe* is invoked after a list item has been swiped out of the list. In response to this we should remove the item from the data model: 

	$scope.afterSwipe = function (e, itemIndex) {
		$scope.myList.splice(itemIndex, 1);
	};

*reorder* is invoke after a list item has changed location in the list. In response to this we should move the item in the data-model:

	$scope.reorder = function (e, spliceIndex, originalIndex) {
		var listItem = $scope.myList[originalIndex];
		$scope.myList.splice(originalIndex, 1);
		$scope.myList.splice(spliceIndex, 0, listItem);
	    return true;
	};

## Events

This is derived from the [original work](https://github.com/pornel/slip) and updated to reflect the workings of the AngularJS wrapper. 

**General Arguments**

- `$event` The original input event.
- `$index` Index of the affected item. 

### slip-before-reorder

When reordering movement starts.

Element being reordered gets class `slip-reordering`.

If you execute `$event.preventDefault()` then element will not move at all.

### slip-before-swipe

Fired before first swipe movement starts.

If you execute `$event.preventDefault()` then element will not move at all.

### slip-before-wait

If you execute `$event.preventDefault()` then reordering will begin immediately, blocking ability to scroll the page.

### slip-after-swipe

When swipe has been done and user has lifted finger off the screen.

If you execute `$event.preventDefault()` the element will be animated back to original position.

Otherwise it will be animated off the list and set to `display:none`.

### slip-tap

When element was tapped without being swiped/reordered.

### slip-cancel-swipe

Fired when the user stops dragging and the element returns to its original position.

### slip-reorder

Element has been dropped in new location. 

**Special Arguments**

- `$spliceIndex` Index of element before which current element has been dropped, not counting the element iself.
- `$originalIndex` Index that specifies the original location of the list item before it was dragged.

## Dependencies

- [AngularJS](https://www.google.com.au/search?q=angularjs&oq=angularjs&aqs=chrome..69i57j69i60l5.703j0j4&sourceid=chrome&es_sm=93&ie=UTF-8) 1.3.10
- [Slip](https://github.com/pornel/slip) 1.2.0

## Examples

Example web apps can be found under the *examples* directory.

To run this either clone this repo or download the zip. Then run a [HTTP server](https://www.npmjs.com/package/http-server) in the main directory. Then point your browser at any of the following URLs:

- [http://localhost:8080/examples/orig-example/](http://localhost:8080/examples/orig-example/)
- [http://localhost:8080/examples/example-with-data-model/](http://localhost:8080/examples/example-with-data-model/)
- [http://localhost:8080/examples/simplest-example-with-data-model/](http://localhost:8080/examples/simplest-example-with-data-model/)

Please adjust the port number to that specified by your HTTP server.

## Live Examples

The examples are also available live (thanks to github pages).

- [http://codecapers.github.io/angular-slip/](http://codecapers.github.io/angular-slip/)
- [http://codecapers.github.io/angular-slip/examples/example-with-data-model/](http://codecapers.github.io/angular-slip/examples/example-with-data-model/)
- [http://codecapers.github.io/angular-slip/examples/simplest-example-with-data-model/](http://codecapers.github.io/angular-slip/examples/simplest-example-with-data-model/)