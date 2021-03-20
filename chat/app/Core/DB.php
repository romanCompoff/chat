<?php

namespace Dva\Chat\Core;

class DB
{
	protected static $instance;
	
	public static function getConnect()
	{
		if(self::$instance === NULL){
			self::$instance = self::connect();
		}
		return self::$instance;
	}
	
	protected static function connect()
	{

		$dsn = sprintf('%s:host=%s;dbname=%s;charset=UTF8', 'mysql', 'localhost', 'chat');
		$opt = [
			\PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
        	\PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC
        ];
		return new \PDO($dsn, 'root', '', $opt);
	}

}

