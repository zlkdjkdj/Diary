import { useEffect, useState } from 'react'
import axios from 'axios'
import DiaryForm from './components/DiaryForm'
import DiaryList from './components/DiaryList'

function App() {
  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    fetchDiaries();
  }, []);

  const fetchDiaries = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/diaries');
      setDiaries(response.data);
    } catch (error) {
      console.error("데이터 조회 실패:", error);
    }
  };

  return (
    <div className="container">
      <h1>나의 일기장</h1>
      <DiaryForm onAddSuccess={fetchDiaries} />
      <hr />
      <h2>일기 목록</h2>
      {/* 이제 목록과 관련된 모든 로직은 이 컴포넌트가 담당합니다 */}
      <DiaryList diaries={diaries} fetchDiaries={fetchDiaries} />
    </div>
  )
}

export default App