function Contact() {
    return ( 
        <div className="container">
            <div className="row">
                <div className="col-lg-12 col-sm-12 col-md-12">
                    <div className="contact">
                        <div className="contact__container">
                            <div className="contact__title">
                                <h3>Contact Us</h3>
                            </div>
                            <div className="contact__content">
                                <label>Title</label>
                                <input type="text"></input>
                                <label>Content</label>
                                <textarea type="text" rows="5"></textarea>
                                <button className="btn">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Contact;