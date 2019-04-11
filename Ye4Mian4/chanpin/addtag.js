angular.module('Ji1Gou4', [])
	.controller('tagCon', ['$scope', '$http', function($scope, $http) {
		mui.init();

		var self = this;
		self.list = [];

		/*  方法   */
		mui.plusReady(function() {
			self.reqinfo();

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

		self.tian1Jia1 = function() {
			mui.plusReady(function() {
				var btnArray = ['取消', '确定'];
				mui.prompt('请输入分类名称：', '输入分类名称', '添加分类', btnArray, function(e) {
					if(e.index == 1) {
						if(e.value.length == 0) {
							mui.toast('请填写分类名称');
						} else {
							var url = HQ_wang3Luo4Di4Zhi3("/sever/tag/add");
							var bodyObj = {
								"name": e.value
							};
							mui.plusReady(function() {
								plus.nativeUI.showWaiting("数据上传中...");
							});
							$http.post(url, bodyObj).success(function(data, status, headers, config) {

								mui.plusReady(function() {
									plus.nativeUI.closeWaiting();
								});
								if(status === 200) {

									self.reqinfo();
								} else {
									mui.toast("上传失败");
									
								}
							}).error(function(data, status, headers, config) {
								mui.plusReady(function() {
									plus.nativeUI.closeWaiting();
								});
								mui.toast("上传失败");
							});
						}

					} else {}
				})

			});
		}

	}])