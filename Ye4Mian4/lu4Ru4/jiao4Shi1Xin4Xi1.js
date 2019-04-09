angular.module('Ji1Gou4', [])
	.controller('jiao4Shi1Xin4Xi1Con', ['$scope', '$http', function($scope, $http) {
		mui.init({
			subpages:[{
				url:'jiao4Shi1Xin4Xi1_list.html',
				id:'jiao4Shi1Xin4Xi1_list',
				styles:{
					top: '45px',
					bottom: '0px',
				}
			}]
		});

		console.log('列表运行测试');
		var self = this;
		
		/*  方法   */
		self.tian1Jia1 = function() {
			mui.plusReady(function() {
				mui.openWindow({
					id:'jiao4Shi1Xin4Xi1Tian1Jia1',
					url: 'jiao4Shi1Tian1Jia1.html'
				});
			});
		}

	}])