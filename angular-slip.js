
(function () {

	angular
	.module('slip', [])
	.directive('slippyList', function () {

		return {
			restrict: 'C',

			link: function (scope, element, attrs) {

				var el = element[0];

				el.addEventListener('slip:beforereorder', function(e){
				    if (/demo-no-reorder/.test(e.target.className)) {
				        e.preventDefault();
				    }
				}, false);

				el.addEventListener('slip:beforeswipe', function(e){
				    if (e.target.nodeName == 'INPUT' || /demo-no-swipe/.test(e.target.className)) {
				        e.preventDefault();
				    }
				}, false);

				el.addEventListener('slip:beforewait', function(e){
				    if (e.target.className.indexOf('instant') > -1) e.preventDefault();
				}, false);

				el.addEventListener('slip:afterswipe', function(e){
				    e.target.parentNode.appendChild(e.target);
				}, false);

				el.addEventListener('slip:reorder', function(e){
				    e.target.parentNode.insertBefore(e.target, e.detail.insertBefore);
				    return false;
				}, false);

				new Slip(el);
			},
		};
	});

})();