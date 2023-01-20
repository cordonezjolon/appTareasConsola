require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar ,mostrarListadoCheklist} = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

//const { mostrarMenu, pausa } = require('./helpers/mensajes');



console.clear();
const main = async()=>{

let opt ='';

const tareas = new Tareas();

const tareasDB = leerDB();
console.log(tareasDB);
if(tareasDB){
    
    tareas.cargarTareasFromArray(tareasDB);
}
do {
    opt = await inquirerMenu();
    switch (opt) {
        case '1':
            //Crear opcion 
            const desc = await leerInput('Descripcion: ');
            tareas.crearTarea(desc);
            
            break;
        case '2':
            //console.log();
            tareas.listadoCompleto();
            break;
        case '3':
            tareas.listarTareasEstado();
            break;
        case '4':
            tareas.listarTareasEstado(false);
            break;
        case '5':
            const ids = await mostrarListadoCheklist(tareas.listadoArr);
            tareas.toggleCompletadas(ids);
            break;
        case '6':
            const id = await listadoTareasBorrar(tareas.listadoArr);

            if(id!== '0'){
                const ok = await confirmar('Esta seguro de borrar?');
            
                if(ok){
                    tareas.borrarTarea(id);
                }
            }
           
            break;
        default:
            break;
    }

    guardarDB(tareas.listadoArr);
    await pausa();
   //if(opt !=='0') await pausa();
} while (opt!=='0');
}


main();