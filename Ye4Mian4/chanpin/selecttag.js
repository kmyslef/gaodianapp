angular.module('Ji1Gou4', [])
	.controller('tagselectCon', ['$scope', '$http', function($scope, $http) {
		mui.init();

		var self = this;
		self.list = [];

		/*  方法   */
		mui.plusReady(function() {
			self.reqinfo();

		});
		
		mui('.mui-table-view').on('change', 'input', function() {
			var value = this.checked?"true":"false";
			alert("checked："+value);
		});
		
		self.reqinfo = function (){
			plus.nativeUI.showWaiting("数据加载中...");
			
			var url = HQ_wang3Luo4Di4Zhi3("/sever/tag/list");
			$http.get(url).success(function(data, status, headers, config) {

				mui.plusReady(function() {
					plus.nativeUI.closeWaiting();
				});
				if(status === 200) {
					self.list = data.data;
					
				} else {
					mui.toast("请求失败");
				}

			}).error(function(data, status, headers, config) {
				mui.plusReady(function() {
					plus.nativeUI.closeWaiting();
				});
				mui.toast("请求失败");
			});
		}

	}])