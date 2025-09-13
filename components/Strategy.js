// components/Strategy.jsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Lightbulb, Wrench, Rocket } from 'lucide-react';
import * as FiIcons from 'react-icons/fi'
import * as AiIcons from 'react-icons/ai'
import * as BsIcons from 'react-icons/bs'
const iconMap = { ...FiIcons, ...AiIcons, ...BsIcons }
const sampleStrategies = [
    {
        title: 'Discovery & Analysis',
        description: 'We dive deep to understand your brand, audience, and goals. This foundational step ensures our strategy is perfectly aligned with your vision and market needs.',
        icon: Lightbulb,
    },
    {
        title: 'Planning & Design',
        description: 'Once we have the insights, we craft a detailed plan and a user-centric design. We focus on creating a seamless and engaging experience that captivates your audience.',
        icon: Wrench,
    },
    {
        title: 'Execution & Launch',
        description: 'With the plan and design approved, we bring the project to life. Our meticulous development process culminates in a flawless launch, bringing your ideas to the world.',
        icon: Rocket,
    },
];

export default function Strategy() {
    const [strategies, setStrategies] = useState(sampleStrategies);
    const fetchstrategy = async () => {
        const response = await fetch('/api/strategy');
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setStrategies(data);
        }
        else {
            setStrategies(sampleStrategies);
        }
    }

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    // Animation variants for Framer Motion
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };


    useEffect(()=>{
        fetchstrategy();
    },[])
    return (
        <section id="strategy" className="py-24 bg-gray-950 text-gray-300 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-20 -left-20 w-72 h-72 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute bottom-20 -right-20 w-72 h-72 bg-pink-500 rounded-full opacity-20 blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Heading */}
                <div className="text-center mb-16">
                    <h2 className="py-2 text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                        Our Strategy
                    </h2>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        A proven process that ensures success, from concept to completion.
                    </p>
                </div>

                {/* Strategy Timeline */}
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'show' : 'hidden'}
                    className="relative flex flex-col md:w-3/4 mx-auto"
                >
                    {/* Vertical line */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-700 -translate-x-1/2"></div>

                    {strategies?.map((strategy, index) => {
                        const IconComponent = iconMap[strategy?.icon] || FiIcons.FiBarChart
                        const isLeft = index % 2 === 1;

                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className={`flex flex-col md:flex-row items-center justify-between  md:gap-6 px-4 md:py-8 z-10 relative
                  ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'}`}
                            >
                                {/* Content */}
                                <div className={`flex-1 p-4 border border-dotted rounded-md`}>
                                    {/* Icon and Dot */}

                                    <div className='flex gap-2 items-center pb-2'>
                                        <IconComponent size={36} className='md:hidden p-1  rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl' />

                                        <h3 className="text-xl font-bold text-white mb-2">{strategy?.title}</h3>
                                    </div>
                                    <p className="text-gray-400">{strategy?.description}</p>
                                </div>

                                {/* Icon and Dot */}
                                <div className={`invisible md:visible relative flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl`}>
                                    <IconComponent size={24} />
                                    {/* The dot on the line */}
                                    <div className={`hidden md:block absolute w-4 h-4 rounded-full bg-purple-500 -z-10 transition-all 
                  ${isLeft ? 'md:right-0 md:translate-x-1/2' : 'md:left-0 md:-translate-x-1/2'}`}></div>
                                </div>

                                {/* Spacer for a clean V shape */}
                                <div className="flex-1 hidden md:block"></div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}