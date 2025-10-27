
import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function ChapterReader() {
  const { id, chapterId } = useParams()
  const navigate = useNavigate()
  const [fontSize, setFontSize] = useState(18)
  const [fontFamily, setFontFamily] = useState('serif')
  const [chapterContent, setChapterContent] = useState('')
  const [chapterTitle, setChapterTitle] = useState('Chapter 1')

  useEffect(() => {
    setChapterContent(`
      This is the beginning of your cultivation journey. 
      
      The young protagonist stood at the edge of the cliff, gazing at the vast mountain range before him. The morning mist obscured the valleys below, creating an ethereal atmosphere that matched his uncertain future.
      
      "Today marks the beginning of my path to immortality," he whispered to himself, clenching his fists with determination.
      
      Years of preparation had led to this moment. The trials he would face were unknown, but his resolve was unshakeable. With a deep breath, he took his first step forward...
      
      [This is a demo chapter. In the full version, you would see the actual chapter content from the novel.]
    `)
    setChapterTitle(`Chapter ${chapterId}: The Beginning`)
  }, [chapterId])

  const increaseFontSize = () => {
    if (fontSize < 32) setFontSize(fontSize + 2)
  }

  const decreaseFontSize = () => {
    if (fontSize > 12) setFontSize(fontSize - 2)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">

      <header className="flex items-center justify-between p-6 border-b border-white/10">

        <div className="bg-white/90 rounded-lg p-2 flex flex-col gap-1">
          <button 
            onClick={() => navigate(`/novel/${id}/chapter/${Math.max(1, parseInt(chapterId) - 1)}`)}
            className="p-2 hover:bg-gray-200 rounded"
          >
            <span className="text-xl">▲</span>
          </button>
          <button 
            onClick={() => navigate(`/novel/${id}/chapter/${parseInt(chapterId) + 1}`)}
            className="p-2 hover:bg-gray-200 rounded"
          >
            <span className="text-xl">▼</span>
          </button>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="bg-white/90 hover:bg-white p-4 rounded-lg transition"
        >
          <span className="text-3xl">🏠</span>
        </button>


        <h1 className="text-3xl md:text-4xl font-bold">
          <span style={{
            background: 'linear-gradient(90deg, #ff6b35, #4ecdc4, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            DAOVERSE
          </span>
        </h1>

    
        <button 
          onClick={() => navigate('/profile')}
          className="bg-white/90 hover:bg-white p-4 rounded-lg transition"
        >
          <span className="text-3xl">👤</span>
        </button>

        <button 
          onClick={() => navigate('/search')}
          className="bg-white/90 hover:bg-white p-4 rounded-lg transition"
        >
          <span className="text-3xl">🔍</span>
        </button>
      </header>

      <div className="flex items-center justify-between px-6 py-4 bg-slate-800/50">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">Font type</span>
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="bg-white rounded px-3 py-2 text-gray-900"
          >
            <option value="serif">Serif</option>
            <option value="sans-serif">Sans-Serif</option>
            <option value="monospace">Monospace</option>
          </select>
        </div>

        <h2 className="text-white text-xl font-bold text-center flex-1">
          {chapterTitle}
        </h2>

        
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">Font size</span>
          <button
            onClick={decreaseFontSize}
            className="bg-white hover:bg-gray-200 px-3 py-2 rounded transition"
          >
            <span className="text-xl">-</span>
          </button>
          <span className="text-white font-bold w-12 text-center">{fontSize}px</span>
          <button
            onClick={increaseFontSize}
            className="bg-white hover:bg-gray-200 px-3 py-2 rounded transition"
          >
            <span className="text-xl">+</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-gray-100 rounded-xl p-12 mb-6 min-h-[500px]">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Novel content</h3>
          <div
            style={{
              fontFamily: fontFamily,
              fontSize: `${fontSize}px`,
              lineHeight: 1.8,
              color: '#1f2937'
            }}
            className="whitespace-pre-wrap"
          >
            {chapterContent}
          </div>
        </div>

        <div className="flex justify-between mb-6">
          <button
            onClick={() => navigate(`/novel/${id}/chapter/${Math.max(1, parseInt(chapterId) - 1)}`)}
            disabled={parseInt(chapterId) <= 1}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            ← Previous Chapter
          </button>
          <button
            onClick={() => navigate(`/novel/${id}`)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Back to Novel
          </button>
          <button
            onClick={() => navigate(`/novel/${id}/chapter/${parseInt(chapterId) + 1}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Next Chapter →
          </button>
        </div>

        <div className="bg-gray-100 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Comment section</h3>
          <div className="bg-white rounded-lg p-6 min-h-[200px]">
            <textarea
              placeholder="Share your thoughts about this chapter..."
              className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-500"
            ></textarea>
            <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition">
              Post Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChapterReader