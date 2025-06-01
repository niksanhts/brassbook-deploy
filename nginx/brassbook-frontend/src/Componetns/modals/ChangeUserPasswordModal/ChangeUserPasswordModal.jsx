import { useMemo, useState } from "react";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import Modal from "../../common/Modal/Modal";

import styles from './ChangeUserPasswordModal.module.css';;

function ChangeUserPasswordModal({ onClose, onChangePassword, invalidPasswordList }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const showInvalidPasswordMessage = useMemo(() => {
    console.log('invalidPasswordList', invalidPasswordList)
    return invalidPasswordList.includes(currentPassword)
  }, [currentPassword, invalidPasswordList]);

  return (
    <Modal title="Изменение пароля" onClose={onClose}>
      <div className={styles.container}>
        <Input label={"Текущий пароль"} type="password" placeholder="Текущий пароль" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
        <Input label={"Новый пароль"} type="password" placeholder="Новый пароль" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
        {showInvalidPasswordMessage && <span style={{ color: '#F37979' }}>Неверный пароль</span>}
        <Button onClick={() => onChangePassword({ currentPassword, newPassword })}>ИЗМЕНИТЬ ПАРОЛЬ</Button>
      </div>
    </Modal>
  )
}

export default ChangeUserPasswordModal;