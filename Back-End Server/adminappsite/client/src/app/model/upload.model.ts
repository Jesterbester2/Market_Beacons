
class UpLoad {
    _id:string;
    name: string;
    createdby: string;
    storedname: string;
    link: string;
    thumbnail: string;
    filetype: string;
    filepath: string;
    active: string;
    dateuploaded: string;



    constructor(){
           this.name = "";
           this.createdby = "";
           this.storedname = "";
           this.filetype = "";
           this.link = "";
           this.filepath = "";
           this.thumbnail= "";
           this.active = "";
           this.dateuploaded = "";
       }
}


export default UpLoad;
