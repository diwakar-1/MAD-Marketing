import React, { useState } from "react";
import Title from "../components/Title";
import Uploadzone from "../components/Uploadzone";
import {
  RectangleVerticalIcon,
  RectangleHorizontalIcon,
  SquareIcon,
  Loader2Icon,
  Wand2Icon,
} from "lucide-react";
import { useAuth,useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "axios"
const Generator = () => {
  const {user} = useUser()
  const {getToken} = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [aspectRatio, setAspectRatio] = useState("9:16");
  const [productImage, setProductImage] = useState<File | null>(null);
  const [modelImage, setModelImage] = useState<File | null>(null);
  const [userPrompt, setUserPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleProductImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "product" | "model"
  ) => {
    if (e.target.files && e.target.files[0]) {
      type === "product"
        ? setProductImage(e.target.files[0])
        : setModelImage(e.target.files[0]);
    }
  };

  const handleGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!user) return toast('Please login to generate')
    if(!productImage || !modelImage|| !name|| !productName || aspectRatio) return toast ('Please fill all the required fields')
      try {
        setIsGenerating(true)
        const formData = new FormData();
        formData.append('name', name)
        formData.append('productName', name)
        formData.append('productDescription', productDescription)
        formData.append('userPrompt', userPrompt)
        formData.append('aspectRatio', aspectRatio)
        formData.append('images', productImage)
        formData.append('images', modelImage)

        const token = await getToken()

        const { data } = await api.post('/api/project/create_ad', formData,{headers: {Authorization: `Bearer ${token}`}})
        toast.success(data.message)
        navigate('/result/'+data.projectId)
      } catch (error:any) {
        setIsGenerating(false);
        toast.error(error?.response?.data?.message|| error.message)
      }
  
    }

  return (
    <div className="min-h-screen text-white p-6 md:p-12 mt-28">
      <form onSubmit={handleGenerate} className="max-w-4xl mx-auto mb-40">
        <Title
          title="Create In-Context Image"
          description="Upload your model and product images to generate your stunning MAD AD, short-form videos and social media posts"
        />

        <div className="flex gap-20 max-sm:flex-col items-start justify-between">
          {/* Left column */}
          <div className="flex flex-col w-full sm:max-w-60 gap-8 mt-8 mb-12">
            <Uploadzone
              label="Product Image"
              file={productImage}
              onClear={() => setProductImage(null)}
              onChange={(e) => handleProductImageChange(e, "product")}
            />

            <Uploadzone
              label="Model Image"
              file={modelImage}
              onClear={() => setModelImage(null)}
              onChange={(e) => handleProductImageChange(e, "model")}
            />
          </div>

          {/* Right column */}
          <div className="w-full">
            {/* Project name */}
            <div className="mb-4 text-gray-300">
              <label className="block text-sm mb-4">Project Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Project name"
                required
                className="w-full bg-white/5 rounded-lg border-2 p-4 text-sm
                  border-red-500/20 focus:border-red-500/60
                  focus:ring-2 focus:ring-red-500/20
                  outline-none transition-all"
              />
            </div>

            {/* Product name */}
            <div className="mb-4 text-gray-300">
              <label className="block text-sm mb-4">Product Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter Product name"
                required
                className="w-full bg-white/5 rounded-lg border-2 p-4 text-sm
                  border-red-500/20 focus:border-red-500/60
                  focus:ring-2 focus:ring-red-500/20
                  outline-none transition-all"
              />
            </div>

            {/* Product description */}
            <div className="mb-4 text-gray-300">
              <label className="block text-sm mb-4">
                Product Description{" "}
                <span className="text-xs text-red-400/60">(optional)</span>
              </label>
              <textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Enter Product Description"
                className="w-full bg-white/5 rounded-lg border-2 p-4 text-sm
                  border-red-500/20 focus:border-red-500/60
                  focus:ring-2 focus:ring-red-500/20
                  outline-none transition-all resize-none h-24"
              />
            </div>
            <div className="mb-4 text-gray-300">
              <label className="block text-sm mb-4">
                UserPrompt{" "}
                <span className="text-xs text-red-400/60">(optional)</span>
              </label>
              <textarea
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="Describe what you want in the narration to be"
                className="w-full bg-white/5 rounded-lg border-2 p-4 text-sm
                  border-red-500/20 focus:border-red-500/60
                  focus:ring-2 focus:ring-red-500/20
                  outline-none transition-all resize-none h-24"
              />
            </div>

            {/* Aspect ratio */}
            <div className="mb-4 text-gray-300">
              <label className="block text-sm mb-4">Aspect Ratio</label>
              <div className="flex gap-3">
                <RectangleVerticalIcon
                  onClick={() => setAspectRatio("9:16")}
                  className={`p-3 w-12 h-12 bg-white/5 rounded cursor-pointer transition-all
                    ring-2 ${
                      aspectRatio === "9:16"
                        ? "ring-red-500/60"
                        : "ring-transparent"
                    }`}
                />
                <RectangleHorizontalIcon
                  onClick={() => setAspectRatio("16:9")}
                  className={`p-3 w-12 h-12 bg-white/5 rounded cursor-pointer transition-all
                    ring-2 ${
                      aspectRatio === "16:9"
                        ? "ring-red-500/60"
                        : "ring-transparent"
                    }`}
                />
                <SquareIcon
                  onClick={() => setAspectRatio("1:1")}
                  className={`p-3 w-12 h-12 bg-white/5 rounded cursor-pointer transition-all
                    ring-2 ${
                      aspectRatio === "1:1"
                        ? "ring-red-500/60"
                        : "ring-transparent"
                    }`}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <button
            type="submit"
            disabled={isGenerating}
            className="px-18 py-3 rounded-md disabled:opacity-70 disabled:cursor-not-allowed bg-red-500 hover:bg-red-600 text-white font-semibold "
          >
            {isGenerating ? (<>
            <Loader2Icon className="size-5 animate-spin" /> Generating...</>) : (<>
            <Wand2Icon className="size-5" /> Generate Image
            </>)}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Generator;
