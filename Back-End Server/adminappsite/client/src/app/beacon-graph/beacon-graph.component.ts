import { Component, OnInit, Input } from '@angular/core';
import BeAcon from '../model/beacon.model';
import { TagService } from '../services/tag.service';
import DaTa from '../model/data.model';
import { DatePipe } from '@angular/common';
 interface dataobject{
  name: string;
  _id: string;
}



 interface DataSets{
    label: string;
    backgroundColor: string;
    borderColor: string;
    data: number[];
}

 interface datagraph{
    labels: string[];
  datasets: DataSets[];
}

 interface dota{
  date: string;
  count: number;
}

interface datasetse{
  _id: string;
  data: dota[];
}

@Component({
  selector: 'app-beacon-graph',
  templateUrl: './beacon-graph.component.html',
  styleUrls: ['./beacon-graph.component.css']
})
export class BeaconGraphComponent implements OnInit {
@Input('objective') dataobjects: dataobject[];


datagraphset: datagraph;
objboolean: boolean;
data: datagraph;
datas: datasetse[];
val: boolean = true;

  constructor(
    private tagService: TagService,
    private datePipe: DatePipe
  ) {

  }

datasets: DataSets[] =[];
labels:string[] = [];
colors: any[];
finder: string[] =[];


  ngOnInit() {

console.log(this.dataobjects)


    /*this.data = {
                labels: [''],
                datasets: [
                    {
                        label: '',
                        backgroundColor: '',
                        borderColor: '',
                        data: [0]
                    },
                    {
                        label: '',
                        backgroundColor: '',
                        borderColor: '',
                        data: [0]
                    }
                ]
            }*/

this.colors= [
  {
    backgroundColor: '#42A5F5',
    borderColor: '#1E88E5'
  },
  {
    backgroundColor: '#9CCC65',
    borderColor: '#7CB342'
  },
  {
    backgroundColor:'#acf9d7',
    borderColor: '#73c6a2'
  },
  {
    backgroundColor:'#ed5e6d',
    borderColor: '#c12e3d'
  },
  {
    backgroundColor:'#f97fd5',
    borderColor: '#c665c5'
  },
  {
    backgroundColor:'#f1f77b',
    borderColor: '#d3e26f'
  },
  {
    backgroundColor:'#ff9d47',
    borderColor: '#d37d21'
  },
  {
    backgroundColor:'#ab6bff',
    borderColor: '#804bc6'
  },
  {
    backgroundColor:'#63ffff',
    borderColor: '#49c6c6'
  },
  {
    backgroundColor:'#9afc5d',
    borderColor: '#75c145'
  },
]

          /*  this.datas = [{
                _id: "452",
                data:
                [
                  {
                    date:"2018-04-06T00:00:00.000Z",
                    count: 5
                  },
                  {
                    date:"2018-04-07T00:00:00.000Z",
                    count: 0
                  },
                  {
                    date:"2018-04-08T00:00:00.000Z",
                    count: 3
                  },
                  {
                    date:"2018-04-09T00:00:00.000Z",
                    count: 4
                  }
                ]

            },
              {
                _id: "455",
              data:
                [
                  {
                    date:"2018-04-07T00:00:00.000Z",
                    count: 5
                  },
                  {
                    date:"2018-04-08T00:00:00.000Z",
                    count: 3
                  },
                  {
                    date:"2018-04-09T00:00:00.000Z",
                    count: 2
                  },
                ]

            }]*/




this.dataobjects.forEach(obj=>{
  this.finder.push(obj._id)
})


            this.getData({dataid: this.finder})
//this.datagraphset = this.graphStructurer(this.datas, this.dataobjects )
          //this.datasets = []
//this.labels = []



        }




        getData(finddata){
          this.tagService.urlData(finddata)
           .subscribe(data => {
             //assign the datalist property to the proper http response
                  console.log(data)
              //this.datas= data

              //console.log(data.data)
this.data = this.graphStructurer( this.dataobjects , data)

             //console.log(data);
           });

        }


compare(a: dota, b:dota ) {
          if (new Date(a.date) < new Date(b.date))
            return -1;
          if (new Date(a.date) > new Date(b.date))
            return 1;
          return 0;
}




graphStructurer(objecters, datain: datasetse[]){




  datain.forEach(datainner=>{
    datainner.data.sort(this.compare)
      datainner.data.forEach(datesetter=>{

        this.checkAndAdd(datesetter.date)
      })

  })
  var colornum = 0
  //datasets: DataSets[] =[];
  datain.forEach(datainner=>{

    var datab = this.dataarrange(datainner)
    objecters.forEach(object=>{
      if(object._id === datainner._id){

      this.dataRepeatFix({label:object.name, data: datab,   backgroundColor: this.colors[colornum].backgroundColor,
        borderColor:  this.colors[colornum].borderColor})

}
    })
    colornum++
  })
  var lobel = []





this.labels.forEach(l=>{
  //console.log(l)
  var formatdate =new Date(l).toLocaleDateString('en-US', {
    timeZone: 'UTC',

    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
})
  //console.log(formatdate)
lobel.push(formatdate)
})


  var dataa ={
    labels: lobel,
    datasets: this.datasets
  }
  //console.log(dataa)
return dataa;
}
dataRepeatFix(graphobject: DataSets) {

  var found = this.datasets.some(function (el) {
    return el.label === graphobject.label;
  });
  if (!found) {
    this.datasets.push(graphobject)
  }else{
    var counter = 0
    this.datasets.forEach(da =>{
      if(graphobject.label === da.label){
        this.datasets.splice(counter, 1, graphobject)
      }
      counter++
    })
  }
  //console.log(this.labels)
}




dataarrange(datac){
  var dat = [];
  datac.data.sort(this.compare)
  this.labels.forEach(label=>{
    var found = datac.data.some(function (el) {
      return el.date === label;


    });
    if(!found){
      dat.push(0)
    }else{



      datac.data.forEach(da =>{
        if(label === da.date){
          dat.push(da.count)
        }
      })
    }
  })

  return dat
}
checkAndAdd(name) {

  var found = this.labels.some(function (el) {
    return el === name;
  });
  if (!found) { this.labels.push(name)}
  //console.log(this.labels)
}








}
