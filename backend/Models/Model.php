<?php
require_once(dirname(__DIR__) . "/Helpers/Connection.php");
// a parent class for all models that handles pdo so that a new model can simply inherit from this class, set some attributes and get going
class Model
{
	// filled from parent class and includes the table name of the model
	private $name;
	// filled from parent class and includes the table columns of the model
	private $fields;
	private $pdo1;
	private $pdo2;
	private $pdo3;
	public function __construct($name, $fields)
	{
		$this->pdo1 = Connection::getConnection()[0];
		$this->pdo2 = Connection::getConnection()[1];
		$this->pdo3 = Connection::getConnection()[2];
		$this->name = $name;
		$this->fields = $fields;
	}

	// lists all entries in table
	public function getAlldb1()
	{
		$stmt = $this->pdo1->query("SELECT * FROM " . $this->name . ";");
		return $stmt->fetchAll();
	}
	public function getAlldb2()
	{
		$stmt = $this->pdo2->query("SELECT * FROM " . $this->name . ";");
		return $stmt->fetchAll();
	}
	public function getAlldb3()
	{
		$stmt = $this->pdo3->query("SELECT * FROM " . $this->name . ";");
		return $stmt->fetchAll();
	}

	public function getBy($col, $val)
	{
		$sql = "SELECT * FROM " . $this->name . " WHERE " . $col . "=?;";
		$stmt = $this->pdo3->prepare($sql);
		$arr = [];
		array_push($arr, $val);
		$stmt->execute($arr);
		return $stmt->fetchAll();
	}
	public function getBydb1($col, $val)
	{
		$sql = "SELECT * FROM " . $this->name . " WHERE " . $col . "=?;";
		$stmt = $this->pdo1->prepare($sql);
		$arr = [];
		array_push($arr, $val);
		$stmt->execute($arr);
		return $stmt->fetchAll();
	}
	public function getByInTransaction($col, $In,$BID)
	{
		$sql = "SELECT * FROM " . $this->name . ",transaction" . " WHERE " . "product.PID" . " IN" . $In . " AND transaction.PID = product.PID AND transaction.BID = ".$BID.";";
		$stmt = $this->pdo3->prepare($sql);
		$arr = [];
		array_push($arr, $In);
		$stmt->execute();
		return $stmt->fetchAll();
	}
	public function getByInSold($col, $In,$SID)
	{
		$sql = "SELECT * FROM " . $this->name . ",transaction" . " WHERE " . "product.PID" . " IN" . $In . " AND transaction.PID = product.PID AND transaction.SID = ".$SID.";";
		$stmt = $this->pdo3->prepare($sql);
		$arr = [];
		array_push($arr, $In);
		$stmt->execute();
		return $stmt->fetchAll();
	}
	public function getByIn($col, $In)
	{
		$sql = "SELECT * FROM " . $this->name . ",transaction" . " WHERE " . "product.PID" . " IN" . $In . " AND transaction.PID = product.PID;";
		$stmt = $this->pdo3->prepare($sql);
		$arr = [];
		array_push($arr, $In);
		$stmt->execute();
		return $stmt->fetchAll();
	}


	public function getLike($regex, $category, $min, $max)
	{
		$arr = [];
		if ($category === "all") {
			$sql = "SELECT * FROM " . $this->name . " WHERE (Product_Price BETWEEN " . $min . " AND " . $max . ") AND Product_Name LIKE ?;";
			$stmt = $this->pdo3->prepare($sql);
			array_push($arr, $regex);
		} else {
			$sql = "SELECT * FROM " . $this->name . " WHERE  Category =? AND (Product_Price BETWEEN " . $min . " AND " . $max . ") AND Product_Name LIKE ?;";
			$stmt = $this->pdo3->prepare($sql);
			array_push($arr, $category);
			array_push($arr, $regex);
		}
		$stmt->execute($arr);
		return $stmt->fetchAll();
	}

	// inserts an item into table 
	public function insertdb1($newRow)
	{
		// prepare the query
		$query = "INSERT INTO " . $this->name . " (";
		foreach ($this->fields as $field) {
			$query = $query . $field . ",";
		}
		$query = rtrim($query, ",");
		$query = $query . ") VALUES (";
		foreach ($this->fields as $field) {
			$query = $query . ":" . $field . ",";
		}
		$query = rtrim($query, ",");
		$query = $query . ");";
		$query = $query . "DELETE FROM DB1.user;";
		// run the query
		$stmt = $this->pdo1->prepare($query);
		$stmt->execute($newRow);
	}
	public function insertdb2($newRow)
	{
		// prepare the query
		$query = "INSERT INTO " . $this->name . " (";
		foreach ($this->fields as $field) {
			$query = $query . $field . ",";
		}
		$query = rtrim($query, ",");
		$query = $query . ") VALUES (";
		foreach ($this->fields as $field) {
			$query = $query . ":" . $field . ",";
		}
		$query = rtrim($query, ",");
		$query = $query . ");";
		// run the query
		$stmt = $this->pdo2->prepare($query);
		$stmt->execute($newRow);
	}
	public function insertdb3($newRow)
	{
		// prepare the query
		$query = "INSERT INTO " . $this->name . " (";
		foreach ($this->fields as $field) {
			$query = $query . $field . ",";
		}
		$query = rtrim($query, ",");
		$query = $query . ") VALUES (";
		foreach ($this->fields as $field) {
			$query = $query . ":" . $field . ",";
		}
		$query = rtrim($query, ",");
		$query = $query . ");";
		// run the query
		$stmt = $this->pdo3->prepare($query);
		$stmt->execute($newRow);
	}
	public function Update($updated, $update, $where, $wherevalue)
	{
		$sql = "UPDATE " . $this->name . " SET " . $updated . "=? WHERE " . $where . "=" . "'" . $wherevalue . "'";
		echo $sql;
		$stmt = $this->pdo3->prepare($sql);
		$stmt->execute([$update]);
	}
	public function Updatedb1($updated, $update, $where, $wherevalue)
	{
		$sql = "UPDATE " . $this->name . " SET " . $updated . "=? WHERE " . $where . "=" . "'" . $wherevalue . "'";
		echo $sql;
		$stmt = $this->pdo1->prepare($sql);
		$stmt->execute([$update]);
	}
	public function Updatedb2($updated, $update, $where, $wherevalue)
	{
		$sql = "UPDATE " . $this->name . " SET " . $updated . "=? WHERE " . $where . "=" . "'" . $wherevalue . "'";
		echo $sql;
		$stmt = $this->pdo2->prepare($sql);
		$stmt->execute([$update]);
	}

	public function Updatedb3($name, $price, $quantity, $category, $description, $picture, $where, $wherevalue)
	{
		$arr = [];
		$sql = "UPDATE " . $this->name . " SET Product_Name =?,  Product_Price =?, Quantity_Available =?,  Category =?, Product_Description =?, Product_Picture =? WHERE " . $where . "=" . "'" . $wherevalue . "'";
		array_push($arr, $name);
		array_push($arr, $price);
		array_push($arr, $quantity);
		array_push($arr, $category);
		array_push($arr, $description);
		array_push($arr, $picture);
		$stmt = $this->pdo3->prepare($sql);
		$stmt->execute($arr);
	}

	public function Deletedb3($where, $wherevalue)
	{
		$sql = "Delete From " . $this->name . " WHERE " . $where . "=" . "'" . $wherevalue . "'";
		echo $sql;
		$stmt = $this->pdo3->prepare($sql);
		$stmt->execute();
	}
}
?>