import { Component } from 'react/cjs/react.production.min';
import './ModalWindow.scss';

/**
 * ModalWindow
 * Modal window with custom content
 * @property {boolean=false} opened
 * @property {ReactComponent|HTMLElement|JSXComponent} content
 * @returns ModalWindow
 */

class ModalWindow extends Component {
  closeModal = e => {
    if (e.keyCode) {
      if (e.keyCode !== 27) return
    } else {
      e.preventDefault();
    }
      this.setState({opened: false},
      () => {
        this.props.callback()
      }
      )};

  constructor(props) {
    super(props);
    this.state = {
      opened: props.opened ? props.opened : false,
      content: props.content ? props.content : <div>Nic tu neni</div>
    }
  }

  
  componentDidMount() {
    window.addEventListener('keydown', this.closeModal)
  }

  compnentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }

  render() {
    const {opened, content} = this.state;
    const currentClass = `${this.props.className} modal-window`

    return (
      opened ? 
      <div className={currentClass}>
        <div className='modal-window-base'>
          <a 
            role='button' 
            href='www.' 
            className='modal-window-close'
            onClick={e => {
            this.closeModal(e)
            }} 
          >&times;</a>
          <div className='modal-window-content'>
            {content}
          </div>
      </div>
    </div> : null
    );
  }
}

export default ModalWindow;
