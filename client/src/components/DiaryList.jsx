function DiaryList({ diaries, onDelete }){
    return(
        <ul className="diary-list">
            {diaries.map((diary) => (
          <li key={diary._id} style={{marginBottom: '20px', borderBottom: '1px solid #ddd'}}>
          <h3>{diary.title}</h3>
          <p>{diary.content}</p>
          <small>{new Date(diary.date).toLocaleString()}</small>

          <div style={{marginTop : '10px'}}>
            <button
                onClick={() => onDelete(diary._id)}
                style={{color: 'red', cursor: 'pointer', border: '1px solid red', borderRadius:'4px', background:'white'}}
          >
            삭제하기
          </button>
                </div>
          </li>
        ))}
        </ul>
    );
}
 export default DiaryList;