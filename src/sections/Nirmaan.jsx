import { motion } from "framer-motion";

export default function TrustedCompanies() {
  const logos = [
    "/assets/company-logo-1.svg",
    "/assets/company-logo-2.svg",
    "/assets/company-logo-3.svg",
    "/assets/company-logo-4.svg",
    "/assets/company-logo-5.svg",
  ];

  return (
    <section className="mt-20 overflow-hidden">
      <p className="py-6 text-center text-sm opacity-80">
        Offline Hackathon Project for ICA × DevHive Club
      </p>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-14 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 20,
            repeat: Infinity,
          }}
        >
          {[...logos, ...logos].map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt="company logo"
              className="h-7 w-auto opacity-80"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
