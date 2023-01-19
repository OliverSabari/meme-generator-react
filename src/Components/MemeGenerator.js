import axios from "axios"
import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"

const MemeGenerator = () => {


    const [formData , setFormData] = useState( { 
                                                header : "",
                                                footer : "",
                                                imgurl : ""
                                                 })


    useEffect(() => {

        axios.get("https://api.imgflip.com/get_memes")
             .then(res => res.json())
             .then(data => console.log(data))

    }, [])


    return (
        <Container>
            <section className="memesection-div">
                <div className="form-div">

                    <input type="text"
                        placeholder="Enter the header text"
                        name="header"
                    />

                    <input type="text"
                        placeholder="Enter the Footer text"
                        name="footer"
                    />

                    <button className="meme-button">
                        Get Your Meme Image
                    </button>
                </div>

                <div className="img-div">

                    <img src="https://unsplash.com/random"
                        alt="memeimage"
                        className="meme-image"
                    />

                </div>
            </section>
        </Container>
    )
}

export default MemeGenerator