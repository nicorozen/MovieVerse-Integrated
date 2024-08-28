import React from 'react';
import CountUp from '../Home/CountUp';

function Information(){
    return(
    <>
    <div className="information-section">

    <InformationItem  title={300} subtitle={"Películas y series para ver"} text={"Desde películas icónicas hasta series originales, tenemos una amplia variedad de opciones para todos los gustos."}/>
    <InformationItem  title={40} subtitle={"Géneros para navegar"} text={"Explora nuestra variada colección de géneros en nuestra biblioteca de películas y series."}/>
    <InformationItem  title={200} subtitle={"Actores y directores distintos"} text={"Descubre una selección única de películas y series con talento de primera línea. ¡Sumérgete en el mejor cine con nosotros!"}/>
    
    </div>
    </>
    );

}

export default Information;

function InformationItem({title, subtitle, text}){
    return(
    <>
    <div className="item">
        <h4>+ <CountUp end={title} /></h4>
        <h5>{subtitle}</h5>
        <p>{text}</p>
        
    </div>
    </>        
    );
}