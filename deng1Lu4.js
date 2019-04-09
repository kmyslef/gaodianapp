angular.module('Ji1Gou4', [])
	.controller('deng1Lu4Con', ['$scope', '$http', function($scope, $http) {
		mui.init();

		var self = this;
		self.zhang4Hao4 = '';
		self.mi4Ma3 = '';

		self.deng1Lu4_DZ = function() {
			console.log(self.zhang4Hao4);
			if(self.zhang4Hao4.length == 0) {
				mui.toast('请输入账号');
				return;
			}
			if(self.mi4Ma3.length == 0) {
				mui.toast('请输入密码');
				return;
			}
//						var bodyObj = {
//							account: "org1",
//							pass: "qwe123",
//							utype: "2"
//						};
			var bodyObj = {
				account: self.zhang4Hao4,
				pass: self.mi4Ma3,
				utype: "2"
			};

console.log(JSON.stringify(bodyObj));
			mui.plusReady(function() {
				plus.nativeUI.showWaiting("登录中...");
			});

			var url = HQ_wang3Luo4Di4Zhi3('wang3Luo4Di4Zhi3_Ji1Gou4', '/train/public/login/type');

			$http.post(url, bodyObj).success(function(data, status, headers, config) {

				mui.plusReady(function() {
					plus.nativeUI.closeWaiting();
				});
				if(status === 200) {
					
					if (data.bc === 1)
					{
						localStorage.setItem('token', data.data.token);
						mui.plusReady(function() {
						mui.openWindow({
							url: 'zhu3Ye4.html',
						});
					});
					}
					else
					{
						mui.toast(data.bm);
					}
					console.log('登陆请求返回' + JSON.stringify(data));
				}
				else
				{
					console.log(status + '登陆请求失败返回' + JSON.stringify(data));
				}

			}).error(function(data, status, headers, config) {
				mui.plusReady(function() {
					plus.nativeUI.closeWaiting();
				});
				console.log(status +  '登陆请求失败返回' + JSON.stringify(data));
				mui.toast(status);
			})

		}

	}])