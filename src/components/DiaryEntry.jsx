import React, { useEffect, useState } from 'react';
import { SendHorizonal, Bot, Smile } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate
import api from "../services/api"
export default function DiaryEntry() {
  const [diary, setDiary] = useState(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [mood, setMood] = useState(null);
  const navigate = useNavigate(); // ✅ Hook for navigation

  const todayDateString = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get(`/diary-by-date?date=${todayDateString}`, {
          headers: {
            'Authorization': `${token}`, // Send the token as a Bearer token
          },
        });
       
        const json =res.data;
        console.log('JSON:', json);
        if (json.success && json.data) {
          setDiary(json.data.content);
          if (json.data.mood) {
            setMood(json.data.mood);
          }
        }
      } catch (err) {
        console.error('Error fetching diary:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDiary();
  }, [todayDateString]);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setGenerating(true);
    setError('');

      try {
        const token = localStorage.getItem('token');
    const res = await api.post(
  '/diary',
  {
    date: todayDateString,
    input,
  },
  {
    headers: {
      'Authorization': `${token}`,
    },
  }
);


    const json = res.data;
    console.log('Generated Diary:', json);

    if (json?.saved?.content) {
      setDiary(json.saved.content);
      if (json.saved.mood) {
        setMood(json.saved.mood);
      }
    } else if (json?.summary) {
      setDiary(json.summary);
    } else {
      setError('Failed to generate diary entry.');
    }
  } catch (err) {
    console.error('Error:', err);
    setError('Something went wrong. Try again later.');
  }

  setGenerating(false);
};

  if (loading) {
    return (
      <div className="bg-blue-50 rounded-xl p-4 shadow text-center text-gray-500 animate-pulse">
        Checking your diary...
      </div>
    );
  }

  if (diary) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-purple-100 rounded-xl p-5 shadow space-y-4">
        <div className="flex items-center justify-between">
          {/* ✅ Make heading clickable */}
          <h3
            className="text-xl font-semibold text-blue-800 cursor-pointer hover:underline"
            onClick={() => navigate('/diary')}
          >
            Today's Diary
          </h3>
          {mood && (
            <span className="flex items-center text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              <Smile className="w-4 h-4 mr-1" /> Mood: {mood}
            </span>
          )}
        </div>
        <p className="text-gray-800 whitespace-pre-line leading-relaxed">{diary}</p>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 rounded-xl p-5 shadow">
      <div className="flex items-center space-x-2 mb-4">
        <Bot className="text-blue-500" />
        <h3 className="text-lg font-semibold text-blue-800">Diary Bot</h3>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        You haven’t written a diary today. Tell me how your day went, and I’ll write it for you 📝
      </p>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white mb-3"
        placeholder="How was your day?"
      />

      <button
        onClick={handleGenerate}
        disabled={generating}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        <SendHorizonal className="mr-2" size={18} />
        {generating ? 'Generating...' : 'Generate Diary'}
      </button>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
