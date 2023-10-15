import {NavLink} from 'react-router-dom'

function UpdateDish() {
    return ( 
        <div class="content">
            <nav className='nav-header'>
                <i class="fas fa-list"></i>
                <i class="fa-solid fa-user"></i>
            </nav>
            <nav className='nav-middle'>
                <div className="view-link">
                    <p className='top'>The Dishes</p>
                    <p><a href="/restaurant">Home</a></p>
                    <i class="fas fa-chevron-right"></i>
                    <p><NavLink to="/restaurant/dish">The Dishes</NavLink></p>
                    <i class="fas fa-chevron-right"></i>
                    <p>Update Dish</p>
                </div>
                <div className="add-dish">
                    
                </div>
            </nav>
            <div class="container-fluid">
                <section class="content">
                    <div class="row">
                        <div id="content-main">
                                <input type="hidden"/>
                                <div class="row">
                                    <div class="col-12 col-lg-9">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="form-group field-did">
                                                    <div class="row">
                                                        <label class="col-sm-3 text-left" for="id_did">
                                                            Did
                                                            <span class="text-red">* </span> 
                                                        </label>
                                                        <div class=" col-sm-7 field-did ">
                                                            <input className="input" type="text" name="did" value="324aga54a3" maxlength="20"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group field-title">
                                                    <div class="row">
                                                        <label class="col-sm-3 text-left" for="id_title">
                                                            Title
                                                            <span class="text-red">* </span>  
                                                        </label>
                                                        <div class=" col-sm-7 field-title">
                                                            <input className="input" type="text" name="title" maxlength="100"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group field-image">
                                                    <div class="row">
                                                        <label class="col-sm-3 text-left" for="id_image">
                                                            Image
                                                            <span class="text-red">* </span>
                                                        </label>
                                                        <div class=" col-sm-7 field-image">
                                                            <input type="file" name="image"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group field-description">
                                                    <div class="row">
                                                        <label class="col-sm-3 text-left" for="id_description">
                                                            Description
                                                        </label>
                                                        <div class=" col-sm-7 field-description">
                                                            <div class="django-ckeditor-widget" data-field-id="id_description" style={{display: "inline-block"}}>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group field-price">
                                                    <div class="row">
                                                        <label class="col-sm-3 text-left" for="id_price">
                                                            Price
                                                            <span class="text-red">* </span>
                                                        </label>
                                                        <div class=" col-sm-7 field-price">
                                                            <input className="input" type="number" name="price" value="2"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group field-old_price">
                                                    <div class="row">
                                                            <label class="col-sm-3 text-left" for="id_old_price">
                                                                Old price
                                                                <span class="text-red">* </span>
                                                            </label>
                                                            <div class="col-sm-7 field-old_price">
                                                                <input className="input" type="number" name="old_price" value="2"/>
                                                            </div>
                                                    </div>
                                                </div>
                                                <div class="form-group field-product_status">
                                                    <div class="row">
                                                        <label class="col-sm-3 text-left" for="id_product_status">
                                                            Product status
                                                            <span class="text-red">* </span>
                                                        </label>
                                                        <div class="col-sm-7 field-product_status">
                                                            <select className="input" name="product_status">
                                                                <option value="draft" data-select2-id="select2-data-2-4k8x">Draft</option>
                                                                <option value="disabled">Disabled</option>
                                                                <option value="rejected">Rejected</option>
                                                                <option value="in_review">In review</option>
                                                                <option value="published">Published</option>
                                                            </select>
                                                            <span class="select2 select2-container select2-container--default" style={{width: "90.4px"}}>
                                                            <span class="selection"><span class="select2-selection select2-selection--single">
                                                            <span class="select2-selection__rendered"title="Draft">Draft</span>
                                                            <span class="select2-selection__arrow" role="presentation">
                                                                <b role="presentation"></b>
                                                            </span></span>
                                                            </span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group field-featured">
                                                    <div class="row">
                                                        <label class="col-sm-3 text-left" for="id_featured">
                                                            Featured
                                                        </label>
                                                        <div class="col-sm-7 field-featured">
                                                            <input type="checkbox" name="featured" id="id_featured"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group field-digital">
                                                    <div class="row">   
                                                        <label class="col-sm-3 text-left" for="id_digital">
                                                            Digital
                                                        </label>
                                                        <div class="col-sm-7 field-digital">
                                                            <input type="checkbox" name="digital" id="id_digital"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group field-category">
                                                    <div class="row">
                                                        <label class="col-sm-3 text-left" for="id_category">
                                                            Category
                                                            <span class="text-red">* </span>
                                                        </label>
                                                        <div class="col-sm-7 field-category">
                                                            <div class="related-widget-wrapper" data-model-ref="category">
                                                                <select className="input" name="category">
                                                                    <option value="" selected="" data-select2-id="select2-data-4-6sp9">---------</option>
                                                                    <option value="1">Món Chính</option>
                                                                    <option value="2">Món phụ</option>
                                                                    <option value="3">Nước uống</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-lg-3">
                                        <div class="form-group">
                                            <input type="submit" value="Save" class="btn btn-success form-control"/>
                                        </div> 
                                        {/* <div class="form-group">
                                            <input type="submit" class="btn btn-info form-control"/>
                                        </div>
                                        <div class="form-group">
                                            <input type="submit" class="btn btn-info form-control"/>
                                        </div> */}
                                    </div>
                                </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
     );
}

export default UpdateDish;