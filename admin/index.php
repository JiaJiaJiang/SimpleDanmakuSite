<html>
	<head>
		<meta charset="utf-8"/>
		<title>弹幕控制台</title>
		<script src="/command.js"></script>
		<style>
			#output{
				position: absolute;
				top:0px;
				left: 0px;
				width: 100%;
				height: calc(100% - 30px);
				font-size: 17px;
				overflow-y: auto;
				word-break:break-word;
				color: #fff;
				margin: 0px;
				background-color: #000;
			}
			#input{
				position: absolute;
				bottom:0px;
				left: 0px;
				width: 100%;
				height: 30px;
				line-height: 30px;
				font-size: 17px;
				color: #fff;
				background-color: #000;
			}
			#output b{
				white-space: pre-line;
			}
			.red{
				color:#ff0000;
			}
			.green{
				color:#00ff00;
			}
			table{
				color: #fff;
				text-align: left;
				word-break: initial;
			}
		</style>
	</head>
	<body>
		<pre id="output"></pre>
		<input id="input" placeholder="在此输入命令">
		<script>
		var output=document.querySelector("#output"),
		input=document.querySelector("#input");
		comhistory=[],index=0;
		function display(con,sign){
			output.innerHTML+=((sign?"":">> ")+con+"\n");
			output.scrollTop = output.scrollHeight;
		}
		var simplecom={
			echo:function(){
				display(transarg(input.value.match(/^echo\s*(.*)$/)[1]));
			},
			clear:function(){
				output.innerHTML="";
			}
			
		}

		function evalcom(){
			//console.log(comhistory)
			var com=input.value;
			index=comhistory.length;
			if(com==""){display("");}
			else{
				comhistory.push(com);
				index++;
				var command=com.split(" ")[0];
				if(simplecom[command]){
					simplecom[command]();
				}else{
					display("<span style='color:#ccc'>"+transarg(com)+"</span>");
					cmd(com,false,function(t){
						display(t,true);
					});
				}
			}
			input.value="";
		}
		display("弹幕简易控制台\n首先使用【login -u 用户名 -p 密码】命令登录，然后可以使用【help】命令查看帮助");
		input.onkeydown=function(e){
			//console.log(e.keyCode);
			switch(e.keyCode){
				case 13:{
					evalcom();
					break;
				}
				case 40:{
					if(index<comhistory.length-1)index++;
					input.value=comhistory[index];
					break;
				}
				case 38:{
					if(index>0)index--;
					input.value=comhistory[index];
					break;
				}
			}
		}
		</script>
	</body>
</html>