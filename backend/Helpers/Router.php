<?php
class Router{
	private $base="";
	private $routes;
	private $middleware;

	public function __construct($base){
		$this->routes = ["get" => [], "post" => []];
		$this->base = $base;
		$this->middleware = [];
	}

	public function middleware($routes, $middleware){
		array_push($this->middleware, [$routes, $middleware]);
	}

	public function toRoute($route){
		header("LOCATION: ".$this->base.$route);
	}

	public function getBase(){return $this->base;}

	private function addRoute($method, $route, $callback){
		array_push($this->routes[$method], [$this->base.$route, $callback]);
	}

	public function get($route, $callback){$this->addRoute("get", $route, $callback);}

	public function post($route, $callback){$this->addRoute("post", $route, $callback);}

	private function matchURL($currentRoute, $route){
		// split the route by the /
		$currentRoute = explode('/', $currentRoute);
		$route = explode('/', $route);
		// if both routes aren't the same size they definetly don't match
		if(count($route) != count($currentRoute)){
			return ["flag"=>false];
		}
		$match = true;
		$variables = [];
		// if same size check each "folder"
		
			for($i = 0; $i < count($route); $i++){
				if(!empty($route[$i])){
				if($route[$i][0] === "{"){
					$key = ltrim($route[$i], "{");
					$key = rtrim($key, "}");
					$variables[$key] = $currentRoute[$i];
					continue;
				}
				if($route[$i] != $currentRoute[$i]){
					return ["flag"=>false];
				}
			}
			}
		
		$variables["flag"] = true;
		return $variables;
	}

	private function internalRoute($method, $currentRoute){
		$method = strtolower($method);
		$routes = $this->routes[$method];
		$notFound = true;
		foreach($routes as $route){
			$vars =  $this->matchURL($currentRoute, $route[0]);	
			// found a match
			if($vars["flag"]){
				unset($vars["flag"]);
				$notFound = false;
				// check middleware
				foreach($this->middleware as $middleware){
					foreach($middleware[0] as $link){
						$vars = $this->matchURL($currentRoute, $this->base.$link);	
						if($vars["flag"]){
							$middleware[1]();	
						}
					}
				}
				// calling callback
				$route[1]($vars);
				break;
			}
		}
		if($notFound){
			echo "404 page not found";	
		}
	}

	public function route(){
		$method = $_SERVER["REQUEST_METHOD"];
		$currentRoute = $_SERVER["REQUEST_URI"];
		$this->internalRoute($method, $currentRoute);
	}
}
?>
