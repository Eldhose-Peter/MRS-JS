import { Filters } from "./Filters.js";

export class AllFilters extends Filters{
    filters;

    constructor(){
        this.filters = [];
    }

    addFilter(f){
        this.filters.push(f);
    }

    statisfies(id){
        this.filters.forEach((f)=>{
            if(!f.statisfies(id)){
                return false
            }
        })
        return true;
    }
}