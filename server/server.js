//일기 규칙(schema) 서버 인식
const Diary = require('./models/Diary');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5001;



//미들웨어 설정 (데이터 해석 및 보안)
app.use(cors());
app.use(express.json());

//mongodb 연결
mongoose.connect('mongodb+srv://zlkdjkdj:zlkdjkdj0720@cluster0.6fsxsk9.mongodb.net/?appName=Cluster0')
    .then(()=> console.log("MongoDB 연결 성공"))
    .catch(err => console.log("mongodb 연결 실패", err));

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
        const diary = await Diary.findById(req.params.id);
        if (!diary){
            return res.status(404).json({message : "일기를 찾을 수 없습니다."});
        }
        res.json(diary);
    } catch (err) {
        res.status(500).json({message: "데이터 조회 중 에러 발생", error:err.message});
    }
})

//2. 일기 수정(put)
app.put('/api/diaries/:id', async (req, res) => {
    try{
        const updatesDiary = await Diary.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        res.json(updatesDiary);
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



