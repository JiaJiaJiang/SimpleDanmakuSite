var  cmd_url="/command.php"; 
function cmd(command, bool, callback) { //bool为是否需要等待返回参数
	if (typeof(bool) != "boolean") {
		bool = true;
	}
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			if (!bool) {
				console.log("异步接收到了命令:" + command + "的成功回应\n执行回调函数");
				if(typeof(callback)=="function"){
					callback(xmlhttp.responseText);
				}
			}
		}
	}
	xmlhttp.open("POST", cmd_url,!bool);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	command=transarg(command);
	command = command.replace(/(^\s*)|(\s*$)/g, "");
	command= command.replace("+", "%plus");
	xmlhttp.send("cmd=" + command);
	console.log("命令:" + command);
	if (bool) {
		while (! (xmlhttp.responseText)) {}
		return xmlhttp.responseText;
	}
}

function cmd_unitrans(string) {
	if (typeof(string) == "string") {
		return  escape(escape(string));
	}else if(typeof string=="number"){
		return string;
	}
	else {
		console.log(string);
	}
}
function transarg(str){
			str=str.replace(/(^\s*)|(\s*$)/g, "");//移除两边空格
			var tiz=str.split(/\s+/);
			var tag=false,tagind;
			for(var i=0;i<tiz.length;i++){
				var tmp;
				if(tmp=tiz[i].match(/^`(.*)`$/)){
					tiz[i]=cmd_unitrans(tmp[1]);
					tiz[i]=tiz[i].replace(/^\-\-/,"`-`-");
					tiz[i]=tiz[i].replace(/^\-/,"`-");
					continue;
				}else if(tmp=tiz[i].match(/^`(.*)$/)){
					tiz[i]=cmd_unitrans(tmp[1]);
					tagind=i;
					tag=true;
				}else if(tmp=tiz[i].match(/^(.*)`$/)){
					if(tag){
						tiz[tagind]+=cmd_unitrans(" "+tmp[1]);
						tag=false;
						tiz.splice(i,1);
						i--;
					}
				}else{
					if(tag){
						tiz[tagind]+=cmd_unitrans(" "+tiz[i]);
						tiz.splice(i,1);
						i--;
					}
				}
			}
			return tiz.join(" ");
}
function formArguments(){
	var command = "";
	for (var i = 0; typeof(arguments[i]) == "string"||typeof(arguments[i]) == "number"; i++) {
			command += cmd_unitrans(arguments[i]);
			if (i < length - 1) {
				command += " ";
			}
		}
			return command;
}
function autocmd() {
	var callback, length = arguments.length;
	var command = "";
	if (arguments.length >= 2) {
		if (typeof(arguments[length - 1]) == "function") {
			callback = arguments[length - 1];
			for (var i = 0; typeof(arguments[i]) == "string"||typeof(arguments[i]) == "number"; i++) {
				command += cmd_unitrans(arguments[i]);
				if (i <=( length - 2)) {
					command += " ";
				}
			}
			cmd(command, false, callback);
		}
	} else {
		for (var i = 0; typeof(arguments[i]) == "string"||typeof(arguments[i]) == "number"; i++) {
			command += cmd_unitrans(arguments[i]);
			if (i < length - 1) {
				command += " ";
			}
		}
		return cmd(command, true);
	}
}