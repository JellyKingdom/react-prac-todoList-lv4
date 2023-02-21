
import { useNavigate, Link } from "react-router-dom"
import { deleteNotes, getNotes } from "../../../api/notes";
import {useQuery} from "react-query";
import {useQueryClient} from "react-query";
import {useMutation} from "react-query";

function List() {

    //리액트 쿼리 관련 코드
    const queryClient = useQueryClient();
    const mutation = useMutation(deleteNotes, {
        onSuccess: () => {
            queryClient.invalidateQueries("notes");
            console.log('성공하였습니다!');
        }
    });
    const navigate = useNavigate();

    const {isLoading, isError, data } = useQuery("notes", getNotes);


    if(isLoading){
        return <h1>로딩중입니다!</h1>;
    }

    if(isError){
        return <h1>에러가 발생했습니다.</h1>
    }


    const onDeleteButtonHandler = async (id) => {
        mutation.mutate(id);
    }

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
                            <button onClick={()=>{onDeleteButtonHandler(item.id)}}>삭제</button>
                        </div>
                    )
                })
            }
            </div>

        </>
    );
}

export default List;
