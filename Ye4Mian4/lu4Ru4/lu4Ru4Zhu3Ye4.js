angular.module("Ji1Gou4", [])
	.controller('lu4Ru4Zhu3Ye4Con', ['$scope', '$http', function($scope, $http) {
		mui.init();

		var self = this;
		self.lao3Shi1 = function() {
			mui.plusReady(function() {
						mui.openWindow({
							id:'jiao4Shi1Xin4Xi1',
							url: 'jiao4Shi1Xin4Xi1.html'
						});
					});
		}
		
		self.ban1Ji2 = function() {
			mui.plusReady(function() {
						mui.openWindow({
							url: 'jiao4Shi1Xin4Xi1.html',
						});
					});
		}
		
		self.xue2Sheng1 = function() {
			mui.plusReady(function() {
						mui.openWindow({
							url: 'jiao4Shi1Xin4Xi1.html',
						});
					});
		}

	}]);