<?php 
     class products extends Model{
        public function __construct(){
            parent::__construct("product",array("SID", "Product_Name", "Proudct_Price", "Product_Picture", "Quantity_Availble", "Product_Description","Category"));
        }
    }
 ?>
