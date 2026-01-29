//일기 규칙(schema) 서버 인식
const Diary = require('./models/Diary');

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // 1. 최상단에 이 코드가 반드시 있어야 합니다.


const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5001;



//미들웨어 설정 (데이터 해석 및 보안)
app.use(cors());
app.use(express.json());

// 3. 주소 대신 process.env.MONGO_URI를 사용합니다.
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB 연결 성공 (안전함)"))
    .catch(err => console.log("MongoDB 연결 실패", err));
    
//기본 경로 테스트
app.get('/', (req, res) =>{
    res.send('일기  앱 서버가 작동중입니다.');
});

//서버가 일기를 실제로 저장할 수 있도록 post api 작성
app.post('/api/diaries', async (req, res) =>  {
    try {
        console.log("1. 요청이 들어왔습니다!", req.body); // 요청 확인

        const { title, content, media } = req.body;
        const newDiary = new Diary({ title, content, media });

        console.log("2. DB에 저장을 시도합니다..."); // 저장 직전 확인
        const savedDiary = await newDiary.save();

        console.log("3. 저장 성공!"); // 저장 완료 확인
        res.status(201).json(savedDiary);
    } catch (err) {
        console.error("에러 발생:", err); // 에러 로그
        res.status(400).json({message: "일기 저장 실패", error: err.message});
    }
});

//모든 일기 목록 가져오기 (get요청)
app.get('/api/diaries', async(req, res) =>{
    try{
        const diaries =await Diary.find().sort({ date: -1});
        res.json(diaries);
    }catch(err){
        res.status(500).json({message: "데이터 조화 실패", error: err.message});
    }
});

//1. 특정 일기 상세 조회(get)
app.get('/api/diaries/:id', async (req, res) => {
   try{
    const { title, content, media } = req.body;

    //id로 찾아온 내용을 업데이트함
    const updatedDiary = await Diary.findByIdAndUpdate(
        req.params.id,
        { title, content, media },
        { new : true} // 이 옵션을 넣어야 수정된 후의 최신 데이터를 반환
    );

    if (!updatedDiary){
        return res.status(404).json({message: "수정한 일기를 찾을 수 없습니다."});
    }

    console.log("수정 성공!");
    res.json(updatedDiary);
   } catch(err){
    res.status(400).json({message: "수정실패", error: err.message });
    }
});

//2. 일기 수정(put)
app.put('/api/diaries/:id', async (req, res) => {
    try{
        const updatedDiary = await Diary.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        res.json(updatedDiary);
    } catch (err) {
        res.status(400).json({message:"수정 실패", error:err.message});
    }
});
//3. 일기 삭제(delete)
app.delete('/api/diaries/:id', async (req, res) => {
    try{
        await Diary.findByIdAndDelete(req.params.id);
        res.json({message: "일기가 성공적으로 삭제되었습니다."});
    } catch(err) {
        res.status(500).json({message : "삭제 실패", error : err.message });
    }
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행중입니다.`);

});



