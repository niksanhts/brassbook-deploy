import { useParams, useLocation } from "react-router-dom"
import SideMenu from "../../../Componetns/sideMenu/SideMenu"
import NoteList from "../../../Componetns/NoteList/NoteList"
import NoteAlbum from "../../../Componetns/NoteAlbum/NoteAlbum"
import exampleJPEG from "../../../assets/forLibrary/example.jpeg"
import styles from "./LibrarySelected.module.css"

function LibrarySelected({ }) {
    const { id } = useParams()
    const { state } = useLocation()
    const album = state?.album

    return (
        <main className={styles.LibrarySelected}>
            <SideMenu activeSection={'library'} />
            <div className={styles.content}>
                <NoteAlbum album={album} name={album.name} image={exampleJPEG}/>
                <NoteList list={album.NoteList} />
            </div>
        </main>
    )
}

export default LibrarySelected