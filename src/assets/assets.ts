import logo from "./logo.svg";

import product1 from "./product1.jpg";
import product2 from "./product2.jpg";
import product3 from "./product3.jpg";
import product4 from "./product4.jpg";
import product5 from "./product5.jpg";
import product6 from "./product6.jpg";
import product7 from "./product7.png";

import model1 from "./model1.png";
import model2 from "./model2.jpg";

import generated1 from "./generated1.png";
import generated2 from "./generated2.png";
import generated3 from "./generated3.png";
import generated4 from "./generated4.png";

import generatedVideo1 from "./generatedVideo1.mp4";
import generatedVideo2 from "./generatedVideo2.mp4";

import type { Project } from "../types";

/* ---------- Assets ---------- */
export const assets = {
  logo,
  product1,
  product2,
  product3,
  product4,
  product5,
  product6,
  product7,
  model1,
  model2,
  generated1,
  generated2,
  generated3,
  generated4,
  generatedVideo1,
  generatedVideo2,
};

/* ---------- Dummy Generations (FIXED) ---------- */
export const dummyGenerations: Project[] = [
  {
    id: "gen_1",
    name: "Trolly Bag Campaign",
    productName: "Trolly Bag",
    productDescription: "Sky Colored Trolly Bag",
    userPrompt: "Create the video where center of attraction is a trolly bag",
    aspectRatio: "9:16",
    targetLength: 5,
    generatedVideo: generatedVideo1,

    uploadImages: [product7, model1],
    generatedImage: generated1,

    isGenerating: false,
    isPublished: false,

    createdAt: "2023-03-15T00:00:00.000Z",
    updatedAt: "2023-03-15T00:00:00.000Z",
  },
  {
    id: "gen_2",
    name: "Sneakers Launch",
    productName: "Sneakers",
    productDescription: "Stylish White Sneakers",
    userPrompt: "Showcase the sneakers in a dynamic and fashionable way",
    aspectRatio: "16:9",
    targetLength: 10,

    uploadImages: [product6, model2],
    generatedImage: generated4,
    generatedVideo: generatedVideo2,

    isGenerating: false,
    isPublished: true,

    createdAt: "2023-03-16T00:00:00.000Z",
    updatedAt: "2023-03-16T00:00:00.000Z",
  },
  {
    id: "gen_3",
    name: "Polaroid Vintage",
    productName: "Polaroid Camera",
    productDescription: "Classic Polaroid Camera",
    userPrompt: "Highlight the vintage appeal of the camera",
    aspectRatio: "9:16",
    targetLength: 7,

    uploadImages: [product2, model1],
    generatedImage: product1,
    generatedVideo: undefined,

    isGenerating: false,
    isPublished: false,

    createdAt: "2023-03-17T00:00:00.000Z",
    updatedAt: "2023-03-17T00:00:00.000Z",
  },
];
