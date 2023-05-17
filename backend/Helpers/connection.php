<?php
class Connection{
				private static $pdo1;
				private static $pdo2;
				private static $pdo3;
				// connection values
				private static $host = "localhost";
				private static $dbname1 = "db1";
				private static $dbname2 = "db2";
				private static $dbname3 = "db3";
				private static $user = "root";
				private static $pass = "";
				// make constructor private for singleton pattern
				private function __construct(){}
				// get a new connection
				public static function getConnection(){
								if(empty(self::$pdo1)){
												// create a new connection
												try{
																self::$pdo1 = new PDO('mysql:host='.self::$host.';dbname='.self::$dbname1, self::$user, self::$pass);
																self::$pdo1->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
												}catch(PDOException $error){
																echo $error->getMessage();
												}
								}
								if(empty(self::$pdo2)){
									// create a new connection
									try{
													self::$pdo2 = new PDO('mysql:host='.self::$host.';dbname='.self::$dbname2, self::$user, self::$pass);
													self::$pdo2->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
									}catch(PDOException $error){
													echo $error->getMessage();
									}
								}
								if(empty(self::$pdo3)){
									// create a new connection
									try{
													self::$pdo3 = new PDO('mysql:host='.self::$host.';dbname='.self::$dbname3, self::$user, self::$pass);
													self::$pdo3->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
									}catch(PDOException $error){
													echo $error->getMessage();
									}
								}
								return [self::$pdo1,self::$pdo2,self::$pdo3];
				}
}

?>
