
<?php 
     class users extends Model{
        public function __construct(){
            parent::__construct("user",array("Name", "Address", "Phone_Number", "Email", "Password", "Gender", "DOB", "Role", "Cash_Balance"));
        }
    }
 ?>
