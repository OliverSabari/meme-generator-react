

const Header = () => {
    return (
        <div>

            <header className="header-container">

            <img 
            src={process.env.PUBLIC_URL + "/Images/trollface.png"} 
            alt="logo" 
            className="logo-image"
            />

            <h3 className="header-text">
                  Meme Generator
            </h3>

            </header>
            
        </div>
    )
}

export default Header