import styles from "./NoteAlbum.module.css"
// import exampleJPEG from "../../assets/forLibrary/example.jpeg"

function NoteAlbum({ album, name, image }) {
    // const [album, setAlbum] = useState(album)

    return (
        <>
            <div className={styles.NoteAlbum}>
                <img className={styles.background} src={image} alt="" />
                <div className={styles.gradient}></div>
                <div className={styles.nameContainer}>
                    <h3 className={styles.name}>{name}</h3>
                    <img src="/arrow-right.svg" alt="" loading="eager" />
                </div>
            </div>
        </>
    )
}

export default NoteAlbum