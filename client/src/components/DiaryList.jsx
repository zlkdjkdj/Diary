function DiaryList({ diaries }){
    return(
        <ul className="diary-list">
            {diaries.map((diary) => (
          <li key={diary._id} style={{marginBottom: '20px', borderBottom: '1px solid #ddd'}}>
          <h3>{diary.title}</h3>
          <p>{diary.content}</p>
          <small>{new Date(diary.date).toLocaleString()}</small>
          </li>
        ))}
        </ul>
    );
}
 export default DiaryList;