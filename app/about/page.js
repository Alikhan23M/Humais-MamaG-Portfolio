import Image from 'next/image'
import React from 'react'

export default function page() {
    return (
        <>
            <section className='py-24 bg-gray-950 relative overflow-hidden px-6 md:px-12 lg:px-16 min-h-screen flex flex-col '>

                {/* Background Glow */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 -left-20 w-72 h-72 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
                    <div className="absolute bottom-20 -right-20 w-72 h-72 bg-pink-500 rounded-full opacity-20 blur-3xl"></div>
                </div>


                <div className='flex flex-col-reverse md:flex-row justify-center items-center gap-10 md:gap-20'>
                    <div>
                        <h1 className='hidden md:block text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent'>About Me</h1>

                        <p className='text-gray-300 text-lg max-w-3xl mb-8 md:text-justify'>I am a passionate content writer and digital strategist with over 5 years of experience in crafting compelling narratives that drive engagement and conversions. My expertise spans various industries, including technology, healthcare, finance, and lifestyle. I specialize in creating SEO-optimized content that not only resonates with the target audience but also ranks well on search engines. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum iste facere culpa aspernatur suscipit fugit doloremque, dolore eius unde quidem repellat aperiam amet quia neque illum. Culpa ab doloremque vero, sapiente facilis tempora soluta impedit ullam est qui odio explicabo optio veniam laudantium nam quos odit ea, a dolore consectetur? Aut possimus cum porro deserunt officiis inventore nisi dolore natus provident error quas rem asperiores iusto, molestias facilis eum qui aliquid repellat neque. Officiis est excepturi pariatur, placeat nam maiores molestias laborum numquam quidem harum quisquam voluptate voluptates, quaerat assumenda? Mollitia reiciendis, atque, non harum laudantium qui nihil natus unde quis quasi facilis doloribus eveniet praesentium ratione voluptate eos eum dolorum nisi libero eaque saepe ad commodi? Dicta, reprehenderit voluptates culpa aut unde impedit ipsa maxime, suscipit distinctio ex temporibus quam consequuntur quidem ullam perferendis repellendus cumque earum dignissimos. Ex voluptas alias quam quia illo, pariatur amet quos dolorum rerum.</p>
                    </div>

                    <div>
                       <h1 className='md:hidden text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent text-center mb-4'>About Me</h1>
                        <img src="/profile.jpg" alt=""
                            className='h-80 w-full object-cover md:h-[28rem] rounded-2xl'
                        />
                    </div>
                </div>




            </section>
        </>
    )
}
