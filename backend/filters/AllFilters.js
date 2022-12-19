import { Filters } from "./Filters.js";

export class AllFilters extends Filters{
    filters;

    constructor(){
        super()
        this.filters = [];
    }

    addFilter(f){
        this.filters.push(f);
    }

    satisfies(id){
        let flag =0;
        this.filters.forEach((f)=>{
            if(!f.satisfies(id)){
                flag =1
            }
        })
        if(flag==0){
            return true;
        }
        else{
            return false;
        }
    }
}