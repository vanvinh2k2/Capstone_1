import img from "../../assets/images/contact_us.png"

function Contact() {
    return ( 
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-sm-6 col-md-6">
                    {/* <img src={img}/> */}
                    <h3 className="title_contact">Contact Us</h3>
                    <p>Feel like contacting us? Submit your queries here and we will get back to you as soon as possible.</p>
                    <div className="contact-content">
                        <div className="contact-infor">
                            <div className="contact-infor-icon">
                                <i className="fa-solid fa-location-dot" style={{color: 'red'}}></i>
                            </div>
                            <div className="contact-infor-label">
                                <b>Address</b>
                                <p>Duy Xuyen, Quang Nam</p>
                            </div>
                        </div>
                        <div className="contact-infor">
                            <div className="contact-infor-icon">
                                <i className="fa-solid fa-phone" style={{color: 'green'}}></i>   
                            </div>
                            <div className="contact-infor-label">
                                <b>Phone</b>
                                <p>0354342295</p>
                            </div>
                        </div>
                        <div className="contact-infor">
                            <div className="contact-infor-icon">
                                <i className="fa-solid fa-envelope" style={{color: 'orange'}}></i>
                            </div>
                            <div className="contact-infor-label">
                                <b>Email</b>
                                <p>ngov6769@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-sm-6 col-md-6">
                    <div className="contact">
                        <div className="contact__container">
                            <div className="contact__title">
                                <h3>Send Message</h3>
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