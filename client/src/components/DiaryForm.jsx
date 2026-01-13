import { useState } from 'react';
import axios from 'axios';

function DiaryForm({ onAddSuccess }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const addDiary = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert("제목과 내용을 입력해주세요!");

    try {
      await axios.post('http://localhost:5001/api/diaries', { title, content });
      setTitle('');
      setContent('');
      onAddSuccess(); // 저장이 끝나면 App.jsx의 목록을 새로고침하라고 신호를 줌
      alert("저장 성공!");
    } catch (error) {
      console.error("저장 실패:", error);
    }
  };

  return (
    <form onSubmit={addDiary} className="diary-form">
      <input 
        type="text" placeholder="제목" value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <textarea 
        placeholder="내용" value={content} 
        onChange={(e) => setContent(e.target.value)} 
      />
      <button type="submit">일기 저장</button>
    </form>
  );
}

export default DiaryForm;