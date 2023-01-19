import axios from "axios"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { Container, Button } from "react-bootstrap"
import * as Yup from 'yup'

const MemeGenerator = () => {


    const [formData, setFormData] = useState({
        header: "Mom : I deleted all your games in your PC",
        footer: "*she actually deleted the desktop icons not the games*",
        imgurl: "https://i.imgflip.com/4acd7j.png"
    })

    const [memeData, setMemeData] = useState([])

    //Fetching API data while loading the page

    useEffect(() => {

        axios.get("https://api.imgflip.com/get_memes")
            .then(res => res.data)
            .then(data => setMemeData(data.data.memes))
 
    }, [])


    //getting header and footer text from user and setting it to state

    function handleChange(event) {

        const { name, value } = event.target

        return (

            setFormData(prevData => {
                return {
                    ...prevData,
                    [name]: value
                }
            })

        )
    }



    //Getting random number while user clicks on button and getting the url and setting it to state

    function handleClick() {

        const randomno = Math.floor(Math.random() * memeData.length)

        const randomurl = memeData[randomno].url

        setFormData(prevState => {
            return {
                ...prevState,
                imgurl: randomurl
            }
        })
    }

    //Using formik to handle the forms

    const formik = useFormik({
        initialValues : {
            header: "Mom : I deleted all your games in your PC",
            footer: "*she actually deleted the desktop icons not the games*",
            imgurl: "https://i.imgflip.com/4acd7j.png"
        },
        validationSchema: Yup.object({
            header : Yup.string().required("Header name is required").max(30, "Header name must be less than 30 characters"),
            footer : Yup.string().required("Header name is required").max(30, "Header name must be less than 30 characters")
        })
    })

    return (
        <Container>

            <section className="memesection-div">

                <div className="form-div">

                    <input type="text"
                        placeholder="Enter the header text"
                        name="header"
                        value={formData.header}
                        onChange={handleChange}
                    />

                    <input type="text"
                        placeholder="Enter the Footer text"
                        name="footer"
                        value={formData.footer}
                        onChange={handleChange}
                    />

                    <Button
                        className="meme-button"
                       
                        onClick={handleClick}
                    >
                        Get Your Meme Image
                    </Button>

                </div>

                <div className="img-div">

                    <p className="meme-text top"> {formData.header} </p>

                    <img src={formData.imgurl}
                        alt="memeimage"
                        className="meme-image"
                    />

                    <p className="meme-text bottom"> {formData.footer} </p>

                </div>

            </section>

        </Container>
    )
}

export default MemeGenerator