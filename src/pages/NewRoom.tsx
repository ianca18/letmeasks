
import { FormEvent, useState  } from 'react'; //IMPORT FORMULARIO
import { Link, useHistory } from 'react-router-dom';
import illustrationImg from '../assest/images/illustration.svg' //import da img esta aqui
import logoImg from '../assest/images/logo.svg';
import { Button } from '../componentes/Button'
import { database } from '../servidor/firebase';
import { useAuth } from '../hooks/useAuth';
import '../styles/auth.scss';


export function NewRoom() {
  const { user } = useAuth()
  const history = useHistory()
  const [ newRoom, setNewRoom] = useState('');

  async function handleCleateRoom(event: FormEvent) { // evento de formulario
      event.preventDefault();

      if(newRoom.trim() === '') { //observacao
          return;
      } 

      const roomRef = database.ref('rooms');//referencia um regristro dentro do banco de dados
      
      const firebaseRoom = await roomRef.push({ //estou jogando uma inform.. dentro do  rooms
        title: newRoom,
        authorId: user?.id,
      })
      
      history.push(`/rooms/${firebaseRoom.key}`);

    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="ilustracao simbolizando perguntas e respostas" />
                <strong>Crie sala de q&amp; A ao-vivo </strong>
                <p>Tire as duvidas da sua audiencia em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt='Letmeasks' />

                
                <h2>Criar uma nova sala</h2>
                
                    <form onSubmit={handleCleateRoom}>
                        <input type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />

                        <Button type="submit">
                            Criar sala
                        </Button>
                      
                    </form>
                    <p> 
                        Quer entrar em uma sala existeste? <Link to="/">Clique aqui</Link>
                    </p>
                    </div>
                    </main>
                    </div>

    )

}