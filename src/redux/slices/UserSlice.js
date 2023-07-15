import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// 
import Cookies from "js-cookie";


// هنا بدات ندي :)
export const register =createAsyncThunk("nada/register", async (payload) => {
console.log(payload)
try {

  let response= axios.post(`http://localhost:5000/${payload.radiovalue}/register`, {
   
     name: payload.name,
     password: payload.password,
     email: payload.email
   }).then((res) => {
    
     return res.data
   })
   console.log(response)
   return response;

}catch(err){
  console.log(err,"errrrr");

}
})

export const login = createAsyncThunk("allUser/login", async (payload,{ getState, dispatch }) => {
   try{
  const response= await axios.post('http://localhost:5000/login', {
        password: payload.password,
        email: payload.email
    })
    const data = response.data;
   
        
      if(data.user==='user'){
        
        const token = data.userData._id;
        Cookies.remove("boatOwnerId");
        Cookies.set("userId", token, { expires: 7 })
        dispatch({ type: "user", payload: data.userData });

            return response;
      }
      else if(data.boatOwner==='boatOwner'){
        const token =data.boatOwnerData._id;
        Cookies.remove("userId");
        Cookies.set("boatOwnerId", token, { expires: 7 });
        dispatch({ type: "owner", payload: data.boatOwnerData });

            return response;
      }
        else{
            
               return response.data;
        }


      }catch (err) {
       return err 
       
    }
     
})
export const fireBaseLogin = createAsyncThunk("allUser/fireBaseLogin", async (payload,{ getState, dispatch }) => {
  console.log(payload,"sliccccccccce")
  try{
  const response= await axios.post('http://localhost:5000/fireBaseLogin', {
        password: payload.password,
        email: payload.email,
        name: payload.name
    })
    const data = response.data;

      if(data.user==='user'){
        
        const token = data.userData._id;
        Cookies.remove("boatOwnerId");
        Cookies.set("userId", token, { expires: 7 })
        dispatch({ type: "user", payload: data.userData });
          console.log("user Done")
            return response;
      }
        else{
            
               return response.data;
        }


      }catch (err) {
       return err 
       
    }
     
})

export const editUserInfo= createAsyncThunk ("/editUserInfo", async(payload )=>{
console.log(payload,"Paylodddddsad")
console.log(payload.img)
let result;
// console.log(payload.userData._id)
axios.put(`http://localhost:5000/user/editUserinfo/${payload.id}`,{

name: payload.name,
address:payload.address,
phone: payload.phone,
img:payload.img,
},{
  headers:{
    'Content-Type':'multipart/form-data' 
  } 
}).then(res => {
  console.log(res);
   return res
})

})

// add review 
export const addReview= createAsyncThunk ("/addReview", async(payload )=>{
  console.log(payload,"Payload")

   const res = axios.post(`http://localhost:5000/user/addReview`,{
  
  boatId: payload.boatId,
  clientId:payload.clientId,
  tripId: payload.tripId,
  rating:payload.rate,
  })
  return res
  })
 // book Swvl
 export const bookSwvl= createAsyncThunk ("/userBooking", async(payload )=>{
  console.log(payload,"Payload")

   const res = axios.post(`http://localhost:5000/swvl/userBooking`,{
  
   swvlId: payload.swvlId,
   userId:payload.userId,
   numberOfSeats: payload.numberOfSeats,
  })
  console.log(res);
  return res
  })
  // user cancel trip
export const canceltrip= createAsyncThunk ("/cancelTrip", async(payload )=>{
  console.log(payload,"Payload")

  let res =axios.put(`http://localhost:5000/user/cancelTrip`,{
  
  id: payload,


  })
  return res
  })

// Delete Boat -->> Owner
export const OwnerdeleteBoat = createAsyncThunk("boatOwner/Boats", async (payload) => {
  
  try {

      let res = await axios.delete(`http://localhost:5000/boatOwner/deleteBoat/${payload.id}/${payload.ownerId}`);
      console.log(res.data,"DATA AFTER");
      return res.data;
  }
  catch (err) {

  }

})

