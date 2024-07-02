import './IconButton.css'

type IconButtonProps = {
    onClick: () => void
    text: string,
    icon: string,
}

function IconButton(props: IconButtonProps) {
    return (
        <a className='icon-button' onClick={props.onClick}><img className='icon-button-image' src={props.icon}></img> {props.text}</a>
    )
}

export default IconButton;