// components imported from packages
import React, { useState, useEffect } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc, } from "firebase/firestore";
import { toast } from "react-toastify";

// CSS imported
import "@pathofdev/react-tag-input/build/index.css";

// components imported from custom files
import { db, storage } from "../firebase";



const initialState = {
  title: "",
  tags: [],
  category: "",
  description: "",
  comments: [],
  likes: []
};

const categoryOption = [
  "Placements",
  "Projects",
  "Exams",
  "Academics",
  "Events",
  "Others"
];

const AddEditBlog = ({ user, setActive }) => {

  // All States
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);

  const {id} = useParams(); //used to get id from url

  const navigate = useNavigate(); //used to redirect components

  const { title, tags, category, description } = form; //different variables for form


  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on("state_changed", (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        }, (error) => {
          console.log(error);
        },() => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            toast.info("Image upload to firebase successfully");
            setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  useEffect(() => {
    id && getBlogDetail();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[id]);

  const getBlogDetail = async () =>{
    const docRef = doc(db,"blogs",id);
    const snapshot = await getDoc(docRef);
    if(snapshot.exists())
    {
      setForm({...snapshot.data()});
    }
    setActive(null);
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleTags = (tags) => {
    setForm({ ...form, tags });
  };

  const onCategoryChange = (event) => {
    setForm({ ...form, category: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (category && tags && title && description) {
      if(!id && file){
        try {
          await addDoc(collection(db, "blogs"), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog created successfully");
          setActive("home");
        } 
        catch (err) {
          console.log(err);
        }
      } else {
        try {
          await updateDoc(doc(db, "blogs",id), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog Updated successfully");
          setActive("home");
        } 
        catch (err) {
          console.log(err);
        }
      }
        
      
    } else {
      return toast.error("All fields are mandatory to fill");
    }
    navigate("/");
  };

  console.log(form);
  
  return (
    <div className="container-flu mb-4">
      <div className="container">
        <div className="col-12">
          <div className="text-center heading py-2">
            {id ? "Update Blog" : "Create Blog" }
          </div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <form className="row blog-form" onSubmit={handleSubmit}>
              <div className="col-12 py-3">
                <input
                  type="text"
                  className="form-control input-text-box"
                  placeholder="Title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 py-3">
                <ReactTagInput
                  tags={tags}
                  placeholder="Tags"
                  onChange={handleTags}
                />
              </div>
              
              <div className="col-12 py-3">
                <select
                  value={category}
                  onChange={onCategoryChange}
                  className="catg-dropdown"
                >
                  <option>Please select category</option>
                  {categoryOption.map((option, index) => (
                    <option value={option || ""} key={index}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 py-3">
                <textarea
                  className="form-control description-box"
                  placeholder="Description"
                  value={description}
                  name="description"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <div className="col-12 py-3 text-center">
                <button
                  className="btn btn-add"
                  type="submit"
                  disabled={progress !== null && progress < 100}
                >
                  {id ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditBlog;