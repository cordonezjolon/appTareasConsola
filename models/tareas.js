const Tarea = require("./tarea");
require('colors');

class Tareas{

    _listado ={};

    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach(key =>{
            const tarea = this._listado[key];           
            listado.push(tarea);
        })
        return listado;
    }
    constructor(){
        this._listado={};
    }
    
    borrarTarea(id = ''){
        if (this._listado[id]){
            delete this._listado[id];
        }
    }

    crearTarea(desc=''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }
    
    cargarTareasFromArray( tareas = []){
        tareas.forEach(tarea =>{
        
            this._listado[tarea.id]= tarea;
        });
        
    }
    listadoCompleto(){
        
        let numero = 1;
        this.listadoArr.forEach(tarea=>{
            console.log(`${numero.toString().green }. ${tarea.desc} :: ${tarea.completadoEn ? 'Completada'.green : 'Pendiente'.red}`); 
        numero++;
        })
    }
    toggleCompletadas(ids =[]){
        ids.forEach(id => {
            const tarea = this._listado[id];
             if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
             } 
        });

        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        })
    } 
    listarTareasEstado(estado =  true){
        let numero = 1;
        this.listadoArr.forEach(tarea=>{
            if(estado == false && tarea.completadoEn == null)
            {
                console.log(`${numero.toString().green }. ${tarea.desc} :: ${tarea.completadoEn ? 'Completada'.green : 'Pendiente'.red}`); 
                numero++;
            }
            if(estado == true && tarea.completadoEn != null)
            {
                console.log(`${numero.toString().green }. ${tarea.desc} :: ${tarea.completadoEn ? 'Completada'.green : 'Pendiente'.red}`); 
                numero++;
            }

        })
    }
}
module.exports = Tareas;