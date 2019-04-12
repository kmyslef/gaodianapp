angular.module('Ji1Gou4', [])
	.controller('feileiCon', ['$scope', '$http', function($scope, $http) {
		mui.init();

		var self = this;
		self.list = [];

		/*  方法   */
		mui.plusReady(function() {
			self.reqinfo();

		});

		self.getCheckBoxValues = function() {
			var ele = document.getElementsByName("checkbox");
			var temlist = [];
			for(var i = 0; i < ele.length; i++) {
				if(ele[i].checked) {
					for(var j = 0; j < self.list.length; j++) {
						var temobj = self.list[j];
						if(ele[i].value == temobj.classifyid) {
							temlist.push(temobj);
							break;
						}
					}
				}
			}

			var fid = plus.webview.getWebviewById("chanpinchuangjian")
			mui.fire(fid, 'feilei', {
				val: temlist
			});

			mui.back();
		}

		self.reqinfo = function() {
			plus.nativeUI.showWaiting("数据加载中...");

			var url = HQ_wang3Luo4Di4Zhi3("/sever/class/list");
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