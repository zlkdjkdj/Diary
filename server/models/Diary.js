//일기 데이터는 제목, 본문, 날짜로 구성돈다 라고 db에 약속을 하는 단계
const mongoose = require('mongoose');

//일기 데이터의 구조(schema) 설계
const diarySchema = new mongoose.Schema({
    title: {
        type:String,
        required: true //제목이 없으면 저장되지 않도록 설정
    },
    content: {
        type: String,
        required: true //본문이 없으면 저장되지 않도록 설정
    },
    date: {
        type: Date,
        default: Date.now //날짜를 따로 안 넣으면 현재 시간이 저장됨
    },
    media: {
        type: String, //이미지나 영상의 주소를 저장 할 곳
    }
});

//외부에서 이 규칙을 사용할 수 있도록 내보내기
module.exports = mongoose.model('Diary', diarySchema);