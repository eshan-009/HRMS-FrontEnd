import React, { Children, useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { CgFile } from "react-icons/cg";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoPersonAdd } from "react-icons/io5";
import { BiCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../services/operations/Employee";
import { getAsideTabs } from "../../services/operations/AsideBar";
import { IoMdMenu } from "react-icons/io";
const HomePage = () => {
  const Theme = useSelector((state) => state.Theme.theme);
  const dispatch = useDispatch();
  const location = useLocation();
const [showMenu,setShowMenu] = useState(false)
  const navigate = useNavigate();
  const [data, setData] = useState([]);
    const user = useSelector((state)=>state.User)
  // const fetchTabs = async()=>{
  //   // const asideTabs = await dispatch(getAsideTabs(navigate))
  //   // setData(asideTabs)

  // }
  useEffect(() => {
    const tabData =
      location.state?.tabData || JSON.parse(localStorage.getItem("asideBar"));
    setData(tabData);
  }, []);

  const [clicked, setClicked] = data
    ? useState(
        data.reduce((acc, item) => {
          acc[item.label] = false;
          return acc;
        }, {})
      )
    : useState({});

  function handleClick(label) {
    setClicked((prev) => {
      return { ...prev, [label]: !prev[label] };
    });
  }


  return (
    <>
    
      <div
        className={`border border-neutral-950 h-[90vh] flex ${
          Theme == "Dark" ? "bg-slate-700 text-white" : ""
        }`}
      >
      
        <p className={`absolute p-2 m-3 z-50 cursor-pointer ${Theme=="Dark" ? "bg-slate-500" :"bg-slate-300"}  rounded-xl `} onClick={()=>setShowMenu((prev)=>!prev)}><IoMdMenu size={30}/></p>
        <style>
        {`
          .my-component::-webkit-scrollbar {
            display: none;
          }
          .my-component {
          scrollbarWidth : none
          }
         
        `}
      </style>

        <div className={` my-component ${Theme=="Dark" ? "bg-slate-700" :"bg-slate-100"}  h-full ${showMenu ? "w-[20%] max-md:w-[50%] max-xs:w-[80%] min-w-72 p-3 border border-slate-800 max-md:absolute z-40  max-h-[89.9vh] " : "max-md:hidden"}    overflow-y-auto`}>
   <div className="flex flex-col gap-4 text-[1.3rem] ">
   {/* <p onClick={()=>setShowMenu((prev)=>!prev)}><IoMdMenu/></p> */}
 
   {   showMenu &&   <p
              onClick={() => {
                dispatch(getUserById())
                navigate("/home/")
              }}
              className={`flex items-center gap-2 py-2 rounded-lg mt-14 ${
                Theme == "Dark" ? "hover:bg-slate-400 " : "hover:bg-slate-200"
              }`}
            >
              {" "}
              <MdOutlineDashboard />
              Dashboard
            </p>}
         
            {showMenu && data &&
              data.map((item, index) => {
                return (
                  <div className={` `} key={index}>
                    <div className="flex items-center justify-between  ">
                      <button
                        onClick={() => handleClick(item.label)}
                        className={`flex items-center justify-between w-full ${
                          Theme == "Dark"
                            ? "hover:bg-slate-400 "
                            : "hover:bg-slate-200"
                        } py-2 rounded-lg `}
                      >
                        <div className="flex items-center gap-2">
                          {" "}
                          <CgFile />
                          {item.label}
                        </div>

                        {!clicked[item.label] && (
                          <MdKeyboardArrowRight size={33} />
                        )}
                        {clicked[item.label] && (
                          <MdKeyboardArrowDown size={33} />
                        )}
                      </button>
                    </div>
                    <div>
                      {clicked[item.label] &&
                        item.children &&
                        item.children.map((elem, index) => (
                          <p
                            key={index}
                            onClick={() => {
                              navigate(`${elem.label.replaceAll(" ", "-")}`);
                            }}
                            className={`pl-7 text-lg flex items-center gap-3 cursor-pointer ${
                              Theme == "Dark"
                                ? "hover:bg-slate-400 "
                                : "hover:bg-slate-200"
                            } py-2 rounded-lg`}
                          >
                            {elem.label.includes("Create") ? (
                              <IoPersonAdd />
                            ) : (
                              <BiCircle />
                            )}
                            {elem.label}
                          </p>
                        ))}
                    </div>
                  </div>
                );
              })}
          </div>
          
        </div>

        <div
          className={` w-full border border-black overflow-auto p-5  ${
            Theme == "Dark" ? "bg-slate-600 text-white" : "bg-slate-300"
          } `}
        >
   
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default HomePage;
