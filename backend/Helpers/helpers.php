<?php
function uploadImage($img, &$error, $folder){
	// Make sure that there is no upload error
	if($img["error"] != 0){
		$error = "There was a problem with uploading the image, try again later.";
		return "";
	}

	// Make sure that the image size is less than 3MB
	if($img["size"] > 3000000){
		$error = "Image Size was Greater Than 3MB";
		return "";
	}

	// Make sure that the file is an image
	if(explode("/", $img["type"])[0] !== "image"){
		$error = "File Choosen was not an Image";
		return "";
	}

	$base = $_SERVER["DOCUMENT_ROOT"].ObjectManager::getBase()."/Views/Uploads/".$folder."/";
	$name = explode(".", $img["name"]);
	$extension = $name[count($name) -1];
	$newName = uniqid("IMG-", true).".".$extension;
	move_uploaded_file($img["tmp_name"], $base.$newName);
	return $newName;
}
function convert_object_to_array($data) {

    if (is_object($data)) {
        $data = get_object_vars($data);
    }

    if (is_array($data)) {
        return array_map(__FUNCTION__, $data);
    }
    else {
        return $data;
    }
}
