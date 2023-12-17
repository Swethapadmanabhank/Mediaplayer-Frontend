import { BASE_URL } from "./baseurl";
import { commonRequest } from "./commonReuest";


// ad videos

 export const addVideo=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/videos`,body)
 }

//  get video 

// function define for get video from back end

    export const getVideo=async()=>{
    return await commonRequest("GET",`${BASE_URL}/videos`,"")
     }
// delete video

        export  const deleteVideo=async(id)=>{
          return await commonRequest("DELETE",`${BASE_URL}/videos/${id}`,{})
          }

// add category
     export   const addCategory=async(body)=>{
           return await commonRequest("POST",`${BASE_URL}/category`,body)
        }
// to get category
    
export const getcategory=async()=>{
   return await commonRequest("GET",`${BASE_URL}/category`,"")
    }

// to delete category  
 
export  const deleteCategory=async(id)=>{
   return await commonRequest("DELETE",`${BASE_URL}/category/${id}`,{})
   }

   // get watch history

  export const getHistory=async()=>{

       return await commonRequest("GET",`${BASE_URL}/watchhistory`,"")
       }
   
   
       // add history
       
  export const  addHistory=async(body)=>{
  return await commonRequest("POST",`${BASE_URL}/watchhistory`,body)
    }

   //  to get a specific vdo data from resource

   export const getVideos=async(id)=>{
      return await commonRequest("GET",`${BASE_URL}/videos/${id}`,"")
       }

// to update vdo details in category
    
export const updateCategory=async(id,body)=>{
   return await commonRequest("PUT",`${BASE_URL}/category/${id}`,body)
    }