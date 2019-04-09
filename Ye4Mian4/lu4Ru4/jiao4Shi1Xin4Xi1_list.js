angular.module('Ji1Gou4', [])
	.controller('jiao4Shi1Xin4Xi1ListCon', ['$scope', '$http', function($scope, $http) {
		mui.init({
				pullRefresh: {
					container: '#pullrefresh',
					down: {
						callback: void(0)
					},
					up: {
						contentrefresh: '正在加载...',
						callback: pullupRefresh
					}
				}
		});

        /*  信息类创建    */
		function xian3Shi4Zhi2(ming2cheng1, ni4cheng1, dian4hua4, tu2pian4, lian2jie1) {
			var tem = this;
			tem.ming2cheng1 = ming2cheng1;
			tem.ni4cheng1 = ni4cheng1;
			tem.dian4hua4 = dian4hua4;
			tem.tu2pian4 = tu2pian4;
			tem.lian2jie1 = lian2jie1;
			tem.reqImge = function() {
				var imageUrl = HQ_wang3Luo4Di4Zhi3('wang3Luo4Di4Zhi3_Ji1Gou4', '/train/public/resource/view/' + tem.lian2jie1);
				$http.get(imageUrl).success(function(data, status, headers, congfig) {
					if(status == 200) {
						if(data.bc == 1) {
							tem.tu2pian4 = data.data.imgurl;
//							console.log('imageUrl:' + tem.tu2pian4);
						}
					}
				}).error(function(data, status, headers, congfig) {

				});
			}
		}
		
		/*  信息类创建 end   */


       /*  变量定义    */
		var self = this;
		self.vals = [];

		var dataVal;

		var page = 1;
		var pageNum = 10;
		var totle = 0;

		var bodyObj = {
			'page': page,
			'size': pageNum
		};
		/*  变量定义  end  */
		
		console.log('运行测试');

		/*  方法   */

		function req() {
			var token = localStorage.getItem('token');
			var url = HQ_wang3Luo4Di4Zhi3('wang3Luo4Di4Zhi3_Ji1Gou4', '/train/personal/org/teacher/list?token=' + token);

			$http.post(url, bodyObj).success(function(data, status, headers, config) {

			mui.plusReady(function() {
				plus.nativeUI.closeWaiting();
			});
			
			if (bodyObj.page > 1)
			{
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(); 
			}
			if(status === 200) {

				if(data.bc === 1) {
					page = page + 1;
					dataVal = data.data;
					totle = data.data.total;
					var array = new Array();
					for(temInfo in self.vals)
					{
						array.push(self.vals[temInfo]);
					}
					for(index in dataVal.list) {
							var tem = new xian3Shi4Zhi2(dataVal.list[index].fname, dataVal.list[index].fpname, '1', '../../resoure/mo4ren4.png', dataVal.list[index].resid);
							tem.reqImge();
							array.push(tem);
						}
						self.vals = array;
					} else {
						mui.toast(data.bm);
					}
					
					console.log('length' + self.vals.length);
					if(self.vals.length < 10) {
						console.log('dis');
						mui('#pullrefresh').pullRefresh().disablePullupToRefresh();
					}				
//					console.log('教师列表返回' + JSON.stringify(data));
				} else {
//					console.log(status + '教师列表返回' + JSON.stringify(data));
				}

			}).error(function(data, status, headers, config) {
				mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
				mui.plusReady(function() {
					plus.nativeUI.closeWaiting();
				});
//				console.log(status + '教师列表返回' + JSON.stringify(data));
				mui.toast(status);
			})
		}

		/**
		 * 上拉加载具体业务实现
		 */
		function pullupRefresh() {
			console.log('pullupRefresh');
			if (totle > (page * 10))
			{
				setTimeout(function() {
				var temPage = page + 1;
				bodyObj.page = temPage;
				req();
				}, 1000);
			}
			else
			{
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(true); 
			}
		}
		
		function initReq() {
			self.vals = [];
			mui.plusReady(function() {
				plus.nativeUI.showWaiting("数据检索中...");
		});	
		
		page = 0;
		var temPage = page + 1;
				bodyObj.page = temPage;
		req();
		}
		/*  方法 end  */
		
		initReq();
		
		window.addEventListener('initUpdata', function(event){
			mui.plusReady(function() {
				initReq();
		});	
			
		}, false);
	}])