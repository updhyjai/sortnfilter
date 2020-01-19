import React from 'react';
// import './style/Bootstrap.css';
import './style/App.css';
import CharacterCard from './components/CharacterCard';
import * as Helper from "./utils/Helper";
import testData from "./model/testData.json";
import Checkbox from './components/CheckBox';

class App extends React.Component {
  
  state = {
    characterData : testData.results,
    filterData : testData.results,
    filters: {},
    selectedFilter : {
      gender : '',
      species: ''
    }
  }

  componentDidMount(){
    fetch("https://rickandmortyapi.com/api/character").then(data =>{
      return data.json()
    }).then(response=>{
      console.log(response);
      this.setState({
        characterData: response.results,
        filterData: response.results
      })
    })
  }


  

 species = Helper.getFilterCategories(testData.results,"species",);
 gender = Helper.getFilterCategories(testData.results,"gender");
 origin = Helper.getFilterCategories(testData.results,"origin","name");

 handleCheckBox = (e,category,subCategory) =>{
  const filterValue = e.target.name;
  const isChecked = e.target.checked;
  let filterSelected = {};
  filterSelected[category] = filterValue;
  let filters ={};
   filters[category] = filterValue;
   this.setState({
    selectedFilter : {...this.state.selectedFilter, ...filterSelected},
     filters : {...this.state.filters, ...filters}
   },()=>{
    //  console.log('filters state: ',this.state.filters);
     this.RearrangeData();
   });
   console.log('State of checked :', this.state.selectedFilter);
 }

 RearrangeData = () =>{
   let filters = this.state.filters;
   let data = this.state.characterData;
    
    for(let key in filters){
      // console.log(key);
      if(filters[key] === ''){
        continue;
      }
      data = data.filter(item=>{
        return item[key] === filters[key]
      })
    }
    this.setState({
      filterData : data
    })
  //  console.log(data);
 }




 FilterOptions = (categoriesData, category,subCategory = '')=>{
  // console.log(categoriesData)
  let categories = [...categoriesData];
  // console.log(categories)
  return categories.map((item)=>{
      return <div key = {category + item}>       
        <Checkbox  name = {item} checked = { this.state.selectedFilter[category] === item} onChange = {(e) => this.handleCheckBox(e,category,subCategory)} />
        <label key = {item}>
          {item}
        </label>
      </div>
    });
  
}

handleFilterLabel = (e, filterCategory) =>{
  let updatedFilters = this.state.filters;
  updatedFilters[filterCategory]  = '';
  this.setState({
    filters: {...updatedFilters}
  },()=>{
    this.RearrangeData();

  })
  
}

CharacterCards = () =>{
  // console.log(this.state.filterData)
  return this.state.filterData.map((item, index)=> <CharacterCard key = {item+index} {...item} />)
}

ActiveFilterButton = () =>{
  // console.log(this.state.filters);
  return Object.keys(this.state.filters).map((filter)=>{
    if(this.state.filters[filter]){
    return <button onClick = {(e) => this.handleFilterLabel(e,filter)} className= "activeFilter">{this.state.filters[filter]}<span className = "resetFilter">&times;</span></button>
    }
    
  })
}

handleSort(e, increasing){
 this.setState(prevState => ({
     filterData : Helper.sortData(prevState.filterData, increasing)
  }),()=>{
    // this.RearrangeData();
    console.log(this.state.filterData)
  })
}

  render(){
  return (
    <div>
      <header>
        
      </header>
      <div className = "container">
      
      <div className= "filter">
      <h2>Sort</h2>
      <button onClick = {(e)=>this.handleSort(e,true)} className = "increasing">&uarr;</button>
      <button onClick = {(e)=>this.handleSort(e,false)} className = "increasing">&darr;</button>
        <h2>Filters</h2>
        <div>
        {this.ActiveFilterButton()}
      </div>
        <div className = "speciesFilter">
          <h3>Species</h3>
          <div>
            {this.FilterOptions(this.species, 'species')}
          </div>
        </div>
        <div className = "genderFilter">
          <h3>Gender</h3>
          <div>
            {this.FilterOptions(this.gender, 'gender')}
          </div>
        </div>
       </div>
     <div className = "cardContainer">
      {this.CharacterCards()}      
      </div>
      </div>
    </div>
  )};
}

export default App;
