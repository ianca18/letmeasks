import { ReactNode } from 'react';
import cx from  'classnames';
import '../Question/styles.scss';

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };
    children?:ReactNode;
    isAnswered?: boolean;
    isHighlighted?: boolean;
}

export function Question({
    content,
    author,
    isAnswered = false,
    isHighlighted = false,
    children,
}: QuestionProps) {
    return ( //fazer nos outros
        <div className={cx( 
            'question',
            {answered: isAnswered},
            {highlighted: isHighlighted && !isAnswered}, // A CLSS SO SE APLICAR QUANDO NAO TIVER isAnswered 

        )}
        >
            <p> {content}</p>
            <footer>
                <div className="user-info">
                <img src={author.avatar} alt={author.name}/>
                <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    );
}