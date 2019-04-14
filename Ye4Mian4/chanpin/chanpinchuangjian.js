angular.module('Ji1Gou4', [])
	.controller('chanpinchuangjian', ['$scope', '$http', function($scope, $http) {
		mui.init();

		var self = this;

		self.xing4Ming2 = '';
		self.ni4Cheng1 = '';
		self.dian4Hua4 = '';
		self.zheng4jian4 = '';
		self.tu2pian4lu4jing4;
		self.feileiname = '';
		self.biaoqianname = '';
		self.biaoqianList = [];
		self.feileiList = [];
		self.zhaopian = "";
		document.getElementById("pic").src = "../../resoure/tian1jia1zhao4pian4.png";

		//base64编码    
		window.addEventListener('biaoqian', function(event) {
			console.log(event)
			// 数据都在event.detail里面  
			var val = event.detail.val;
			var tstr = "";
			for(var i = 0; i < val.length; i++) {
				var obj = val[i];
				self.biaoqianList.push(obj.tagid);
				if(i != 0) {
					tstr += ",";
				}
				tstr += obj.tagname;
			}
			self.biaoqianname = tstr;
			$scope.$apply();
		});

		window.addEventListener('feilei', function(event) {
			console.log(event)
			// 数据都在event.detail里面  
			var val = event.detail.val;
			var tstr = "";
			for(var i = 0; i < val.length; i++) {
				var obj = val[i];
				self.feileiList.push(obj.classifyid);
				if(i != 0) {
					tstr += ",";
				}
				tstr += obj.classifyname;
			}
			self.feileiname = tstr;
			$scope.$apply();
		});

		self.bao3cun2 = function() {
			if(self.xing4Ming2.length == 0) {
				mui.toast('请输入产品名称');
				return;
			}
			if(self.ni4Cheng1.length == 0) {
				mui.toast('请输入产品描述');
				return;
			}
			if(self.dian4Hua4.length == 0) {
				mui.toast('请输入价格');
				return;
			}
			if(self.zheng4jian4.length == 0) {
				mui.toast('请输入成本价');
				return;
			}

			if(self.zhaopian.length == 0) {
				mui.toast('请选择照片');
				return;
			}
			if(self.feileiList.length == 0) {
				mui.toast('请选择分类');
				return;
			}

			mui.plusReady(function() {
				plus.nativeUI.showWaiting("数据检索中...");
			});
			var url = HQ_wang3Luo4Di4Zhi3("/sever/obj/add");
			//     title: param.title,
			//     des: param.des,
			//     url: param.url,
			//     price: param.price,
			//     cost: param.cost
			//param.tags
			//  param.classs
			var bodyObj = {
				"title": self.xing4Ming2,
				"des": self.ni4Cheng1,
				"url": self.zhaopian,
				"price": self.dian4Hua4,
				"cost": self.zheng4jian4,
				"tags": self.biaoqianList,
				"classs": self.feileiList
			}
			alert(JSON.stringify(bodyObj));
			$http.post(url, bodyObj).success(function(data, status, headers, config) {

				mui.plusReady(function() {
					plus.nativeUI.closeWaiting();
				});
				if(status === 200) {
					if (data.data.res == 0){
						mui.toast(data.data.message);
					}else{
						mui.toast("上传成功");
						mui.back();
					}
					
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

		self.yu3yin1ID = function() {
			console.log('343');
		}

		self.fenlei = function() {
			mui.plusReady(function() {
				mui.openWindow({
					url: 'selectfeilei.html',
				});
			});
		}

		self.biaoqian = function() {
			mui.plusReady(function() {
				mui.openWindow({
					url: 'selecttag.html',
				});
			});
		}

		self.zhao4pian4 = function() {

			if(window.plus) {
				plus.gallery.pick(function(gallerdata) {
					document.getElementById("pic").src = gallerdata;

					var wt = plus.nativeUI.showWaiting();
					var url = HQ_wang3Luo4Di4Zhi3("/resource/obj/image");
					var task = plus.uploader.createUpload(
						url, {
							method: "POST"
						},
						function(t, status) { //上传完成
							if(status == 200) {
								wt.close(); //关闭等待提示按钮
								var tem = JSON.parse(t.responseText);

								self.zhaopian = tem.data.fileid;

							} else {
								alert("上传失败：" + status);
								wt.close(); //关闭等待提示按钮
							}
						}
					);

					var filepath = plus.io.convertLocalFileSystemURL(gallerdata);
					//压缩图片
					var new_file = 'file://' + plus.io.convertLocalFileSystemURL(filepath);
					console.log("filepath" + filepath);
					console.log("new_file" + new_file);
					var issucess = task.addFile(new_file, {
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