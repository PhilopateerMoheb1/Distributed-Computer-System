<?php
class products extends Model
{
    public function __construct()
    {
        parent::__construct("product", array("SID", "Product_Name", "Product_Price", "Product_Picture", "Quantity_Available", "Product_Description", "Category"));
    }
}
?>