<?php
require_once(dirname(__FILE__)."/../config.php");


function initPDO(){
	if(dbOpt::$PDO)return dbOpt::$PDO;
	if(!dbName)throw new Exception('dbName is not defined');
	$connectionInfo='mysql:';
	if(@constant('dbHost'))$connectionInfo.=('host='.dbHost.';');
	if(@constant('dbPort'))$connectionInfo.=('port='.dbPort.';');
	if(@constant('dbUnixSocket'))$connectionInfo.=('unix_socket='.dbUnixSocket.';');
	$connectionInfo.=('dbname='.dbName.';');
	dbOpt::$PDO=new PDO($connectionInfo,dbUser,dbPass,array(
	    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
	    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
	    PDO::ATTR_EMULATE_PREPARES => false
	));
	require_once('access.php');
	if(Access::hasLoggedIn())
		dbOpt::$PDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}

class dbOpt{
	function __construct(){
		if(dbOpt::$PDO)return;
		initPDO();
	}
	static function wrapKeyWord($name){
		$name=trim($name);
		if(in_array(strtolower($name), dbOpt::sqlKeyWord)){
			return "`$name`";
		}
		return $name;
	}
	static function checkSelectorArray(&$arr){
		for($i=count($arr);$i--;){ 
			$arr[$i]=dbOpt::wrapKeyWord($arr[$i]);
		}
		return $arr;
	}
    static $PDO=null;
    const sqlKeyWord=array('abort','abs','absolute','access','action','ada','add','admin','after','aggregate','alias','all','allocate','alter','analyse','analyze','and','any','are','array','as','asc','asensitive','assertion','assignment','asymmetric','at','atomic','authorization','avg','backward','before','begin','between','binary','bit','bitvar','bit_length','blob','boolean','both','breadth','by','c','cache','call','called','cardinality','cascade','cascaded','case','cast','catalog','catalog_name','chain','char','character','characteristics','character_length','character_set_catalog','character_set_name','character_set_schema','char_length','check','checked','checkpoint','class','class_origin','clob','close','cluster','coalesce','cobol','collate','collation','collation_catalog','collation_name','collation_schema','column','column_name','command_function','command_function_code','comment','commit','committed','completion','condition_number','connect','connection','connection_name','constraint','constraints','constraint_catalog','constraint_name','constraint_schema','constructor','contains','continue','convert','copy','corresponding','count','create','createdb','createuser','cross','cube','current','current_date','current_path','current_role','current_time','current_timestamp','current_user','cursor','cursor_name','cycle','data','database','date','datetime_interval_code','datetime_interval_precision','day','deallocate','dec','decimal','declare','default','deferrable','deferred','defined','definer','delete','delimiters','depth','deref','desc','describe','descriptor','destroy','destructor','deterministic','diagnostics','dictionary','disconnect','dispatch','distinct','do','domain','double','drop','dynamic','dynamic_function','dynamic_function_code','each','else','encoding','encrypted','end','end-exec','equals','escape','every','except','exception','exclusive','exec','execute','existing','exists','explain','external','extract','false','fetch','final','first','float','for','force','foreign','fortran','forward','found','free','freeze','from','full','function','g','general','generated','get','global','go','goto','grant','granted','group','grouping','handler','having','hierarchy','hold','host','hour','identity','ignore','ilike','immediate','implementation','in','increment','index','indicator','infix','inherits','initialize','initially','inner','inout','input','insensitive','insert','instance','instantiable','instead','int','integer','intersect','interval','into','invoker','is','isnull','isolation','iterate','join','k','key','key_member','key_type','lancompiler','language','large','last','lateral','leading','left','length','less','level','like','limit','listen','load','local','localtime','localtimestamp','location','locator','lock','lower','m','map','match','max','maxvalue','message_length','message_octet_length','message_text','method','min','minute','minvalue','mod','mode','modifies','modify','module','month','more','move','mumps','name','names','national','natural','nchar','nclob','new','next','no','nocreatedb','nocreateuser','none','not','nothing','notify','notnull','null','nullable','nullif','number','numeric','object','octet_length','of','off','offset','oids','old','on','only','open','operation','operator','option','options','or','order','ordinality','out','outer','output','overlaps','overlay','overriding','owner','pad','parameter','parameters','parameter_mode','parameter_name','parameter_ordinal_position','parameter_specific_catalog','parameter_specific_name','parameter_specific_schema','partial','pascal','password','path','pendant','pli','position','postfix','precision','prefix','preorder','prepare','preserve','primary','prior','privileges','procedural','procedure','public','read','reads','real','recursive','ref','references','referencing','reindex','relative','rename','repeatable','replace','reset','restrict','result','return','returned_length','returned_octet_length','returned_sqlstate','returns','revoke','right','role','rollback','rollup','routine','routine_catalog','routine_name','routine_schema','row','rows','row_count','rule','savepoint','scale','schema','schema_name','scope','scroll','search','second','section','security','select','self','sensitive','sequence','serializable','server_name','session','session_user','set','setof','sets','share','show','similar','simple','size','smallint','some','source','space','specific','specifictype','specific_name','sql','sqlcode','sqlerror','sqlexception','sqlstate','sqlwarning','start','state','statement','static','statistics','stdin','stdout','structure','style','subclass_origin','sublist','substring','sum','symmetric','sysid','system','system_user','table','table_name','temp','template','temporary','terminate','than','then','time','timestamp','timezone_hour','timezone_minute','to','toast','trailing','transaction','transactions_committed','transactions_rolled_back','transaction_active','transform','transforms','translate','translation','treat','trigger','trigger_catalog','trigger_name','trigger_schema','trim','true','truncate','trusted','type','uncommitted','under','unencrypted','union','unique','unknown','unlisten','unnamed','unnest','until','update','upper','usage','user','user_defined_type_catalog','user_defined_type_name','user_defined_type_schema','using','vacuum','valid','value','values','varchar','variable','varying','verbose','version','view','when','whenever','where','with','without','work','write','year','zone');
}

new dbOpt();

?>