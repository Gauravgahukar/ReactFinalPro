function ContactUs() {
    return (
        <>
            <div className="contact-container">
                <h1>Contact Us 📩</h1>
                <p>
                    Have questions, feedback, or need assistance? Feel free to reach out to us! 
                    Fill out the form below, and we’ll get back to you as soon as possible.
                </p>

                <form className="contact-form">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            placeholder="Enter your name" 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="Enter your email" 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea 
                            id="message" 
                            rows="5" 
                            placeholder="Enter your message" 
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="send-button">Send Message</button>
                </form>
            </div>
        </>
    );
}

export default ContactUs;
