import React, { useEffect, useState } from "react";

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
			creaTodo(inputValue)
		}

	}
	// const eliminarTarea = (index) => {
	// 	const nuevaLista = [...tarea];
	// 	nuevaLista.splice(index, 1);
	// 	setTarea(nuevaLista);
	// }



	const traerTarea = () => {
		fetch("https://playground.4geeks.com/todo/users/Denesjakab")
			.then((response) => {
				console.log(response)
				return response.json()
			})
			.then((data) =>

				setTarea(data.todos)
			)
			.catch((err) => { err })

	}

	const eliminarTarea = (id) => {
		fetch(`https://playground.4geeks.com/todo/todos/${id}`,  //la url que sea modificable
			{ method: "DELETE" }

		)
			.then((response) => {
				console.log(response)
				traerTarea()
			})
			.catch((err) => { err })

	}

	const creaTodo = async () => {
		const dataToSend = {
				"label": inputValue,
				"is_done": false
		}
		const nuevaTarea = [...tarea, dataToSend];
		const response = await fetch('https://playground.4geeks.com/todo/todos/Denesjakab', {
			method: 'POST',
			body: JSON.stringify(dataToSend), 
			headers: {
			   'Content-Type': 'application/json'
			}
		});
		if (response.ok) {
			const data = await response.json();
			setTarea(nuevaTarea);
			traerTarea();
			return data;

		} else {
			console.log('error: ', response.status, response.statusText);
			/* Realiaza el tratamiento del error que devolvió el request HTTP */
			return {error: {status: response.status, statusText: response.statusText}};
		};


	};


	useEffect(() => {
		traerTarea()
	}, [])


	const tareaList = tarea.map((cosas, index) => (<li key={index}
		className="list-group-item">{cosas.label}
		<button
			onClick={() => eliminarTarea(cosas.id)}
			className="button">X</button></li>))


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
