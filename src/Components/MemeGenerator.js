import axios from "axios"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { Container, Button } from "react-bootstrap"
import * as Yup from 'yup'

const MemeGenerator = () => {

    const [url , setURL] = useState("https://i.imgflip.com/4acd7j.png")

    const [memeData, setMemeData] = useState([])

    //Fetching API data while loading the page

    useEffect(() => {

        axios.get("https://api.imgflip.com/get_memes")
            .then(res => res.data)
            .then(data => setMemeData(data.data.memes))
 
    }, [])


    //Using formik to handle the forms

    const formik = useFormik({
        initialValues : {
            header: "Mom : I deleted all your games in your PC",
            footer: "*she actually deleted the desktop icons not the games*",
            imgurl: "https://i.imgflip.com/4acd7j.png"
        },
        validationSchema: Yup.object({
            header : Yup.string().required("Header name is required").max(100, "Header name must be less than 100 characters"),
            footer : Yup.string().required("footer name is required").max(100, "footer name must be less than 100 characters")
        }),
        onSubmit : (values) => {

    //Getting random number while user clicks on button and getting the url and setting it to state

            const randomno = Math.floor(Math.random() * memeData.length)

            const randomurl = memeData[randomno].url
            
            setURL(randomurl)

        }
    })

    return (
        <Container>

            <section className="memesection-div">

                <div className="form-div">

                    <input type="text"
                        placeholder="Enter the header text"
                        name="header"
                        value={formik.values.header}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                   

                    <input type="text"
                        placeholder="Enter the Footer text"
                        name="footer"
                        value={formik.values.footer}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
         
                    <Button
                        className="meme-button"
                       
                        onClick={formik.handleSubmit}
                    >
                        Get Your Meme Image
                    </Button>

                </div>

                {formik.touched.header && formik.errors.header ? <p className="error-div"> {formik.errors.header}</p> : null }

                {formik.touched.footer && formik.errors.footer ? <p className="error-div"> {formik.errors.footer}</p> : null }

                <div className="img-div">

                    <p className="meme-text top"> {formik.values.header} </p>

                    <img src={url}
                        alt="memeimage"
                        className="meme-image"
                    />

                    <p className="meme-text bottom"> {formik.values.footer} </p>

                </div>

            </section>

        </Container>
    )
}

export default MemeGenerator