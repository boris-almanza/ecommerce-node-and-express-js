
/*
let elem = document.getElementById('bot');
elem.onclick = function () {
	fetch('/prueba',{
	method: 'GET'
	
}).then(response=>{ 		//the method then() se ejecuta cuando la promesa devulta por fect se resulve exitosamente
	return response.json();	//el metodo then() retorna otra promesa por lo cual 
							//podemos seguir encadenando y llamando a mas metodos then()
}).then(data=>{
	console.log(data);
})

}*/
									

	let elem  = document.getElementById('bot');
	elem.onclick = function () {

		this.disabled= true;
			crearNodo()
	const xhr = new XMLHttpRequest();
	console.log('creamos instancia de xhr')
	xhr.open('get', '/ajax', true);
	
	xhr.onreadystatechange = function () {
		elem.disabled = false;
		let cont = document.getElementById('contenedor')
		if(this.readyState == 4 && this.status == 200)
			if(this.responseText != null){
				let div = document.getElementById('dato');
				console.log(this.responseText)
				div.innerHTML = this.responseText
			}
	}


	xhr.send(null);
	}


/*
xhr.onreadystatechange--> es una propiedad o/y manejador de evento que esta a la
escucha de la propiedad readyState, cuando este ultimo cambia la funcion enlazada a 
onreadystatechange se dispara o se llama automaticamente



############ Objeto de ajax ###########3
XMLHttpRequest = {
	readyState -> describe o indica el status actual de la transaccion o el request
				0 (uninitialized)
			    1 (loading)
			    2 (response headers received)
			    3 (some response body received)
			    4 (request complete)

	status	   -> codigo de estado http retornado por el servidor
	
onreadystatechange=''

}*/
	



	function crearNodo (argument) {

		let contenedor= document.createElement('div')
		let textNode = document.createTextNode('cargando...')
		let parentDiv = document.createElement('div')
		contenedor.className='contenedor'
		parentDiv.className= 'sk-chase';

		for(let i = 0 ; i<5;i++){
		let childDiv = document.createElement('div')
		childDiv.className= 'sk-chase-dot';
		parentDiv.appendChild(childDiv)
		}
		contenedor.appendChild(textNode);
		contenedor.appendChild(parentDiv);
		
		document.body.appendChild(contenedor)


		
	}


	/*
	document
		createTextNode(data)

	node 
	 element (element hereda de node)
		appendChild(nodoHijo)
	*/