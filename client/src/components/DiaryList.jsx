import { useState } from "react";
import axios from "axios";

function DiaryList({ diaries, fetchDiaries }){

  const [editingId, setEditingId] = useState(null); //현재 수정중인 일기 id
  const [editContent, setEditContent] = useState({title: '', content: ''}); //수정할 입력값

    //수정 모드로 전환하는 함수(핸들러)
  const handleEditClick = (diary) => {
    setEditingId(diary._id); //수정모드 시작
    setEditContent({title: diary.title, content: diary.content}); //기존 내용 채우기
  };
    // 실제 서버에 수정을 요청하는 함수
  const updateDiary = async(id) => {
    try{
      //axios.put을 사용하여 서버의 5001번 포트로 수정요청 전송
      await axios.put(`http://localhost:5001/api/diaries/${id}`, editContent);
      setEditingId(null); //수정모드 종료
      fetchDiaries(); //목록 새로고침하여 바뀐 내용 반영
      }catch (error) {
      alert("수정 중 오류가 발생하였습니다.");
    }
  };
    //삭제 함수
  const deleteDiary =  async (id) => {
    if  (!window.confirm("정말 삭제 하시겠습니까?")) return;

    try{
      await axios.delete(`http://localhost:5001/api/diaries/${id}`);
      fetchDiaries(); //삭제 후 목록 새로고침
    } catch (error){
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

    return(
        <div className="diary-list">
            {diaries.map((diary) => (
         <div key={diary._id} className="diary-item" style={{borderBottm: '1px solid #eee', padding: '15px'}}>
            {editingId === diary._id ? (
            <div>
              <input
                value={editContent.title}
                onChange={(e) => setEditContent({ ...editContent, title: e.target.value })}
              />
              <textarea
                value={editContent.content}
                onChange={(e) => setEditContent({ ...editContent, content: e.target.value })}
              />
              <button onClick={() => updateDiary(diary._id)}>저장</button>
              <button onClick={() => setEditingId(null)}>취소</button>
            </div>
          ) : (
            <div>
              <h3>{diary.title}</h3>
              <p>{diary.content}</p>
              <button onClick={() => handleEditClick(diary)}>수정</button>
              <button onClick={() => deleteDiary(diary._id)}>삭제</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default DiaryList;