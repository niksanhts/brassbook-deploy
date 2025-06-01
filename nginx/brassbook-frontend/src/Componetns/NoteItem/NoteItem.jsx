import styles from './NoteItem.module.css'
// import exampleJPEG from '../../assets/forLibrary/example.jpeg'
// import examplePDF from '../../assets/forLibrary/example.pdf'

function NoteItem({ item, itemName, author, src, image }) {
    const downloadHandler = () => {
        const link = document.createElement('a')
        link.href = src
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
    return (
        <>
            <li className={styles.NoteItem}>
                <img className={styles.img} src={image} alt="" />
                <div className={styles.gradient}></div>
                <div className={styles.pContainer}>
                    <p className={styles.itemName}>{itemName}</p>
                    <p className={styles.author}>{author}</p>
                </div>
                <button className={styles.download} onClick={downloadHandler}>
                    <img src="/downloadIcon.svg" alt="" />
                    Скачать
                </button>
            </li>
        </>
    )
}

export default NoteItem