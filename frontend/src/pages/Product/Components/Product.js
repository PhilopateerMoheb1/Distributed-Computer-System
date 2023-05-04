function Product(props){
    return(
        <div class="card">
        <div class="card__title">
          <div class="icon">
            <a href="#"><i class="fa fa-arrow-left"></i></a>
          </div>
          <h3>New products</h3>
        </div>
        <div class="card__body">
          <div class="half">
            <div class="featured_text">
              <p class="sub">{props.name}</p>
              <p class="price">$210.00</p>
            </div>
            <div class="image">
              <img src={props.img} alt=""/>
            </div>
          </div>
          <div class="half">
            <div class="description">
              <p>{props.description}</p>
            </div>
            <span class="stock"><i class="fa fa-pen"></i> In stock</span>
            <div class="reviews">
              <ul class="stars">
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star-o"></i></li>
              </ul>
              <span>(64 reviews)</span>
            </div>
          </div>
        </div>
        <div class="card__footer">
          <div class="recommend">
            <p>Recommended by</p>
            <h3>Andrew Palmer</h3>
          </div>
          <div class="action">
            <button type="button">Buy!</button>
          </div>
        </div>
      </div>
    );
}

export default Product;