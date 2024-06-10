export const isModuleChecked = (moduleObject) => {
    let isModuleCheckedVariable = false
   
        let moduleArray = moduleObject &&  Object.keys(moduleObject).map((key) => (moduleObject[key]));
        if(moduleArray)
          {
            if(moduleArray?.filter((action)=> action == true).length == moduleArray?.length)
              {
                  isModuleCheckedVariable = true
              }
              else{
                isModuleCheckedVariable = false
              }
          }
        else{
          isModuleCheckedVariable = false
        }
        return isModuleCheckedVariable
      
  }


  export const isModuleEmpty = (moduleObject) => {
    let isModuleEmptyVariable = false
   
        let moduleArray = moduleObject &&  Object.keys(moduleObject).map((key) => (moduleObject[key]));
        if(moduleArray)
          {
            if(moduleArray?.filter((action)=> action == false).length == moduleArray?.length)
              {
                isModuleEmptyVariable = true
              }
              else{
                isModuleEmptyVariable = false
              }
          }
        else{
          isModuleEmptyVariable = false
        }
        return isModuleEmptyVariable
      
  }