import Input from "../../common/Input/Input";
import Modal from "../../common/Modal/Modal";

import styles from './EditUserModal.module.css';
import Button from '../../common/Button/Button';
import { useMemo, useState } from 'react';

function EditUserModal({ user, onClose, onSave }) {
  const [firstName, setFirstName] = useState(user.first_name);
  const [secondName, setSecondName] = useState(user.second_name);
  const [email, setEmail] = useState(user.email);

  const isButtonDisabled = useMemo(() => {
    return !email || !secondName || !firstName;
  }, [email, firstName, secondName]);

  const handleSave = () => {
    onSave({ first_name: firstName, second_name: secondName, email });
  }

  return (
    <Modal title="Редактирование данных пользователя" onClose={onClose}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Input placeholder='Введите имя' label="Имя" onChange={e => setFirstName(e.target.value)} value={firstName} />
          <Input placeholder='Введите фамилию' label="Фамилия" onChange={e => setSecondName(e.target.value)} value={secondName} />
          <div className={styles.inputEmail}>
            <Input placeholder='Введите почту' label="Почта" onChange={e => setEmail(e.target.value)}  value={email}/>
          </div>
        </div>
        <Button disabled={isButtonDisabled} onClick={handleSave}>СОХРАНИТЬ ИЗМЕНЕНИЯ</Button>
      </div>
    </Modal>
  )
}

export default EditUserModal;