<?php
require_once(dirname(__DIR__)."/Helpers/Connection.php");
// a parent class for all models that handles pdo so that a new model can simply inherit from this class, set some attributes and get going
class Model{
	// filled from parent class and includes the table name of the model
	private $name;
	// filled from parent class and includes the table columns of the model
	private $fields;
	private $pdo;
	public function __construct($name, $fields){
		$this->pdo = Connection::getConnection();
		$this->name = $name;
		$this->fields = $fields;
	}

	// lists all entries in table
	public function getAll(){
		$stmt = $this->pdo->query("SELECT * FROM ".$this->name.";");
		return $stmt->fetchAll();
	}

	public function getBy($col, $val){
		$sql = "SELECT * FROM ".$this->name." WHERE ".$col."=?;";
		$stmt = $this->pdo->prepare($sql);
		$arr = [];
		array_push($arr, $val);
		$stmt->execute($arr);
		return $stmt->fetchAll();
	}

	// inserts an item into table 
	public function insert($newRow){
		// prepare the query
		$query = "INSERT INTO ".$this->name." (";
		foreach($this->fields as $field){
			$query = $query.$field.",";
		}
		$query = rtrim($query, ",");
		$query = $query.") VALUES (";
		foreach($this->fields as $field){
			$query = $query.":".$field.",";
		}
		$query = rtrim($query, ",");
		$query = $query.");";

		// run the query
		$stmt = $this->pdo->prepare($query);
		$stmt->execute($newRow);
	}
}
?>
