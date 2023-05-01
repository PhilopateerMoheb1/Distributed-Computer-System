
<?php 
     class users extends Model{
        public function __construct(){
            parent::__construct("users",array("FirstName", "LastName", "Email", "Password", "Role", "PhoneNumber", "Gender", "DOB", "University", "Faculty"));
        }
    }
 ?>
