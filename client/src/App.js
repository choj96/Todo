import React, { useCallback, useState } from "react";
import List from "./components/List";
import Form from "./components/Form";
/*
  클래스 /함수 컴포넌트 (용도별로 2가지 케이스)
  내용출력 전용, 데이터관리 용도

  클래스 형식으로 제작되는 것 class : TypeScript
  state 를 리랜더링(Re-rendering)
  Life-cycle : Mounte, Update, unMount...

  함수 형식으로 제작되는 것 function
  state 를 못 쓰므로 화면 갱신 어렵다.
  useState() state 변경가능

  Life-cycle 을 지원 안한다.
  useEffect() Life-cycle 체크가능
*/
/* 최초의 로컬에서 todoData 를 읽어와서
todoData 라는 useState 를 초기화 해 주어야 한다
useState(초기값)
초기값:로컬에서 불러서 채운다.
*/
let initTodo = localStorage.getItem("todoData2");
// 삼항연산자를 이용해서 초기값이 없으면 빈배열[]로 초기화 한다.
// 읽어온 데이터가 있으면 JSON.stringify() 저장한 파일을
// JSON.parse() 로 다시 객체화 하여 사용한다.
initTodo = initTodo ? JSON.parse(initTodo) : [];

export default function App() {
  // console.log("App Rendering...");

  const [todoData, setTodoData] = useState(initTodo);
  const [todoValue, setTodoValue] = useState("");

  const deleteClick = useCallback(
    (id) => {
      // 클릭된 ID 와 다른 요소들만 걸러서 새로운 배열 생성
      const nowTodo = todoData.filter((item) => item.id !== id);
      // console.log("클릭", nowTodo);
      // 목록을 갱신한다.
      setTodoData(nowTodo);
      // 로컬에 저장한다.(DB 예정)
      localStorage.setItem("todoData2", JSON.stringify(nowTodo));
    },
    [todoData]
  );

  const addTodoSubmit = (event) => {
    event.preventDefault();
    // { id: 4, title: "할일4", completed: false },

    // 공백 문자열 제거 추가
    let str = todoValue;
    str = str.replace(/^\s+|\s+$/gm, "");
    if (str.length === 0) {
      alert("내용을 입력하세요.");
      setTodoValue("");
      return;
    }

    const addTodo = {
      id: Date.now(),
      title: todoValue,
      completed: false,
    };
    setTodoData([...todoData, addTodo]);
    // 로컬에 저장한다.(DB 예정)
    localStorage.setItem("todoData2", JSON.stringify([...todoData, addTodo]));

    setTodoValue("");
  };

  // 배열을 비워서 다 삭제
  const deleteAllClick = () => {
    setTodoData([]);
    // 자료를 지운다.(DB 초기화)
    localStorage.clear();
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-green-300">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-5xl">
        <div className="flex justify-between mb-3">
          <h1>할일 목록</h1>
          <button onClick={deleteAllClick}>Delete All</button>
        </div>
        <List
          todoData={todoData}
          setTodoData={setTodoData}
          deleteClick={deleteClick}
        />
        <Form
          todoValue={todoValue}
          setTodoValue={setTodoValue}
          addTodoSubmit={addTodoSubmit}
        />
      </div>
    </div>
  );
}
