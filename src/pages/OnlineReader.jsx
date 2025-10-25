
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { novelService } from '../services/novelService'

function OnlineReader() {
  const { id, volumeNumber } = useParams()
  const navigate = useNavigate()
  const [volume, setVolume] = useState(null)
  const [novel, setNovel] = useState(null)

  useEffect(() => {
    fetchVolumeInfo()
  }, [id, volumeNumber])

  const fetchVolumeInfo = async () => {
    try {
    
      const novelResult = await novelService.getNovelById(id)
      if (novelResult.success) {
        setNovel(novelResult.data)
        
        const volumeResult = await novelService.getVolumes(id, 1, 50)
        if (volumeResult.success) {
          const vol = volumeResult.data.find(v => v.number == volumeNumber)
          setVolume(vol)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getDownloadUrl = (driveId) => {
    return `https://drive.google.com/uc?export=download&id=${driveId}`;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(`/novel/${id}`)}
          className="mb-6 bg-white/90 hover:bg-white px-6 py-3 rounded-lg font-semibold transition"
        >
          ← Back to Novel
        </button>

        <div className="bg-white rounded-xl p-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">
            {novel?.title} - Volume {volumeNumber}
          </h1>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-3">📚 How to Read</h2>
            <p className="text-gray-700 mb-4">
              FNovels provides novels as downloadable EPUB and PDF files. 
              To read this volume, please download it using one of the buttons below:
            </p>
          </div>

          {volume && (
            <div className="space-y-4">
              {volume.epub && (
                
                  href={getDownloadUrl(volume.epub)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-blue-600 hover:bg-blue-700 text-white text-center py-4 rounded-lg font-bold text-lg transition"
                >
                  📕 Download EPUB (Recommended for E-Readers)
                </a>
              )}
              {volume.pdf && (
                
                  href={getDownloadUrl(volume.pdf)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-red-600 hover:bg-red-700 text-white text-center py-4 rounded-lg font-bold text-lg transition"
                >
                  📄 Download PDF (Best for Printing)
                </a>
              )}
            </div>
          )}

          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h3 className="font-bold text-lg mb-3 text-gray-900">💡 Reading Tips:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>EPUB files</strong>: Use apps like Calibre, Apple Books, or Google Play Books</li>
              <li>• <strong>PDF files</strong>: Use Adobe Reader, browser, or any PDF viewer</li>
              <li>• <strong>Mobile</strong>: Download Moon+ Reader (Android) or Apple Books (iOS)</li>
              <li>• Files are hosted on Google Drive for fast, reliable downloads</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnlineReader