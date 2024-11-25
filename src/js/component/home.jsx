import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState(""); /*guarda información para luego modificar el estado original*/
	const [tarea, setTarea] = useState([]);

	const addTask = (tareaFinal) => {    /*función que se encarga de agregar nuevas tareas a la lista*/
		setTarea([...tarea, tareaFinal])
		setInputValue("") /*convierte un estado en vacio una vez modificado*/
	}

	const manejarTecla = (event) => {  /*función para si el usuario pulsa enter, la otra funcion addtask sume una tarea a la lista*/
		if (event.key === "Enter") {
			addTask(inputValue)
		}

	}
	const eliminarTarea = (index) => {
		const nuevaLista = [...tarea];
		nuevaLista.splice(index, 1);
		setTarea(nuevaLista);
	}

	const tareaList = tarea.map(cosas => <li className="list-group-item">{cosas}
		<button
			onClick={eliminarTarea}
			className="button">X</button></li>)

			
	return (
		<div className="text-center container">
			<h1 className="text-center mt-5">Tareas por hacer:</h1>

			<input className="form-control"
				placeholder="EJ: lavar la ropa"
				onKeyDown={manejarTecla}
				value={inputValue}
				onChange={(event) => {
					setInputValue(event.target.value)
				}}
			/>
			<ul className="list-group">
				{tarea.length === 0 ? (<p className="text-muted">No hay tareas pendientes.</p>) 
				: 
				(
					tareaList
				)}
			</ul>
		</div>


	);
};

export default Home;
