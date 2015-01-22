
//
// Define the 'app' module.
//
angular.module('app', [])

//
// Application controller.
//
.controller('AppCtrl', function AppCtrl ($scope) {


})

;


var ol = document.getElementById('slippylist');
ol.addEventListener('slip:beforereorder', function(e){
    if (/demo-no-reorder/.test(e.target.className)) {
        e.preventDefault();
    }
}, false);

ol.addEventListener('slip:beforeswipe', function(e){
    if (e.target.nodeName == 'INPUT' || /demo-no-swipe/.test(e.target.className)) {
        e.preventDefault();
    }
}, false);

ol.addEventListener('slip:beforewait', function(e){
    if (e.target.className.indexOf('instant') > -1) e.preventDefault();
}, false);

ol.addEventListener('slip:afterswipe', function(e){
    e.target.parentNode.appendChild(e.target);
}, false);

ol.addEventListener('slip:reorder', function(e){
    e.target.parentNode.insertBefore(e.target, e.detail.insertBefore);
    return false;
}, false);

new Slip(ol);
