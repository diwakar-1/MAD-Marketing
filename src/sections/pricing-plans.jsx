import Title from "../components/Title";
import { CheckIcon, CrownIcon, RocketIcon, ZapIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function PricingPlans() {
    const ref = useRef([]);
    const data = [
        {
            icon: RocketIcon,
            title: 'Starter',
            description: 'For individuals and small teams',
            price: '₹59',
            buttonText: 'Get Started',
            features: [
                'Create AI ad agents from prompts',
                'Limited active agents',
                'Core ad copy generation',
                'Basic image / creative generation',
                'Single ad platform support',
                'Manual campaign launch',
                'Basic performance insights',
                'Standard response speed',
                'Community resources',
                'Email support',
            ],
        },
        {
            icon: ZapIcon,
            title: 'Professional',
            description: 'For growing teams and startups',
            price: '₹199',
            mostPopular: true,
            buttonText: 'Upgrade Now',
            features: [
                'Unlimited AI ad agents',
                'Advanced ad copy generation',
                'High-quality image / creative generation',
                'Text + image + variation generation',
                'Autonomous testing & optimization',
                'Real-time performance analytics',
                'API access & integrations',
                'Team collaboration & shared workspaces',
                'Faster execution speed',
                'Priority chat & email support',
            ],
        },
        {
            icon: CrownIcon,
            title: 'Enterprise',
            description: 'For enterprises and agencies',
            price: '₹499',
            buttonText: 'Contact Sales',
            features: [
                'All features of Professional plan',
                'Custom-trained AI ad agents',
                'White-label / brand customization',
                'Advanced audience & data integrations',
                'Secure private API access',
                'Role-based access control',
                'Dedicated account manager',
                'SLA-backed uptime & reliability',
                'Custom reporting & dashboards',
                '24/7 premium support',
            ],
        },
    ];

    return (
        <section className="mt-32">
            <Title
                title="Our Pricing Plans"
                description="A visual collection of our most recent works - each piece crafted with intention, emotion and style."
            />

            <div className='mt-12 flex flex-wrap items-center justify-center gap-6'>
                {data.map((item, index) => (
                    <motion.div key={index} className='group w-full max-w-80 glass p-6 rounded-xl hover:-translate-y-0.5'
                        initial={{ y: 150, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: `${index * 0.15}`, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                        ref={(el) => (ref.current[index] = el)}
                        onAnimationComplete={() => {
                            const card = ref.current[index];
                            if (card) {
                                card.classList.add("transition", "duration-300");
                            }
                        }}
                    >
                        <div className="flex items-center w-max ml-auto text-xs gap-2 glass rounded-full px-3 py-1">
                            <item.icon className='size-3.5' />
                            <span>{item.title}</span>
                        </div>
                        <h3 className='mt-4 text-2xl font-semibold'>
                            {item.price} <span className='text-sm font-normal'>/month</span>
                        </h3>
                        <p className='text-gray-200 mt-3'>{item.description}</p>
                        <button className={`mt-7 rounded-md w-full btn ${item.mostPopular ? 'bg-white text-gray-800' : 'glass'}`}>
                            {item.buttonText}
                        </button>
                        <div className='mt-6 flex flex-col'>
                            {item.features.map((feature, index) => (
                                <div key={index} className='flex items-center gap-2 py-2'>
                                    <div className='rounded-full glass border-0 p-1'>
                                        <CheckIcon className='size-3 text-white' strokeWidth={3} />
                                    </div>
                                    <p>{feature}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}