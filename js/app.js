
//Quitamos el evento de enviar (submit),para que nuestra pagina no se actualize al guardar cada tarea.
document.getElementById('formTask').addEventListener('submit',guardarTasks);

//Esta funcion Guarda los datos ingresados en los inputs,ademas los guardara en LocalStorage([{}]), para poder utilizarlos luego en la Funcion MostrarTask()-
function guardarTasks(e){
    //le pasamos el Eveto de addEventListener por parametro a la funcion guardarTasks
    
    const title = document.getElementById('title').value;//guardamos en una constante los valores ingresado desde el input con id(title)
    const description = document.getElementById('description').value;//lo mismo hacemos en el textArea, desde su id (description)
    

    //luego generamos un objeto con los valores ingresados en cada constante
    const taskDate = {
        title,
        description,
    }  
    //localStorage.setItem('task',JSON.stringify(task));
    /*luego usamos localStorage.setItem para poder guardar los datos ingresados en el objeto task.
    con JSON.stringify(task),lo que hacemos es pasar los parametros/valores del objeto a string para poder verlos en el localStorage.
    */
    if (localStorage.getItem('nuevoArrayTasks') === null){
        //le preguntamos si en localStorage hay una key con el nombre nuevoArrayTasks para poder crear la lista de tareas
        let nuevoArrayTasks =[];
        //creamos una variable que contendra todos los datos ingresadas en la constante taskDate
        nuevoArrayTasks.push(taskDate);
        //le agregamos los datos recibidos en taskDate al nuevoArrayTasks con push()
        localStorage.setItem('nuevoArrayTasks',JSON.stringify(nuevoArrayTasks));
        //mandamos nuestros datos a localStorage
        
        
    }else{
        //obtenemos las tareas ya ingresadas anteriormente en localstorage
        let nuevoArrayTasks = JSON.parse(localStorage.getItem('nuevoArrayTasks'));
        //volvemos a cargarlas con push()
        nuevoArrayTasks.push(taskDate);
        //y la volvemos a almacenar en localstrorage
        localStorage.setItem('nuevoArrayTasks',JSON.stringify(nuevoArrayTasks));
    }
    document.getElementById('formTask').reset()
    e.preventDefault();//con PreventDefault() quitamos el metodo default de submit.
    mostrarTaks()
}

//Esta Funcion muesta los datos ingresados en cada input en una card.
function mostrarTaks(){
    //Recibimos las tareas ingresadas en LocalStorage 
    let taskRecibida = JSON.parse(localStorage.getItem('nuevoArrayTasks'));
    //guardo en una variable los datos del div donde voy a mostrar las tareas ingresadas
    let outputTask = document.getElementById('outputTask');
    //limpiamos el div donde van a ingresar los datos de las tareas
    outputTask.innerHTML = '';
    //recorremos con forEach todas las tareas ingresadas 

    taskRecibida.forEach(task =>{
        //guardo en la variable title los datos que contiene la propiedad "title"
        let title = task.title;
        //guardo en la variable description los datos que contiene la propiedad "description"
        let description = task.description;
        //le asignamos un div a la salida de las tareas que vamos a ingresar
        outputTask.innerHTML += `<div class="card cardOutput card-panel hoverable">
            <div class="card-body">
            <h5>${title}</h5>
            <p>${description}<p>
            <button class="btn-floating btn waves-effect waves-light red" onClick="borrarTask('${title}'),M.toast({html: 'Tarea Eliminada',classes: 'backgroundBtn'})" ><i class="material-icons">delete</i></button>
            </div>
        </div>`
        
    });


}

//Esta funcion va a borrar cada card con los datos ingresados(tarea),y la sacara de LocalStorage.
function borrarTask(title){
    let taskRecibida = JSON.parse(localStorage.getItem('nuevoArrayTasks'));
    taskRecibida.forEach((deleteTask,i) => {
        if(deleteTask.title == title){
            taskRecibida.splice(i,1);
        }
    });
    localStorage.setItem('nuevoArrayTasks',JSON.stringify(taskRecibida));
    mostrarTaks();
    
}

mostrarTaks()




