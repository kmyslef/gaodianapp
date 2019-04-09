angular.module('Ji1Gou4', [])
	.controller('chanpinchuangjian', ['$scope', '$http', function($scope, $http) {
		mui.init();

		var self = this;

		self.xing4Ming2 = '';
		self.ni4Cheng1 = '';
		self.dian4Hua4 = '';
		self.zheng4jian4 = '';
		self.tu2pian4lu4jing4;
		document.getElementById("pic").src = "../../resoure/tian1jia1zhao4pian4.png";

		//base64编码    
		function getBase64Image(img) {
			var canvas = document.createElement("canvas"); //创建canvas DOM元素，并设置其宽高和图片一样
			canvas.width = img.width;
			canvas.height = img.height;
			var ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0, img.width, img.height); //使用画布画图
			var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase(); //动态截取图片的格式
			var dataURL = canvas.toDataURL("image/" + ext); //返回的是一串Base64编码的URL并指定格式
			return dataURL;
		}

		function jiao4shi1(ming2cheng1, ni4cheng1, dian4hua4, zheng4jian4, tu2pian4lu4jing4) {
			var tem = this;
			tem.fname = ming2cheng1;
			tem.fpname = ni4cheng1;
			tem.ttel = dian4hua4;
			tem.tcertid = zheng4jian4;
			tem.tsoundid = '123';
			var lu4jing4 = tu2pian4lu4jing4;
			tem.imgbase64;
			tem.imageBase64 = function() {
				var image = document.getElementById("pic"); //new Image();
				console.log('url' + lu4jing4);
				image.src = lu4jing4;
				var data = getBase64Image(image); //base64编码
				tem.imgbase64 = data;
			}
		}

		self.bao3cun2 = function() {

			if(self.xing4Ming2.length == 0) {
				mui.toast('请填写姓名');
				return;
			}
			if(self.ni4Cheng1.length == 0) {
				mui.toast('请填昵称');
				return;
			}
			if(self.dian4Hua4.length == 0) {
				mui.toast('请填电话');
				return;
			}
			if(self.zheng4jian4.length == 0) {
				mui.toast('请填证件');
				return;
			}

			mui.plusReady(function() {
				plus.nativeUI.showWaiting("数据检索中...");
			});

			var bodyObj = new jiao4shi1(self.xing4Ming2, self.ni4Cheng1, self.dian4Hua4, self.zheng4jian4, self.tu2pian4lu4jing4);
			bodyObj.imageBase64();
			//
			//			console.log(JSON.stringify(bodyObj));
			//
			//			var token = localStorage.getItem('token');
			//			var url = HQ_wang3Luo4Di4Zhi3('wang3Luo4Di4Zhi3_Ji1Gou4', '/train/personal/org/teacher/save?token=' + token);

			//			$http.post(url, bodyObj).success(function(data, status, headers, config) {
			//
			//				mui.plusReady(function() {
			//					plus.nativeUI.closeWaiting();
			//				});
			//				if(status === 200) {
			//
			//					if(data.bc === 1) {
			//						dataVal = data.data;
			//						mui.toast('注册成功');
			//						var wobj = plus.webview.getWebviewById('jiao4Shi1Xin4Xi1_list');
			//						
			//						mui.fire(wobj, 'initUpdata', {});
			//
			//						mui.back();
			//					} else {
			//						mui.toast(data.bm);
			//					}
			//					console.log('添加教师信息返回' + JSON.stringify(data));
			//				} else {
			//					console.log(status + '添加教师信息返回' + JSON.stringify(data));
			//				}
			//
			//			}).error(function(data, status, headers, config) {
			//				mui.plusReady(function() {
			//					plus.nativeUI.closeWaiting();
			//				});
			//				console.log(status + '添加教师信息返回' + JSON.stringify(data));
			//				mui.toast(status);
			//			});
		}

		self.yu3yin1ID = function() {
			console.log('343');
		}

		self.zhao4pian4 = function() {

			if(window.plus) {
				plus.gallery.pick(function(e) {
					document.getElementById("pic").src = e;
					self.tu2pian4lu4jing4 = e;
					console.log(e);
					var files = document.getElementById('pic');
					var image = document.getElementById("pic");
					var wt = plus.nativeUI.showWaiting();
					var task = plus.uploader.createUpload(
						"http://127.0.0.1:7001/resource/obj/image", {
							method: "POST"
						},
						function(t, status) { //上传完成
							if(status == 200) {
								alert("上传成功：" + t.responseText);
								wt.close(); //关闭等待提示按钮
							} else {
								alert("上传失败：" + status);
								wt.close(); //关闭等待提示按钮
							}
						}
					);
//					task.addData("name", "test");
					task.addFile(files.src, {
						key: "file"
					});
					//开始上传任务
					task.start();
				}, function(e) {}, {
					filter: "image",
					multiple: false,
					system: true
				});
			}
		}

	}])