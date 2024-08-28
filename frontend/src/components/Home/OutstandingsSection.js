function OutstandingsSection({ span, title, floatImage, background }) {
    return (
        <div className='outstanding-section' style={{ background: `url(${background})` }}>
            <div className="text">
                <span>{span}</span>
                <h5>{title}</h5>
            </div>
            <img src={floatImage} alt=""></img>
        </div>
    );
}

export default OutstandingsSection;
