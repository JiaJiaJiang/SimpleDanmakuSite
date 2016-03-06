(function(EC){
	var playButton=c_ele('div');
	$Attr(playButton.style,{width:'80px',height:'80px',position:'absolute',borderRadius:'10px',left:'calc(50% - 40px)',top:'calc(50% - 40px)',backgroundColor:'rgba(19, 19, 19, 0.8)'});
	playButton.innerHTML='<svg width="80.0px" height="80.0px"><polygon fill="#ffffff" points="25.0,17.75 25.0,61.25 56.5,39.0" stroke="#ffffff"/></svg>';
	EC.addEvent("CoreReady",function(player){
		var video=player.core.player.video;
		player.core.player.danmuframe.appendChild(playButton);
		video.addEventListener('play',function(){
			playButton.hidden=true;
		});
		video.addEventListener('pause',function(){
			playButton.hidden=false;
		});
		playButton.addEventListener('click',function(){
			video.paused?video.play():video.pause();
		});
	},true);

})(EC);