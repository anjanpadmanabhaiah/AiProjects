import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Button } from "@/components/ui/button";
import { SelectBudgetOptions, SelectTravelsList } from "@/constants/options";
import { toast } from "sonner";
import { AI_PROMPT } from "../constants/options";
import { chatSession } from "../service/AIModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcAcceptDatabase, FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../service/firebaseConfig";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate, useNavigation } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState([]);
  const [openDailog, setOpenDailog] = useState(false);
  const navigate=useNavigate();
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const directLogin = () => {
    const guestProfile = {
      name: "Guest User",
      email: "guest@example.com",
    };

    localStorage.setItem("user", JSON.stringify(guestProfile));
    setOpenDailog(false);
    GetGuestProfile();
    console.log();
  };

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDailog(true);
      return;
    }

    if (
      (formData?.noOfDays > 5 && !formData?.location) ||
      !formData?.budget ||
      !formData?.traveller
    ) {
      toast("Please fill all the details");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveller)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log(result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString(); // Add a new document in collection "cities"


    await setDoc(doc(db, "AiTrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate('/result-trip/'+docId)
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDailog(false);
        OnGenerateTrip();
      });
  };
  const GetGuestProfile = () => {
    const guestProfile = {
      name: "Guest User",
      email: "guest@example.com",
    };
    console.log("Guest profile loaded:", guestProfile);
    localStorage.setItem("user", JSON.stringify(guestProfile));
    setOpenDailog(false);
    OnGenerateTrip();
  };

  const openDailogHandler = () => {
    setOpenDailog(true);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Your Trip, Your Way </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Tell us about your travel preferences, and watch SAVARI AI curates an
        itinerary that fits your style, pace, and desires.{" "}
      </p>
      <div className="mt-10 flex flex-col gap-10">
        <div>
          <h2 className="text-2xl my-3 font-medium ">
            what is your destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>
        <div>
          <h2 className="text-2xl my-3 font-medium ">
            How many days of vacation you are planning for?
          </h2>
          <Input
            placeholder={"Plans available from 1 to 3 days max"}
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
        <div>
          <h2 className="text-2xl my-3 font-medium ">what is your budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5 ">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
             ${formData?.budget == item.title && "shadow-lg border-black"}
            `}
              >
                <h2 className="text-2xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-5 00">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl my-3 font-medium ">
            Who do you plan to travel with?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5 ">
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveller", item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow
            ${formData?.traveller == item.people && "shadow-lg border-black"}`}
              >
                <h2 className="text-2xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-5 00">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-10 justify-end flex">
        <Button disabled={loading} onClick={openDailogHandler}>
          {loading ? (
            <AiOutlineLoading className="h-7 w-7 animate-spin" />
          ) : (
            "Generate trip"
          )}
          
        </Button>
      </div>

      <Dialog open={openDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className="font-bold text-lg mt-7">Sign In with Google</h2>
              <p>To continue sign-in to the app or Continue as guest</p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-3 items-left"
              >
                <FcGoogle className="h-6 w-6" />
                Sign-In with Google
              </Button>
              <Button
                onClick={directLogin}
                className="w-full justify-center mt-2  gap-3 flex items-center bg-slate-500"
              >
                Continue as Guest
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default CreateTrip;
