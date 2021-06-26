
import { useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';

import illustrationImg from '../assest/images/illustration.svg' //import da img esta aqui
import logoImg from '../assest/images/logo.svg';
import googleIconImg from '../assest/images/google-icon.svg';

import { Button } from '../componentes/Button';
import { useAuth } from '../hooks/useAuth';
import { database } from '../servidor/firebase';

import '../styles/auth.scss';

export function Home() {
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth()
    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom() { //login do usuario
        if (!user) {
            await signInWithGoogle()
        }

        history.push('/rooms/new') //criacao de sala
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();
        if (!roomRef.exists()) {
            alert('Room does not exists.');
            return;
        }

        if (roomRef.val().endedAt){
            alert('Room already closed.')
            return;
        }
     

        history.push(`/rooms/${roomCode}`)
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
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt='Logo do Google' />
                        Crie sua sala com o Google
                    </button>

                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o codigo da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />

                        <Button type="submit">
                            Entra na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}
