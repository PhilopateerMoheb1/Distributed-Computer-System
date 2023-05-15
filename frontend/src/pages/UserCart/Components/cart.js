export default function UserInfoPage(props){
    return(
        <div className="row">
            {/* image column */}
            <div className="col col-lg-2 mycart-img-col">
                <img src={props.img} className="img-fluid img-thumbnail" alt=""/>
            </div>
            {/* name & description column */}
            <div className="col col-lg-5 mycart-namedesc-col">
                <h4 className="product-name"><strong>{props.name}</strong></h4>
                <h4><small>{props.describtion}</small></h4>
            </div>
            {/* price column */}
            <div className="col col-lg-5 mycart-price-col">
                <div className="row">
                    <div className="col col-lg-6 text-right">
                        <h6><strong>{props.price} <span className="text-muted">x</span></strong></h6>
                    </div>
                    <div className="col col-lg-4">
                        <input onChange={handleChange} type="text" className="form-control input-sm" value={1}/>
                    </div>
                    <div className="col col-lg-2">
                        <button type="button" className="btn btn-link">
                            <FontAwesomeIcon icon="fa-solid fa-trash" />
                        </button>
                    </div>
                </div>
            </div>
            <hr/>
        </div>
        
    );
}