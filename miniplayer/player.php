<?php
require_once("../funs.php");
$vid = @$_GET['id'];
if (isID($vid))
    {
        $_SESSION['access'.$vid]=md5(uniqid());
        function pauseicon(){
            echo('<svg width="80.0px" height="80.0px"><polygon fill="#ffffff" points="25.0,17.75 25.0,61.25 56.5,39.0" stroke="#ffffff"/></svg>');
        }
        function danmubutton(){
            echo('<svg width="25.0px" height="25.0px">
    <line fill="none" x1="1.3333321" x2="18.666676" y1="5.888889" y2="5.888889" stroke="#000000" stroke-width="3"/>
    <line fill="none" x1="4.222222" x2="21.555555" y1="12.555555" y2="12.555555" stroke="#000000" stroke-width="3"/>
    <line fill="none" x1="6.3333335" x2="23.666664" y1="19.333334" y2="19.333334" stroke="#000000" stroke-width="3"/>
</svg>');
        }
        function fullscreenbut(){
            echo('<svg width="25.0px" height="25.0px">
    <rect fill="none" x="2.0" width="21.0" height="17.777779" y="3.4444447" stroke="#000000"/>
    <polyline fill="none" points="8.222222,5.888889 4.3333335,5.888889 5.0,8.555555" stroke="#000000"/>
    <polyline fill="none" points="15.666667,6.2222223 20.444445,6.2222223 20.0,8.888889" stroke="#000000"/>
    <polyline fill="none" points="8.444445,19.222221 3.8888888,19.222221 4.4444447,16.777779" stroke="#000000"/>
    <polyline fill="none" points="16.222221,19.222221 20.666666,19.222221 20.0,16.777779" stroke="#000000"/>
</svg>');
        }
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <link rel="stylesheet" type="text/css" href="danmu.css?<?php echo @filemtime('danmu.css');?>">
</head>
<body>
<div  class="playermainbody" allowfullscreen="true" type="danmuplayer" playersse="<?php echo $_SESSION['access'.$vid];?>">
            <div id="videoframe">
                    <iframe id="videoiframe" border=0></iframe>
                    <div id="ctrlcovre">
                        <div id="pauseicon"><?php pauseicon();?></div>
                    </div>
      <div id="tipbox"></div>
                <div class="videopreload" id="videopreload">
      <div class="videopreloadanimationframe">
        <div class="videopreloadanimation shakeanimation">(๑•́ ω •̀๑)</div>
      </div>
      <div id="stat"></div>
</div>
            </div>
            <div id="sendbox">
                <input id="danmuinput" name="danmuinput" />
                <div id="fontstylebutton">₣<div id="fontpannel">
                    <div id="danmuType">
                        <span>奇行</span>
                        <div id="fromtop" title="顶部">⿵</div>
                        <div id="frombottom" title="底部">⿶</div>
                        <div id="fromright" title="向左" class="selected">←</div>
                        <div id="fromleft" title="向右">→</div>
                    </div>
                    <div id="fontSize">
                        <span>大小</span>
                        <div id="Sizesmall" title="小">C</div>
                        <div id="Sizemiddle" title="中" class="selected">D</div>
                        <div id="Sizebig" title="大">E</div>
                    </div>
                    <div id="fontColor">
                        <span>颜色</span>
                        <input id="colorinput" placeholder="FFFFFF" name="colorInput" />
                        <div id="colorview"></div>
                    </div>
                </div>
                </div>
                <div id="sendbutton">发射</div>
                <div id="sendboxcover"></div>
            </div>
            <div id="controler" onselectstart="return false" >
                <div id="play_pause">
                    <div id="pause" title="暂停">
                        <span type="1"></span>
                        <span type="2"></span>
                    </div>
                    <div id="play" title="播放">
                        <div></div>
                    </div>
                </div>
                <div id="progress">
                    <div id="videocached"></div>
                    <div id="progerssdisplay"></div>
                    <canvas id="danmumark"></canvas>
                    <div id="progersscover"></div>
                </div>
                <div id="time">载入中</div>
                <div id="danmuctrl" title="显示/隐藏弹幕"><?php danmubutton();?></div>
                <div id="volume" title="音量">
                    <div id="voluemstat">Д</div>
                    <div id="range">
                        <div></div>
                    </div>
                    <span>100</span>
                </div>
                <div id="loop" title="循环">∞</div>
                <div id="fullscreen" title="全屏"><?php fullscreenbut();?></div>
            </div>
        </div>
        <script>
        console.log("视频id:<?php echo $vid;?>");
        cmd_url="../command.php"; 
        </script>

    <script src="../command.js?<?php echo @filemtime('../command.js');?>"></script>
        <script src="danmu.js?<?php echo @filemtime('danmu.js');?>"></script>
    <script>
    initPlayer(<?php echo $vid;?>);
    </script>
</body>
</html>
<?php
    }
else
    {
        echo "Error";
    }
?>