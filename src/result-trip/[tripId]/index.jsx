import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';



function Resulttrip() {

    const {tripId}=useParams();
    const [trip,setTrip]=useState([]);
    useEffect(()=>{
        tripId&&GetTripData();
    },[tripId])

    //use to get info from firebase


    const GetTripData =async()=>{
        const docRef=doc(db,'AiTrips',tripId);
        const  docSnap=await getDoc(docRef);
        if(docSnap.exists())
        {
            console.log("Document:",docSnap.data());
            setTrip(docSnap.data());
        }
        else{
            console.log("No such document!");
            toast("no trip found")
        }



    }


  return (
    <div className='p-15 md:px-10 lg:px-55 xl:px-50'>
     {/*infosection*/}
      <InfoSection trip={trip} />

    {/*Hotels*/}
    <Hotels trip={trip}/>
    <Hotels trip={trip}/>



      
    </div>
  )
}

export default Resulttrip
