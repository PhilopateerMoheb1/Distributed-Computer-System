export default function HomeCard(props){
    return(
        <div className="col mb-5">
            <div className="card h-100">
                <img className="card-img-top" src={props.img} alt="..." />
                <div className="card-body p-1">
                    <div className="text-center">
                        <h4 className="card-title text-center fw-bolder">{props.name}</h4>
                        <p className = "home-product-description">Category : {props.category}</p>
                    </div>
                </div>
                <div className="card-body p-2">
                    <div className="text-center">
                        <h6 className="fw-holder">Avaliable Quantity: {props.available}</h6>
                        <h6>Price: {props.price} L.E. </h6>
                    </div>
                </div>
                <div className="card-body p-3">
                    <div className="text-center">
                        <p className = "home-product-description">{props.description}</p>
                    </div>
                </div>
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="home-product-card row">
                        <a className="btn view-product  mt-auto" href={"/Products/"+props.id}>View Product</a>
                    </div>
                </div>
            </div>
        </div>
    );
}