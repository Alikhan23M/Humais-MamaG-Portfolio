'use client'

import { useState, useEffect } from 'react'
import { ExternalLink, Eye, Filter } from 'lucide-react'

export default function Portfolio() {
    const [projects, setProjects] = useState([])
    const [filter, setFilter] = useState('All')
    const [categories, setCategories] = useState(['All'])
    const [showFilters, setShowFilters]=useState(false);

    useEffect(() => {
        fetchProjects()
    }, [])

 

    const fetchProjects = async () => {
        try {
            const response = await fetch('/api/projects')
            if (response.ok) {
                const data = await response.json()
                setProjects(data)
                const uniqueCategories = ['All', ...new Set(data.map(p => p.category))]
                setCategories(uniqueCategories)
            }
        } catch (error) {
            console.error('Error fetching projects:', error)
        }
    }

    const filteredProjects =
        filter === 'All' ? projects : projects.filter(p => p.category === filter)

    return (
        <section id="portfolio" className="py-24 bg-black ">
            {/* Background Glow */}
            {/* <div className="absolute inset-0 z-0">
                <div className="absolute top-20 -left-20 w-72 h-72 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute bottom-20 -right-20 w-72 h-72 bg-pink-500 rounded-full opacity-20 blur-3xl"></div>
            </div> */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
                  {/* Background Glow */}
                {/* <div className="hidden md:block absolute inset-0">
                    <div className="absolute top-20 -left-20 w-72 h-72 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
                    <div className="absolute bottom-20 -right-20 w-72 h-72 bg-pink-500 rounded-full opacity-20 blur-3xl"></div>
                </div> */}
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-white mb-4">My Portfolio</h2>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
                        Explore my latest development projects with modern UI, animations, and interactive design.
                    </p>

                    {/* Filter Buttons */}
                    
                    <div className='flex flex-col md:flex-row gap-6 items-end'>
                        <Filter className='text-lg md:hidden text-white '
                        onClick={()=>{
                            console.log('clicked')
                            setShowFilters(!showFilters)
                        }}
                        />
                        <div className={`${showFilters?'':'hidden'} md:visible flex flex-wrap justify-center gap-4`}>
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setFilter(category)}
                                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${filter === category
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredProjects.map(project => (
                        <div
                            key={project._id}
                            className="group relative bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-3xl"
                        >
                            {/* Image */}
                            <div className="relative overflow-hidden rounded-t-2xl">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                {/* Overlay Buttons */}
                                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-white text-gray-900 p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
                                        >
                                            <ExternalLink size={20} />
                                        </a>
                                    )}
                                    <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-200">
                                        <Eye size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm text-purple-400 font-medium">{project.category}</span>
                                    {project.isFeatured && (
                                        <span className="bg-pink-500/20 text-pink-400 text-xs px-2 py-1 rounded-full">
                                            Featured
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>

                                {project.tags && project.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag, idx) => (
                                            <span
                                                key={idx}
                                                className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-400">No projects found in this category.</p>
                    </div>
                )}
            </div>
        </section>
    )
}
