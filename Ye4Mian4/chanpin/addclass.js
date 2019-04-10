angular.module('Ji1Gou4', [])
	.controller('classCon', ['$scope', '$http', function($scope, $http) {
		mui.init();

		var self = this;

		/*  方法   */
		self.tian1Jia1 = function() {
			mui.plusReady(function() {
				var btnArray = ['取消', '确定'];
				mui.prompt('请输入分类名称：', '输入分类名称', '添加分类', btnArray, function(e) {
					if(e.index == 1) {
						if(e.value.length == 0) {
							mui.toast('请填写分类名称');
						} else {
							var url = HQ_wang3Luo4Di4Zhi3("/sever/class/add");
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

									mui.toast('注册成功');
									console.log(status + '添加教师信息返回' + JSON.stringify(data));
								} else {
									mui.toast("上传失败");
									console.log(status + '添加教师信息返回' + JSON.stringify(data));
								}

							}).error(function(data, status, headers, config) {
								mui.plusReady(function() {
									plus.nativeUI.closeWaiting();
								});
								console.log(status + '添加教师信息返回' + JSON.stringify(data));
								mui.toast("上传失败");
							});
						}

					} else {}
				})
			});
		}

	}])