import { ButtonHTMLAttributes } from "react"
import '../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean
}; 
export function Button({isOutlined = false, ...props} : ButtonProps) {
    return ( //estou pegado todas as props do do meu butao e colocado na class html
        <button className={`button ${isOutlined} ? 'outlined' : '' } `}
         {...props} /> //ditribuindo as props
    )
}


