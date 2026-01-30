import { DribbbleIcon, GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
    const links = [];
    return (
        <motion.footer className="flex flex-col items-center px-4 md:px-16 lg:px-24 justify-center w-full pt-16 mt-40 glass border-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <a href="/">
                <img src='src/assets/logo.svg' alt='logo' className='h-8.5 w-auto' width={205} height={48} />
            </a>

            <div className="flex flex-wrap items-center justify-center gap-8 py-8">
                {links.map((link, index) => (
                    <a key={index} href={link.href} className='transition hover:text-gray-300'>
                        {link.name}
                    </a>
                ))}
            </div>
            <div className="flex items-center gap-6 pb-6">
                <a href="#" className="hover:-translate-y-0.5 text-gray-200 transition-all duration-300">
                    <DribbbleIcon />
                </a>
                <a href="https://www.linkedin.com/in/diwakar-singh-7a95b4378/" className="hover:-translate-y-0.5 text-gray-200 transition-all duration-300">
                    <LinkedinIcon />
                </a>
                <a href="https://x.com/Diwakarrsinghh" className="hover:-translate-y-0.5 text-gray-200 transition-all duration-300">
                    <TwitterIcon />
                </a>
                <a href="https://github.com/diwakar-1" className="hover:-translate-y-0.5 text-gray-200 transition-all duration-300">
                    <GithubIcon />
                </a>
            </div>
            <hr className="w-full border-white/20 mt-6" />
            <div className="flex flex-col md:flex-row items-center w-full justify-between gap-4 py-4">
                <p>Build AD for free</p>
                <p>Copyright © 2026 <a href="https://prebuiltui.com?utm_source=genesis"> MAD MARKETING</a>. </p>
            </div>
        </motion.footer>
    );
};