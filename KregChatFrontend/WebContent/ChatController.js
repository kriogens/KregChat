/**
 * 
 */
KregChatFrontend.controller('ChatController', [
		'$scope',
		'$http',
		function($scope, $http) {

			console.log('Chat Controller')

			$scope.Email = {
				value : '',
				error : true,
				touched : false,
				validate : function() {
					this.touched = true;
					var reg = /\S+@\S+\.\S+/;
					this.error = !reg.test(this.value);
				}
			}

			$scope.EMessage = {
				value : '',
				error : true,
				touched : false,
				validate : function() {
					this.touched = true;
					var reg = /^.{2,160}$/;
					this.error = !reg.test(this.value);
				}
			}

			// var socket = new WebSocket(
			// "ws://localhost:8081/KregChatBackend/chat");

			$scope.onConnectClick = function() {
				var socket = new WebSocket(
						"ws://localhost:8081/KregChatBackend/chat");

				/*------------------------- SOCKET OPEN-------------------------*/

				socket.onopen = function() {

					console.log(socket)

					var json = {
						"from" : "",
						"msg" : "connect:" + $scope.Email.value
					}

					socket.send(JSON.stringify(json))

					socket.onmessage = function(data) {

						if (data.data.startsWith("disconnect")) {

							console.log("disconnect");
<<<<<<< HEAD
							console.log(data.data.split(":")[1]);

							$scope.$apply($scope.AllOnliners.splice(
									$scope.AllOnliners.indexOf(data.data
											.split(":")[1]), 1));

						} else if (data.data.startsWith("connect")) {

							console.log("connect");
							console.log(data.data.split(":")[1]);

							$scope.$apply($scope.AllOnliners.push(data.data
									.split(":")[1]));

						} else {

							$scope.$apply($scope.messages.push(JSON
									.parse(data.data)));

						}

=======
							console.log( data.data.split(":")[1] );
							
							$scope.$apply(
									$scope.AllOnliners.splice($scope.AllOnliners.indexOf(data.data.split(":")[1]),1)
							);
							
						}else if (data.data.startsWith("connect")) {

							console.log("connect");
							console.log( data.data.split(":")[1] );
							
							$scope.$apply(
									$scope.AllOnliners.push(data.data.split(":")[1])
							);
							
						} 
						else {

							$scope.$apply($scope.messages.push(JSON
									.parse(data.data)));
							
						}

				

>>>>>>> 65cfe5abccb4b2323721699ccf976e10b5c2384d
					}

					window.setTimeout(function() {

						$scope.$apply($scope.fetchAllOnliners());

					}, 2000);

				}

				/*------------------------- SOCKET CLOSE-------------------------*/

				socket.onclose = function() {
					if (socket.readyState === WebSocket.OPEN) {
						socket.close();
						console.log("WebSocket: Disconnected");

					}

				}

				$scope.EMessage = {
					value : '',
					error : true,
					touched : false,
					validate : function() {
						this.touched = true;
						var reg = /^.{2,160}$/;
						this.error = !reg.test(this.value);
					}
				}

				$scope.messages = [];

				$scope.AllOnliners = [];

				/*-----------------------------------------------*/

				$scope.fetchAllOnliners = function() {

					$http(
							{
								method : 'get',
								url : BASE_URL + 'fetchAllOnliners?myemail='
										+ $scope.Email.value,
								headers : {
									'Content-Type' : 'application/json'
								}
							}).then(function(resp) {
						console.log(resp.data)

						$scope.AllOnliners = resp.data;
					}, function(resp) {

						console.log("fetchAllOnliners Error")
					});

				}

				$scope.fetchAllOnliners();

				/*-----------------------------------------------*/

				$scope.sendMessage = function() {

					if (WebSocket.readyState != WebSocket.OPEN) {

						var json = {
							"from" : $scope.Email.value,
							"msg" : $scope.EMessage.value
						}

						console.log(json);
						($scope.messages.push(json));

						socket.send(JSON.stringify(json));

					}
				}
			}

<<<<<<< HEAD
			$scope.currentChatHeads = []

			$scope.addChatHead = function(arg) {

				if ($scope.currentChatHeads.indexOf(arg) == -1)
					$scope.currentChatHeads.push(arg);

				console.log($scope.currentChatHeads)

			}

			$scope.closeChatHead = function(arg) {

				if ($scope.currentChatHeads.indexOf(arg) != -1)
					$scope.currentChatHeads.splice( $scope.currentChatHeads.indexOf(arg) ,1);

				console.log($scope.currentChatHeads)

			}

=======
>>>>>>> 65cfe5abccb4b2323721699ccf976e10b5c2384d
		} ]);