angular.module('Ji1Gou4', [])
	.controller('Zhu3Ye4Con', ['$scope', '$http', function($scope, $http) {
		mui.init();

		var self = this;

		self.lu4Ru4 = function() {
			mui.plusReady(function() {
						mui.openWindow({
							url: 'Ye4Mian4/chanpin/chanpinchuangjian.html',
						});
					});
		}
		
		self.fenlei = function() {
			mui.plusReady(function() {
						mui.openWindow({
							url: 'Ye4Mian4/chanpin/addclass.html',
						});
					});
		}

	}])