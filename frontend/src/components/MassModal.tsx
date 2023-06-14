import React from 'react'
import CloseButton from './CloseButton';

type MassModalProps = {
    visible: boolean,
    setVisible: (e:  string) => void,
    children: React.ReactNode,
    removeCloseButton?: boolean | undefined,
}

const MassModal = (props: MassModalProps) => {

    const closeButtonDecider = (bool: boolean | undefined) => {
        if (bool === undefined || bool === false) {
            return (
                <CloseButton onClick={() => props.setVisible('')}/>
            )
        }
    }

  return (
    <>
      {props.visible && (
        <div className="modal-container">
          <div className="modal">
            {closeButtonDecider(props.removeCloseButton)}
            {props.children}
          </div>
        </div>
      )}
    </>
  )
}

export default MassModal;