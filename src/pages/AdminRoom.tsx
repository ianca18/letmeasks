
import { useHistory, useParams } from 'react-router-dom';
 //imagens
import logoImg from '../assest/images/logo.svg';
import deleteImg from '../assest/images/delete.svg';
import checkImg from '../assest/images/check.svg';
import answerImg from '../assest/images/answer.svg'

import { Button } from '../componentes/Button';
import { Question } from '../componentes/Question/index';
import { RoomCode } from '../componentes/RoomCode';
//import { useAuth } from '../hooks/useAuth';
import { database } from '../servidor/firebase';
import { useRoom } from '../hooks/useRoom';
//css
import '../styles/room.scss';



type RoomParams = {
    id: string;
}
//aqui esta meus estados
export function AdminRoom() {
    const history = useHistory()
    const params = useParams<RoomParams>();
    const roomId = params.id;

    const { title, questions } = useRoom(roomId)
 async function handleEndRoom(){
    await database.ref(`rooms/${roomId}`).update({
        endedAt: new Date(),
    })
     
    history.push('/');
 }


  //meus icones estao aqui 3  funcoes
   async function handleDeleteQuestion(questionId: string){
      if(window.confirm('Tem certeza que vai apagar a perguntar')) {
         await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();

      }
    }

    async function handleCheckQuestionAsAnswered(questionId: string){
       await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isAnswered:true,
           })
        }

        async function handleHighLightQuestion(questionId: string){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
                isHighlighted:true,
                 })
            }
       
        
    return (
        <div id="page-room" >
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />

                      <div>
                    <RoomCode code={roomId} />
                    <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                      </div>
                    
                </div>
            </header>
            <main>

                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} perguntas(s)</span>}
                </div>

                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                            > 
                           
                               {!question.isAnswered && (
                                 //fagmento <>
                                    <> 
                                 <button //butao 1 marcar pergunta
                                type = "button"
                                onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                >
                                    <img src={checkImg} alt="Marcar pergunta como respondida" />
                                </button>

                                <button //butao 2 destaque
                                type = "button"
                                onClick={() => handleHighLightQuestion(question.id)}
                                >
                                    <img src={answerImg} alt="Dar destaque a pergunta" />
                                </button>
                                </>

                                 )}

                                <button //butao 3 likes
                                type = "button"
                                onClick={() => handleDeleteQuestion(question.id)}
                                >

                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>
                                </Question>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}