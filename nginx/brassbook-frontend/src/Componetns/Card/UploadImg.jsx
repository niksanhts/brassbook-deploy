import classes from "./UploadImg.module.css";
import {useDispatch, useSelector} from "react-redux";
import {$api} from "../../api";
import {setUser} from "../../store/userSlice";
import EditUserModal from "../modals/EditUserModal/EditUserModal";
import {useCallback, useState} from "react";
import ChangeUserPasswordModal from "../modals/ChangeUserPasswordModal/ChangeUserPasswordModal";
import AlbumListWidget from "../Albums/AlbumListWidget/AlbumListWidget";
import microphoneVuesax from "../../assets/img/microphone-vuesax.svg";
import heartVuesax from "../../assets/img/heart.svg";
import arrowVuesax from "../../assets/img/right-arrow-vuesax.svg";

const UploadAndDisplayImage = () => {
    const defaultImageUrl = 'фото 2.png'; // Замени на путь к дефолтному изображению
    const dispatch = useDispatch();

    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
    const [invalidPasswordList, setInvalidPasswordList] = useState([]);
    const user = useSelector(state => state.user.user);

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;


        const form = new FormData();
        form.append('avatar', file);

        const {data: updatedUserData} = await $api.put('/v1/auth/avatar', form);
        dispatch(setUser(updatedUserData.user))
        console.log('result', updatedUserData)
    };

    const handleUserDataSave = useCallback(async (data) => {
        const {data: updatedUserData} = await $api.put('/v1/auth', data);
        dispatch(setUser(updatedUserData.user))
        setIsEditUserModalOpen(false);
    }, [dispatch]);

    const handleChangePassword = useCallback(async (data) => {
        const {data: updatedUserData} = await $api.put('/v1/auth/registration', data);
        if (updatedUserData?.errorCode && updatedUserData?.errorCode === 'INVALID_PASSWORD') {
            setInvalidPasswordList(list => [...list, data.currentPassword])
            return;
        }
        dispatch(setUser(updatedUserData.user))
        setIsChangePasswordModalOpen(false);
    }, [dispatch]);

    return (
        <div className={classes.content}>
            {user && isEditUserModalOpen &&
                <EditUserModal user={user} onClose={() => setIsEditUserModalOpen(false)} onSave={handleUserDataSave}/>}
            {isChangePasswordModalOpen && (
                <ChangeUserPasswordModal
                    onClose={() => setIsChangePasswordModalOpen(false)}
                    onChangePassword={handleChangePassword}
                    invalidPasswordList={invalidPasswordList}
                />
            )}
            <div className={classes.div_container}>
                <div className={classes.img__input_container}>
                    <img
                        alt="not found"
                        width="220px"
                        height="350px"
                        src={user?.avatar ? user.avatar : defaultImageUrl}
                        className={classes.img__card}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        name="myImage"
                        className={classes.img__input}
                        onChange={handleImageChange}
                    />
                </div>
                <div className={classes.div__user}>
                    <div className={classes.div__inf}>
                        <div>
                            <p className={classes.p__head}>Имя</p>
                            <p className={classes.p__text}>{user?.first_name ? user.first_name : 'Иван'}</p>
                        </div>
                        <div>
                            <p className={classes.p__head}>Фамилия</p>
                            <p className={classes.p__text}>{user?.second_name ? user.second_name : 'Иванов'}</p>
                        </div>
                        <div>
                            <p className={classes.p__head}>Почта</p>
                            <p className={classes.p__text}>{user ? user.email : 'pelamore@mail.ru'}</p>
                        </div>
                    </div>
                    <div className={classes.div__description}>
                        <p className={classes.p__description1}>
                            Композиции, отмеченные тобою{" "}
                            <img src={heartVuesax} alt="heart"/>
                            , находятся в <span className={classes.p__like}> Избранном.</span>
                        </p>
                        <p className={classes.p__description2}>
                            Записи, которые ты делал с помощью{" "}
                            <img className={classes.mic__img} src={microphoneVuesax} alt="mic__img"></img>
                            <span className={classes.p__like}>Диктофона,</span>
                        </p>
                        <p className={classes.p__description3}>
                            {" "}
                            и загруженные треки находятся в разделе{" "}
                            <span className={classes.p__like}>Мои записи.</span>
                        </p>
                    </div>
                    <div className={classes.div__change}>
                        <span href="" className={classes.p__change} onClick={() => setIsEditUserModalOpen(true)}>
                          Редактировать личные данные{" "}<img src={arrowVuesax} alt="arrow"/>
                        </span>
                        <a className={classes.p__change} onClick={() => setIsChangePasswordModalOpen(true)}>
                            Изменить пароль{" "}<img src={arrowVuesax} alt="arrow"/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default UploadAndDisplayImage;
