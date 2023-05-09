import ReactDOM from 'react-dom'
import PortalModal from '../PortalModal'

export default function ModalDeleteAccount ({ setModalDelete }) {
  return (
    ReactDOM.createPortal(<PortalModal setModalDelete={setModalDelete} />, document.getElementById('ModalDeleteAccount'))
  )
}
