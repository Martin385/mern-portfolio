import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Rating } from "flowbite-react";

import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgess, setImageUploadProgess] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const [stars, setStars] = useState(0);
  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Por favor seleccione una imagen");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgess(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError(error);
          setImageUploadProgess(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadError(null);
            setImageUploadProgess(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("No se pudo subir la imagen");
      setImageUploadProgess(null);
      console.log(error);
    }
  };

  const handleChangeStars = (nmOfStar) => {
    setFormData({...formData, numberOfStars: nmOfStar})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Algo salio mal...");
    }
  };
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Crear un post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Titulo requerido"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          ></TextInput>
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">Elige una categoria</option>
            <option value="terror">Terror</option>
            <option value="comedy">Comedia</option>
            <option value="drama">Drama</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          ></FileInput>
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgess}
          >
            {imageUploadProgess ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgess}
                  text={`${imageUploadProgess || 0}%`}
                ></CircularProgressbar>
              </div>
            ) : (
              "Subir imagen"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Escribir algo..."
          className="h-72 mb-10"
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        ></ReactQuill>
        <p className="text-center  font-semibold">Valoración final</p>
        <Rating
          value={stars}
          onChange={(value) => {
            setStars(value);
            setFormData({ ...formData, numberOfStars: value });
          }}
          className="mx-auto"
        >
          <button
            type="button"
            onClick={() => {
              if (stars != 1) {
                setStars(1);
              } else {
                setStars(0);
              }
              handleChangeStars(1)
            }}
          >
            <Rating.Star filled={stars >= 1 ? true : false} />
          </button>
          <button
            type="button"
            onClick={() => {
              if (stars != 2) {
                setStars(2);
              } else {
                setStars(stars - 1);
              }
              handleChangeStars(2)
            }}
          >
            <Rating.Star filled={stars >= 2 ? true : false} />
          </button>
          <button
            type="button"
            onClick={() => {
              if (stars != 3) {
                setStars(3);
              } else {
                setStars(stars - 1);
              }
              handleChangeStars(3)
            }}
          >
            <Rating.Star filled={stars >= 3 ? true : false} />
          </button>
          <button
            type="button"
            onClick={() => {
              if (stars != 4) {
                setStars(4);
              } else {
                setStars(stars - 1);
              }
              handleChangeStars(4)
            }}
          >
            <Rating.Star filled={stars >= 4 ? true : false} />
          </button>
          <button
            type="button"
            onClick={() => {
              if (stars != 5) {
                setStars(5);
              } else {
                setStars(stars - 1);
              }
              handleChangeStars(5)
            }}
          >
            <Rating.Star filled={stars >= 5 ? true : false} />
          </button>
        </Rating>
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publicar
        </Button>

        {publishError && (
          <Alert color="failure" className="mt-5">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