// get user pending trips
export const pendingTrips = createAsyncThunk("user/pendingTrips", async (payload) => {
  try {
      let res = await axios.get(`http://localhost:5000/user/userTrips/pending/${payload.id}`);
      return res;
  }
  catch (err) {
  }

})

// get user accepted trips
export const acceptedTrips = createAsyncThunk("user/acceptedTrips", async (payload) => {
  try {
      let res = await axios.get(`http://localhost:5000/user/userTrips/accepted/${payload.id}`);
      return res;
  }
  catch (err) {
  }
})

// get user finished trips
export const finishedTrips = createAsyncThunk("user/finishedTrips", async (payload) => {
  try {
      let res = await axios.get(`http://localhost:5000/user/userTrips/finished/${payload.id}`);
      return res;
  }
  catch (err) {
  }
})

// hossam بدا هنا البشمهندس
export const getAllBoats = createAsyncThunk("user/boats", async (payload) => {
    try {
        let res = await axios.get('http://localhost:5000/user/boats');
        return res;
    }
    catch (err) {

    }

})
export const getCategoryOne = createAsyncThunk("user/category/3nile/boats", async (payload) => {
    try {
        let res = await axios.get('http://localhost:5000/user/category/3nile/boats');
        console.log(res.data , "3nile")
       
        return res.data;
    }
    catch (err) {

    }

})
export const getCategoryTwo = createAsyncThunk("user/category/3nileplus/boats", async (payload) => {
    try {
        let res = await axios.get('http://localhost:5000/user/category/3nilevip/boats');
        console.log(res.data , "3nilevip")
        return res;
    }
    catch (err) {

    }

})
export const getCategoryThree = createAsyncThunk("user/category/3nilevip/boats", async (payload) => {
    try {
        let res = await axios.get('http://localhost:5000/user/category/3nilevip/boats');
        console.log(res);
        return res;
    }
    catch (err) {

    }

})
export const getSwvl = createAsyncThunk("swvl/swvlTrips", async (payload) => {
  try {
      let res = await axios.get('http://localhost:5000/swvl/swvlTrips');
      return res;
  }
  catch (err) {

  }

})
export const getOwnerBoats = createAsyncThunk("boatOwner/Boats", async (payload) => {
  console.log(payload);
  
    try {
  
        let res = await axios.get(`http://localhost:5000/boatOwner/getAllBoats/${payload}`);
        return res;
    }
    catch (err) {

    }

})
export const getOwnerPreviousTrips = createAsyncThunk("boatOwner/Boats", async (payload) => {
  
    try {
  
        let res = await axios.get(`http://localhost:5000/boatOwner/getAllFinishedTrips/${payload}`);
        console.log(res);
        return res;
    }
    catch (err) {

    }

})
export const getOwnerRequests = createAsyncThunk("boatOwner/Boats", async (payload) => {
  
    try {
  
        let res = await axios.get(`http://localhost:5000/boatOwner/getAllPendingTrips/${payload}`);
        console.log(res);

        return res;
    }
    catch (err) {

    }

})
export const getOwnerSwvlTrips = createAsyncThunk("boatOwner/swvls", async (payload) => {
  
  
    try {
  
        let res = await axios.get(`http://localhost:5000/swvl/boatowner/${payload}/swvl/`);
        console.log(res.data);

        return res;
    }
    catch (err) {

    }

})
export const SwvlDetails = createAsyncThunk("boatOwner/swvlDetail", async (payload) => {
  
  
    try {
  
        let res = await axios.get(`http://localhost:5000/swvl//swvlTrip/${payload}`);
        console.log(res.data);

        return res.data;
    }
    catch (err) {

    }

})
export const getOwnerCurrentTrips = createAsyncThunk("boatOwner/Boats/current", async (payload) => {
  
    try {
  
        let res = await axios.get(`http://localhost:5000/boatOwner/getAllCurrentTrips/${payload}`);
        console.log(res);

        return res;
    }
    catch (err) {

    }

})

// Get Boat Data In Boat Description Page 

export const getBoatData = createAsyncThunk("getBoat", async (payload) => {
    try {
        let Data = await axios.get(`http://localhost:5000/user/boat/${payload}`);
       
        return Data.data;
    }
    catch (err) {
        console.log("eeeee");
        console.log(err)

    }

})
// Get Trip Details By Id 
export const getTripData = createAsyncThunk("getBoat", async (payload) => {
    try {
        let Data = await axios.get(`http://localhost:5000/user/boat/${payload}`);
       
        return Data.data;
    }
    catch (err) {
        console.log("eeeee");
        console.log(err)

    }

})


// هنا بدات فاطمة 
export const addTrip = createAsyncThunk("fatma/addTrip", async (payload) => {
 
  console.log(payload)
  const dateOnly=[...payload.date.toString().split(" ")[1]," ",...payload.date.toString().split(" ")[2]," ",...payload.date.toString().split(" ")[3]].join("")
 console.log(dateOnly)
 console.log(payload.startTime,"payload.startTime")
 const timeOnly=payload.startTime.toString().split(",")[1]
 console.log(payload.startTime)
 console.log(timeOnly)
  const response = await axios.post(`http://localhost:5000/user/addTrip/${payload.boatId}/${payload.id}`, {
    date: dateOnly, 
    startTime:timeOnly,
    hours:payload.hours,
  });
  const data = response.data; 
  return data;
});

// Boat Owner Edit Info 
export const ownerUpdateInfo= createAsyncThunk ("/editOwnerInfo", async(payload )=>{
  let owner;
  console.log(payload,"Payload")
  console.log(payload.img)
  // console.log(payload.userData._id)
  await axios.put(`http://localhost:5000/boatOwner/updateData/${payload.boatOwnerId}`,{
  
  name: payload.name,
  address:payload.address,
  phone: payload.phone,
  img:payload.img,
  },{
    headers:{
      'Content-Type':'multipart/form-data' 
    } 
  }).then(res => {
    owner=  res.data
    console.log(owner);
    
   
  })
  return owner
  })

  // ownerUpdateCover
export const ownerUpdateCover= createAsyncThunk ("/editOwnerCover", async(payload )=>{
  let owner;
  console.log(payload,"Payload")
  console.log(payload.img)
  // console.log(payload.userData._id)
  await axios.put(`http://localhost:5000/boatOwner/ownerCover/${payload.boatOwnerId}`,{
  
  img:payload.img,
  },{
    headers:{
      'Content-Type':'multipart/form-data' 
    } 
  }).then(res => {
    owner=  res

    
   
  })
  return owner
  })
  // userUpdateCover
export const userUpdateCover= createAsyncThunk ("/userCover", async(payload )=>{
  let user;
  console.log(payload,"Payload")
  console.log(payload.img)
  // console.log(payload.userData._id)
  await axios.put(`http://localhost:5000/user/userCover/${payload.userId}`,{
  
  img:payload.img,
  },{
    headers:{
      'Content-Type':'multipart/form-data' 
    } 
  }).then(res => {
    user=  res

    
   
  })
  return user
  })
export const userInFo= createAsyncThunk ("/userInFo", async(payload )=>{
  console.log(payload,"iiii")
  let user;
  await axios.get(`http://localhost:5000/user/userInfoIdentical/${payload}`).then(res => {
    user=  res

    
   
  })
  console.log(user,"xxxxxxxxxx")
  return user
  })


