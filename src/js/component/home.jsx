import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState(""); /*guarda información para luego modificar el estado original*/
	const [tareas, setTareas] = useState([]);// los set sobreescriben, no vacian 

	const addTask = (tareasFinal) => {    /*función que se encarga de agregar nuevas tareass a la lista*/
		setTareas([...tareas, tareasFinal])
		setInputValue("") /*convierte un estado en vacio una vez modificado*/
	}

	const manejarTecla = (event) => {  /*función para si el usuario pulsa enter, la otra funcion addtask sume una tareas a la lista*/
		if (event.key === "Enter") {
			creaTodo(inputValue)
		}

	}

	const CrearUsuario = () => {
		fetch("https://playground.4geeks.com/todo/users/Denesjakab",
			{ method: "POST" }
		)
			.then((response) => {
				console.log(response)
				return response.json()
				
			})
			.then((result) => console.log(result))
			.catch((err) => console.error(err));
	}

	const traerTareas = () => {
		fetch("https://playground.4geeks.com/todo/users/Denesjakab")
			.then((response) => { //crear condicion que si la respuesta no es correcta, llamar a la funcion crear usuario, si es correcta return respuesta.json
				if (!response.ok) {
					CrearUsuario()
				}
				else {
					return (response.json())
				}
			})
			.then((data)=>{
				console.log(data.todos)
				setTareas(data.todos)//dentro del parentesis es el nuevo valor que va a tener
			})

			.catch((err) => { err })

	}

	const eliminarTareas = (id) => {
		fetch(`https://playground.4geeks.com/todo/todos/${id}`,  //la url que sea modificable
			{ method: "DELETE" }

		)
			.then((response) => {
				console.log(response)
				traerTareas()
			})
			.catch((err) => { err })

	}

	const creaTodo = async () => {
		const dataToSend = {
			"label": inputValue,
			"is_done": false
		}
		const nuevasTareas = [...tareas, dataToSend];
		const response = await fetch('https://playground.4geeks.com/todo/todos/Denesjakab', {
			method: 'POST',
			body: JSON.stringify(dataToSend),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (response.ok) {
			const data = await response.json();
			setTareas(nuevasTareas);
			traerTareas();
			return data;

		} else {
			console.log('error: ', response.status, response.statusText);
			/* Realiaza el tratamiento del error que devolvió el request HTTP */
			return { error: { status: response.status, statusText: response.statusText } };
		};


	};


	useEffect(() => {
		traerTareas()
	}, [])


	const tareasList = tareas.map((cosas, index) => (<li key={index}
		className="list-group-item">{cosas.label}
		<button
			onClick={() => eliminarTareas(cosas.id)}
			className="button">X</button></li>))


	return (
		<div className="text-center container">
			<h1 className="text-center mt-5">tareass por hacer:</h1>

			<input className="form-control"
				placeholder="EJ: lavar la ropa"
				onKeyDown={manejarTecla}
				value={inputValue}
				onChange={(event) => {
					setInputValue(event.target.value)
				}}
			/>
			<ul className="list-group">
				{tareas.length === 0 ? (<p className="text-muted">No hay tareass pendientes.</p>)
					:
					(
						tareasList
					)}
			</ul>
		</div>
	);
};

export default Home;
