### React와 Node JS를 사용하여 유튜브 사이트 만들어보기!
- 유튜브 클론 강의를 들으면서 React 와 Node JS를 사용하여 유튜브 사이트를 만들어보았습니다.
  
- 강의 내용을 참고하여 기능 보완 및 추가 구현을 해보기도 하였습니다!
   - 로그인한 유저의 이미지와 이름 정보를 DB에서 가져와서 화면에 나타냄.
   - 해당 비디오를 클릭해서 비디오 디테일 페이지로 들어올 때마다 조회수가 증가하여 화면에 나타나도록 함.
   - bootstrap 활용하여 댓글 form 과 button 적용
   - 구독자 수 정보를 버튼 태그에서 분리하여 사용자가 더 쉽게 해당 정보를 확인할 수 있도록 함.
   - **댓글 삭제 기능 보완**
     - 대댓글이 있는 댓글의 경우, DB에서 삭제하지는 않고 해당 댓글의 내용을 삭제된 댓글입니다. 라고 수정해서 화면에 나타나도록 구현
     - 대댓글이 없고 하나의 댓글만 있을 경우, DB에서 삭제하도록 구현
       
- [TIL 레포지토리](https://github.com/jaeyooon/TIL/tree/main/React%2BNodeJS)에는 day by day로 배운 내용들을 정리하고 여기에는 소스코드를 올려서 정리해보았습니다.😺📚

**✔ 메인 페이지**

![final_mainPage](https://github.com/jaeyooon/TIL/assets/111714371/19b2195f-5fe4-49e0-a2f3-603ec3c8b0db)

**✔ 비디오 상세 페이지**

![final_videoDetailPage](https://github.com/jaeyooon/TIL/assets/111714371/aa0f328e-6032-49f1-9e82-264722f769a6)  

> 📌 댓글 기능
- 댓글 추가

![final_comment](https://github.com/jaeyooon/TIL/assets/111714371/b4836312-2bef-48c1-b368-4c80365c25f2)

- 댓글 삭제  
👉 현재 로그인한 유저가 작성한 댓글에 대해서만 삭제가능하도록 버튼 구성

  - 대댓글이 있을 때는 **하위 댓글** 삭제 또는 **대댓글 없는 댓글**을 삭제하는 경우
  - DB에서 해당 댓글 삭제하고 화면에 나오지 않도록 구현

  ![final_commentDelete](https://github.com/jaeyooon/TIL/assets/111714371/361d81b8-f57d-4f69-9209-d78b3e7423bb)
  
  - 대댓글이 있을 때, **상위 댓글**을 삭제하는 경우
  - DB에서 해당 댓글이 삭제되지는 않고 화면에 `삭제된 댓글입니다.`라고 나오도록 구현

  ![final_comment2](https://github.com/jaeyooon/jaeyooon/assets/111714371/9910f752-2bf5-4be3-977f-ae0e7f7ceb2b)

> 📌 구독 기능

![final_subscribe](https://github.com/jaeyooon/TIL/assets/111714371/86fe5dc9-2b89-4939-ac57-a8a67420c531)

> 📌 좋아요 기능

![final_like](https://github.com/jaeyooon/TIL/assets/111714371/bfe82628-cdf1-475a-997e-6382391f953d)

**✔ 비디오 업로드 페이지**

![final_uploadVideo](https://github.com/jaeyooon/TIL/assets/111714371/d9f3549f-8db9-410c-aabf-48f2110af536)