const UserSlice = createSlice({
    name: 'user',
    initialState: {
        boats: [],categoryOne : [],categoryTwo : [],categoryThree : [],boatDetails:{},
        loading: false
        ,error: null,
       err:false,
        user:null,
        swvlRecit: null,
    swvl: [] , filteredswvl:[],
      ownerBoatsNum:null,pending:[],finished:[],accepted:[]
      ,filteredcategoryOne : [] ,filteredcategoryTwo : [],
        filteredcategoryThree : [],
      radioButtonValue:"",boatOwner:null,anyUser:null,ownerBoats:[],
      ownerSwvl:null,swvlTrip:{},boatReviews:null,bookedSeats:0
    },


    

    reducers:{
      increament(state,action){
        state.bookedSeats += 1
        console.log(state.bookedSeats)
      },
      decreament(state,action){
        state.bookedSeats -= 1
        console.log(state.bookedSeats)
      },
      logoutt(state,action){
        Cookies.remove("userId");
        Cookies.remove("boatOwnerId");

        state.user = null
        state.boatOwner = null
        console.log(state.user)
        console.log(state.boatOwner)
      },
       // change price for category one
       change(state, action) {      
         let filtered = state.categoryOne.filter((item) => {
           return item.price <= action.payload[1] && item.price >= action.payload[0];
          });
          state.filteredcategoryOne = [...filtered]
        },

        // change price for category two
        changeTwo(state, action) {
          let filtered = state.categoryTwo.filter((item) => {
            return item.price <= action.payload[1] && item.price >= action.payload[0];
          });
          state.filteredcategoryTwo = [...filtered]    
        },
        
        
        // change price for category three
      changeThree(state, action) {
        let filtered = state.categoryThree.filter((item) => {
          return item.price <= action.payload[1] && item.price >= action.payload[0];
        });
        state.filteredcategoryThree = [...filtered]
      },


      //change type for category one
      changeTypeOne(state, action) {
        let newarr = state.categoryOne.filter((item) => item.type == action.payload);
        state.filteredcategoryOne = [...newarr];
      },
      
      
      //change type for category two
      changeTypeTwo(state, action) {
        let newarr = state.categoryTwo.filter((item) => item.type == action.payload);
        state.filteredcategoryTwo = [...newarr];
      },
      
      
      //change type for category three
      changeTypeThree(state, action) {
        let newarr = state.categoryThree.filter((item) => item.type == action.payload);
        state.filteredcategoryThree = [...newarr];
      },
      
      
      //change number of people for category one
      changePeopleOne(state, action) {
        let filtered = state.categoryOne.filter((item) => {
          return item.numberOfpeople <= action.payload[1] && item.numberOfpeople >= action.payload[0];
        });
        state.filteredcategoryOne = [...filtered] 
      },
      
      
      //change number of people for category two
      changePeopleTwo(state, action) {
        let filtered = state.categoryTwo.filter((item) => {
          return item.numberOfpeople <= action.payload[1] && item.numberOfpeople >= action.payload[0];
        });
        state.filteredcategoryTwo = [...filtered] 
      },
      
      
      //change number of people for category three
      changePeopleThree(state, action) {
        let filtered = state.categoryThree.filter((item) => {
          return item.numberOfpeople <= action.payload[1] && item.numberOfpeople >= action.payload[0];
        });
        state.filteredcategoryThree = [...filtered] 
      },
      
      
      //change PORT for category one
      changePortOne(state, action) {
        let x = state.categoryOne
        let newarr = x.filter((item) => item.portName == action.payload);
        state.filteredcategoryOne = [...newarr];
      },
      
      
      //change PORT for category two
      changePortTwo(state, action) {
        let x = state.categoryTwo
        let newarr = x.filter((item) => item.portName == action.payload);
        state.filteredcategoryTwo = [...newarr];
      },
      
      
      //change PORT for category three
      changePortThree(state, action) {
        let x = state.categoryThree
        let newarr = x.filter((item) => item.portName == action.payload);
       state.filteredcategoryThree = [...newarr];
      },

      //Resrt Filter Data
      resetFilteredData(state) {
        state.filteredcategoryOne = state.categoryOne;
        state.filteredcategoryTwo = state.categoryTwo;
      },

      // search
       search(state, action) {
        const searchQuery = action.payload.toLowerCase(); 
        const filteredSwvl = state.swvl.filter((item) =>
          item.targetPlace.toLowerCase().includes(searchQuery)
        );
      
        state.filteredswvl = filteredSwvl;
        console.log(state.filteredswvl);
      
        if (searchQuery === "") {
          state.filteredswvl = [...state.swvl];
        }
      },


        getcategoryboats(state, action) {          
            if (state.boats && state.boats.length > 0) {
              if (action.payload == 1) {
                console.log("hhh");
                state.categoryboats = state.boats.filter(boat => boat.category === "3nile");
                console.log(state.categoryboats);
              } else if (action.payload === 2) {
                state.categoryboats = state.boats.filter(boat => boat.category === "3nileplus");
              } else if (action.payload === 3) {
                state.categoryboats = state.boats.filter(boat => boat.category === "3nile vip");
              } else {
                console.log("hi");
              }
            } else {
              console.log("No boats available");
            }
          }
    },
    // 
    extraReducers: {
       [ register.fulfilled]:(state,action)=>{
        console.log(action);
        console.log("fulfilled")
        
       },
       [login.pending]:(state,action)=>{
        state.loading =true
        state.err=true;
      
      
       } ,
       [login.fulfilled]: (state, action) => {
        state.anyUser = action.payload;
        if(state.anyUser.data.user){
          console.log(state.anyUser.data,"first full filed")
          state.user=state.anyUser.data
          state.loading =false
        }else if(state.anyUser.data.boatOwner){
          state.boatOwner=state.anyUser.data
          state.loading =false
        }
      
  
    },
       [fireBaseLogin.pending]:(state,action)=>{
        state.loading =true
        state.err=true;
      
      
       } ,
       [fireBaseLogin.fulfilled]: (state, action) => {
        state.user=action.payload.data
        console.log(action.payload.data,"from fullfiled")
      
  
    },
       [userInFo.pending]:(state,action)=>{
        state.loading =true
  
      
      
       } ,
       [userInFo.fulfilled]: (state, action) => {
        console.log(action.payload.data,"user Data From Slice")
          state.user = action.payload.data
        

        },
      
  
 
      

    [getOwnerBoats.pending]:(state,action)=>{
     
      state.loading =true
    },
    [getOwnerBoats.fulfilled]:(state,action)=>{
      state.loading =false
      state.ownerBoats =action.payload
    
    },
    [getOwnerSwvlTrips.pending]:(state,action)=>{
      state.loading =true

     
    },
    [getOwnerSwvlTrips.fulfilled]:(state,action)=>{
      state.loading =false

      console.log(action.payload);
      state.ownerSwvl =action.payload
      console.log(state.ownerSwvl);
     
    },

    [SwvlDetails.pending]:(state,action)=>{
      state.loading =true

     
    },
    [SwvlDetails.fulfilled]:(state,action)=>{
              state.loading =false

        console.log("PAYLOAD");
      state.swvlTrip =action.payload
      console.log(state.swvlTrip);
     
    },
    [getOwnerPreviousTrips.pending]:(state,action)=>{
      state.loading =true


    },
    
    [getOwnerPreviousTrips.fulfilled]:(state,action)=>{
              state.loading =false

      state.ownerBoats =action.payload
      console.log(state.ownerBoats);

    },
    
    
    [addTrip.pending]:(state,action)=>{
      state.loading =true
    },
    [addTrip.fulfilled]:(state,action)=>{
      state.loading =false

      console.log("done")
    },
    [getOwnerCurrentTrips.pending]:(state,action)=>{
      state.loading =true

    },
    [getOwnerCurrentTrips.fulfilled]:(state,action)=>{
      state.loading =false

   
      state.ownerBoats =action.payload
     
    },
  

 
      
        // Get Boat Data Start
        [getBoatData.pending]: (state) => {
            state.loading = true;
           },     
        [getBoatData.fulfilled]: (state, action) => {
          state.loading =false
          state.boatReviews =action.payload
            state.loading = false;
            

        },
        [getBoatData.rejected]: (state, action) => {
            state.loading = false;
          
          },
        //   Get Boat Data End



              // Get Categories Start
        [getCategoryOne.pending]: (state, action) => {
          state.loading =true

        },
        [getCategoryOne.fulfilled]: (state, action) => {
          state.loading =false

            // console.log(action.payload);
            
           
            state.categoryOne = action.payload;
            state.filteredcategoryOne = action.payload
        },
        [getCategoryOne.rejected]: (state, action) => {
        
            
            // state.categoryOne = action.payload;
        },
        
        [getCategoryTwo.pending]: (state, action) => {
          state.loading =true
            
        },
        [getCategoryTwo.fulfilled]: (state, action) => {
          
          state.loading =false

            state.categoryTwo = action.payload.data;
            state.filteredcategoryTwo = action.payload.data
            
        },
        [getCategoryThree.fulfilled]: (state, action) => {
            
            
           state.categoryThree = action.payload.data;
           state.filteredcategoryThree = action.payload.data
        },
        [getSwvl.pending]:(state,action) =>{
          state.loading =true

        },
        [getSwvl.fulfilled]:(state,action) =>{
          state.loading =false

          state.swvl = action.payload.data;
          state.filteredswvl = action.payload.data;
          // console.log(state.swvl)
          // state.filteredcategoryThree = action.payload.data
        },
        [bookSwvl.pending]:(state, action) =>{
          state.loading =true
        },
        [bookSwvl.fulfilled]:(state, action) =>{
          state.loading =false

          console.log("done")
          console.log(action.payload.data)
          state.swvlRecit = action.payload.data
          state.bookedSeats=0
        },
// /////////////////////////////////////////////////////////
        [finishedTrips.pending]:(state,action) => {
          state.loading =true

        },
        [finishedTrips.fulfilled]:(state,action) => {
                state.loading =false

          state.finished = action.payload.data
          console.log(state.finished)
        },
        [acceptedTrips.pending]:(state,action) => {
          state.loading =true

        },
        [acceptedTrips.fulfilled]:(state,action) => {
                state.loading =false

          state.accepted = action.payload.data
        },
        [pendingTrips.pending]:(state,action) => {
          state.loading =true

        },
        [pendingTrips.fulfilled]:(state,action) => {
                state.loading =false

          state.pending = action.payload.data
        },
        [addReview.pending]:(state,action) => {
          state.loading =true

        },
        [addReview.fulfilled]:(state,action) => {
                state.loading =false

          console.log("fulfilled")
        },

        [canceltrip.pending]:(state,action) => {
          state.loading =true
        
      },
        [canceltrip.fulfilled]:(state,action) => {
          state.loading =false
          console.log('fulfilled')
          console.log(action.payload)
        
      },
        // Get Categories End



       

        [userUpdateCover.pending]: (state, action) => {
          state.loading =true
       },
        [userUpdateCover.fulfilled]: (state, action) => {
          state.loading =false
            if(action.payload.data.status===200){
              
              state.user = action.payload.data.data;
            }
         
       },
        // Owner Edit Info
        [ownerUpdateCover.pending]: (state, action) => {
          state.loading =true
       },
        [ownerUpdateCover.fulfilled]: (state, action) => {
          state.loading =false
            if(action.payload.data.status===200){
              
              state.boatOwner = action.payload.data.data;
            }
         
       },
        [ownerUpdateInfo.pending]: (state, action) => {
          state.loading =true
       },
        [ownerUpdateInfo.fulfilled]: (state, action) => {
          state.loading =false

          console.log( state.boatOwner,"Old");
            console.log(action.payload);
          state.boatOwner = action.payload;
          // console.log( state.boatOwner,"Gold");
       },
    }
    
})


export const { getcategoryboats,add ,change , changeTypeOne , changeTypeTwo , changeTypeThree ,changeTwo , changeThree , changePeopleOne , changePeopleTwo , changePeopleThree, changePortOne , changePortTwo , changePortThree , logoutt ,resetFilteredData, search , decreament , increament} = UserSlice.actions;

export default UserSlice.reducer;



