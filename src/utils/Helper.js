const getFilterCategories = (data,category,subcategory = "")=>{
    let categoriesList = [];
    // console.log(data)
    data.forEach(element => {
        let catValue = element[category];
        // console.log(catValue)
        if(catValue){
            if(subcategory){
                catValue = catValue[subcategory]
            }
            categoriesList.push(catValue);
        }
        
    });
    // console.log( new Set(categoriesList))
    return new Set(categoriesList);
}
const filterData = (data,filterData, filterValue)=>{
    // console.log(data);
    // console.log(filterValue);
    let result = data.filter(item=> item[filterData] = filterValue)
    // console.log(result);
    return result;
}

const compareFunc = (a , b) => {
    return (a.id > b.id) ? 1 : ((a.id < b.id) ? -1 : 0) 

}

const sortData = (data, increasing = true)=>{
    data.sort(compareFunc);
    if(increasing){
        return data;
    }else{
        return data.reverse();
    }
}


export {getFilterCategories, filterData,sortData}