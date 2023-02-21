
import { useNavigate, Link } from "react-router-dom"
import { __getNotes } from "../../../redux/modules/notesSlice";
import { getNotes } from "../../../api/notes";
import {useQuery} from "react-query";

function List() {


    const navigate = useNavigate();


    const {isLoading, isError, data } = useQuery("notes", getNotes);


    if(isLoading){
        return <h1>로딩중입니다!</h1>;
    }

    if(isError){
        return <h1>에러가 발생했습니다.</h1>
    }


    // const onDeleteButtonHandler = async (id) => {
    //     api.delete(`notes/${id}`);
    //     setNotes(notes.filter((item) => {
    //         return item.id !== id;
    //     }))
    // }

    return(
        <>
            <button onClick={()=>{
                navigate("notes/add");
            }}>추가하기</button>
            <div>
            {
                data.map((item) => {
                    return (
                        <div key={item.id}>
                            <Link to={`notes/${item.id}`}>
                            {item.id} : {item.title}
                            </Link>
                            
                            &nbsp;
                            {/* <button onClick={()=>{onDeleteButtonHandler(item.id)}}>삭제</button> */}
                        </div>
                    )
                })
            }
            </div>

        </>
    );
}

export default List;
