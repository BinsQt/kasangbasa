import React, { useState } from 'react';

const SlideContent = ({ slide, readAloud }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    
    const handleWordClick = (word) => { const capitalLetters = word.match(/[A-ZÑ]/g); if (capitalLetters) { readAloud(capitalLetters.join(''), true);  } };
    

    const handleOptionChange = (event) => 
        { setSelectedOption(event.target.value); }; 
    
    const handleSubmit = () => { 
        if (selectedOption) { 
            const correctAnswer = slide.answer.split(': ')[1]; 
            if (selectedOption === correctAnswer) { 
                alert(`Tama! Ang sagot ay: ${correctAnswer}`); 
            } else { 
                alert(`Mali. Ang tamang sagot ay: ${correctAnswer}`); 
            } 
        } else { 
            alert("Pumili ng tamang sagot"); 
        } 
    };
    

    const renderSlideContent = (layoutType) => {
        switch (layoutType) {
            case 'LAYOUT_1':
                return (
                    <div className='md:px-10 px-4 text-wrap'>
                        <div className='flex flex-row gap-3 md:flex-row md:gap-10 text-wrap '>
                            <div className='h-40 w-16 rounded-b-3xl bg-blue-400 hidden sm:block'></div>
                            <div className='md:w-11/12 w-full'>
                                <h2 className="text-2xl md:text-6xl font-bold mb-4 text-blue-700">{slide.title}</h2>
                                {slide.content.slice(0).map((paragraph, index) => (
                                    <p key={index} className="paragraph text-lg md:text-xl mt-2">
                                        {paragraph.split(' ').map((word, wordIndex) => (
                                            <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                        ))}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div className="text-center mb-10 special-layout">
                            <div className='flex flex-col justify-center items-center '>
                                {slide.images && (
                                    <div className="flex justify-center items-center gap-4 md:gap-10 image mt-5 flex-wrap">
                                        {slide.images.map((img, index) => (
                                            <img key={index} src={img} alt={`Example ${index + 1}`} className="w-full h-auto rounded max-w-xs max-h-xs shadow-md" />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
                case 'LAYOUT_2':
                    return (
                        <div className='md:px-10 px-4 text-wrap'>
                            <div className='flex md:flex-row gap-3 text-wrap'>
                                <div className='h-40 w-16 rounded-b-3xl bg-blue-400 hidden sm:block'></div>
                                <div className='md:w-11/12 w-full'>
                                    <h2 className="text-2xl md:text-6xl font-bold mb-4 text-blue-700">{slide.title}</h2>
                                    {slide.content.map((paragraph, index) => (
                                        <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left">
                                            {paragraph.split(' ').map((word, wordIndex) => (
                                                <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                            ))}
                                        </p>
                                    ))}
                                </div>
                            </div>
                            <div className="text-left mb-10 flex flex-col md:flex-row">
                                <div className='sm:ml-10'>
                                    {slide.questions && (
                                        <ul className="list-disc list-inside mt-5 text-lg md:text-xl">
                                            {slide.questions.map((q, index) => (
                                                <li key={index} onClick={() => readAloud(q)} className="question cursor-pointer hover:underline">{q}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                case 'LAYOUT_3': 
                    return (
                        <div className='px-4 md:px-0'>
                            <h2 className="text-2xl md:text-6xl text-center font-bold mb-4 max-w-3xl mx-auto text-blue-700">{slide.title}</h2>
                            <div className="mb-2 py-5 px-4 text-left p-2 special-layout bg-gray-300 rounded-3xl">
                                {slide.content.map((paragraph, index) => (
                                    <p key={index} className="paragraph text-lg md:text-xl mb-3">
                                        {paragraph.split(' ').map((word, wordIndex) => (
                                            <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                        ))}
                                    </p>
                                ))}
                            </div>
                        </div>
                    );
                case 'LAYOUT_4': 
                    return (
                        <div className='px-4 md:px-0 flex py-10 md:py-20'>
                            <div className='flex flex-col justify-center items-center gap-4 md:gap-10'>
                                {slide.images.map((img, index) => (
                                    <img key={index} src={img} alt={`Example ${index + 1}`} className="w-40 h-auto rounded max-w-xs max-h-xs" />
                                ))}
                                <div className="mb-5 special-layout rounded-3xl text-justify">
                                    <h2 className="text-2xl md:text-4xl text-center font-bold mb-2 max-w-3xl mx-auto mt-5 text-blue-700">{slide.title}</h2>
                                    {slide.content.map((paragraph, index) => (
                                        <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left">
                                            {paragraph.split(' ').map((word, wordIndex) => (
                                                <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                            ))}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                case 'LAYOUT_5': 
                    return (
                        <div className='px-4 md:px-0'>
                            <div className='flex justify-left items-center flex-col'>
                                <div className="mb-5 py-2 special-layout bg-white">
                                    <div className='pl-4 md:pl-10 w-full md:w-11/12'>
                                        <div className='flex flex-col justify-center items-center'>
                                            <h2 className="text-2xl md:text-3xl font-bold mb-2 max-w-3xl mt-5 text-blue-700">{slide.title}</h2>
                                            {slide.images.map((img, index) => (
                                                <img key={index} src={img} alt={`Example ${index + 1}`} className="rounded w-40 h-40 md:w-40 md:h-40 drop-shadow-xl" />
                                            ))}
                                        </div>
                                        {slide.content.slice(0, 1).map((paragraph, index) => (
                                            <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left">
                                                {paragraph.split(' ').map((word, wordIndex) => (
                                                    <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                                ))}
                                            </p>
                                        ))}
                                        {slide.content.slice(1, 2).map((paragraph, index) => (
                                            <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left font-bold">
                                                {paragraph.split(' ').map((word, wordIndex) => (
                                                    <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                                ))}
                                            </p>
                                        ))}

                                        {slide.content.slice(2,3).map((paragraph, index) => (
                                            <p key={index} className="paragraph text-lg md:text-xl mt-2">
                                                {paragraph.split(' ').map((word, wordIndex) => (
                                                    <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                                ))}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                    case 'LAYOUT_5.1': 
                    return (
                        <div className='px-4 md:px-0'>
                            <div className='flex justify-left items-center flex-col'>
                                <div className="mb-5 py-2 special-layout bg-white">
                                    <div className='pl-4 md:pl-10 w-full md:w-11/12'>
                                        <div className='flex flex-col justify-center items-center'>
                                            <h2 className="text-2xl md:text-3xl font-bold mb-2 max-w-3xl mt-5 text-blue-700">{slide.title}</h2>
                                            {slide.images.map((img, index) => (
                                                <img key={index} src={img} alt={`Example ${index + 1}`} className="rounded w-40 h-40 md:w-40 md:h-40 drop-shadow-xl" />
                                            ))}
                                        </div>
                                        {slide.content.slice(0, 1).map((paragraph, index) => (
                                            <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left">
                                                {paragraph.split(' ').map((word, wordIndex) => (
                                                    <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                                ))}
                                            </p>
                                        ))}
                                        {slide.content.slice(1, 2).map((paragraph, index) => (
                                            <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left">
                                                {paragraph.split(' ').map((word, wordIndex) => (
                                                    <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                                ))}
                                            </p>
                                        ))}

                                        {slide.content.slice(2,3).map((paragraph, index) => (
                                            <p key={index} className="paragraph text-lg md:text-xl mt-2">
                                                {paragraph.split(' ').map((word, wordIndex) => (
                                                    <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                                ))}
                                            </p>
                                        ))}
                                        {slide.content.slice(3,4).map((paragraph, index) => (
                                            <p key={index} className="paragraph text-lg md:text-xl mt-2">
                                                {paragraph.split(' ').map((word, wordIndex) => (
                                                    <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                                ))}
                                            </p>
                                        ))}
                                        {slide.content.slice(4,5).map((paragraph, index) => (
                                            <p key={index} className="paragraph text-lg md:text-xl mt-2">
                                                {paragraph.split(' ').map((word, wordIndex) => (
                                                    <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                                ))}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                case 'LAYOUT_6': 
                return (
                    <div className='px-4 md:px-0'>
                        <div className='flex justify-left items-center flex-col'>
                            <div className="mb-5 py-10 md:py-20 px-5 special-layout  bg-white">
                                <div className='pl-4 md:pl-10 w-full md:w-11/12'>
                                    <div className='flex justify-center items-center'>
                                        <h2 className="text-3xl  xl md:text-3xl font-bold mb-2 max-w-3xl mt-5 text-blue-700">{slide.title}</h2>
                                    </div>
                                    {slide.content.slice(0,1).map((paragraph, index) => (
                                        <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left">
                                            {paragraph.split(' ').map((word, wordIndex) => (
                                                <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                            ))}
                                        </p>
                                    ))}

                                    
                                {slide.content.slice(1,2).map((paragraph, index) => (
                                        <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left font-bold">
                                            {paragraph.split(' ').map((word, wordIndex) => (
                                                <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                            ))}
                                        </p>
                                    ))}

                                {slide.content.slice(2,3).map((paragraph, index) => (
                                        <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left">
                                            {paragraph.split(' ').map((word, wordIndex) => (
                                                <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                            ))}
                                        </p>
                                    ))}
                                <span className='flex justify-left items-center my-3'>
                                {slide.content.slice(3,4).map((paragraph, index) => (
                                        <p key={index} className="paragraph text-lg md:text-xl ">
                                            {paragraph.split(' ').map((word, wordIndex) => (
                                                <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                            ))}
                                        </p>
                                    ))}
                                    {slide.questions && (
                                        <ul className="ml-3 text-lg md:text-xl">
                                            {slide.questions.map((q, index) => (
                                        <li key={index} onClick={() => handleWordClick(q)}  className="question"><strong>{q}</strong></li>
                                        ))}
                                        </ul>
                                    )}
                                </span>
                                <hr className='border-blue-800'></hr>
                                    
                                {slide.content.slice(4,5).map((paragraph, index) => (
                                        <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left">
                                            {paragraph.split(' ').map((word, wordIndex) => (
                                                <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline"><strong>{word}</strong> </span>
                                            ))}
                                        </p>
                                    ))}
                                                                    
                                {slide.content.slice(5,6).map((paragraph, index) => (
                                        <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left">
                                            {paragraph.split(' ').map((word, wordIndex) => (
                                                <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                            ))}
                                        </p>
                                    ))}

                                {slide.content.slice(6,7).map((paragraph, index) => (
                                        <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left">
                                            {paragraph.split(' ').map((word, wordIndex) => (
                                                <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline"><strong>{word}</strong> </span>
                                            ))}
                                        </p>
                                    ))}

                            {slide.content.slice(7,8).map((paragraph, index) => (
                                        <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left">
                                            {paragraph.split(' ').map((word, wordIndex) => (
                                                <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                            ))}
                                        </p>
                                    ))}

                            {slide.content.slice(8,9).map((paragraph, index) => (
                                        <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left">
                                            {paragraph.split(' ').map((word, wordIndex) => (
                                                <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline"><strong>{word}</strong> </span>
                                            ))}
                                        </p>
                                    ))}

                                {slide.content.slice(9,10).map((paragraph, index) => (
                                        <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left">
                                            {paragraph.split(' ').map((word, wordIndex) => (
                                                <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                            ))}
                                        </p>
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>
                );
                case 'LAYOUT_6.5': 
                return (
                    <div className='px-4 md:px-0'>
                    <div className='flex justify-left items-center flex-col'>
                        <div className="mb-5 py-10 md:py-20 px-5 special-layout  bg-white">
                            <div className='pl-4 md:pl-10 w-full md:w-11/12'>
                                <div className='flex justify-center items-center'>
                                    <h2 className="text-3xl  xl md:text-3xl font-bold mb-2 max-w-3xl mt-5 text-blue-700">{slide.title}</h2>
                                </div>
                                {slide.content.slice(0,1).map((paragraph, index) => (
                                    <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left">
                                        {paragraph.split(' ').map((word, wordIndex) => (
                                            <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                        ))}
                                    </p>
                                ))}

                                
                            {slide.content.slice(1,2).map((paragraph, index) => (
                                    <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left font-bold">
                                        {paragraph.split(' ').map((word, wordIndex) => (
                                            <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                        ))}
                                    </p>
                                ))}

                            {slide.content.slice(2,3).map((paragraph, index) => (
                                    <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left">
                                        {paragraph.split(' ').map((word, wordIndex) => (
                                            <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                        ))}
                                    </p>
                                ))}
                            <span className='flex justify-left items-center my-3'>
                            {slide.content.slice(3,4).map((paragraph, index) => (
                                    <p key={index} className="paragraph text-lg md:text-xl font-bold">
                                        {paragraph.split(' ').map((word, wordIndex) => (
                                            <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                        ))}
                                    </p>
                                ))}
    
                            </span>
                                
                            {slide.content.slice(4,5).map((paragraph, index) => (
                                    <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left">
                                        {paragraph.split(' ').map((word, wordIndex) => (
                                            <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                        ))}
                                    </p>
                                ))}
                                                                   <hr className='border-blue-800 mt-5'></hr>
                         
                            {slide.content.slice(5,6).map((paragraph, index) => (
                                    <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left">
                                        {paragraph.split(' ').map((word, wordIndex) => (
                                            <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline"><strong>{word}</strong> </span>
                                        ))}
                                    </p>
                                ))}

                            {slide.content.slice(6,7).map((paragraph, index) => (
                                    <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left">
                                        {paragraph.split(' ').map((word, wordIndex) => (
                                            <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline"><strong>{word}</strong> </span>
                                        ))}
                                    </p>
                                ))}

                        {slide.content.slice(7,8).map((paragraph, index) => (
                                    <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left">
                                        {paragraph.split(' ').map((word, wordIndex) => (
                                            <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                        ))}
                                    </p>
                                ))}

                        {slide.content.slice(8,9).map((paragraph, index) => (
                                    <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left">
                                        {paragraph.split(' ').map((word, wordIndex) => (
                                            <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                        ))}
                                    </p>
                                ))}

                            {slide.content.slice(9,10).map((paragraph, index) => (
                                    <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left">
                                        {paragraph.split(' ').map((word, wordIndex) => (
                                            <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline"><strong>{word}</strong> </span>
                                        ))}
                                    </p>
                                ))}

{slide.content.slice(10,11).map((paragraph, index) => (
                                    <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left">
                                        {paragraph.split(' ').map((word, wordIndex) => (
                                            <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                        ))}
                                    </p>
                                ))}

{slide.content.slice(11,12).map((paragraph, index) => (
                                    <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left">
                                        {paragraph.split(' ').map((word, wordIndex) => (
                                            <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                        ))}
                                    </p>
                                ))}
                                


                            </div>
                        </div>
                    </div>
                </div>
                );
                case 'LAYOUT_6.6': 
                return (
                    <div className='px-4 md:px-0'>
                    <div className='flex justify-left items-center flex-col'>
                        <div className="mb-5 py-10 md:py-20 px-5 special-layout  bg-white">
                            <div className='pl-4 md:pl-10 w-full md:w-11/12'>
                                <div className='flex justify-center items-center'>
                                    <h2 className="text-3xl  xl md:text-3xl font-bold mb-2 max-w-3xl mt-5 text-blue-700">{slide.title}</h2>
                                </div>
                                {slide.content.slice(0,1).map((paragraph, index) => (
                                    <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left">
                                        {paragraph.split(' ').map((word, wordIndex) => (
                                            <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                        ))}
                                    </p>
                                ))}

<hr className='border-blue-800 mt-5'></hr>
                            {slide.content.slice(1,2).map((paragraph, index) => (
                                    <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left font-bold">
                                        {paragraph.split(' ').map((word, wordIndex) => (
                                            <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                        ))}
                                    </p>
                                ))}

                            {slide.content.slice(2,3).map((paragraph, index) => (
                                    <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left">
                                        {paragraph.split(' ').map((word, wordIndex) => (
                                            <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                        ))}
                                    </p>
                                ))}
                                                                                                   

                            <span className='flex justify-left items-center my-3'>
                            {slide.content.slice(3,4).map((paragraph, index) => (
                                    <p key={index} className="paragraph text-lg md:text-xl font-bold">
                                        {paragraph.split(' ').map((word, wordIndex) => (
                                            <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                        ))}
                                    </p>
                                ))}
    
                            </span>
                                
                            {slide.content.slice(4,5).map((paragraph, index) => (
                                    <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left">
                                        {paragraph.split(' ').map((word, wordIndex) => (
                                            <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                        ))}
                                    </p>
                                ))}
                         
                                                                   {slide.content.slice(5,6).map((paragraph, index) => (
                                    <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left">
                                        {paragraph.split(' ').map((word, wordIndex) => (
                                            <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                        ))}
                                    </p>
                                ))}

                            {slide.content.slice(6,7).map((paragraph, index) => (
                                    <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left">
                                        {paragraph.split(' ').map((word, wordIndex) => (
                                            <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                        ))}
                                    </p>
                                ))}

                        {slide.content.slice(7,8).map((paragraph, index) => (
                                    <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left">
                                        {paragraph.split(' ').map((word, wordIndex) => (
                                            <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                        ))}
                                    </p>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
                );
                case 'LAYOUT_6.7': 
                return (
                    <div className='px-4 md:px-0'>
                    <div className='flex justify-left items-center flex-col'>
                        <div className="mb-5 py-10 md:py-20 px-5 special-layout  bg-white">
                            <div className='pl-4 md:pl-10 w-full md:w-11/12'>
                                <div className='flex justify-center items-center'>
                                    <h2 className="text-3xl  xl md:text-3xl font-bold mb-2 max-w-3xl mt-5 text-blue-700">{slide.title}</h2>
                                </div>
                                {slide.content.slice(0,1).map((paragraph, index) => (
                                    <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left">
                                        {paragraph.split(' ').map((word, wordIndex) => (
                                            <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                        ))}
                                    </p>
                                ))}
<hr className='border-blue-800 mt-5'></hr>
                                
                            {slide.content.slice(1,2).map((paragraph, index) => (
                                    <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left font-bold">
                                        {paragraph.split(' ').map((word, wordIndex) => (
                                            <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                        ))}
                                    </p>
                                ))}

                            {slide.content.slice(2,3).map((paragraph, index) => (
                                    <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left">
                                        {paragraph.split(' ').map((word, wordIndex) => (
                                            <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                        ))}
                                    </p>
                                ))}
                            <span className='flex justify-left items-center my-3'>
                            {slide.content.slice(3,4).map((paragraph, index) => (
                                    <p key={index} className="paragraph text-lg md:text-xl font-bold">
                                        {paragraph.split(' ').map((word, wordIndex) => (
                                            <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                        ))}
                                    </p>
                                ))}
    
                            </span>
                                
                            {slide.content.slice(4,5).map((paragraph, index) => (
                                    <p key={index} className="paragraph text-lg md:text-xl mt-2 text-left">
                                        {paragraph.split(' ').map((word, wordIndex) => (
                                            <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                        ))}
                                    </p>
                                ))}
                                                                   
                         

                            </div>
                        </div>
                    </div>
                </div>
                );
                case 'LAYOUT_7': 
                return (
                    <div className='px-4 md:px-0 flex flex-col justify-center items-center'> <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-800">{slide.title}</h2> <div className="text-left mb-10"> <p className="paragraph text-lg md:text-xl mt-2 text-left"> {slide.content[0].split(' ').map((word, wordIndex) => ( <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span> ))} </p> <div className="mt-4"> <div className="flex flex-col items-start"> {slide.content.slice(1).map((option, index) => ( <label key={index} className="flex items-center"> <input type="radio" name="option" value={option} onChange={handleOptionChange} className="mr-2" /> {option} </label> ))} </div> <button onClick={handleSubmit} className="mt-4 bg-blue-500 text-white p-2 rounded"> Submit </button> </div> </div> </div>
                );
                case 'LAYOUT_9': 
                return (
                    <div className='md:px-10 px-4 text-wrap'> <div className='flex flex-row gap-3 md:flex-row md:gap-10 text-wrap'> <div className='h-40 w-16 rounded-b-3xl bg-blue-400 hidden sm:block'></div> <div className='md:w-11/12 w-full'> <h2 className="text-2xl md:text-6xl font-bold mb-4 text-blue-700">{slide.title}</h2> {slide.content.map((paragraph, index) => ( <p key={index} className="paragraph text-lg md:text-xl mt-2"> {paragraph.split(' ').map((word, wordIndex) => ( <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span> ))} </p> ))} {slide.videoEmbed && ( <div className="mt-4" dangerouslySetInnerHTML={{ __html: slide.videoEmbed }}></div> )} </div> </div> </div>
                );
                case 'LAYOUT_10': 
                return (
                    <div className='md:px-10 px-4 text-wrap'> 
                    <div className='flex flex-row gap-3 md:flex-row md:gap-10 text-wrap'> 
                        <div className='h-40 w-16 rounded-b-3xl bg-blue-400 hidden sm:block'></div> 
                        <div className='md:w-11/12 w-full'> 
                        <h2 className="text-2xl md:text-6xl font-bold mb-4 text-blue-700">{slide.title}</h2> 
                        {slide.content.slice(0,1).map((paragraph, index) => (
                                        <p key={index} className="paragraph text-lg md:text-xl mt-2 text-justify">
                                            {paragraph.split(' ').map((word, wordIndex) => (
                                                <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                            ))}
                                        </p>
                                    ))}
                                                {slide.content.slice(1,2).map((paragraph, index) => (
                                        <p key={index} className="paragraph text-lg md:text-xl mt-2 text-justify">
                                            {paragraph.split(' ').map((word, wordIndex) => (
                                                <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span>
                                            ))}
                                        </p>
                                    ))}

                            {slide.videoEmbed && ( 
                            <div className="mt-4" dangerouslySetInnerHTML={{ __html: slide.videoEmbed }}></div> )} 
                        </div> 
                        </div> 
                        </div>
                );
                
            default:
                return (

                    <div className='px-4 md:px-0 flex flex-col justify-center items-center'> <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-800">{slide.title}</h2> <div className="text-left mb-10"> <p className="paragraph text-lg md:text-xl mt-2 text-left"> {slide.content[0].split(' ').map((word, wordIndex) => ( <span key={wordIndex} onClick={() => handleWordClick(word)} className="cursor-pointer hover:underline">{word} </span> ))} </p> <div className="mt-4"> <div className="flex flex-col items-start"> {slide.content.slice(1).map((option, index) => ( <label key={index} className="flex items-center"> <input type="radio" name="option" value={option} onChange={handleOptionChange} className="mr-2" /> {option} </label> ))} </div> <button onClick={handleSubmit} className="mt-4 bg-blue-500 text-white p-2 rounded"> Submit </button> </div> </div> </div>
                );
        }
    };

    return (
        <>
            {renderSlideContent(slide.layoutType || 'default')}
        </>
    );
};

export default SlideContent;
