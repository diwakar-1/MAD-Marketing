import LenisScroll from "./components/lenis-scroll";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import HeroSection from "./sections/hero-section";
import Nirmaan from "./sections/Nirmaan";
import Features from "./sections/features";
import WorkflowSteps from "./sections/workflow-steps";
import CallToAction from "./sections/call-to-action";
import Generator from "./sections/Generator";
import PricingPlans from "./sections/pricing-plans";
import Result from "./sections/Result";
import { Routes, Route } from "react-router-dom";
import Loading from "./sections/Loading";
import Layouts from "./sections/layouts";
import Aboutus from "./sections/aboutus";
import {Toaster } from "react-hot-toast"


function Home() {
  return (
    <>
      <Toaster/>
      <HeroSection />
      <Nirmaan />
      <Features />
      <WorkflowSteps />
      <Aboutus />
      <PricingPlans />
      <CallToAction />
    </>
  );
}

export default function App() {
  return (
    <>
      <LenisScroll />
      <Navbar />

      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden -z-20 pointer-events-none">
        <div className="absolute rounded-full top-80 left-2/5 -translate-x-1/2 size-130 bg-red-600/70 blur-[120px]" />
        <div className="absolute rounded-full top-80 right-0 -translate-x-1/2 size-130 bg-blue-700/60 blur-[120px]" />
        <div className="absolute rounded-full top-0 left-1/2 -translate-x-1/2 size-130 bg-orange-600/30 blur-[120px]" />
      </div>

      <main className="px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create_ad" element={<Generator />} />
          <Route path="/result/:projectId" element={<Result />} />
          <Route path="/pricing" element={<PricingPlans />} />
          <Route path="/layouts" element={<Layouts />} />
          <Route path="/loading" element={<Loading />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
